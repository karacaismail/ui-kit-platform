from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "UI Kit API"
    environment: str = "development"
    database_url: str = "postgresql+psycopg://ui_kit:ui_kit@127.0.0.1:55432/ui_kit"
    allowed_origins: list[str] = ["http://localhost:4321", "http://127.0.0.1:4321"]

    model_config = SettingsConfigDict(env_file=".env", env_prefix="UI_KIT_", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()
