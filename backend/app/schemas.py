from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    is_admin: bool = False #allow creation of admins

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    is_active: bool
    is_admin: bool = False 

    class Config:
        from_attributes = True
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class CategoryCreate(BaseModel):
    name: str

class CategoryResponse(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True 


"""
This ensures the ProductCreate request will expect a category_id, and the ProductResponse will include the category details.
"""
class ProductCreate(BaseModel):
    name: str
    price: float
    description: str
    stock: int
    category_id: int

class ProductResponse(BaseModel):
    id: int
    name: str
    price: float
    description: str
    stock: int
    category: CategoryResponse

    class Config:
        orm_mode = True