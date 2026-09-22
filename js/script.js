// =========================
// PRODUCTS DATA
// =========================

const products = [
  {
    name: "MacBook Pro",
    price: 75000000,
    category: "laptop",
    stock: "in-stock",
    image: "images/laptop.webp",
  },
  {
    name: "iPhone 15",
    price: 55000000,
    category: "mobile",
    stock: "in-stock",
    image: "images/iphone.webp",
  },
  {
    name: "AirPods Max",
    price: 25000000,
    category: "headphone",
    stock: "in-stock",
    image: "images/headphone.webp",
  },
  {
    name: "AirPods",
    price: 18000000,
    category: "airpods",
    stock: "in-stock",
    image: "images/airpod.webp",
  },
  {
    name: "ASUS ROG Strix",
    price: 62000000,
    category: "laptop",
    stock: "in-stock",
    image: "images/laptop1.webp",
  },
  {
    name: "Samsung Galaxy S24",
    price: 48000000,
    category: "mobile",
    stock: "out-of-stock",
    image: "images/phone.webp",
  },
  {
    name: "Sony WH-1000XM5",
    price: 14500000,
    category: "headphone",
    stock: "in-stock",
    image: "images/head.webp",
  },
  {
    name: "Apple Watch Series 9",
    price: 12500000,
    category: "smartwatch",
    stock: "in-stock",
    image: "images/applewatch.webp",
  },
];

// =========================
// DOM ELEMENTS
// =========================

const productsGrid = document.querySelector("#productsGrid");
const productsCount = document.querySelector("#productsCount");

const categoryFilters = document.querySelectorAll(".category-filter");

const availabilityFilters = document.querySelectorAll(
  'input[name="availability"]',
);

const priceRange = document.querySelector("#priceRange");
const priceValue = document.querySelector("#priceValue");

const sortProducts = document.querySelector("#sortProducts");

const resetButtons = document.querySelectorAll(".reset-btn");

const searchInput = document.querySelector("#searchInput");

// =========================
// SEARCH DEBOUNCE
// =========================

let searchTimer;

// =========================
// RENDER PRODUCTS
// =========================

function renderProducts(filteredProducts) {
  productsGrid.innerHTML = "";

  filteredProducts.forEach((product) => {
    const productCard = document.createElement("article");

    productCard.className = "product-card";

    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-info">
        <span class="product-category">
          ${product.category}
        </span>

        <h3>${product.name}</h3>

        <strong class="product-price">
          ${product.price.toLocaleString("fa-IR")} تومان
        </strong>

        <button type="button" class="product-btn">
          مشاهده
        </button>
      </div>
    `;

    productsGrid.append(productCard);
  });

  productsCount.textContent = filteredProducts.length.toLocaleString("fa-IR");
}

// =========================
// FILTER PRODUCTS
// =========================

function filterProducts() {
  const selectedCategories = Array.from(categoryFilters)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.dataset.category);

  const selectedAvailability = Array.from(availabilityFilters)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const maxPrice = Number(priceRange.value);

  const searchValue = searchInput.value.trim().toLowerCase();

  let filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.includes("all") ||
      selectedCategories.includes(product.category);

    const availabilityMatch =
      selectedAvailability.length === 0 ||
      selectedAvailability.includes(product.stock);

    const priceMatch = product.price <= maxPrice;

    const searchMatch =
      searchValue === "" || product.name.toLowerCase().includes(searchValue);

    return categoryMatch && availabilityMatch && priceMatch && searchMatch;
  });

  // =========================
  // SORT PRODUCTS
  // =========================

  if (sortProducts.value === "cheap") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortProducts.value === "expensive") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sortProducts.value === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name, "en"));
  }

  renderProducts(filteredProducts);
}

// =========================
// CATEGORY FILTER
// =========================

categoryFilters.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const allCheckbox = document.querySelector(
      '.category-filter[data-category="all"]',
    );

    if (checkbox.dataset.category === "all" && checkbox.checked) {
      categoryFilters.forEach((item) => {
        if (item !== allCheckbox) {
          item.checked = false;
        }
      });
    }

    if (checkbox.dataset.category !== "all" && checkbox.checked) {
      allCheckbox.checked = false;
    }

    const selectedCategories = Array.from(categoryFilters).filter(
      (item) => item.checked,
    );

    if (selectedCategories.length === 0) {
      allCheckbox.checked = true;
    }

    filterProducts();
  });
});

// =========================
// AVAILABILITY FILTER
// =========================

availabilityFilters.forEach((checkbox) => {
  checkbox.addEventListener("change", filterProducts);
});

// =========================
// PRICE FILTER
// =========================

priceRange.addEventListener("input", () => {
  priceValue.textContent = `${Number(priceRange.value).toLocaleString("fa-IR")} تومان`;

  filterProducts();
});

// =========================
// SORT
// =========================

sortProducts.addEventListener("change", filterProducts);

// =========================
// LIVE SEARCH
// =========================

searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);

  searchTimer = setTimeout(() => {
    filterProducts();
  }, 300);
});

// =========================
// RESET FILTERS
// =========================

resetButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (index === 0) {
      categoryFilters.forEach((checkbox) => {
        checkbox.checked = checkbox.dataset.category === "all";
      });
    }

    if (index === 1) {
      availabilityFilters.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }

    if (index === 2) {
      priceRange.value = 75000000;

      priceValue.textContent = `${Number(priceRange.value).toLocaleString("fa-IR")} تومان`;
    }

    filterProducts();
  });
});

// =========================
// INITIAL RENDER
// =========================

filterProducts();
