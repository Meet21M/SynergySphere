from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date

class CreateProjectSchema(BaseModel):
    project_name: str = Field(..., max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    end_date: Optional[date]
    priority: Optional[int] = Field(None, ge=1, le=5)
    tags: Optional[List[str]] = None

    class Config:
        orm_mode = True
