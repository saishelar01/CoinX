document.addEventListener('DOMContentLoaded', function() {
    // Initialize demo user if no users exist
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
        // Add a demo user
        const demoUser = {
            fullname: 'Demo User',
            email: 'demo@example.com',
            password: 'password123',
            registeredOn: new Date().toISOString()
        };
        users.push(demoUser);
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Check if user is logged in
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userIcon = document.querySelector('.user-icon');
        
        if (isLoggedIn === 'true') {
            // Change user icon to indicate logged in state
            if (userIcon) {
                userIcon.innerHTML = '<i class="fas fa-user-check"></i>';
                userIcon.title = 'My Account';
                
                // If on login or register page, redirect to home
                    if (window.location.href.includes('user-login.php') || 
                    window.location.href.includes('user-register.php')) {
                    window.location.href = 'index.php';
                }
            }
        } else {
            // Reset user icon
            if (userIcon) {
                userIcon.innerHTML = '<i class="fas fa-user"></i>';
                userIcon.title = 'Login';
            }
        }
    }
    
    // Run on page load
    checkLoginStatus();
    
    // Check if we're using server-side PHP for auth
    const isUsingServerAuth = document.querySelector('form[action*=".php"]') !== null;
    
    // Only use client-side auth if we're not using server auth
    if (!isUsingServerAuth) {
        // Login form handling
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Simple validation
                if (!email || !password) {
                    showNotification('Please fill in all fields', 'error');
                    return;
                }
                
                // For demo purposes, we'll validate against localStorage instead of server
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const user = users.find(u => u.email === email);
                
                // Demo login validation (for demonstration purposes only)
                // In production, use server-side validation
                if (user && (user.password === password)) {
                    // Login successful
                    const userData = {
                        fullname: user.fullname,
                        email: user.email
                    };
                    
                    // Set login status and user data
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('currentUser', JSON.stringify(userData));
                    
                    showNotification('Login successful! Redirecting...', 'success');
                    
                    // Check if there's a pending purchase
                    const pendingPurchase = sessionStorage.getItem('pendingPurchase');
                    
                    // Redirect after a short delay
                    setTimeout(() => {
                        if (pendingPurchase) {
                            // Clear the pending purchase
                            sessionStorage.removeItem('pendingPurchase');
                            
                            // Parse the pending purchase data
                            const purchase = JSON.parse(pendingPurchase);
                            
                            // Check if the purchase is still valid (less than 30 minutes old)
                            const purchaseTime = new Date(purchase.timestamp);
                            const currentTime = new Date();
                            const timeDiff = (currentTime - purchaseTime) / (1000 * 60); // in minutes
                            
                            if (timeDiff < 30) {
                                // Handle different types of pending purchases
                                if (purchase.isBuyNow) {
                                    if (purchase.cartItems) {
                                        // Buy now for entire cart
                                        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                                        if (cartItems.length > 0) {
                                            localStorage.setItem('tempBuyNowItem', JSON.stringify(cartItems));
                                            window.location.href = 'checkout.php?buynow=true';
                                            return;
                                        }
                                    } else if (purchase.item) {
                                        // Buy now for single item from cart
                                        const singleItem = [purchase.item];
                                        localStorage.setItem('tempBuyNowItem', JSON.stringify(singleItem));
                                        window.location.href = 'checkout.php?buynow=true';
                                        return;
                                    } else if (purchase.coinName) {
                                        // Buy now from coin modal
                                        const buyNowItem = [{
                                            name: purchase.coinName,
                                            price: purchase.coinPrice || '10,000 /-',
                                            image: purchase.coinImage || 'image/placeholder.jpg',
                                            quantity: purchase.quantity || 1
                                        }];
                                        localStorage.setItem('tempBuyNowItem', JSON.stringify(buyNowItem));
                                        window.location.href = 'checkout.php?buynow=true';
                                        return;
                                    }
                                } else if (purchase.coinName) {
                                    // Redirect to checkout with the pending purchase
                                    window.location.href = `checkout.php?coin=${encodeURIComponent(purchase.coinName)}&quantity=${purchase.quantity}`;
                                    return;
                                }
                            }
                            
                            // Default fallback: redirect to home
                            window.location.href = 'index.php';
                        } else {
                            // No pending purchase, redirect to home
                            window.location.href = 'index.php';
                        }
                    }, 1500);
                } else {
                    // Show error message
                    showNotification('Invalid email or password', 'error');
                }
            });
        }
        
        // Registration form handling
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const fullname = document.getElementById('fullname').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const termsChecked = document.getElementById('terms').checked;
                
                // Simple validation
                if (!fullname || !email || !password) {
                    showNotification('Please fill in all fields', 'error');
                    return;
                }
                
                if (!termsChecked) {
                    showNotification('Please agree to the Terms & Conditions', 'error');
                    return;
                }
                
                // Get existing users from localStorage
                const users = JSON.parse(localStorage.getItem('users')) || [];
                
                // Check if email already exists
                if (users.some(user => user.email === email)) {
                    showNotification('Email already exists', 'error');
                    return;
                }
                
                // Add new user to localStorage
                const newUser = {
                    fullname,
                    email,
                    password,
                    registeredOn: new Date().toISOString()
                };
                
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                showNotification('Registration successful! Redirecting to login...', 'success');
                
                // Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = 'user-login.php';
                }, 1500);
            });
        }
    }
    
    // Notification function
    function showNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.auth-notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'auth-notification';
            document.body.appendChild(notification);
            
            // Add CSS for notification
            const style = document.createElement('style');
            style.textContent = `
                .auth-notification {
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
                
                .auth-notification.show {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .auth-notification.info {
                    background-color: var(--primary-color);
                }
                
                .auth-notification.success {
                    background-color: #2ecc71;
                }
                
                .auth-notification.error {
                    background-color: #e74c3c;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Set message and show notification
        notification.textContent = message;
        notification.className = 'auth-notification ' + type;
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Logout functionality
    const userIcon = document.querySelector('.user-icon');
    if (userIcon) {
        userIcon.addEventListener('click', function(e) {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            
            if (isLoggedIn === 'true' && !window.location.href.includes('user-login.php')) {
                e.preventDefault();
                
                // Create logout confirmation
                const confirmLogout = confirm('Do you want to logout?');
                
                if (confirmLogout) {
                    localStorage.setItem('isLoggedIn', 'false');
                    localStorage.removeItem('currentUser');
                    
                    showNotification('Logged out successfully', 'info');
                    
                    // Reset user icon
                    userIcon.innerHTML = '<i class="fas fa-user"></i>';
                    userIcon.title = 'Login';
                    
                    // Redirect to home page if not already there
                    if (!window.location.href.includes('index.php')) {
                        setTimeout(() => {
                            window.location.href = 'index.php';
                        }, 1000);
                    }
                }
            } else if (!window.location.href.includes('user-login.php') && !window.location.href.includes('user-register.php')) {
                // If not logged in and not already on the login page, redirect to login page
                e.preventDefault();
                window.location.href = 'user-login.php';
            }
        });
    }
});

// Function to clear all user-related localStorage data
function clearUserLocalStorage() {
    localStorage.removeItem('users');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('deletedUsers');
    console.log('All user-related localStorage data has been cleared');
}

// Add this function to the global scope so it can be called from the console
window.clearUserLocalStorage = clearUserLocalStorage; 