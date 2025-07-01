<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation | CoinX</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/checkout.css">
    <link rel="stylesheet" href="css/order-confirmation.css">
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
                </ul>
            </nav>
            <div class="header-icons">
                <a href="user-login.php" class="user-icon" title="Login"><i class="fas fa-user"></i></a>
                <a href="admin-login.php" class="admin-icon" title="Admin Login"><i class="fas fa-lock"></i></a>
            </div>
        </div>
    </header>

    <section class="page-header">
        <div class="container">
            <h1>Order Confirmation</h1>
            <div class="breadcrumb">
                <a href="index.php">Home</a> / <span>Order Confirmation</span>
            </div>
        </div>
    </section>

    <section class="confirmation-section">
        <div class="container">
            <div class="confirmation-container">
                <div class="confirmation-header">
                    <div class="confirmation-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Thank You for Your Order!</h2>
                    <p>Your order has been placed successfully.</p>
                </div>

                <div class="order-details">
                    <h3>Order Details</h3>
                    <div class="order-info">
                        <div class="order-info-item">
                            <span>Order Number:</span>
                            <span id="orderNumber"></span>
                        </div>
                        <div class="order-info-item">
                            <span>Order Date:</span>
                            <span id="orderDate"></span>
                        </div>
                        <div class="order-info-item">
                            <span>Payment Method:</span>
                            <span id="paymentMethod"></span>
                        </div>
                        <div class="order-info-item">
                            <span>Order Total:</span>
                            <span id="orderTotal"></span>
                        </div>
                    </div>

                    <h3>Items Ordered</h3>
                    <div class="order-items" id="orderItems">
                        <!-- Order items will be added here by JavaScript -->
                    </div>
                    
                    <div class="order-summary">
                        <div class="summary-item">
                            <span>Subtotal:</span>
                            <span id="subtotal"></span>
                        </div>
                        <div class="summary-item">
                            <span>Tax (18%):</span>
                            <span id="tax"></span>
                        </div>
                        <div class="summary-item total">
                            <span>Total:</span>
                            <span id="total"></span>
                        </div>
                    </div>
                </div>

                <div class="shipping-details">
                    <h3>Shipping Information</h3>
                    <div class="shipping-address">
                        <p id="shippingName"></p>
                        <p id="shippingAddress"></p>
                        <p id="shippingCity"></p>
                        <p id="shippingContact"></p>
                    </div>
                </div>

                <div class="review-section">
                    <div class="container">
                        <div class="review-container">
                            <h3>Review Your Purchase</h3>
                            <p>Share your experience with your new items. Your feedback helps other collectors!</p>
                            
                            <div class="rating-container">
                                <h4>Rate your overall experience:</h4>
                                <div class="star-rating">
                                    <i class="far fa-star" data-rating="1"></i>
                                    <i class="far fa-star" data-rating="2"></i>
                                    <i class="far fa-star" data-rating="3"></i>
                                    <i class="far fa-star" data-rating="4"></i>
                                    <i class="far fa-star" data-rating="5"></i>
                                </div>
                            </div>
                            
                            <div class="review-form">
                                <div class="form-group">
                                    <label for="review-text">Your Review</label>
                                    <textarea id="review-text" rows="4" placeholder="Tell us about your purchase"></textarea>
                                </div>
                                <button type="button" class="btn primary-btn" id="submitReviewBtn">Submit Review</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="next-steps">
                    <p>A confirmation email has been sent to your email address. You can track your order in your account.</p>
                    <div class="action-buttons">
                        <a href="index.php" class="btn secondary-btn">Continue Shopping</a>
                    </div>
                </div>
            </div>
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
    <script src="js/order-confirmation.js"></script>
</body>
</html> 