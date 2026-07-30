from pydantic import BaseModel, EmailStr

class RegistrationForm(BaseModel):
    username: str
    email: EmailStr
    password: str
    
class LoginForm(BaseModel):
    email: EmailStr
    password: str