#!/bin/bash

# CoinX Database Setup Script for Ubuntu
# This script will help you set up the CoinX database on your Ubuntu system

# Colors for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}CoinX Database Setup for Ubuntu${NC}"
echo "====================================="
echo ""

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}MySQL is not installed on your system.${NC}"
    echo "Installing MySQL server..."
    sudo apt update
    sudo apt install -y mysql-server
    
    # Start MySQL service
    sudo systemctl start mysql
    sudo systemctl enable mysql
    
    echo -e "${GREEN}MySQL installed successfully!${NC}"
else
    echo -e "${GREEN}MySQL is already installed on your system.${NC}"
fi

# Check MySQL service status
if sudo systemctl is-active --quiet mysql; then
    echo -e "${GREEN}MySQL service is running.${NC}"
else
    echo -e "${YELLOW}Starting MySQL service...${NC}"
    sudo systemctl start mysql
    echo -e "${GREEN}MySQL service started.${NC}"
fi

# Prompt for MySQL root password
echo ""
echo "Please enter your MySQL root password (leave blank if not set):"
read -s MYSQL_ROOT_PASSWORD

# Set MySQL command with password if provided
if [ -z "$MYSQL_ROOT_PASSWORD" ]; then
    MYSQL_CMD="sudo mysql"
else
    MYSQL_CMD="mysql -u root -p$MYSQL_ROOT_PASSWORD"
fi

# Create the coinx database
echo ""
echo -e "${YELLOW}Creating 'coinx' database...${NC}"
$MYSQL_CMD -e "CREATE DATABASE IF NOT EXISTS coinx CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Database 'coinx' created successfully!${NC}"
else
    echo -e "${RED}Failed to create database. Please check your MySQL credentials.${NC}"
    exit 1
fi

# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SQL_FILE="$SCRIPT_DIR/database/coins_table.sql"

# Import database schema
echo ""
echo -e "${YELLOW}Importing database schema and sample data...${NC}"
if [ -f "$SQL_FILE" ]; then
    $MYSQL_CMD coinx < "$SQL_FILE"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Database schema and sample data imported successfully!${NC}"
    else
        echo -e "${RED}Failed to import database schema.${NC}"
        exit 1
    fi
else
    echo -e "${RED}SQL file not found: $SQL_FILE${NC}"
    echo "Would you like to create it now? (y/n)"
    read CREATE_SQL
    
    if [[ $CREATE_SQL == "y" || $CREATE_SQL == "Y" ]]; then
        mkdir -p "$SCRIPT_DIR/database"
        cat > "$SQL_FILE" << 'EOF'
-- Create coins table if it doesn't exist
CREATE TABLE IF NOT EXISTS `coins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `year` varchar(50) DEFAULT NULL,
  `material` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample data
INSERT INTO `coins` (`name`, `category`, `price`, `stock`, `year`, `material`, `description`, `image`, `featured`) VALUES
('Gupta Dynasty Gold Dinar', 'ancient', 10000.00, 15, '320-550 CE', 'gold', 'A gold dinar from the Gupta Dynasty, featuring King Kumaragupta I. This coin dates back to approximately 415-455 CE and is in excellent condition.', 'https://via.placeholder.com/500x500', 1),
('Akbar Silver Rupee', 'medieval', 8500.00, 32, '1556-1605 CE', 'silver', 'A silver rupee from Emperor Akbar\'s reign. The coin features Persian inscriptions on both sides and is in well-preserved condition.', 'https://via.placeholder.com/500x500', 0),
('1947 Independence Rupee', 'modern', 12000.00, 3, '1947', 'silver', 'An extremely rare silver rupee minted in 1947 to commemorate India\'s independence. Features the Indian flag on one side and Ashoka\'s lion capital on the other.', 'https://via.placeholder.com/500x500', 1),
('Jahangir\'s Eid Mohur', 'medieval', 15000.00, 12, '1605-1627 CE', 'gold', 'A special gold mohur issued by Emperor Jahangir to celebrate Eid. Features exquisite calligraphy and is considered one of the most beautiful Mughal coins.', 'https://via.placeholder.com/500x500', 0),
('British Gold Sovereign', 'modern', 20000.00, 25, '1918', 'gold', 'A British gold sovereign from 1918, featuring King George V on the obverse and St. George slaying the dragon on the reverse.', 'https://via.placeholder.com/500x500', 1),
('Mauryan Empire Silver Karshapana', 'ancient', 7500.00, 2, '321-185 BCE', 'silver', 'A rare silver punch-marked coin from the Mauryan Empire. Features various symbols including the sun, six-armed symbol, and elephant.', 'https://via.placeholder.com/500x500', 0),
('Republic India 1 Rupee 1950', 'modern', 5000.00, 18, '1950', 'nickel', 'One of the first coins issued by the Republic of India. Features the Ashoka lion capital on one side and the value on the other.', 'https://via.placeholder.com/500x500', 0),
('Kushan Empire Gold Stater', 'ancient', 18000.00, 5, '78-240 CE', 'gold', 'A gold stater from the Kushan Empire depicting King Kanishka I. The coin features Bactrian inscriptions and Greek-influenced imagery.', 'https://via.placeholder.com/500x500', 1),
('East India Company One Mohur', 'modern', 25000.00, 8, '1835', 'gold', 'A gold mohur issued by the East India Company featuring William IV. One of the most sought-after colonial coins from British India.', 'https://via.placeholder.com/500x500', 1),
('Chandragupta II Archer Type', 'ancient', 12500.00, 7, '380-414 CE', 'gold', 'A gold dinar of Chandragupta II featuring the king as an archer. The reverse shows the goddess Lakshmi seated on a lotus.', 'https://via.placeholder.com/500x500', 0);
EOF
        
        $MYSQL_CMD coinx < "$SQL_FILE"
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}Database schema and sample data created and imported successfully!${NC}"
        else
            echo -e "${RED}Failed to import database schema.${NC}"
            exit 1
        fi
    else
        echo -e "${RED}Setup aborted. Please provide the SQL file and try again.${NC}"
        exit 1
    fi
fi

# Create a database user for the application
echo ""
echo -e "${YELLOW}Would you like to create a dedicated MySQL user for CoinX? (Recommended) (y/n)${NC}"
read CREATE_USER

if [[ $CREATE_USER == "y" || $CREATE_USER == "Y" ]]; then
    echo "Enter new username for CoinX database access:"
    read DB_USER
    
    echo "Enter password for the new user:"
    read -s DB_PASS
    
    echo ""
    echo -e "${YELLOW}Creating user $DB_USER...${NC}"
    $MYSQL_CMD -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"
    $MYSQL_CMD -e "GRANT ALL PRIVILEGES ON coinx.* TO '$DB_USER'@'localhost';"
    $MYSQL_CMD -e "FLUSH PRIVILEGES;"
    
    echo -e "${GREEN}User $DB_USER created successfully with access to coinx database!${NC}"
    
    # Create a PHP connection file with the new credentials
    PHP_DIR="$SCRIPT_DIR/php"
    mkdir -p "$PHP_DIR"
    
    echo -e "${YELLOW}Creating database connection file...${NC}"
    cat > "$PHP_DIR/connect.php" << EOF
<?php
// Database connection settings
\$host = "localhost";
\$user = "$DB_USER";
\$pass = "$DB_PASS";
\$db = "coinx";

// Create connection (will need mysqli extension enabled in php.ini)
\$conn = @mysqli_connect(\$host, \$user, \$pass, \$db);

// Check connection
if (!\$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

// If you see this comment in your code, the connection was successful
?>
EOF
    
    echo -e "${GREEN}Database connection file created at $PHP_DIR/connect.php${NC}"
else
    echo -e "${YELLOW}Using default connection settings...${NC}"
fi

# Create a test connection script
echo ""
echo -e "${YELLOW}Creating a test script to verify database connection...${NC}"
cat > "$SCRIPT_DIR/test_connection.php" << 'EOF'
<?php
// Include database connection
require_once 'php/connect.php';

// Check if connection is valid
if ($conn) {
    echo "Database connection successful!\n";
    
    // Test query
    $query = "SELECT COUNT(*) as count FROM coins";
    $result = mysqli_query($conn, $query);
    
    if ($result) {
        $row = mysqli_fetch_assoc($result);
        echo "Found " . $row['count'] . " coins in the database.\n";
        
        // Get first 5 coins
        $query = "SELECT id, name, category, price FROM coins LIMIT 5";
        $result = mysqli_query($conn, $query);
        
        if (mysqli_num_rows($result) > 0) {
            echo "\nSample coins:\n";
            echo str_repeat("-", 80) . "\n";
            echo sprintf("%-5s | %-35s | %-12s | %10s\n", "ID", "Name", "Category", "Price");
            echo str_repeat("-", 80) . "\n";
            
            while ($row = mysqli_fetch_assoc($result)) {
                echo sprintf("%-5s | %-35s | %-12s | %10.2f\n", 
                    $row['id'], 
                    $row['name'], 
                    $row['category'], 
                    $row['price']);
            }
            echo str_repeat("-", 80) . "\n";
        }
    } else {
        echo "Error executing query: " . mysqli_error($conn) . "\n";
    }
    
    // Close connection
    mysqli_close($conn);
} else {
    echo "Database connection failed!\n";
}
EOF

echo -e "${GREEN}Test script created at $SCRIPT_DIR/test_connection.php${NC}"

# Final instructions
echo ""
echo -e "${GREEN}CoinX database setup completed!${NC}"
echo ""
echo -e "${YELLOW}To test your database connection, run:${NC}"
echo "php test_connection.php"
echo ""
echo -e "${YELLOW}If you need to update your connection settings, edit:${NC}"
echo "php/connect.php"
echo ""
echo "Thank you for using the CoinX database setup script!" 