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
                
                <div class="filter-options">
                    <select class="filter-select" id="categoryFilter">
                        <option value="">All Categories</option>
                        <option value="ancient">Ancient</option>
                        <option value="medieval">Medieval</option>
                        <option value="modern">Modern</option>
                        <option value="commemorative">Commemorative</option>
                    </select>
                    
                    <select class="filter-select" id="stockFilter">
                        <option value="">All Stock Status</option>
                        <option value="in-stock">In Stock</option>
                        <option value="low-stock">Low Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                    </select>
                    
                    <select class="filter-select" id="sortFilter">
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="name-asc">Name: A to Z</option>
                        <option value="name-desc">Name: Z to A</option>
                    </select>
                </div>
            </div>
            
            <!-- Coins Table -->
            <div class="coins-table-container">
                <table class="coins-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Coin Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="7" style="text-align:center;">Loading coins...</td>
                        </tr>
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
            
            <form id="coinForm">
                <div class="form-row">
                    <div class="form-group">
                        <label for="coinName">Coin Name</label>
                        <input type="text" id="coinName" name="coinName" required minlength="3" maxlength="100" 
                               title="Coin name must be between 3 and 100 characters">
                    </div>
                    
                    <div class="form-group">
                        <label for="coinCategory">Category</label>
                        <select id="coinCategory" name="coinCategory" required title="Please select a category">
                            <option value="">Select Category</option>
                            <option value="ancient">Ancient</option>
                            <option value="medieval">Medieval</option>
                            <option value="modern">Modern</option>
                            <option value="commemorative">Commemorative</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="coinPrice">Price (₹)</label>
                        <input type="number" id="coinPrice" name="coinPrice" min="0.01" step="0.01" required
                               title="Please enter a valid price (greater than 0)">
                    </div>
                    
                    <div class="form-group">
                        <label for="coinStock">Stock Quantity</label>
                        <input type="number" id="coinStock" name="coinStock" min="0" step="1" required
                               title="Please enter a valid stock quantity (0 or greater)">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="coinYear">Year</label>
                        <input type="text" id="coinYear" name="coinYear" pattern="^\d{1,4}(?: (BC|AD))?$"
                               title="Please enter a valid year (e.g., 1950 or 50 BC)">
                    </div>
                    
                    <div class="form-group">
                        <label for="coinMaterial">Material</label>
                        <select id="coinMaterial" name="coinMaterial">
                            <option value="">Select Material</option>
                            <option value="gold">Gold</option>
                            <option value="silver">Silver</option>
                            <option value="copper">Copper</option>
                            <option value="bronze">Bronze</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="coinDescription">Description</label>
                    <textarea id="coinDescription" name="coinDescription" rows="4" minlength="10" 
                              title="Description should be at least 10 characters long"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="coinImage">Coin Image</label>
                    <div class="image-preview" id="imagePreview">
                        <span class="placeholder">No image selected</span>
                        <button type="button" class="upload-btn">Upload</button>
                    </div>
                    <input type="file" id="coinImage" name="coinImage" accept="image/*" style="display: none;">
                </div>
                
                <div class="form-group">
                    <div class="checkbox-group">
                        <input type="checkbox" id="coinFeatured" name="coinFeatured">
                        <label for="coinFeatured">Feature this coin on homepage</label>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Coin</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div class="modal" id="deleteModal">
        <div class="modal-content" style="max-width: 400px;">
            <span class="close-modal" id="closeDeleteModal">&times;</span>
            
            <div class="modal-header">
                <h2>Confirm Delete</h2>
            </div>
            
            <p style="margin-bottom: 20px;">Are you sure you want to delete this coin? This action cannot be undone.</p>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="cancelDeleteBtn">Cancel</button>
                <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Delete</button>
            </div>
        </div>
    </div>
    
    <!-- View Coin Modal -->
    <div class="modal" id="viewCoinModal">
        <div class="modal-content">
            <span class="close-modal" id="closeViewModal">&times;</span>
            
            <div class="modal-header">
                <h2>Coin Details</h2>
            </div>
            
            <div class="coin-details-container">
                <div class="coin-details-image">
                    <img id="viewCoinImage" src="https://via.placeholder.com/300" alt="Coin Image">
                </div>
                
                <div class="coin-details-info">
                    <div class="info-group">
                        <h3 id="viewCoinName">Coin Name</h3>
                        <div class="coin-meta">
                            <span id="viewCoinCategory" class="category-badge">Category</span>
                            <span id="viewCoinFeatured" class="featured-badge">Featured</span>
                        </div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Price:</div>
                        <div id="viewCoinPrice" class="info-value">₹0.00</div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Stock:</div>
                        <div id="viewCoinStock" class="info-value">0</div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Year:</div>
                        <div id="viewCoinYear" class="info-value">Unknown</div>
                    </div>
                    
                    <div class="info-group">
                        <div class="info-label">Material:</div>
                        <div id="viewCoinMaterial" class="info-value">Unknown</div>
                    </div>
                    
                    <div class="info-group description">
                        <div class="info-label">Description:</div>
                        <div id="viewCoinDescription" class="info-value">No description available.</div>
                    </div>
                    
                    <div class="info-group dates">
                        <div><small>Created: <span id="viewCoinCreated">Unknown</span></small></div>
                        <div><small>Last Updated: <span id="viewCoinUpdated">Unknown</span></small></div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="closeViewBtn">Close</button>
                <button type="button" class="btn btn-primary" id="editFromViewBtn">Edit This Coin</button>
            </div>
        </div>
    </div>

    <script src="js/admin-common.js"></script>
    <script src="js/admin-coins.js"></script>
</body>
</html> 