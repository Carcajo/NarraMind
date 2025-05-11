from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Literal
from enum import Enum


class RoleEnum(str, Enum):
    admin = "admin"
    user = "user"


class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: RoleEnum


class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: Literal["user", "admin"] = "user"


class User(UserBase):
    id: int
    registered_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str
