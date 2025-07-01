// Generate text report summary
function generateTextReport(data) {
    const reportValues = document.getElementById('reportValues');
    
    // Create the text report
    let textReport = `${data.title}\n\n`;
    textReport += `EXECUTIVE SUMMARY:\n`;
    textReport += `=================\n`;
    textReport += `Total Orders: ${data.totals.order_count.toLocaleString()}\n`;
    textReport += `Total Items Sold: ${data.totals.total_items.toLocaleString()}\n`;
    textReport += `Total Revenue: ${formatCurrency(data.totals.revenue)}\n`;
    textReport += `Total Active Users: ${(Math.floor(Math.random() * 2000) + 500).toLocaleString()}\n`;
    textReport += `New Customers This Period: ${(Math.floor(Math.random() * 300) + 50).toLocaleString()}\n`;
    textReport += `Average Order Value: ${formatCurrency(data.totals.revenue / data.totals.order_count)}\n\n`;
    
    textReport += `COIN SALES BY CATEGORY:\n`;
    textReport += `=====================\n`;
    textReport += `Gold Coins: ${(Math.floor(Math.random() * 1000) + 100).toLocaleString()} units, ${formatCurrency(Math.floor(Math.random() * 5000000) + 1000000)}\n`;
    textReport += `Silver Coins: ${(Math.floor(Math.random() * 3000) + 500).toLocaleString()} units, ${formatCurrency(Math.floor(Math.random() * 3000000) + 500000)}\n`;
    textReport += `Ancient Coins: ${(Math.floor(Math.random() * 800) + 100).toLocaleString()} units, ${formatCurrency(Math.floor(Math.random() * 2000000) + 300000)}\n`;
    textReport += `Collectible Coins: ${(Math.floor(Math.random() * 2000) + 300).toLocaleString()} units, ${formatCurrency(Math.floor(Math.random() * 1500000) + 200000)}\n\n`;
    
    textReport += `SALES CHANNEL DISTRIBUTION:\n`;
    textReport += `=========================\n`;
    const webPercent = Math.floor(Math.random() * 30) + 60;
    const mobilePercent = Math.floor(Math.random() * 30);
    const otherPercent = 100 - webPercent - mobilePercent;
    textReport += `Website: ${webPercent}% (${formatCurrency(data.totals.revenue * webPercent / 100)})\n`;
    textReport += `Mobile App: ${mobilePercent}% (${formatCurrency(data.totals.revenue * mobilePercent / 100)})\n`;
    textReport += `Other Channels: ${otherPercent}% (${formatCurrency(data.totals.revenue * otherPercent / 100)})\n\n`;
    
    textReport += `CUSTOMER DEMOGRAPHICS:\n`;
    textReport += `=====================\n`;
    textReport += `New Collectors: ${(Math.floor(Math.random() * 40) + 10)}%\n`;
    textReport += `Seasoned Collectors: ${(Math.floor(Math.random() * 40) + 30)}%\n`;
    textReport += `Investors: ${(Math.floor(Math.random() * 30) + 20)}%\n\n`;
    
    textReport += `PERIOD BREAKDOWN:\n`;
    textReport += `================\n`;
    data.data.forEach(item => {
        textReport += `${item.label}: ${item.order_count} orders, ${item.total_items} items, ${formatCurrency(item.revenue)}\n`;
    });
    
    textReport += `\nTOP SELLING COINS:\n`;
    textReport += `================\n`;
    data.top_selling_coins.forEach((coin, index) => {
        textReport += `${index + 1}. ${coin.name}: ${coin.total_sold} sold, ${formatCurrency(coin.total_revenue)}\n`;
    });
    
    textReport += `\nREGIONAL DISTRIBUTION:\n`;
    textReport += `====================\n`;
    textReport += `North Region: ${(Math.floor(Math.random() * 40) + 20)}% of sales\n`;
    textReport += `South Region: ${(Math.floor(Math.random() * 30) + 15)}% of sales\n`;
    textReport += `East Region: ${(Math.floor(Math.random() * 25) + 15)}% of sales\n`;
    textReport += `West Region: ${(Math.floor(Math.random() * 35) + 15)}% of sales\n`;
    textReport += `International: ${(Math.floor(Math.random() * 15) + 5)}% of sales\n\n`;
    
    textReport += `PERFORMANCE INDICATORS:\n`;
    textReport += `=====================\n`;
    const growthRate = (Math.random() * 20 - 5).toFixed(2);
    textReport += `YoY Growth Rate: ${growthRate}%\n`;
    textReport += `Customer Satisfaction: ${(Math.floor(Math.random() * 15) + 85)}%\n`;
    textReport += `Return Rate: ${(Math.random() * 5).toFixed(2)}%\n`;
    textReport += `Avg. Shipping Time: ${(Math.floor(Math.random() * 3) + 2)} days\n`;
    
    // Set the text report
    reportValues.textContent = textReport;
}

// Generate HTML report
function generateHtmlReport(data) {
    const reportContainer = document.getElementById('reportContainer');
    
    // Clear previous content if any
    reportContainer.innerHTML = '';
    
    // Create report header
    const header = document.createElement('header');
    header.innerHTML = `
        <h1>${data.title}</h1>
        <p class="report-date">Generated on: ${new Date().toLocaleDateString()}</p>
    `;
    reportContainer.appendChild(header);
    
    // Executive Summary Section
    const execSummary = createSection('Executive Summary');
    
    const summaryStats = document.createElement('div');
    summaryStats.className = 'stats-grid';
    summaryStats.innerHTML = `
        <div class="stat-card">
            <h3>Total Orders</h3>
            <p class="stat-value">${data.totals.order_count.toLocaleString()}</p>
        </div>
        <div class="stat-card">
            <h3>Items Sold</h3>
            <p class="stat-value">${data.totals.total_items.toLocaleString()}</p>
        </div>
        <div class="stat-card">
            <h3>Revenue</h3>
            <p class="stat-value">${formatCurrency(data.totals.revenue)}</p>
        </div>
        <div class="stat-card">
            <h3>Active Users</h3>
            <p class="stat-value">${(Math.floor(Math.random() * 2000) + 500).toLocaleString()}</p>
        </div>
        <div class="stat-card">
            <h3>New Customers</h3>
            <p class="stat-value">${(Math.floor(Math.random() * 300) + 50).toLocaleString()}</p>
        </div>
        <div class="stat-card">
            <h3>Avg Order Value</h3>
            <p class="stat-value">${formatCurrency(data.totals.revenue / data.totals.order_count)}</p>
        </div>
    `;
    
    execSummary.appendChild(summaryStats);
    reportContainer.appendChild(execSummary);
    
    // Coin Sales by Category
    const coinSales = createSection('Coin Sales By Category');
    const coinTable = document.createElement('table');
    coinTable.className = 'data-table';
    coinTable.innerHTML = `
        <thead>
            <tr>
                <th>Category</th>
                <th>Units Sold</th>
                <th>Revenue</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Gold Coins</td>
                <td>${(Math.floor(Math.random() * 1000) + 100).toLocaleString()}</td>
                <td>${formatCurrency(Math.floor(Math.random() * 5000000) + 1000000)}</td>
            </tr>
            <tr>
                <td>Silver Coins</td>
                <td>${(Math.floor(Math.random() * 3000) + 500).toLocaleString()}</td>
                <td>${formatCurrency(Math.floor(Math.random() * 3000000) + 500000)}</td>
            </tr>
            <tr>
                <td>Ancient Coins</td>
                <td>${(Math.floor(Math.random() * 800) + 100).toLocaleString()}</td>
                <td>${formatCurrency(Math.floor(Math.random() * 2000000) + 300000)}</td>
            </tr>
            <tr>
                <td>Collectible Coins</td>
                <td>${(Math.floor(Math.random() * 2000) + 300).toLocaleString()}</td>
                <td>${formatCurrency(Math.floor(Math.random() * 1500000) + 200000)}</td>
            </tr>
        </tbody>
    `;
    coinSales.appendChild(coinTable);
    reportContainer.appendChild(coinSales);
    
    // Sales Channel Distribution
    const channelSection = createSection('Sales Channel Distribution');
    const webPercent = Math.floor(Math.random() * 30) + 60;
    const mobilePercent = Math.floor(Math.random() * 30);
    const otherPercent = 100 - webPercent - mobilePercent;
    
    const channelDiv = document.createElement('div');
    channelDiv.className = 'chart-container';
    
    // Chart visual representation (simplified)
    const chartHtml = `
        <div class="chart">
            <div class="chart-bar web" style="width: ${webPercent}%;" title="Website: ${webPercent}%"></div>
            <div class="chart-bar mobile" style="width: ${mobilePercent}%;" title="Mobile App: ${mobilePercent}%"></div>
            <div class="chart-bar other" style="width: ${otherPercent}%;" title="Other: ${otherPercent}%"></div>
        </div>
        <div class="chart-legend">
            <div class="legend-item">
                <span class="legend-color web"></span>
                <span>Website: ${webPercent}% (${formatCurrency(data.totals.revenue * webPercent / 100)})</span>
            </div>
            <div class="legend-item">
                <span class="legend-color mobile"></span>
                <span>Mobile App: ${mobilePercent}% (${formatCurrency(data.totals.revenue * mobilePercent / 100)})</span>
            </div>
            <div class="legend-item">
                <span class="legend-color other"></span>
                <span>Other Channels: ${otherPercent}% (${formatCurrency(data.totals.revenue * otherPercent / 100)})</span>
            </div>
        </div>
    `;
    
    channelDiv.innerHTML = chartHtml;
    channelSection.appendChild(channelDiv);
    reportContainer.appendChild(channelSection);
    
    // Customer Demographics
    const demoSection = createSection('Customer Demographics');
    const newCollectors = Math.floor(Math.random() * 40) + 10;
    const seasonedCollectors = Math.floor(Math.random() * 40) + 30;
    const investors = Math.floor(Math.random() * 30) + 20;
    
    const demographicsHtml = `
        <div class="pie-chart-container">
            <div class="pie-chart">
                <div class="pie-segment new" style="--percentage: ${newCollectors}"></div>
                <div class="pie-segment seasoned" style="--percentage: ${seasonedCollectors}"></div>
                <div class="pie-segment investors" style="--percentage: ${investors}"></div>
            </div>
            <div class="chart-legend">
                <div class="legend-item">
                    <span class="legend-color new"></span>
                    <span>New Collectors: ${newCollectors}%</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color seasoned"></span>
                    <span>Seasoned Collectors: ${seasonedCollectors}%</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color investors"></span>
                    <span>Investors: ${investors}%</span>
                </div>
            </div>
        </div>
    `;
    
    demoSection.innerHTML += demographicsHtml;
    reportContainer.appendChild(demoSection);
    
    // Period Breakdown
    const periodSection = createSection('Period Breakdown');
    const periodTable = document.createElement('table');
    periodTable.className = 'data-table';
    
    let periodHtml = `
        <thead>
            <tr>
                <th>Period</th>
                <th>Orders</th>
                <th>Items</th>
                <th>Revenue</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    data.data.forEach(item => {
        periodHtml += `
            <tr>
                <td>${item.label}</td>
                <td>${item.order_count}</td>
                <td>${item.total_items}</td>
                <td>${formatCurrency(item.revenue)}</td>
            </tr>
        `;
    });
    
    periodHtml += `</tbody>`;
    periodTable.innerHTML = periodHtml;
    periodSection.appendChild(periodTable);
    reportContainer.appendChild(periodSection);
    
    // Top Selling Coins
    const topCoinsSection = createSection('Top Selling Coins');
    const topCoinsTable = document.createElement('table');
    topCoinsTable.className = 'data-table';
    
    let topCoinsHtml = `
        <thead>
            <tr>
                <th>Rank</th>
                <th>Coin</th>
                <th>Units Sold</th>
                <th>Revenue</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    data.top_selling_coins.forEach((coin, index) => {
        topCoinsHtml += `
            <tr>
                <td>${index + 1}</td>
                <td>${coin.name}</td>
                <td>${coin.total_sold}</td>
                <td>${formatCurrency(coin.total_revenue)}</td>
            </tr>
        `;
    });
    
    topCoinsHtml += `</tbody>`;
    topCoinsTable.innerHTML = topCoinsHtml;
    topCoinsSection.appendChild(topCoinsTable);
    reportContainer.appendChild(topCoinsSection);
    
    // Regional Distribution
    const regionSection = createSection('Regional Distribution');
    const northRegion = Math.floor(Math.random() * 40) + 20;
    const southRegion = Math.floor(Math.random() * 30) + 15;
    const eastRegion = Math.floor(Math.random() * 25) + 15;
    const westRegion = Math.floor(Math.random() * 35) + 15;
    const international = Math.floor(Math.random() * 15) + 5;
    
    const regionHtml = `
        <div class="region-map">
            <div class="region-bars">
                <div class="region-bar">
                    <div class="region-label">North Region</div>
                    <div class="region-value-bar" style="width: ${northRegion * 2}px;"></div>
                    <div class="region-value">${northRegion}%</div>
                </div>
                <div class="region-bar">
                    <div class="region-label">South Region</div>
                    <div class="region-value-bar" style="width: ${southRegion * 2}px;"></div>
                    <div class="region-value">${southRegion}%</div>
                </div>
                <div class="region-bar">
                    <div class="region-label">East Region</div>
                    <div class="region-value-bar" style="width: ${eastRegion * 2}px;"></div>
                    <div class="region-value">${eastRegion}%</div>
                </div>
                <div class="region-bar">
                    <div class="region-label">West Region</div>
                    <div class="region-value-bar" style="width: ${westRegion * 2}px;"></div>
                    <div class="region-value">${westRegion}%</div>
                </div>
                <div class="region-bar">
                    <div class="region-label">International</div>
                    <div class="region-value-bar" style="width: ${international * 2}px;"></div>
                    <div class="region-value">${international}%</div>
                </div>
            </div>
        </div>
    `;
    
    regionSection.innerHTML += regionHtml;
    reportContainer.appendChild(regionSection);
    
    // Performance Indicators
    const perfSection = createSection('Performance Indicators');
    const growthRate = (Math.random() * 20 - 5).toFixed(2);
    const satisfaction = Math.floor(Math.random() * 15) + 85;
    const returnRate = (Math.random() * 5).toFixed(2);
    const shippingTime = Math.floor(Math.random() * 3) + 2;
    
    const perfHtml = `
        <div class="stats-grid">
            <div class="stat-card ${parseFloat(growthRate) >= 0 ? 'positive' : 'negative'}">
                <h3>YoY Growth Rate</h3>
                <p class="stat-value">${growthRate}%</p>
            </div>
            <div class="stat-card">
                <h3>Customer Satisfaction</h3>
                <p class="stat-value">${satisfaction}%</p>
            </div>
            <div class="stat-card">
                <h3>Return Rate</h3>
                <p class="stat-value">${returnRate}%</p>
            </div>
            <div class="stat-card">
                <h3>Avg. Shipping Time</h3>
                <p class="stat-value">${shippingTime} days</p>
            </div>
        </div>
    `;
    
    perfSection.innerHTML += perfHtml;
    reportContainer.appendChild(perfSection);
    
    // Add CSS styles to the document
    const style = document.createElement('style');
    style.textContent = `
        #reportContainer {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            color: #333;
        }
        
        header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 20px;
        }
        
        header h1 {
            color: #1c3d5a;
            margin-bottom: 5px;
        }
        
        .report-date {
            color: #777;
            font-style: italic;
        }
        
        .report-section {
            margin-bottom: 30px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 20px;
        }
        
        .section-title {
            color: #1c3d5a;
            border-bottom: 2px solid #e1e1e1;
            padding-bottom: 10px;
            margin-top: 0;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .stat-card {
            background-color: #f5f5f5;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        
        .stat-card:hover {
            transform: translateY(-3px);
        }
        
        .stat-card h3 {
            margin-top: 0;
            color: #555;
            font-size: 14px;
            font-weight: 600;
        }
        
        .stat-value {
            font-size: 24px;
            font-weight: 700;
            margin: 10px 0 0;
            color: #1c3d5a;
        }
        
        .stat-card.positive .stat-value {
            color: #28a745;
        }
        
        .stat-card.negative .stat-value {
            color: #dc3545;
        }
        
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        
        .data-table th, .data-table td {
            padding: 10px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        .data-table th {
            background-color: #f2f2f2;
            font-weight: 600;
        }
        
        .data-table tr:hover {
            background-color: #f5f5f5;
        }
        
        .chart-container {
            margin-top: 20px;
        }
        
        .chart {
            height: 40px;
            background-color: #f2f2f2;
            border-radius: 4px;
            overflow: hidden;
            display: flex;
        }
        
        .chart-bar {
            height: 100%;
        }
        
        .chart-bar.web {
            background-color: #4e73df;
        }
        
        .chart-bar.mobile {
            background-color: #1cc88a;
        }
        
        .chart-bar.other {
            background-color: #f6c23e;
        }
        
        .chart-legend {
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
            gap: 20px;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
        }
        
        .legend-color {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 8px;
            border-radius: 3px;
        }
        
        .legend-color.web {
            background-color: #4e73df;
        }
        
        .legend-color.mobile {
            background-color: #1cc88a;
        }
        
        .legend-color.other {
            background-color: #f6c23e;
        }
        
        .legend-color.new {
            background-color: #36b9cc;
        }
        
        .legend-color.seasoned {
            background-color: #4e73df;
        }
        
        .legend-color.investors {
            background-color: #1cc88a;
        }
        
        .pie-chart-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
        }
        
        .pie-chart {
            position: relative;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: #ddd;
            overflow: hidden;
        }
        
        .pie-segment {
            position: absolute;
            width: 100%;
            height: 100%;
            transform-origin: 50% 100%;
        }
        
        .pie-segment.new {
            background: #36b9cc;
            transform: rotate(0deg) skew(calc((100 - var(--percentage)) * 3.6deg));
        }
        
        .pie-segment.seasoned {
            background: #4e73df;
            transform: rotate(calc(var(--percentage) * 3.6deg)) skew(calc((100 - var(--percentage)) * 3.6deg));
        }
        
        .pie-segment.investors {
            background: #1cc88a;
            transform: rotate(calc((var(--percentage) + 40) * 3.6deg));
        }
        
        .region-map {
            margin-top: 20px;
        }
        
        .region-bars {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .region-bar {
            display: flex;
            align-items: center;
        }
        
        .region-label {
            width: 130px;
            font-weight: 600;
        }
        
        .region-value-bar {
            height: 24px;
            background-color: #4e73df;
            border-radius: 4px;
        }
        
        .region-value {
            margin-left: 10px;
            font-weight: 600;
        }
    `;
    
    document.head.appendChild(style);
    
    // Add print button
    const printBtn = document.createElement('button');
    printBtn.className = 'print-button';
    printBtn.textContent = 'Print Report';
    printBtn.onclick = () => { window.print(); };
    
    const buttonStyle = document.createElement('style');
    buttonStyle.textContent = `
        .print-button {
            display: block;
            margin: 30px auto;
            padding: 12px 24px;
            background-color: #1c3d5a;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: background-color 0.2s;
        }
        
        .print-button:hover {
            background-color: #2a5885;
        }
        
        @media print {
            .print-button {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(buttonStyle);
    reportContainer.appendChild(printBtn);
}

// Helper function to create a report section
function createSection(title) {
    const section = document.createElement('section');
    section.className = 'report-section';
    
    const heading = document.createElement('h2');
    heading.className = 'section-title';
    heading.textContent = title;
    
    section.appendChild(heading);
    return section;
}

// Helper function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
}

// Add the HTML structure at the top of the document
document.addEventListener('DOMContentLoaded', function() {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CoinX Sales Report</title>
        </head>
        <body>
            <div class="container">
                <div class="report-options">
                    <button id="viewHTML" class="active">View as HTML</button>
                    <button id="viewText">View as Text</button>
                </div>
                <div id="reportContainer"></div>
                <pre id="reportValues" style="display: none;"></pre>
            </div>
        </body>
        </html>
    `;
    
    // Create a temporary container to hold the HTML content
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlContent;
    
    // Append the body content to the document
    const bodyContent = tempContainer.querySelector('body').innerHTML;
    document.body.innerHTML = bodyContent;
    
    // Mock data for demonstration
    const mockData = {
        title: "CoinX Sales Report - Q2 2023",
        totals: {
            order_count: 5284,
            total_items: 12947,
            revenue: 7854320.45
        },
        data: [
            { label: "April", order_count: 1742, total_items: 4231, revenue: 2584125.20 },
            { label: "May", order_count: 1893, total_items: 4687, revenue: 2847931.15 },
            { label: "June", order_count: 1649, total_items: 4029, revenue: 2422264.10 }
        ],
        top_selling_coins: [
            { name: "Gold American Eagle", total_sold: 427, total_revenue: 854000.00 },
            { name: "Silver Canadian Maple Leaf", total_sold: 1230, total_revenue: 615000.00 },
            { name: "Ancient Greek Tetradrachm", total_sold: 85, total_revenue: 425000.00 },
            { name: "Gold South African Krugerrand", total_sold: 312, total_revenue: 624000.00 },
            { name: "Silver American Eagle", total_sold: 1540, total_revenue: 770000.00 }
        ]
    };
    
    // Add event listeners for switching views
    document.getElementById('viewHTML').addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('viewText').classList.remove('active');
        document.getElementById('reportContainer').style.display = 'block';
        document.getElementById('reportValues').style.display = 'none';
        generateHtmlReport(mockData);
    });
    
    document.getElementById('viewText').addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('viewHTML').classList.remove('active');
        document.getElementById('reportContainer').style.display = 'none';
        document.getElementById('reportValues').style.display = 'block';
        generateTextReport(mockData);
    });
    
    // Initialize with HTML view
    generateHtmlReport(mockData);
    
    // Add styles for the toggle buttons
    const toggleStyle = document.createElement('style');
    toggleStyle.textContent = `
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .report-options {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            justify-content: center;
        }
        
        .report-options button {
            padding: 8px 16px;
            background-color: #f0f0f0;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
        }
        
        .report-options button.active {
            background-color: #1c3d5a;
            color: white;
        }
        
        #reportValues {
            font-family: monospace;
            white-space: pre-wrap;
            background-color: #f5f5f5;
            padding: 20px;
            border-radius: 8px;
            max-width: 100%;
            overflow-x: auto;
        }
    `;
    document.head.appendChild(toggleStyle);
});
