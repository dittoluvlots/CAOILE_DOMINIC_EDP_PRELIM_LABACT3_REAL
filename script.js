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

function getDeliveryName(option) {
    switch (String(option)) {
        case "1":
            return "Store Pickup";
        case "2":
            return "Standard Delivery";
        case "3":
            return "Express Delivery";
        default:
            return "Unknown";
    }
}

const productCountInput = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const generateBtn = document.getElementById("generateBtn");
const calculateBtn = document.getElementById("calculateBtn");
const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");

generateBtn.addEventListener("click", function () {
    const productCount = Number(productCountInput.value);

    productsContainer.innerHTML = "";
    validationMessage.textContent = "";
    orderSummary.innerHTML = "";

    if (!Number.isInteger(productCount) || productCount <= 0) {
        validationMessage.textContent =
            "Please enter a valid positive number of products.";
        return;
    }

    for (let i = 0; i < productCount; i++) {
        const productDiv = document.createElement("div");

        productDiv.innerHTML = `
            <h3>Product ${i + 1}</h3>

            <label for="productName-${i}">Product Name</label>
            <input type="text" id="productName-${i}">

            <label for="productPrice-${i}">Price</label>
            <input type="number" id="productPrice-${i}" min="0" step="0.01">

            <label for="productQuantity-${i}">Quantity</label>
            <input type="number" id="productQuantity-${i}" min="1">

            <br><br>
        `;

        productsContainer.appendChild(productDiv);
    }
});

calculateBtn.addEventListener("click", function () {
    validationMessage.textContent = "";
    orderSummary.innerHTML = "";

    const customerName = document.getElementById("customerName").value.trim();
    const productCount = Number(productCountInput.value);

    if (customerName === "") {
        validationMessage.textContent = "Customer Name is required.";
        return;
    }

    if (!Number.isInteger(productCount) || productCount <= 0) {
        validationMessage.textContent =
            "Please enter a valid positive number of products.";
        return;
    }

    if (productsContainer.children.length !== productCount) {
        validationMessage.textContent =
            "Please click Generate Products before calculating the order.";
        return;
    }

    let subtotal = 0;
    let productDetails = "";

    for (let i = 0; i < productCount; i++) {
        const productName =
            document.getElementById(`productName-${i}`).value.trim();

        const price = Number(
            document.getElementById(`productPrice-${i}`).value
        );

        const quantity = Number(
            document.getElementById(`productQuantity-${i}`).value
        );

        if (productName === "") {
            validationMessage.textContent =
                `Product ${i + 1}: Product Name is required.`;
            return;
        }

        if (!Number.isFinite(price) || price <= 0) {
            validationMessage.textContent =
                `Product ${i + 1}: Price must be a positive number.`;
            return;
        }

        if (!Number.isInteger(quantity) || quantity <= 0) {
            validationMessage.textContent =
                `Product ${i + 1}: Quantity must be a positive whole number.`;
            return;
        }

        const itemAmount = calculateItemAmount(price, quantity);
        subtotal += itemAmount;

        productDetails += `
            <p>
                <strong>${i + 1}. ${productName}</strong><br>
                Price: ₱${price.toFixed(2)}<br>
                Quantity: ${quantity}<br>
                Amount: ₱${itemAmount.toFixed(2)}
            </p>
        `;
    }

    const discount = calculateDiscount(subtotal);
    const deliveryOption =
        document.getElementById("deliveryOption").value;

    const deliveryFee = getDeliveryFee(deliveryOption);
    const deliveryName = getDeliveryName(deliveryOption);
    const finalAmount = subtotal - discount + deliveryFee;

    let discountRate = 0;

    if (subtotal >= 5000) {
        discountRate = 10;
    } else if (subtotal >= 3000) {
        discountRate = 7;
    } else if (subtotal >= 1000) {
        discountRate = 5;
    }

    orderSummary.innerHTML = `
        <h2>ORDER SUMMARY</h2>
        <p><strong>Customer:</strong> ${customerName}</p>

        ${productDetails}

        <hr>

        <p>Subtotal: ₱${subtotal.toFixed(2)}</p>
        <p>Discount Rate: ${discountRate}%</p>
        <p>Discount Amount: ₱${discount.toFixed(2)}</p>
        <p>Delivery Type: ${deliveryName}</p>
        <p>Delivery Fee: ₱${deliveryFee.toFixed(2)}</p>
        <h3>Final Amount: ₱${finalAmount.toFixed(2)}</h3>
    `;
});