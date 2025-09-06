from database.database import Base
from sqlalchemy import Column, Integer , String,Boolean,ForeignKey, LargeBinary,DateTime
from datetime import datetime
from sqlalchemy.dialects.postgresql import ARRAY
import uuid

class Task(Base):
    __tablename__ = "tasks_details"
    task_id = Column(String(100), primary_key=True, nullable=False)
    task_name = Column(String(100), nullable=False)
    project_id = Column(String(100), ForeignKey("projects_details.project_id"), nullable=False)
    assigned_to = Column(String(100), ForeignKey("users.user_id"), nullable=False)
    description = Column(String(500), nullable=False)
    due_date = Column(DateTime, nullable=False)
    tags = Column(ARRAY(String))
    task_status = Column(String(50), default="To Do", nullable=False)
    isActive = Column(Boolean,default=True,nullable=False)
    createdAt = Column(DateTime, default=datetime.now, nullable=False)
    modifiedAt = Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
    