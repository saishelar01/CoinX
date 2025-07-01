document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        // Redirect to login page if not logged in
        window.location.href = 'user-login.php';
        return;
    }
    
    // Check if this is a Buy Now checkout or a regular cart checkout
    const urlParams = new URLSearchParams(window.location.search);
    const isBuyNow = urlParams.get('buynow') === 'true';
    const coinParam = urlParams.get('coin');
    const quantityParam = urlParams.get('quantity');
    
    // Initialize checkout items array
    let checkoutItems = [];
    
    // Determine which items to use for checkout
    if (isBuyNow) {
        // Buy Now was clicked - use the temp item
        checkoutItems = JSON.parse(localStorage.getItem('tempBuyNowItem')) || [];
        
        // Clear the temp item after retrieving it
        localStorage.removeItem('tempBuyNowItem');
    } else if (coinParam && quantityParam) {
        // Direct URL parameters - create item from coin data
        const coinName = decodeURIComponent(coinParam);
        const quantity = parseInt(quantityParam) || 1;
        
        // Coin data (in a real application, this would come from a database)
        const coinData = {
            'Gupta Dynasty Gold Dinar': {
                image: 'image/gupta_dinar.jpg',
                price: 10000.00,
                description: 'Rare 4th century gold coin from the Gupta Empire of ancient India.'
            },
            'Akbar Silver Rupee': {
                image: 'image/akbar_rupee.jpg',
                price: 8500.00,
                description: '16th century silver coin from Emperor Akbar\'s reign in the Mughal Empire.'
            },
            'British Gold Sovereign': {
                image: 'image/british_sovereign.jpg',
                price: 20000.00,
                description: 'Classic British gold sovereign featuring St. George and the Dragon design.'
            },
            // Other coins as defined in the original
            // For brevity, not all coins are listed here
        };
        
        // Get coin data
        const coin = coinData[coinName];
        if (!coin) {
            // Redirect to home if coin not found
            window.location.href = 'index.php';
            return;
        }
        
        checkoutItems = [{
            name: coinName,
            image: coin.image,
            price: coin.price,
            quantity: quantity
        }];
    } else {
        // Regular checkout - use entire cart
        checkoutItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // If cart is empty, redirect to home
        if (checkoutItems.length === 0) {
            window.location.href = 'index.php';
            return;
        }
    }
    
    // DOM elements
    const orderItemsContainer = document.querySelector('.order-item');
    const orderSummary = document.querySelector('.order-summary');
    
    // Clear existing order item
    orderItemsContainer.innerHTML = '';
    
    // Variables for totals
    let subtotalValue = 0;
    let taxValue = 0;
    let totalValue = 0;
    
    // Display items in order summary
    if (checkoutItems.length === 1) {
        // Single item checkout
        const item = checkoutItems[0];
        
        // Create and append single item
        const itemElement = document.createElement('div');
        itemElement.className = 'item-content';
        itemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <div class="item-price">
                    <span>₹${typeof item.price === 'number' ? item.price.toLocaleString() : item.price}</span>
                </div>
                <div class="item-quantity">
                    Quantity: <span>${item.quantity}</span>
                </div>
            </div>
        `;
        
        orderItemsContainer.appendChild(itemElement);
        
        // Calculate subtotal
        subtotalValue = (typeof item.price === 'number' ? item.price : parseInt(item.price.replace(/[^\d]/g, ''))) * item.quantity;
    } else {
        // Multiple items checkout
        // First, create a header for multiple items
        const headerElement = document.createElement('div');
        headerElement.className = 'multiple-items-header';
        headerElement.innerHTML = `<h3>Order Items (${checkoutItems.length} items)</h3>`;
        orderSummary.insertBefore(headerElement, orderItemsContainer);
        
        // Create a container for all items if multiple items
        const allItemsContainer = document.createElement('div');
        allItemsContainer.className = 'multiple-items-container';
        orderSummary.insertBefore(allItemsContainer, orderItemsContainer.nextSibling);
        
        // Create and append each item
        checkoutItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item-entry';
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <div class="item-price">
                        <span>₹${typeof item.price === 'number' ? item.price.toLocaleString() : item.price}</span>
                    </div>
                    <div class="item-quantity">
                        Quantity: <span>${item.quantity}</span>
                    </div>
                </div>
            `;
            
            allItemsContainer.appendChild(itemElement);
            
            // Add to subtotal
            const itemPrice = typeof item.price === 'number' ? item.price : parseInt(item.price.replace(/[^\d]/g, ''));
            subtotalValue += itemPrice * item.quantity;
        });
    }
    
    // Calculate tax and total
    taxValue = subtotalValue * 0.18; // 18% tax
    totalValue = subtotalValue + taxValue;
    
    // Update totals in the DOM
    document.getElementById('subtotal').textContent = `₹${subtotalValue.toLocaleString()}`;
    document.getElementById('tax').textContent = `₹${taxValue.toLocaleString()}`;
    document.getElementById('total').textContent = `₹${totalValue.toLocaleString()}`;
    
    // Fill in user details if available
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('fullname').value = currentUser.fullname || '';
        document.getElementById('email').value = currentUser.email || '';
        document.getElementById('phone').value = currentUser.phone || '';
    }
    
    // Add real-time input validation
    setupInputValidation();
    
    // Setup payment method toggling
    setupPaymentMethodToggle();
    
    // Place order button
    const placeOrderBtn = document.getElementById('place-order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function() {
            // Enhanced validation
            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();
            const city = document.getElementById('city').value.trim();
            const state = document.getElementById('state').value.trim();
            const pincode = document.getElementById('pincode').value.trim();
            
            // Check for any invalid inputs first
            const invalidInputs = document.querySelectorAll('.invalid');
            if (invalidInputs.length > 0) {
                showNotification('Please correct the highlighted fields before placing your order', 'error');
                invalidInputs[0].focus();
                return;
            }
            
            // Check if any fields are empty
            if (!fullname || !email || !phone || !address || !city || !state || !pincode) {
                showNotification('Please fill in all shipping details', 'error');
                
                // Find the first empty field and focus it
                const fields = [
                    {el: document.getElementById('fullname'), name: 'fullname'},
                    {el: document.getElementById('email'), name: 'email'},
                    {el: document.getElementById('phone'), name: 'phone'},
                    {el: document.getElementById('address'), name: 'address'},
                    {el: document.getElementById('city'), name: 'city'},
                    {el: document.getElementById('state'), name: 'state'},
                    {el: document.getElementById('pincode'), name: 'pincode'}
                ];
                
                for (const field of fields) {
                    if (!field.el.value.trim()) {
                        field.el.focus();
                        field.el.classList.add('invalid');
                        field.el.nextElementSibling.style.display = 'block';
                        field.el.nextElementSibling.textContent = `Please enter your ${field.name}`;
                        break;
                    }
                }
                
                return;
            }
            
            // Validate each field
            if (!validateName(fullname)) {
                showNotification('Please enter a valid full name (only letters and spaces)', 'error');
                document.getElementById('fullname').focus();
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                document.getElementById('email').focus();
                return;
            }
            
            if (!validatePhone(phone)) {
                showNotification('Please enter a valid phone number (10 digits)', 'error');
                document.getElementById('phone').focus();
                return;
            }
            
            if (!validatePincode(pincode)) {
                showNotification('Please enter a valid pincode (6 digits, numbers only)', 'error');
                document.getElementById('pincode').focus();
                return;
            }
            
            // Check payment method
            const cashOnDelivery = document.getElementById('cash-on-delivery').checked;
            const upiPayment = document.getElementById('upi').checked;
            
            if (upiPayment) {
                // If UPI payment is selected, show a confirmation message
                const confirmPayment = confirm("Have you completed the UPI payment by scanning the QR code? Your order will be kept in a pending state until we verify your payment.");
                if (!confirmPayment) {
                    showNotification('Please complete the UPI payment before placing your order', 'error');
                    return;
                }
            }
            
            // Simulate order processing
            showNotification('Processing your order...', 'info');
            
            setTimeout(() => {
                // Store order in localStorage
                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                
                // Create order item entries
                const orderItems = checkoutItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: typeof item.price === 'number' ? item.price : parseInt(item.price.replace(/[^\d]/g, '')),
                    image: item.image
                }));
                
                const newOrder = {
                    id: 'ORD' + Date.now(),
                    items: orderItems,
                    subtotal: subtotalValue,
                    tax: taxValue,
                    total: totalValue,
                    date: new Date().toISOString(),
                    status: upiPayment ? 'Pending' : 'Processing',
                    paymentMethod: cashOnDelivery ? 'Cash On Delivery' : 'UPI',
                    shippingDetails: {
                        fullname,
                        email,
                        phone,
                        address,
                        city,
                        state,
                        pincode
                    }
                };
                
                orders.push(newOrder);
                localStorage.setItem('orders', JSON.stringify(orders));
                
                // Clear the cart if this was a regular checkout
                if (!isBuyNow && !coinParam) {
                    localStorage.removeItem('cartItems');
                }
                
                // Different notification based on payment method
                if (upiPayment) {
                    showNotification('Order placed in pending state. We will confirm your payment soon!', 'info');
                } else {
                    showNotification('Order placed successfully!', 'success');
                }
                
                // Redirect to thank you page after a short delay
                setTimeout(() => {
                    window.location.href = 'order-confirmation.php';
                }, 2000);
            }, 2000);
        });
    }
});

// Function to set up real-time input validation
function setupInputValidation() {
    // Full name validation (letters and spaces only)
    const fullnameInput = document.getElementById('fullname');
    if (fullnameInput) {
        fullnameInput.addEventListener('input', function() {
            // Remove invalid characters as they're typed
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
            
            const value = this.value;
            const validationMessage = this.nextElementSibling;
            
            if (value && !validateName(value)) {
                this.setCustomValidity('Please enter a valid name (letters and spaces only)');
                this.classList.add('invalid');
                validationMessage.textContent = 'Please enter a valid name (letters and spaces only)';
            } else {
                this.setCustomValidity('');
                this.classList.remove('invalid');
            }
        });
    }
    
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const value = this.value;
            const validationMessage = this.nextElementSibling;
            
            if (value && !validateEmail(value)) {
                this.setCustomValidity('Please enter a valid email address');
                this.classList.add('invalid');
                validationMessage.textContent = 'Please enter a valid email address';
                validationMessage.style.display = 'block';
            } else {
                this.setCustomValidity('');
                this.classList.remove('invalid');
                validationMessage.style.display = '';
            }
        });
    }
    
    // Phone validation (numbers only, 10 digits)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            const validationMessage = this.nextElementSibling;
            
            // Remove non-digit characters as they're typed
            this.value = this.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
            
            // Validate length
            if (this.value.length > 0 && this.value.length !== 10) {
                this.setCustomValidity('Phone number must be 10 digits');
                this.classList.add('invalid');
                validationMessage.textContent = `Phone number must be 10 digits (currently ${this.value.length})`;
                validationMessage.style.display = 'block';
            } else {
                this.setCustomValidity('');
                this.classList.remove('invalid');
                validationMessage.style.display = '';
            }
        });
    }
    
    // Address validation
    const addressInput = document.getElementById('address');
    if (addressInput) {
        addressInput.addEventListener('input', function() {
            const validationMessage = this.nextElementSibling;
            
            if (!this.value.trim()) {
                this.setCustomValidity('Please enter your address');
                this.classList.add('invalid');
                validationMessage.textContent = 'Please enter your address';
                validationMessage.style.display = 'block';
            } else {
                this.setCustomValidity('');
                this.classList.remove('invalid');
                validationMessage.style.display = '';
            }
        });
    }
    
    // City and State validation (letters, spaces, and some special characters)
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    
    [cityInput, stateInput].forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                // Remove invalid characters as they're typed
                this.value = this.value.replace(/[^A-Za-z\s\-\.]/g, '');
                
                const value = this.value;
                const validationMessage = this.nextElementSibling;
                const fieldName = this.id.charAt(0).toUpperCase() + this.id.slice(1);
                
                // Allow letters, spaces, hyphens, and periods
                if (value && !/^[A-Za-z\s\-\.]+$/.test(value)) {
                    this.setCustomValidity(`Please enter a valid ${this.id} name (letters, spaces, hyphens, and periods only)`);
                    this.classList.add('invalid');
                    validationMessage.textContent = `${fieldName} can only contain letters, spaces, hyphens, and periods`;
                    validationMessage.style.display = 'block';
                } else {
                    this.setCustomValidity('');
                    this.classList.remove('invalid');
                    validationMessage.style.display = '';
                }
            });
        }
    });
    
    // Pincode validation (numbers only, 6 digits)
    const pincodeInput = document.getElementById('pincode');
    if (pincodeInput) {
        pincodeInput.addEventListener('input', function() {
            const validationMessage = this.nextElementSibling;
            
            // Remove non-digit characters as they're typed
            this.value = this.value.replace(/\D/g, '');
            
            // Limit to 6 digits
            if (this.value.length > 6) {
                this.value = this.value.slice(0, 6);
            }
            
            // Validate length
            if (this.value.length > 0 && this.value.length !== 6) {
                this.setCustomValidity('Pincode must be 6 digits');
                this.classList.add('invalid');
                validationMessage.textContent = `Pincode must be 6 digits (currently ${this.value.length})`;
                validationMessage.style.display = 'block';
            } else {
                this.setCustomValidity('');
                this.classList.remove('invalid');
                validationMessage.style.display = '';
            }
        });
    }
    
    // Add form submission prevention if there are invalid fields
    const shippingForm = document.getElementById('shippingForm');
    if (shippingForm) {
        shippingForm.addEventListener('submit', function(event) {
            // Check if any fields are invalid
            const invalidFields = shippingForm.querySelectorAll('input.invalid, select.invalid');
            if (invalidFields.length > 0) {
                event.preventDefault();
                showNotification('Please correct the highlighted fields before submitting', 'error');
                // Focus the first invalid field
                invalidFields[0].focus();
            }
        });
    }
}

// Validation functions
function validateName(name) {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePhone(phone) {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
}

function validatePincode(pincode) {
    const pincodePattern = /^\d{6}$/;
    return pincodePattern.test(pincode);
}

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.checkout-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'checkout-notification';
        document.body.appendChild(notification);
        
        // Add CSS for notification
        const style = document.createElement('style');
        style.textContent = `
            .checkout-notification {
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
            
            .checkout-notification.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .checkout-notification.info {
                background-color: var(--primary-color);
            }
            
            .checkout-notification.success {
                background-color: #2ecc71;
            }
            
            .checkout-notification.error {
                background-color: #e74c3c;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Set message and show notification
    notification.textContent = message;
    notification.className = 'checkout-notification ' + type;
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Function to toggle UPI payment details
function setupPaymentMethodToggle() {
    const cashOnDeliveryRadio = document.getElementById('cash-on-delivery');
    const upiRadio = document.getElementById('upi');
    const upiPaymentDetails = document.getElementById('upi-payment-details');
    
    if (cashOnDeliveryRadio && upiRadio && upiPaymentDetails) {
        // Set initial state
        upiPaymentDetails.style.display = upiRadio.checked ? 'block' : 'none';
        
        // Add event listeners
        cashOnDeliveryRadio.addEventListener('change', function() {
            upiPaymentDetails.style.display = 'none';
        });
        
        upiRadio.addEventListener('change', function() {
            upiPaymentDetails.style.display = 'block';
        });
    }
} 