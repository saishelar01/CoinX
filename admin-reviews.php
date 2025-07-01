<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Reviews | CoinX Admin</title>
    <link rel="stylesheet" href="css/admin-dashboard.css">
    <link rel="stylesheet" href="css/admin-reviews.css">
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
                <div class="menu-item" onclick="location.href='admin-users.php'">
                    <i class="fas fa-users"></i>
                    <span>Users</span>
                </div>
                <div class="menu-item active" onclick="location.href='admin-reviews.php'">
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
                    <input type="text" placeholder="Search reviews...">
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
            
            <!-- Reviews Overview -->
            <div class="reviews-overview">
                <div class="overview-card">
                    <h3>Total Reviews</h3>
                    <div class="overview-count" id="totalReviews">0</div>
                </div>
                <div class="overview-card">
                    <h3>Average Rating</h3>
                    <div class="overview-rating" id="averageRating">
                        <span>0.0</span>
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                </div>
                <div class="overview-card">
                    <h3>Positive Reviews</h3>
                    <div class="overview-count" id="positiveReviews">0</div>
                </div>
                <div class="overview-card">
                    <h3>Negative Reviews</h3>
                    <div class="overview-count" id="negativeReviews">0</div>
                </div>
            </div>
            
            <!-- Review Management -->
            <div class="review-actions">
                <div class="filter-options">
                    <select class="filter-select" id="ratingFilter">
                        <option value="">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                    
                    <select class="filter-select" id="dateFilter">
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>
            
            <!-- Reviews List -->
            <div class="reviews-container">
                <div class="reviews-list" id="reviewsList">
                    <!-- Reviews will be populated by JavaScript -->
                </div>
            </div>
            
            <!-- No Reviews Message (initially hidden) -->
            <div class="no-reviews" id="noReviews">
                <i class="fas fa-comment-slash"></i>
                <h3>No Reviews Found</h3>
                <p>There are no customer reviews to display at this time.</p>
            </div>
        </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div class="modal" id="deleteModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Delete Review</h3>
                <button class="close-modal" id="closeDeleteModal">&times;</button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete this review? This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button class="btn cancel-btn" id="cancelDelete">Cancel</button>
                <button class="btn delete-btn" id="confirmDelete">Delete</button>
            </div>
        </div>
    </div>
    
    <script src="js/admin-dashboard.js"></script>
    <script src="js/admin-reviews.js"></script>
</body>
</html> 