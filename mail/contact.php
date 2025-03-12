<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "order_db";

if(empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(500);
    exit();
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$m_subject = strip_tags(htmlspecialchars($_POST['subject']));
$message = strip_tags(htmlspecialchars($_POST['message']));

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    http_response_code(500);
    exit("Connection failed: " . $connection->connect_error);
}

$sql = "INSERT INTO contact_messages (name, email, subject, message) VALUES ('$name', '$email', '$m_subject', '$message')";

if ($connection->query($sql) === TRUE) {
    echo "Your message has been sent.";
} else {
    http_response_code(500);
    echo "Error: " . $sql . "<br>" . $connection->error;
}

$connection->close();
?>
