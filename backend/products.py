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
        "title": "Campera cropped - duna",
        "description": "Jogger de algodón con cintura elástica y puños. Súper cómodo para el día a día.",
        "price": 19000,
        "category": "camperas",
        "image": "/img/art-10.avif",
        "talles": ["S-M"]
    },
    {
        "sku": "CAM-0011",
        "title": "Campera cropped - gris melange",
        "description": "Jogger de algodón con cintura elástica y puños. Súper cómodo para el día a día.",
        "price": 19000,
        "category": "camperas",
        "image": "/img/art-11.avif",
        "talles": ["S-M"]
    },
    {
        "sku": "CAM-0012",
        "title": "Campera cropped - pistacho",
        "description": "Jogger abrigado de polar con bolsillos laterales y puños acanalados.",
        "price": 19000,
        "category": "camperas",
        "image": "/img/art-12.avif",
        "talles": ["S-M"]
    },
    {
        "sku": "CAM-0013",
        "title": "Campera cropped - rosa",
        "description": "Jogger estilo cargo con bolsillos laterales y trabillas en los puños.",
        "price": 19000,
        "category": "camperas",
        "image": "/img/art-13.avif",
        "talles": ["S-M"]
    },
    {
        "sku": "CAM-0014",
        "title": "Campera cropped - blanco",
        "description": "Jogger estilo cargo con bolsillos laterales y trabillas en los puños.",
        "price": 19000,
        "category": "camperas",
        "image": "/img/art-14.avif",
        "talles": ["S-M"]
    },
    {
        "sku": "CAM-0015",
        "title": "Campera cropped - negro",
        "description": "Jogger estilo cargo con bolsillos laterales y trabillas en los puños.",
        "price": 19000,
        "category": "camperas",
        "image": "/img/art-15.avif",
        "talles": ["S-M"]
    },

    # ── BUZOS ──────────────────────────────────────────────────────────────
    {
        "sku": "BUZ-3000",
        "title": "Buzo Snoopy - blanco",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3000.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3001",
        "title": "Buzo Snoopy - pistacho",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3001.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3002",
        "title": "Buzo Snoopy - negro",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3002.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3003",
        "title": "Buzo Snoopy - gris",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3003.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3004",
        "title": "Buzo Snoopy - rosa",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3004.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3005",
        "title": "Buzo Snoopy - duna",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3005.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3006",
        "title": "Buzo Admire - gris",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3006.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3007",
        "title": "Buzo Admire - negro",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3007.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3008",
        "title": "Buzo Admire - blanco",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3008.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3009",
        "title": "Buzo Admire - rosa",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3009.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3010",
        "title": "Buzo Admire - pistacho",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3010.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3011",
        "title": "Buzo Admire - duna",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3011.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3100",
        "title": "Buzo Space - pistacho",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3100.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3101",
        "title": "Buzo Space - rosa",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3101.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3102",
        "title": "Buzo Space - negro",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3102.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3103",
        "title": "Buzo Space - gris",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3103.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3104",
        "title": "Buzo Space - blanco",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3104.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
    {
        "sku": "BUZ-3105",
        "title": "Buzo Space - duna",
        "description": "",
        "price": 19000,
        "category": "buzos",
        "image": "/img/art-3105.avif",
        "talles": ["6", "8", "10", "12", "14", "16"]
    },
# ── Sweaters ──────────────────────────────────────────────────────────────
    {
        "sku": "art-100",
        "title": "Sweater fino estampa print - chocolate",
        "description": "",
        "price": 13000,
        "category": "sweaters",
        "image": "/img/art-100.avif",
        "talles": ["S-M"]
    },
    {
        "sku": "art-101",
        "title": "Sweater fino print - blanco",
        "description": "",
        "price": 13000,
        "category": "sweaters",
        "image": "/img/art-101.avif",
        "talles": ["S-M"]
    },
    {
        "sku": "art-110",
        "title": "Sweater fino collage - negro",
        "description": "",
        "price": 13000,
        "category": "sweaters",
        "image": "/img/art-110.avif",
        "talles": ["S-M"]
    },
    {
        "sku": "art-111",
        "title": "Sweater fino collage - blanco",
        "description": "",
        "price": 13000,
        "category": "sweaters",
        "image": "/img/art-111.avif",
        "talles": ["S-M"]
    },
    {
        "sku": "art-120",
        "title": "Sweater fino more fun - beige",
        "description": "",
        "price": 13000,
        "category": "sweaters",
        "image": "/img/art-120.avif",
        "talles": ["S-M"]
    },
]
