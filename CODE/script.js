document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-product-form');
    const table = document.getElementById('inventory-list');

    // Load inventory from local storage
    loadInventory();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const productName = document.getElementById('product-name').value.trim();
        const category = document.getElementById('category').value.trim();
        const stockLevel = parseInt(document.getElementById('stock-level').value.trim());

        if (!productName || !category || isNaN(stockLevel) || stockLevel < 0) {
            alert('Please enter valid product details.');
            return;
        }

        addProductToTable(productName, category, stockLevel);
        saveInventory();
        form.reset();
    });

    table.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            deleteProduct(event.target);
            saveInventory();
        }
    });

    function addProductToTable(productName, category, stockLevel) {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${productName}</td>
            <td>${category}</td>
            <td>${stockLevel}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
    }

    function deleteProduct(button) {
        const row = button.closest('tr');
        if (confirm('Are you sure you want to delete this product?')) {
            row.remove();
        }
    }

    function saveInventory() {
        const rows = table.querySelectorAll('tr');
        const inventory = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const product = {
                    name: cells[0].textContent,
                    category: cells[1].textContent,
                    stockLevel: cells[2].textContent
                };
                inventory.push(product);
            }
        });

        localStorage.setItem('inventory', JSON.stringify(inventory));
    }

    function loadInventory() {
        const savedInventory = localStorage.getItem('inventory');
        if (savedInventory) {
            const inventory = JSON.parse(savedInventory);
            inventory.forEach(item => {
                addProductToTable(item.name, item.category, item.stockLevel);
            });
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('schedule-batch-form');
    const table = document.getElementById('production-schedule');

    // Load production schedule from local storage
    loadSchedule();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const batchNumber = document.getElementById('batch-number').value.trim();
        const productName = document.getElementById('product-name').value.trim();
        const scheduledDate = document.getElementById('scheduled-date').value;
        const status = document.getElementById('status').value;

        if (!batchNumber || !productName || !scheduledDate || !status) {
            alert('Please enter valid batch details.');
            return;
        }

        addBatchToTable(batchNumber, productName, scheduledDate, status);
        saveSchedule();
        form.reset();
    });

    table.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            deleteBatch(event.target);
            saveSchedule();
        }
    });

    function addBatchToTable(batchNumber, productName, scheduledDate, status) {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${batchNumber}</td>
            <td>${productName}</td>
            <td>${scheduledDate}</td>
            <td>${status}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
    }

    function deleteBatch(button) {
        const row = button.closest('tr');
        if (confirm('Are you sure you want to delete this batch?')) {
            row.remove();
        }
    }

    function saveSchedule() {
        const rows = table.querySelectorAll('tr');
        const schedule = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const batch = {
                    batchNumber: cells[0].textContent,
                    productName: cells[1].textContent,
                    scheduledDate: cells[2].textContent,
                    status: cells[3].textContent
                };
                schedule.push(batch);
            }
        });

        localStorage.setItem('productionSchedule', JSON.stringify(schedule));
    }

    function loadSchedule() {
        const savedSchedule = localStorage.getItem('productionSchedule');
        if (savedSchedule) {
            const schedule = JSON.parse(savedSchedule);
            schedule.forEach(item => {
                addBatchToTable(item.batchNumber, item.productName, item.scheduledDate, item.status);
            });
        }
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-order-form');
    const table = document.getElementById('orders-list');

    // Load orders from local storage
    loadOrders();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const orderId = document.getElementById('order-id').value.trim();
        const customerName = document.getElementById('customer-name').value.trim();
        const product = document.getElementById('product').value.trim();
        const quantity = document.getElementById('quantity').value;
        const status = document.getElementById('order-status').value;

        if (!orderId || !customerName || !product || !quantity || !status) {
            alert('Please enter valid order details.');
            return;
        }

        addOrderToTable(orderId, customerName, product, quantity, status);
        saveOrders();
        form.reset();
    });

    table.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            deleteOrder(event.target);
            saveOrders();
        }
    });

    function addOrderToTable(orderId, customerName, product, quantity, status) {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${orderId}</td>
            <td>${customerName}</td>
            <td>${product}</td>
            <td>${quantity}</td>
            <td>${status}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
    }

    function deleteOrder(button) {
        const row = button.closest('tr');
        if (confirm('Are you sure you want to delete this order?')) {
            row.remove();
        }
    }

    function saveOrders() {
        const rows = table.querySelectorAll('tr');
        const orders = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const order = {
                    orderId: cells[0].textContent,
                    customerName: cells[1].textContent,
                    product: cells[2].textContent,
                    quantity: cells[3].textContent,
                    status: cells[4].textContent
                };
                orders.push(order);
            }
        });

        localStorage.setItem('customerOrders', JSON.stringify(orders));
    }

    function loadOrders() {
        const savedOrders = localStorage.getItem('customerOrders');
        if (savedOrders) {
            const orders = JSON.parse(savedOrders);
            orders.forEach(item => {
                addOrderToTable(item.orderId, item.customerName, item.product, item.quantity, item.status);
            });
        }
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-transaction-form');
    const table = document.getElementById('transactions-list');

    // Load transactions from local storage
    loadTransactions();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const transactionId = document.getElementById('transaction-id').value.trim();
        const transactionDate = document.getElementById('transaction-date').value;
        const description = document.getElementById('description').value.trim();
        const amount = document.getElementById('amount').value;
        const transactionType = document.getElementById('transaction-type').value;

        if (!transactionId || !transactionDate || !description || !amount || !transactionType) {
            alert('Please enter valid transaction details.');
            return;
        }

        addTransactionToTable(transactionId, transactionDate, description, amount, transactionType);
        saveTransactions();
        form.reset();
    });

    table.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            deleteTransaction(event.target);
            saveTransactions();
        }
    });

    function addTransactionToTable(transactionId, transactionDate, description, amount, transactionType) {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${transactionId}</td>
            <td>${transactionDate}</td>
            <td>${description}</td>
            <td>${amount}</td>
            <td>${transactionType}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
    }

    function deleteTransaction(button) {
        const row = button.closest('tr');
        if (confirm('Are you sure you want to delete this transaction?')) {
            row.remove();
        }
    }

    function saveTransactions() {
        const rows = table.querySelectorAll('tr');
        const transactions = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const transaction = {
                    transactionId: cells[0].textContent,
                    transactionDate: cells[1].textContent,
                    description: cells[2].textContent,
                    amount: cells[3].textContent,
                    transactionType: cells[4].textContent
                };
                transactions.push(transaction);
            }
        });

        localStorage.setItem('financialTransactions', JSON.stringify(transactions));
    }

    function loadTransactions() {
        const savedTransactions = localStorage.getItem('financialTransactions');
        if (savedTransactions) {
            const transactions = JSON.parse(savedTransactions);
            transactions.forEach(item => {
                addTransactionToTable(item.transactionId, item.transactionDate, item.description, item.amount, item.transactionType);
            });
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-employee-form');
    const table = document.getElementById('employee-list');

    // Load employee records from local storage
    loadEmployees();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const employeeId = document.getElementById('employee-id').value.trim();
        const employeeName = document.getElementById('employee-name').value.trim();
        const position = document.getElementById('position').value.trim();
        const department = document.getElementById('department').value.trim();

        if (!employeeId || !employeeName || !position || !department) {
            alert('Please enter valid employee details.');
            return;
        }

        addEmployeeToTable(employeeId, employeeName, position, department);
        saveEmployees();
        form.reset();
    });

    table.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            deleteEmployee(event.target);
            saveEmployees();
        }
    });

    function addEmployeeToTable(employeeId, employeeName, position, department) {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${employeeId}</td>
            <td>${employeeName}</td>
            <td>${position}</td>
            <td>${department}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
    }

    function deleteEmployee(button) {
        const row = button.closest('tr');
        if (confirm('Are you sure you want to delete this employee record?')) {
            row.remove();
        }
    }

    function saveEmployees() {
        const rows = table.querySelectorAll('tr');
        const employees = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const employee = {
                    employeeId: cells[0].textContent,
                    employeeName: cells[1].textContent,
                    position: cells[2].textContent,
                    department: cells[3].textContent
                };
                employees.push(employee);
            }
        });

        localStorage.setItem('employeeRecords', JSON.stringify(employees));
    }

    function loadEmployees() {
        const savedEmployees = localStorage.getItem('employeeRecords');
        if (savedEmployees) {
            const employees = JSON.parse(savedEmployees);
            employees.forEach(item => {
                addEmployeeToTable(item.employeeId, item.employeeName, item.position, item.department);
            });
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-report-form');
    const table = document.getElementById('reports-list');

    // Load reports from local storage
    loadReports();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const reportId = document.getElementById('report-id').value.trim();
        const title = document.getElementById('title').value.trim();
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value.trim();

        if (!reportId || !title || !date || !description) {
            alert('Please enter valid report details.');
            return;
        }

        addReportToTable(reportId, title, date, description);
        saveReports();
        form.reset();
    });

    table.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            deleteReport(event.target);
            saveReports();
        }
    });

    function addReportToTable(reportId, title, date, description) {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${reportId}</td>
            <td>${title}</td>
            <td>${date}</td>
            <td>${description}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
    }

    function deleteReport(button) {
        const row = button.closest('tr');
        if (confirm('Are you sure you want to delete this report?')) {
            row.remove();
        }
    }

    function saveReports() {
        const rows = table.querySelectorAll('tr');
        const reports = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const report = {
                    reportId: cells[0].textContent,
                    title: cells[1].textContent,
                    date: cells[2].textContent,
                    description: cells[3].textContent
                };
                reports.push(report);
            }
        });

        localStorage.setItem('reportRecords', JSON.stringify(reports));
    }

    function loadReports() {
        const savedReports = localStorage.getItem('reportRecords');
        if (savedReports) {
            const reports = JSON.parse(savedReports);
            reports.forEach(item => {
                addReportToTable(item.reportId, item.title, item.date, item.description);
            });
        }
    }
});


