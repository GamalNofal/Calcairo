class InheritanceCalculator {
    constructor() {
        this.form = document.getElementById('inheritanceForm');
        this.resultContainer = document.getElementById('inheritanceResult');
        
        // Exchange rates configuration
        this.exchangeApiConfig = {
            baseUrl: 'https://v6.exchangerate-api.com/v6/',
            apiKey: 'YOUR_API_KEY', // Replace with your API key
            baseCurrency: 'SAR'
        };
        
        this.exchangeRates = {
            SAR: 1.00,    // Base currency
            USD: 3.75,    // Fallback rates
            EUR: 4.12,
            GBP: 4.77
        };
        
        this.lastRatesUpdate = null;
        this.ratesUpdateInterval = 1 * 60 * 60 * 1000; // 1 hour
        
        this.initializeApp();
    }

    async initializeApp() {
        await this.initializeExchangeRates();
        this.initializeEventListeners();
        this.startRatesUpdateInterval();
    }

    async initializeExchangeRates() {
        try {
            const savedRates = this.getSavedRates();
            if (savedRates) {
                this.exchangeRates = savedRates;
                console.log('Using cached exchange rates');
            }

            if (this.shouldUpdateRates()) {
                await this.fetchExchangeRates();
            }
        } catch (error) {
            console.warn('Failed to initialize exchange rates:', error);
            this.showExchangeRateError();
        }
    }

    getSavedRates() {
        const saved = localStorage.getItem('inheritanceExchangeRates');
        if (!saved) return null;

        const { rates, timestamp } = JSON.parse(saved);
        this.lastRatesUpdate = timestamp;

        if (Date.now() - timestamp < this.ratesUpdateInterval) {
            return rates;
        }
        return null;
    }

    shouldUpdateRates() {
        return !this.lastRatesUpdate || 
               (Date.now() - this.lastRatesUpdate) > this.ratesUpdateInterval;
    }

    async fetchExchangeRates() {
        try {
            const response = await fetch(`${this.exchangeApiConfig.baseUrl}${this.exchangeApiConfig.apiKey}/latest/${this.exchangeApiConfig.baseCurrency}`);
            if (!response.ok) throw new Error('Exchange rate API request failed');

            const data = await response.json();
            if (data.result === 'success') {
                this.exchangeRates = { SAR: 1, ...data.conversion_rates };
                this.lastRatesUpdate = Date.now();
                
                localStorage.setItem('inheritanceExchangeRates', JSON.stringify({
                    rates: this.exchangeRates,
                    timestamp: this.lastRatesUpdate
                }));

                this.updateCurrencyLabels();
                if (this.form.checkValidity()) {
                    this.calculateInheritance();
                }

                this.showRatesUpdateSuccess();
            } else {
                throw new Error('Invalid API response');
            }
        } catch (error) {
            console.error('Failed to fetch exchange rates:', error);
            this.showExchangeRateError();
        }
    }

    startRatesUpdateInterval() {
        setInterval(() => {
            if (this.shouldUpdateRates()) {
                this.fetchExchangeRates();
            }
        }, this.ratesUpdateInterval);
    }

    showExchangeRateError() {
        const toast = document.createElement('div');
        toast.className = 'toast toast-error show';
        toast.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-exclamation-circle me-2"></i>
                <span>تعذر تحديث أسعار العملات. جاري استخدام الأسعار المحفوظة.</span>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    showRatesUpdateSuccess() {
        const toast = document.createElement('div');
        toast.className = 'toast toast-success show';
        toast.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-check-circle me-2"></i>
                <span>تم تحديث أسعار العملات بنجاح</span>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateInheritance();
        });

        // Sync currency selectors
        document.querySelectorAll('.currency-select[data-sync="estateCurrency"]').forEach(select => {
            select.addEventListener('change', (e) => {
                const selectedValue = e.target.value;
                document.querySelectorAll('.currency-select[data-sync="estateCurrency"]').forEach(otherSelect => {
                    if (otherSelect !== e.target) {
                        otherSelect.value = selectedValue;
                    }
                });
                this.updateCurrencyLabels();
                if (this.form.checkValidity()) {
                    this.calculateInheritance();
                }
            });
        });

        // Refresh rates button
        const refreshRatesBtn = document.getElementById('refresh-rates');
        if (refreshRatesBtn) {
            refreshRatesBtn.addEventListener('click', async () => {
                refreshRatesBtn.disabled = true;
                refreshRatesBtn.innerHTML = '<i class="bi bi-arrow-clockwise rotating"></i>';
                await this.fetchExchangeRates();
                refreshRatesBtn.disabled = false;
                refreshRatesBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i>';
            });
        }

        // Real-time calculation
        const inputs = ['totalEstate', 'debts'];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => {
                    if (this.form.checkValidity()) {
                        this.calculateInheritance();
                    }
                });
            }
        });
    }

    updateCurrencyLabels() {
        const currency = document.getElementById('estateCurrency').value;
        const symbol = document.querySelector(`option[value="${currency}"]`).dataset.symbol;
        
        // Update last update timestamp
        const lastUpdateEl = document.getElementById('rates-last-update');
        if (lastUpdateEl && this.lastRatesUpdate) {
            const date = new Date(this.lastRatesUpdate);
            lastUpdateEl.textContent = `آخر تحديث: ${date.toLocaleTimeString('ar-SA')}`;
        }

        // Update result values with new currency
        this.updateResults();
    }

    formatCurrency(amount, currency) {
        const symbol = document.querySelector(`option[value="${currency}"]`)?.dataset.symbol || currency;
        return new Intl.NumberFormat('ar-SA', {
            style: 'currency',
            currency: currency,
            currencyDisplay: 'symbol'
        }).format(amount).replace(currency, symbol);
    }

    calculateInheritance() {
        const totalEstate = Number(document.getElementById('totalEstate').value) || 0;
        const debts = Number(document.getElementById('debts').value) || 0;
        const currency = document.getElementById('estateCurrency').value;

        // Calculate net estate
        const netEstate = totalEstate - debts;
        if (netEstate <= 0) {
            this.showError('التركة لا تكفي لسداد الديون والوصايا');
            return;
        }

        // Get heirs information
        const heirs = this.getHeirsInfo();
        
        // Calculate shares
        const shares = this.calculateShares(heirs, netEstate);
        
        // Display results
        this.displayResults(shares, netEstate, currency);
    }

    getHeirsInfo() {
        return {
            spouse: document.querySelector('input[name="spouse"]:checked')?.value,
            sons: Number(document.getElementById('numSons').value) || 0,
            daughters: Number(document.getElementById('numDaughters').value) || 0,
            father: document.getElementById('father').checked,
            mother: document.getElementById('mother').checked,
            // Add more heirs as needed
        };
    }

    calculateShares(heirs, netEstate) {
        // This is a simplified calculation. You should implement the full Islamic inheritance rules here
        let shares = [];
        let totalShares = 0;

        // Example calculations (implement actual Islamic rules)
        if (heirs.spouse === 'husband') {
            shares.push({
                heir: 'الزوج',
                share: '1/4',
                amount: netEstate * 0.25
            });
            totalShares += 0.25;
        } else if (heirs.spouse === 'wife') {
            shares.push({
                heir: 'الزوجة',
                share: '1/8',
                amount: netEstate * 0.125
            });
            totalShares += 0.125;
        }

        // Add more share calculations based on Islamic inheritance rules

        return {
            shares: shares,
            totalShares: totalShares
        };
    }

    displayResults(sharesData, netEstate, currency) {
        const { shares, totalShares } = sharesData;

        // Update summary values
        document.getElementById('netEstate').textContent = this.formatCurrency(netEstate, currency);
        document.getElementById('totalShares').textContent = this.formatCurrency(netEstate * totalShares, currency);

        // Update shares table
        const tableBody = document.getElementById('sharesTableBody');
        tableBody.innerHTML = '';

        shares.forEach(share => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${share.heir}</td>
                <td>${share.share}</td>
                <td>${this.formatCurrency(share.amount, currency)}</td>
            `;
            tableBody.appendChild(row);
        });

        // Show results
        this.resultContainer.style.display = 'block';
    }

    showError(message) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-error show';
        toast.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-exclamation-circle me-2"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.inheritanceCalculator = new InheritanceCalculator();
});
