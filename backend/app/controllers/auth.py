from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from app.config import get_settings

settings = get_settings()
security = HTTPBasic()


def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    if credentials.username != settings.admin_username or credentials.password != settings.admin_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username