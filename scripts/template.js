function burgerTemplate(burgerIndex) {
    return `<div class="burger-template">
                <div class="template-content">
                  <h4 id="burgerName${burgerIndex}">Test</h4>
                  <p class="burger-content" id="burgerContent${burgerIndex}">Test</p>
                  <p class="price-content" id="burgerPrice${burgerIndex}">Test</p>
                </div>
                <div>
                  <button onclick="">+</button>
                </div>
              </div>`;
}

function sideDishesTemplate(sideDishesIndex) {
    return `<div class="burger-template">
                <div class="template-content">
                  <h4 id="sideDishesName${sideDishesIndex}">Test</h4>
                  <p class="burger-content" id="sideDishesContent${sideDishesIndex}">Test</p>
                  <p class="price-content" id="sideDishesPrice${sideDishesIndex}">Test</p>
                </div>
                <div>
                  <button onclick="">+</button>
                </div>
              </div>`;
}

function drinksTemplate(drinksIndex) {
    return `<div class="burger-template">
                <div class="template-content">
                  <h4 id="drinksName${drinksIndex}">Test</h4>
                  <p class="burger-content" id="drinksContent${drinksIndex}">Test</p>
                  <p class="price-content" id="drinksPrice${drinksIndex}">Test</p>
                </div>
                <div>
                  <button onclick="">+</button>
                </div>
              </div>`;
}