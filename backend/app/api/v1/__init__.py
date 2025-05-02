from fastapi import APIRouter
from . import auth
from . import users

router = APIRouter()
router.include_router(auth.router, prefix="/auth", tags=["auth"])

