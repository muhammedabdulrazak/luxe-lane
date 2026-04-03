# from motor.motor_asyncio import AsyncIOMotorClient
# from app.config import get_settings

# settings = get_settings()

# client: AsyncIOMotorClient = None
# db = None

# async def connect_db():
#     global client, db
#     client = AsyncIOMotorClient(settings.mongo_uri)
#     db = client[settings.db_name]
#     print("Connected to MongoDB")

# async def close_db():
#     global client
#     if client:
#         client.close()
#         print("Disconnected from MongoDB")

# def get_db():
#     return db

# Temporary mock for testing
db = None

async def connect_db():
    print("Mock: Connected to database")

async def close_db():
    print("Mock: Disconnected from database")

def get_db():
    return db