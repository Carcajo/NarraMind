from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    username: str
    email: str


class LoginRequest(BaseModel):
    email: str
    password: str


class UserCreate(UserBase):
    password: str


class UserInDB(UserBase):
    hashed_password: str


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
