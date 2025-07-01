document.addEventListener('DOMContentLoaded', function() {
    const sellCoinForm = document.getElementById('sellCoinForm');
    
    if (sellCoinForm) {
        // Form validation and submission
        sellCoinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            if (!validateForm()) {
                return;
            }
            
            // Show submission message
            showNotification('Your coin details have been submitted successfully! Our team will contact you shortly.', 'success');
            
            // In a real application, you would submit this data to the server
            // For demo purposes, we'll just reset the form after a delay
            setTimeout(() => {
                sellCoinForm.reset();
            }, 3000);
        });
        
        // File input validation for coin images
        const coinImagesInput = document.getElementById('coinImages');
        if (coinImagesInput) {
            coinImagesInput.addEventListener('change', function() {
                validateFileInput(this, 3, 5 * 1024 * 1024); // Max 3 files, 5MB each
            });
        }
        
        // File input validation for certificate
        const certificateInput = document.getElementById('certificateImage');
        if (certificateInput) {
            certificateInput.addEventListener('change', function() {
                validateFileInput(this, 1, 5 * 1024 * 1024); // Max 1 file, 5MB
            });
        }
    }
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        
        // Reset previous error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.remove();
        });
        
        // Required fields validation
        const requiredFields = sellCoinForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            }
        });
        
        // Email validation
        const emailField = document.getElementById('email');
        if (emailField && emailField.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                showError(emailField, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Phone validation
        const phoneField = document.getElementById('phone');
        if (phoneField && phoneField.value.trim()) {
            const phonePattern = /^[0-9+\-\s]{10,15}$/;
            if (!phonePattern.test(phoneField.value)) {
                showError(phoneField, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // File input validation function
    function validateFileInput(input, maxFiles, maxSize) {
        const files = input.files;
        
        // Remove previous error message
        const parentElement = input.parentElement;
        const existingError = parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Check number of files
        if (files.length > maxFiles) {
            showError(input, `Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`);
            input.value = '';
            return false;
        }
        
        // Check file size
        for (let i = 0; i < files.length; i++) {
            if (files[i].size > maxSize) {
                showError(input, `File size exceeds ${formatFileSize(maxSize)}`);
                input.value = '';
                return false;
            }
        }
        
        return true;
    }
    
    // Helper function to format file size
    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' bytes';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / 1048576).toFixed(1) + ' MB';
    }
    
    // Function to show error message
    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        formGroup.appendChild(errorElement);
    }
    
    // Function to show notification
    function showNotification(message, type) {
        // Check if notification container exists
        let notificationContainer = document.querySelector('.notification-container');
        
        // Create notification container if it doesn't exist
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add close button
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-notification';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', function() {
            notification.remove();
        });
        
        notification.appendChild(closeBtn);
        notificationContainer.appendChild(notification);
        
        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}); 