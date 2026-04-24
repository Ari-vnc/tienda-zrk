from fastapi import FastAPI, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from pathlib import Path
import os
from .products import products, live_config
from .config import settings

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="ZARIKOF — Ropa de Mujer Juvenil",
    description="API del catálogo de ropa femenina ZARIKOF",
    version="2.0.0",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None
)

# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    max_age=3600,
)

# Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)

    if settings.ENABLE_SECURITY_HEADERS:
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "img-src 'self' data: http: https: blob:; "
            "font-src 'self' https://fonts.gstatic.com; "
            "connect-src 'self'; "
            "frame-ancestors 'none';"
        )
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"

    return response


# ── API Endpoints ──────────────────────────────────────────────────────────────

@app.get("/api/products")
@limiter.limit(settings.RATE_LIMIT_PER_MINUTE)
async def get_products(request: Request, category: str = None):
    """Devuelve todos los productos, con filtro opcional por categoría."""
    if category and category != "todas":
        filtered = [p for p in products if p["category"] == category]
        return filtered
    return products


@app.get("/api/products/{sku}")
@limiter.limit(settings.RATE_LIMIT_PER_MINUTE)
async def get_product_by_sku(request: Request, sku: str):
    """Devuelve un producto por su SKU. Se genera automáticamente para cada producto del catálogo."""
    product = next((p for p in products if p["sku"] == sku), None)
    if not product:
        raise HTTPException(status_code=404, detail=f"Producto con SKU '{sku}' no encontrado")
    return product


@app.get("/api/config")
@limiter.limit("30/minute")
async def get_config(request: Request):
    """Configuración pública (datos de contacto y redes sociales)."""
    return {
        "whatsappNumber": settings.WHATSAPP_NUMBER,
        "contactEmail": settings.CONTACT_EMAIL,
        "instagramUrl": settings.INSTAGRAM_URL,
        "tiktokUrl": settings.TIKTOK_URL,
    }


@app.get("/api/live")
@limiter.limit("60/minute")
async def get_live(request: Request):
    """Devuelve la configuración del live de TikTok (fecha/hora de inicio y fin)."""
    return {
        "live_start": live_config.get("live_start", ""),
        "live_end": live_config.get("live_end", ""),
    }


# ── Página de Detalle de Producto ─────────────────────────────────────────────

@app.get("/producto/{sku}")
async def product_detail_page(sku: str):
    """Página de detalle de un producto por SKU."""
    product_path = Path("frontend/product.html")
    if product_path.is_file():
        return FileResponse(product_path)
    raise HTTPException(status_code=404, detail="Página no encontrada")


# ── Página Mayorista ───────────────────────────────────────────────────────────

@app.get("/mayorista")
async def mayorista_page():
    """Página de ventas mayoristas."""
    mayorista_path = Path("frontend/mayorista.html")
    if mayorista_path.is_file():
        return FileResponse(mayorista_path)
    raise HTTPException(status_code=404, detail="Página no encontrada")


# ── Página Mantenimiento ───────────────────────────────────────────────────────

@app.get("/mantenimiento")
async def mantenimiento_page():
    """Página de mantenimiento del sitio."""
    mantenimiento_path = Path("frontend/mantenimiento.html")
    if mantenimiento_path.is_file():
        return FileResponse(mantenimiento_path)
    raise HTTPException(status_code=404, detail="Página no encontrada")


# ── Página Envíos ──────────────────────────────────────────────────────────────

@app.get("/envios")
async def envios_page():
    """Página de información de envíos."""
    envios_path = Path("frontend/envios.html")
    if envios_path.is_file():
        return FileResponse(envios_path)
    raise HTTPException(status_code=404, detail="Página no encontrada")


# ── Sitemap XML ────────────────────────────────────────────────────────────

@app.get("/sitemap.xml")
async def sitemap():
    """Genera un sitemap XML dinámico con rutas estáticas y productos."""
    import xml.etree.ElementTree as ET
    from datetime import date

    base_url = settings.SITE_URL
    today = date.today().isoformat()

    urlset = ET.Element(
        "urlset",
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9",
    )

    # ── Rutas estáticas ──
    static_routes = [
        {"loc": "/", "priority": "1.0", "changefreq": "daily"},
        {"loc": "/mayorista", "priority": "0.8", "changefreq": "weekly"},
        {"loc": "/envios", "priority": "0.6", "changefreq": "monthly"},
    ]

    for route in static_routes:
        url_el = ET.SubElement(urlset, "url")
        ET.SubElement(url_el, "loc").text = f"{base_url}{route['loc']}"
        ET.SubElement(url_el, "lastmod").text = today
        ET.SubElement(url_el, "changefreq").text = route["changefreq"]
        ET.SubElement(url_el, "priority").text = route["priority"]

    # ── Rutas dinámicas de productos ──
    for product in products:
        url_el = ET.SubElement(urlset, "url")
        ET.SubElement(url_el, "loc").text = f"{base_url}/producto/{product['sku']}"
        ET.SubElement(url_el, "lastmod").text = today
        ET.SubElement(url_el, "changefreq").text = "weekly"
        ET.SubElement(url_el, "priority").text = "0.7"

    xml_bytes = ET.tostring(urlset, encoding="unicode", xml_declaration=False)
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n' + xml_bytes

    return Response(content=xml_content, media_type="application/xml")


# ── Static Files ───────────────────────────────────────────────────────────────

# Mount static assets
app.mount("/static", StaticFiles(directory="frontend"), name="static")


@app.get("/")
async def read_index():
    return FileResponse("frontend/index.html")


@app.get("/img/{filename}")
async def serve_image(filename: str):
    if not filename or ".." in filename or "/" in filename or "\\" in filename:
        raise HTTPException(status_code=404, detail="File not found")

    allowed_extensions = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp", ".avif"}
    file_ext = Path(filename).suffix.lower()

    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=404, detail="File not found")

    img_dir = Path("frontend/img").resolve()
    file_path = (img_dir / filename).resolve()

    try:
        file_path.relative_to(img_dir)
    except ValueError:
        raise HTTPException(status_code=404, detail="File not found")

    if file_path.is_file():
        return FileResponse(file_path)

    raise HTTPException(status_code=404, detail="File not found")


@app.get("/{filename}")
async def serve_frontend_file(filename: str):
    if not filename or ".." in filename or "/" in filename or "\\" in filename:
        raise HTTPException(status_code=404, detail="File not found")

    allowed_extensions = {".html", ".css", ".js", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp", ".avif"}
    file_ext = Path(filename).suffix.lower()

    if file_ext not in allowed_extensions:
        return FileResponse("frontend/index.html")

    frontend_dir = Path("frontend").resolve()
    file_path = (frontend_dir / filename).resolve()

    try:
        file_path.relative_to(frontend_dir)
    except ValueError:
        raise HTTPException(status_code=404, detail="File not found")

    if file_path.is_file():
        return FileResponse(file_path)

    return FileResponse("frontend/index.html")


# ── Health Check ──────────────────────────────────────────────────────────────

@app.get("/health")
async def health_check():
    return {"status": "healthy", "app": "zarikof", "environment": settings.ENVIRONMENT}


# ── Error Handlers ────────────────────────────────────────────────────────────

@app.exception_handler(404)
async def not_found_handler(request: Request, exc: HTTPException):
    return JSONResponse(status_code=404, content={"detail": "Recurso no encontrado"})


@app.exception_handler(500)
async def internal_error_handler(request: Request, exc: Exception):
    if settings.DEBUG:
        return JSONResponse(status_code=500, content={"detail": str(exc)})
    return JSONResponse(status_code=500, content={"detail": "Error interno del servidor"})
