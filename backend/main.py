from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from backend.api.routes import users, contacts, chats

app = FastAPI()


app.include_router(users.router)
app.include_router(contacts.router)
app.include_router(chats.router)

app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")

@app.get("/")
def root():
    return FileResponse(path="frontend/dist/index.html")

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    return FileResponse("frontend/dist/index.html")