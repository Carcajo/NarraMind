from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from backend.app.schemas.user import UserCreate, UserLogin, User as UserSchema
from backend.app.db.session import get_db
from backend.app.crud import user as crud_user
from backend.app.core.security import verify_password, get_password_hash, create_access_token
from backend.app.core.dependencies import get_current_user


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


@router.post("/register", response_model=UserSchema)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    user = crud_user.get_user_by_email(db, user_in.email)
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user_in.password)
    return crud_user.create_user(db=db, user=user_in, hashed_password=hashed_password)


@router.post("/login")
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    user = crud_user.get_user_by_email(db, user_in.email)
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    crud_user.update_last_login(db, user)
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=UserSchema)
def read_current_user(current_user: UserSchema = Depends(get_current_user)):
    return current_user
