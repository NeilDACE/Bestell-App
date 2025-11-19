const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

function render() {
    renderBurger();
    renderSideDishes();
    renderDrinks();
}
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
}

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
}

function loadPrice(i, contentNameId) {
    document.getElementById(contentNameId + i).innerHTML =
      formattedPrice(i, contentNameId);
}
