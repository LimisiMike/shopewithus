from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import os

# Determine if the app is running in Docker or locally
# You might set an environment variable in Docker to indicate this
is_docker = os.environ.get('DOCKER_ENV', 'false') == 'true'

# Set the DATABASE_URL based on the environment
if is_docker:
    DATABASE_URL = "postgresql+asyncpg://postgres:mypassword@db:5432/shope" 
else:
    DATABASE_URL = "postgresql+asyncpg://postgres:mypassword@localhost:5432/shope"
    
Base = declarative_base()
engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

async def get_db() -> AsyncSession:
    async with async_session() as session:
        yield session
