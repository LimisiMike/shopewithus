from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.products import product_router, cat_router
from app.db.database import engine, Base

app = FastAPI()

# Event to initialize the database
@app.on_event('startup')
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(cat_router, prefix="/cat", tags=["cat"])
app.include_router(product_router, prefix="/prod", tags=["prod"])


@app.get("/")
async def read_root():
    return {"msg": " Welcome to the E-commerce platform"}