from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    mongo_uri: str = Field(..., env="MONGO_URI")
    db_name: str = Field(default="luxelane", env="DB_NAME")
    port: int = Field(default=8000, env="PORT")
    admin_username: str = Field(..., env="ADMIN_USERNAME")
    admin_password: str = Field(..., env="ADMIN_PASSWORD")
    email_host: str = Field(..., env="EMAIL_HOST")
    email_port: int = Field(default=587, env="EMAIL_PORT")
    email_user: str = Field(..., env="EMAIL_USER")
    email_pass: str = Field(..., env="EMAIL_PASS")
    notify_email: str = Field(..., env="NOTIFY_EMAIL")
    client_url: str = Field(..., env="CLIENT_URL")

    class Config:
        env_file = ".env"


def get_settings() -> Settings:
    return Settings()