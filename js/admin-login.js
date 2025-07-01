document.addEventListener('DOMContentLoaded', function() {
    // Admin credentials (in a real application, this would be handled server-side)
    const adminCredentials = {
        username: 'admin',
        password: 'admin123'
    };

    // Get form elements
    const adminLoginForm = document.getElementById('adminLoginForm');
    const errorMessage = document.getElementById('errorMessage');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Initialize login attempts counter and check for locked status
    let loginAttempts = parseInt(localStorage.getItem('loginAttempts') || '0');
    const lockUntil = localStorage.getItem('adminLockUntil');
    const MAX_ATTEMPTS = 3;
    const LOCK_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

    // Check if admin panel is currently locked
    function checkLockStatus() {
        if (lockUntil && new Date().getTime() < parseInt(lockUntil)) {
            // Still locked
            const remainingTime = Math.ceil((parseInt(lockUntil) - new Date().getTime()) / 60000);
            errorMessage.textContent = `Admin panel is locked. Try again in ${remainingTime} minutes.`;
            errorMessage.style.display = 'block';
            
            // Disable form inputs
            document.getElementById('username').disabled = true;
            document.getElementById('password').disabled = true;
            document.querySelector('.btn.primary-btn').disabled = true;
            
            return true;
        } else if (lockUntil) {
            // Lock period is over
            localStorage.removeItem('adminLockUntil');
            localStorage.setItem('loginAttempts', '0');
            loginAttempts = 0;
            return false;
        }
        return false;
    }

    // Hide error message initially
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }

    // Check lock status on page load
    checkLockStatus();

    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            const eyeIcon = this.querySelector('i');
            eyeIcon.classList.toggle('fa-eye');
            eyeIcon.classList.toggle('fa-eye-slash');
        });
    }

    // Handle form submission
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if admin panel is locked
            if (checkLockStatus()) {
                return;
            }
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Check credentials
            if (username === adminCredentials.username && password === adminCredentials.password) {
                // Reset login attempts on successful login
                localStorage.setItem('loginAttempts', '0');
                
                // Set admin login status
                localStorage.setItem('adminLoggedIn', 'true');
                
                // Redirect to admin dashboard
                window.location.href = 'admin-dashboard.php';
            } else {
                // Increment failed login attempts
                loginAttempts++;
                localStorage.setItem('loginAttempts', loginAttempts.toString());
                
                // Check if max attempts reached
                if (loginAttempts >= MAX_ATTEMPTS) {
                    // Lock admin panel
                    const lockTime = new Date().getTime() + LOCK_DURATION;
                    localStorage.setItem('adminLockUntil', lockTime.toString());
                    
                    // Show lock message
                    errorMessage.textContent = `Too many failed attempts. Admin panel is locked for 30 minutes.`;
                    errorMessage.style.display = 'block';
                    
                    // Disable form inputs
                    document.getElementById('username').disabled = true;
                    document.getElementById('password').disabled = true;
                    document.querySelector('.btn.primary-btn').disabled = true;
                } else {
                    // Show error message with remaining attempts
                    const remainingAttempts = MAX_ATTEMPTS - loginAttempts;
                    errorMessage.textContent = `Invalid username or password. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`;
                    errorMessage.style.display = 'block';
                    
                    // Shake animation for error
                    errorMessage.classList.add('shake');
                    setTimeout(() => {
                        errorMessage.classList.remove('shake');
                    }, 500);
                }
            }
        });
    }

    // Add CSS for shake animation
    const style = document.createElement('style');
    style.textContent = `
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
            10%, 90% { transform: translateX(-1px); }
            20%, 80% { transform: translateX(2px); }
            30%, 50%, 70% { transform: translateX(-4px); }
            40%, 60% { transform: translateX(4px); }
        }
    `;
    document.head.appendChild(style);
}); 