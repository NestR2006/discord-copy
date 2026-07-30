from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from ..deps import security, config, connections
from ...db.database import users_collection, chats_collection

router = APIRouter(prefix="/chats", tags=["chats"])

@router.post("/create-chat")
async def create_chat(username: str, token= Depends(security.access_token_required)):
    founded_user = await users_collection.find_one({"username" : username})
    if not founded_user:
        raise HTTPException(status_code=402, detail="User was not found")
    chats_collection.insert_one({"chatID" : 1, "chatMembers" : [founded_user["_id"], token["sub"]]})

@router.get("/")
def get_chats(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.get("/chat-info")
def get_chat_information(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.patch("/change-chat-info")
def change_chat_info(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.delete("/delete-chat")
def delete_chat(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.post("/add-member")
def add_member(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.delete("/delete-member")
def delete_member(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.post("/send-message")
def send_message(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.get("/chat-history")
def get_chat_history(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.patch("/change-message")
def change_message(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.delete("/delete-message")
def delete_message(token= Depends(security.access_token_required)):
    return {"status" : "ok"}


@router.websocket("/trasport-message")
async def transport_message(message: str, websocket: WebSocket):
    token = websocket.cookies.get(config.JWT_ACCESS_COOKIE_NAME)
    if not token:
        websocket.send_json({
            "code-status" : 404
        })
    
    await websocket.accept()
    
    user = await users_collection.find_one({"username" : token.sub})
    if not user:
        websocket.send_json({
            "code-status" : 404
        })
        
    try:
        await websocket.send_json({
            "type": "new_chat_created",
            "chatId": "456",
            "participants": []
        })
            
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
            del connections[user["username"]]
    
