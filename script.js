// =======================
// Globals & Setup
// =======================

// Basket array and delivery flag
let delivery = true;

// Delivery toggle button reference
const toggleButton = document.getElementById("deliveryButton");

// Currency formatter for all prices
const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

// =======================
// Main Render Function
// =======================

// Renders all product categories
function init() {
  renderdishes(burgersKey, burgers, "templateContainerBurger");
  renderdishes(sideDishesKey, sideDishes, "templateContainerSideDishes");
  renderdishes(drinksKey, drinks, "templateContainerDrinks");
  getFromLocalStorage();
  renderBasket();
}

// =======================
// Render Product Categories
// =======================

// Renders all dishes

function renderdishes(key, dish, templateContainer) {
  for (let index = 0; index < Object.keys(dish).length; index++) {
    document.getElementById(templateContainer).innerHTML += dishTemplate(
      index,
      key
    );
    loadContentTemplate(index, key, "name", "name");
    loadContentTemplate(index, key, "content", "description");
    loadPrice(index, key, "price");
  }
}

// =======================
// Render Basket
// =======================

// Renders the basket contents dynamically
function renderBasket() {
  const basketContainer = document.getElementById("basketContent");
  basketContainer.innerHTML = "";

  for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
    basketContainer.innerHTML += basketTemplate(basketIndex);
    loadContentTemplate(
      basketIndex,
      basketKey,
      "basketTemplateHeadline",
      "name"
    );
    loadContentTemplate(
      basketIndex,
      basketKey,
      "basketNumberOfPortions",
      "qty"
    );
    loadPrice(basketIndex, basketKey, "basketTotalPrice");
  }
  subTotal();
  total();
  document.getElementById("orderInfo").innerHTML = "";
}

// =======================
// Content and Price Helpers
// =======================

// Loads text content (name, description, qty) depending on category
function loadContentTemplate(index, key, contentNameId, arr) {
  let content = document.getElementById(contentNameId + key + index);
  if (key === "burger") {
    content.innerHTML = burgers[index][arr];
  }
  if (key === "sideDish") {
    content.innerHTML = sideDishes[index][arr];
  }
  if (key === "drink") {
    content.innerHTML = drinks[index][arr];
  }
  if (key === "basket") {
    content.innerHTML = basket[index][arr];
  }
}

// Returns formatted price for the given category
function formattedPrice(index, key) {
  if (key === "burger") {
    return formatter.format(burgers[index].price);
  }
  if (key === "sideDish") {
    return formatter.format(sideDishes[index].price);
  }
  if (key === "drink") {
    return formatter.format(drinks[index].price);
  }
  if (key === "basket") {
    return formatter.format(basket[index].price * basket[index].qty);
  }
}

// Inserts formatted price into DOM
function loadPrice(index, key, contentNameId) {
  document.getElementById(contentNameId + key + index).innerHTML =
    formattedPrice(index, key);
}

// =======================
// region Basket Manipulation
// =======================

// Adds an item to the basket or increases qty if already present
function addToBasket(index, key) {
  const arrays = { burger: burgers, sideDish: sideDishes, drink: drinks };
  const item = arrays[key][index];
  const existing = basket.find((b) => b.name === item.name);
  if (existing) {
    existing.qty++;
  } else {
    basket.push({ ...item, qty: 1 });
  }
  saveAndRender();
}

// Increases quantity of a basket item
function increase(basketIndex) {
  basket[basketIndex].qty += 1;
  saveAndRender();
}

// Decreases quantity or removes item if qty becomes 0
function decrease(basketIndex) {
  basket[basketIndex].qty -= 1;
  saveAndRender();
  if (basket[basketIndex].qty <= 0) {
    basket[basketIndex].qty += 1;
    basket.splice(basketIndex, 1);
    saveAndRender();
  }
}

// Deletes an item from basket and resets its qty to 1
function deleteItemBasket(basketIndex) {
  basket[basketIndex].qty = 1;
  basket.splice(basketIndex, 1);
  saveAndRender();
}

// =======================
// Price Calculation
// =======================

// Calculates subtotal of the basket
function subPrice(query) {
  let sum = 0;
  if (query === "subTotal") {
    document.getElementById("subTotal").innerHTML = "";
  }
  for (let index = 0; index < basket.length; index++) {
    let singlePrice = basket[index].qty * basket[index].price;
    sum += singlePrice;
  }
  return sum;
}

// Renders subtotal
function subTotal() {
  container = document.getElementById("subTotal");
  container.innerHTML = formatter.format(subPrice("subTotal"));
}

// Renders total depending on delivery mode
function total() {
  container = document.getElementById("total");
  if (delivery === true) {
    container.innerHTML = formatter.format(subPrice("total") + 5);
  } else {
    container.innerHTML = formatter.format(subPrice("total"));
  }
}

// =======================
// Delivery Toggle Button
// =======================

// Handles switching between delivery and pickup
toggleButton.addEventListener("click", function () {
  if (toggleButton.innerText === "Liefern") {
    toggleButton.innerText = "Abholen";
    document.getElementById("deliveryCost").innerHTML = "-";
    delivery = false;
  } else {
    toggleButton.innerText = "Liefern";
    document.getElementById("deliveryCost").innerHTML = "5€";
    delivery = true;
  }
  renderBasket();
});

// =======================
// Order
// =======================

// Clears basket and shows test order info
function order() {
  basket = [];
  saveAndRender();
  container = document.getElementById("orderInfo");
  container.innerHTML = "Testbestellung wurde vorgenommen !";
}

// =======================
// Toggle menu
// =======================

// Open and close the burger menu
function toggleMenu() {
  document.getElementById("hidden-menu").classList.toggle("closed-menu");
}

// =======================
// SaveLS
// =======================

// Safe to Local Storage and load from Local Storage
function saveToLocalStorage() {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function saveAndRender() {
  saveToLocalStorage();
  renderBasket();
}

function getFromLocalStorage() {
  let basketStored = JSON.parse(localStorage.getItem("basket"));
  if (basketStored === null) {
    return;
  }
  basket = basketStored;
}

// =======================
// Toggle mobile basket
// =======================

// open and close from mobile basket and main page
function toggleMobileBasket() {
  orderContent = document.getElementById("orderContainer");
  basketContent = document.getElementById("basketContainer");
  footer = document.getElementById("footerId");
  main = document.getElementById("mainId");
  orderContent.classList.toggle("hide-content");
  basketContent.classList.toggle("show-content");
  footer.classList.toggle("hide-content");
  main.classList.toggle("main-basket-size");
}
