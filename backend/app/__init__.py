from backend.app.db.session import engine
from backend.app.db import base  # это импортирует все модели


def init_db():
    base.Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()
