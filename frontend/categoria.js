/* ====================================================
   ZARIKOF — categoria.js
   Lógica de la página de categoría
   ==================================================== */

const API_URL = "/api/products";
const CONFIG_URL = "/api/config";
const LIVE_URL = "/api/live";

// ── All known categories (including those without products) ──
const ALL_CATEGORIES = [
    { slug: "conjuntos", label: "Conjuntos" },
    { slug: "camperas", label: "Camperas" },
    { slug: "buzos", label: "Buzos" },
    { slug: "remeras", label: "Remeras" },
    { slug: "sweaters", label: "Sweaters" },
    { slug: "joggings", label: "Joggings" },
    { slug: "baby-tee", label: "Baby Tee" },
];

// ── State ──────────────────────────────────────────────────────
let allProducts = [];          // All products from API
let categoryProducts = [];     // Products for current category
let filteredProducts = [];     // After applying filters
let cart = [];
let config = {
    whatsappNumber: "5491100000000",
    instagramUrl: "https://www.instagram.com/zariikof/",
    tiktokUrl: "https://www.tiktok.com/@zariikof"
};
let liveStart = null;
let liveEnd = null;
let isLiveActive = false;

// Current category from URL
const currentCategory = window.location.pathname.split("/categoria/")[1]?.split("/")[0]?.split("?")[0] || "";

// Filter state
let filterState = {
    search: "",
    talles: [],
    priceMin: null,
    priceMax: null,
    soloDisponible: false,
    sort: "default"
};

// ── DOM refs ───────────────────────────────────────────────────
const categoryTitle = document.getElementById("categoryTitle");
const breadcrumbCategory = document.getElementById("breadcrumbCategory");
const productsCount = document.getElementById("productsCount");
const productsGrid = document.getElementById("catProductsGrid");
const searchInput = document.getElementById("catSearchInput");
const sortSelect = document.getElementById("sortSelect");
const tallesFilter = document.getElementById("tallesFilter");
const categoriesFilter = document.getElementById("categoriesFilter");
const priceMin = document.getElementById("priceMin");
const priceMax = document.getElementById("priceMax");
const priceApply = document.getElementById("priceApply");
const disponibleToggle = document.getElementById("disponibleToggle");
const activeFiltersEl = document.getElementById("activeFilters");
const cartBadge = document.getElementById("cartBadge");
const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCart");
const cartEmpty = document.getElementById("cartEmpty");
const cartItemsList = document.getElementById("cartItemsList");
const cartFooter = document.getElementById("cartFooter");
const cartTotal = document.getElementById("cartTotal");
const whatsappBtn = document.getElementById("whatsappBtn");
const contactForm = document.getElementById("contactForm");
const addressGroup = document.getElementById("addressGroup");
const navbar = document.getElementById("navbar");
const instagramLink = document.getElementById("instagramLink");
const tiktokLink = document.getElementById("tiktokLink");
const whatsappLink = document.getElementById("whatsappLink");
const mobileCartBtn = document.getElementById("mobileCartBtn");
const mobileCartBadge = document.getElementById("mobileCartBadge");
const finalizeBtn = document.getElementById("finalizeBtn");
const checkoutFormWrap = document.getElementById("checkoutFormWrap");
const mobileFilterBtn = document.getElementById("mobileFilterBtn");
const catSidebar = document.getElementById("catSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const closeSidebar = document.getElementById("closeSidebar");

// ── Init ───────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
    // Restore cart from sessionStorage
    const pending = JSON.parse(sessionStorage.getItem("pendingCart") || "[]");
    if (pending.length) {
        cart = pending;
        sessionStorage.removeItem("pendingCart");
        refreshCart();
    }

    // Set page title and breadcrumb
    const isAll = !currentCategory || currentCategory === "todas";
    const categoryLabel = isAll ? "Todas" : (ALL_CATEGORIES.find(c => c.slug === currentCategory)?.label || currentCategory);
    categoryTitle.textContent = isAll ? "Todos los productos" : categoryLabel;
    breadcrumbCategory.textContent = categoryLabel;
    document.title = `${categoryLabel} — ZARIKOF`;

    await Promise.all([loadConfig(), loadLiveConfig(), loadProducts()]);
    checkLiveStatus();

    // Filter products for current category (or all if 'todas')
    categoryProducts = isAll
        ? allProducts
        : allProducts.filter(p => p.category === currentCategory);

    buildCategoriesNav();
    buildTallesFilter();
    applyFilters();
    setupEventListeners();
    setInterval(() => checkLiveStatus(), 30000);
});

// ── Load Config ────────────────────────────────────────────────
async function loadConfig() {
    try {
        const res = await fetch(CONFIG_URL);
        if (!res.ok) return;
        const data = await res.json();
        config = { ...config, ...data };
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
        liveEnd = data.live_end ? new Date(data.live_end) : null;
    } catch (err) {
        console.warn("Live config not available.", err);
    }
}

// ── Check Live Status ──────────────────────────────────────────
function checkLiveStatus() {
    const now = new Date();
    const nowActive = liveStart && liveEnd ? (now >= liveStart && now <= liveEnd) : false;
    if (nowActive === isLiveActive) return;
    isLiveActive = nowActive;
    const liveBanner = document.getElementById("liveBanner");
    if (isLiveActive) {
        liveBanner.style.display = "flex";
        document.body.classList.add("live-active");
    } else {
        liveBanner.style.display = "none";
        document.body.classList.remove("live-active");
    }
    applyFilters();
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
}

// ── Build Categories Nav ───────────────────────────────────────
function buildCategoriesNav() {
    // Count products per category from all products
    const counts = {};
    allProducts.forEach(p => {
        counts[p.category] = (counts[p.category] || 0) + 1;
    });

    const activeSlug = currentCategory || "todas";

    // "Todas" button at the top
    let html = `
        <button type="button" class="cat-nav-link${activeSlug === 'todas' ? ' active' : ''}" data-cat="todas">
            Todas
            <span class="cat-link-count">${allProducts.length}</span>
        </button>
    `;

    html += ALL_CATEGORIES.map(cat => {
        const count = counts[cat.slug] || 0;
        const isActive = cat.slug === activeSlug;
        return `
            <button type="button" class="cat-nav-link${isActive ? ' active' : ''}" data-cat="${cat.slug}">
                ${cat.label}
                <span class="cat-link-count">${count}</span>
            </button>
        `;
    }).join("");

    categoriesFilter.innerHTML = html;

    // Bind click handlers
    categoriesFilter.querySelectorAll(".cat-nav-link").forEach(btn => {
        btn.addEventListener("click", () => {
            const slug = btn.dataset.cat;
            switchCategory(slug);
        });
    });
}

// ── Switch Category (without page reload) ──────────────────────
function switchCategory(slug) {
    // Update URL without reloading
    const newUrl = `/categoria/${slug}`;
    history.pushState(null, "", newUrl);

    // Update active state in sidebar
    categoriesFilter.querySelectorAll(".cat-nav-link").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.cat === slug);
    });

    // Update products for new category
    const isAll = slug === "todas";
    categoryProducts = isAll
        ? allProducts
        : allProducts.filter(p => p.category === slug);

    // Update title and breadcrumb
    const label = isAll ? "Todas" : (ALL_CATEGORIES.find(c => c.slug === slug)?.label || slug);
    categoryTitle.textContent = isAll ? "Todos los productos" : label;
    breadcrumbCategory.textContent = label;
    document.title = `${label} — ZARIKOF`;

    // Rebuild talles filter for new category
    buildTallesFilter();

    // Reset filters and re-apply
    filterState.talles = [];
    applyFilters();
}

// ── Build Talles Filter ────────────────────────────────────────
function buildTallesFilter() {
    // Collect all unique talles from current category products
    const talleSet = new Set();
    categoryProducts.forEach(p => {
        (p.talles || []).forEach(t => talleSet.add(t));
    });

    const talles = Array.from(talleSet).sort((a, b) => {
        // Try numeric sort first
        const numA = parseInt(a);
        const numB = parseInt(b);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        return a.localeCompare(b);
    });

    if (talles.length === 0) {
        tallesFilter.innerHTML = '<p style="font-size:13px; color:#999;">Sin talles disponibles</p>';
        return;
    }

    tallesFilter.innerHTML = talles.map(t => {
        const count = categoryProducts.filter(p => (p.talles || []).includes(t)).length;
        return `
            <label class="cat-filter-check">
                <input type="checkbox" value="${t}" class="talle-checkbox">
                ${t}
                <span class="count">${count}</span>
            </label>
        `;
    }).join("");

    // Bind talle checkboxes
    tallesFilter.querySelectorAll(".talle-checkbox").forEach(cb => {
        cb.addEventListener("change", () => {
            filterState.talles = Array.from(tallesFilter.querySelectorAll(".talle-checkbox:checked"))
                .map(c => c.value);
            applyFilters();
        });
    });
}

// ── Apply Filters ──────────────────────────────────────────────
function applyFilters() {
    let result = [...categoryProducts];

    // Search filter
    if (filterState.search) {
        const q = filterState.search.toLowerCase();
        result = result.filter(p =>
            p.title.toLowerCase().includes(q) ||
            (p.description || "").toLowerCase().includes(q)
        );
    }

    // Talle filter
    if (filterState.talles.length > 0) {
        result = result.filter(p =>
            filterState.talles.some(t => (p.talles || []).includes(t))
        );
    }

    // Price filter
    if (filterState.priceMin !== null) {
        result = result.filter(p => p.price >= filterState.priceMin);
    }
    if (filterState.priceMax !== null) {
        result = result.filter(p => p.price <= filterState.priceMax);
    }

    // Disponibilidad filter
    if (filterState.soloDisponible) {
        result = result.filter(p => p.disponible !== false);
    }

    // Sort
    switch (filterState.sort) {
        case "price-asc":
            result.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            result.sort((a, b) => b.price - a.price);
            break;
        case "name-asc":
            result.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "name-desc":
            result.sort((a, b) => b.title.localeCompare(a.title));
            break;
    }

    filteredProducts = result;
    renderProducts(result);
    updateActiveFilters();
    productsCount.textContent = `${result.length} producto${result.length !== 1 ? "s" : ""}`;
}

// ── Render Products ────────────────────────────────────────────
function renderProducts(products) {
    productsGrid.innerHTML = "";

    if (!products.length) {
        productsGrid.innerHTML = `
            <div class="cat-no-products">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                    stroke="#ccc" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <p>No se encontraron productos con los filtros seleccionados.</p>
            </div>
        `;
        return;
    }

    products.forEach((p, i) => {
        const card = buildProductCard(p, i);
        productsGrid.appendChild(card);
    });
}

function buildProductCard(p, index) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${index * 0.05}s`;

    const categoryLabel = ALL_CATEGORIES.find(c => c.slug === p.category)?.label || p.category;

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

    const isDisponible = p.disponible !== false;

    card.innerHTML = `
        <a href="/producto/${p.sku}" class="product-img-link" aria-label="Ver detalle de ${p.title}">
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
        </a>
        <div class="product-info">
            <h3 class="product-title">${p.title}</h3>
            ${priceHTML}
            <div class="talle-selector">
                <p class="talle-label">Talle</p>
                <div class="talle-options">${talleButtons}</div>
            </div>
            <button class="add-to-cart-btn${isDisponible ? "" : " out-of-stock"}" type="button" data-sku="${p.sku}"${isDisponible ? "" : " disabled"}>
                ${isDisponible ? "Agregar al carrito" : "Sin stock"}
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
    if (isDisponible) {
        card.querySelector(".add-to-cart-btn").addEventListener("click", () => {
            const selectedTalle = card.querySelector(".talle-btn.selected")?.dataset.talle || "";
            addToCart(p, selectedTalle);
        });
    }

    return card;
}

// ── Active Filters Display ─────────────────────────────────────
function updateActiveFilters() {
    const tags = [];

    if (filterState.search) {
        tags.push({ label: `Búsqueda: "${filterState.search}"`, clear: () => { filterState.search = ""; searchInput.value = ""; } });
    }
    filterState.talles.forEach(t => {
        tags.push({ label: `Talle: ${t}`, clear: () => {
            filterState.talles = filterState.talles.filter(x => x !== t);
            const cb = tallesFilter.querySelector(`.talle-checkbox[value="${t}"]`);
            if (cb) cb.checked = false;
        }});
    });
    if (filterState.priceMin !== null || filterState.priceMax !== null) {
        const min = filterState.priceMin !== null ? `$${filterState.priceMin}` : "—";
        const max = filterState.priceMax !== null ? `$${filterState.priceMax}` : "—";
        tags.push({ label: `Precio: ${min} a ${max}`, clear: () => {
            filterState.priceMin = null;
            filterState.priceMax = null;
            priceMin.value = "";
            priceMax.value = "";
        }});
    }
    if (filterState.soloDisponible) {
        tags.push({ label: "Solo disponibles", clear: () => { filterState.soloDisponible = false; disponibleToggle.checked = false; } });
    }

    if (tags.length === 0) {
        activeFiltersEl.innerHTML = "";
        return;
    }

    activeFiltersEl.innerHTML = tags.map((t, i) =>
        `<span class="cat-filter-tag">${t.label} <button data-idx="${i}" type="button">✕</button></span>`
    ).join("") + `<button class="cat-clear-all" type="button">Limpiar todo</button>`;

    activeFiltersEl.querySelectorAll(".cat-filter-tag button").forEach(btn => {
        btn.addEventListener("click", () => {
            const idx = parseInt(btn.dataset.idx);
            tags[idx].clear();
            applyFilters();
        });
    });

    activeFiltersEl.querySelector(".cat-clear-all")?.addEventListener("click", () => {
        filterState.search = "";
        filterState.talles = [];
        filterState.priceMin = null;
        filterState.priceMax = null;
        filterState.soloDisponible = false;
        filterState.sort = "default";
        searchInput.value = "";
        priceMin.value = "";
        priceMax.value = "";
        disponibleToggle.checked = false;
        sortSelect.value = "default";
        tallesFilter.querySelectorAll(".talle-checkbox").forEach(cb => cb.checked = false);
        applyFilters();
    });
}

// ── Cart Operations ────────────────────────────────────────────
function addToCart(product, talle) {
    const key = `${product.sku}__${talle}`;
    const existing = cart.find(i => i._key === key);
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

    // Persist to sessionStorage for cross-page cart
    sessionStorage.setItem("pendingCart", JSON.stringify(cart));

    refreshCart();
    openCart();

    cartBadge.classList.remove("pulse");
    void cartBadge.offsetWidth;
    cartBadge.classList.add("pulse");
}

function removeFromCart(key) {
    cart = cart.filter(i => i._key !== key);
    sessionStorage.setItem("pendingCart", JSON.stringify(cart));
    refreshCart();
}

function changeQty(key, delta) {
    const item = cart.find(i => i._key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(key);
    else {
        sessionStorage.setItem("pendingCart", JSON.stringify(cart));
        refreshCart();
    }
}

function refreshCart() {
    const totalItems = cart.reduce((s, i) => s + i.qty, 0);
    const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

    cartBadge.textContent = totalItems;
    cartBadge.dataset.count = totalItems;
    if (mobileCartBadge) {
        mobileCartBadge.textContent = totalItems;
        mobileCartBadge.dataset.count = totalItems;
    }

    cartEmpty.style.display = cart.length ? "none" : "flex";
    cartItemsList.style.display = cart.length ? "flex" : "none";
    cartFooter.style.display = cart.length ? "flex" : "none";

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

    cartTotal.textContent = new Intl.NumberFormat("es-AR", {
        style: "currency", currency: "ARS", minimumFractionDigits: 0
    }).format(totalPrice);

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
    if (finalizeBtn) finalizeBtn.classList.remove("hidden");
    if (checkoutFormWrap) checkoutFormWrap.classList.remove("open");
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

    return [
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
}

// ── Mobile Sidebar ─────────────────────────────────────────────
function openSidebar() {
    catSidebar.classList.add("open");
    sidebarOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeSidebarFn() {
    catSidebar.classList.remove("open");
    sidebarOverlay.classList.remove("open");
    document.body.style.overflow = "";
}

// ── Event Listeners ────────────────────────────────────────────
function setupEventListeners() {
    // Search
    let searchTimeout;
    searchInput.addEventListener("input", () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterState.search = searchInput.value.trim();
            applyFilters();
        }, 300);
    });

    // Sort
    sortSelect.addEventListener("change", () => {
        filterState.sort = sortSelect.value;
        applyFilters();
    });

    // Price filter
    priceApply.addEventListener("click", () => {
        const min = priceMin.value ? parseInt(priceMin.value) : null;
        const max = priceMax.value ? parseInt(priceMax.value) : null;
        filterState.priceMin = min;
        filterState.priceMax = max;
        applyFilters();
    });

    // Disponibilidad toggle
    disponibleToggle.addEventListener("change", () => {
        filterState.soloDisponible = disponibleToggle.checked;
        applyFilters();
    });

    // Filter toggle (collapse/expand)
    document.querySelectorAll("[data-filter-toggle]").forEach(header => {
        header.addEventListener("click", () => {
            header.classList.toggle("collapsed");
            const body = header.nextElementSibling;
            body.classList.toggle("collapsed");
        });
    });

    // Mobile filter button
    mobileFilterBtn.addEventListener("click", openSidebar);
    sidebarOverlay.addEventListener("click", closeSidebarFn);
    if (closeSidebar) closeSidebar.addEventListener("click", closeSidebarFn);

    // Cart open/close
    cartBtn.addEventListener("click", openCart);
    if (mobileCartBtn) mobileCartBtn.addEventListener("click", openCart);
    closeCartBtn.addEventListener("click", closeCartDrawer);
    cartOverlay.addEventListener("click", closeCartDrawer);

    // Finalize button (mobile two-step)
    if (finalizeBtn) {
        finalizeBtn.addEventListener("click", () => {
            finalizeBtn.classList.add("hidden");
            checkoutFormWrap.classList.add("open");
        });
    }

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

    // ESC key closes cart & sidebar
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeCartDrawer();
            closeSidebarFn();
        }
    });
}
