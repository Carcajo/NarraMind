from sqlalchemy.orm import Session
from backend.app.db.models.message import Message
from backend.app.schemas.message import MessageCreate


def create_message(db: Session, message: MessageCreate):
    db_message = Message(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message


def get_chat_messages(db: Session, chat_id: int):
    return db.query(Message).filter(Message.chat_id == chat_id).all()
