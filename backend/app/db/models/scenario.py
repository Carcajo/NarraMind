from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.db.session import Base
import datetime


class Scenario(Base):
    __tablename__ = "scenarios"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP, default=datetime.datetime.utcnow)
    platform = Column(String(50), nullable=False)
    status = Column(String(50), default="unsaved")

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    creator = relationship("User", back_populates="scenarios")

    messages = relationship("Message", back_populates="scenario", cascade="all, delete-orphan")
