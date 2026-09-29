from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from ..deps import security, config, messages_transport
from ...db.database import users_collection, chats_collection, chatsHistory_collection
from ...schemas.messagesSchemas import Message, DeleteMessageSchema, ChangeMessageSchema
from uuid import uuid4

router = APIRouter(prefix="/chats", tags=["chats"])

@router.post("/create-chat")
async def create_chat(username: str, token= Depends(security.access_token_required)):
    founded_user = await users_collection.find_one({"username" : username})
    if not founded_user:
        raise HTTPException(status_code=402, detail="User was not found")
    await chats_collection.insert_one({"chatOwnerUsername" : token.sub, "chatMembers" : [founded_user["username"]]})

@router.get("/")
async def get_chats(token= Depends(security.access_token_required)):
    founded_chats = chats_collection.find({"chatOwnerUsername" : token.sub})
    data = await founded_chats.to_list();
    resultArray = [];
    for chat in data:
        chatMemmberInfo = await users_collection.find_one({"username" : chat["chatMembers"][0]})
        resultArray.append({"username": chat["chatMembers"][0], "profilePictureLink": chatMemmberInfo["profilePicture"]})
    return {"chats" : resultArray}

@router.post("/send-message")
async def send_message(message: Message, token = Depends(security.access_token_required)):
    recieverSocket = messages_transport.get(message.reciever)
    
    participants = sorted([token.sub, message.reciever])
    
    message_id = uuid4().time_mid
    
    if recieverSocket:
        await recieverSocket.send_json({
                "message" : message.message,
                "from" : token.sub,
                "when" : message.date
        })
    
    usersChatHistory = await chatsHistory_collection.find_one({"participants" : participants})
    if not usersChatHistory:
        await chatsHistory_collection.insert_one(
            {"participants": participants, 
             "messages": [{"id" : message_id, "message": message.message, "from" : token.sub, "is_changed": 0}]})
    else:
        await chatsHistory_collection.update_one(
            {"participants": participants}, 
            {"$push": {"messages": 
                {"id" : message_id, "message": message.message, "from": token.sub, "is_changed": 0}}})
    
    return {"status" : "sent", "ID" : message_id}

@router.delete("/delete-chat")
def delete_chat(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.get("/chat-history")
async def get_chat_history(second_participants : str, token= Depends(security.access_token_required)):
    sorted_participants = sorted([second_participants, token.sub])
    
    chat_history = await chatsHistory_collection.find_one({"participants" : sorted_participants})
    
    if not chat_history:
        return {"chatHistory" : []}
    
    clean_history_buf = chat_history["messages"]
    
    return {"chatHistory" : clean_history_buf}

@router.post("/change-message")
async def change_message(data: ChangeMessageSchema, token=Depends(security.access_token_required)):
    sorted_participants = sorted([data.co_owner, token.sub])

    await chatsHistory_collection.update_one(
        {"participants": sorted_participants, "messages.id": data.message_id},
        {"$set": {"messages.$.message": data.new_message, "messages.$.is_changed": 1}}
    )

    return {"status": "ok"}

@router.delete("/delete-message")
async def delete_message(data : DeleteMessageSchema, token= Depends(security.access_token_required)):
    participant_list = sorted([data.co_owner, token.sub])
    
    await chatsHistory_collection.update_one({"participants" : participant_list},
                                      {"$pull" : {"messages" : {"id" : data.message_id}}})
    
    return {"status" : "ok"}

    
@router.websocket("/transport-message")
async def transport_message(websocket: WebSocket):
    raw_token = websocket.cookies.get(config.JWT_ACCESS_COOKIE_NAME)
    
    if not raw_token:
        await websocket.close(code=4401)
        return
    
    token = security._decode_token(raw_token)
    
    await websocket.accept()
    messages_transport[token.sub] = websocket
    
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        messages_transport.pop(token.sub, None)
