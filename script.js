function calculateItemAmount(price, quantity) {
  return price * quantity;
}

function calculateDiscount(subtotal) {
  if (subtotal >= 5000) {
    return subtotal * 0.10;
  } else if (subtotal >= 3000) {
    return subtotal * 0.07;
  } else if (subtotal >= 1000) {
    return subtotal * 0.05;
  } else {
    return 0;
  }
}

function getDeliveryFee(option) {
  switch (Number(option)) {
    case 1:
      return 0;
    case 2:
      return 80;
    case 3:
      return 150;
    default:
      return 0;
  }
}

function getDeliveryTypeName(option) {
  switch (Number(option)) {
    case 1:
      return "Store Pickup";
    case 2:
      return "Standard Delivery";
    case 3:
      return "Express Delivery";
    default:
      return "Store Pickup";
  }
}

function getDiscountRateString(subtotal) {
  if (subtotal >= 5000) return "10%";
  if (subtotal >= 3000) return "7%";
  if (subtotal >= 1000) return "5%";
  return "0%";
}

const productCountInput = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");

productCountInput.addEventListener("input", function () {
  const count = parseInt(productCountInput.value, 10);
  productsContainer.innerHTML = "";

  if (isNaN(count) || count <= 0) {
    return;
  }

  for (let i = 0; i < count; i++) {
    const productCard = document.createElement("div");
    productCard.className = "product-item";

    productCard.innerHTML = `
      <h3>Product #${i + 1}</h3>
      <label for="productName-${i}">Product Name</label>
      <input type="text" id="productName-${i}" placeholder="Product Name"><br>

      <label for="productPrice-${i}">Price</label>
      <input type="number" id="productPrice-${i}" step="0.01" min="0" placeholder="Price"><br>

      <label for="productQuantity-${i}">Quantity</label>
      <input type="number" id="productQuantity-${i}" min="1" placeholder="Quantity"><br><br>
    `;

    productsContainer.appendChild(productCard);
  }
});

const calculateBtn = document.getElementById("calculateBtn");
const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");

calculateBtn.addEventListener("click", function () {
  validationMessage.textContent = "";
  orderSummary.textContent = "";

  const customerName = document.getElementById("customerName").value.trim();
  const productCountRaw = document.getElementById("productCount").value.trim();
  const productCount = Number(productCountRaw);
  const deliveryOption = document.getElementById("deliveryOption").value;

  if (customerName === "") {
    validationMessage.textContent = "Error: Customer Name cannot be empty.";
    return;
  }

  if (productCountRaw === "" || isNaN(productCount) || productCount <= 0 || !Number.isInteger(productCount)) {
    validationMessage.textContent = "Error: Please enter a valid positive number of products.";
    return;
  }

  let subtotal = 0;
  let productsSummaryText = "";

  for (let i = 0; i < productCount; i++) {
    const nameElem = document.getElementById(`productName-${i}`);
    const priceElem = document.getElementById(`productPrice-${i}`);
    const quantityElem = document.getElementById(`productQuantity-${i}`);

    if (!nameElem || !priceElem || !quantityElem) {
      validationMessage.textContent = "Error: Product input fields are incomplete or missing.";
      return;
    }

    const name = nameElem.value.trim();
    const price = parseFloat(priceElem.value);
    const quantity = parseFloat(quantityElem.value);

    if (name === "") {
      validationMessage.textContent = `Error: Product Name for item #${i + 1} cannot be empty.`;
      return;
    }
    if (isNaN(price) || price <= 0) {
      validationMessage.textContent = `Error: Please enter a valid positive price for item #${i + 1}.`;
      return;
    }
    if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
      validationMessage.textContent = `Error: Please enter a valid positive quantity for item #${i + 1}.`;
      return;
    }

    const itemAmount = calculateItemAmount(price, quantity);
    subtotal += itemAmount;

    productsSummaryText += `${i + 1}. ${name}\n`;
    productsSummaryText += `Price: ₱${price.toFixed(2)}\n`;
    productsSummaryText += `Quantity: ${quantity}\n`;
    productsSummaryText += `Amount: ₱${itemAmount.toFixed(2)}\n\n`;
  }

  const discountAmount = calculateDiscount(subtotal);
  const discountRate = getDiscountRateString(subtotal);
  const deliveryFee = getDeliveryFee(deliveryOption);
  const deliveryType = getDeliveryTypeName(deliveryOption);
  const finalAmount = subtotal - discountAmount + deliveryFee;
  const outputText = 
`MINI STORE CHECKOUT SYSTEM
Customer: ${customerName}

${productsSummaryText}ORDER SUMMARY
Subtotal: ₱${subtotal.toFixed(2)}
Discount Rate: ${discountRate}
Discount Amount: ₱${discountAmount.toFixed(2)}
Delivery Type: ${deliveryType}
Delivery Fee: ₱${deliveryFee.toFixed(2)}
Final Amount: ₱${finalAmount.toFixed(2)}`;

  orderSummary.textContent = outputText;
});