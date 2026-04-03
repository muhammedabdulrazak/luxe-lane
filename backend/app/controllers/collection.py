from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException
from app.database import get_db
from app.models.collection import CollectionCreate, CollectionUpdate

COLLECTION = "collections"


def _serialize(doc: dict) -> dict:
    doc["id"] = str(doc.pop("_id"))
    return doc


# ── Get all active collections (public — used by frontend) ────────
async def get_public_collections(category: str = None):
    db = get_db()
    query = {"is_active": True}
    if category:
        query["category"] = category
    cursor = db[COLLECTION].find(query).sort("order", 1)
    return [_serialize(doc) async for doc in cursor]


# ── Get ALL collections including inactive (admin) ────────────────
async def get_all_collections(category: str = None):
    db = get_db()
    query = {}
    if category:
        query["category"] = category
    cursor = db[COLLECTION].find(query).sort([("category", 1), ("order", 1)])
    return [_serialize(doc) async for doc in cursor]


# ── Create collection (admin) ─────────────────────────────────────
async def create_collection(name: str, category: str, description: str, order: int, is_active: bool, image):
    db = get_db()
    now = datetime.utcnow()

    # Auto-assign next order number if not provided
    if order == 0:
        last = await db[COLLECTION].find_one(
            {"category": category},
            sort=[("order", -1)]
        )
        order = (last["order"] + 1) if last else 1

    # Save image file
    import os
    from pathlib import Path
    
    # Create uploads directory if it doesn't exist
    upload_dir = Path("uploads")
    upload_dir.mkdir(exist_ok=True)
    
    # Generate unique filename
    file_extension = Path(image.filename).suffix
    filename = f"{ObjectId()}{file_extension}"
    file_path = upload_dir / filename
    
    # Save file
    with open(file_path, "wb") as buffer:
        content = await image.read()
        buffer.write(content)
    
    image_url = f"/uploads/{filename}"

    doc = {
        "name": name,
        "category": category,
        "description": description,
        "image_url": image_url,
        "order": order,
        "is_active": is_active,
        "created_at": now,
        "updated_at": now,
    }

    result = await db[COLLECTION].insert_one(doc)
    doc["_id"] = result.inserted_id
    return _serialize(doc)


# ── Update collection (admin) ─────────────────────────────────────
async def update_collection(collection_id: str, name=None, category=None, description=None, order=None, is_active=None, image=None):
    db = get_db()

    if not ObjectId.is_valid(collection_id):
        raise HTTPException(status_code=400, detail="Invalid ID")

    update_fields = {"updated_at": datetime.utcnow()}
    
    if name is not None:
        update_fields["name"] = name
    if category is not None:
        update_fields["category"] = category
    if description is not None:
        update_fields["description"] = description
    if order is not None:
        update_fields["order"] = order
    if is_active is not None:
        update_fields["is_active"] = is_active
    
    # Handle image upload
    if image is not None:
        import os
        from pathlib import Path
        
        # Create uploads directory if it doesn't exist
        upload_dir = Path("uploads")
        upload_dir.mkdir(exist_ok=True)
        
        # Generate unique filename
        file_extension = Path(image.filename).suffix
        filename = f"{ObjectId()}{file_extension}"
        file_path = upload_dir / filename
        
        # Save file
        with open(file_path, "wb") as buffer:
            content = await image.read()
            buffer.write(content)
        
        update_fields["image_url"] = f"/uploads/{filename}"

    result = await db[COLLECTION].find_one_and_update(
        {"_id": ObjectId(collection_id)},
        {"$set": update_fields},
        return_document=True,
    )

    if not result:
        raise HTTPException(status_code=404, detail="Collection not found")

    return _serialize(result)


# ── Delete collection (admin) ─────────────────────────────────────
async def delete_collection(collection_id: str):
    db = get_db()

    if not ObjectId.is_valid(collection_id):
        raise HTTPException(status_code=400, detail="Invalid ID")

    result = await db[COLLECTION].delete_one({"_id": ObjectId(collection_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Collection not found")

    return {"message": "Deleted successfully"}


# ── Reorder collections (admin) ───────────────────────────────────
async def reorder_collections(order_list: list[dict]):
    """
    Accepts a list of { id, order } and bulk-updates all orders.
    Example: [{"id": "abc123", "order": 1}, {"id": "def456", "order": 2}]
    """
    db = get_db()
    for item in order_list:
        if not ObjectId.is_valid(item["id"]):
            continue
        await db[COLLECTION].update_one(
            {"_id": ObjectId(item["id"])},
            {"$set": {"order": item["order"], "updated_at": datetime.utcnow()}},
        )
    return {"message": "Order updated"}
