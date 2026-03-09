"""
Catálogo de productos - NUVA
Ropa de mujer juvenil

Para agregar un nuevo producto, copiar el siguiente bloque y completar los campos:

{
    "sku": "XXXX-0000",          # Código único del producto
    "title": "Nombre del producto",
    "description": "Descripción breve",
    "price": 0000,               # Precio en pesos argentinos
    "category": "pantalones",    # Opciones: "pantalones", "joggers", "camperas"
    "image": "/img/nombre.avif", # Ruta a la imagen
    "talles": ["XS", "S", "M", "L", "XL"]  # Talles disponibles
},
"""

products = [
    # ── Conjuntos ────────────────────────────────────────────────────────────
    {
        "sku": "CON-2020",
        "title": "Conjunto zarikof ⭐ forever - negro y blanco",
        "description": "",
        "price": 19000,
        "category": "conjuntos",
        "image": "/img/art-2020.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "CON-2021",
        "title": "Conjunto zarikof ⭐ forever - gris topo y blanco",
        "description": "",
        "price": 19000,
        "category": "conjuntos",
        "image": "/img/art-2021.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "CON-2022",
        "title": "Conjunto zarikof ⭐ forever - rosa y blanco",
        "description": "",
        "price": 19000,
        "category": "conjuntos",
        "image": "/img/art-2022.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "CON-2023",
        "title": "Conjunto zarikof ⭐ forever - crema y blanco",
        "description": "",
        "price": 19000,
        "category": "conjuntos",
        "image": "/img/art-2023.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "CON-2024",
        "title": "Conjunto zarikof ⭐ forever - chocolate y blanco",
        "description": "",
        "price": 19000,
        "category": "conjuntos",
        "image": "/img/art-2024.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "CON-2025",
        "title": "Conjunto zarikof ⭐ forever - blanco y rosa",
        "description": "",
        "price": 19000,
        "category": "conjuntos",
        "image": "/img/art-2025.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },

    # ── Camperas ───────────────────────────────────────────────────────────────
    {
        "sku": "CAM-0010",
        "title": "Campera ",
        "description": "Jogger de algodón con cintura elástica y puños. Súper cómodo para el día a día.",
        "price": 19000,
        "category": "camperas",
        "image": "/img/art-10.avif",
        "talles": ["S"]
    },
    {
        "sku": "CAM-0011",
        "title": "Jogger algodón premium - gris melange",
        "description": "Jogger de algodón con cintura elástica y puños. Súper cómodo para el día a día.",
        "price": 19000,
        "category": "camperas",
        "image": "/img/art-11.avif",
        "talles": ["S"]
    },
    {
        "sku": "CAM-0012",
        "title": "Jogger polar oversized - rosa empolvado",
        "description": "Jogger abrigado de polar con bolsillos laterales y puños acanalados.",
        "price": 19000,
        "category": "camperas",
        "image": "/img/art-12.avif",
        "talles": ["S"]
    },
    {
        "sku": "CAM-0013",
        "title": "Jogger cargo - verde oliva",
        "description": "Jogger estilo cargo con bolsillos laterales y trabillas en los puños.",
        "price": 19000,
        "category": "camperas",
        "image": "/img/art-13.avif",
        "talles": ["S"]
    },
    {
        "sku": "CAM-0014",
        "title": "Jogger cargo - verde oliva",
        "description": "Jogger estilo cargo con bolsillos laterales y trabillas en los puños.",
        "price": 19000,
        "category": "camperas",
        "image": "/img/art-14.avif",
        "talles": ["S"]
    },
    {
        "sku": "CAM-0015",
        "title": "Jogger cargo - verde oliva",
        "description": "Jogger estilo cargo con bolsillos laterales y trabillas en los puños.",
        "price": 19000,
        "category": "camperas",
        "image": "/img/art-15.avif",
        "talles": ["S"]
    },

    # ── BUZOS ──────────────────────────────────────────────────────────────
    {
        "sku": "CAM-0001",
        "title": "Campera bomber - negra",
        "description": "Campera bomber con interior acolchado, puños y cintura elásticos.",
        "price": 58000,
        "category": "camperas",
        "image": "/img/cam-bomber.avif",
        "talles": ["XS", "S", "M", "L", "XL"]
    },
    {
        "sku": "CAM-0002",
        "title": "Campera rompevientos - blanca",
        "description": "Campera rompevientos liviana con capucha desmontable y cierre central.",
        "price": 48000,
        "category": "camperas",
        "image": "/img/cam-rompevientos.avif",
        "talles": ["S", "M", "L", "XL"]
    },
    {
        "sku": "CAM-0003",
        "title": "Campera polar oversize - lila",
        "description": "Campera polar oversize con frisa en el interior. Abrigada y trendy.",
        "price": 52000,
        "category": "camperas",
        "image": "/img/cam-polar.avif",
        "talles": ["XS", "S", "M", "L", "XL"]
    },
    {
        "sku": "CAM-0004",
        "title": "Campera cuero eco - camel",
        "description": "Campera de cuero ecológico con cierre metálico y bolsillos con vivo.",
        "price": 72000,
        "category": "camperas",
        "image": "/img/cam-cuero.avif",
        "talles": ["S", "M", "L"]
    },
]
