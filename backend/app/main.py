from fastapi import FastAPI, Request
from backend.app.api.v1 import auth, users, chat
from backend.app.core.startup import startup_event
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SMM Strategy Platform")

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(chat.router, prefix="/api/v1/chat", tags=["chat"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])


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


@app.on_event("startup")
def on_startup():
    startup_event()


@app.get("/")
def read_root():
    return {"message": "Welcome to NarraMind"}


@app.post("/generate-script/")
async def generate_script(request: Request):
    data = await request.json()
    user_input = data.get("query", "")
    # result = rag_chain.run(user_input)
    # return {"response": result}
