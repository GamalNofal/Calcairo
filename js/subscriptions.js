class SubscriptionCalculator {
    constructor() {
        this.subscriptions = [];
        this.form = document.getElementById('subscriptionForm');
        this.nameInput = document.getElementById('subscriptionName');
        this.amountInput = document.getElementById('subscriptionAmount');
        this.tableBody = document.getElementById('subscriptionsTable');
        this.totalAmount = document.getElementById('totalAmount');
        this.yearlyAmount = document.getElementById('yearlyAmount');

        this.initializeEventListeners();
        this.loadFromLocalStorage();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addSubscription();
        });
    }

    addSubscription() {
        const name = this.nameInput.value.trim();
        const amount = parseFloat(this.amountInput.value);

        if (name && amount > 0) {
            const subscription = {
                id: Date.now(),
                name: name,
                amount: amount
            };

            this.subscriptions.push(subscription);
            this.saveToLocalStorage();
            this.updateDisplay();
            this.form.reset();
        }
    }

    removeSubscription(id) {
        this.subscriptions = this.subscriptions.filter(sub => sub.id !== id);
        this.saveToLocalStorage();
        this.updateDisplay();
    }

    updateDisplay() {
        this.tableBody.innerHTML = '';
        
        this.subscriptions.forEach(sub => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sub.name}</td>
                <td>${sub.amount.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="calculator.removeSubscription(${sub.id})">
                        <i class="bi bi-trash"></i> حذف
                    </button>
                </td>
            `;
            this.tableBody.appendChild(row);
        });

        const total = this.subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
        this.totalAmount.textContent = total.toFixed(2);
        this.yearlyAmount.textContent = (total * 12).toFixed(2);
    }

    saveToLocalStorage() {
        localStorage.setItem('subscriptions', JSON.stringify(this.subscriptions));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('subscriptions');
        if (saved) {
            this.subscriptions = JSON.parse(saved);
            this.updateDisplay();
        }
    }
}

const calculator = new SubscriptionCalculator();
