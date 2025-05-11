# from fastapi import APIRouter, WebSocket
# from pydantic import BaseModel
# from backend.app.services.chat_service import chat_service
#
# router = APIRouter()
#
#
# class ChatRequest(BaseModel):
#     message: str
#
#
# class ChatResponse(BaseModel):
#     response: str
#
#
# @router.websocket("/chat/ws")
# async def websocket_chat(websocket: WebSocket):
#     await websocket.accept()
#     while True:
#         user_message = await websocket.receive_text()
#         answer = await chat_service.generate_response(user_message)
#         await websocket.send_text(answer)
#
#
# @router.post("/chat/message", response_model=ChatResponse)
# async def chat_message(chat_request: ChatRequest):
#     answer = await chat_service.generate_response(chat_request.message)
#     return ChatResponse(response=answer)


# from fastapi import APIRouter, WebSocket, HTTPException, Depends
# from pydantic import BaseModel
# from typing import Optional
# from backend.app.services.chat_service import chat_service
# from backend.app.core.dependencies import get_current_user
#
# router = APIRouter()
#
#
# class GenerateScriptRequest(BaseModel):
#     message: str  # Текст запроса пользователя
#     title: Optional[str] = None  # Опциональное название сценария
#
#
# class GenerateScriptResponse(BaseModel):
#     response: str  # Сгенерированный сценарий
#
#
# class ChatRequest(BaseModel):
#     message: str  # Текст запроса пользователя
#
#
# class ChatResponse(BaseModel):
#     response: str  # Ответ от чата
#
#
# @router.websocket("/chat/ws")
# async def websocket_chat(websocket: WebSocket):
#     """
#     Обработка WebSocket-соединения для чата в реальном времени
#     """
#     await websocket.accept()
#     try:
#         while True:
#             user_message = await websocket.receive_text()
#             answer = await chat_service.generate_response(user_message)
#             await websocket.send_text(answer)
#     except Exception as e:
#         await websocket.close(code=1000)
#
#
# @router.post("/chat/message", response_model=ChatResponse)
# async def chat_message(chat_request: ChatRequest):
#     """
#     Обработка HTTP-запроса для получения ответа от чата
#     """
#     try:
#         answer = await chat_service.generate_response(chat_request.message)
#         return ChatResponse(response=answer)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Ошибка генерации ответа: {str(e)}")
#
#
# @router.post("/generate-script", response_model=GenerateScriptResponse)
# async def generate_script(request: GenerateScriptRequest):
#     """
#     Генерация сценария на основе пользовательского запроса
#
#     Эта конечная точка специально для создания SMM сценариев с использованием
#     RAG (Retrieval-Augmented Generation) на основе примеров из базы.
#     """
#     try:
#         # Добавляем информацию о названии, если оно предоставлено
#         user_message = request.message
#         if request.title:
#             user_message = f"Название: {request.title}\n{user_message}"
#
#         answer = await chat_service.generate_response(user_message)
#         return GenerateScriptResponse(response=answer)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Ошибка генерации сценария: {str(e)}")


from fastapi import APIRouter, WebSocket, HTTPException, Depends, Body
from pydantic import BaseModel
from typing import Optional, List, Dict
import logging
from backend.app.services.chat_service import chat_service
from backend.app.schemas.chat import MessageRequest, MessageResponse, ChatRequest, ChatResponse

router = APIRouter()
logger = logging.getLogger(__name__)


class GenerateScriptRequest(BaseModel):
    message: str
    title: Optional[str] = None


class GenerateScriptResponse(BaseModel):
    response: str

@router.websocket("/chat/ws")
async def websocket_chat(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            user_message = await websocket.receive_text()
            logger.info(f"WebSocket received: {user_message[:50]}...")

            answer = await chat_service.generate_response(user_message)

            await websocket.send_text(answer)
            logger.info(f"WebSocket sent response: {len(answer)} chars")
    except Exception as e:
        logger.error(f"WebSocket error: {str(e)}")
        await websocket.close(code=1000)


@router.post("/chat/message", response_model=MessageResponse)
async def chat_message(request: MessageRequest = Body(...)):
    try:
        logger.info(f"Received chat message request: {request.message[:50]}...")

        answer = await chat_service.generate_response(request.message)

        logger.info(f"Returning response: {len(answer)} chars")
        return MessageResponse(response=answer, status="success")
    except Exception as e:
        logger.error(f"Error in chat_message endpoint: {str(e)}")
        return MessageResponse(
            response="Извините, произошла ошибка при обработке запроса. Пожалуйста, попробуйте еще раз.",
            status="error"
        )


@router.post("/generate-script", response_model=GenerateScriptResponse)
async def generate_script(request: GenerateScriptRequest):
    try:
        user_message = request.message
        if request.title:
            user_message = f"Название: {request.title}\n{user_message}"

        logger.info(f"Generate script request: {user_message[:50]}...")
        answer = await chat_service.generate_response(user_message)

        return GenerateScriptResponse(response=answer)
    except Exception as e:
        logger.error(f"Error generating script: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Ошибка генерации сценария: {str(e)}")
