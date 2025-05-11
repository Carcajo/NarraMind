from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any


class ChatBase(BaseModel):
    user_id: Optional[int] = None


class ChatCreate(ChatBase):
    pass


class ChatOut(ChatBase):
    id: int

    class Config:
        from_attributes = True


class ChatRequest(BaseModel):
    user_message: str = Field(..., description="Сообщение пользователя")
    history: Optional[List[Dict[str, str]]] = Field(None, description="История переписки")


class ChatResponse(BaseModel):
    message: str = Field(..., description="Сгенерированный ответ")
    status: str = Field("success", description="Статус ответа")


class MessageRequest(BaseModel):
    message: str = Field(..., description="Текст запроса пользователя")


class MessageResponse(BaseModel):
    response: str = Field(..., description="Сгенерированный сценарий или ответ")
    status: str = Field("success", description="Статус ответа")
