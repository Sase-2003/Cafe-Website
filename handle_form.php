<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Database connection details
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
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $booking_date = $_POST['booking_date'];
    $booking_time = $_POST['booking_time'];
    $guests = $_POST['guests'];

    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("INSERT INTO bookings (name, email, mobile, booking_date, booking_time, guests) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssi", $name, $email, $mobile, $booking_date, $booking_time, $guests);

    // Execute the statement and return JSON response
    if ($stmt->execute()) {
        // If successful, send success response as JSON
        echo json_encode(["status" => "success", "message" => "Booking Successful!", "description" => "Thank you, $name! Your booking has been confirmed."]);
    } else {
        // If there's an error, send error response as JSON
        echo json_encode(["status" => "error", "message" => "Error", "description" => "There was an issue with your booking. Please try again."]);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
