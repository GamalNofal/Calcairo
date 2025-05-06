document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('currencyForm');
    const resultDiv = document.getElementById('result');
    const resultValueSpan = document.getElementById('resultValue');
    const resultDescriptionP = document.getElementById('resultDescription');
    const exchangeRateDiv = document.getElementById('exchangeRate');
    const swapButton = document.getElementById('swapButton');
    
    // API Configuration
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/';
    const cacheExpirationTime = 1800000; // 30 minutes in milliseconds

    // Cache management functions
    function getCachedRates(baseCurrency) {
        const cached = localStorage.getItem(`exchangeRates_${baseCurrency}`);
        if (cached) {
            const { rates, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < cacheExpirationTime) {
                return rates;
            }
        }
        return null;
    }

    function cacheRates(baseCurrency, rates) {
        const cacheData = {
            rates: rates,
            timestamp: Date.now()
        };
        localStorage.setItem(`exchangeRates_${baseCurrency}`, JSON.stringify(cacheData));
    }

    // Fetch exchange rates from API
    async function fetchExchangeRates(baseCurrency) {
        try {
            // Check cache first
            const cachedRates = getCachedRates(baseCurrency);
            if (cachedRates) {
                return cachedRates;
            }

            // If not in cache, fetch from API
            const response = await fetch(`${apiUrl}${baseCurrency}`);
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }

            const data = await response.json();
            
            // Cache the new rates
            cacheRates(baseCurrency, data.rates);
            
            return data.rates;
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            // Use fallback rates if API fails
            return getFallbackRates(baseCurrency);
        }
    }

    // Fallback rates in case API fails
    function getFallbackRates(baseCurrency) {
        // Use the most recent static rates as fallback
        const fallbackRates = {
            USD: {
                EUR: 0.93, GBP: 0.79, JPY: 144.50, SAR: 3.75, AED: 3.67, 
                EGP: 30.90, KWD: 0.31, QAR: 3.64, OMR: 0.38, BHD: 0.38,
                IQD: 1309.13, JOD: 0.71, LBP: 15075.00, MAD: 10.16,
                CHF: 0.87, CAD: 1.36, AUD: 1.52, CNY: 7.15,
                INR: 83.25, TRY: 29.05
            },
            EUR: {
                USD: 1.08, GBP: 0.86, JPY: 156.23, SAR: 4.05, AED: 3.97,
                EGP: 33.37, KWD: 0.33, QAR: 3.93, OMR: 0.41, BHD: 0.41,
                IQD: 1413.86, JOD: 0.77, LBP: 16281.00, MAD: 10.97,
                CHF: 0.94, CAD: 1.47, AUD: 1.64, CNY: 7.72,
                INR: 89.91, TRY: 31.37
            },
            GBP: {
                USD: 1.26, EUR: 1.17, JPY: 182.91, SAR: 4.74, AED: 4.64,
                EGP: 39.07, KWD: 0.39, QAR: 4.60, OMR: 0.48, BHD: 0.48,
                IQD: 1656.55, JOD: 0.90, LBP: 19082.00, MAD: 12.86,
                CHF: 1.10, CAD: 1.72, AUD: 1.92, CNY: 9.05,
                INR: 105.38, TRY: 36.77
            },
            SAR: {
                USD: 0.27, EUR: 0.25, GBP: 0.21, JPY: 38.53, AED: 0.98,
                EGP: 8.24, KWD: 0.082, QAR: 0.97, OMR: 0.10, BHD: 0.10,
                IQD: 349.10, JOD: 0.19, LBP: 4020.00, MAD: 2.71,
                CHF: 0.23, CAD: 0.36, AUD: 0.41, CNY: 1.91,
                INR: 22.20, TRY: 7.75
            },
            AED: {
                USD: 0.27, EUR: 0.25, GBP: 0.22, JPY: 39.37, SAR: 1.02,
                EGP: 8.42, KWD: 0.084, QAR: 0.99, OMR: 0.10, BHD: 0.10,
                IQD: 356.71, JOD: 0.19, LBP: 4108.00, MAD: 2.77,
                CHF: 0.24, CAD: 0.37, AUD: 0.41, CNY: 1.95,
                INR: 22.68, TRY: 7.92
            },
            EGP: {
                USD: 0.032, EUR: 0.030, GBP: 0.026, JPY: 4.68, SAR: 0.12,
                AED: 0.12, KWD: 0.010, QAR: 0.12, OMR: 0.012, BHD: 0.012,
                IQD: 42.37, JOD: 0.023, LBP: 488.00, MAD: 0.33,
                CHF: 0.028, CAD: 0.044, AUD: 0.049, CNY: 0.23,
                INR: 2.69, TRY: 0.94
            },
            KWD: {
                USD: 3.25, EUR: 3.01, GBP: 2.58, JPY: 469.89, SAR: 12.19,
                AED: 11.94, EGP: 100.43, QAR: 11.84, OMR: 1.25, BHD: 1.25,
                IQD: 4255.67, JOD: 2.31, LBP: 49000.00, MAD: 33.02,
                CHF: 2.83, CAD: 4.42, AUD: 4.94, CNY: 23.24,
                INR: 270.56, TRY: 94.41
            },
            QAR: {
                USD: 0.27, EUR: 0.25, GBP: 0.22, JPY: 39.70, SAR: 1.03,
                AED: 1.01, EGP: 8.49, KWD: 0.084, OMR: 0.11, BHD: 0.10,
                IQD: 359.65, JOD: 0.20, LBP: 4140.00, MAD: 2.79,
                CHF: 0.24, CAD: 0.37, AUD: 0.42, CNY: 1.96,
                INR: 22.87, TRY: 7.98
            },
            OMR: {
                USD: 2.60, EUR: 2.41, GBP: 2.06, JPY: 375.70, SAR: 9.75,
                AED: 9.55, EGP: 80.34, KWD: 0.80, QAR: 9.47, BHD: 0.98,
                IQD: 3402.74, JOD: 1.85, LBP: 39195.00, MAD: 26.42,
                CHF: 2.26, CAD: 3.54, AUD: 3.95, CNY: 18.59,
                INR: 216.45, TRY: 75.53
            },
            BHD: {
                USD: 2.65, EUR: 2.46, GBP: 2.10, JPY: 383.33, SAR: 9.95,
                AED: 9.74, EGP: 81.95, KWD: 0.82, QAR: 9.66, OMR: 1.02,
                IQD: 3471.79, JOD: 1.88, LBP: 40000.00, MAD: 26.95,
                CHF: 2.31, CAD: 3.61, AUD: 4.03, CNY: 18.95,
                INR: 220.78, TRY: 77.04
            },
            IQD: {
                USD: 0.00076, EUR: 0.00071, GBP: 0.00060, JPY: 0.11,
                SAR: 0.0029, AED: 0.0028, EGP: 0.024, KWD: 0.00024,
                QAR: 0.0028, OMR: 0.00029, BHD: 0.00029,
                JOD: 0.00054, LBP: 11.52, MAD: 0.0078,
                CHF: 0.00066, CAD: 0.0010, AUD: 0.0012, CNY: 0.0055,
                INR: 0.064, TRY: 0.022
            },
            JOD: {
                USD: 1.41, EUR: 1.31, GBP: 1.12, JPY: 203.90, SAR: 5.29,
                AED: 5.18, EGP: 43.62, KWD: 0.43, QAR: 5.14, OMR: 0.54,
                BHD: 0.53, IQD: 1847.23, LBP: 21280.00, MAD: 14.34,
                CHF: 1.23, CAD: 1.92, AUD: 2.14, CNY: 10.08,
                INR: 117.44, TRY: 40.99
            },
            LBP: {
                USD: 0.000066, EUR: 0.000061, GBP: 0.000052, JPY: 0.0096,
                SAR: 0.00025, AED: 0.00024, EGP: 0.0020, KWD: 0.000020,
                QAR: 0.00024, OMR: 0.000026, BHD: 0.000025, IQD: 0.087,
                JOD: 0.000047, MAD: 0.00067,
                CHF: 0.000058, CAD: 0.000090, AUD: 0.00010, CNY: 0.00047,
                INR: 0.0055, TRY: 0.0019
            },
            MAD: {
                USD: 0.098, EUR: 0.091, GBP: 0.078, JPY: 14.22, SAR: 0.37,
                AED: 0.36, EGP: 3.04, KWD: 0.030, QAR: 0.36, OMR: 0.038,
                BHD: 0.037, IQD: 128.85, JOD: 0.070, LBP: 1484.00,
                CHF: 0.086, CAD: 0.13, AUD: 0.15, CNY: 0.70,
                INR: 8.19, TRY: 2.86
            },
            CHF: {
                USD: 1.15, EUR: 1.06, GBP: 0.91, JPY: 165.37, SAR: 4.30,
                AED: 4.21, EGP: 35.40, KWD: 0.35, QAR: 4.18, OMR: 0.44,
                BHD: 0.43, IQD: 1501.30, JOD: 0.81, LBP: 17286.00, MAD: 11.65,
                CAD: 1.56, AUD: 1.74, CNY: 8.20,
                INR: 95.54, TRY: 33.34
            },
            CAD: {
                USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 106.25, SAR: 2.76,
                AED: 2.71, EGP: 22.75, KWD: 0.23, QAR: 2.68, OMR: 0.28,
                BHD: 0.28, IQD: 964.80, JOD: 0.52, LBP: 11110.00, MAD: 7.48,
                CHF: 0.64, AUD: 1.12, CNY: 5.26,
                INR: 61.37, TRY: 21.42
            },
            AUD: {
                USD: 0.66, EUR: 0.61, GBP: 0.52, JPY: 94.87, SAR: 2.47,
                AED: 2.42, EGP: 20.31, KWD: 0.20, QAR: 2.40, OMR: 0.25,
                BHD: 0.25, IQD: 861.43, JOD: 0.47, LBP: 9920.00, MAD: 6.68,
                CHF: 0.57, CAD: 0.89, CNY: 4.70,
                INR: 54.80, TRY: 19.13
            },
            CNY: {
                USD: 0.14, EUR: 0.13, GBP: 0.11, JPY: 20.21, SAR: 0.52,
                AED: 0.51, EGP: 4.32, KWD: 0.043, QAR: 0.51, OMR: 0.054,
                BHD: 0.053, IQD: 183.28, JOD: 0.099, LBP: 2110.00, MAD: 1.42,
                CHF: 0.12, CAD: 0.19, AUD: 0.21,
                INR: 11.65, TRY: 4.07
            },
            INR: {
                USD: 0.012, EUR: 0.011, GBP: 0.0095, JPY: 1.73, SAR: 0.045,
                AED: 0.044, EGP: 0.37, KWD: 0.0037, QAR: 0.044, OMR: 0.0046,
                BHD: 0.0045, IQD: 15.73, JOD: 0.0085, LBP: 181.00, MAD: 0.12,
                CHF: 0.010, CAD: 0.016, AUD: 0.018, CNY: 0.086,
                TRY: 0.35
            },
            TRY: {
                USD: 0.034, EUR: 0.032, GBP: 0.027, JPY: 4.97, SAR: 0.13,
                AED: 0.13, EGP: 1.06, KWD: 0.011, QAR: 0.13, OMR: 0.013,
                BHD: 0.013, IQD: 45.06, JOD: 0.024, LBP: 519.00, MAD: 0.35,
                CHF: 0.030, CAD: 0.047, AUD: 0.052, CNY: 0.25,
                INR: 2.87
            }
        };
        return fallbackRates[baseCurrency] || {};
    }

    // Currency conversion function
    async function convertCurrency() {
        const amount = parseFloat(document.getElementById('amount').value);
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;

        if (isNaN(amount) || !fromCurrency || !toCurrency) {
            alert('الرجاء إدخال قيمة صحيحة وتحديد العملات');
            return;
        }

        try {
            const rates = await fetchExchangeRates(fromCurrency);
            if (!rates || !rates[toCurrency]) {
                throw new Error('معدل التحويل غير متوفر');
            }

            const rate = rates[toCurrency];
            const result = amount * rate;
            
            displayResult(result, amount, fromCurrency, toCurrency);
            updateExchangeRate(rate, fromCurrency, toCurrency);
        } catch (error) {
            console.error('Error during conversion:', error);
            alert('حدث خطأ أثناء التحويل. الرجاء المحاولة مرة أخرى.');
        }
    }

    function updateExchangeRate(rate, fromCurrency, toCurrency) {
        if (rate) {
            exchangeRateDiv.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
        }
    }

    function displayResult(result, amount, fromCurrency, toCurrency) {
        resultValueSpan.textContent = result.toFixed(2);
        resultDescriptionP.textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        resultDiv.style.display = 'block';
    }

    // Event Listeners
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        convertCurrency();
    });

    swapButton.addEventListener('click', function() {
        const fromCurrency = document.getElementById('fromCurrency');
        const toCurrency = document.getElementById('toCurrency');
        [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
        convertCurrency();
    });

    // Initialize with default currencies
    const defaultFrom = document.getElementById('fromCurrency').value;
    const defaultTo = document.getElementById('toCurrency').value;
    fetchExchangeRates(defaultFrom).then(rates => {
        if (rates && rates[defaultTo]) {
            updateExchangeRate(rates[defaultTo], defaultFrom, defaultTo);
        }
    });
});
