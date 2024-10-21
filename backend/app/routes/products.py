from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.crud import get_categories, create_category, get_products, get_product_by_id, create_product
from app.db.database import get_db
from app.db.db_models import Category, Product
from app.schemas import CategoryCreate, CategoryResponse, ProductCreate, ProductResponse

cat_router = APIRouter()
product_router = APIRouter()

# Category endpoints
@cat_router.get("/all_categories/", response_model=list[CategoryResponse])
async def fetch_categories(db: AsyncSession = Depends(get_db)):
    categories = await get_categories(db)
    return categories

@cat_router.post("/add_categories/", response_model=CategoryResponse)
async def add_category(category: CategoryCreate, db: AsyncSession = Depends(get_db)):
    new_category = await create_category(db, category)
    return new_category

# Products
@product_router.get("/all_products/", response_model=list[ProductResponse])
async def fetch_products(
    category_id: int = None,
    min_price: float = None,
    max_price: float = None,
    keyword: str = None,
    db: AsyncSession = Depends(get_db)):
    query = select(Product)

# Apply filters
    if category_id:
        query = query.filter(Product.category_id == category_id)
    if min_price:
        query = query.filter(Product.price >= min_price)
    if max_price:
        query = query.filter(Product.price >= max_price)
    if keyword:
        query = query.filter(Product.name.ilike(f"%{keyword}%") | Product.description.ilike(f"%{keyword}%"))
    
    # Execute query
    result = await db.execute(query)
    products = result.scalars().all()
    return products

@product_router.get("/products_id/{product_id}", response_model=list[ProductResponse])
async def fetch_product_by_id(product_id: int, db: AsyncSession = Depends(get_db)):
    product = await get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

"""This should be admin protected"""
@product_router.post("/add_products/", response_model=ProductResponse)
async def add_product(product: ProductCreate, db: AsyncSession = Depends(get_db)):
    new_product = await create_product(db, product)
    return new_product