function dishTemplate(index, key) {
  return `<div role="button" onclick="addToBasket(${index}, '${key}')" class="template">
                <div class="template-content">
                  <h4 id="name${key}${index}"></h4>
                  <p class="dish-template-content" id="content${key}${index}"></p>
                  <p class="price-content" id="price${key}${index}"></p>
                </div>
                <div>
                  <button>+</button>
                </div>
              </div>`;
}

function basketTemplate(basketIndex) {
  return `<h4 id="basketTemplateHeadline${basketKey}${basketIndex}">Test</h4>
              <div class="basket-template">
                <Button onclick="decrease(${basketIndex})">-</Button>
                <p><span id="basketNumberOfPortions${basketKey}${basketIndex}"></span>x</p>
                <Button onclick="increase(${basketIndex})">+</Button>
                <p class="singleSub" id="basketTotalPrice${basketKey}${basketIndex}"></p>
                <Button onclick="deleteItemBasket(${basketIndex})">🗑</Button>
              </div>`;
}
