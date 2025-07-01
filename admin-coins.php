<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Coins | CoinX Admin</title>
    <link rel="stylesheet" href="css/admin-dashboard.css">
    <link rel="stylesheet" href="css/admin-coins.css">
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
                <div class="menu-item active" onclick="location.href='admin-coins.php'">
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
                <div class="menu-item" onclick="location.href='admin-users.php'">
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
                    <input type="text" placeholder="Search coins...">
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
                            <a href="index.php" class="dropdown-item">
                                <i class="fas fa-sign-out-alt"></i>
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Notification System -->
            <div id="notification-container" class="notification-container"></div>
            
            <!-- Coin Management -->
            <div class="coin-actions">
                <button class="add-coin-btn" id="addCoinBtn">
                    <i class="fas fa-plus"></i> Add New Coin
                </button>
                
            </div>
            
            <!-- Coins Table -->
            <div class="coins-table-container">
                <table class="coins-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Coin Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Seller</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            include 'connect.php';
                            
                            // Handle delete request
                            if(isset($_POST['delete_coin'])) {
                                $delete_id = mysqli_real_escape_string($conn, $_POST['delete_id']);
                                $delete_sql = "DELETE FROM coins WHERE coin_id = '$delete_id'";
                                mysqli_query($conn, $delete_sql);
                                header("Location: admin-coins.php");
                                exit();
                            }
                            
                            // Join with sellers table to get seller name
                            $sql = "SELECT c.*, s.username as seller_name 
                                   FROM coins c 
                                   LEFT JOIN users s ON c.seller_id = s.user_id 
                                   ORDER BY c.coin_id DESC";
                            $result = mysqli_query($conn, $sql);
                            
                            if(mysqli_num_rows($result) > 0) {
                                while($row = mysqli_fetch_assoc($result)) {
                                    echo "<tr>";
                                    echo "<td><img src='".$row['image_url']."' alt='".$row['name']."' class='coin-image'></td>";
                                    echo "<td class='coin-name'>".$row['name']."</td>";
                                    echo "<td class='coin-price'>₹".number_format($row['price'], 2)."</td>";
                                    echo "<td class='coin-stock ".($row['quantity'] < 5 ? 'stock-low' : ($row['quantity'] < 10 ? 'stock-medium' : 'stock-high'))."'>".$row['quantity']."</td>";
                                    echo "<td>".$row['seller_name']."</td>";
                                    echo "<td>
                                            <button class='btn-icon' onclick='viewCoinDetails(".$row['coin_id'].")'><i class='fas fa-eye'></i></button>
                                            <button class='btn-icon' onclick='editCoin(".$row['coin_id'].")'><i class='fas fa-edit'></i></button>
                                            <form method='POST' style='display: inline;' onsubmit='return confirm(\"Are you sure you want to delete this coin?\");'>
                                                <input type='hidden' name='delete_id' value='".$row['coin_id']."'>
                                                <button type='submit' name='delete_coin' class='btn-icon'><i class='fas fa-trash'></i></button>
                                            </form>
                                          </td>";
                                    echo "</tr>";
                                }
                            } else {
                                echo "<tr><td colspan='6' style='text-align:center;'>No coins found</td></tr>";
                            }
                        ?>
                    </tbody>
                </table>
            </div>
            
            <!-- Pagination -->
            <div class="pagination">
                <div class="pagination-item disabled"><i class="fas fa-chevron-left"></i></div>
                <div class="pagination-item active">1</div>
                <div class="pagination-item disabled"><i class="fas fa-chevron-right"></i></div>
            </div>
        </div>
    </div>
    
    <!-- Add/Edit Coin Modal -->
    <div class="modal" id="coinModal">
        <div class="modal-content">
            <span class="close-modal" id="closeModal">&times;</span>
            
            <div class="modal-header">
                <h2 id="modalTitle">Add New Coin</h2>
            </div>
            
            <form id="coinForm" method="POST" enctype="multipart/form-data">
                <div class="form-row">
                    <div class="form-group">
                        <label for="coinName">Coin Name</label>
                        <input type="text" id="coinName" name="name" required minlength="3" maxlength="100" 
                               title="Coin name must be between 3 and 100 characters">
                    </div>
                    
                    <div class="form-group">
                        <label for="coinPrice">Price (₹)</label>
                        <input type="number" id="coinPrice" name="price" min="0.01" step="0.01" required
                               title="Please enter a valid price (greater than 0)">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="coinQuantity">Quantity</label>
                        <input type="number" id="coinQuantity" name="quantity" min="0" step="1" required
                               title="Please enter a valid quantity (0 or greater)">
                    </div>
                    
                    <div class="form-group">
                        <label for="coinSeller">Seller</label>
                        <select id="coinSeller" name="seller_id" required title="Please select a seller">
                            <option value="">Select Seller</option>
                            <?php
                                $sellers_sql = "SELECT user_id, username FROM users WHERE role = 'seller'";
                                $sellers_result = mysqli_query($conn, $sellers_sql);
                                while($seller = mysqli_fetch_assoc($sellers_result)) {
                                    echo "<option value='".$seller['user_id']."'>".$seller['username']."</option>";
                                }
                            ?>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="coinDescription">Description</label>
                    <textarea id="coinDescription" name="description" rows="4" minlength="10" 
                              title="Description should be at least 10 characters long"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="coinImage">Coin Image</label>
                    <div class="image-preview" id="imagePreview">
                        <span class="placeholder">No image selected</span>
                        <button type="button" class="upload-btn">Upload</button>
                    </div>
                    <input type="file" id="coinImage" name="image" accept="image/*" style="display: none;">
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Coin</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div class="modal" id="deleteConfirmModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Confirm Deletion</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete this coin? This action cannot be undone.</p>
                <p class="warning-text">All associated data including orders and reviews will also be deleted.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary close-modal">Cancel</button>
                <button class="btn btn-danger" id="confirmDeleteBtn">Delete</button>
            </div>
        </div>
    </div>

    <script src="js/admin-common.js"></script>
    <script src="js/admin-coins.js"></script>
</body>
</html> 