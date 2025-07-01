document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });
    }

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
    }

    // Auto slide testimonials
    setInterval(function() {
        if (testimonialSlides.length > 0) {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }
    }, 5000);

    // Countdown Timer
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Set the countdown date (7 days from now)
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 7);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysEl) daysEl.innerText = '00';
            if (hoursEl) hoursEl.innerText = '00';
            if (minutesEl) minutesEl.innerText = '00';
            if (secondsEl) secondsEl.innerText = '00';
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = parseInt(cartCount ? cartCount.textContent : '0');

    // Cart Functionality
    const cartIcon = document.querySelector('.cart-icon');
    let cartItems = [];
    
    // Load cart items from localStorage if available
    if (localStorage.getItem('cartItems')) {
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
        updateCartCount();
    }
    
    // Function to update cart count
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
        }
    }
    
    // Add event listener to cart icon
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            showCartModal();
        });
    }
    
    // Function to show cart modal
    function showCartModal() {
        // Create cart modal if it doesn't exist
        let cartModal = document.getElementById('cartModal');
        
        if (!cartModal) {
            cartModal = document.createElement('div');
            cartModal.id = 'cartModal';
            cartModal.className = 'coin-modal';
            
            const cartModalContent = document.createElement('div');
            cartModalContent.className = 'coin-modal-content cart-modal-content';
            
            cartModalContent.innerHTML = `
                <span class="close-modal">&times;</span>
                <div class="cart-modal-body">
                    <h2>Your Shopping Cart</h2>
                    <div class="cart-items-container">
                        <div class="cart-items" id="cartItemsList">
                            <!-- Cart items will be added here dynamically -->
                        </div>
                        <div class="cart-summary">
                            <div class="cart-total">
                                <span>Total:</span>
                                <span id="cartTotal">₹0</span>
                            </div>
                            <div class="cart-actions">
                                <button class="btn secondary-btn" id="clearCart">Clear Cart</button>
                                <div class="checkout-actions">
                                    <button class="btn secondary-btn" id="cartBuyNow">Buy Now</button>
                                    <button class="btn primary-btn" id="checkoutBtn">Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="empty-cart-message" id="emptyCartMessage" style="display: none;">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Your cart is empty</p>
                        <a href="collections.php" class="btn primary-btn">Shop Now</a>
                    </div>
                </div>
            `;
            
            cartModal.appendChild(cartModalContent);
            document.body.appendChild(cartModal);
            
            // Add CSS for cart modal
            const cartStyle = document.createElement('style');
            cartStyle.textContent = `
                .cart-modal-content {
                    max-width: 800px;
                }
                
                .cart-modal-body {
                    padding: 20px;
                }
                
                .cart-items-container {
                    margin-top: 20px;
                }
                
                .cart-item {
                    display: flex;
                    align-items: center;
                    padding: 15px 0;
                    border-bottom: 1px solid #eee;
                }
                
                .cart-item-image {
                    width: 80px;
                    height: 80px;
                    margin-right: 15px;
                }
                
                .cart-item-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 5px;
                }
                
                .cart-item-details {
                    flex: 1;
                }
                
                .cart-item-name {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .cart-item-price {
                    color: var(--primary-color);
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                
                .cart-item-quantity {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                }
                
                .cart-quantity-btn {
                    background: #f5f5f5;
                    border: none;
                    width: 25px;
                    height: 25px;
                    border-radius: 3px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .cart-quantity-input {
                    width: 40px;
                    text-align: center;
                    margin: 0 10px;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    padding: 3px;
                }
                
                .cart-item-remove {
                    color: #e74c3c;
                    cursor: pointer;
                    margin-left: 15px;
                    font-size: 18px;
                }
                
                .cart-summary {
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 2px solid #eee;
                }
                
                .cart-total {
                    display: flex;
                    justify-content: space-between;
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                
                .cart-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .checkout-actions {
                    display: flex;
                    gap: 10px;
                }
                
                .empty-cart-message {
                    text-align: center;
                    padding: 40px 0;
                }
                
                .empty-cart-message i {
                    font-size: 60px;
                    color: #ddd;
                    margin-bottom: 20px;
                }
                
                .empty-cart-message p {
                    font-size: 18px;
                    color: #777;
                    margin-bottom: 20px;
                }
                
                .item-buy-now {
                    font-size: 0.8rem;
                    padding: 5px 10px;
                    margin-top: 5px;
                }
            `;
            document.head.appendChild(cartStyle);
            
            // Close cart modal
            const closeCartModal = cartModal.querySelector('.close-modal');
            closeCartModal.addEventListener('click', function() {
                cartModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            
            // Close cart modal when clicking outside
            window.addEventListener('click', function(e) {
                if (e.target === cartModal) {
                    cartModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Clear cart button
            const clearCartBtn = document.getElementById('clearCart');
            clearCartBtn.addEventListener('click', function() {
                cartItems = [];
                updateCartDisplay();
                updateCartCount();
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            });
            
            // Checkout button
            const checkoutBtn = document.getElementById('checkoutBtn');
            checkoutBtn.addEventListener('click', function() {
                if (cartItems.length > 0) {
                    // Check if user is logged in
                    const isLoggedIn = localStorage.getItem('isLoggedIn');
                    
                    if (isLoggedIn === 'true') {
                        // Redirect to checkout
                        window.location.href = 'checkout.php';
                    } else {
                        // Show login prompt
                        showNotification('Please login to continue with checkout', 'warning');
                        setTimeout(() => {
                            cartModal.style.display = 'none';
                            document.body.style.overflow = 'auto';
                            // Set pending purchase flag
                            sessionStorage.setItem('pendingPurchase', 'true');
                            window.location.href = 'user-login.php';
                        }, 1500);
                    }
                }
            });
            
            // Buy Now button for entire cart
            const buyNowBtn = document.getElementById('cartBuyNow');
            if (buyNowBtn) {
                buyNowBtn.addEventListener('click', function() {
                    if (cartItems.length > 0) {
                        // Disable button to prevent multiple clicks
                        this.disabled = true;
                        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                        
                        // Check if user is logged in
                        const isLoggedIn = localStorage.getItem('isLoggedIn');
                        
                        if (isLoggedIn === 'true') {
                            try {
                                // Save entire cart for Buy Now checkout
                                localStorage.setItem('tempBuyNowItem', JSON.stringify(cartItems));
                                
                                showNotification('Proceeding to checkout...', 'info');
                                
                                setTimeout(() => {
                                    cartModal.style.display = 'none';
                                    document.body.style.overflow = 'auto';
                                    // Redirect to special buy now checkout
                                    window.location.href = 'checkout.php?buynow=true';
                                }, 1000);
                            } catch (error) {
                                console.error('Error in Buy Now process:', error);
                                showNotification('An error occurred. Please try again.', 'error');
                                
                                // Reset button state
                                this.disabled = false;
                                this.innerHTML = 'Buy Now';
                            }
                        } else {
                            // Show login prompt
                            showNotification('Please login to continue with purchase', 'warning');
                            
                            setTimeout(() => {
                                cartModal.style.display = 'none';
                                document.body.style.overflow = 'auto';
                                // Store purchase intent in session storage
                                sessionStorage.setItem('pendingPurchase', JSON.stringify({
                                    cartItems: true,
                                    isBuyNow: true,
                                    timestamp: new Date().toISOString()
                                }));
                                // Redirect to login page
                                window.location.href = 'user-login.php';
                            }, 1000);
                        }
                    }
                });
            }
        }
        
        // Update cart display
        updateCartDisplay();
        
        // Show cart modal
        cartModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Function to update cart display
    function updateCartDisplay() {
        const cartItemsList = document.getElementById('cartItemsList');
        const emptyCartMessage = document.getElementById('emptyCartMessage');
        const cartTotal = document.getElementById('cartTotal');
        
        if (!cartItemsList || !emptyCartMessage || !cartTotal) return;
        
        // Clear current cart items
        cartItemsList.innerHTML = '';
        
        if (cartItems.length === 0) {
            // Show empty cart message
            cartItemsList.parentElement.style.display = 'none';
            emptyCartMessage.style.display = 'block';
        } else {
            // Show cart items
            cartItemsList.parentElement.style.display = 'block';
            emptyCartMessage.style.display = 'none';
            
            let total = 0;
            
            // Add items to cart
            cartItems.forEach((item, index) => {
                const itemPrice = parseInt(item.price.replace(/[^\d]/g, ''));
                const itemTotal = itemPrice * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price}</div>
                        <div class="cart-item-quantity">
                            <button class="cart-quantity-btn minus" data-index="${index}">-</button>
                            <input type="number" value="${item.quantity}" min="1" max="10" class="cart-quantity-input" data-index="${index}">
                            <button class="cart-quantity-btn plus" data-index="${index}">+</button>
                        </div>
                        <button class="btn secondary-btn item-buy-now" data-index="${index}">Buy Now</button>
                    </div>
                    <div class="cart-item-remove" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </div>
                `;
                
                cartItemsList.appendChild(cartItem);
            });
            
            // Update total
            cartTotal.textContent = '₹' + total;
            
            // Add event listeners for quantity buttons and remove
            const minusBtns = cartItemsList.querySelectorAll('.cart-quantity-btn.minus');
            const plusBtns = cartItemsList.querySelectorAll('.cart-quantity-btn.plus');
            const quantityInputs = cartItemsList.querySelectorAll('.cart-quantity-input');
            const removeButtons = cartItemsList.querySelectorAll('.cart-item-remove');
            const itemBuyNowBtns = cartItemsList.querySelectorAll('.item-buy-now');
            
            minusBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    if (cartItems[index].quantity > 1) {
                        cartItems[index].quantity--;
                        updateCartDisplay();
                        updateCartCount();
                        localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    }
                });
            });
            
            plusBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    if (cartItems[index].quantity < 10) {
                        cartItems[index].quantity++;
                        updateCartDisplay();
                        updateCartCount();
                        localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    }
                });
            });
            
            quantityInputs.forEach(input => {
                input.addEventListener('change', function() {
                    const index = parseInt(this.dataset.index);
                    let value = parseInt(this.value);
                    
                    if (isNaN(value) || value < 1) {
                        value = 1;
                    } else if (value > 10) {
                        value = 10;
                    }
                    
                    this.value = value;
                    cartItems[index].quantity = value;
                    updateCartDisplay();
                    updateCartCount();
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                });
            });
            
            removeButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    cartItems.splice(index, 1);
                    updateCartDisplay();
                    updateCartCount();
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                });
            });
            
            // Individual Item Buy Now buttons in cart
            itemBuyNowBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    const item = cartItems[index];
                    
                    // Disable button to prevent multiple clicks
                    this.disabled = true;
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    
                    // Check if user is logged in
                    const isLoggedIn = localStorage.getItem('isLoggedIn');
                    
                    if (isLoggedIn === 'true') {
                        try {
                            // Save only this item to a temporary cart for checkout
                            const singleItemCart = [item];
                            localStorage.setItem('tempBuyNowItem', JSON.stringify(singleItemCart));
                            
                            showNotification(`Proceeding to checkout with ${item.name}...`, 'info');
                            
                            setTimeout(() => {
                                cartModal.style.display = 'none';
                                document.body.style.overflow = 'auto';
                                // Redirect to special buy now checkout
                                window.location.href = 'checkout.php?buynow=true';
                            }, 1000);
                        } catch (error) {
                            console.error('Error in Buy Now process:', error);
                            showNotification('An error occurred. Please try again.', 'error');
                            
                            // Reset button state
                            this.disabled = false;
                            this.innerHTML = 'Buy Now';
                        }
                    } else {
                        // Show login prompt
                        showNotification('Please login to continue with purchase', 'warning');
                        
                        setTimeout(() => {
                            cartModal.style.display = 'none';
                            document.body.style.overflow = 'auto';
                            // Store purchase intent in session storage
                            sessionStorage.setItem('pendingPurchase', JSON.stringify({
                                item: item,
                                isBuyNow: true,
                                timestamp: new Date().toISOString()
                            }));
                            // Redirect to login page
                            window.location.href = 'user-login.php';
                        }, 1000);
                    }
                });
            });
        }
    }

    // Notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    // Make showNotification available globally
    window.showNotification = showNotification;

    // Add CSS for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            color: white;
        }
        
        .notification.info {
            background-color: var(--primary-color);
        }
        
        .notification.success {
            background-color: #2ecc71;
        }
        
        .notification.warning {
            background-color: #f39c12;
        }
        
        .notification.error {
            background-color: #e74c3c;
        }
        
        .notification.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .bump {
            animation: bump 0.3s ease;
        }
        
        @keyframes bump {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        nav ul.show {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            padding: 20px;
            z-index: 100;
        }
    `;
    document.head.appendChild(style);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                showNotification('Thank you for subscribing!');
                emailInput.value = '';
            }
        });
    }

    // Coin Details Modal Functionality
    const coinModal = document.getElementById('coinModal');
    const closeModal = document.querySelector('.close-modal');
    const productCards = document.querySelectorAll('.product-card');
    const modalAddToCart = document.querySelector('.modal-add-to-cart');
    const modalBuyNow = document.querySelector('.modal-buy-now');
    const quantityInput = document.getElementById('coinQuantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    // Coin data (in a real application, this would come from a database)
    const coinData = {
        'Gupta Dynasty Gold Dinar': {
            image: 'image/gupta_dinar.jpg',
            description: 'Rare 4th century gold coin from the Gupta Empire of ancient India. This exquisite piece features intricate designs and is in exceptional condition. The Gupta period is known as the Golden Age of India, and this coin represents the artistic and economic prosperity of that era.',
            price: '10,000 /-',
            oldPrice: '',
            rating: 4.5,
            ratingCount: '(24)',
            period: '4th century CE',
            material: 'Gold',
            weight: '7.5 grams',
            diameter: '20 mm',
            condition: 'Excellent'
        },
        'Akbar Silver Rupee': {
            image: 'image/akbar_rupee.jpg',
            description: '16th century silver coin from Emperor Akbar\'s reign in the Mughal Empire. This coin is a testament to the economic reforms implemented by Akbar the Great. The coin features Persian inscriptions and was part of a standardized currency system that facilitated trade across the vast Mughal territories.',
            price: '10,000 /-',
            oldPrice: '',
            rating: 5,
            ratingCount: '(42)',
            period: '16th century CE',
            material: 'Silver',
            weight: '11.3 grams',
            diameter: '25 mm',
            condition: 'Very Good'
        },
        '1947 Independence Rupee': {
            image: 'image/independence_rupee.jpg',
            description: 'Commemorative coin marking Indian independence - extremely rare. This historic piece was minted to celebrate India\'s independence in 1947. It features symbolic imagery representing freedom and national pride. Due to limited mintage, this coin is highly sought after by collectors of modern Indian numismatics.',
            price: '10,000 /-',
            oldPrice: '',
            rating: 4,
            ratingCount: '(18)',
            period: '1947',
            material: 'Silver',
            weight: '10 grams',
            diameter: '28 mm',
            condition: 'Mint'
        },
        'Jahangir\'s Eid Mohur': {
            image: 'image/eid_mohur.jpg',
            description: 'Extremely rare Mughal gold coin minted during Jahangir\'s reign. Emperor Jahangir was known for his innovative coinage, and this Eid Mohur is one of his most celebrated designs. The coin was specially minted for the Eid festival and features zodiac symbols along with Persian inscriptions. Its artistic merit and historical significance make it a treasure for serious collectors.',
            price: '10,000 /-',
            oldPrice: '10,000 /-',
            rating: 3.5,
            ratingCount: '(9)',
            period: 'Early 17th century',
            material: 'Gold',
            weight: '10.9 grams',
            diameter: '22 mm',
            condition: 'Good'
        }
    };

    // Make coinData available globally
    window.coinData = coinData;

    // Open modal when clicking on a product card
    if (productCards.length > 0) {
        productCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't open modal if clicking on action buttons
                if (e.target.closest('.action-btn')) {
                    return;
                }

                // Get coin data from data attributes
                const coinId = this.dataset.coinId;
                const coinImage = this.dataset.coinImage;
                const coinName = this.dataset.coinName;
                const coinRatingCount = this.dataset.coinRatingCount;
                const coinPrice = this.dataset.coinPrice;
                const coinDescription = this.dataset.coinDescription;
                const coinPeriod = this.dataset.coinPeriod;
                const coinMaterial = this.dataset.coinMaterial;
                const coinWeight = this.dataset.coinWeight;
                const coinDiameter = this.dataset.coinDiameter;
                const coinCondition = this.dataset.coinCondition;

                // Populate modal with coin data
                document.getElementById('modalCoinImage').src = coinImage;
                document.getElementById('modalCoinName').textContent = coinName;
                document.getElementById('modalRatingCount').textContent = `(${coinRatingCount})`;
                document.getElementById('modalPrice').textContent = coinPrice;
                document.getElementById('modalDescription').textContent = coinDescription;
                document.getElementById('modalPeriod').textContent = coinPeriod;
                document.getElementById('modalMaterial').textContent = coinMaterial;
                document.getElementById('modalWeight').textContent = coinWeight;
                document.getElementById('modalDiameter').textContent = coinDiameter;
                document.getElementById('modalCondition').textContent = coinCondition;

                // Set current coin ID on the modal
                coinModal.dataset.currentCoinId = coinId;

                // Reset quantity
                quantityInput.value = 1;

                // Show modal
                coinModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            });
        });
    }

    // Close modal when clicking on X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            coinModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === coinModal) {
            coinModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Quantity selector functionality
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });

        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
            }
        });

        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > 10) {
                this.value = 10;
            }
        });
    }

    // Update add to cart buttons to actually add items to cart
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent triggering the product card click
                
                // Get product info
                const productCard = this.closest('.product-card');
                const name = productCard.querySelector('h3').textContent;
                const price = productCard.querySelector('.price').textContent;
                const image = productCard.querySelector('img').src;
                
                // Check if product already in cart
                const existingItemIndex = cartItems.findIndex(item => item.name === name);
                
                if (existingItemIndex !== -1) {
                    // Update quantity if not exceeding max (10)
                    if (cartItems[existingItemIndex].quantity < 10) {
                        cartItems[existingItemIndex].quantity++;
                    }
                } else {
                    // Add new item to cart
                    cartItems.push({
                        name,
                        price,
                        image,
                        quantity: 1
                    });
                }
                
                // Update localStorage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                // Update cart count
                updateCartCount();
                
                // Animation effect for cart icon
                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                    cartCount.classList.add('bump');
                    setTimeout(() => {
                        cartCount.classList.remove('bump');
                    }, 300);
                }
                
                // Show notification
                showNotification('Item added to cart!');
            });
        });
    }

    // Modal Add to Cart button - update to add to cartItems array
    if (modalAddToCart) {
        modalAddToCart.addEventListener('click', function() {
            const quantity = parseInt(quantityInput.value);
            const coinName = document.getElementById('modalCoinName').textContent;
            const coinImage = document.getElementById('modalCoinImage').src;
            const coinPrice = document.getElementById('modalPrice').textContent;
            
            // Check if product already in cart
            const existingItemIndex = cartItems.findIndex(item => item.name === coinName);
            
            if (existingItemIndex !== -1) {
                // Update quantity (not exceeding max of 10)
                const newQuantity = Math.min(cartItems[existingItemIndex].quantity + quantity, 10);
                cartItems[existingItemIndex].quantity = newQuantity;
            } else {
                // Add new item to cart
                cartItems.push({
                    name: coinName,
                    price: coinPrice,
                    image: coinImage,
                    quantity: quantity
                });
            }
            
            // Update localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Update cart count
            updateCartCount();
            
            // Animation effect
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.classList.add('bump');
                setTimeout(() => {
                    cartCount.classList.remove('bump');
                }, 300);
            }
            
            showNotification(`${quantity} ${coinName}${quantity > 1 ? 's' : ''} added to cart!`);
        });
    }

    // Modal Buy Now button
    if (modalBuyNow) {
        modalBuyNow.addEventListener('click', function() {
            const coinName = document.getElementById('modalCoinName').textContent;
            const coinImage = document.getElementById('modalCoinImage').src;
            const coinPrice = document.getElementById('modalPrice').textContent;
            const quantity = parseInt(quantityInput.value);
            
            // Disable button to prevent multiple clicks
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Check if user is logged in
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            
            if (isLoggedIn === 'true') {
                // Create a single item array for Buy Now
                const buyNowItem = [{
                    name: coinName,
                    price: coinPrice,
                    image: coinImage,
                    quantity: quantity
                }];
                
                // Save to tempBuyNowItem
                localStorage.setItem('tempBuyNowItem', JSON.stringify(buyNowItem));
                
                // User is logged in, proceed to checkout
                showNotification(`Proceeding to checkout for ${quantity} ${coinName}${quantity > 1 ? 's' : ''}...`, 'info');
                
                setTimeout(() => {
                    coinModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    // Redirect to checkout with buynow parameter
                    window.location.href = 'checkout.php?buynow=true';
                }, 1000);
            } else {
                // User is not logged in, redirect to login page
                showNotification('Please login to continue with purchase', 'warning');
                
                setTimeout(() => {
                    coinModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    // Store purchase intent in session storage
                    sessionStorage.setItem('pendingPurchase', JSON.stringify({
                        coinName,
                        coinImage,
                        coinPrice,
                        quantity,
                        isBuyNow: true,
                        timestamp: new Date().toISOString()
                    }));
                    // Redirect to login page
                    window.location.href = 'user-login.php';
                }, 1000);
            }
        });
    }

    // Search functionality
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create search overlay
            const searchOverlay = document.createElement('div');
            searchOverlay.className = 'search-overlay';
            
            const searchContainer = document.createElement('div');
            searchContainer.className = 'search-container';
            
            const searchForm = document.createElement('form');
            searchForm.innerHTML = `
                <input type="text" placeholder="Search for rare coins..." autofocus>
                <button type="submit"><i class="fas fa-search"></i></button>
                <button type="button" class="close-search"><i class="fas fa-times"></i></button>
            `;
            
            searchContainer.appendChild(searchForm);
            searchOverlay.appendChild(searchContainer);
            document.body.appendChild(searchOverlay);
            
            // Add CSS for search overlay
            const searchStyle = document.createElement('style');
            searchStyle.textContent = `
                .search-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.9);
                    z-index: 1000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    animation: fadeIn 0.3s ease;
                }
                
                .search-container {
                    width: 80%;
                    max-width: 600px;
                }
                
                .search-container form {
                    display: flex;
                    position: relative;
                }
                
                .search-container input {
                    width: 100%;
                    padding: 15px 50px 15px 15px;
                    border: none;
                    border-radius: 5px;
                    font-size: 18px;
                }
                
                .search-container button {
                    background: none;
                    border: none;
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    font-size: 20px;
                    color: var(--secondary-color);
                }
                
                .close-search {
                    position: absolute;
                    top: -50px !important;
                    right: 0 !important;
                    color: white !important;
                    font-size: 24px !important;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(searchStyle);
            
            // Close search overlay
            const closeSearch = document.querySelector('.close-search');
            if (closeSearch) {
                closeSearch.addEventListener('click', function() {
                    document.body.removeChild(searchOverlay);
                });
            }
            
            // Handle search form submission
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const searchInput = this.querySelector('input');
                if (searchInput && searchInput.value) {
                    showNotification(`Searching for: ${searchInput.value}`);
                    document.body.removeChild(searchOverlay);
                    // Redirect to collections page with search parameter
                    window.location.href = `collections.php?search=${encodeURIComponent(searchInput.value)}`;
                }
            });
        });
    }
});

// Checkout page functionality
if (window.location.pathname.includes('checkout.php')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Use global showNotification function if available
        const showNotification = window.showNotification || function(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        };
        
        // Add CSS for notification if not already present
        if (!document.querySelector('style#notification-style')) {
            const style = document.createElement('style');
            style.id = 'notification-style';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 25px;
                    border-radius: 5px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    z-index: 1000;
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: all 0.3s ease;
                    color: white;
                }
                
                .notification.info {
                    background-color: var(--primary-color);
                }
                
                .notification.success {
                    background-color: #2ecc71;
                }
                
                .notification.warning {
                    background-color: #f39c12;
                }
                
                .notification.error {
                    background-color: #e74c3c;
                }
                
                .notification.show {
                    opacity: 1;
                    transform: translateY(0);
                }
            `;
            document.head.appendChild(style);
        }

        // Check if this is a buy now checkout or regular cart checkout
        const isBuyNow = window.location.search.includes('buynow=true');
        const urlParams = new URLSearchParams(window.location.search);
        const coinParam = urlParams.get('coin');
        const quantityParam = urlParams.get('quantity');
        
        // Determine which items to use for checkout
        let checkoutItems = [];
        
        if (isBuyNow) {
            // Buy Now was clicked - use the temp item
            checkoutItems = JSON.parse(localStorage.getItem('tempBuyNowItem')) || [];
            
            // Clear the temp item after retrieving it
            localStorage.removeItem('tempBuyNowItem');
            
            // If no temp item found, fall back to regular cart
            if (checkoutItems.length === 0) {
                checkoutItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            }
        } else if (coinParam && quantityParam) {
            // Direct URL parameters - create item from coin data
            const coinName = decodeURIComponent(coinParam);
            const quantity = parseInt(quantityParam);
            const coinData = window.coinData || { // Use global coinData if available
                'Gupta Dynasty Gold Dinar': {
                    image: 'image/gupta_dinar.jpg',
                    price: '10,000 /-'
                },
                'Akbar Silver Rupee': {
                    image: 'image/akbar_rupee.jpg',
                    price: '10,000 /-'
                },
                '1947 Independence Rupee': {
                    image: 'image/independence_rupee.jpg',
                    price: '10,000 /-'
                },
                'Jahangir\'s Eid Mohur': {
                    image: 'image/eid_mohur.jpg',
                    price: '10,000 /-'
                }
            };
            
            if (coinData[coinName]) {
                checkoutItems = [{
                    name: coinName,
                    price: coinData[coinName].price,
                    image: coinData[coinName].image,
                    quantity: quantity
                }];
            }
        } else {
            // Regular checkout - use entire cart
            checkoutItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        }
        
        // Get elements
        const coinImage = document.getElementById('coinImage');
        const coinName = document.getElementById('coinName');
        const coinPrice = document.getElementById('coinPrice');
        const coinQuantity = document.getElementById('coinQuantity');
        const subtotal = document.getElementById('subtotal');
        const tax = document.getElementById('tax');
        const total = document.getElementById('total');
        
        // Check if there are items to checkout
        if (checkoutItems.length === 0) {
            // Redirect to home if nothing to checkout
            window.location.href = 'index.php';
            return;
        }
        
        // Calculate totals
        let subtotalValue = 0;
        let taxValue = 0;
        let totalValue = 0;
        
        // Display item(s)
        if (checkoutItems.length === 1) {
            // Single item checkout
            const item = checkoutItems[0];
            
            // Display item details
            coinImage.src = item.image;
            coinName.textContent = item.name;
            coinPrice.textContent = item.price;
            coinQuantity.textContent = item.quantity;
            
            // Calculate values
            const priceValue = parseInt(item.price.replace(/[^\d]/g, ''));
            subtotalValue = priceValue * item.quantity;
        } else {
            // Multiple items - show a summary
            const firstItem = checkoutItems[0];
            
            coinImage.src = firstItem.image;
            coinName.textContent = `${checkoutItems.length} items in cart`;
            coinPrice.textContent = 'Various';
            coinQuantity.textContent = checkoutItems.reduce((total, item) => total + item.quantity, 0);
            
            // Calculate subtotal from all items
            subtotalValue = checkoutItems.reduce((total, item) => {
                const price = parseInt(item.price.replace(/[^\d]/g, ''));
                return total + (price * item.quantity);
            }, 0);
        }
        
        // Calculate tax and total
        taxValue = subtotalValue * 0.18; // 18% tax
        totalValue = subtotalValue + taxValue;
        
        // Update values in the DOM
        subtotal.textContent = '₹' + subtotalValue;
        tax.textContent = '₹' + taxValue.toFixed(0);
        total.textContent = '₹' + totalValue.toFixed(0);
        
        // Handle place order button
        const placeOrderBtn = document.getElementById('place-order');
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', function() {
                // Validate shipping form
                const shippingForm = document.getElementById('shippingForm');
                if (shippingForm.checkValidity()) {
                    // Show loading state
                    this.disabled = true;
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
                    
                    // If this was a Buy Now checkout for a specific item, don't clear the cart
                    if (!isBuyNow) {
                        // Regular checkout - clear the entire cart
                        localStorage.removeItem('cartItems');
                    } else {
                        // Buy Now checkout - remove only this item from cart if it exists there
                        if (checkoutItems.length === 1) {
                            const buyNowItem = checkoutItems[0];
                            const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
                            
                            // Find and remove the item from the cart
                            const updatedCart = cart.filter(item => 
                                item.name !== buyNowItem.name
                            );
                            
                            // Save the updated cart
                            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                        }
                    }
                    
                    // Show success message
                    showNotification('Order placed successfully! Thank you for your purchase.', 'success');
                    
                    // Redirect to home after delay
                    setTimeout(() => {
                        window.location.href = 'index.php';
                    }, 2000);
                } else {
                    // Trigger form validation
                    shippingForm.reportValidity();
                }
            });
        }
    });
} 