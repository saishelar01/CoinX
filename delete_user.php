<?php
include 'connect.php';

if(isset($_POST['id'])) {
    $id = mysqli_real_escape_string($conn, $_POST['id']);
    
    // First check if user exists
    $check_sql = "SELECT * FROM users WHERE id = '$id'";
    $check_result = mysqli_query($conn, $check_sql);
    
    if(mysqli_num_rows($check_result) > 0) {
        // Delete user
        $sql = "DELETE FROM users WHERE id = '$id'";
        
        if(mysqli_query($conn, $sql)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error deleting user']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No user ID provided']);
}

mysqli_close($conn);
?> 