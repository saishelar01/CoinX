// Function to fetch coins from database and display them in the featured section
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page with the featured coins container
    const featuredCoinsContainer = document.getElementById('featured-coins-container');
    if (featuredCoinsContainer) {
        fetchFeaturedCoins();
    }
});

// Fetch featured coins from the database
function fetchFeaturedCoins() {
    // This would typically be an AJAX/fetch call to a backend API
    // that connects to the 'coins' database
    // For this dummy example, we'll simulate the response
    
    // Simulate API call with setTimeout
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading-indicator';
    loadingElement.textContent = 'Loading coins...';
    document.getElementById('featured-coins-container').appendChild(loadingElement);
    
    setTimeout(() => {
        // Simulated response from database named 'coins'
        const coins = [
            {
                id: 1,
                name: 'Gupta Dynasty Gold Dinar',
                image: 'image/gupta_dinar.jpg',
                description: 'Rare 4th century gold coin from the Gupta Empire of ancient India.',
                price: '10,000 /-',
                oldPrice: null,
                badge: 'Rare',
                rating: 4.5,
                ratingCount: 24,
                period: '4th Century',
                material: 'Gold',
                weight: '8.4g',
                diameter: '21mm',
                condition: 'Excellent'
            },
            {
                id: 2,
                name: 'Akbar Silver Rupee',
                image: 'image/akbar_rupee.jpg',
                description: '16th century silver coin from Emperor Akbar\'s reign in the Mughal Empire.',
                price: '10,000 /-',
                oldPrice: null,
                badge: 'Limited',
                rating: 5,
                ratingCount: 42,
                period: '16th Century',
                material: 'Silver',
                weight: '11.2g',
                diameter: '25mm',
                condition: 'Very Good'
            },
            {
                id: 3,
                name: '1947 Independence Rupee',
                image: 'image/independence_rupee.jpg',
                description: 'Commemorative coin marking Indian independence - extremely rare.',
                price: '10,000 /-',
                oldPrice: null,
                badge: 'New',
                rating: 4,
                ratingCount: 18,
                period: '20th Century',
                material: 'Silver',
                weight: '10g',
                diameter: '28mm',
                condition: 'Mint'
            },
            {
                id: 4,
                name: 'Jahangir\'s Eid Mohur',
                image: 'image/eid_mohur.jpg',
                description: 'Extremely rare Mughal gold coin minted during Jahangir\'s reign.',
                price: '10,000 /-',
                oldPrice: '12,500 /-',
                badge: 'Sale',
                rating: 3.5,
                ratingCount: 9,
                period: '17th Century',
                material: 'Gold',
                weight: '12.5g',
                diameter: '22mm',
                condition: 'Good'
            }
        ];
        
        displayCoins(coins);
    }, 1000); // Simulate network delay
}

// Display the coins in the featured section
function displayCoins(coins) {
    const container = document.getElementById('featured-coins-container');
    container.innerHTML = ''; // Clear loading indicator or any previous content
    
    coins.forEach(coin => {
        const coinElement = createCoinElement(coin);
        container.appendChild(coinElement);
    });
    
    // Attach event listeners for the coin modal
    attachCoinModalEvents();
}

// Create HTML element for a coin
function createCoinElement(coin) {
    const coinCard = document.createElement('div');
    coinCard.className = 'product-card';
    coinCard.dataset.coinId = coin.id;
    coinCard.dataset.coinName = coin.name;
    coinCard.dataset.coinImage = coin.image;
    coinCard.dataset.coinDescription = coin.description;
    coinCard.dataset.coinPrice = coin.price;
    coinCard.dataset.coinOldPrice = coin.oldPrice || '';
    coinCard.dataset.coinRating = coin.rating;
    coinCard.dataset.coinRatingCount = coin.ratingCount;
    coinCard.dataset.coinPeriod = coin.period;
    coinCard.dataset.coinMaterial = coin.material;
    coinCard.dataset.coinWeight = coin.weight;
    coinCard.dataset.coinDiameter = coin.diameter;
    coinCard.dataset.coinCondition = coin.condition;
    
    coinCard.innerHTML = `
        ${coin.badge ? `<div class="product-badge">${coin.badge}</div>` : ''}
        <div class="product-image">
            <img src="${coin.image}" alt="${coin.name}">
            <div class="product-actions">
                <button class="action-btn"><i class="fas fa-heart"></i></button>
                <button class="action-btn add-to-cart"><i class="fas fa-shopping-cart"></i></button>
            </div>
        </div>
        <div class="product-info">
            <h3>${coin.name}</h3>
            <div class="product-rating">
                ${generateRatingStars(coin.rating)}
                <span>(${coin.ratingCount})</span>
            </div>
            <p class="product-desc">${coin.description}</p>
            <div class="product-price">
                ${coin.oldPrice ? `<span class="old-price">${coin.oldPrice}</span>` : ''}
                ${coin.price ? `<span class="price">₹${coin.price}</span>` : ''}
            </div>
        </div>
        <div class="view-details">
            <span>Click to view details</span>
        </div>
    `;
    
    return coinCard;
}

// Generate HTML for rating stars
function generateRatingStars(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    
    return starsHtml;
}

// Attach event listeners for coin modal
function attachCoinModalEvents() {
    const coinCards = document.querySelectorAll('.product-card');
    const modal = document.getElementById('coinModal');
    const closeBtn = document.querySelector('.close-modal');
    
    coinCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.action-btn')) {
                openCoinModal(this);
            }
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Quantity selector in modal
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.getElementById('coinQuantity');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            if (quantityInput.value < 10) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
            }
        });
    }
    
    // Add to cart button in modal
    const addToCartBtn = document.querySelector('.modal-add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityInput.value);
            const coinId = modal.dataset.currentCoinId;
            addToCart(coinId, quantity);
            modal.style.display = 'none';
        });
    }
    
    // Buy now button in modal
    const buyNowBtn = document.querySelector('.modal-buy-now');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityInput.value);
            const coinId = modal.dataset.currentCoinId;
            buyNow(coinId, quantity);
        });
    }
}

// Open coin modal with details
function openCoinModal(coinCard) {
    const modal = document.getElementById('coinModal');
    const modalImage = document.getElementById('modalCoinImage');
    const modalName = document.getElementById('modalCoinName');
    const modalRatingCount = document.getElementById('modalRatingCount');
    const modalOldPrice = document.getElementById('modalOldPrice');
    const modalPrice = document.getElementById('modalPrice');
    const modalDescription = document.getElementById('modalDescription');
    const modalPeriod = document.getElementById('modalPeriod');
    const modalMaterial = document.getElementById('modalMaterial');
    const modalWeight = document.getElementById('modalWeight');
    const modalDiameter = document.getElementById('modalDiameter');
    const modalCondition = document.getElementById('modalCondition');
    
    modalImage.src = coinCard.dataset.coinImage;
    modalName.textContent = coinCard.dataset.coinName;
    modalRatingCount.textContent = `(${coinCard.dataset.coinRatingCount})`;
    modalOldPrice.textContent = coinCard.dataset.coinOldPrice;
    modalPrice.textContent = coinCard.dataset.coinPrice;
    modalDescription.textContent = coinCard.dataset.coinDescription;
    modalPeriod.textContent = coinCard.dataset.coinPeriod;
    modalMaterial.textContent = coinCard.dataset.coinMaterial;
    modalWeight.textContent = coinCard.dataset.coinWeight;
    modalDiameter.textContent = coinCard.dataset.coinDiameter;
    modalCondition.textContent = coinCard.dataset.coinCondition;
    
    // Set current coin ID on the modal
    modal.dataset.currentCoinId = coinCard.dataset.coinId;
    
    // Reset quantity input
    document.getElementById('coinQuantity').value = 1;
    
    // Show the modal
    modal.style.display = 'block';
}

// Add to cart function
function addToCart(coinId, quantity) {
    console.log(`Added coin ID ${coinId} to cart with quantity ${quantity}`);
    // In a real application, this would send data to the server
    // and update the cart count
    
    // Update cart count in the header
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + quantity;
    }
}

// Buy now function
function buyNow(coinId, quantity) {
    console.log(`Buying coin ID ${coinId} with quantity ${quantity}`);
    // In a real application, this would redirect to checkout
    // or open a checkout modal
    window.location.href = `checkout.php?coin=${coinId}&quantity=${quantity}`;
} 