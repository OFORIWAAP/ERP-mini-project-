document.addEventListener('DOMContentLoaded', function() {
    updateDashboard();

    function updateDashboard() {
        // Update total inventory items
        const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        document.getElementById('total-inventory').textContent = inventory.length;

        // Update pending orders
        const orders = JSON.parse(localStorage.getItem('customerOrders')) || [];
        const pendingOrders = orders.filter(order => order.status.toLowerCase() === 'pending').length;
        document.getElementById('pending-orders').textContent = pendingOrders;

        // Update recent transactions (considering recent as within the last 7 days)
        const transactions = JSON.parse(localStorage.getItem('financialTransactions')) || [];
        const recentTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transactionDate);
            const today = new Date();
            const differenceInTime = today.getTime() - transactionDate.getTime();
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
            return differenceInDays <= 7;
        }).length;
        document.getElementById('recent-transactions').textContent = recentTransactions;

        // Populate activity feed
        const activityFeed = document.getElementById('activity-feed');
        activityFeed.innerHTML = '';
        inventory.slice(-5).forEach(item => {
            const li = document.createElement('li');
            li.textContent = `Added new inventory item: ${item.name}`;
            activityFeed.appendChild(li);
        });

        orders.slice(-5).forEach(order => {
            const li = document.createElement('li');
            li.textContent = `New order received: ${order.orderId} - ${order.product}`;
            activityFeed.appendChild(li);
        });

        transactions.slice(-5).forEach(transaction => {
            const li = document.createElement('li');
            li.textContent = `Transaction recorded: ${transaction.transactionId} - ${transaction.amount} ${transaction.transactionType}`;
            activityFeed.appendChild(li);
        });

        // Populate notifications (example: show low stock items)
        const notificationsList = document.getElementById('notifications-list');
        notificationsList.innerHTML = '';
        inventory.forEach(item => {
            if (item.stockLevel < 10) {
                const li = document.createElement('li');
                li.textContent = `Low stock alert for ${item.name} - ${item.stockLevel} items left.`;
                notificationsList.appendChild(li);
            }
        });
    }
});
