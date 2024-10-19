from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.database import get_db
from app.db import crud
from app.schemas import UserCreate, UserResponse
from app.db.db_models import User
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta

router = APIRouter()
SECRET_KEY = "my_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() +  expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post('/register', response_model=UserResponse)
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    hashed_password = pwd_context.hash(user.password)
    user_in_db = await crud.create_user(db, email=user.email, password=hashed_password)
    return user_in_db

@router.post("/login")
async def login(user: UserCreate, db: AsyncSession = Depends(get_db)):
    async with db() as session:
        user_db = await crud.get_user_by_email(session, email=user.email)
        if not user_db or not pwd_context.verify(user.password, user_db.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect email or password")
        
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
        return {"access_token": access_token, "token_type": "bearer"}
    
@router.post("/logout")
async def logout():
    # logic to come
    return {"msg": "User logged out successfully"}
