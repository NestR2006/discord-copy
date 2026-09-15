import motor.motor_asyncio
from pathlib import Path
from dotenv import load_dotenv
import os

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("DATABASE"))
db = client["database"]

users_collection = db["users"]
chats_collection = db["chats"]
contacts_collection = db["contacts"]
chatsHistory_collection = db["chatsHistory"]