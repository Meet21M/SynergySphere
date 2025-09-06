from fastapi import APIRouter,HTTPException,status,Depends,UploadFile,File
from src.models.user import User,OTP
from database.database import SessionLocal
# from src.schemas.user import RegisterUserSchema
from src.utils.user import pwd_content,find_same_email,find_same_username,password_validation,generate_otp_,send_email,passchecker,get_token,decode_token
import random
import uuid

user_router = APIRouter()
db = SessionLocal()

@user_router.post("/user_registration")
async def user_registration(name:str,email:str,password:str,image: UploadFile = File(...)):
    contents = await image.read()
    new_user = User(
        user_id = str(uuid.uuid4()),
        name = name,
        email = email,
        password = pwd_content.hash(password),
        profile_picture = contents
    )
    find_data = db.query(User).first()
    if find_data:
        find_same_email(email)
        find_same_username(name)
    password_validation(password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return "Registration Successfully"