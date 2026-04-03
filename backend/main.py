from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from app.database import connect_db, close_db
from app.routes.enquiry import router as enquiry_router
from app.routes.collection import router as collection_router
from app.config import get_settings

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await close_db()


app = FastAPI(
    title="Luxe Lane API",
    description="Backend API for Luxe Lane Clothing Brand 🖤✨",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.client_url,
        "http://localhost:3000",
        "http://localhost:5173",
        "https://luxe-lane.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploads
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(enquiry_router, prefix="/api", tags=["Enquiries"])
app.include_router(collection_router, prefix="/api", tags=["Collections"])


@app.get("/", tags=["Health"])
async def root():
    return {"status": "Luxe Lane API is running 🖤✨"}
