from sqlalchemy.orm import Session
from backend.app.db.models.chat import Chat
from backend.app.schemas.chat import ChatCreate


def create_chat(db: Session, chat: ChatCreate):
    db_chat = Chat(**chat.dict())
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return db_chat


def get_chat(db: Session, chat_id: int):
    return db.query(Chat).filter(Chat.id == chat_id).first()


def get_user_chats(db: Session, user_id: int):
    return db.query(Chat).filter(Chat.user_id == user_id).all()
