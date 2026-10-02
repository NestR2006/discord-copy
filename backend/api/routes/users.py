from fastapi import APIRouter, Depends, Response, HTTPException, WebSocket
from backend.schemas import userInterfaces
from ..deps import security, config
from ...db.database import users_collection, contacts_collection
import bcrypt
from datetime import datetime

router = APIRouter(prefix="/users", tags=["users"])

def get_hash_password(password: str):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))


@router.post("/registration")
async def register_user(form : userInterfaces.RegistrationForm, response: Response):
    if(await users_collection.find_one({"email" : form.email})):
        raise HTTPException(status_code=401, detail="user already exists")
    
    token = security.create_access_token(uid="username")
    
    today = datetime.today().strftime('%Y-%m-%d')
    
    user_data = form.model_dump()
    user_data["password"] = get_hash_password(user_data["password"])
    user_data["profilePicture"] = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_khOE4aOAg7xfEbWtTl-l6IzjaNvqe9iPJTZg5DJoQQ&s=10"
    user_data["registrationDate"] = today
    user_data["bannerColor"] = "black"
    
    await users_collection.insert_one(user_data)
    
    response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, token)
    return {"status" : "ok"}

@router.post("/login")
async def login_user(form: userInterfaces.LoginForm, response: Response):
    user = await users_collection.find_one({"email": form.email})

    if not user or not verify_password(form.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = security.create_access_token(uid=user["username"])
    response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, token)
    return {"status": "ok", "username" : user["username"]}

@router.get("/me")
async def get_user_information(token= Depends(security.access_token_required)):
    user = await users_collection.find_one({"username" : token.sub})
    
    return {
        "username": user["username"],
        "profilePicture" : user["profilePicture"],
        }

@router.patch("/change-user-info")
def change_user_info(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.post("/me/avatar")
def set_avatar(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.get("/search-additional-info")
async def search_user(username : str, token= Depends(security.access_token_required)):
    searched_user = await users_collection.find_one({"username" : username})
    searched_user_friends = await contacts_collection.find_one({"username" : username})
    
    friends = searched_user_friends["friends"]
    
    areFriends = token.sub in friends
    
    result = {
        "registrationDate" : searched_user["registrationDate"],
        "bannerColor" : searched_user["bannerColor"],
        "profilePicture": searched_user["profilePicture"],
        "friendsState" : areFriends
    }
    
    return {"status" : "ok", "information" : result}

@router.get("/avatar")
async def get_users_profile_picture(username, token = Depends(security.access_token_required)):
    user_info = await users_collection.find_one({"username" : username});
    
    if user_info:
        return {"profilePicture" : user_info["profilePicture"]}