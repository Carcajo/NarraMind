from sqlalchemy import Column, Integer, ForeignKey, TIMESTAMP, Text
from sqlalchemy.orm import relationship
from backend.app.db.session import Base
import datetime


class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    created_at = Column(TIMESTAMP, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="chats")
    messages = relationship("Message", back_populates="chat", cascade="all, delete")

