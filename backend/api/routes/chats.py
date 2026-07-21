from fastapi import APIRouter, Depends
from ..deps import security

router = APIRouter(prefix="/chats", tags=["chats"])

@router.post("/create-chat")
def create_chat(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

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
