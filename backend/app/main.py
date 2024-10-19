from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.db.database import engine, Base

app = FastAPI()

@app.on_event('startup')
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(auth_router, prefix="/auth", tags=["auth"])

@app.get("/")
async def read_root():
    return {"msg": " Welcome to the E-commerce platform"}