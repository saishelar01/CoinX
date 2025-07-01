<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RareCoin Treasures | Exclusive Numismatic Collection</title>
    <link rel="stylesheet" href="css/styles.css">
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
                    <li><a href="index.php" class="active">Home</a></li>
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

    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>Discover Rare Numismatic Treasures</h1>
                <p>Explore our exclusive collection of rare and historic coins from around the world</p>
            </div>
        </div>
    </section>

    
    <section id="featured" class="featured-products">
        <div class="container">
            <h2 class="section-title">Featured Rare Coins</h2>
            <?php 
        include 'connect.php';
        
        // Display table structure
        $sql = "DESCRIBE coins";
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
            echo '<div style="display:none;">';
            echo '<h3>Table Structure:</h3>';
            echo '<pre>';
            while($row = $result->fetch_assoc()) {
                print_r($row);
            }
            echo '</pre>';
            echo '</div>';
        }
        
        // Fetch coins from database
        $sql = "SELECT * FROM coins";
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
            echo '<div class="product-grid">';
            while($row = $result->fetch_assoc()) {
                echo '<div class="product-card" 
                    data-coin-id="' . (isset($row['id']) ? $row['id'] : '0') . '"
                    data-coin-image="' . (isset($row['image_url']) ? $row['image_url'] : 'image/default-coin.jpg') . '"
                    data-coin-name="' . (isset($row['name']) ? htmlspecialchars($row['name']) : 'Unnamed Coin') . '"
                    data-coin-rating-count="' . (isset($row['rating_count']) ? $row['rating_count'] : '0') . '"
                    data-coin-price="₹' . (isset($row['price']) ? $row['price'] : '0') . '"
                    data-coin-description="' . (isset($row['description']) ? htmlspecialchars($row['description']) : 'No description available.') . '"
                    data-coin-period="' . (isset($row['period']) ? htmlspecialchars($row['period']) : 'Not specified') . '"
                    data-coin-material="' . (isset($row['material']) ? htmlspecialchars($row['material']) : 'Not specified') . '"
                    data-coin-weight="' . (isset($row['weight']) ? htmlspecialchars($row['weight']) : 'Not specified') . '"
                    data-coin-diameter="' . (isset($row['diameter']) ? htmlspecialchars($row['diameter']) : 'Not specified') . '"
                    data-coin-condition="' . (isset($row['condition']) ? htmlspecialchars($row['condition']) : 'Not specified') . '">';
                echo '<div class="product-image">';
                // Use image_url column instead of image
                $image = isset($row['image_url']) ? $row['image_url'] : 'image/default-coin.jpg';
                echo '<img src="' . $image . '" alt="' . (isset($row['name']) ? $row['name'] : 'Coin') . '">';
                echo '</div>';
                echo '<div class="product-info">';
                echo '<h3>' . (isset($row['name']) ? $row['name'] : 'Unnamed Coin') . '</h3>';
                echo '<div class="product-rating">';
                echo '<i class="fas fa-star"></i>';
                echo '<i class="fas fa-star"></i>';
                echo '<i class="fas fa-star"></i>';
                echo '<i class="fas fa-star"></i>';
                echo '<i class="fas fa-star-half-alt"></i>';
                echo '<span>(' . (isset($row['rating_count']) ? $row['rating_count'] : '0') . ')</span>';
                echo '</div>';
                echo '<div class="product-price">';
                echo '<span class="price">₹' . (isset($row['price']) ? $row['price'] : '0') . '</span>';
                echo '</div>';
                echo '<button class="btn primary-btn add-to-cart" data-id="' . (isset($row['id']) ? $row['id'] : '0') . '">Add to Cart</button>';
                echo '</div>';
                echo '</div>';
            }
            echo '</div>';
        } else {
            echo '<p>No coins found in the database.</p>';
        }
    ?>
            <div class="view-more">
                <a href="collections.php" class="btn primary-btn">View All Coins</a>
            </div>
        </div>
    </section>

    <section class="special-offer">
        <div class="container">
            <div class="offer-content">
                <h2>Special Offer: British Gold Sovereign</h2>
                <p>One of the most valuable coins in the world, featuring the iconic St. George and the Dragon design.</p>
                <div class="countdown">
                    <div class="countdown-item">
                        <span id="days">05</span>
                        <span>Days</span>
                    </div>
                    <div class="countdown-item">
                        <span id="hours">23</span>
                        <span>Hours</span>
                    </div>
                    <div class="countdown-item">
                        <span id="minutes">59</span>
                        <span>Minutes</span>
                    </div>
                    <div class="countdown-item">
                        <span id="seconds">42</span>
                        <span>Seconds</span>
                    </div>
                </div>
                <a href="#" class="btn primary-btn">Buy Now</a>
            </div>
        </div>
    </section>

    <section class="testimonials">
        <div class="container">
            <h2 class="section-title">What Our Collectors Say</h2>
            <div class="testimonial-slider">
                <div class="testimonial-slide active">
                    <div class="testimonial-content">
                        <div class="testimonial-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p>"RareCoin Treasures has helped me find some of the most elusive coins for my collection. Their authentication process is impeccable, and their customer service is outstanding."</p>
                        <div class="testimonial-author">
                            <img src="image/img1.jpg" alt="James Wilson">
                            <div>
                                <h4>Shraddha</h4>
                                <p>Coin Collector for 30 years</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="testimonial-slide">
                    <div class="testimonial-content">
                        <div class="testimonial-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <p>"I've been collecting coins for over 20 years, and RareCoin Treasures is by far the best place to find authentic rare coins. Their expertise and selection are unmatched."</p>
                        <div class="testimonial-author">
                            <img src="image/img2.jpg" alt="Sarah Johnson">
                            <div>
                                <h4>Rudra</h4>
                                <p>Coin Collector</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="testimonial-controls">
                <button class="testimonial-btn prev"><i class="fas fa-chevron-left"></i></button>
                <div class="testimonial-dots">
                    <span class="dot active"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <button class="testimonial-btn next"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    </section>

    <!-- Coin Details Modal -->
    <div class="coin-modal" id="coinModal">
        <div class="coin-modal-content">
            <span class="close-modal">&times;</span>
            <div class="coin-modal-body">
                <div class="coin-modal-image">
                    <img id="modalCoinImage" src="" alt="Coin Image">
                </div>
                <div class="coin-modal-details">
                    <h2 id="modalCoinName"></h2>
                    <div class="coin-modal-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <span id="modalRatingCount"></span>
                    </div>
                    <div class="coin-modal-price">
                        <span id="modalPrice" class="price"></span>
                    </div>
                    <div class="coin-modal-description">
                        <h3>Description</h3>
                        <p id="modalDescription"></p>
                    </div>
                    <div class="coin-modal-info">
                        <h3>Coin Information</h3>
                        <ul>
                            <li><strong>Period:</strong> <span id="modalPeriod"></span></li>
                            <li><strong>Material:</strong> <span id="modalMaterial"></span></li>
                            <li><strong>Weight:</strong> <span id="modalWeight"></span></li>
                            <li><strong>Diameter:</strong> <span id="modalDiameter"></span></li>
                            <li><strong>Condition:</strong> <span id="modalCondition"></span></li>
                        </ul>
                    </div>
                    <div class="coin-modal-quantity">
                        <h3>Quantity</h3>
                        <div class="quantity-selector">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" value="1" min="1" max="10" id="coinQuantity">
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>
                    <div class="coin-modal-actions">
                        <button class="btn secondary-btn modal-add-to-cart">Add to Cart</button>
                        <button class="btn primary-btn modal-buy-now">Buy Now</button>
                    </div>
                </div>
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
    <script src="js/fetchCoins.js"></script>
</body>
</html> 