from fastapi import APIRouter, Depends
from ..deps import security

router = APIRouter(prefix="/contacts", tags=["contacts"])

@router.post("/add-contacts")
def add_contact(token= Depends(security.access_token_required)):
    return{"status" : "ok"}

@router.delete("/delete-contact")
def delete_contact(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

@router.get("/")
def get_contacts(token= Depends(security.access_token_required)):
    return {"status" : "ok"}

