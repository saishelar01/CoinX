document.addEventListener('DOMContentLoaded', function() {
    // Sample coin data - replace with actual API call in production
    const sampleCoins = [
        {
            id: 1,
            name: "Ancient Greek Drachma",
            category: "ancient",
            price: 1200.00,
            stock: 5,
            status: "active",
            image: "https://via.placeholder.com/50",
            year: "400 BC",
            material: "silver",
            description: "Well-preserved Ancient Greek Drachma from the Classical period.",
            featured: true,
            created: "2023-06-15",
            updated: "2023-06-15"
        },
        {
            id: 2,
            name: "Roman Denarius",
            category: "ancient",
            price: 850.00,
            stock: 3,
            status: "active",
            image: "https://via.placeholder.com/50",
            year: "80 AD",
            material: "silver",
            description: "Silver Denarius from the Roman Empire featuring Emperor Titus.",
            featured: false,
            created: "2023-06-16",
            updated: "2023-06-16"
        },
        {
            id: 3,
            name: "1943 Steel Penny",
            category: "modern",
            price: 120.00,
            stock: 12,
            status: "active",
            image: "https://via.placeholder.com/50",
            year: "1943",
            material: "steel",
            description: "WWII-era steel penny, produced to conserve copper for the war effort.",
            featured: false,
            created: "2023-06-17",
            updated: "2023-06-17"
        },
        {
            id: 4,
            name: "2000 Millennium Commemorative Coin",
            category: "commemorative",
            price: 45.00,
            stock: 0,
            status: "inactive",
            image: "https://via.placeholder.com/50",
            year: "2000",
            material: "gold",
            description: "Special edition gold-plated coin celebrating the new millennium.",
            featured: false,
            created: "2023-06-18",
            updated: "2023-06-18"
        },
        {
            id: 5,
            name: "Medieval Florin",
            category: "medieval",
            price: 3200.00,
            stock: 1,
            status: "active",
            image: "https://via.placeholder.com/50",
            year: "1252",
            material: "gold",
            description: "Rare Florin from the Republic of Florence, one of the first gold coins minted in Europe since the fall of Rome.",
            featured: true,
            created: "2023-06-19",
            updated: "2023-06-19"
        }
    ];

    // UI Elements
    const coinsTableBody = document.querySelector('.coins-table tbody');
    
    // Initialize - display sample coins
    displayCoins(sampleCoins);
    
    // Function to display coins in the table
    function displayCoins(coins) {
        if (coins.length === 0) {
            coinsTableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No coins found</td></tr>';
                        return;
        }

        coinsTableBody.innerHTML = '';
        
        coins.forEach(coin => {
            const tr = document.createElement('tr');
            
            const stockClass = coin.stock === 0 ? 'out-of-stock' : 
                             (coin.stock <= 3 ? 'low-stock' : 'in-stock');
            
            const statusBadgeClass = coin.status === 'active' ? 'status-active' : 'status-inactive';
            
            tr.innerHTML = `
                <td class="coin-image">
                    <img src="${coin.image}" alt="${coin.name}">
                </td>
                <td>${coin.name}</td>
                <td><span class="category-badge">${coin.category.charAt(0).toUpperCase() + coin.category.slice(1)}</span></td>
                <td>₹${coin.price.toFixed(2)}</td>
                <td class="${stockClass}">${coin.stock}</td>
                <td><span class="status-badge ${statusBadgeClass}">${coin.status === 'active' ? 'Active' : 'Inactive'}</span></td>
                <td class="actions">
                    <button class="view-btn" data-id="${coin.id}"><i class="fas fa-eye"></i></button>
                    <button class="edit-btn" data-id="${coin.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${coin.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            coinsTableBody.appendChild(tr);
        });
    }
}); 
