from pydantic import BaseModel, EmailStr

class RegistrationForm(BaseModel):
    username: str
    nickname: str
    email: EmailStr
    password: str
    
class LoginForm(BaseModel):
    email: EmailStr
    password: str