<!DOCTYPE html>
<?php
include 'connect.php';

// Get coin ID from URL parameter
$coin_id = isset($_GET['coin_id']) ? (int)$_GET['coin_id'] : 0;

// Initialize variables
$subtotal = 0;
$tax = 0;
$total = 0;
$coin_name = '';
$coin_price = 0;

// Fetch coin details if coin_id is provided
if ($coin_id > 0) {
    $sql = "SELECT name, price FROM coins WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $coin_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        $coin_name = $row['name'];
        $coin_price = $row['price'];
        $subtotal = $coin_price;
        $tax = $subtotal * 0.18; // 18% tax
        $total = $subtotal + $tax;
    }
    
    $stmt->close();
}
$conn->close();
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout | CoinX</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/checkout.css">
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
            <h1>Checkout</h1>
            <div class="breadcrumb">
                <a href="index.php">Home</a> / <span>Checkout</span>
            </div>
        </div>
    </section>

    <section class="checkout-section">
        <div class="container">
            <div class="checkout-container">
                <div class="checkout-details">
                    <div class="order-summary">
                        <h2>Order Summary</h2>
                        <div class="order-item">
                            <div class="item-details">
                                <h3><?php echo htmlspecialchars($coin_name); ?></h3>
                                <p class="item-price">₹<?php echo number_format($coin_price, 2); ?></p>
                            </div>
                        </div>
                        <div class="order-total">
                            <div class="subtotal">
                                <span>Subtotal:</span>
                                <span id="subtotal">₹<?php echo number_format($subtotal, 2); ?></span>
                            </div>
                            <div class="shipping">
                                <span>Shipping:</span>
                                <span>Free</span>
                            </div>
                            <div class="tax">
                                <span>Tax (18%):</span>
                                <span id="tax">₹<?php echo number_format($tax, 2); ?></span>
                            </div>
                            <div class="total">
                                <span>Total:</span>
                                <span id="total">₹<?php echo number_format($total/100); ?></span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="shipping-info">
                        <h2>Shipping Information</h2>
                        <form id="shippingForm" onsubmit="event.preventDefault();">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="fullname">Full Name</label>
                                    <input type="text" id="fullname" name="fullname" pattern="[A-Za-z\s]+" required>
                                    <span class="validation-message">Please enter a valid name (letters and spaces only)</span>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" id="email" name="email" required>
                                    <span class="validation-message">Please enter a valid email address</span>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="phone">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" maxlength="10" inputmode="numeric" required>
                                    <span class="validation-message">Please enter a valid 10-digit phone number</span>
                                </div>
                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <input type="text" id="address" name="address" required>
                                    <span class="validation-message">Please enter your address</span>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="city">City</label>
                                    <input type="text" id="city" name="city" pattern="[A-Za-z\s\-\.]+" required>
                                    <span class="validation-message">Please enter a valid city name</span>
                                </div>
                                <div class="form-group">
                                    <label for="state">State</label>
                                    <input type="text" id="state" name="state" pattern="[A-Za-z\s\-\.]+" required>
                                    <span class="validation-message">Please enter a valid state name</span>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="pincode">Pincode</label>
                                    <input type="text" id="pincode" name="pincode" pattern="[0-9]{6}" maxlength="6" inputmode="numeric" required>
                                    <span class="validation-message">Please enter a valid 6-digit pincode (numbers only)</span>
                                </div>
                                <div class="form-group">
                                    <label for="country">Country</label>
                                    <select id="country" name="country" required>
                                        <option value="India">India</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <?php
                
                ?>
                <div class="payment-section">
                    <h2>Payment Method</h2>
                    <div class="payment-options">
                        <div class="payment-option">
                            <input type="radio" id="cash-on-delivery" name="payment-method" checked>
                            <label for="cash-on-delivery">Cash On Delivery</label>
                        </div>
                        <div class="payment-option">
                            <input type="radio" id="upi" name="payment-method">
                            <label for="upi">UPI</label>
                        </div>
                    </div>
                    
                    <div id="upi-payment-details" style="display: none;">
                        <div class="qr-code-container">
                            <img src="image/QR.jpg" alt="UPI QR Code" class="upi-qr-code">
                            <p class="payment-instruction">Scan this QR code with any UPI app to pay</p>
                            <div class="upi-apps">
                                <span><i class="fab fa-google-pay"></i> Google Pay</span>
                                <span><i class="fab fa-paypal"></i> PhonePe</span>
                                <span><i class="fas fa-money-bill-wave"></i> Paytm</span>
                            </div>
                            <p class="payment-note">Note: UPI payments will be kept in pending state until verification. We will confirm your payment within 24 hours.</p>
                        </div>
                    </div>
                    
                    <button id="place-order" class="btn primary-btn">Place Order</button>
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
    <script src="js/checkout.js"></script>
</body>
</html> 