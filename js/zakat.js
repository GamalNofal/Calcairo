<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>حاسبة الزكاة</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css">
    <style>
        body {
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f8f9fa;
        }
        .calculator-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            margin-bottom: 1rem;
        }
        .result-card {
            background: linear-gradient(135deg, #0d6efd, #0a58ca);
            color: white;
            border-radius: 15px;
            padding: 2rem;
            margin-top: 2rem;
            text-align: center;
        }
        .form-label {
            font-weight: 500;
            margin-bottom: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="container py-5">
        <h1 class="text-center mb-4">
            <i class="bi bi-calculator"></i>
            حاسبة الزكاة
        </h1>

        <div class="row justify-content-center">
            <div class="col-lg-8">
                <form id="zakatForm" class="calculator-card">
                    <!-- النقود والأرصدة -->
                    <div class="mb-4">
                        <h3 class="mb-3">
                            <i class="bi bi-cash-stack text-primary"></i>
                            النقود والأرصدة
                        </h3>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label">النقود السائلة</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="cash" min="0" step="0.01">
                                    <select class="form-select" id="currency" style="max-width: 140px;">
                                        <option value="SAR" data-symbol="ر.س">ريال سعودي</option>
                                        <option value="USD" data-symbol="$">دولار أمريكي</option>
                                        <option value="EUR" data-symbol="€">يورو</option>
                                        <option value="GBP" data-symbol="£">جنيه إسترليني</option>
                                        <option value="AED" data-symbol="د.إ">درهم إماراتي</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">الأرصدة البنكية</label>
                                <input type="number" class="form-control" id="bankBalance" min="0" step="0.01">
                            </div>
                        </div>
                    </div>

                    <!-- الذهب والفضة -->
                    <div class="mb-4">
                        <h3 class="mb-3">
                            <i class="bi bi-gem text-warning"></i>
                            الذهب والفضة
                        </h3>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label">وزن الذهب (جرام)</label>
                                <input type="number" class="form-control" id="goldWeight" min="0" step="0.01">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">وزن الفضة (جرام)</label>
                                <input type="number" class="form-control" id="silverWeight" min="0" step="0.01">
                            </div>
                        </div>
                    </div>

                    <!-- زر الحساب -->
                    <div class="text-center">
                        <button type="button" id="calculateBtn" class="btn btn-primary btn-lg px-5">
                            احسب الزكاة
                        </button>
                    </div>
                </form>

                <!-- نتيجة الحساب -->
                <div id="resultCard" class="result-card" style="display: none;">
                    <h3 class="mb-3">مقدار الزكاة</h3>
                    <div id="zakatAmount" class="display-4 mb-3"></div>
                    <div id="zakatDetails" class="text-white-50"></div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        class ZakatCalculator {
            constructor() {
                // Current prices (in SAR)
                this.prices = {
                    gold: 250,  // Price per gram
                    silver: 3   // Price per gram
                };

                // Nisab thresholds (in grams)
                this.nisab = {
                    gold: 85,    // 85 grams of gold
                    silver: 595  // 595 grams of silver
                };

                // Exchange rates (relative to SAR)
                this.exchangeRates = {
                    SAR: 1.00,
                    USD: 3.75,
                    EUR: 4.12,
                    GBP: 4.77,
                    AED: 1.02
                };

                this.initializeCalculator();
            }

            initializeCalculator() {
                // Get DOM elements
                this.form = document.getElementById('zakatForm');
                this.calculateBtn = document.getElementById('calculateBtn');
                this.resultCard = document.getElementById('resultCard');
                this.zakatAmount = document.getElementById('zakatAmount');
                this.zakatDetails = document.getElementById('zakatDetails');

                // Add event listener to calculate button
                if (this.calculateBtn) {
                    this.calculateBtn.addEventListener('click', () => this.calculateZakat());
                }
            }

            calculateZakat() {
                try {
                    // Get form values
                    const cash = parseFloat(document.getElementById('cash').value) || 0;
                    const bankBalance = parseFloat(document.getElementById('bankBalance').value) || 0;
                    const goldWeight = parseFloat(document.getElementById('goldWeight').value) || 0;
                    const silverWeight = parseFloat(document.getElementById('silverWeight').value) || 0;
                    const currency = document.getElementById('currency').value;

                    // Convert to SAR
                    const exchangeRate = this.exchangeRates[currency];
                    const totalCash = (cash + bankBalance) * exchangeRate;

                    // Calculate precious metals value in SAR
                    const goldValue = goldWeight * this.prices.gold;
                    const silverValue = silverWeight * this.prices.silver;

                    // Calculate total assets in SAR
                    const totalAssets = totalCash + goldValue + silverValue;

                    // Calculate Nisab threshold in SAR
                    const goldNisab = this.nisab.gold * this.prices.gold;
                    const silverNisab = this.nisab.silver * this.prices.silver;
                    const nisabThreshold = Math.min(goldNisab, silverNisab);

                    // Calculate Zakat
                    const zakatAmount = totalAssets >= nisabThreshold ? totalAssets * 0.025 : 0;

                    // Display results
                    this.displayResults({
                        zakatAmount: zakatAmount / exchangeRate,
                        totalAssets: totalAssets / exchangeRate,
                        nisabThreshold: nisabThreshold / exchangeRate,
                        currency: currency,
                        isEligible: totalAssets >= nisabThreshold
                    });

                } catch (error) {
                    console.error('Error calculating zakat:', error);
                    alert('حدث خطأ أثناء حساب الزكاة');
                }
            }

            displayResults(result) {
                // Format numbers
                const formatter = new Intl.NumberFormat('ar-SA', {
                    style: 'currency',
                    currency: result.currency,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });

                // Show result card
                this.resultCard.style.display = 'block';

                // Update amount
                this.zakatAmount.textContent = formatter.format(result.zakatAmount);

                // Update details
                let detailsHTML = `
                    <div class="mb-2">إجمالي الأصول: ${formatter.format(result.totalAssets)}</div>
                    <div class="mb-2">نصاب الزكاة: ${formatter.format(result.nisabThreshold)}</div>
                    <div class="mt-3 ${result.isEligible ? 'text-white' : 'text-warning'}">
                        ${result.isEligible ? 'تجب عليك الزكاة' : 'لم تبلغ النصاب - لا تجب عليك الزكاة'}
                    </div>
                `;
                
                this.zakatDetails.innerHTML = detailsHTML;

                // Scroll to results
                this.resultCard.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Initialize calculator when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            window.zakatCalculator = new ZakatCalculator();
        });
    </script>
</body>
</html>
