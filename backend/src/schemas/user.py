from pydantic import BaseModel,EmailStr
from typing import Optional
from sqlalchemy import LargeBinary

class PutForgetPassword(BaseModel):
    new_password : str 
    confirm_password : str 