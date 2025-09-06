from pydantic import BaseModel

class ItemCreate(BaseModel):
    name: str
    description: str | None = None
    price: float
    available: bool = True

class ItemResponse(BaseModel):
    id: int
    name: str
    description: str | None = None
    price: float
    available: bool = True
