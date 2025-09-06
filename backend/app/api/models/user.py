from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: int
    email: str
    username: str
    hashed_password: str
    is_active: bool = True
    is_verified: bool = False
