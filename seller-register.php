<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seller Registration | CoinX</title>
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
            <h1>Seller Registration</h1>
            <div class="breadcrumb">
                <a href="index.php">Home</a> / Seller Registration
            </div>
        </div>
    </section>

    <section class="auth-container">
        <div class="auth-box register">
            <div class="auth-header">
                <h2>Create Seller Account</h2>
                <p>Join our marketplace to sell your rare and valuable coins</p>
            </div>
            <form id="sellerRegisterForm" class="auth-form" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                <div class="form-group">
                    <label for="fullname">Full Name *</label>
                    <input type="text" id="fullname" name="fullname" required>
                </div>
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password *</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-options">
                    <div class="remember-me">
                        <input type="checkbox" id="terms" name="terms" required>
                        <label for="terms">I agree to the <a href="#">Terms & Conditions</a></label>
                    </div>
                </div>
                <div class="success-message" id="registrationSuccess" style="display: none; color: green; padding: 10px; margin-bottom: 15px; text-align: center; background-color: #e8f5e9; border-radius: 4px;">
                    <i class="fas fa-check-circle"></i> Registration successful! You can now login to your seller account.
                </div>
                <button type="submit" class="btn primary-btn">Register as Seller</button>
                <div class="auth-footer">
                    <p>Already have a seller account? <a href="seller-login.php">Login</a></p>
                </div>
            </form>
        </div>
    </section>
    <?php 
        include 'connect.php';
        
        if ($_SERVER["REQUEST_METHOD"] == "POST") 
        {
            $fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
            $email = mysqli_real_escape_string($conn, $_POST['email']);
            $password = password_hash($_POST['password'], PASSWORD_DEFAULT); 
            
            $check_email = "SELECT * FROM seller WHERE email = '$email'";
            $result = $conn->query($check_email);
            
            if ($result->num_rows > 0) 
            {
                echo "<script>
                    alert('Email already registered. Please use a different email.');
                    window.location.href = 'seller-register.php';
                </script>";
                exit();
            }
           
            $sql = "INSERT INTO seller (fullname, email, password) VALUES ('$fullname', '$email', '$password')";
            
            if ($conn->query($sql) === TRUE) 
            {
                echo "<script>
                    document.getElementById('registrationSuccess').style.display = 'block';
                    setTimeout(function() 
                    {
                        window.location.href = 'seller-login.php';
                    }, 2000);
                </script>";
            } 
            else {
                echo "<script>
                    alert('Registration failed. Please try again.');
                </script>";
            }
        }
    ?>

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