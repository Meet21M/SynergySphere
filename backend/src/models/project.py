from database.database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Date
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime
import uuid

class Project(Base):
    __tablename__ = "projects_details"
    project_id = Column(String(100), primary_key=True, nullable=False)
    project_name = Column(String(100), nullable=False)
    project_manager_id = Column(String(100), ForeignKey("users.user_id"), nullable=False)
    description = Column(String(500), nullable=True)
    start_date = Column(DateTime, default=datetime.now, nullable=False)
    end_date = Column(Date, nullable=True)
    priority = Column(Integer, nullable=True)
    tags = Column(ARRAY(String))
    project_status = Column(String(50), default="Active", nullable=False)
    isActive = Column(Boolean, default=True, nullable=False)
    createdAt = Column(DateTime, default=datetime.now, nullable=False)
    modifiedAt = Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
