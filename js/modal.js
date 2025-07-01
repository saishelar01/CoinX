// Handle coin modal interactions
document.addEventListener('DOMContentLoaded', function() {
    attachCoinModalEvents();
});

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
    // In a real application, this would send data to the server via AJAX
    // and update the cart count
    
    // Make AJAX request to add item to cart
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'add_to_cart.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (this.status === 200) {
            // Update cart count in the header
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const currentCount = parseInt(cartCount.textContent);
                cartCount.textContent = currentCount + quantity;
            }
        }
    };
    xhr.send(`coin_id=${coinId}&quantity=${quantity}`);
}

// Buy now function
function buyNow(coinId, quantity) {
    console.log(`Buying coin ID ${coinId} with quantity ${quantity}`);
    // In a real application, this would redirect to checkout
    // or open a checkout modal
    window.location.href = `checkout.php?coin_id=${coinId}&quantity=${quantity}`;
} 