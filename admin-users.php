<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Users | CoinX Admin</title>
    <link rel="stylesheet" href="css/admin-dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="admin-container">
        <!-- Sidebar -->
        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <h2>Coin<span>X</span> Admin</h2>
            </div>
            
            <div class="sidebar-menu">
                <div class="menu-item" onclick="location.href='admin-dashboard.php'">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </div>
                <div class="menu-item" onclick="location.href='admin-coins.php'">
                    <i class="fas fa-coins"></i>
                    <span>Manage Coins</span>
                </div>
                <div class="menu-item" onclick="location.href='admin-seller-validation.php'">
                    <i class="fas fa-upload"></i>
                    <span>Seller Validation</span>
                </div>
                <div class="menu-item" onclick="location.href='admin-orders.php'">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Orders</span>
                </div>
                <div class="menu-item active" onclick="location.href='admin-users.php'">
                    <i class="fas fa-users"></i>
                    <span>Users</span>
                </div>
                <div class="menu-item" onclick="location.href='admin-reviews.php'">
                    <i class="fas fa-star"></i>
                    <span>Reviews</span>
                </div>
                <div class="menu-item" onclick="location.href='admin-sales-report.php'">
                    <i class="fas fa-chart-line"></i>
                    <span>Sales Reports</span>
                </div>
            </div>
            
            <div class="sidebar-footer">
                <a href="index.php">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </a>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="main-content" id="mainContent">
            <!-- Top Bar -->
            <div class="top-bar">
                <button class="toggle-sidebar" id="toggleSidebar">
                    <i class="fas fa-bars"></i>
                </button>
                
                <div class="search-bar">
                    <i class="fas fa-search"></i>
                    <input type="text" id="userSearch" placeholder="Search users...">
                </div>
                
                <div class="user-info">
                    <img src="https://via.placeholder.com/40" alt="Admin">
                    <div class="dropdown">
                        <button class="dropdown-toggle" id="userDropdown">
                            <span>Admin User</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="dropdown-menu" id="userDropdownMenu">
                            <a href="#" class="dropdown-item">
                                <i class="fas fa-user"></i>
                                Profile
                            </a>
                            <a href="#" class="dropdown-item">
                                <i class="fas fa-cog"></i>
                                Settings
                            </a>
                            <a href="index.php" class="dropdown-item">
                                <i class="fas fa-sign-out-alt"></i>
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Users Management -->
            <div class="section-header">
                <h2>Manage Users</h2>
                <div class="header-actions">
                </div>
            </div>
            
            <!-- Users Table -->
            <div class="data-table-container">
                <table class="data-table" id="usersTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    </tbody>
                </table>
            </div>
            
            <!-- User Details Modal -->
            <div class="modal" id="userDetailsModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>User Details</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <?php
                        include 'connect.php';                            
                        $sql = "SELECT * FROM users";
                        $result = mysqli_query($conn, $sql);

                        // Add error checking
                        if (!$result) {
                            echo "Error: " . mysqli_error($conn);
                        }

                        // Check if there are any rows
                        if (mysqli_num_rows($result) == 0) {
                            echo "No users found in the database";
                        }

                        while($row = mysqli_fetch_assoc($result)) {
                            echo $row['user_id'] . " | " . $row['username'] . " | " . $row['email'] . "<br>";
                        }

                        // Handle delete request
                        if(isset($_POST['delete_user'])) {
                            $delete_id = mysqli_real_escape_string($conn, $_POST['delete_id']);
                            $delete_sql = "DELETE FROM users WHERE user_id = '$delete_id'";
                            mysqli_query($conn, $delete_sql);
                            header("Location: admin-users.php");
                            exit();
                        }
?> 
                    <div class="modal-footer">
                        <button class="btn secondary close-modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="js/admin-common.js"></script>
    <script src="js/admin-users.js"></script>
</body>
</html> 