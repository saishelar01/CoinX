document.addEventListener('DOMContentLoaded', function() {
    // Seller Registration functionality
    const sellerRegisterForm = document.getElementById('sellerRegisterForm');
    
    if (sellerRegisterForm) {
        sellerRegisterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const terms = document.getElementById('terms').checked;
            
            if (!fullname || !email || !password || !terms) {
                alert('Please fill all required fields');
                return;
            }
            
            // Here you would typically send data to server
            // For demo purposes, we'll just show success message
            
            // Show success message
            const successMsg = document.getElementById('registrationSuccess');
            successMsg.style.display = 'block';
            
            // Store user credentials in localStorage for demo purposes
            localStorage.setItem('coinx_seller_email', email);
            localStorage.setItem('coinx_seller_password', password);
            localStorage.setItem('coinx_seller_name', fullname);
            
            // Clear form
            sellerRegisterForm.reset();
            
            // Redirect to login page after 3 seconds
            setTimeout(function() {
                window.location.href = 'seller-login.php';
            }, 3000);
        });
    }
    
    // Seller Login functionality
    const sellerLoginForm = document.getElementById('sellerLoginForm');
    
    if (sellerLoginForm) {
        // Check if we need to add success/error message elements
        if (!document.getElementById('loginSuccess') && !document.getElementById('loginError')) {
            // Create success message element
            const successMsg = document.createElement('div');
            successMsg.id = 'loginSuccess';
            successMsg.className = 'success-message';
            successMsg.style.display = 'none';
            successMsg.style.color = 'green';
            successMsg.style.padding = '10px';
            successMsg.style.marginBottom = '15px';
            successMsg.style.textAlign = 'center';
            successMsg.style.backgroundColor = '#e8f5e9';
            successMsg.style.borderRadius = '4px';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Login successful! Redirecting to dashboard...';
            
            // Create error message element
            const errorMsg = document.createElement('div');
            errorMsg.id = 'loginError';
            errorMsg.className = 'error-message';
            errorMsg.style.display = 'none';
            errorMsg.style.color = 'red';
            errorMsg.style.padding = '10px';
            errorMsg.style.marginBottom = '15px';
            errorMsg.style.textAlign = 'center';
            errorMsg.style.backgroundColor = '#ffebee';
            errorMsg.style.borderRadius = '4px';
            errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Invalid email or password. Please try again.';
            
            // Insert messages before the submit button
            const submitBtn = sellerLoginForm.querySelector('button[type="submit"]');
            sellerLoginForm.insertBefore(successMsg, submitBtn);
            sellerLoginForm.insertBefore(errorMsg, submitBtn);
        }
        
        sellerLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = false;
            
            // Hide any existing messages
            const successMsg = document.getElementById('loginSuccess');
            const errorMsg = document.getElementById('loginError');
            successMsg.style.display = 'none';
            errorMsg.style.display = 'none';
            
            // Get stored credentials (in a real app, this would be a server-side check)
            const storedEmail = localStorage.getItem('coinx_seller_email');
            const storedPassword = localStorage.getItem('coinx_seller_password');
            
            // Demo login validation (for demonstration purposes only)
            if (email === storedEmail && password === storedPassword) {
                // Show success message
                successMsg.style.display = 'block';
                
                // Save login session if remember is checked
                if (remember) {
                    localStorage.setItem('coinx_seller_logged_in', 'true');
                } else {
                    sessionStorage.setItem('coinx_seller_logged_in', 'true');
                }
                
                // Redirect to dashboard after 2 seconds
                setTimeout(function() {
                    window.location.href = 'seller-dashboard.php';
                }, 2000);
            } else {
                // Show error message
                errorMsg.style.display = 'block';
                // Clear form
                sellerLoginForm.reset();
            }
        });
    }
}); 