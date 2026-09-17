const products = [
  {
    name: "MacBook Pro",
    price: 75000000,
    category: "laptop",
    stock: "in-stock",
    image: "images/laptop.webp",
    badge: "۱۵٪ تخفیف",
    badgeType: "discount",
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
    badge: "۱۰٪ تخفیف",
    badgeType: "discount",
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
    badge: "۱۲٪ تخفیف",
    badgeType: "discount",
  },
  {
    name: "Samsung Galaxy S24",
    price: 48000000,
    category: "mobile",
    stock: "out-of-stock",
    image: "images/phone.webp",
    badge: "ناموجود",
    badgeType: "stock",
  },
  {
    name: "Sony WH-1000XM5",
    price: 14500000,
    category: "headphone",
    stock: "in-stock",
    image: "images/head.webp",
    badge: "۸٪ تخفیف",
    badgeType: "discount",
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

// =========================
// RENDER PRODUCTS
// =========================

function renderProducts(filteredProducts) {
  productsGrid.innerHTML = "";

  filteredProducts.map((product) => {
    const productCard = document.createElement("article");

    productCard.className = "product-card";

    // ساخت لیبل محصول
    let badgeHTML = "";

    if (product.badge) {
      if (product.badgeType === "discount") {
        badgeHTML = `
          <span class="discount-badge">
            ${product.badge}
          </span>
        `;
      }

      if (product.badgeType === "stock") {
        badgeHTML = `
          <span class="stock-badge">
            ${product.badge}
          </span>
        `;
      }
    }

    productCard.innerHTML = `
      <div class="product-image">

        <img 
          src="${product.image}" 
          alt="${product.name}"
        >

        ${badgeHTML}

      </div>

      <div class="product-info">

        <span class="product-category">
          ${product.category}
        </span>

        <h3>${product.name}</h3>

        <div class="product-footer">

          <strong class="product-price">
            ${product.price.toLocaleString("fa-IR")} تومان
          </strong>

          <button class="view-btn" type="button">
            مشاهده
          </button>

        </div>

      </div>
    `;

    productsGrid.append(productCard);
  });

  productsCount.textContent = filteredProducts.length;
}

// =========================
// FILTER PRODUCTS
// =========================

function filterProducts() {
  // CATEGORY
  const selectedCategories = Array.from(categoryFilters)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.dataset.category);

  // AVAILABILITY
  const selectedAvailability = Array.from(availabilityFilters)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  // PRICE
  const maxPrice = Number(priceRange.value);

  // FILTER
  let filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.includes("all") ||
      selectedCategories.includes(product.category);

    const availabilityMatch =
      selectedAvailability.length === 0 ||
      selectedAvailability.includes(product.stock);

    const priceMatch = product.price <= maxPrice;

    return categoryMatch && availabilityMatch && priceMatch;
  });

  // =========================
  // SORT
  // =========================

  const sortValue = sortProducts.value;

  // CHEAPEST
  if (sortValue === "cheap") {
    filteredProducts.sort((a, b) => {
      return a.price - b.price;
    });
  }

  // MOST EXPENSIVE
  else if (sortValue === "expensive") {
    filteredProducts.sort((a, b) => {
      return b.price - a.price;
    });
  }

  // NAME
  else if (sortValue === "name") {
    filteredProducts.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  // =========================
  // RENDER
  // =========================

  renderProducts(filteredProducts);
}

// =========================
// CATEGORY FILTER
// =========================

categoryFilters.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const allCheckbox = document.querySelector('[data-category="all"]');

    // ALL CATEGORY
    if (checkbox.dataset.category === "all") {
      if (checkbox.checked) {
        categoryFilters.forEach((item) => {
          if (item !== checkbox) {
            item.checked = false;
          }
        });
      }
    }

    // OTHER CATEGORIES
    else {
      if (checkbox.checked) {
        allCheckbox.checked = false;
      }

      const selectedCategories = Array.from(categoryFilters)
        .filter((item) => item.checked)
        .map((item) => item.dataset.category);

      // IF NOTHING IS SELECTED
      if (selectedCategories.length === 0) {
        allCheckbox.checked = true;
      }
    }

    filterProducts();
  });
});

// =========================
// AVAILABILITY FILTER
// =========================

availabilityFilters.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    filterProducts();
  });
});

// =========================
// PRICE RANGE
// =========================

priceRange.addEventListener("input", () => {
  priceValue.textContent = `${Number(priceRange.value).toLocaleString("fa-IR")} تومان`;

  filterProducts();
});

// =========================
// SORT
// =========================

sortProducts.addEventListener("change", () => {
  filterProducts();
});

// =========================
// RESET BUTTONS
// =========================

resetButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // CATEGORY RESET
    if (index === 0) {
      categoryFilters.forEach((checkbox) => {
        checkbox.checked = false;
      });

      const allCheckbox = document.querySelector('[data-category="all"]');

      allCheckbox.checked = true;
    }

    // AVAILABILITY RESET
    if (index === 1) {
      availabilityFilters.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }

    // PRICE RESET
    if (index === 2) {
      priceRange.value = 75000000;

      priceValue.textContent = "۷۵,۰۰۰,۰۰۰ تومان";
    }

    filterProducts();
  });
});

// =========================
// INITIAL RENDER
// =========================

renderProducts(products);
