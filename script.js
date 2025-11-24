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
function render() {
  renderBurger();
  renderSideDishes();
  renderDrinks();
  getFromLocalStorage();
  renderBasket();
}

// =======================
// Render Product Categories
// =======================

// Renders all burgers
function renderBurger() {
  for (
    let burgerIndex = 0;
    burgerIndex < Object.keys(burgers).length;
    burgerIndex++
  ) {
    document.getElementById("templateContainerBurger").innerHTML +=
      burgerTemplate(burgerIndex);
    loadContentTemplate(burgerIndex, "burgerName", "name");
    loadContentTemplate(burgerIndex, "burgerContent", "description");
    loadPrice(burgerIndex, "burgerPrice");
  }
}

// Renders all side dishes
function renderSideDishes() {
  for (
    let sideDishesIndex = 0;
    sideDishesIndex < Object.keys(sideDishes).length;
    sideDishesIndex++
  ) {
    document.getElementById("templateContainerSideDishes").innerHTML +=
      sideDishesTemplate(sideDishesIndex);
    loadContentTemplate(sideDishesIndex, "sideDishesName", "name");
    loadContentTemplate(sideDishesIndex, "sideDishesContent", "description");
    loadPrice(sideDishesIndex, "sideDishesPrice");
  }
}

// Renders all drinks
function renderDrinks() {
  for (
    let drinksIndex = 0;
    drinksIndex < Object.keys(drinks).length;
    drinksIndex++
  ) {
    document.getElementById("templateContainerDrinks").innerHTML +=
      drinksTemplate(drinksIndex);
    loadContentTemplate(drinksIndex, "drinksName", "name");
    loadContentTemplate(drinksIndex, "drinksContent", "description");
    loadPrice(drinksIndex, "drinksPrice");
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
    loadContentTemplate(basketIndex, "basketTemplateHeadline", "name");
    loadContentTemplate(basketIndex, "basketNumberOfPortions", "qty");
    loadPrice(basketIndex, "basketTotalPrice");
  }
  subTotal();
  total();
  document.getElementById("orderInfo").innerHTML = "";
}

// =======================
// Content and Price Helpers
// =======================

// Loads text content (name, description, qty) depending on category
function loadContentTemplate(i, contentNameId, arr) {
  let content = document.getElementById(contentNameId + i);
  if (contentNameId.includes("burger")) {
    content.innerHTML = burgers[i][arr];
  }
  if (contentNameId.includes("sideDishes")) {
    content.innerHTML = sideDishes[i][arr];
  }
  if (contentNameId.includes("drinks")) {
    content.innerHTML = drinks[i][arr];
  }
  if (contentNameId.includes("basket")) {
    content.innerHTML = basket[i][arr];
  }
}

// Returns formatted price for the given category
function formattedPrice(i, contentNameId) {
  if (contentNameId.includes("burger")) {
    return formatter.format(burgers[i].price);
  }
  if (contentNameId.includes("sideDishes")) {
    return formatter.format(sideDishes[i].price);
  }
  if (contentNameId.includes("drinks")) {
    return formatter.format(drinks[i].price);
  }
  if (contentNameId.includes("basket")) {
    return formatter.format(basket[i].price * basket[i].qty);
  }
}

// Inserts formatted price into DOM
function loadPrice(i, contentNameId) {
  document.getElementById(contentNameId + i).innerHTML = formattedPrice(
    i,
    contentNameId
  );
}

// =======================
// region Basket Manipulation
// =======================

// Adds an item to the basket or increases qty if already present
function addToBasket(i, arrayName) {
  const item = arrayName[i];
  const existingItem = basket.find((b) => b.name === item.name);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    basket.push({ ...item, qty: 1 }); 
  }
  saveToLocalStorage();
  renderBasket();
}

// Increases quantity of a basket item
function increase(basketIndex) {
  basket[basketIndex].qty += 1;
  saveToLocalStorage();
  renderBasket();
}

// Decreases quantity or removes item if qty becomes 0
function decrease(basketIndex) {
  basket[basketIndex].qty -= 1;
  saveToLocalStorage();
  renderBasket();
  if (basket[basketIndex].qty <= 0) {
    basket[basketIndex].qty += 1;
    basket.splice(basketIndex, 1);
    saveToLocalStorage();
    renderBasket();
  }
}

// Deletes an item from basket and resets its qty to 1
function deleteItemBasket(basketIndex) {
  basket[basketIndex].qty = 1;
  basket.splice(basketIndex, 1);
  saveToLocalStorage();
  renderBasket();
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
  saveToLocalStorage();
  renderBasket();
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
  orderContent.classList.toggle("hide-content");
  basketContent.classList.toggle("show-content");
}
