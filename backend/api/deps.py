from authx import AuthXConfig, AuthX
import os
from pathlib import Path
from dotenv import load_dotenv
from fastapi import WebSocket

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

config = AuthXConfig()

config.JWT_SECRET_KEY = os.getenv("SECRET_KEY")
config.JWT_ACCESS_COOKIE_NAME = "discord-copy"
config.JWT_TOKEN_LOCATION = ["cookies"]
config.JWT_COOKIE_CSRF_PROTECT = False

security = AuthX(config=config)

connections: dict[str, WebSocket] = {}
notifications: dict[str, WebSocket] = {}

notificationsDatabase: dict[str, str] = {}