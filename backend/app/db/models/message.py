from sqlalchemy import Column, Integer, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.app.db.session import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey("chats.id", ondelete="CASCADE"), nullable=False)
    text = Column(Text, nullable=False)
    scenario_id = Column(Integer, ForeignKey("scenarios.id", ondelete="SET NULL"), nullable=True)

    chat = relationship("Chat", back_populates="messages")
    scenario = relationship("Scenario", back_populates="messages")
