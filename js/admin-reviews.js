document.addEventListener('DOMContentLoaded', function() {
    // Get reviews from localStorage
    const reviews = JSON.parse(localStorage.getItem('productReviews')) || [];
    
    // Get DOM elements
    const reviewsList = document.getElementById('reviewsList');
    const noReviews = document.getElementById('noReviews');
    const totalReviewsElem = document.getElementById('totalReviews');
    const averageRatingElem = document.getElementById('averageRating');
    const positiveReviewsElem = document.getElementById('positiveReviews');
    const negativeReviewsElem = document.getElementById('negativeReviews');
    const ratingFilter = document.getElementById('ratingFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    // Modal elements
    const deleteModal = document.getElementById('deleteModal');
    const closeDeleteModal = document.getElementById('closeDeleteModal');
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');
    let currentReviewToDelete = null;
    
    // Initialize the reviews display
    initReviews();
    
    // Event listeners for filters
    if (ratingFilter) {
        ratingFilter.addEventListener('change', filterReviews);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', filterReviews);
    }
    
    // Modal event listeners
    if (closeDeleteModal) {
        closeDeleteModal.addEventListener('click', function() {
            deleteModal.style.display = 'none';
        });
    }
    
    if (cancelDelete) {
        cancelDelete.addEventListener('click', function() {
            deleteModal.style.display = 'none';
        });
    }
    
    if (confirmDelete) {
        confirmDelete.addEventListener('click', deleteReview);
    }
    
    // Initialize reviews display
    function initReviews() {
        if (reviews.length === 0) {
            // Show no reviews message
            if (noReviews) noReviews.style.display = 'block';
            if (reviewsList) reviewsList.style.display = 'none';
            updateStats();
            return;
        }
        
        // Hide no reviews message, show reviews list
        if (noReviews) noReviews.style.display = 'none';
        if (reviewsList) reviewsList.style.display = 'block';
        
        // Sort reviews by newest first (default)
        reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Update statistics
        updateStats();
        
        // Display reviews
        displayReviews(reviews);
    }
    
    // Update review statistics
    function updateStats() {
        const totalReviews = reviews.length;
        let totalRating = 0;
        let positiveReviews = 0;
        let negativeReviews = 0;
        
        reviews.forEach(review => {
            totalRating += review.rating;
            if (review.rating >= 4) {
                positiveReviews++;
            } else if (review.rating <= 2) {
                negativeReviews++;
            }
        });
        
        const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0.0';
        
        // Update DOM elements
        if (totalReviewsElem) totalReviewsElem.textContent = totalReviews;
        if (averageRatingElem) {
            const ratingSpan = averageRatingElem.querySelector('span');
            if (ratingSpan) ratingSpan.textContent = averageRating;
            
            // Update stars visualization
            const stars = averageRatingElem.querySelectorAll('.stars i');
            if (stars) {
                stars.forEach((star, index) => {
                    const starValue = index + 1;
                    if (starValue <= Math.round(averageRating)) {
                        star.className = 'fas fa-star';
                    } else {
                        star.className = 'far fa-star';
                    }
                });
            }
        }
        
        if (positiveReviewsElem) positiveReviewsElem.textContent = positiveReviews;
        if (negativeReviewsElem) negativeReviewsElem.textContent = negativeReviews;
    }
    
    // Display reviews in the list
    function displayReviews(reviewsToDisplay) {
        if (!reviewsList) return;
        
        // Clear current reviews
        reviewsList.innerHTML = '';
        
        // Add each review to the list
        reviewsToDisplay.forEach((review, index) => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.dataset.reviewIndex = index;
            
            // Format date
            const reviewDate = new Date(review.date);
            const formattedDate = reviewDate.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            // Get initials or use default
            const userInitial = 'U';
            
            // Generate stars HTML
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= review.rating) {
                    starsHTML += '<i class="fas fa-star"></i>';
                } else {
                    starsHTML += '<i class="far fa-star"></i>';
                }
            }
            
            // Get order details
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            let orderInfo = 'Unknown Order';
            for (const order of orders) {
                if (order.id === review.orderId) {
                    const itemNames = order.items.map(item => item.name).join(', ');
                    orderInfo = itemNames;
                    break;
                }
            }
            
            // Review title or default
            const reviewTitle = review.title || 'Review';
            
            reviewItem.innerHTML = `
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="reviewer-name-date">
                            <div class="reviewer-name">Customer</div>
                            <div class="review-date">${formattedDate}</div>
                        </div>
                    </div>
                    <div class="review-rating">
                        <div class="stars">${starsHTML}</div>
                        <div class="review-product">
                            <i class="fas fa-coins"></i> ${orderInfo}
                        </div>
                    </div>
                </div>
                <div class="review-content">
                    <div class="review-title">${reviewTitle}</div>
                    <div class="review-text">${review.text}</div>
                </div>
                <div class="review-actions-btns">
                    <button class="review-action-btn delete" data-review-index="${index}">
                        <i class="fas fa-trash-alt"></i> Delete
                    </button>
                </div>
            `;
            
            reviewsList.appendChild(reviewItem);
        });
        
        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll('.review-action-btn.delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.reviewIndex);
                openDeleteModal(index);
            });
        });
    }
    
    // Filter reviews based on selected filters
    function filterReviews() {
        const ratingValue = ratingFilter.value;
        const dateValue = dateFilter.value;
        
        // Create a copy of reviews for filtering
        let filteredReviews = [...reviews];
        
        // Apply rating filter
        if (ratingValue) {
            filteredReviews = filteredReviews.filter(review => review.rating === parseInt(ratingValue));
        }
        
        // Apply date sorting
        if (dateValue === 'oldest') {
            filteredReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
            filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        
        // Display filtered reviews
        displayReviews(filteredReviews);
        
        // Show/hide no reviews message
        if (filteredReviews.length === 0) {
            if (noReviews) noReviews.style.display = 'block';
            if (reviewsList) reviewsList.style.display = 'none';
        } else {
            if (noReviews) noReviews.style.display = 'none';
            if (reviewsList) reviewsList.style.display = 'block';
        }
    }
    
    // Open delete confirmation modal
    function openDeleteModal(index) {
        currentReviewToDelete = index;
        if (deleteModal) {
            deleteModal.style.display = 'flex';
        }
    }
    
    // Delete review
    function deleteReview() {
        if (currentReviewToDelete !== null) {
            // Remove review from array
            reviews.splice(currentReviewToDelete, 1);
            
            // Update localStorage
            localStorage.setItem('productReviews', JSON.stringify(reviews));
            
            // Close modal
            deleteModal.style.display = 'none';
            
            // Refresh view
            initReviews();
        }
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === deleteModal) {
            deleteModal.style.display = 'none';
        }
    });
}); 