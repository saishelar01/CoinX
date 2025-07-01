/**
 * Admin Seller Validation Functionality
 * 
 * This script handles the validation interface for reviewing coins submitted by sellers.
 * When sellers submit coins through the seller dashboard (seller-dashboard.php),
 * those submissions are saved to localStorage and displayed here for admin review.
 * 
 * Key features:
 * - Loading and displaying all seller coin submissions
 * - Filtering submissions by status (pending, approved, rejected)
 * - Viewing detailed information about each submission
 * - Approving or rejecting submissions with comments
 * - Reconsidering previously rejected submissions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load seller coin submissions from localStorage
    loadSellerSubmissions();
    
    // Add event listeners to buttons
    attachActionListeners();
});

/**
 * Load seller coin submissions from localStorage
 */
function loadSellerSubmissions() {
    // Get the table body element
    const tableBody = document.querySelector('.data-table tbody');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get coins from localStorage
    const sellerCoins = JSON.parse(localStorage.getItem('coinx_seller_coins')) || [];
    
    // Filter to only show pending coins first, then recently submitted
    const pendingCoins = sellerCoins
        .filter(coin => coin.status === 'pending')
        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    
    const approvedCoins = sellerCoins
        .filter(coin => coin.status === 'approved')
        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    
    const rejectedCoins = sellerCoins
        .filter(coin => coin.status === 'rejected')
        .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    
    // Combine arrays with pending first
    const sortedCoins = [...pendingCoins, ...approvedCoins, ...rejectedCoins];
    
    // Check if there are any submissions
    if (sortedCoins.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No coin validation requests found.</td></tr>';
        return;
    }
    
    // Create a row for each submission
    sortedCoins.forEach((coin, index) => {
        const row = document.createElement('tr');
        
        // Generate a readable ID
        const coinId = `#SC-${new Date(coin.dateAdded).getFullYear()}-${(index + 1).toString().padStart(4, '0')}`;
        
        // Create seller name from sellerId (in a real app, this would come from the database)
        const sellerName = coin.sellerName || 'Seller ' + coin.sellerId;
        
        // Format the price
        const formattedPrice = `₹${coin.price.toLocaleString()}`;
        
        // Create status span with appropriate class
        const statusClass = coin.status.toLowerCase();
        const statusSpan = `<span class="status ${statusClass}">${capitalizeFirstLetter(coin.status)}</span>`;
        
        // Generate action buttons based on status
        let actionButtons = '';
        if (coin.status === 'pending') {
            actionButtons = `
                <div class="action-buttons">
                    <button class="action-btn view-details" data-id="${coin.id}" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="action-btn approve" data-id="${coin.id}" title="Approve"><i class="fas fa-check"></i></button>
                    <button class="action-btn reject" data-id="${coin.id}" title="Reject"><i class="fas fa-times"></i></button>
                </div>
            `;
        } else if (coin.status === 'approved') {
            actionButtons = `
                <div class="action-buttons">
                    <button class="action-btn view-details" data-id="${coin.id}" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="action-btn edit" data-id="${coin.id}" title="Edit"><i class="fas fa-edit"></i></button>
                </div>
            `;
        } else if (coin.status === 'rejected') {
            actionButtons = `
                <div class="action-buttons">
                    <button class="action-btn view-details" data-id="${coin.id}" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="action-btn reconsider" data-id="${coin.id}" title="Reconsider"><i class="fas fa-redo"></i></button>
                </div>
            `;
        }
        
        // Format submission date
        const submissionDate = formatDate(coin.dateAdded);
        
        // Determine coin type
        const coinType = `${coin.material} ${coin.condition}`;
        
        // Set row HTML
        row.innerHTML = `
            <td>${coinId}</td>
            <td>
                <div class="coin-info">
                    <img src="${coin.image}" alt="${coin.name}">
                    <span>${coin.name}</span>
                </div>
            </td>
            <td>${sellerName}</td>
            <td>${coinType}</td>
            <td>${submissionDate}</td>
            <td>${formattedPrice}</td>
            <td>${statusSpan}</td>
            <td>${actionButtons}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

/**
 * Attach event listeners to action buttons
 */
function attachActionListeners() {
    // Show/hide coin validation modal
    const modal = document.getElementById('coinValidationModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Close modal when clicking the X button
    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Filter functionality
    const filterSelect = document.getElementById('statusFilter');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const status = this.value;
            const rows = document.querySelectorAll('.data-table tbody tr');
            
            rows.forEach(row => {
                const statusCell = row.querySelector('.status');
                if (!statusCell) return;
                
                if (status === 'all' || statusCell.textContent.toLowerCase() === status.toLowerCase()) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Delegate clicks to the table
    const table = document.querySelector('.data-table');
    if (table) {
        table.addEventListener('click', function(e) {
            const target = e.target.closest('button');
            if (!target) return;
            
            const coinId = target.getAttribute('data-id');
            const action = target.classList.contains('view-details') ? 'view' :
                           target.classList.contains('approve') ? 'approve' :
                           target.classList.contains('reject') ? 'reject' :
                           target.classList.contains('reconsider') ? 'reconsider' :
                           target.classList.contains('edit') ? 'edit' : null;
            
            if (!action || !coinId) return;
            
            handleCoinAction(action, coinId);
        });
    }
    
    // Add event listeners to modal buttons
    const approveButton = document.querySelector('.modal-footer .btn-success');
    const rejectButton = document.querySelector('.modal-footer .btn-danger');
    
    if (approveButton) {
        approveButton.addEventListener('click', function() {
            const coinId = this.getAttribute('data-id');
            if (coinId) {
                updateCoinStatus(coinId, 'approved');
                modal.style.display = 'none';
            }
        });
    }
    
    if (rejectButton) {
        rejectButton.addEventListener('click', function() {
            const coinId = this.getAttribute('data-id');
            if (coinId) {
                const notes = document.querySelector('.validation-note textarea').value;
                updateCoinStatus(coinId, 'rejected', notes);
                modal.style.display = 'none';
            }
        });
    }
}

/**
 * Handle various actions on coins
 */
function handleCoinAction(action, coinId) {
    // Get coins from localStorage
    const sellerCoins = JSON.parse(localStorage.getItem('coinx_seller_coins')) || [];
    const coin = sellerCoins.find(c => c.id == coinId);
    
    if (!coin) {
        alert('Coin not found!');
        return;
    }
    
    switch(action) {
        case 'view':
            showCoinDetailsModal(coin);
            break;
        case 'approve':
            if (confirm(`Are you sure you want to approve the coin "${coin.name}"?`)) {
                updateCoinStatus(coinId, 'approved');
            }
            break;
        case 'reject':
            showCoinDetailsModal(coin, 'reject');
            break;
        case 'reconsider':
            if (confirm(`Do you want to reconsider the coin "${coin.name}" for validation?`)) {
                updateCoinStatus(coinId, 'pending');
            }
            break;
        case 'edit':
            showNotification('Edit functionality would be implemented in a full version.', 'info');
            break;
    }
}

/**
 * Show coin details in modal
 */
function showCoinDetailsModal(coin, mode = 'view') {
    const modal = document.getElementById('coinValidationModal');
    if (!modal) return;
    
    // Update modal content with coin details
    const mainImage = modal.querySelector('.main-image img');
    const thumbnailContainer = modal.querySelector('.thumbnail-images');
    const coinTitle = modal.querySelector('.coin-info-details h3');
    const sellerValue = modal.querySelector('.info-row:nth-child(2) .value');
    const typeValue = modal.querySelector('.info-row:nth-child(3) .value');
    const weightValue = modal.querySelector('.info-row:nth-child(4) .value'); // Placeholder
    const dimensionsValue = modal.querySelector('.info-row:nth-child(5) .value'); // Placeholder
    const eraValue = modal.querySelector('.info-row:nth-child(6) .value'); // Use period
    const priceValue = modal.querySelector('.info-row:nth-child(7) .value');
    const submissionDateValue = modal.querySelector('.info-row:nth-child(8) .value');
    const statusValue = modal.querySelector('.info-row:nth-child(9) .value');
    const descriptionValue = modal.querySelector('.info-row.full-width:nth-child(10) .value');
    
    // Set the coin ID on the modal buttons
    const approveButton = modal.querySelector('.btn-success');
    const rejectButton = modal.querySelector('.btn-danger');
    
    if (approveButton) approveButton.setAttribute('data-id', coin.id);
    if (rejectButton) rejectButton.setAttribute('data-id', coin.id);
    
    // Update main image
    if (mainImage) mainImage.src = coin.image;
    
    // Update thumbnail images
    if (thumbnailContainer) {
        thumbnailContainer.innerHTML = '';
        
        // Add thumbnails for all images
        const images = coin.images || [coin.image];
        images.forEach((imgSrc, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imgSrc;
            thumbnail.alt = `${coin.name} Image ${index + 1}`;
            if (index === 0) thumbnail.classList.add('active');
            
            thumbnail.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnailContainer.querySelectorAll('img').forEach(t => t.classList.remove('active'));
                // Add active class to clicked thumbnail
                this.classList.add('active');
                // Update main image
                mainImage.src = this.src;
            });
            
            thumbnailContainer.appendChild(thumbnail);
        });
    }
    
    // Update other coin details
    if (coinTitle) coinTitle.textContent = coin.name;
    if (sellerValue) sellerValue.textContent = coin.sellerName || 'Seller ' + coin.sellerId;
    if (typeValue) typeValue.textContent = `${coin.material} (${coin.condition})`;
    if (weightValue) weightValue.textContent = coin.weight || 'Not specified';
    if (dimensionsValue) dimensionsValue.textContent = coin.dimensions || 'Not specified';
    if (eraValue) eraValue.textContent = coin.period || 'Not specified';
    if (priceValue) priceValue.textContent = `₹${coin.price.toLocaleString()}`;
    if (submissionDateValue) submissionDateValue.textContent = formatDate(coin.dateAdded);
    
    if (statusValue) {
        statusValue.className = `value status ${coin.status}`;
        statusValue.textContent = capitalizeFirstLetter(coin.status);
    }
    
    if (descriptionValue) descriptionValue.textContent = coin.description;
    
    // Reset validation notes
    const notesTextarea = modal.querySelector('.validation-note textarea');
    if (notesTextarea) notesTextarea.value = coin.rejectionReason || '';
    
    // Show/hide buttons based on mode
    if (approveButton && rejectButton) {
        if (mode === 'view' && coin.status === 'pending') {
            approveButton.style.display = 'block';
            rejectButton.style.display = 'block';
        } else if (mode === 'reject') {
            approveButton.style.display = 'none';
            rejectButton.style.display = 'block';
        } else {
            approveButton.style.display = 'none';
            rejectButton.style.display = 'none';
        }
    }
    
    // Show the modal
    modal.style.display = 'flex';
}

/**
 * Update coin status in localStorage
 */
function updateCoinStatus(coinId, status, rejectionReason = '') {
    // Get coins from localStorage
    const sellerCoins = JSON.parse(localStorage.getItem('coinx_seller_coins')) || [];
    
    // Find the coin
    const coinIndex = sellerCoins.findIndex(c => c.id == coinId);
    
    if (coinIndex === -1) {
        showNotification('Coin not found!', 'error');
        return;
    }
    
    // Get the coin name for notifications
    const coinName = sellerCoins[coinIndex].name;
    
    // Update status
    sellerCoins[coinIndex].status = status;
    
    // Add rejection reason if provided
    if (rejectionReason && status === 'rejected') {
        sellerCoins[coinIndex].rejectionReason = rejectionReason;
    }
    
    // Save back to localStorage
    localStorage.setItem('coinx_seller_coins', JSON.stringify(sellerCoins));
    
    // Show notification
    if (status === 'approved') {
        showNotification(`${coinName} has been approved successfully!`, 'success');
    } else if (status === 'rejected') {
        showNotification(`${coinName} has been rejected.`, 'error');
    } else if (status === 'pending') {
        showNotification(`${coinName} has been moved back to pending review.`, 'info');
    }
    
    // Reload the table
    loadSellerSubmissions();
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Check if notification container exists, if not create it
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Add icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    // Set notification content
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="close-notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Make notification visible after a small delay
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('active');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

/**
 * Format date to readable string
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

/**
 * Capitalize first letter of a string
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 