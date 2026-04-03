from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime


class CollectionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    category: Literal["women", "kids"]
    description: str = Field(..., min_length=1, max_length=500)
    order: int = Field(default=0, ge=0)          # display order
    is_active: bool = True


class CollectionUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[Literal["women", "kids"]] = None
    description: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class CollectionResponse(BaseModel):
    id: str
    name: str
    category: str
    description: str
    image_url: str
    order: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
