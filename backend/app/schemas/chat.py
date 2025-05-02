from pydantic import BaseModel


class ChatBase(BaseModel):
    user_id: int


class ChatCreate(ChatBase):
    pass


class ChatOut(ChatBase):
    id: int

    class Config:
        orm_mode = True


class ChatResponse(BaseModel):
    response: str
