<?php
// Allow requests from frontend
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "set-fit";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check Connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Get JSON Input
$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $full_name = $data["full_name"];
    $email = $data["email"];
    $phone = $data["phone"];
    $message = $data["message"];

    if (empty($full_name) || empty($email) || empty($phone) || empty($message)) {
        echo json_encode(["success" => false, "message" => "All fields are required."]);
        exit();
    }

    // Insert Data
    $stmt = $conn->prepare("INSERT INTO enquiries (full_name, email, phone, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $full_name, $email, $phone, $message);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Message sent successfully!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
