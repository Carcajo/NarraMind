from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from sqlalchemy.orm import relationship
from backend.app.db.session import Base
import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    hashed_password = Column(Text, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    registered_at = Column(TIMESTAMP, default=datetime.datetime.utcnow)
    last_login_at = Column(TIMESTAMP)
    role = Column(String(50), default="user")

    scenarios = relationship("Scenario", back_populates="creator", cascade="all, delete-orphan")
    chats = relationship("Chat", back_populates="user", cascade="all, delete-orphan")

