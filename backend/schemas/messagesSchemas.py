from pydantic import BaseModel

class Message(BaseModel):
    reciever: str
    date: str
    message: str
    
class MessageHistory(BaseModel):
    chatID: str
    
class DeleteMessageSchema(BaseModel):
    message_id: int 
    co_owner: str
    
class ChangeMessageSchema(BaseModel):
    new_message: str
    co_owner: str
    message_id: int