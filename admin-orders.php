<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Orders | CoinX Admin</title>
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
                <div class="menu-item active" onclick="location.href='admin-orders.php'">
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
                    <input type="text" placeholder="Search orders...">
                </div>
            </div>
            
            <!-- Orders Header -->
            <div class="content-header">
                <h1>Manage Orders</h1>
                <div class="header-actions">
                </div>
            </div>
            
            <!-- Orders Stats -->
            <div class="dashboard-stats">
                <div class="stat-card primary">
                    <div class="icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="stat-info">
                        <h3>128</h3>
                        <p>Total Orders</p>
                    </div>
                </div>
                
                <div class="stat-card warning">
                    <div class="icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="stat-info">
                        <h3>24</h3>
                        <p>Pending</p>
                    </div>
                </div>
                
                <div class="stat-card info">
                    <div class="icon">
                        <i class="fas fa-spinner"></i>
                    </div>
                    <div class="stat-info">
                        <h3>36</h3>
                        <p>Processing</p>
                    </div>
                </div>
                
                <div class="stat-card success">
                    <div class="icon">
                        <i class="fas fa-truck"></i>
                    </div>
                    <div class="stat-info">
                        <h3>68</h3>
                        <p>Delivered</p>
                    </div>
                </div>
            </div>
            
            <!-- Orders Table -->
            <div class="orders-section">
                <div class="table-container">
                    <table class="orders-table">
                        <?php
                            include 'connect.php';
                            $sql = "SELECT * FROM orders";
                            $result = mysqli_query($conn, $sql);
                            while($row = mysqli_fetch_assoc($result)):
                        ?>
                        <?php endwhile; ?>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script src="js/admin-common.js"></script>
    <script>
        // Status select change handler
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', function() {
                // Remove all status classes
                this.classList.remove('pending', 'processing', 'shipped', 'delivered', 'cancelled');
                // Add the selected status class
                this.classList.add(this.value);
                
                // Here you would typically make an API call to update the order status
                console.log(`Order status updated to ${this.value}`);
            });
        });
        
        // Select all checkbox
        const selectAllCheckbox = document.getElementById('selectAll');
        const orderCheckboxes = document.querySelectorAll('.order-select');
        
        selectAllCheckbox.addEventListener('change', function() {
            orderCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
        
        // Filter dropdown
        const filterBtn = document.querySelector('.filter-btn');
        const filterMenu = document.querySelector('.filter-menu');
        
        filterBtn.addEventListener('click', function() {
            filterMenu.classList.toggle('show');
        });
        
        // Close filter menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.filter-dropdown')) {
                filterMenu.classList.remove('show');
            }
        });
        
        // User dropdown
        const userDropdown = document.getElementById('userDropdown');
        const userDropdownMenu = document.getElementById('userDropdownMenu');
        
        userDropdown.addEventListener('click', function() {
            userDropdownMenu.classList.toggle('show');
        });
        
        // Close user dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.dropdown')) {
                userDropdownMenu.classList.remove('show');
            }
        });

        // Delete button functionality
        document.querySelectorAll('.action-btn[title="Delete"]').forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const orderId = row.querySelector('td:nth-child(2)').textContent;
                
                if (confirm(`Are you sure you want to delete order ${orderId}?`)) {
                    // Here you would typically make an API call to delete the order
                    console.log(`Deleting order ${orderId}`);
                    
                    // Remove the row from the table with animation
                    row.style.backgroundColor = '#ffcccc';
                    setTimeout(() => {
                        row.style.opacity = '0';
                        row.style.transition = 'opacity 0.5s';
                        setTimeout(() => {
                            row.remove();
                        }, 500);
                    }, 100);
                }
            });
        });
    </script>
</body>
</html> 