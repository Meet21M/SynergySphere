from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from typing import Optional

from ..models.user import User
from ..schemas.user import UserCreate, UserResponse, Token, UserLogin, ForgotPassword
from ...core.security import get_password_hash, verify_password, create_access_token
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()

# In-memory user storage for demo (replace with DB)
users_db = []
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

ACCESS_TOKEN_EXPIRE_MINUTES = 30

def get_user_by_email(email: str) -> Optional[User]:
    for user in users_db:
        if user.email == email:
            return user
    return None

@router.post("/signup", response_model=Token)
async def signup(user_create: UserCreate):
    existing_user = get_user_by_email(user_create.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user_create.password)
    new_user = User(
        id=len(users_db) + 1,
        email=user_create.email,
        username=user_create.username,
        hashed_password=hashed_password,
        is_active=True,
        is_verified=False
    )
    users_db.append(new_user)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": new_user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user_by_email(form_data.username)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login-json", response_model=Token)
async def login_json(login_data: UserLogin):
    user = get_user_by_email(login_data.email)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/forgot-password")
async def forgot_password(forgot: ForgotPassword):
    user = get_user_by_email(forgot.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Here you would send a password reset email or token
    return {"message": "Password reset instructions sent to your email."}
