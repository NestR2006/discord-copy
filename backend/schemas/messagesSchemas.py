from pydantic import BaseModel

class Message(BaseModel):
    sender: str
    date: str
    message: str
    
class MessageHistory(BaseModel):
    chatID: str