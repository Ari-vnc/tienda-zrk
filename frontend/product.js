/* ====================================================
   ZARIKOF — product.js
   Página de detalle de producto
   ==================================================== */

const API_URL = "/api/products";
const LIVE_URL = "/api/live";

// Lee el SKU desde la URL: /producto/CON-2020
const sku = window.location.pathname.split("/producto/")[1];

let liveActive = false;

document.addEventListener("DOMContentLoaded", async () => {
    if (!sku) { showError(); return; }
    await Promise.all([loadLiveConfig(), loadProduct()]);
});

// ── Live config ────────────────────────────────────────
async function loadLiveConfig() {
    try {
        const res = await fetch(LIVE_URL);
        if (!res.ok) return;
        const data = await res.json();
        const now = new Date();
        const start = data.live_start ? new Date(data.live_start) : null;
        const end = data.live_end ? new Date(data.live_end) : null;
        liveActive = start && end ? (now >= start && now <= end) : false;
    } catch (_) { }
}

// ── Cargar producto ────────────────────────────────────
async function loadProduct() {
    try {
        const res = await fetch(`${API_URL}/${encodeURIComponent(sku)}`);
        if (!res.ok) { showError(); return; }
        const product = await res.json();
        renderProduct(product);
    } catch (err) {
        console.error("Error al cargar producto:", err);
        showError();
    }
}

// ── Render ─────────────────────────────────────────────
function renderProduct(p) {
    document.getElementById("pdLoading").style.display = "none";

    // Título de pestaña
    document.title = `${p.title} — ZARIKOF`;

    const categoryLabel = {
        conjuntos: "Conjuntos",
        buzos: "Buzos",
        camperas: "Camperas",
        sweaters: "Sweaters",
        "baby-tee": "Baby tee"
    }[p.category] || p.category;

    const fmt = (n) => new Intl.NumberFormat("es-AR", {
        style: "currency", currency: "ARS", minimumFractionDigits: 0
    }).format(n);

    const isDisponible = p.disponible !== false;

    // ── Imagen (se asigna src en JS para evitar onerror prematuro) ──
    const imgEl = document.getElementById("pdImg");
    const placeholder = document.getElementById("pdImgPlaceholder");
    imgEl.alt = p.title;
    imgEl.onerror = () => {
        imgEl.style.display = "none";
        placeholder.style.display = "flex";
    };
    imgEl.src = p.image; // asignar DESPUÉS de configurar onerror

    document.getElementById("pdBadge").textContent = categoryLabel;

    // ── Info ──────────────────────────────────────────────
    document.getElementById("pdSku").textContent = `SKU: ${p.sku}`;
    document.getElementById("pdTitle").textContent = p.title;

    // Precios
    const pricesEl = document.getElementById("pdPrices");
    pricesEl.innerHTML = liveActive && p.tiktok_price && p.tiktok_price > 0
        ? `<span class="pd-price-original">${fmt(p.price)}</span>
           <span class="pd-price-tiktok">${fmt(p.tiktok_price)}</span>
           <span class="pd-price-tiktok-label">Precio live TikTok</span>`
        : `<span class="pd-price">${fmt(p.price)}</span>`;

    // ── Talles ────────────────────────────────────────────
    const tallesOpts = document.getElementById("pdTallesOptions");
    let selectedTalle = p.talles?.[0] || "";

    (p.talles || []).forEach((t, i) => {
        const btn = document.createElement("button");
        btn.className = "pd-talle-btn" + (i === 0 ? " selected" : "");
        btn.textContent = t;
        btn.type = "button";
        btn.addEventListener("click", () => {
            tallesOpts.querySelectorAll(".pd-talle-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedTalle = t;
        });
        tallesOpts.appendChild(btn);
    });

    // ── Sin stock ─────────────────────────────────────────
    if (!isDisponible) {
        document.getElementById("pdOutBadge").style.display = "block";
        document.getElementById("pdCartSection").style.display = "none";
        document.getElementById("pdDetail").style.display = "grid";
        return;
    }

    // ── Contador de unidades ──────────────────────────────
    let qty = 0;
    const qtyNum = document.getElementById("pdQtyNum");
    const addBtn = document.getElementById("pdAddBtn");
    const minusBtn = document.getElementById("pdQtyMinus");
    const plusBtn = document.getElementById("pdQtyPlus");

    function updateQty(newQty) {
        qty = Math.max(0, newQty);
        qtyNum.textContent = qty;
        addBtn.disabled = qty === 0;
        minusBtn.disabled = qty === 0;
    }

    plusBtn.addEventListener("click", () => updateQty(qty + 1));
    minusBtn.addEventListener("click", () => updateQty(qty - 1));
    updateQty(0); // inicializar en 0

    // ── Agregar al carrito ────────────────────────────────
    addBtn.addEventListener("click", () => {
        // Construye el objeto igual que app.js espera del carrito
        const cartItem = {
            sku: p.sku,
            title: p.title,
            price: p.price,
            image: p.image,
            talle: selectedTalle,
            qty,
        };

        // Guardar en sessionStorage para que index.html lo consuma al volver
        const pending = JSON.parse(sessionStorage.getItem("pendingCart") || "[]");
        const key = `${p.sku}__${selectedTalle}`;
        const existing = pending.find(i => i._key === key);
        if (existing) {
            existing.qty += qty;
        } else {
            pending.push({ ...cartItem, _key: key });
        }
        sessionStorage.setItem("pendingCart", JSON.stringify(pending));

        // Feedback visual
        addBtn.textContent = "✓ Agregado";
        addBtn.style.background = "#4caf50";
        setTimeout(() => {
            addBtn.textContent = "Agregar al carrito";
            addBtn.style.background = "";
            updateQty(0);
        }, 1400);
    });

    document.getElementById("pdDetail").style.display = "grid";
}

// ── Error ──────────────────────────────────────────────
function showError() {
    document.getElementById("pdLoading").style.display = "none";
    document.getElementById("pdError").style.display = "flex";
}
