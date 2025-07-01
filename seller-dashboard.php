<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seller Dashboard | CoinX</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/auth.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* Dashboard specific styles */
        .dashboard-container {
            display: flex;
            min-height: calc(100vh - 100px - 350px); /* Account for header and footer */
            padding: 40px 0;
        }
        
        .dashboard-sidebar {
            width: 250px;
            background: #f5f5f5;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-right: 30px;
        }
        
        .dashboard-sidebar h3 {
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
            color: var(--primary-color);
        }
        
        .dashboard-menu {
            list-style: none;
            padding: 0;
        }
        
        .dashboard-menu li {
            margin-bottom: 10px;
        }
        
        .dashboard-menu a {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
            text-decoration: none;
            color: #333;
            transition: all 0.3s;
        }
        
        .dashboard-menu a:hover {
            background: #e9e9e9;
        }
        
        .dashboard-menu a.active {
            background: var(--primary-color);
            color: white;
        }
        
        .dashboard-menu i {
            margin-right: 10px;
            width: 20px;
            text-align: center;
        }
        
        .dashboard-content {
            flex: 1;
            background: #fff;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .dashboard-content h2 {
            margin-bottom: 20px;
            color: var(--primary-color);
        }
        
        .dashboard-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            text-align: center;
        }
        
        .stat-card h3 {
            font-size: 2rem;
            margin: 10px 0;
            color: var(--primary-color);
        }
        
        .stat-card p {
            color: #777;
            font-size: 0.9rem;
        }
        
        .recent-activity {
            margin-top: 30px;
        }
        
        .activity-list {
            list-style: none;
            padding: 0;
        }
        
        .activity-list li {
            padding: 15px 0;
            border-bottom: 1px solid #eee;
            display: flex;
            align-items: center;
        }
        
        .activity-list li:last-child {
            border-bottom: none;
        }
        
        .activity-list i {
            width: 40px;
            height: 40px;
            background: #f0f0f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: var(--primary-color);
        }
        
        .activity-content {
            flex: 1;
        }
        
        .activity-content h4 {
            margin: 0 0 5px 0;
            font-size: 1rem;
        }
        
        .activity-content p {
            margin: 0;
            color: #777;
            font-size: 0.85rem;
        }
        
        .activity-time {
            color: #aaa;
            font-size: 0.8rem;
        }
        
        /* Add Coin Form Styles */
        .coin-form {
            display: none; /* Hidden by default */
            max-width: 800px;
            margin: 0 auto;
        }
        
        .coin-form.active {
            display: block; /* Shown when active */
        }
        
        .form-row {
            display: flex;
            gap: 20px;
            margin-bottom: 15px;
        }
        
        .form-col {
            flex: 1;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #333;
        }
        
        .form-group input[type="text"],
        .form-group input[type="number"],
        .form-group input[type="email"],
        .form-group input[type="tel"],
        .form-group input[type="password"],
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        
        .form-group input[type="file"] {
            width: 100%;
            padding: 10px;
            border: 1px dashed #ddd;
            border-radius: 5px;
            background: #f9f9f9;
            cursor: pointer;
        }
        
        .form-group input[type="file"]:hover {
            border-color: var(--primary-color);
            background: #f0f7ff;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            border-color: var(--primary-color);
            outline: none;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
        }
        
        .form-hint {
            font-size: 0.8rem;
            color: #777;
            margin-top: 5px;
        }
        
        /* Required field indicator */
        label:after {
            content: " *";
            color: #e32;
            display: none;
        }
        
        label[for="coinName"]:after,
        label[for="condition"]:after,
        label[for="price"]:after,
        label[for="quantity"]:after,
        label[for="description"]:after,
        label[for="coinImages"]:after {
            display: inline;
        }
        
        .form-options {
            margin: 25px 0;
        }
        
        .remember-me {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .remember-me input[type="checkbox"] {
            margin-right: 10px;
            width: 18px;
            height: 18px;
        }
        
        .remember-me label {
            color: #555;
            font-size: 0.9rem;
        }
        
        .btn {
            display: inline-block;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
        }
        
        .primary-btn {
            background-color: var(--primary-color);
            color: white;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .primary-btn:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        
        .secondary {
            background-color: #6c757d;
            color: white;
        }
        
        .secondary:hover {
            background-color: #5a6268;
        }
        
        #addCoinForm {
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        #addCoinForm .btn {
            margin-top: 15px;
            width: 100%;
            max-width: 200px;
        }
        
        .coin-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        
        .coin-table th {
            background: var(--primary-color);
            color: white;
            padding: 12px;
            text-align: left;
        }
        
        .coin-table td {
            padding: 12px;
            border-bottom: 1px solid #eee;
        }
        
        .coin-table tr:hover {
            background: #f9f9f9;
        }
        
        .coin-image {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 5px;
        }
        
        .action-buttons {
            display: flex;
            gap: 10px;
        }
        
        .action-buttons button {
            padding: 6px 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.85rem;
        }
        
        .edit-btn {
            background: #4CAF50;
            color: white;
        }
        
        .delete-btn {
            background: #f44336;
            color: white;
        }
        
        .status-pending {
            background: #FFC107;
            color: #000;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
        }
        
        .status-approved {
            background: #4CAF50;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
        }
        
        .status-rejected {
            background: #f44336;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
        }
        
        /* Dashboard Content Sections */
        .dashboard-section {
            display: none;
        }
        
        .dashboard-section.active {
            display: block;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <h1>Coin<span>X</span></h1>
            </div>
            <nav>
                <ul>
                    <li><a href="index.php">Home</a></li>
                </ul>
            </nav>
            <div class="header-icons">
                <span class="seller-welcome">Welcome, <span id="sellerName">Seller</span></span>
                <a href="#" id="logoutBtn" class="user-icon" title="Logout"><i class="fas fa-sign-out-alt"></i></a>
            </div>
            <div class="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </header>

    <section class="page-header">
        <div class="container">
            <h1>Seller Dashboard</h1>
            <div class="breadcrumb">
                <a href="index.php">Home</a> / Seller Dashboard
            </div>
        </div>
    </section>

    <div class="container dashboard-container">
        <div class="dashboard-sidebar">
            <h3>Seller Menu</h3>
            <ul class="dashboard-menu">
                <li><a href="#" class="nav-link active" data-section="dashboard-overview"><i class="fas fa-home"></i> Dashboard</a></li>
                <li><a href="#" class="nav-link" data-section="my-coins"><i class="fas fa-coins"></i> My Coins</a></li>
                <li><a href="#" class="nav-link" data-section="add-coin"><i class="fas fa-plus-circle"></i> Add New Coin</a></li>
            </ul>
        </div>
        
        <div class="dashboard-content">
            <!-- Dashboard Overview Section -->
            <div id="dashboard-overview" class="dashboard-section active">
                <h2>Dashboard Overview</h2>
                
                <div class="dashboard-stats">
                    <div class="stat-card">
                        <i class="fas fa-coins fa-2x"></i>
                        <h3 id="totalCoins">0</h3>
                        <p>Total Coins</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-rupee-sign fa-2x"></i>
                        <h3 id="totalRevenue">₹0</h3>
                        <p>Total Revenue</p>
                    </div>
                </div>
                
                <div class="recent-activity">
                    <h3>Recent Activity</h3>
                    <ul class="activity-list" id="recentActivityList">
                        <li>
                            <i class="fas fa-plus"></i>
                            <div class="activity-content">
                                <h4>New Coin Added</h4>
                                <p>You added a new coin: 1947 Independence Rupee</p>
                            </div>
                            <span class="activity-time">2 hours ago</span>
                        </li>
                        <li>
                            <i class="fas fa-check-circle"></i>
                            <div class="activity-content">
                                <h4>Coin Approved</h4>
                                <p>Admin approved your coin: Mughal Emperor Akbar Gold Mohur</p>
                            </div>
                            <span class="activity-time">3 days ago</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- My Coins Section -->
            <div id="my-coins" class="dashboard-section">
                <h2>My Coins</h2>
                
                <div class="section-actions" style="margin-bottom: 20px;">
                    <button id="refreshCoins" class="btn secondary"><i class="fas fa-sync-alt"></i> Refresh Coins</button>
                </div>
                
                <table class="coin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Coin Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Date Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="myCoinsList">
                        <!-- Will be populated dynamically -->
                    </tbody>
                </table>
            </div>
            
            <!-- Add New Coin Section -->
            <div id="add-coin" class="dashboard-section">
                <h2>Add New Coin</h2>
                
                <form id="addCoinForm" class="coin-form active">
                    <div class="form-row">
                        <div class="form-col">
                            <div class="form-group">
                                <label for="coinName">Coin Name</label>
                                <input type="text" id="coinName" name="coinName" required>
                            </div>
                        </div>
                        <div class="form-col">
                            <div class="form-group">
                                <label for="period">Period/Year</label>
                                <input type="number" id="period" name="period" max="2024">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-col">
                            <div class="form-group">
                                <label for="material">Material</label>
                                <select id="material" name="material">
                                    <option value="">Select Material</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Copper">Copper</option>
                                    <option value="Bronze">Bronze</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-col">
                            <div class="form-group">
                                <label for="condition">Condition</label>
                                <select id="condition" name="condition" required>
                                    <option value="">Select Condition</option>
                                    <option value="Mint">Perfect </option>
                                    <option value="Good">Good - Some wear visible</option>
                                    <option value="Fair">Fair - Significant wear</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-col">
                            <div class="form-group">
                                <label for="price">Price (in ₹)</label>
                                <input type="number" id="price" name="price" min="1" required>
                            </div>
                        </div>
                        <div class="form-col">
                            <div class="form-group">
                                <label for="quantity">Quantity Available</label>
                                <input type="number" id="quantity" name="quantity" min="1" value="1" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" name="description" rows="4" required></textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-col">
                            <div class="form-group">
                                <label for="coinImages">Coin Images</label>
                                <input type="file" id="coinImages" name="coinImages[]" accept="image/*" multiple required>
                                <p class="form-hint">Upload image. Supported formats: JPG, PNG.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-options">
                        <div class="remember-me">
                            <input type="checkbox" id="terms" name="terms" required>
                            <label for="terms">I confirm that all information provided is accurate and I am the rightful owner of the coin</label>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn primary-btn">Submit Coin for Review</button>
                </form>
            </div>
            
            <!-- Orders Section -->
            <div id="orders" class="dashboard-section">
                <h2>Orders</h2>
                <p>No orders found for your coins yet.</p>
            </div>
            
            <!-- Reviews Section -->
            <div id="reviews" class="dashboard-section">
                <h2>Reviews</h2>
                <p>No reviews found for your coins yet.</p>
            </div>
            
            <!-- Settings Section -->
            <div id="settings" class="dashboard-section">
                <h2>Account Settings</h2>
                
                <form id="accountSettingsForm" class="auth-form">
                    <div class="form-group">
                        <label for="settingsShopname">Shop/Business Name</label>
                        <input type="text" id="settingsShopname" name="shopname">
                    </div>
                    <div class="form-group">
                        <label for="settingsFullname">Full Name</label>
                        <input type="text" id="settingsFullname" name="fullname">
                    </div>
                    <div class="form-group">
                        <label for="settingsEmail">Email</label>
                        <input type="email" id="settingsEmail" name="email">
                    </div>
                    <div class="form-group">
                        <label for="settingsPhone">Phone Number</label>
                        <input type="tel" id="settingsPhone" name="phone">
                    </div>
                    <div class="form-group">
                        <label for="settingsAddress">Address</label>
                        <textarea id="settingsAddress" name="address" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="settingsDescription">Shop/Business Description</label>
                        <textarea id="settingsDescription" name="description" rows="3" placeholder="Tell us about your business or expertise with coins"></textarea>
                    </div>
                    <h3 class="mt-4">Change Password</h3>
                    <div class="form-group">
                        <label for="currentPassword">Current Password</label>
                        <input type="password" id="currentPassword" name="currentPassword">
                    </div>
                    <div class="form-group">
                        <label for="newPassword">New Password</label>
                        <input type="password" id="newPassword" name="newPassword">
                    </div>
                    <div class="form-group">
                        <label for="confirmNewPassword">Confirm New Password</label>
                        <input type="password" id="confirmNewPassword" name="confirmNewPassword">
                    </div>
                    
                    <button type="submit" class="btn primary-btn">Save Changes</button>
                </form>
            </div>
        </div>
    </div>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <div class="footer-logo">
                        <h2>Coin<span>X</span></h2>
                    </div>
                    <p>Specializing in rare and historic coins from around the world. Authenticated and certified for collectors and investors.</p>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-pinterest"></i></a>
                    </div>
                </div>
                <div class="footer-column">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="index.php">Home</a></li>
                        <li><a href="collections.php">Collections</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="admin-login.php">Admin</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Customer Service</h3>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Shipping & Returns</a></li>
                        <li><a href="#">Authentication Process</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Contact Us</h3>
                    <ul class="contact-info">
                        <li><i class="fas fa-map-marker-alt"></i> Nashik Road, Nashik, Maharashtra, India</li>
                        <li><i class="fas fa-phone"></i> +91 98230 00000</li>
                        <li><i class="fas fa-envelope"></i> rarecointreasures@gmail.com</li>
                        <li><i class="fas fa-clock"></i> Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2023 CoinX. All Rights Reserved.</p>
                <div class="payment-methods">
                    <i class="fab fa-cc-visa"></i>
                    <i class="fab fa-cc-mastercard"></i>
                    <i class="fab fa-cc-amex"></i>
                    <i class="fab fa-cc-paypal"></i>
                </div>
            </div>
        </div>
    </footer>

    <script src="js/script.js"></script>
    <script src="js/seller-dashboard.js"></script>
</body>
</html> 