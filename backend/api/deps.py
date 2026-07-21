from authx import AuthXConfig, AuthX
import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

config = AuthXConfig()

config.JWT_SECRET_KEY = os.getenv("SECRET_KEY")
config.JWT_ACCESS_COOKIE_NAME = "discord-copy"
config.JWT_TOKEN_LOCATION = ['cookies']

security = AuthX(config=config)