#  Luka | Product Filter

JavaScript Practice — Task 6

A responsive product filtering system built for **Luka**, a digital products store. This task focuses on DOM manipulation, array methods, event handling, filtering, and sorting products using JavaScript.

---

## 🎯 Task Objective

The main goal of this task is to practice JavaScript concepts by creating an interactive product filtering system.

Users can filter products based on:

* Category
* Availability
* Price range
* Sorting options

Multiple filters can also be applied at the same time.

---

## ✨ Features

### Category Filter

Users can filter products by category:

* All Products
* Laptops
* Smartphones
* Headphones

### Availability Filter

Products can be filtered based on their availability:

* All
* Available
* Unavailable

### Price Range

Users can select a maximum price using a range input.

The selected price is displayed dynamically while the range changes.

### Product Sorting

Products can be sorted using different options, such as:

* Default
* Price: Low to High
* Price: High to Low
* Name

### Combined Filters

All filters work together.

For example:

```text
Category: Laptop
Availability: Available
Maximum Price: 50,000,000
```

The application will display only products that match all selected conditions.

---

## JavaScript Concepts

This task focuses on the following JavaScript concepts:

* DOM Manipulation
* `querySelector()`
* `querySelectorAll()`
* `addEventListener()`
* `filter()`
* `sort()`
* `forEach()`
* `dataset`
* Arrays
* Arrow Functions
* Conditional Logic
* Event Handling
* Dynamic DOM Updates

---

## DOM Selection

The required HTML elements are selected using DOM methods.

Example:

```javascript
const productsGrid = document.querySelector("#productsGrid");

const productsCards = document.querySelectorAll(".product-card");

const categoryFilter = document.querySelectorAll(".category-filter");
```

These elements are later used to control the filtering system.

---

## 🔄 Filtering Logic

The filtering process checks each product against the selected conditions.

Conceptually, the logic works like this:

```javascript
categoryMatch &&
availabilityMatch &&
priceMatch
```

A product is displayed only when all required conditions are satisfied.

---

## Array `filter()`

The `filter()` method is used to create a new array containing only the products that match the selected filters.

Example:

```javascript
const filteredProducts = products.filter((product) => {
  return product.category === selectedCategory;
});
```

---

## ↕️ Array `sort()`

The `sort()` method is used to change the order of products.

For example, products can be sorted from the lowest price to the highest price:

```javascript
products.sort((a, b) => a.price - b.price);
```

---

## 🔁 `forEach()`

The `forEach()` method is used to iterate through collections such as filter buttons and product elements.

Example:

```javascript
categoryFilter.forEach((filter) => {
  filter.addEventListener("click", handleFilter);
});
```

---

## `dataset`

Product information can be stored inside HTML using `data-*` attributes.

Example:

```html
<div
  class="product-card"
  data-category="laptop"
  data-price="50000000"
>
</div>
```

The values can then be accessed through JavaScript:

```javascript
product.dataset.category;

product.dataset.price;
```

---

## ⚡ Event Handling

User interactions are handled using event listeners.

For example, when a category filter is clicked, JavaScript receives the selected category and updates the displayed products.

```javascript
filter.addEventListener("click", handleFilter);
```

---


## 📁 Project Structure

```text
Luka/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── images/
│   └── products/
│
└── README.md
```

---

## 🎨 UI & Design

The interface is designed with a modern digital-store style and focuses on:

* Clean product cards
* Modern filter controls
* Clear visual hierarchy
* Responsive layout
* User-friendly interactions
* Dark modern UI
* Mobile-first design

---

## 📱 Responsive Design

The page is responsive and designed to work across different screen sizes:

* Mobile
* Tablet
* Desktop

The product grid and filter controls adapt to the available screen width.

---

## Testing

The following scenarios can be used to test the application.

### Test 1 — Category Filter

Select a category and verify that only products from that category are displayed.

### Test 2 — Availability Filter

Select "Available" and verify that unavailable products are removed.

### Test 3 — Price Filter

Change the price range and verify that products above the selected price are hidden.

### Test 4 — Sorting

Select a sorting option and verify that the products are displayed in the correct order.

### Test 5 — Combined Filters

Apply multiple filters together and verify that only products matching all conditions are displayed.

### Test 6 — Reset Filters

Return the filters to their default values and verify that all products are displayed again.

---

## 🛠️ Technologies

* HTML
* CSS
* JavaScript

---

## Learning Outcomes

After completing this task, the following concepts were practiced:

```text
DOM Manipulation
      ↓
Event Handling
      ↓
Array Methods
      ↓
Filtering
      ↓
Sorting
      ↓
Conditional Logic
      ↓
Dynamic UI Updates
```

The main focus of this task is understanding how JavaScript can connect user interactions with dynamic changes in the UI.

---

## Live Demo


---

## AI Transparency