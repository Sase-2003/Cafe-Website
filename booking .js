function redirectToBooking(itemName, itemPrice) {
  var bookingUrl =
    "order.html?item=" +
    encodeURIComponent(itemName) +
    "&price=" +
    encodeURIComponent(itemPrice);
  window.location.href = bookingUrl;
}

const params = new URLSearchParams(window.location.search);
const item = params.get("item");
const price = parseFloat(params.get("price")).toFixed(2);

document.getElementById("item").value = item;
document.getElementById("price").value = price;

// Calculate total price based on quantity
function calculateTotal() {
  const quantity = document.getElementById("quantity").value;
  const total = (price * quantity).toFixed(2);
  document.getElementById("total").value = total;
}

//  second cofee menu
document.addEventListener("DOMContentLoaded", function () {
  function redirectToBooking1(itemName, itemPrice) {
    // Set the item name and price in the order form
    document.getElementById("item").value = itemName;
    document.getElementById("price").value = itemPrice.toFixed(2);

    // Automatically set the total based on the default quantity of 1
    document.getElementById("quantity").value = 1;
    document.getElementById("total").value = (
      itemPrice * document.getElementById("quantity").value
    ).toFixed(2);

    // Scroll to the order form
    document.getElementById("orderForm").scrollIntoView();
  }

  function calculateTotal() {
    // Calculate the total price based on the quantity
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const total = price * quantity;
    document.getElementById("total").value = total.toFixed(2);
  }

  // Attach the calculateTotal function to the quantity input change event
  document.getElementById("quantity").addEventListener("input", calculateTotal);
});

// js for menu burger

function goToOrderPage(itemName, itemPrice) {
  // Get the order URL
  const orderUrl = "order.html";

  // Create a URLSearchParams object to pass data to order.html
  const params = new URLSearchParams();
  params.set("item", itemName);
  params.set("price", itemPrice);

  // Redirect to the order page with the query parameters
  window.location.href = `${orderUrl}?${params.toString()}`;
}

// ------------------------------for online payment----------------------------------
function togglePaymentOptions() {
  const paymentMethod = document.getElementById("payment").value;
  const onlinePaymentOptions = document.getElementById("onlinePaymentOptions");
  if (paymentMethod === "online") {
    onlinePaymentOptions.style.display = "block";
  } else {
    onlinePaymentOptions.style.display = "none";
  }
}

// -------------------------------------------------other cofee js----------------------------------------
function redirectToBooking1(itemName, itemPrice) {
  // Get the URL for booking
  const bookingUrl = "order.html";

  // Create a URLSearchParams object to pass the item name and price
  const params = new URLSearchParams();
  params.set("item", itemName);
  params.set("price", itemPrice);

  // Redirect to the booking page with the query parameters
  window.location.href = `${bookingUrl}?${params.toString()}`;
}

// -----------------------------------------------------------booking js for php-------------------------
// Use AJAX to submit the form without reloading the page
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  var formData = new FormData(this); // Get the form data

  // Send the form data using Fetch API
  fetch("handle_form.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        showModal(data.message, data.description);
      } else {
        showModal(data.message, data.description);
      }
    })
    .catch((error) => {
      showModal(
        "Error",
        "There was an issue with your booking. Please try again."
      );
    });
});

function showModal(message, description) {
  var modal = document.getElementById("orderModal");
  var modalMessage = document.getElementById("modalMessage");
  var modalDescription = document.getElementById("modalDescription");

  // Set the modal message and description
  modalMessage.innerHTML = message;
  modalDescription.innerHTML = description;

  // Display the modal
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  document.getElementById("orderModal").style.display = "none";
}

// Event listener to close modal when clicking outside of it
window.onclick = function (event) {
  var modal = document.getElementById("orderModal");
  if (event.target == modal) {
    closeModal();
  }
};

// -------------------------------------------------------------order.js----------------------------------------------------
function calculateTotal() {
  var price = parseFloat(document.getElementById("price").value);
  var quantity = parseInt(document.getElementById("quantity").value);

  if (isNaN(price) || price <= 0) {
    alert("Please enter a valid price!");
    document.getElementById("total").value = "0.00";
    return;
  }

  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid quantity!");
    document.getElementById("total").value = "0.00";
    return;
  }

  var total = price * quantity;
  document.getElementById("total").value = total.toFixed(2);
}

function togglePaymentOptions() {
  var paymentMethod = document.getElementById("payment").value;
  var onlinePaymentOptions = document.getElementById("onlinePaymentOptions");

  if (paymentMethod === "online") {
    onlinePaymentOptions.style.display = "block";
  } else {
    onlinePaymentOptions.style.display = "none";
  }
}

function showModal(title, message) {
  var modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.backgroundColor = "white";
  modal.style.padding = "20px";
  modal.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
  modal.style.zIndex = "9999";

  var modalTitle = document.createElement("h2");
  modalTitle.innerText = title;
  modal.appendChild(modalTitle);

  var modalMessage = document.createElement("p");
  modalMessage.innerText = message;
  modal.appendChild(modalMessage);

  var closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.onclick = function () {
    document.body.removeChild(modal);
  };
  modal.appendChild(closeButton);

  document.body.appendChild(modal);
}

document
  .getElementById("orderForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this);
    var params = new URLSearchParams(formData).toString();

    fetch("submit-order.php?" + params)
      .then((response) => response.text())
      .then((data) => {
        showModal(
          "Order placed successfully!",
          "Thank you for your order! Your payment has been successfully processed."
        );
      })
      .catch((error) => {
        showModal(
          "Error placing the order",
          "There was an issue processing your order. Please try again."
        );
      });
  });

// ------------------------------------------------------contact.js-------------------------------------------------
