from sqlalchemy.orm import Session
from backend.app.db.models import user as models
from backend.app.schemas import user as schemas
from datetime import datetime


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate, hashed_password: str):
    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        registered_at=datetime.utcnow(),
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_last_login(db: Session, user: models.User):
    user.last_login = datetime.utcnow()
    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user_id: int):
    db_user = get_user(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user
