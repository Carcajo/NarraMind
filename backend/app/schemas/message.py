from pydantic import BaseModel
from typing import Optional


class MessageBase(BaseModel):
    chat_id: int
    text: str
    scenario_id: Optional[int] = None


class MessageCreate(MessageBase):
    pass


class MessageOut(MessageBase):
    id: int

    class Config:
        orm_mode = True
