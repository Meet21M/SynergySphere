from database.database import Base
from sqlalchemy import Column, Integer , String,Boolean,ForeignKey, LargeBinary,DateTime
from datetime import datetime
import uuid
class User(Base):
    __tablename__ = "users"
    user_id = Column(String(100), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    profile_picture = Column(LargeBinary, nullable=False)
    isActive = Column(Boolean,default=True,nullable=False)
    isVerified = Column(Boolean,default=False,nullable=False)
    isDeleted = Column(Boolean,default=False,nullable=False)
    createdAt = Column(DateTime,default=datetime.now,nullable=False)
    modifiedAt = Column(DateTime,default=datetime.now,onupdate=datetime.now,nullable=False)
