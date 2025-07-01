<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Admin Panel Lock | CoinX</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f5f5f5;
        }
        .reset-container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 500px;
        }
        h1 {
            color: #333;
        }
        button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 12px 20px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 4px;
            margin-top: 20px;
        }
        button:hover {
            background-color: #45a049;
        }
        .success-message {
            color: #4CAF50;
            margin-top: 20px;
            display: none;
        }
        .back-link {
            display: block;
            margin-top: 20px;
            color: #666;
            text-decoration: none;
        }
        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="reset-container">
        <h1>Reset Admin Panel Lock</h1>
        <p>This utility will reset the admin panel lock by clearing related localStorage items.</p>
        
        <button id="resetButton">Reset Admin Panel Lock</button>
        
        <p id="successMessage" class="success-message">
            Admin panel has been successfully unlocked! You can now <a href="admin-login.php">login to the admin panel</a>.
        </p>
        
        <a href="index.php" class="back-link">← Back to Homepage</a>
    </div>

    <script>
        document.getElementById('resetButton').addEventListener('click', function() {
            // Clear admin lock related localStorage items
            localStorage.removeItem('loginAttempts');
            localStorage.removeItem('adminLockUntil');
            
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            
            // Log to console for verification
            console.log('Admin panel lock has been reset');
        });
    </script>
</body>
</html> 