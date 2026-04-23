"""
Catálogo de productos - ZARIKOF
Ropa de mujer juvenil

Para agregar un nuevo producto, copiar el siguiente bloque y completar los campos:

{
    "sku": "XXXX-0000",          # Código único del producto
    "title": "Nombre del producto",
    "description": "Descripción breve",
    "price": 0000,               # Precio en pesos argentinos
    "tiktok_price": 0000,        # Precio especial durante el live de TikTok (0 = sin descuento)
    "category": "pantalones",    # Opciones: "conjuntos", "buzos", "camperas", "sweaters"
    "image": "/img/nombre.avif", # Ruta a la imagen
    "talles": ["XS", "S", "M", "L", "XL"]  # Talles disponibles
},
"""

# ── Configuración del Live de TikTok ─────────────────────────────────────────
# Completar live_start y live_end con fecha/hora en formato ISO 8601.
# Ejemplo: "2026-03-15T20:00:00-03:00"
# Dejar en "" cuando no haya live programado.
live_config = {
    "live_start": "2026-03-21T13:18:00-03:00",
    "live_end": "2026-03-21T13:20:00-03:00",
}

products = [
    # ── Conjuntos ────────────────────────────────────────────────────────────
    {
        "sku": "CON-2020",
        "title": "Conjunto zarikof ⭐ forever - negro y blanco",
        "description": "Tela darlon",
        "price": 19999,
        "tiktok_price": 17000,
        "category": "conjuntos",
        "image": "/img/art-2020.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "CON-2021",
        "title": "Conjunto zarikof ⭐ forever - gris topo y blanco",
        "description": "",
        "price": 19999,
        "tiktok_price": 17000,
        "category": "conjuntos",
        "image": "/img/art-2021.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "CON-2022",
        "title": "Conjunto zarikof ⭐ forever - rosa y blanco",
        "description": "",
        "price": 19999,
        "tiktok_price": 17000,
        "category": "conjuntos",
        "image": "/img/art-2022.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "CON-2023",
        "title": "Conjunto zarikof ⭐ forever - crema y blanco",
        "description": "",
        "price": 19999,
        "tiktok_price": 17000,
        "category": "conjuntos",
        "image": "/img/art-2023.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "CON-2024",
        "title": "Conjunto zarikof ⭐ forever - chocolate y blanco",
        "description": "",
        "price": 19999,
        "tiktok_price": 17000,
        "category": "conjuntos",
        "image": "/img/art-2024.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "CON-2025",
        "title": "Conjunto zarikof ⭐ forever - blanco y rosa",
        "description": "",
        "price": 19999,
        "tiktok_price": 17000,
        "category": "conjuntos",
        "image": "/img/art-2025.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },

    # ── Camperas ───────────────────────────────────────────────────────────────
    {
        "sku": "CAM-0009",
        "title": "Campera cropped - duna",
        "description": "Jogger de algodón con cintura elástica y puños. Súper cómodo para el día a día.",
        "price": 50000,
        "tiktok_price": 40000,
        "category": "camperas",
        "image": "/img/art-9.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "CAM-0010",
        "title": "Campera cropped - duna",
        "description": "Jogger de algodón con cintura elástica y puños. Súper cómodo para el día a día.",
        "price": 19000,
        "tiktok_price": 15000,
        "category": "camperas",
        "image": "/img/art-10.avif",
        "talles": ["S-M"],
        "disponible": False
    },
    {
        "sku": "CAM-0011",
        "title": "Campera cropped - gris melange",
        "description": "Jogger de algodón con cintura elástica y puños. Súper cómodo para el día a día.",
        "price": 19000,
        "tiktok_price": 15000,
        "category": "camperas",
        "image": "/img/art-11.avif",
        "talles": ["S-M"],
        "disponible": False
    },
    {
        "sku": "CAM-0012",
        "title": "Campera cropped - pistacho",
        "description": "Jogger abrigado de polar con bolsillos laterales y puños acanalados.",
        "price": 19000,
        "tiktok_price": 15000,
        "category": "camperas",
        "image": "/img/art-12.avif",
        "talles": ["S-M"],
        "disponible": False
    },
    {
        "sku": "CAM-0013",
        "title": "Campera cropped - rosa",
        "description": "Jogger estilo cargo con bolsillos laterales y trabillas en los puños.",
        "price": 19000,
        "tiktok_price": 15000,
        "category": "camperas",
        "image": "/img/art-13.avif",
        "talles": ["S-M"],
        "disponible": False
    },
    {
        "sku": "CAM-0014",
        "title": "Campera cropped - blanco",
        "description": "Jogger estilo cargo con bolsillos laterales y trabillas en los puños.",
        "price": 19000,
        "tiktok_price": 15000,
        "category": "camperas",
        "image": "/img/art-14.avif",
        "talles": ["S-M"],
        "disponible": False
    },
    {
        "sku": "CAM-0015",
        "title": "Campera cropped - negro",
        "description": "Jogger estilo cargo con bolsillos laterales y trabillas en los puños.",
        "price": 19000,
        "tiktok_price": 15000,
        "category": "camperas",
        "image": "/img/art-15.avif",
        "talles": ["S-M"],
        "disponible": False
    },

    # ── BUZOS ──────────────────────────────────────────────────────────────
    {
        "sku": "BUZ-3000",
        "title": "Buzo Snoopy - blanco",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3000.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3001",
        "title": "Buzo Snoopy - pistacho",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3001.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3002",
        "title": "Buzo Snoopy - negro",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3002.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3003",
        "title": "Buzo Snoopy - gris",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3003.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3004",
        "title": "Buzo Snoopy - rosa",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3004.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3005",
        "title": "Buzo Snoopy - duna",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3005.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3006",
        "title": "Buzo Admire - gris",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3006.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3007",
        "title": "Buzo Admire - negro",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3007.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3008",
        "title": "Buzo Admire - blanco",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3008.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3009",
        "title": "Buzo Admire - rosa",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3009.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3010",
        "title": "Buzo Admire - pistacho",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3010.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3011",
        "title": "Buzo Admire - duna",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3011.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3100",
        "title": "Buzo Space - pistacho",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3100.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3101",
        "title": "Buzo Space - rosa",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3101.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3102",
        "title": "Buzo Space - negro",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3102.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3103",
        "title": "Buzo Space - gris",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3103.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3104",
        "title": "Buzo Space - blanco",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3104.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
    {
        "sku": "BUZ-3105",
        "title": "Buzo Space - duna",
        "description": "",
        "price": 19000,
        "tiktok_price": 14000,
        "category": "buzos",
        "image": "/img/art-3105.avif",
        "talles": ["6", "8", "10", "12", "14", "16"],
        "disponible": True
    },
# ── Sweaters ──────────────────────────────────────────────────────────────
    {
        "sku": "art-100",
        "title": "Sweater fino estampa print - chocolate",
        "description": "",
        "price": 13000,
        "tiktok_price": 8000,
        "category": "sweaters",
        "image": "/img/art-100.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-101",
        "title": "Sweater fino print - blanco",
        "description": "",
        "price": 13000,
        "tiktok_price": 8000,
        "category": "sweaters",
        "image": "/img/art-101.avif",
        "talles": ["S-M"],
        "disponible": False
    },
    {
        "sku": "art-110",
        "title": "Sweater fino collage - negro",
        "description": "",
        "price": 13000,
        "tiktok_price": 8000,
        "category": "sweaters",
        "image": "/img/art-110.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-111",
        "title": "Sweater fino collage - blanco",
        "description": "",
        "price": 13000,
        "tiktok_price": 8000,
        "category": "sweaters",
        "image": "/img/art-111.avif",
        "talles": ["S-M"],
        "disponible": False
    },
    {
        "sku": "art-120",
        "title": "Sweater fino more fun - beige",
        "description": "",
        "price": 13000,
        "tiktok_price": 8000,
        "category": "sweaters",
        "image": "/img/art-120.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-140",
        "title": "Sweater con vivo - violeta",
        "description": "",
        "price": 9000,
        "tiktok_price": 8000,
        "category": "sweaters",
        "image": "/img/art-140.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-141",
        "title": "Sweater con vivo - bordo",
        "description": "",
        "price": 9000,
        "tiktok_price": 8000,
        "category": "sweaters",
        "image": "/img/art-141.avif",
        "talles": ["S-M"],
        "disponible": True
    },
# ── Baby tee ──────────────────────────────────────────────────────────────
    {
        "sku": "art-122",
        "title": "Remera lisa manga larga c/frunce - negro",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-122.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-123",
        "title": "Remera lisa manga larga c/frunce - beige",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-123.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-124",
        "title": "Remera lisa manga larga c/frunce - chocolate",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-124.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-125",
        "title": "Remera lisa manga larga c/frunce - blanco",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-125.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-126",
        "title": "Remera lisa manga larga c/cuello - verde oscuro",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-126.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-127",
        "title": "Remera rayada manga larga c/cuello - negro",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-127.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-128",
        "title": "Remera rayada manga larga c/cuello - bordo",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-128.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-129",
        "title": "Remera rayada manga larga c/frunce - gris",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-129.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-130",
        "title": "Remera rayadamanga larga c/frunce - negra",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-130.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-131",
        "title": "Remera rayada manga larga c/frunce - verde",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-131.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-132",
        "title": "Remera rayada manga larga escote en V - negro",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-132.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-133",
        "title": "Remera rayada manga larga escote en V - bordo",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-133.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-134",
        "title": "Remera rayada manga larga escote en V - rosa",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-134.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-135",
        "title": "Remera rayada manga larga escote en V - gris",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-135.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-136",
        "title": "Remera rayada manga larga escote en V - blanca",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-136.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-137",
        "title": "Remera lisa manga larga - negro",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-137.avif",
        "talles": ["S-M"],
        "disponible": False
    },
    {
        "sku": "art-138",
        "title": "Remera lisa manga larga - rosa",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-138.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-139",
        "title": "Remera lisa manga larga - pistacho",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-139.avif",
        "talles": ["S-M"],
        "disponible": False
    },
    {
        "sku": "art-150",
        "title": "Remera lisa manga larga e/sol - marron",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-150.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-151",
        "title": "Remera lisa manga larga e/sol - negro",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-151.avif",
        "talles": ["S-M"],
        "disponible": True
    },
    {
        "sku": "art-152",
        "title": "Remera lisa manga larga e/heart - blanco",
        "description": "",
        "price": 5000,
        "tiktok_price": 4000,
        "category": "baby-tee",
        "image": "/img/art-152.avif",
        "talles": ["S-M"],
        "disponible": True
    },

]
# ── Sweaters ──────────────────────────────────────────────────────────────