/* ====================================================
   ZARIKOF — app.js
   Catálogo de ropa de mujer juvenil
   ==================================================== */

const API_URL = "/api/products";
const CONFIG_URL = "/api/config";
const LIVE_URL = "/api/live";

// ── State ──────────────────────────────────────────────────────
let allProducts = [];
let cart = [];    // { sku, title, price, image, talle, qty }
let config = {
    whatsappNumber: "5491100000000",
    instagramUrl: "https://www.instagram.com/zariikof/",
    tiktokUrl: "https://www.tiktok.com/@zariikof"
};
let activeFilter = "todas";
let liveStart    = null;
let liveEnd      = null;
let isLiveActive = false;

// ── DOM refs ───────────────────────────────────────────────────
const liveBanner    = document.getElementById("liveBanner");
const productsGrid  = document.getElementById("productsGrid");
const noProducts    = document.getElementById("noProducts");
const cartBadge     = document.getElementById("cartBadge");
const cartBtn       = document.getElementById("cartBtn");
const cartDrawer    = document.getElementById("cartDrawer");
const cartOverlay   = document.getElementById("cartOverlay");
const closeCart     = document.getElementById("closeCart");
const cartEmpty     = document.getElementById("cartEmpty");
const cartItemsList = document.getElementById("cartItemsList");
const cartFooter    = document.getElementById("cartFooter");
const cartTotal     = document.getElementById("cartTotal");
const whatsappBtn   = document.getElementById("whatsappBtn");
const contactForm   = document.getElementById("contactForm");
const addressGroup  = document.getElementById("addressGroup");
const navbar        = document.getElementById("navbar");
const instagramLink = document.getElementById("instagramLink");
const tiktokLink    = document.getElementById("tiktokLink");
const whatsappLink  = document.getElementById("whatsappLink");

// ── Init ───────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([loadConfig(), loadLiveConfig(), loadProducts()]);
    checkLiveStatus(false);     // sets isLiveActive BEFORE first render
    applyFilter(activeFilter);  // first render with correct live state
    setupEventListeners();
    // Re-check live status every 30 seconds
    setInterval(() => checkLiveStatus(true), 30000);
});

// ── Load Config ────────────────────────────────────────────────
async function loadConfig() {
    try {
        const res = await fetch(CONFIG_URL);
        if (!res.ok) return;
        const data = await res.json();
        config = { ...config, ...data };

        // Update social links
        if (instagramLink && data.instagramUrl) instagramLink.href = data.instagramUrl;
        if (tiktokLink && data.tiktokUrl) tiktokLink.href = data.tiktokUrl;
        if (whatsappLink && data.whatsappNumber)
            whatsappLink.href = `https://wa.me/${data.whatsappNumber}`;
    } catch (err) {
        console.warn("Config not available, using defaults.", err);
    }
}

// ── Load Live Config ───────────────────────────────────────────
async function loadLiveConfig() {
    try {
        const res = await fetch(LIVE_URL);
        if (!res.ok) return;
        const data = await res.json();
        liveStart = data.live_start ? new Date(data.live_start) : null;
        liveEnd   = data.live_end   ? new Date(data.live_end)   : null;
    } catch (err) {
        console.warn("Live config not available.", err);
    }
}

// ── Check Live Status ──────────────────────────────────────────
// rerenderProducts: when true, re-renders the grid if live state changed
function checkLiveStatus(rerenderProducts) {
    const now = new Date();
    const nowActive = liveStart && liveEnd
        ? (now >= liveStart && now <= liveEnd)
        : false;

    if (nowActive === isLiveActive) return; // no change

    isLiveActive = nowActive;

    if (isLiveActive) {
        liveBanner.style.display = "flex";
        document.body.classList.add("live-active");
    } else {
        liveBanner.style.display = "none";
        document.body.classList.remove("live-active");
    }

    if (rerenderProducts) applyFilter(activeFilter);
}

// ── Load Products ──────────────────────────────────────────────
async function loadProducts() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        allProducts = await res.json();
    } catch (err) {
        console.error("Error loading products:", err);
        allProducts = [];
    }
    // NOTE: rendering is deferred to after checkLiveStatus() in the init handler
}


// ── Render Products ────────────────────────────────────────────
function renderProducts(products) {
    // Clear skeletons / previous content
    productsGrid.innerHTML = "";

    if (!products.length) {
        noProducts.style.display = "block";
        return;
    }
    noProducts.style.display = "none";

    products.forEach((p, i) => {
        const card = buildProductCard(p, i);
        productsGrid.appendChild(card);
    });
}

function buildProductCard(p, index) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${index * 0.05}s`;

    const categoryLabel = {
        conjuntos: "Conjuntos",
        buzos: "Buzos",
        camperas: "Camperas",
        sweaters: "Sweaters"
    }[p.category] || p.category;

    // Build talle buttons HTML
    const talleButtons = (p.talles || []).map((t, i) =>
        `<button class="talle-btn${i === 0 ? " selected" : ""}" data-talle="${t}" type="button">${t}</button>`
    ).join("");

    const fmt = (n) => new Intl.NumberFormat("es-AR", {
        style: "currency", currency: "ARS", minimumFractionDigits: 0
    }).format(n);

    // Price HTML: show tiktok promo during live, normal otherwise
    const hasTiktokPrice = isLiveActive && p.tiktok_price && p.tiktok_price > 0;
    const priceHTML = hasTiktokPrice
        ? `<div class="price-wrapper">
               <span class="price-original">${fmt(p.price)}</span>
               <span class="price-tiktok">${fmt(p.tiktok_price)}</span>
           </div>`
        : `<p class="product-price">${fmt(p.price)}</p>`;

    card.innerHTML = `
        <div class="product-img-wrap">
            <img
                class="product-img"
                src="${p.image}"
                alt="${p.title}"
                loading="lazy"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
            >
            <div class="product-img-placeholder" style="display:none">🧥</div>
            <span class="product-category-badge">${categoryLabel}</span>
        </div>
        <div class="product-info">
            <h3 class="product-title">${p.title}</h3>
            ${priceHTML}
            <div class="talle-selector">
                <p class="talle-label">Talle</p>
                <div class="talle-options">${talleButtons}</div>
            </div>
            <button class="add-to-cart-btn" type="button" data-sku="${p.sku}">
                Agregar al carrito
            </button>
        </div>
    `;

    // Talle selection
    const opts = card.querySelectorAll(".talle-btn");
    opts.forEach(btn => {
        btn.addEventListener("click", () => {
            opts.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
        });
    });

    // Add to cart
    card.querySelector(".add-to-cart-btn").addEventListener("click", () => {
        const selectedTalle = card.querySelector(".talle-btn.selected")?.dataset.talle || "";
        addToCart(p, selectedTalle);
    });

    return card;
}

// ── Filter ─────────────────────────────────────────────────────
function applyFilter(filter) {
    activeFilter = filter;
    const filtered = filter === "todas"
        ? allProducts
        : allProducts.filter(p => p.category === filter);
    renderProducts(filtered);
}

// ── Cart Operations ────────────────────────────────────────────
function addToCart(product, talle) {
    const key = `${product.sku}__${talle}`;
    const existing = cart.find(i => i._key === key);
    // Use tiktok price during live if available
    const effectivePrice = (isLiveActive && product.tiktok_price && product.tiktok_price > 0)
        ? product.tiktok_price
        : product.price;

    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            _key: key,
            sku: product.sku,
            title: product.title,
            price: effectivePrice,
            image: product.image,
            talle,
            qty: 1
        });
    }

    refreshCart();
    openCart();

    // Pulse animation on badge
    cartBadge.classList.remove("pulse");
    void cartBadge.offsetWidth;
    cartBadge.classList.add("pulse");
}

function removeFromCart(key) {
    cart = cart.filter(i => i._key !== key);
    refreshCart();
}

function changeQty(key, delta) {
    const item = cart.find(i => i._key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(key);
    else refreshCart();
}

function refreshCart() {
    const totalItems = cart.reduce((s, i) => s + i.qty, 0);
    const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

    // Badge
    cartBadge.textContent = totalItems;
    cartBadge.dataset.count = totalItems;

    // Empty state
    cartEmpty.style.display = cart.length ? "none" : "flex";
    cartItemsList.style.display = cart.length ? "flex" : "none";
    cartFooter.style.display = cart.length ? "flex" : "none";

    // Items
    cartItemsList.innerHTML = cart.map(item => {
        const itemPrice = new Intl.NumberFormat("es-AR", {
            style: "currency", currency: "ARS", minimumFractionDigits: 0
        }).format(item.price * item.qty);

        return `
            <li class="cart-item" data-key="${item._key}">
                <img class="cart-item-img" src="${item.image}" alt="${item.title}"
                    onerror="this.src=''; this.style.display='none'">
                <div class="cart-item-details">
                    <p class="cart-item-title">${item.title}</p>
                    <p class="cart-item-talle">Talle: ${item.talle || "—"}</p>
                    <div class="cart-item-qty">
                        <button class="qty-btn" data-key="${item._key}" data-delta="-1">−</button>
                        <span class="qty-num">${item.qty}</span>
                        <button class="qty-btn" data-key="${item._key}" data-delta="1">+</button>
                    </div>
                    <p class="cart-item-price">${itemPrice}</p>
                </div>
                <button class="remove-btn" data-key="${item._key}">Eliminar</button>
            </li>
        `;
    }).join("");

    // Total
    cartTotal.textContent = new Intl.NumberFormat("es-AR", {
        style: "currency", currency: "ARS", minimumFractionDigits: 0
    }).format(totalPrice);

    // Re-bind item buttons
    cartItemsList.querySelectorAll(".qty-btn").forEach(btn =>
        btn.addEventListener("click", () =>
            changeQty(btn.dataset.key, parseInt(btn.dataset.delta))
        )
    );
    cartItemsList.querySelectorAll(".remove-btn").forEach(btn =>
        btn.addEventListener("click", () => removeFromCart(btn.dataset.key))
    );

    validateForm();
}

// ── Cart Drawer Open/Close ─────────────────────────────────────
function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
    cartOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
    cartOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// ── Form Validation ────────────────────────────────────────────
function validateForm() {
    if (!cart.length) {
        whatsappBtn.disabled = true;
        return;
    }

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const delivery = contactForm.querySelector('input[name="delivery"]:checked');

    let valid = firstName && lastName && phone && delivery;

    if (delivery?.value === "envio") {
        const street = document.getElementById("street").value.trim();
        const streetNum = document.getElementById("streetNum").value.trim();
        const city = document.getElementById("city").value.trim();
        if (!street || !streetNum || !city) valid = false;
    }

    whatsappBtn.disabled = !valid;
}

// ── Build WhatsApp Message ─────────────────────────────────────
function buildWhatsAppMessage() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const delivery = contactForm.querySelector('input[name="delivery"]:checked')?.value;

    const itemLines = cart.map(i =>
        `• ${i.title} (Talle: ${i.talle || "N/A"}) x${i.qty} — ${new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 }).format(i.price * i.qty)
        }`
    ).join("\n");

    const total = new Intl.NumberFormat("es-AR", {
        style: "currency", currency: "ARS", minimumFractionDigits: 0
    }).format(cart.reduce((s, i) => s + i.price * i.qty, 0));

    let address = "";
    if (delivery === "envio") {
        const street = document.getElementById("street").value.trim();
        const streetNum = document.getElementById("streetNum").value.trim();
        const city = document.getElementById("city").value.trim();
        const zip = document.getElementById("zip").value.trim();
        address = `\n📍 Dirección: ${street} ${streetNum}, ${city}${zip ? ` (CP ${zip})` : ""}`;
    }

    const deliveryLabel = delivery === "envio" ? "📦 Envío a domicilio" : "🏪 Retiro en local";

    const msg = [
        `¡Hola! Quisiera hacer un pedido en ZARIKOF 🛍️`,
        ``,
        `👤 ${firstName} ${lastName}`,
        `📱 ${phone}`,
        ``,
        `🛒 *Productos:*`,
        itemLines,
        ``,
        `💰 Total: *${total}*`,
        ``,
        `🚚 Entrega: ${deliveryLabel}${address}`
    ].join("\n");

    return msg;
}

// ── Event Listeners ────────────────────────────────────────────
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            applyFilter(btn.dataset.filter);
        });
    });

    // Cart open/close
    cartBtn.addEventListener("click", openCart);
    closeCart.addEventListener("click", closeCartDrawer);
    cartOverlay.addEventListener("click", closeCartDrawer);

    // Delivery toggle → address fields
    contactForm.querySelectorAll('input[name="delivery"]').forEach(radio => {
        radio.addEventListener("change", () => {
            addressGroup.style.display = radio.value === "envio" ? "flex" : "none";
            validateForm();
        });
    });

    // Form inputs
    contactForm.querySelectorAll("input").forEach(input =>
        input.addEventListener("input", validateForm)
    );

    // WhatsApp send
    whatsappBtn.addEventListener("click", () => {
        const msg = buildWhatsAppMessage();
        const num = config.whatsappNumber || "5491100000000";
        const url = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    });

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    }, { passive: true });

    // ESC key closes cart
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeCartDrawer();
    });
}
