from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from .database import engine
from .settings import get_settings

settings = get_settings()
app = FastAPI(
    title=settings.app_name,
    version="0.0.1",
    description="A deliberately small API boundary. Domain architecture will be added by maturity level.",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/health", tags=["system"])
def health() -> dict[str, str]:
    return {"status": "ok", "service": "ui-kit-api", "version": app.version}


@app.get("/api/health/database", tags=["system"])
def database_health() -> dict[str, str]:
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"status": "ok", "database": "postgresql"}
    except SQLAlchemyError:
        return {"status": "unavailable", "database": "postgresql"}


@app.get("/api/components", tags=["components"])
def list_components() -> dict[str, list[object]]:
    """Reserved API seam. Static frontend metadata remains authoritative for now."""
    return {"items": []}
