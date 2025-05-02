from fastapi import APIRouter, WebSocket
from pydantic import BaseModel
from backend.app.services.chat_service import chat_service

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


@router.websocket("/chat/ws")
async def websocket_chat(websocket: WebSocket):
    await websocket.accept()
    while True:
        user_message = await websocket.receive_text()
        answer = await chat_service.generate_response(user_message)
        await websocket.send_text(answer)


@router.post("/chat/message", response_model=ChatResponse)
async def chat_message(chat_request: ChatRequest):
    answer = await chat_service.generate_response(chat_request.message)
    return ChatResponse(response=answer)
