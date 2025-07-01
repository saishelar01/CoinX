<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | CoinX</title>
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
                <div class="menu-item active">
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
                    <input type="text" placeholder="Search...">
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
            
            <!-- Dashboard Stats -->
            <div class="dashboard-stats">
                <div class="stat-card primary">
                    <div class="icon">
                        <i class="fas fa-coins"></i>
                    </div>
                    <div class="stat-info">
                        <h3>6</h3>
                        <p>Total Coins</p>
                    </div>
                </div>
                
                <div class="stat-card success">
                    <div class="icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="stat-info">
                        <h3></h3>
                        <p>Total Orders</p>
                    </div>
                </div>
                
                <div class="stat-card warning">
                    <div class="icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-info">
                        <h3>5</h3>
                        <p>Total Users</p>
                    </div>
                </div>
                
                <div class="stat-card info" onclick="location.href='admin-sales-report.php'" style="cursor: pointer;">
                    <div class="icon">
                        <i class="fas fa-rupee-sign"></i>
                    </div>
                    <div class="stat-info">
                        <h3>₹17000</h3>
                        <p>Total Revenue</p>
                    </div>
                </div>
            </div>
            
            <!-- Recent Activity -->
            <div class="recent-activity">
                <div class="section-header">
                    <h2>Recent Activity</h2>
                    <a href="#" class="view-all">View All</a>
                </div>
                
                <ul class="activity-list">
                    <li class="activity-item">
                        <div class="activity-icon order">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div class="activity-content">
                            <h4>New Order Placed</h4>
                            <p>Order #ORD-2023-1234 for Gupta Dynasty Gold Dinar</p>
                            <span class="activity-time">2 hours ago</span>
                        </div>
                    </li>
                    
                    <li class="activity-item">
                        <div class="activity-icon user">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="activity-content">
                            <h4>New User Registered</h4>
                            <p>Rahul Sharma has created an account</p>
                            <span class="activity-time">5 hours ago</span>
                        </div>
                    </li>
                    
                    <li class="activity-item">
                        <div class="activity-icon coin">
                            <i class="fas fa-coins"></i>
                        </div>
                        <div class="activity-content">
                            <h4>New Coin Added</h4>
                            <p>British Gold Sovereign has been added to inventory</p>
                            <span class="activity-time">1 day ago</span>
                        </div>
                    </li>
                    
                    <li class="activity-item">
                        <div class="activity-icon order">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div class="activity-content">
                            <h4>Order Status Updated</h4>
                            <p>Order #ORD-2023-1230 has been shipped</p>
                            <span class="activity-time">1 day ago</span>
                        </div>
                    </li>
                </ul>
            </div>
            
            <!-- Recent Orders -->
            <div class="recent-orders">
                <div class="section-header">
                    <h2>Recent Orders</h2>
                    <a href="admin-orders.php" class="view-all">View All</a>
                </div>
                
                <table class="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Coin</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#ORD-2023-1234</td>
                            <td>Rahul Sharma</td>
                            <td>Gupta Dynasty Gold Dinar</td>
                            <td>₹10,000</td>
                            <td>12 Mar 2023</td>
                            <td><span class="status pending">Pending</span></td>
                            <td>
                                <button class="action-btn" title="View"><i class="fas fa-eye"></i></button>
                                <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>#ORD-2023-1233</td>
                            <td>Priya Patel</td>
                            <td>Akbar Silver Rupee</td>
                            <td>₹8,500</td>
                            <td>11 Mar 2023</td>
                            <td><span class="status processing">Processing</span></td>
                            <td>
                                <button class="action-btn" title="View"><i class="fas fa-eye"></i></button>
                                <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>#ORD-2023-1232</td>
                            <td>Amit Singh</td>
                            <td>1947 Independence Rupee</td>
                            <td>₹12,000</td>
                            <td>10 Mar 2023</td>
                            <td><span class="status shipped">Shipped</span></td>
                            <td>
                                <button class="action-btn" title="View"><i class="fas fa-eye"></i></button>
                                <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>#ORD-2023-1231</td>
                            <td>Neha Gupta</td>
                            <td>Jahangir's Eid Mohur</td>
                            <td>₹15,000</td>
                            <td>09 Mar 2023</td>
                            <td><span class="status delivered">Delivered</span></td>
                            <td>
                                <button class="action-btn" title="View"><i class="fas fa-eye"></i></button>
                                <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>#ORD-2023-1230</td>
                            <td>Vikram Desai</td>
                            <td>British Gold Sovereign</td>
                            <td>₹20,000</td>
                            <td>08 Mar 2023</td>
                            <td><span class="status cancelled">Cancelled</span></td>
                            <td>
                                <button class="action-btn" title="View"><i class="fas fa-eye"></i></button>
                                <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="js/admin-common.js"></script>
    <script src="js/admin-dashboard.js"></script>
</body>
</html> 