from fastapi import APIRouter, Depends, Query, Form, File, UploadFile
from typing import Optional
from app.models.collection import CollectionCreate, CollectionUpdate
from app.controllers.collection import (
    get_public_collections,
    get_all_collections,
    create_collection,
    update_collection,
    delete_collection,
    reorder_collections,
)
from app.controllers.auth import verify_admin

router = APIRouter()


# ── PUBLIC ────────────────────────────────────────────────────────

@router.get("/collections", summary="Get active collections for frontend")
async def public_collections(
    category: Optional[str] = Query(None, description="women | kids")
):
    """Returns only active collections sorted by order. Used by frontend."""
    return await get_public_collections(category)


# ── ADMIN ─────────────────────────────────────────────────────────

@router.get("/admin/collections", summary="Get all collections (admin)")
async def admin_list_collections(
    category: Optional[str] = Query(None),
    _: str = Depends(verify_admin),
):
    return await get_all_collections(category)


@router.post("/admin/collections", status_code=201, summary="Add new collection")
async def admin_create_collection(
    name: str = Form(...),
    category: str = Form(...),
    description: str = Form(...),
    order: int = Form(0),
    is_active: bool = Form(True),
    image: UploadFile = File(...),
    _: str = Depends(verify_admin),
):
    return await create_collection(name, category, description, order, is_active, image)


@router.patch("/admin/collections/{collection_id}", summary="Update collection")
async def admin_update_collection(
    collection_id: str,
    name: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    order: Optional[int] = Form(None),
    is_active: Optional[bool] = Form(None),
    image: Optional[UploadFile] = File(None),
    _: str = Depends(verify_admin),
):
    return await update_collection(collection_id, name, category, description, order, is_active, image)


@router.delete("/admin/collections/{collection_id}", summary="Delete collection")
async def admin_delete_collection(
    collection_id: str,
    _: str = Depends(verify_admin),
):
    return await delete_collection(collection_id)


@router.post("/admin/collections/reorder", summary="Reorder collections")
async def admin_reorder(
    order_list: list[dict],
    _: str = Depends(verify_admin),
):
    """Pass list of {id, order} to reorder display sequence."""
    return await reorder_collections(order_list)
