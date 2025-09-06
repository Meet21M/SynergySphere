from fastapi import APIRouter, HTTPException
from ..models.item import Item
from ..schemas.item import ItemCreate, ItemResponse

router = APIRouter()

# In-memory storage for demo (replace with database)
items = []

@router.get("/items", response_model=list[ItemResponse])
async def get_items():
    return [item.dict() for item in items]

@router.post("/items", response_model=ItemResponse)
async def create_item(item: ItemCreate):
    new_item = Item(id=len(items) + 1, **item.dict())
    items.append(new_item)
    return new_item.dict()

@router.get("/items/{item_id}", response_model=ItemResponse)
async def get_item(item_id: int):
    for item in items:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")
