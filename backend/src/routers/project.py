from fastapi import APIRouter, HTTPException, status, Depends, Header
from sqlalchemy.orm import Session
import uuid

from src.models.project import Project
from src.models.user import User
from src.schemas.project import CreateProjectSchema
from database.database import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user_id(user_id: str = Header(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found. Cannot create project."
        )
    return user.user_id

project_router = APIRouter()

@project_router.post("/projects/create", status_code=status.HTTP_201_CREATED)
async def create_project(
    project_data: CreateProjectSchema,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user_id)
):
    new_project = Project(
        project_id=str(uuid.uuid4()),
        project_name=project_data.project_name,
        project_manager_id=current_user_id,
        description=project_data.description,
        end_date=project_data.end_date,
        priority=project_data.priority,
        tags=project_data.tags
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return {"message": "Project created successfully!", "project_id": new_project.project_id}
