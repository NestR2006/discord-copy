from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from ..deps import security, config, notifications, notificationsDatabase
from ...db.database import contacts_collection, users_collection


router = APIRouter(prefix="/contacts", tags=["contacts"])

class AddContactRequest(BaseModel):
    username: str

@router.post("/add-contacts")
async def add_contact(body: AddContactRequest, token= Depends(security.access_token_required)):
    user = await users_collection.find_one({"username" : token.sub})
    if not user:
        raise HTTPException(status_code=404, detail="User not found1")
    
    friend = await users_collection.find_one({"username" : body.username})
    if not friend:
            raise HTTPException(status_code=404, detail="User not found2")
    
    if(body.username == user["username"]):
        raise HTTPException(status_code=403, detail="That's one user")
    
    recieverSocket = notifications[body.username]
    
    if not recieverSocket:
        notificationsDatabase[user["username"]] = body.username
    else:
        await recieverSocket.send_json({
            "profilePicture" : user["profilePicture"],
            "username" : user["username"],
        })
    
    friendsList = await contacts_collection.find_one({"username" : user["username"]})
    
    if not friendsList:
        await contacts_collection.insert_one({"username" : user["username"], "friends" : [body.username]})
    else:
        await contacts_collection.update_one({"username" : user["username"]}, 
                                            {"$addToSet" : {"friends" : body.username}})
    
    return{"status" : "ok"}

@router.delete("/delete-contact")
def delete_contact(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.get("/")
async def get_contacts(token= Depends(security.access_token_required)):
    usersFriends = await contacts_collection.find_one({"username": token.sub})
    if not usersFriends:
        return {"friends" : []}
    
    friendsArray = usersFriends["friends"]
    resultArray = []
    for friend in friendsArray:
        user = await users_collection.find_one({"username" : friend})
        resultArray.append({"username" : friend, "profilePicture" : user["profilePicture"]})
    return {"friends" : resultArray}

@router.websocket("/contacts-notification")
async def send_notification(websocket: WebSocket):
    token = websocket.cookies.get(config.JWT_ACCESS_COOKIE_NAME)
    if not token:
        await websocket.close(code=1008)
        return
    
    payload = security._decode_token(token)
    
    user = await users_collection.find_one({"username": payload.sub})
    if not user:
        await websocket.close(code=401)
        return
    
    await websocket.accept()
    notifications[user["username"]] = websocket
    
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        del notifications[user["username"]]


@router.get("/get-test-notification")
async def test_notification (token = Depends(security.access_token_required)):
    username = token.sub
    user_socket = notifications.get(username)
    
    if not user_socket:
        raise HTTPException(status_code=404, detail="socket was not found")
    
    await user_socket.send_json({
        "profilePicture" : "profilePicture",
        "username" : "username",
    })
