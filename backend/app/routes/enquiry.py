from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime
from app.database import get_db
from app.config import get_settings
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

settings = get_settings()

router = APIRouter()

class EnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

COLLECTION = "enquiries"

@router.post("/enquiry", status_code=201)
async def create_enquiry(data: EnquiryCreate):
    db = get_db()
    
    doc = {
        "name": data.name,
        "email": data.email,
        "message": data.message,
        "created_at": datetime.utcnow(),
    }
    
    result = await db[COLLECTION].insert_one(doc)
    
    # Send email notification
    try:
        msg = MIMEMultipart()
        msg['From'] = settings.email_user
        msg['To'] = settings.notify_email
        msg['Subject'] = "New Enquiry from Luxe Lane"
        
        body = f"""
        New enquiry received:
        
        Name: {data.name}
        Email: {data.email}
        Message: {data.message}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        await aiosmtplib.send(
            msg,
            hostname=settings.email_host,
            port=settings.email_port,
            username=settings.email_user,
            password=settings.email_pass,
            use_tls=True,
        )
    except Exception as e:
        print(f"Email sending failed: {e}")
    
    return {"message": "Enquiry submitted successfully"}