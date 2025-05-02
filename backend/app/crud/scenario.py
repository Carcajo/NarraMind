from sqlalchemy.orm import Session
from backend.app.db.models.scenario import Script
from backend.app.schemas.scenario import ScenarioCreate


def create_scenario(db: Session, scenario: ScenarioCreate):
    db_scenario = Script(**scenario.dict())
    db.add(db_scenario)
    db.commit()
    db.refresh(db_scenario)
    return db_scenario


def get_scenario(db: Session, scenario_id: int):
    return db.query(Script).filter(Script.id == scenario_id).first()


def get_user_scenarios(db: Session, user_id: int):
    return db.query(Script).filter(Script.user_id == user_id).all()
