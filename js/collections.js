document.addEventListener('DOMContentLoaded', function() {
    // Notification function
    function showNotification(message) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        // Set message and show notification
        notification.textContent = message;
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Handle search parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
        // Show search notification
        setTimeout(() => {
            showNotification(`Showing results for: ${searchQuery}`);
        }, 500);
        
        // Filter products based on search query
        const productCards = document.querySelectorAll('.product-card');
        let resultsFound = 0;
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDesc = card.querySelector('.product-desc').textContent.toLowerCase();
            
            if (productName.includes(searchQuery.toLowerCase()) || 
                productDesc.includes(searchQuery.toLowerCase())) {
                card.style.display = 'block';
                resultsFound++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show message if no results found
        if (resultsFound === 0) {
            const noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.innerHTML = `
                <p>No results found for "${searchQuery}"</p>
                <button class="btn primary-btn" id="clearSearchBtn">Clear Search</button>
            `;
            
            const productGrid = document.querySelector('.product-grid');
            productGrid.parentNode.insertBefore(noResultsMsg, productGrid);
            
            // Add event listener to clear search button
            document.getElementById('clearSearchBtn').addEventListener('click', function() {
                window.location.href = 'collections.php';
            });
        }
        
        // Add search term display and clear option at the top of the collection
        const searchDisplay = document.createElement('div');
        searchDisplay.className = 'search-display';
        searchDisplay.innerHTML = `
            <p>Search results for: <strong>${searchQuery}</strong></p>
            <button class="clear-search-btn">Clear Search</button>
        `;
        
        const allCoinsSection = document.querySelector('.all-coins .container');
        allCoinsSection.insertBefore(searchDisplay, allCoinsSection.firstChild);
        
        // Add event listener to clear search button
        document.querySelector('.clear-search-btn').addEventListener('click', function() {
            window.location.href = 'collections.php';
        });
        
        // Add style for search display
        const searchDisplayStyle = document.createElement('style');
        searchDisplayStyle.textContent = `
            .search-display {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding: 10px 15px;
                background-color: #f8f9fa;
                border-radius: 5px;
            }
            
            .search-display p {
                margin: 0;
            }
            
            .clear-search-btn {
                background: none;
                border: none;
                color: var(--primary-color);
                cursor: pointer;
                font-weight: bold;
            }
            
            .no-results-message {
                text-align: center;
                padding: 40px 20px;
                margin: 20px 0;
                background-color: #f8f9fa;
                border-radius: 5px;
            }
            
            .no-results-message p {
                margin-bottom: 20px;
                font-size: 18px;
                color: #666;
            }
        `;
        document.head.appendChild(searchDisplayStyle);
    }
    
    // Add CSS for notification and bump animation
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
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
    `;
    document.head.appendChild(style);
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');
    const productCards = document.querySelectorAll('.product-card');

    // Function to apply filters
    function applyFilters() {
        const category = categoryFilter.value;
        const priceRange = priceFilter.value;
        const sortBy = sortFilter.value;

        // For demonstration purposes, we'll just log the filter values
        console.log('Filters applied:', { category, priceRange, sortBy });
        
        // In a real application, you would filter the products based on these values
        // For now, we'll just show a notification
        showNotification('Filters applied successfully!');
    }

    // Add event listeners to filters
    if (categoryFilter && priceFilter && sortFilter) {
        categoryFilter.addEventListener('change', applyFilters);
        priceFilter.addEventListener('change', applyFilters);
        sortFilter.addEventListener('change', applyFilters);
    }

    // Product card click to show modal
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on action buttons
            if (e.target.closest('.product-actions')) {
                return;
            }
            
            const productName = this.querySelector('h3').textContent;
            const productImage = this.querySelector('.product-image img').src;
            const productDesc = this.querySelector('.product-desc').textContent;
            const productPrice = this.querySelector('.price').textContent;
            
            // Set modal content
            document.getElementById('modalCoinName').textContent = productName;
            document.getElementById('modalCoinImage').src = productImage;
            document.getElementById('modalDescription').textContent = productDesc;
            document.getElementById('modalPrice').textContent = productPrice;
            
            // Set some example coin information
            document.getElementById('modalPeriod').textContent = '16th-19th Century';
            document.getElementById('modalMaterial').textContent = 'Gold/Silver';
            document.getElementById('modalWeight').textContent = '8.5g';
            document.getElementById('modalDiameter').textContent = '22mm';
            document.getElementById('modalCondition').textContent = 'Excellent';
            
            // Show modal
            document.getElementById('coinModal').style.display = 'flex';
        });
    });

    // Close modal when clicking on close button or outside the modal
    const modal = document.getElementById('coinModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Quantity selector in modal
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.getElementById('coinQuantity');
    
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
    }

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const modalAddToCart = document.querySelector('.modal-add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = parseInt(cartCount ? cartCount.textContent : '0');
    
    function updateCart() {
        count++;
        cartCount.textContent = count;
        
        // Animation effect
        cartCount.classList.add('bump');
        setTimeout(() => {
            cartCount.classList.remove('bump');
        }, 300);
        
        showNotification('Item added to cart!');
    }
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent opening the modal
            updateCart();
        });
    });
    
    if (modalAddToCart) {
        modalAddToCart.addEventListener('click', function() {
            updateCart();
            modal.style.display = 'none';
        });
    }

    // Buy now button
    const buyNowBtn = document.querySelector('.modal-buy-now');
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            const coinName = document.getElementById('modalCoinName').textContent;
            const quantity = parseInt(quantityInput.value);
            
            // Check if user is logged in
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            
            if (isLoggedIn === 'true') {
                // User is logged in, proceed to checkout
                showNotification('Proceeding to checkout...');
                
                setTimeout(() => {
                    modal.style.display = 'none';
                    // Simulate checkout redirect
                    window.location.href = `checkout.php?coin=${encodeURIComponent(coinName)}&quantity=${quantity}`;
                }, 1500);
            } else {
                // User is not logged in, redirect to login page
                showNotification('Please login to continue with purchase');
                
                setTimeout(() => {
                    modal.style.display = 'none';
                    // Store purchase intent in session storage
                    sessionStorage.setItem('pendingPurchase', JSON.stringify({
                        coinName,
                        quantity,
                        timestamp: new Date().toISOString()
                    }));
                    // Redirect to login page
                    window.location.href = 'user-login.php';
                }, 1500);
            }
        });
    }

    // Pagination functionality (for demonstration)
    const paginationItems = document.querySelectorAll('.pagination-item');
    
    paginationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            paginationItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            if (!this.classList.contains('next')) {
                this.classList.add('active');
            }
            
            // In a real application, you would load the next page of products
            showNotification('Loading page ' + this.textContent + '...');
        });
    });
}); 