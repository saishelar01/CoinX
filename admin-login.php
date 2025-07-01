<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login | CoinX</title>
    <link rel="stylesheet" href="css/admin-login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="admin-login-container">
        <div class="admin-login-header">
            <h1>Coin<span>X</span> Admin</h1>
            <p>Enter your credentials to access the admin panel</p>
        </div>
        
        <form id="adminLoginForm" class="admin-login-form">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <div class="password-field">
                    <input type="password" id="password" name="password" required>
                    <span class="toggle-password">
                        <i class="far fa-eye"></i>
                    </span>
                </div>
            </div>
            
            <button type="submit" class="btn primary-btn">Login</button>
            
            <div class="error-message" id="errorMessage">
                Invalid username or password. Please try again.
            </div>
        </form>
        
        <div class="back-to-site">
            <a href="index.php"><i class="fas fa-arrow-left"></i> Back to Website</a>
        </div>
    </div>

    <script src="js/admin-login.js"></script>
</body>
</html>
