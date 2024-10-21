from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.db_models import User, Product, Category
from fastapi import HTTPException
from app.schemas import UserCreate, UserResponse, CategoryCreate, CategoryResponse, ProductCreate, ProductResponse

async def create_user(db: AsyncSession, user: UserCreate) -> User:
    new_user = User(email=user.email, hashed_password=user.password) #We'll need to hash pw properly
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return UserResponse.from_orm(new_user)

async def get_user_by_email(db: AsyncSession, email: str) -> UserResponse:
    result = await db.execute(select(User).filter(User.email == email))
    user = result.scalars().first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return UserResponse.from_orm(user)

# Category CRUD operations
async def get_categories(db: AsyncSession) -> list[CategoryResponse]:
    result = await db.execute(select(Category))
    categories = result.scalars().all()
    return [CategoryResponse.from_orm(category) for category in categories]

async def create_category(db: AsyncSession, category: CategoryCreate) -> CategoryResponse:
    name = category.name
    existing_category = await db.execute(select(Category).filter_by(name=name))
    if existing_category.scalar():
        raise HTTPException(status_code=400, detail="Category already exists")
    new_category = Category(name=name)
    db.add(new_category)
    await db.commit()
    await db.refresh(new_category)
    return CategoryResponse.from_orm(new_category)

# Product crud
async def get_products(db: AsyncSession) -> list[ProductResponse]:
    result = await db.execute(select(Product))
    products = result.scalars().all()
    return [ProductResponse.from_orm(product) for product in products]

async def get_product_by_id(db: AsyncSession, product_id: int) -> ProductResponse:
    result = await db.execute(select(Product).filter_by(id=product_id))
    product = result.scalars().first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductResponse.from_orm(product)


async def create_product(db: AsyncSession, product: ProductCreate) -> ProductResponse:
    new_product = Product(name=product.name, price=product.price, description=product.description, stock=product.stock, category_id=product.category_id)
    db.add(new_product)
    await db.commit()
    await db.refresh(new_product)
    return ProductResponse.from_orm(new_product)