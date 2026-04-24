import os
from typing import List

class Settings:
    """Configuración de la aplicación ZARIKOF"""

    # CORS Configuration
    CORS_ORIGINS: List[str] = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:8000,http://127.0.0.1:8000,http://localhost:8080,http://127.0.0.1:8080"
    ).split(",")

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: str = os.getenv("RATE_LIMIT_PER_MINUTE", "60/minute")

    # Datos de contacto ZARIKOF — reemplazar con datos reales
    WHATSAPP_NUMBER: str = os.getenv("WHATSAPP_NUMBER", "5491130405544")
    CONTACT_EMAIL: str = os.getenv("CONTACT_EMAIL", "zariikof@gmail.com")

    # Redes sociales ZARIKOF — reemplazar con links reales
    INSTAGRAM_URL: str = os.getenv("INSTAGRAM_URL", "https://www.instagram.com/zariikof/")
    TIKTOK_URL: str = os.getenv("TIKTOK_URL", "https://www.tiktok.com/@zariikof")

    # Security Headers
    ENABLE_SECURITY_HEADERS: bool = os.getenv("ENABLE_SECURITY_HEADERS", "true").lower() == "true"

    # Site URL (for sitemap generation)
    SITE_URL: str = os.getenv("SITE_URL", "https://zarikof.com.ar").rstrip("/")

    # Environment
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

settings = Settings()
