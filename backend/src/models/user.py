from database.database import Base
from sqlalchemy import Column, Integer , String
class User(Base):
    __tablename__ = "users"