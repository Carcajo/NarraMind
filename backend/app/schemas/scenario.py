from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class ScenarioBase(BaseModel):
    title: str
    content: str
    platform: str
    status: str


class ScenarioCreate(ScenarioBase):
    user_id: int


class ScenarioOut(ScenarioBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
