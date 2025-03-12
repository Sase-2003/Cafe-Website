<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "order_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$item = $_GET['item'];
$price = $_GET['price'];
$quantity = $_GET['quantity'];
$total = $_GET['total'];
$name = $_GET['name'];
$email = $_GET['email'];
$address = $_GET['address'];
$payment_method = $_GET['payment'];
$payment_details = isset($_GET['paymentDetails']) ? $_GET['paymentDetails'] : ''; // Default to empty if not provided

// Prepare and bind the SQL statement to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO orders (item, price, quantity, total, name, email, address, payment_method, payment_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sdissssss", $item, $price, $quantity, $total, $name, $email, $address, $payment_method, $payment_details);

// Execute the statement
if ($stmt->execute()) {
    echo "Order placed successfully!";
} else {
    echo "Error placing the order: " . $stmt->error;
}

// Close the connection
$stmt->close();
$conn->close();
?>
