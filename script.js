// Required Top-Level Functions (must be globally scoped and pure)
function calculateItemAmount(price, quantity) {
  return Number(price) * Number(quantity);
}

function calculateDiscount(subtotal) {
  const sub = Number(subtotal);
  if (sub >= 5000) {
    return sub * 0.10;
  } else if (sub >= 3000) {
    return sub * 0.07;
  } else if (sub >= 1000) {
    return sub * 0.05;
  } else {
    return 0;
  }
}

function getDeliveryFee(option) {
  switch (String(option)) {
    case "1":
      return 0;
    case "2":
      return 80;
    case "3":
      return 150;
    default:
      return 0;
  }
}

// Dynamic Product Field Generation using a For Loop
function renderProducts() {
  const productCountInput = document.getElementById("productCount");
  const productsContainer = document.getElementById("productsContainer");
  const count = parseInt(productCountInput.value, 10);
  
  productsContainer.innerHTML = "";

  if (isNaN(count) || count <= 0) {
    return;
  }

  for (let i = 0; i < count; i++) {
    const productCard = document.createElement("div");
    productCard.className = "product-item";

    productCard.innerHTML = `
      <label for="productName-${i}">Product Name</label>
      <input type="text" id="productName-${i}" placeholder="Product Name"><br>

      <label for="productPrice-${i}">Price</label>
      <input type="number" id="productPrice-${i}" step="0.01" min="0" placeholder="Price"><br>

      <label for="productQuantity-${i}">Quantity</label>
      <input type="number" id="productQuantity-${i}" min="1" placeholder="Quantity"><br>
    `;

    productsContainer.appendChild(productCard);
  }
}

// Event listeners for product count changes
document.getElementById("productCount").addEventListener("input", renderProducts);
document.getElementById("productCount").addEventListener("change", renderProducts);

// Main Calculation Trigger
document.getElementById("calculateBtn").addEventListener("click", function () {
  const validationMessage = document.getElementById("validationMessage");
  const orderSummary = document.getElementById("orderSummary");
  
  validationMessage.textContent = "";
  orderSummary.textContent = "";

  const customerName = document.getElementById("customerName").value.trim();
  const productCountRaw = document.getElementById("productCount").value.trim();
  const productCount = parseInt(productCountRaw, 10);
  const deliveryOption = document.getElementById("deliveryOption").value;

  // Validation: Customer Name
  if (customerName === "") {
    validationMessage.textContent = "Customer Name cannot be empty.";
    return;
  }

  // Validation: Product Count
  if (productCountRaw === "" || isNaN(productCount) || productCount <= 0) {
    validationMessage.textContent = "Please enter a valid number of products.";
    return;
  }

  let subtotal = 0;
  let productsSummaryText = "";

  // Processing each dynamic product using a for loop
  for (let i = 0; i < productCount; i++) {
    const nameElem = document.getElementById(`productName-${i}`);
    const priceElem = document.getElementById(`productPrice-${i}`);
    const quantityElem = document.getElementById(`productQuantity-${i}`);

    if (!nameElem || !priceElem || !quantityElem) {
      validationMessage.textContent = "Missing product input fields.";
      return;
    }

    const name = nameElem.value.trim();
    const price = parseFloat(priceElem.value);
    const quantity = parseFloat(quantityElem.value);

    if (name === "") {
      validationMessage.textContent = "Product name cannot be empty.";
      return;
    }
    if (isNaN(price) || price < 0) {
      validationMessage.textContent = "Please enter a valid price.";
      return;
    }
    if (isNaN(quantity) || quantity <= 0) {
      validationMessage.textContent = "Please enter a valid quantity.";
      return;
    }

    const itemAmount = calculateItemAmount(price, quantity);
    subtotal += itemAmount;

    // Exact string layout matching sample output format
    productsSummaryText += `${i + 1}. ${name}\n   Price: ₱${price.toFixed(2)}\n   Quantity: ${quantity}\n   Amount: ₱${itemAmount.toFixed(2)}\n\n`;
  }

  const discountAmount = calculateDiscount(subtotal);
  
  let discountRate = "0%";
  if (subtotal >= 5000) {
    discountRate = "10%";
  } else if (subtotal >= 3000) {
    discountRate = "7%";
  } else if (subtotal >= 1000) {
    discountRate = "5%";
  }

  const deliveryFee = getDeliveryFee(deliveryOption);
  
  let deliveryType = "Store Pickup";
  switch (String(deliveryOption)) {
    case "1":
      deliveryType = "Store Pickup";
      break;
    case "2":
      deliveryType = "Standard Delivery";
      break;
    case "3":
      deliveryType = "Express Delivery";
      break;
  }

  const finalAmount = subtotal - discountAmount + deliveryFee;

  // Exact matching string format to match the rubric/sample output output block
  const outputText = `MINI STORE CHECKOUT SYSTEM

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