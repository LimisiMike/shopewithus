from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    is_active: bool

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int

    class Config:
        from_attributes = True # Enables reading from SQLAlchemy objects


class ProductCreate(BaseModel):
    name: str
    price: float
    description: Optional[str] = None
    stock: int
    category_id: int

class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True