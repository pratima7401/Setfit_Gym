<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "set-fit";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Handle Different Request Methods
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = "SELECT id, name, email, phone, purpose, medicalIssue, medicalDetails, created_at FROM members"; 
    $result = $conn->query($sql);

    $members = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $members[] = $row;
        }
    }
    echo json_encode(["success" => true, "members" => $members]);
}

elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['id']) || !isset($data['name']) || !isset($data['email']) || !isset($data['phone']) || !isset($data['purpose']) || !isset($data['medicalIssue']) || !isset($data['medicalDetails'])) {
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
        exit();
    }

    $id = $conn->real_escape_string($data['id']);
    $name = $conn->real_escape_string($data['name']);
    $email = $conn->real_escape_string($data['email']);
    $phone = $conn->real_escape_string($data['phone']);
    $purpose = $conn->real_escape_string($data['purpose']);
    $medicalIssue = $conn->real_escape_string($data['medicalIssue']);
    $medicalDetails = $conn->real_escape_string($data['medicalDetails']);

    $sql = "UPDATE members SET name='$name', email='$email', phone='$phone', purpose='$purpose', medicalIssue='$medicalIssue', medicalDetails='$medicalDetails' WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Member updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error updating member: " . $conn->error]);
    }
}

elseif ($method === 'DELETE') {
    if (!isset($_GET['id'])) {
        echo json_encode(["success" => false, "message" => "Missing member ID"]);
        exit();
    }

    $id = $conn->real_escape_string($_GET['id']);
    $sql = "DELETE FROM members WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Member deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error deleting member: " . $conn->error]);
    }
}

$conn->close();
?>
