<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Handle preflight request
}

$servername = "localhost";
$username = "root";
$password = "";
$database = "set-fit";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true) ?? [];

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM membership_plans";
        $result = $conn->query($sql);
        $plans = [];
        while ($row = $result->fetch_assoc()) {
            $row['features'] = json_decode($row['features'], true); // Decode features from JSON
            $plans[] = $row;
        }
        echo json_encode(["plans" => $plans]);
        break;

        case 'POST':
            if (isset($_GET['action']) && $_GET['action'] === 'update') {
                if (isset($input['id'], $input['name'], $input['price'], $input['duration'], $input['features'])) {
                    $stmt = $conn->prepare("UPDATE membership_plans SET name=?, price=?, duration=?, features=? WHERE id=?");
                    $features = json_encode($input['features']);
                    $stmt->bind_param("ssssi", $input['name'], $input['price'], $input['duration'], $features, $input['id']);
                    $success = $stmt->execute();
                    echo json_encode(["success" => $success]);
                    $stmt->close();
                } else {
                    echo json_encode(["error" => "Missing required fields"]);
                }
            } else {
                // Default behavior: Create new membership plan
                if (isset($input['name'], $input['price'], $input['duration'], $input['features'])) {
                    $stmt = $conn->prepare("INSERT INTO membership_plans (name, price, duration, features) VALUES (?, ?, ?, ?)");
                    $features = json_encode($input['features']);
                    $stmt->bind_param("ssss", $input['name'], $input['price'], $input['duration'], $features);
                    $success = $stmt->execute();
                    echo json_encode(["success" => $success, "id" => $stmt->insert_id]);
                    $stmt->close();
                } else {
                    echo json_encode(["error" => "Missing required fields"]);
                }
            }
            break;     

    case 'PUT':
        if (isset($input['id'], $input['name'], $input['price'], $input['duration'], $input['features'])) {
            $stmt = $conn->prepare("UPDATE membership_plans SET name=?, price=?, duration=?, features=? WHERE id=?");
            $features = json_encode($input['features']);
            $stmt->bind_param("ssssi", $input['name'], $input['price'], $input['duration'], $features, $input['id']);
            $success = $stmt->execute();
            echo json_encode(["success" => $success]);
            $stmt->close();
        } else {
            echo json_encode(["error" => "Missing required fields"]);
        }
        break;

    case 'DELETE':
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        if ($id) {
            $stmt = $conn->prepare("DELETE FROM membership_plans WHERE id=?");
            $stmt->bind_param("i", $id);
            $success = $stmt->execute();
            echo json_encode(["success" => $success]);
            $stmt->close();
        } else {
            echo json_encode(["error" => "ID is required for deletion"]);
        }
        break;

    default:
        echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
exit;
