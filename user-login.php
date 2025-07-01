<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Login | CoinX</title>
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
                <a href="user-login.php" class="user-icon active"><i class="fas fa-user"></i></a>
                <a href="admin-login.php" class="admin-icon" title="Admin Login"><i class="fas fa-lock"></i></a>
            </div>
            <div class="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </header>

    <section class="auth-container">
        <div class="auth-box">
            <div class="auth-header">
                <h2>User Login</h2>
                <p>Welcome back! Please login to your account</p>
            </div>
            <form id="loginForm" class="auth-form" action="user-login.php" method="POST">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-options">
                    <div class="remember-me">
                        <input type="checkbox" id="remember" name="remember">
                        <label for="remember">Remember me</label>
                    </div>
                </div>
                <div id="loginMessage" class="message" style="display: none;"></div>
                <button type="submit" name="submit" class="btn primary-btn">Login</button>
                <div class="auth-footer">
                    <p>Don't have an account? <a href="user-register.php">Register</a></p>
                    <p>Are you a seller? <a href="seller-login.php">Seller Login</a></p>
                </div>
                <?php
                    include 'connect.php';
                    if(isset($_POST['submit']))
                    {
                        $email=$_POST['email'];
                        $password=$_POST['password'];
                
                        $sql="SELECT * FROM users WHERE email='$email' and password='$password'";
                        $result=$conn->query($sql);
                        if($result->num_rows>0){
                            session_start();
                            $row=$result->fetch_assoc();
                            $_SESSION['email']=$row['email'];
                            
                            // Set login status in localStorage
                            echo "<script>
                                localStorage.setItem('isLoggedIn', 'true');
                                localStorage.setItem('currentUser', JSON.stringify({
                                    email: '" . $row['email'] . "',
                                    name: '" . $row['name'] . "'
                                }));
                                
                                // Show success message
                                const messageDiv = document.getElementById('loginMessage');
                                messageDiv.style.display = 'block';
                                messageDiv.style.color = 'green';
                                messageDiv.textContent = 'Login successful! Redirecting...';
                                
                                // Check for pending purchase and redirect
                                setTimeout(() => {
                                    if(sessionStorage.getItem('pendingPurchase')) {
                                        sessionStorage.removeItem('pendingPurchase');
                                        window.location.href = 'checkout.php';
                                    } else {
                                        window.location.href = 'index.php';
                                    }
                                }, 1500);
                            </script>";
                        }
                        else{
                            echo "<script>
                                const messageDiv = document.getElementById('loginMessage');
                                messageDiv.style.display = 'block';
                                messageDiv.style.color = 'red';
                                messageDiv.textContent = 'Invalid email or password. Please try again.';
                            </script>";
                        }
                    }
                ?>
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
    <script src="js/auth.js"></script>
</body>
</html> 