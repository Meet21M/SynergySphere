from database.database import Base
from sqlalchemy import Column, Integer , String,Boolean,ForeignKey, LargeBinary,DateTime
from datetime import datetime
from sqlalchemy.dialects.postgresql import ARRAY
import uuid
class Project(Base):
    __tablename__ = "projects_details"
    project_id = Column(String(100), primary_key=True, nullable=False)
    project_name = Column(String(100), nullable=False)
    project_manager_id = Column(String(100), ForeignKey("users.user_id"), nullable=False)
    description = Column(String(500), nullable=False)
    start_date = Column(DateTime, default=datetime.now, nullable=False)
    end_date = Column(DateTime, nullable=False)
    priority = Column(String(50), nullable=False)
    tags = Column(ARRAY(String))
    no_of_tasks = Column(Integer, default=0, nullable=False)
    project_status = Column(String(50), default="Not Started", nullable=False)
    isActive = Column(Boolean,default=True,nullable=False)
    createdAt = Column(DateTime, default=datetime.now, nullable=False)
    modifiedAt = Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)
