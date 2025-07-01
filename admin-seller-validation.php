<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seller Coin Validation | CoinX</title>
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
                <div class="menu-item active" onclick="location.href='admin-seller-validation.php'">
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
                <div class="search-bar">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search...">
                </div>
                
            </div>            
            
            <!-- Coin Validation Table -->
            <div class="validation-table-container">
                <div class="section-header">
                    <h2>Seller Coin Validation Requests</h2>
                </div>
                
                <div class="table-controls">
                    <div class="filter-container">
                        <label for="statusFilter">Filter by Status:</label>
                        <select id="statusFilter" class="filter-select">
                            <option value="all">All Requests</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Coin Name</th>
                            <th>Seller</th>
                            <th>Coin Type</th>
                            <th>Submission Date</th>
                            <th>Price (₹)</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Table content will be dynamically populated by JavaScript -->
                    </tbody>
                </table>
                
                
            </div>
            
            <!-- Coin Validation Modal (hidden by default) -->
            <div class="modal" id="coinValidationModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Coin Validation Details</h2>
                        <button class="close-modal"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="coin-detail-container">
                            <div class="coin-images">
                                <div class="main-image">
                                    <img src="https://via.placeholder.com/400" alt="Coin Front">
                                </div>
                                <div class="thumbnail-images">
                                    <img src="https://via.placeholder.com/80" alt="Thumbnail 1" class="active">
                                    <img src="https://via.placeholder.com/80" alt="Thumbnail 2">
                                    <img src="https://via.placeholder.com/80" alt="Thumbnail 3">
                                    <img src="https://via.placeholder.com/80" alt="Thumbnail 4">
                                </div>
                            </div>
                            <div class="coin-info-details">
                                <h3>Mughal Gold Mohur</h3>
                                <div class="info-row">
                                    <span class="label">Seller:</span>
                                    <span class="value">Vikram Mehta</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">Type:</span>
                                    <span class="value">Antique Gold</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">Weight:</span>
                                    <span class="value">10.8g</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">Dimensions:</span>
                                    <span class="value">22mm</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">Era:</span>
                                    <span class="value">1600-1700 CE</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">Price:</span>
                                    <span class="value">₹35,000</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">Submission Date:</span>
                                    <span class="value">15 Mar 2023</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">Status:</span>
                                    <span class="value status pending">Pending</span>
                                </div>
                                <div class="info-row full-width">
                                    <span class="label">Description:</span>
                                    <p class="value description">
                                        This is an authentic gold mohur from the Mughal era, featuring the portrait of Emperor Shah Jahan. The coin is in excellent condition with clear inscriptions in Persian. The coin was minted in Delhi around 1650 CE during the height of Mughal power. The intricate details and high gold content make this a rare collector's item.
                                    </p>
                                </div>
                                <div class="info-row full-width">
                                    <span class="label">Authentication:</span>
                                    <p class="value">
                                        The seller has provided a certificate of authenticity from the Indian Numismatic Society. The coin also has distinctive markers that align with known genuine specimens from this period.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="validation-note">
                            <textarea placeholder="Add validation notes or reason for rejection"></textarea>
                        </div>
                        <div class="modal-actions">
                            <button class="btn btn-danger">Reject</button>
                            <button class="btn btn-success">Approve</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="js/admin-common.js"></script>
    <script src="js/admin-seller-validation.js"></script>
    <script>
        // Thumbnail image selection in modal
        const thumbnails = document.querySelectorAll('.thumbnail-images img');
        const mainImage = document.querySelector('.main-image img');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                // Add active class to clicked thumbnail
                this.classList.add('active');
                // Update main image
                mainImage.src = this.src.replace('80', '400');
            });
        });
    </script>
</body>
</html> 