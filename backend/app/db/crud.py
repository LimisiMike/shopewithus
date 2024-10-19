from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.db_models import User
from fastapi import HTTPException

async def create_user(db: AsyncSession, email: str, password: str) -> User:
    new_user = User(email=email, hashed_password=password)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

async def get_user_by_email(db: AsyncSession, email: str) -> User:
    result = await db.execute(select(User).filter(User.email == email))
    user = result.scalars().first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user