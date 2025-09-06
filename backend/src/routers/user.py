from fastapi import APIRouter,HTTPException,status,Depends,UploadFile,File
from src.models.user import User,OTP
from database.database import SessionLocal
from src.schemas.user import PutForgetPassword
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

@user_router.post("/generate_otp/{email}")
def generate_otp(email:str):
    find_user_data = db.query(User).filter(User.email == email,User.isActive == True, User.isVerified == False, User.isDeleted == False).first()
    if db.query(User).filter(User.email == email,User.isActive == True, User.isVerified == True, User.isDeleted == False).first():
        raise HTTPException(status_code=400,detail="Email Already Verified")
    if not find_user_data:
        raise HTTPException(status_code=400,detail="Email Not Found")
    
    
    generated_otp = generate_otp_()
    send_email(find_user_data.email,"Verification OTP",f"OTP for Verification is {generated_otp}")

    new_otp_data = OTP(
        user_id = find_user_data.id,
        email = find_user_data.email,
        otp = generated_otp
    )

    db.add(new_otp_data)
    db.commit()
    db.refresh(new_otp_data)
    return "OTP Generated Successfully"

@user_router.get("/verify_otp")
def verify_otp(email:str,otp:str):
    find_user_data = db.query(User).filter(User.email == email,User.isActive == True, User.isVerified == False, User.isDeleted == False).first()
    if not find_user_data:
        raise HTTPException(status_code=400,detail="User Not Found")
    find_otp_data = db.query(OTP).filter(OTP.email == email, OTP.otp == otp).first()
    if not find_otp_data:
        raise HTTPException(status_code=400,detail="OTP Not Found")
    find_user_data.isVerified = True
    db.delete(find_otp_data)
    db.commit()
    db.refresh(find_user_data)
    return "User Verification Done Successfully"

@user_router.post("/forget_password_and_generate_otp")
def forget_password_and_generate_otp(email:str):
    find_user_data = db.query(User).filter(User.email == email,User.isActive == True,User.isVerified == True,User.isDeleted == False).first()
    if not find_user_data:
        raise HTTPException(status_code=400,detail="Email Not Found")
    generated_otp = generate_otp_()
    send_email(find_user_data.email,"Verification OTP",f"OTP for Forget Password is {generated_otp}")
    new_otp_data = OTP(
        user_id = find_user_data.user_id,
        email = find_user_data.email,
        otp = generated_otp
    )

    db.add(new_otp_data)
    db.commit()
    db.refresh(new_otp_data)
    return "OTP Generated Successfully for Forget Password"

def forget_password_verification(email:str,otp:str):
    find_user_data = db.query(User).filter(User.email == email,User.isActive == True, User.isVerified == True, User.isDeleted == False).first()
    if not find_user_data:
        raise HTTPException(status_code=400,detail="User Not Found")
    find_otp_data = db.query(OTP).filter(OTP.email == email, OTP.otp == otp).first()
    if not find_otp_data:
        raise HTTPException(status_code=400,detail="OTP Not Found")
    db.delete(find_otp_data)
    db.commit()
    db.refresh(find_user_data)
    return email

@user_router.put("/forget_password_set_new_password")
def forget_password_set_new_password(password:PutForgetPassword ,email:str=Depends(forget_password_verification)):
    find_user_data = db.query(User).filter(User.email == email).first()
    if password.new_password != password.confirm_password:
        raise HTTPException(status_code=400,detail="New Password and Confirm Password didn't Match")
    find_user_data.password = pwd_content.hash(password.confirm_password)
    db.commit()
    db.refresh(find_user_data)
    return "Password Change Successfully"

@user_router.get("/login")
def login(username:str,password:str):
    find_user_data = db.query(User).filter(User.name == username,User.isActive == True, User.isVerified == True, User.isDeleted == False).first()
    if not find_user_data:
        raise HTTPException(status_code=400,detail="User Not Found")
    passchecker(password,find_user_data.password)

    access_token = get_token(find_user_data.user_id,find_user_data.name,find_user_data.email)
    return {"Access Token":access_token}