/**
 * Seller Dashboard Functionality
 * 
 * This script handles all functionality for the seller dashboard, including:
 * - Adding new coins for sale (which are sent to admin for validation)
 * - Viewing and managing existing coin listings
 * - Handling orders and managing seller profile
 * 
 * When a seller submits a coin through the form, it is saved to localStorage and
 * appears on the admin validation page (admin-seller-validation.php) for review.
 * Admins can approve or reject these submissions from that interface.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('coinx_seller_logged_in') || sessionStorage.getItem('coinx_seller_logged_in');
    if (!isLoggedIn) {
        window.location.href = 'seller-login.php';
        return;
    }

    // Set seller name
    const sellerName = localStorage.getItem('coinx_seller_name') || 'Seller';
    document.getElementById('sellerName').textContent = sellerName;

    // Navigation links functionality
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            const sections = document.querySelectorAll('.dashboard-section');
            sections.forEach(section => section.classList.remove('active'));
            
            // Show the corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear session
        localStorage.removeItem('coinx_seller_logged_in');
        sessionStorage.removeItem('coinx_seller_logged_in');
        
        // Redirect to login page
        window.location.href = 'seller-login.php';
    });

    // Load seller's coins
    loadSellerCoins();
    
    // Set up refresh coins button
    const refreshCoinsBtn = document.getElementById('refreshCoins');
    if (refreshCoinsBtn) {
        refreshCoinsBtn.addEventListener('click', function() {
            loadSellerCoins();
            // Show notification
            alert('Coin list refreshed!');
        });
    }
    
    // Add coin form submission
    const addCoinForm = document.getElementById('addCoinForm');
    if (addCoinForm) {
        addCoinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const coinName = document.getElementById('coinName').value;
            const period = document.getElementById('period').value;
            const material = document.getElementById('material').value;
            const condition = document.getElementById('condition').value;
            const price = document.getElementById('price').value;
            const quantity = document.getElementById('quantity').value;
            const description = document.getElementById('description').value;
            
            // Get image files
            const imageFiles = document.getElementById('coinImages').files;
            let coinImages = [];
            
            // For demo purposes, we'll just use placeholders for images
            // In a real app, these would be uploaded to a server
            if (imageFiles.length > 0) {
                for (let i = 0; i < Math.min(imageFiles.length, 4); i++) {
                    // In a real app, we would upload the files and get URLs back
                    // For demo, we'll use placeholders with the coin name
                    coinImages.push(`https://via.placeholder.com/400x400?text=${encodeURIComponent(coinName)}`);
                }
            } else {
                // Default placeholder if no images provided
                coinImages.push('https://via.placeholder.com/400x400?text=No+Image');
            }
            
            // For demo purposes, we'll create a simple object and add it to localStorage
            const newCoin = {
                id: Date.now(), // Use timestamp as ID
                name: coinName,
                period: period,
                material: material,
                condition: condition,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                description: description,
                status: 'pending',
                dateAdded: new Date().toISOString().split('T')[0],
                sellerId: 'seller123', // In a real app, this would be the actual seller ID
                sellerName: localStorage.getItem('coinx_seller_name') || 'Demo Seller',
                image: coinImages[0], // Main image (first one)
                images: coinImages // All images
            };
            
            // Get existing coins from localStorage
            let sellerCoins = JSON.parse(localStorage.getItem('coinx_seller_coins')) || [];
            
            // Add new coin
            sellerCoins.push(newCoin);
            
            // Save back to localStorage
            localStorage.setItem('coinx_seller_coins', JSON.stringify(sellerCoins));
            
            // Show success message
            alert('Coin submitted successfully! It is now pending review.');
            
            // Reset form
            addCoinForm.reset();
            
            // Reload coins list
            loadSellerCoins();
            
            // Update dashboard stats
            updateDashboardStats();
            
            // Add activity to recent activity
            addRecentActivity('New Coin Added', `You added a new coin: ${coinName}`, new Date());
            
            // Switch to My Coins section
            document.querySelector('.nav-link[data-section="my-coins"]').click();
        });
    }
    
    // Initialize dashboard stats
    updateDashboardStats();
});

// Function to load seller's coins
function loadSellerCoins() {
    const myCoinsList = document.getElementById('myCoinsList');
    
    if (!myCoinsList) return;
    
    // Clear the list first
    myCoinsList.innerHTML = '';
    
    // Get coins from localStorage
    const sellerCoins = JSON.parse(localStorage.getItem('coinx_seller_coins')) || [];
    
    // Check if there are any coins
    if (sellerCoins.length === 0) {
        myCoinsList.innerHTML = '<tr><td colspan="6" class="no-data">You haven\'t added any coins yet.</td></tr>';
        return;
    }
    
    // Populate the table with coins
    sellerCoins.forEach(coin => {
        const row = document.createElement('tr');
        
        // Format the status display
        let statusDisplay = `<span class="status-${coin.status.toLowerCase()}">${capitalizeFirstLetter(coin.status)}</span>`;
        
        row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name}" class="coin-image"></td>
            <td>${coin.name}<br><small>${coin.period} • ${coin.material}</small></td>
            <td>₹${coin.price.toLocaleString()}</td>
            <td>${statusDisplay}</td>
            <td>${formatDate(coin.dateAdded)}</td>
            <td class="action-buttons">
                <button class="edit-btn" data-id="${coin.id}"><i class="fas fa-edit"></i> Edit</button>
                <button class="delete-btn" data-id="${coin.id}"><i class="fas fa-trash"></i> Delete</button>
            </td>
        `;
        
        myCoinsList.appendChild(row);
    });
    
    // Add event listeners to action buttons
    attachActionButtonListeners();
}

// Function to update dashboard stats
function updateDashboardStats() {
    // Get coins from localStorage
    const sellerCoins = JSON.parse(localStorage.getItem('coinx_seller_coins')) || [];
    
    // Update total coins count
    const totalCoinsElement = document.getElementById('totalCoins');
    if (totalCoinsElement) {
        totalCoinsElement.textContent = sellerCoins.length;
    }
    
    // Calculate total revenue (for demo purposes, we'll just sum up approved coins)
    const approvedCoins = sellerCoins.filter(coin => coin.status === 'approved');
    const totalRevenue = approvedCoins.reduce((sum, coin) => sum + coin.price, 0);
    
    // Update total revenue
    const totalRevenueElement = document.getElementById('totalRevenue');
    if (totalRevenueElement) {
        totalRevenueElement.textContent = `₹${totalRevenue.toLocaleString()}`;
    }
}

// Function to attach action button listeners
function attachActionButtonListeners() {
    // Edit buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const coinId = this.getAttribute('data-id');
            editCoin(coinId);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const coinId = this.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this coin?')) {
                deleteCoin(coinId);
            }
        });
    });
}

// Function to edit a coin
function editCoin(coinId) {
    // Get coins from localStorage
    const sellerCoins = JSON.parse(localStorage.getItem('coinx_seller_coins')) || [];
    
    // Find the coin
    const coin = sellerCoins.find(c => c.id == coinId);
    
    if (!coin) {
        alert('Coin not found!');
        return;
    }
    
    // Switch to add coin section
    document.querySelector('.nav-link[data-section="add-coin"]').click();
    
    // Fill form with coin data
    document.getElementById('coinName').value = coin.name;
    document.getElementById('period').value = coin.period;
    document.getElementById('material').value = coin.material;
    document.getElementById('condition').value = coin.condition;
    document.getElementById('price').value = coin.price;
    document.getElementById('quantity').value = coin.quantity;
    document.getElementById('description').value = coin.description;
    
    // Change form submit button to update
    const submitBtn = document.querySelector('#addCoinForm button[type="submit"]');
    submitBtn.textContent = 'Update Coin';
    
    // Add coin ID to form as a data attribute
    document.getElementById('addCoinForm').setAttribute('data-editing-id', coinId);
    
    // Change form submit event temporarily
    const oldSubmitHandler = document.getElementById('addCoinForm').onsubmit;
    document.getElementById('addCoinForm').onsubmit = function(e) {
        e.preventDefault();
        
        // Get form data
        const coinName = document.getElementById('coinName').value;
        const period = document.getElementById('period').value;
        const material = document.getElementById('material').value;
        const condition = document.getElementById('condition').value;
        const price = document.getElementById('price').value;
        const quantity = document.getElementById('quantity').value;
        const description = document.getElementById('description').value;
        
        // Get coins from localStorage
        let sellerCoins = JSON.parse(localStorage.getItem('coinx_seller_coins')) || [];
        
        // Find the coin index
        const coinIndex = sellerCoins.findIndex(c => c.id == coinId);
        
        if (coinIndex === -1) {
            alert('Coin not found!');
            return;
        }
        
        // Update coin data
        sellerCoins[coinIndex].name = coinName;
        sellerCoins[coinIndex].period = period;
        sellerCoins[coinIndex].material = material;
        sellerCoins[coinIndex].condition = condition;
        sellerCoins[coinIndex].price = parseFloat(price);
        sellerCoins[coinIndex].quantity = parseInt(quantity);
        sellerCoins[coinIndex].description = description;
        sellerCoins[coinIndex].status = 'pending'; // Reset status to pending after edit
        
        // Save back to localStorage
        localStorage.setItem('coinx_seller_coins', JSON.stringify(sellerCoins));
        
        // Show success message
        alert('Coin updated successfully! It is now pending review again.');
        
        // Reset form
        document.getElementById('addCoinForm').reset();
        
        // Change button text back
        submitBtn.textContent = 'Submit Coin for Review';
        
        // Remove editing ID
        document.getElementById('addCoinForm').removeAttribute('data-editing-id');
        
        // Restore original submit handler
        document.getElementById('addCoinForm').onsubmit = oldSubmitHandler;
        
        // Reload coins list
        loadSellerCoins();
        
        // Update dashboard stats
        updateDashboardStats();
        
        // Add activity to recent activity
        addRecentActivity('Coin Updated', `You updated your coin: ${coinName}`, new Date());
        
        // Switch to My Coins section
        document.querySelector('.nav-link[data-section="my-coins"]').click();
    };
}

// Function to delete a coin
function deleteCoin(coinId) {
    // Get coins from localStorage
    let sellerCoins = JSON.parse(localStorage.getItem('coinx_seller_coins')) || [];
    
    // Find the coin to get its name before deletion
    const coin = sellerCoins.find(c => c.id == coinId);
    if (!coin) {
        alert('Coin not found!');
        return;
    }
    
    const coinName = coin.name;
    
    // Filter out the coin to delete
    sellerCoins = sellerCoins.filter(c => c.id != coinId);
    
    // Save back to localStorage
    localStorage.setItem('coinx_seller_coins', JSON.stringify(sellerCoins));
    
    // Show success message
    alert('Coin deleted successfully!');
    
    // Reload coins list
    loadSellerCoins();
    
    // Update dashboard stats
    updateDashboardStats();
    
    // Add activity to recent activity
    addRecentActivity('Coin Deleted', `You deleted your coin: ${coinName}`, new Date());
}

// Function to add a recent activity
function addRecentActivity(title, description, time) {
    const recentActivityList = document.getElementById('recentActivityList');
    
    if (!recentActivityList) return;
    
    // Create new activity element
    const activityItem = document.createElement('li');
    
    // Determine icon based on activity title
    let iconClass = 'fas fa-info-circle';
    if (title.includes('Added')) {
        iconClass = 'fas fa-plus';
    } else if (title.includes('Updated')) {
        iconClass = 'fas fa-edit';
    } else if (title.includes('Deleted')) {
        iconClass = 'fas fa-trash';
    } else if (title.includes('Approved')) {
        iconClass = 'fas fa-check-circle';
    } else if (title.includes('Rejected')) {
        iconClass = 'fas fa-times-circle';
    }
    
    // Format the time display
    const timeDisplay = formatTimeAgo(time);
    
    activityItem.innerHTML = `
        <i class="${iconClass}"></i>
        <div class="activity-content">
            <h4>${title}</h4>
            <p>${description}</p>
        </div>
        <span class="activity-time">${timeDisplay}</span>
    `;
    
    // Add to the beginning of the list
    recentActivityList.insertBefore(activityItem, recentActivityList.firstChild);
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Helper function to format time ago
function formatTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
    
    if (diffInSeconds < 60) {
        return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
} 