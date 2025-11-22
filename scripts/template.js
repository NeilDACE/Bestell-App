function burgerTemplate(burgerIndex) {
    return `<div onclick="addToBasket(${burgerIndex}, burgers)" class="template">
                <div class="template-content">
                  <h4 id="burgerName${burgerIndex}">Test</h4>
                  <p class="burger-content" id="burgerContent${burgerIndex}">Test</p>
                  <p class="price-content" id="burgerPrice${burgerIndex}">Test</p>
                </div>
                <div>
                  <button>+</button>
                </div>
              </div>`;
}

function sideDishesTemplate(sideDishesIndex) {
    return `<div onclick="addToBasket(${sideDishesIndex}, sideDishes)" class="template">
                <div class="template-content">
                  <h4 id="sideDishesName${sideDishesIndex}">Test</h4>
                  <p class="burger-content" id="sideDishesContent${sideDishesIndex}">Test</p>
                  <p class="price-content" id="sideDishesPrice${sideDishesIndex}">Test</p>
                </div>
                <div>
                  <button>+</button>
                </div>
              </div>`;
}

function drinksTemplate(drinksIndex) {
    return `<div onclick="addToBasket(${drinksIndex}, drinks)" class="template">
                <div class="template-content">
                  <h4 id="drinksName${drinksIndex}">Test</h4>
                  <p class="burger-content" id="drinksContent${drinksIndex}">Test</p>
                  <p class="price-content" id="drinksPrice${drinksIndex}">Test</p>
                </div>
                <div>
                  <button>+</button>
                </div>
              </div>`;
}

function basketTemplate(basketIndex) {
  return `<h4 id="basketTemplateHeadline${basketIndex}">Test</h4>
              <div class="basket-template">
                <Button onclick="decrease(${basketIndex})">-</Button>
                <p><span id="basketNumberOfPortions${basketIndex}"></span>x</p>
                <Button onclick="increase(${basketIndex})">+</Button>
                <p class="singleSub" id="basketTotalPrice${basketIndex}"></p>
                <Button onclick="deleteItemBasket(${basketIndex})">🗑</Button>
              </div>`
}