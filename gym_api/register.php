<?php
// Set headers to allow CORS and specify JSON response
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "set-fit";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check if JSON decoding failed
if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid or empty JSON received"]);
    exit();
}

// Use null coalescing operator to prevent warnings
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$purpose = $data['purpose'] ?? '';
$medicalIssue = $data['medicalIssue'] ?? '';
$medicalDetails = $data['medicalDetails'] ?? '';

// Validate required fields
if (empty($name) || empty($email) || empty($phone)) {
    echo json_encode(["success" => false, "message" => "Please fill all required fields."]);
    exit();
}

// Prepare SQL statement
$sql = "INSERT INTO members (name, email, phone, purpose, medicalIssue, medicalDetails) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $name, $email, $phone, $purpose, $medicalIssue, $medicalDetails);

// Execute statement
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registration successful!"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
}

// Close statement and connection
$stmt->close();
$conn->close();
