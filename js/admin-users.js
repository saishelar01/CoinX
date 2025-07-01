document.addEventListener('DOMContentLoaded', function() {
    // Load users data when page loads
    loadUsers();
    
    // Set up event listeners
    document.getElementById('refreshUsers').addEventListener('click', loadUsers);
    document.getElementById('userSearch').addEventListener('input', filterUsers);
    
    // Set up modal close buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // Set up delete user button
    document.getElementById('deleteUserBtn').addEventListener('click', function() {
        document.getElementById('userDetailsModal').classList.remove('active');
        document.getElementById('deleteConfirmModal').classList.add('active');
    });
    
    // Set up confirm delete button
    document.getElementById('confirmDeleteBtn').addEventListener('click', deleteUser);
    
    // Add reset deleted users button to the header actions
    const headerActions = document.querySelector('.header-actions');
    const resetButton = document.createElement('button');
    resetButton.className = 'btn secondary';
    resetButton.innerHTML = '<i class="fas fa-trash-restore"></i> Reset Deleted';
    resetButton.id = 'resetDeletedUsers';
    resetButton.addEventListener('click', resetDeletedUsers);
    headerActions.appendChild(resetButton);
});

// Global variable to store current user ID for deletion
let currentUserId = null;

// Function to get deleted user ids from localStorage
function getDeletedUserIds() {
    const deletedUsers = localStorage.getItem('deletedUsers');
    return deletedUsers ? JSON.parse(deletedUsers) : [];
}

// Function to render users table
function renderUsersTable(users) {
    const tableBody = document.querySelector('#usersTable tbody');
    tableBody.innerHTML = '';
    
    if (users.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="8" class="no-data">No users found</td>';
        tableBody.appendChild(row);
        return;
    }
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${formatDate(user.registrationDate)}</td>
            <td>${user.orders}</td>
            <td><span class="status ${user.status}">${capitalizeFirstLetter(user.status)}</span></td>
            <td>
                <button class="action-btn view-user" data-id="${user.id}" title="View Details"><i class="fas fa-eye"></i></button>
                <button class="action-btn edit-user" data-id="${user.id}" title="Edit User"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-user" data-id="${user.id}" title="Delete User"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.view-user').forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            viewUserDetails(userId);
        });
    });
    
    document.querySelectorAll('.delete-user').forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            showDeleteConfirmation(userId);
        });
    });
}

// Function to filter users based on search input
function filterUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    
    // In a real application, this might be an API call with search parameters
    // For demo purposes, we'll filter the sample data
    const users = [
        {
            id: 1,
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            phone: '+91 9876543210',
            registrationDate: '2023-01-15',
            orders: 5,
            status: 'active'
        },
        {
            id: 2,
            name: 'Priya Patel',
            email: 'priya.patel@example.com',
            phone: '+91 9876543211',
            registrationDate: '2023-02-20',
            orders: 3,
            status: 'active'
        },
        {
            id: 3,
            name: 'Amit Singh',
            email: 'amit.singh@example.com',
            phone: '+91 9876543212',
            registrationDate: '2023-03-05',
            orders: 2,
            status: 'inactive'
        },
        {
            id: 4,
            name: 'Neha Gupta',
            email: 'neha.gupta@example.com',
            phone: '+91 9876543213',
            registrationDate: '2023-03-10',
            orders: 7,
            status: 'active'
        },
        {
            id: 5,
            name: 'Vikram Desai',
            email: 'vikram.desai@example.com',
            phone: '+91 9876543214',
            registrationDate: '2023-03-15',
            orders: 1,
            status: 'active'
        }
    ];
    
    // Filter out deleted users first
    const deletedUserIds = getDeletedUserIds();
    const availableUsers = users.filter(user => !deletedUserIds.includes(Number(user.id)));
    
    // Then apply the search filter
    const filteredUsers = availableUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm) || 
        user.email.toLowerCase().includes(searchTerm) ||
        user.phone.includes(searchTerm)
    );
    
    renderUsersTable(filteredUsers);
}

// Function to view user details
function viewUserDetails(userId) {
    // In a real application, this would be an API call to fetch user details
    // For demo purposes, we'll use sample data
    const users = [
        {
            id: 1,
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            phone: '+91 9876543210',
            registrationDate: '2023-01-15',
            orders: 5,
            status: 'active',
            address: '123 Main Street, Mumbai, Maharashtra',
            lastLogin: '2023-03-20 14:30:45'
        },
        {
            id: 2,
            name: 'Priya Patel',
            email: 'priya.patel@example.com',
            phone: '+91 9876543211',
            registrationDate: '2023-02-20',
            orders: 3,
            status: 'active',
            address: '456 Park Avenue, Delhi, Delhi',
            lastLogin: '2023-03-19 10:15:22'
        },
        {
            id: 3,
            name: 'Amit Singh',
            email: 'amit.singh@example.com',
            phone: '+91 9876543212',
            registrationDate: '2023-03-05',
            orders: 2,
            status: 'inactive',
            address: '789 Lake View, Bangalore, Karnataka',
            lastLogin: '2023-03-10 09:45:30'
        },
        {
            id: 4,
            name: 'Neha Gupta',
            email: 'neha.gupta@example.com',
            phone: '+91 9876543213',
            registrationDate: '2023-03-10',
            orders: 7,
            status: 'active',
            address: '101 Hill Road, Chennai, Tamil Nadu',
            lastLogin: '2023-03-21 16:20:10'
        },
        {
            id: 5,
            name: 'Vikram Desai',
            email: 'vikram.desai@example.com',
            phone: '+91 9876543214',
            registrationDate: '2023-03-15',
            orders: 1,
            status: 'active',
            address: '202 Garden Street, Kolkata, West Bengal',
            lastLogin: '2023-03-18 11:55:40'
        }
    ];
    
    // Filter out deleted users
    const deletedUserIds = getDeletedUserIds();
    const filteredUsers = users.filter(user => !deletedUserIds.includes(Number(user.id)));
    
    // Find the user by ID
    const user = filteredUsers.find(user => user.id == userId);
    
    if (user) {
        const userDetailsContent = document.getElementById('userDetailsContent');
        userDetailsContent.innerHTML = `
            <div class="user-profile">
                <div class="user-avatar">
                    <img src="https://via.placeholder.com/80" alt="${user.name}">
                </div>
                <div class="user-info-details">
                    <h4>${user.name}</h4>
                    <p class="status ${user.status}">${capitalizeFirstLetter(user.status)}</p>
                </div>
            </div>
            
            <div class="info-section">
                <div class="info-item">
                    <span class="label">Email:</span>
                    <span class="value">${user.email}</span>
                </div>
                <div class="info-item">
                    <span class="label">Phone:</span>
                    <span class="value">${user.phone}</span>
                </div>
                <div class="info-item">
                    <span class="label">Address:</span>
                    <span class="value">${user.address}</span>
                </div>
                <div class="info-item">
                    <span class="label">Registration Date:</span>
                    <span class="value">${formatDate(user.registrationDate)}</span>
                </div>
                <div class="info-item">
                    <span class="label">Last Login:</span>
                    <span class="value">${user.lastLogin}</span>
                </div>
                <div class="info-item">
                    <span class="label">Total Orders:</span>
                    <span class="value">${user.orders}</span>
                </div>
            </div>
            
            <div class="action-buttons">
                <button class="btn primary">View Orders</button>
                <button class="btn secondary">Send Email</button>
            </div>
        `;
        
        // Store current user ID for deletion
        currentUserId = userId;
        
        // Show the modal
        document.getElementById('userDetailsModal').classList.add('active');
    }
}

// Function to show delete confirmation
function showDeleteConfirmation(userId) {
    currentUserId = userId;
    document.getElementById('deleteConfirmModal').classList.add('active');
}

// Function to delete user
function deleteUser() {
    // In a real application, this would be an API call to delete the user
    console.log(`Deleting user with ID: ${currentUserId}`);
    
    // Save the deleted user ID to localStorage
    const deletedUserIds = getDeletedUserIds();
    deletedUserIds.push(Number(currentUserId));
    localStorage.setItem('deletedUsers', JSON.stringify(deletedUserIds));
    
    // For demo purposes, we'll just remove the user from the table
    const userRow = document.querySelector(`#usersTable .delete-user[data-id="${currentUserId}"]`).closest('tr');
    userRow.remove();
    
    // Close the modal
    document.getElementById('deleteConfirmModal').classList.remove('active');
    
    // Show success message
    showNotification('User deleted successfully', 'success');
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

// Function to show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="close-notification">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Add active class after a small delay to trigger animation
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Set up close button
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('active');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Function to reset deleted users
function resetDeletedUsers() {
    // Clear the deleted users from localStorage
    localStorage.removeItem('deletedUsers');
    
    // Reload users
    loadUsers();
    
    // Show success message
    showNotification('Deleted users have been restored', 'success');
} 