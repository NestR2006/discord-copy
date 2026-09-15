from pydantic import BaseModel

class Message(BaseModel):
    reciever: str
    date: str
    message: str
    
class MessageHistory(BaseModel):
    chatID: str