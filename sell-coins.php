<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sell Your Coins | CoinX</title>
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
                <a href="user-login.php" class="user-icon" title="Login"><i class="fas fa-user"></i></a>
                <a href="admin-login.php" class="admin-icon" title="Admin Login"><i class="fas fa-lock"></i></a>
            </div>
            <div class="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </header>

    <section class="page-header">
        <div class="container">
            <h1>Sell Your Coins</h1>
            <div class="breadcrumb">
                <a href="index.php">Home</a> / Sell Your Coins
            </div>
        </div>
    </section>

    <section class="auth-container">
        <div class="auth-box">
            <div class="auth-header">
                <h2>Submit Your Coin Details</h2>
                <p>We're interested in purchasing rare and valuable coins. Fill out this form to get started.</p>
                <div class="seller-cta">
                    <p>Are you a coin dealer or have multiple coins to sell? <a href="seller-register.php">Register as a seller</a> or <a href="seller-login.php">Login</a> to your seller account.</p>
                </div>
            </div>
            <form id="sellCoinForm" class="auth-form" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="fullname">Full Name *</label>
                    <input type="text" id="fullname" name="fullname" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="coinName">Coin Name/Type *</label>
                    <input type="text" id="coinName" name="coinName" placeholder="e.g., 1947 Independence Rupee" required>
                </div>
                
                <div class="form-group">
                    <label for="period">Period/Year</label>
                    <input type="text" id="period" name="period" placeholder="e.g., 1947, Mughal Era">
                </div>
                
                <div class="form-group">
                    <label for="material">Material</label>
                    <input type="text" id="material" name="material" placeholder="e.g., Gold, Silver, Copper">
                </div>
                
                <div class="form-group">
                    <label for="condition">Condition *</label>
                    <select id="condition" name="condition" required>
                        <option value="">Select Condition</option>
                        <option value="Mint">Mint - Perfect condition</option>
                        <option value="Excellent">Excellent - Minor wear</option>
                        <option value="Good">Good - Some wear visible</option>
                        <option value="Fair">Fair - Significant wear</option>
                        <option value="Poor">Poor - Heavy wear/damage</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="description">Description *</label>
                    <textarea id="description" name="description" rows="4" placeholder="Please provide details about your coin, including any special markings or historical significance" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="askingPrice">Asking Price (in ₹)</label>
                    <input type="number" id="askingPrice" name="askingPrice" placeholder="Your expected price">
                </div>
                
                <div class="form-group">
                    <label for="coinImages">Coin Images (Front & Back) *</label>
                    <input type="file" id="coinImages" name="coinImages[]" accept="image/*" multiple required>
                    <p class="form-hint">Please upload clear images of both sides of your coin (Max 3 images, 5MB each)</p>
                </div>
                
                <div class="form-group">
                    <label for="certificateImage">Authentication Certificate (if available)</label>
                    <input type="file" id="certificateImage" name="certificateImage" accept="image/*,application/pdf">
                </div>
                
                <div class="form-options">
                    <div class="remember-me">
                        <input type="checkbox" id="terms" name="terms" required>
                        <label for="terms">I confirm that all information provided is accurate and I am the rightful owner of the coin *</label>
                    </div>
                </div>
                
                <button type="submit" class="btn primary-btn">Submit Coin for Review</button>
                
                <div class="auth-footer">
                    <p>Our team will review your submission and contact you within 3 business days</p>
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
                <p>&copy; 2023 RareCoin Treasures. All Rights Reserved.</p>
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
    <script src="js/sell-coins.js"></script>
</body>
</html> 