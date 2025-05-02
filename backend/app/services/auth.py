from sqlalchemy.orm import Session
from backend.app.schemas.auth import LoginRequest
from backend.app.core.security import verify_password, create_access_token
from backend.app.crud.user import get_user_by_email


def authenticate_user(db: Session, login_data: LoginRequest):
    user = get_user_by_email(db, login_data.email)
    if not user or not verify_password(login_data.password, user.hashed_password):
        return None
    return user


def login_for_access_token(db: Session, login_data: LoginRequest):
    user = authenticate_user(db, login_data)
    if not user:
        return None
    access_token = create_access_token(data={"sub": user.email})
    return access_token
