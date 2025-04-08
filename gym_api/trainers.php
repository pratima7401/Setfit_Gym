<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ob_start(); // Prevents accidental HTML output
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Database connection
$conn = new mysqli("localhost", "root", "", "set-fit");
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Get action from query parameters
$action = $_GET["action"] ?? "";

// Ensure upload directory exists
$upload_dir = "uploads/";
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

// Function to handle file uploads
function uploadImage($file) {
    global $upload_dir;

    $allowed_extensions = ["jpg", "jpeg", "png"];
    $file_extension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));

    if (!in_array($file_extension, $allowed_extensions)) {
        return ["error" => "Invalid file format (only JPG, JPEG, PNG allowed)"];
    }

    $filename = time() . "_" . basename($file["name"]);
    $file_path = $upload_dir . $filename;

    if (move_uploaded_file($file["tmp_name"], $file_path)) {
        return ["success" => $filename];
    } else {
        return ["error" => "File upload failed"];
    }
}
if ($action === "get") {
    $result = $conn->query("SELECT * FROM trainers");

    if ($result->num_rows > 0) {
        $trainers = [];
        while ($row = $result->fetch_assoc()) {
            $trainers[] = $row;
        }
        echo json_encode(["success" => true, "trainers" => $trainers]);
    } else {
        echo json_encode(["success" => true, "trainers" => []]);
    }
}

elseif ($action === "add") {
    $name = mysqli_real_escape_string($conn, $_POST["name"]);
    $specialty = mysqli_real_escape_string($conn, $_POST["specialty"]);
    $experience = mysqli_real_escape_string($conn, $_POST["experience"]);
    
    $certifications = isset($_POST["certifications"]) ? json_decode($_POST["certifications"], true) : [];
    $certifications = mysqli_real_escape_string($conn, implode(",", $certifications));

    if (!isset($_FILES["image"])) {
        echo json_encode(["error" => "Image file is required"]);
        exit();
    }

    $upload_result = uploadImage($_FILES["image"]);
    if (isset($upload_result["error"])) {
        echo json_encode($upload_result);
        exit();
    }

    $image_filename = $upload_result["success"];
    
    $sql = "INSERT INTO trainers (name, image, specialty, experience, certifications) 
            VALUES ('$name', '$image_filename', '$specialty', '$experience', '$certifications')";

    echo json_encode($conn->query($sql) ? ["success" => "Trainer added"] : ["error" => "Failed to add trainer"]);
}
 
elseif ($action === "update") {
    // Read JSON input
    $inputJSON = file_get_contents("php://input");
    $data = json_decode($inputJSON, true);

    if (!$data) {
        echo json_encode(["error" => "Invalid JSON input"]);
        exit();
    }

    // Sanitize and extract data
    $id = mysqli_real_escape_string($conn, $data["id"]);
    $name = mysqli_real_escape_string($conn, $data["name"]);
    $specialty = mysqli_real_escape_string($conn, $data["specialty"]);
    $experience = mysqli_real_escape_string($conn, $data["experience"]);
    $certifications = json_decode($data["certifications"], true);
    $certifications = is_array($certifications) ? implode(",", $certifications) : "";

    $image_filename = $data["existing_image"]; // Keep old image if not updated

    // **Handle image upload only if a new file is sent**
    if (!empty($_FILES["image"]["name"])) {
        $upload_result = uploadImage($_FILES["image"]);
        if (isset($upload_result["error"])) {
            echo json_encode(["error" => "Image upload failed"]);
            exit();
        }
        $image_filename = $upload_result["success"];
    }

    // **Run SQL Query**
    $sql = "UPDATE trainers SET name='$name', image='$image_filename', specialty='$specialty', 
            experience='$experience', certifications='$certifications' WHERE id=$id";

    if ($conn->query($sql)) {
        echo json_encode(["success" => "Trainer updated"]);
    } else {
        echo json_encode(["error" => "Failed to update trainer"]);
    }
}
 elseif ($action === "delete") {
    // Delete Trainer
    $id = mysqli_real_escape_string($conn, $_POST["id"]);

    // Get the image filename before deleting the trainer record
    $result = $conn->query("SELECT image FROM trainers WHERE id=$id");
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $image_path = $upload_dir . $row["image"];
        if (file_exists($image_path)) {
            unlink($image_path); // Delete the image file
        }
    }

    $sql = "DELETE FROM trainers WHERE id=$id";

    echo json_encode($conn->query($sql) ? ["success" => "Trainer deleted"] : ["error" => "Failed to delete trainer"]);

} else {
    echo json_encode(["error" => "Invalid action"]);
}

$conn->close();
?>
