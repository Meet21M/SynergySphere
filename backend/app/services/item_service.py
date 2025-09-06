from sqlalchemy.orm import Session
from ..api.models.item import Item as ItemModel
from ..api.schemas.item import ItemCreate

def get_items(db: Session):
    return db.query(ItemModel).all()

def create_item(db: Session, item: ItemCreate):
    db_item = ItemModel(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_item(db: Session, item_id: int):
    return db.query(ItemModel).filter(ItemModel.id == item_id).first()
