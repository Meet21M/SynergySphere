from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    is_active: bool
    is_verified: bool

class Token(BaseModel):
    access_token: str
    token_type: str

class ForgotPassword(BaseModel):
    email: EmailStr
