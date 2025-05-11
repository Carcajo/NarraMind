from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from sentence_transformers import SentenceTransformer
from backend.app.api.v1 import auth, chat
from backend.app.services.chat_service import chat_service
from backend.app.schemas.chat import MessageRequest, MessageResponse


app = FastAPI(title="SMM Strategy Platform")
app.include_router(auth.router, prefix="/api/v1/auth")
app.include_router(chat.router, prefix="/api/v1/chat")
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open(os.path.join(BASE_DIR, "base.json"), "r", encoding="utf-8") as f:
    examples = json.load(f)

model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
example_texts = [ex["script"] for ex in examples]
example_embeddings = model.encode(example_texts, convert_to_tensor=True)


@app.get("/")
def read_root():
    return {"message": "Welcome to NarraMind"}


@app.post("/api/v1/chat/message", response_model=MessageResponse)
async def chat_message_direct(request: MessageRequest = Body(...)):
    try:
        answer = await chat_service.generate_response(request.message)
        return MessageResponse(response=answer, status="success")
    except Exception as e:
        return MessageResponse(
            response="Извините, произошла ошибка при обработке запроса. Пожалуйста, попробуйте еще раз.",
            status="error"
        )
