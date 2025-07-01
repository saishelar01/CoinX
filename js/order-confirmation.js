document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        // Redirect to login page if not logged in
        window.location.href = 'user-login.php';
        return;
    }
    
    // Get the latest order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // If no orders exist, redirect to home
    if (orders.length === 0) {
        window.location.href = 'index.php';
        return;
    }
    
    // Get the most recent order (last in the array)
    const order = orders[orders.length - 1];
    
    // Format date for display
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Populate order information
    document.getElementById('orderNumber').textContent = order.id;
    document.getElementById('orderDate').textContent = formattedDate;
    document.getElementById('paymentMethod').textContent = order.paymentMethod;
    document.getElementById('orderTotal').textContent = `₹${order.total.toLocaleString()}`;
    document.getElementById('subtotal').textContent = `₹${order.subtotal.toLocaleString()}`;
    document.getElementById('tax').textContent = `₹${order.tax.toLocaleString()}`;
    document.getElementById('total').textContent = `₹${order.total.toLocaleString()}`;
    
    // Populate shipping information
    const shipping = order.shippingDetails;
    document.getElementById('shippingName').textContent = shipping.fullname;
    document.getElementById('shippingAddress').textContent = shipping.address;
    document.getElementById('shippingCity').textContent = `${shipping.city}, ${shipping.state}, ${shipping.pincode}`;
    document.getElementById('shippingContact').textContent = `${shipping.email} | ${shipping.phone}`;
    
    // Populate ordered items
    const orderItemsContainer = document.getElementById('orderItems');
    
    if (order.items && order.items.length > 0) {
        order.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            
            itemElement.innerHTML = `
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="order-item-details">
                    <h4>${item.name}</h4>
                    <div class="order-item-price">₹${item.price.toLocaleString()}</div>
                    <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                </div>
                <div class="order-item-total">
                    ₹${(item.price * item.quantity).toLocaleString()}
                </div>
            `;
            
            orderItemsContainer.appendChild(itemElement);
        });
    }
    
    // Track Order button (for future implementation)
    const trackOrderBtn = document.getElementById('trackOrderBtn');
    if (trackOrderBtn) {
        trackOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // For now, just show a message that tracking is not implemented
            showNotification('Order tracking will be available soon!', 'info');
        });
    }
});

// Notification function (reused from other scripts)
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
    }, 3000);
    
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
}

// Star rating functionality
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-rating i');
    let selectedRating = 0;
    
    // Set up star rating interactivity
    stars.forEach(star => {
        // Mouseover effect
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
        
        // Mouseout effect - reset to selected rating or clear all
        star.addEventListener('mouseout', function() {
            highlightStars(selectedRating);
        });
        
        // Click to select rating
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-rating'));
            highlightStars(selectedRating);
        });
    });
    
    // Function to highlight stars based on rating
    function highlightStars(rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }
    
    // Submit review functionality
    const submitReviewBtn = document.getElementById('submitReviewBtn');
    if (submitReviewBtn) {
        submitReviewBtn.addEventListener('click', function() {
            const reviewTitle = document.getElementById('review-title').value.trim();
            const reviewText = document.getElementById('review-text').value.trim();
            const recommended = document.querySelector('input[name="recommend"]:checked').value;
            
            // Basic validation
            if (selectedRating === 0) {
                showNotification('Please select a star rating', 'warning');
                return;
            }
            
            if (reviewTitle === '') {
                showNotification('Please add a title for your review', 'warning');
                return;
            }
            
            if (reviewText === '') {
                showNotification('Please add some text to your review', 'warning');
                return;
            }
            
            // Get current order and its items
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            if (orders.length === 0) return;
            
            const currentOrder = orders[orders.length - 1];
            
            // Create review object
            const review = {
                orderId: currentOrder.id,
                rating: selectedRating,
                title: reviewTitle,
                text: reviewText,
                recommended: recommended === 'yes',
                date: new Date().toISOString(),
                items: currentOrder.items.map(item => item.id) // Assuming items have IDs
            };
            
            // Store review in localStorage
            const reviews = JSON.parse(localStorage.getItem('productReviews')) || [];
            reviews.push(review);
            localStorage.setItem('productReviews', JSON.stringify(reviews));
            
            // Show success notification
            showNotification('Thank you for your review!', 'success');
            
            // Reset form
            document.getElementById('review-title').value = '';
            document.getElementById('review-text').value = '';
            document.querySelector('input[name="recommend"][value="yes"]').checked = true;
            selectedRating = 0;
            highlightStars(0);
            
            // Hide the review section after submission
            setTimeout(() => {
                const reviewContainer = document.querySelector('.review-container');
                if (reviewContainer) {
                    reviewContainer.innerHTML = `
                        <div class="review-success">
                            <div class="confirmation-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>Review Submitted</h3>
                            <p>Thank you for sharing your feedback!</p>
                        </div>
                    `;
                }
            }, 1000);
        });
    }
}); 