<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seller Login | CoinX</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/auth.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
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
                    <li><a href="collections.php">Collections</a></li>
                    <li><a href="seller-login.php">Seller Portal</a></li>
                </ul>
            </nav>
            <div class="header-icons">
                <a href="#" class="search-icon"><i class="fas fa-search"></i></a>
                <a href="#" class="cart-icon"><i class="fas fa-shopping-cart"></i><span class="cart-count">0</span></a>
                <a href="user-login.php" class="user-icon"><i class="fas fa-user"></i></a>
                <a href="admin-login.php" class="admin-icon" title="Admin Login"><i class="fas fa-lock"></i></a>
            </div>
            <div class="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </header>

    <section class="page-header">
        <div class="container">
            <h1>Seller Login</h1>
            <div class="breadcrumb">
                <a href="index.php">Home</a> / Seller Login
            </div>
        </div>
    </section>

    <section class="auth-container">
        <div class="auth-box">
            <div class="auth-header">
                <h2>Seller Login</h2>
                <p>Access your seller dashboard</p>
            </div>
            <?php 
                include 'connect.php';
                session_start();
                
                if ($_SERVER["REQUEST_METHOD"] == "POST") {
                    $email = mysqli_real_escape_string($conn, $_POST['email']);
                    $password = $_POST['password'];
                    
                    $sql = "SELECT * FROM seller WHERE email = '$email'";
                    $result = $conn->query($sql);
                    
                    if ($result->num_rows == 1) {
                        $seller = $result->fetch_assoc();
                        if (password_verify($password, $seller['password'])) {
                            $_SESSION['seller_id'] = $seller['id'];
                            $_SESSION['seller_name'] = $seller['fullname'];
                            $_SESSION['seller_email'] = $seller['email'];
                            
                            echo "<script>
                                window.location.href = 'seller-dashboard.php';
                            </script>";
                            exit();
                        } else {
                            echo "<script>
                                alert('Invalid password. Please try again.');
                            </script>";
                        }
                    } else {
                        echo "<script>
                            alert('Email not found. Please register first.');
                        </script>";
                    }
                }
            ?>
            <form id="sellerLoginForm" class="auth-form" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn primary-btn">Login</button>
                <div class="auth-footer">
                    <p>Don't have a seller account? <a href="seller-register.php">Register</a></p>
                </div>
            </form>
        </div>
    </section>

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
    <script src="js/seller.js"></script>
</body>
</html> 