function calculateItemAmount(price, quantity) {
  return Number(price) * Number(quantity);
}

function calculateDiscount(subtotal) {
  var sub = Number(subtotal);
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

function renderProducts() {
  var productCountInput = document.getElementById("productCount");
  var productsContainer = document.getElementById("productsContainer");
  var count = parseInt(productCountInput.value, 10);
  var i;
  var productCard;
  
  productsContainer.innerHTML = "";

  if (isNaN(count) || count <= 0) {
    return;
  }

  for (i = 0; i < count; i++) {
    productCard = document.createElement("div");
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
}

document.getElementById("productCount").addEventListener("input", renderProducts);
document.getElementById("productCount").addEventListener("change", renderProducts);

window.addEventListener("DOMContentLoaded", renderProducts);

document.getElementById("calculateBtn").addEventListener("click", function () {
  var validationMessage = document.getElementById("validationMessage");
  var orderSummary = document.getElementById("orderSummary");
  var customerName;
  var productCountRaw;
  var productCount;
  var deliveryOption;
  var subtotal;
  var productsSummaryText;
  var i;
  var nameElem;
  var priceElem;
  var quantityElem;
  var name;
  var price;
  var quantity;
  var itemAmount;
  var discountAmount;
  var discountRate;
  var deliveryFee;
  var deliveryType;
  var finalAmount;
  var outputText;
  
  validationMessage.textContent = "";
  orderSummary.textContent = "";

  customerName = document.getElementById("customerName").value.trim();
  productCountRaw = document.getElementById("productCount").value.trim();
  productCount = parseInt(productCountRaw, 10);
  deliveryOption = document.getElementById("deliveryOption").value;

  if (customerName === "") {
    validationMessage.textContent = "Customer Name cannot be empty.";
    return;
  }

  if (productCountRaw === "" || isNaN(productCount) || productCount <= 0) {
    validationMessage.textContent = "Please enter a valid number of products.";
    return;
  }

  subtotal = 0;
  productsSummaryText = "";

  for (i = 0; i < productCount; i++) {
    nameElem = document.getElementById(`productName-${i}`);
    priceElem = document.getElementById(`productPrice-${i}`);
    quantityElem = document.getElementById(`productQuantity-${i}`);

    if (!nameElem || !priceElem || !quantityElem) {
      validationMessage.textContent = "Missing product input fields.";
      return;
    }

    name = nameElem.value.trim();
    price = parseFloat(priceElem.value);
    quantity = parseFloat(quantityElem.value);

    if (name === "") {
      validationMessage.textContent = "Product name cannot be empty.";
      return;
    }
    if (isNaN(price) || price <= 0) {
      validationMessage.textContent = "Please enter a valid price.";
      return;
    }
    if (isNaN(quantity) || quantity <= 0) {
      validationMessage.textContent = "Please enter a valid quantity.";
      return;
    }

    itemAmount = calculateItemAmount(price, quantity);
    subtotal += itemAmount;

    productsSummaryText += `${i + 1}. ${name}\n`;
    productsSummaryText += `Price: ₱${price.toFixed(2)}\n`;
    productsSummaryText += `Quantity: ${quantity}\n`;
    productsSummaryText += `Amount: ₱${itemAmount.toFixed(2)}\n`;
  }

  discountAmount = calculateDiscount(subtotal);
  
  discountRate = "No discount";
  if (subtotal >= 5000) {
    discountRate = "10%";
  } else if (subtotal >= 3000) {
    discountRate = "7%";
  } else if (subtotal >= 1000) {
    discountRate = "5%";
  }

  deliveryFee = getDeliveryFee(deliveryOption);
  
  deliveryType = "Store Pickup";
  switch (Number(deliveryOption)) {
    case 1:
      deliveryType = "Store Pickup";
      break;
    case 2:
      deliveryType = "Standard Delivery";
      break;
    case 3:
      deliveryType = "Express Delivery";
      break;
  }

  finalAmount = subtotal - discountAmount + deliveryFee;

  outputText = `MINI STORE CHECKOUT SYSTEM
Customer: ${customerName}
${productsSummaryText}
ORDER SUMMARY
Subtotal: ₱${subtotal.toFixed(2)}
Discount Rate: ${discountRate}
Discount Amount: ₱${discountAmount.toFixed(2)}
Delivery Type: ${deliveryType}
Delivery Fee: ₱${deliveryFee.toFixed(2)}
Final Amount: ₱${finalAmount.toFixed(2)}`;

  orderSummary.textContent = outputText;
});