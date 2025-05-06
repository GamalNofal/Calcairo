class BMICalculator {
    constructor() {
        this.form = document.getElementById('bmiForm');
        this.resultContainer = document.getElementById('resultContainer');
        this.bmiIndicator = document.getElementById('bmiIndicator');
        this.historyContainer = document.getElementById('historyContainer');
        
        this.bmiCategories = {
            underweight: { max: 18.5, class: 'underweight', text: 'نقص في الوزن', color: '#17a2b8' },
            normal: { max: 24.9, class: 'normal', text: 'وزن طبيعي', color: '#28a745' },
            overweight: { max: 29.9, class: 'overweight', text: 'زيادة في الوزن', color: '#ffc107' },
            obese: { max: 34.9, class: 'obese', text: 'سمنة درجة أولى', color: '#dc3545' },
            severelyObese: { max: 39.9, class: 'severely-obese', text: 'سمنة درجة ثانية', color: '#dc3545' },
            morbilyObese: { max: Infinity, class: 'morbidly-obese', text: 'سمنة مفرطة', color: '#dc3545' }
        };
        
        this.initializeEventListeners();
        this.loadHistory();
    }

    initializeEventListeners() {
        if (!this.form) {
            console.error('BMI form not found');
            return;
        }

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Handle unit system change
        const unitSystem = this.form.querySelector('#unitSystem');
        if (unitSystem) {
            unitSystem.addEventListener('change', () => this.toggleUnitSystem());
        }

        // Add input validation
        const numericInputs = this.form.querySelectorAll('input[type="number"]');
        numericInputs.forEach(input => {
            input.addEventListener('input', () => this.validateInput(input));
        });
    }

    validateInput(input) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.getAttribute('min') || 0);
        const max = parseFloat(input.getAttribute('max') || Infinity);
        const name = input.getAttribute('name');

        // Remove any non-numeric characters except decimal point
        input.value = input.value.replace(/[^\d.]/g, '');

        // Ensure only one decimal point
        const parts = input.value.split('.');
        if (parts.length > 2) {
            input.value = parts[0] + '.' + parts.slice(1).join('');
        }

        if (input.value === '' || isNaN(value)) {
            input.classList.add('is-invalid');
            this.showInputError(input, 'الرجاء إدخال قيمة صحيحة');
            return false;
        }

        if (value < min) {
            input.classList.add('is-invalid');
            this.showInputError(input, `القيمة يجب أن تكون ${min} أو أكثر`);
            return false;
        }

        if (value > max) {
            input.classList.add('is-invalid');
            this.showInputError(input, `القيمة يجب أن تكون ${max} أو أقل`);
            return false;
        }

        // Clear any previous error
        input.classList.remove('is-invalid');
        this.clearInputError(input);
        return true;
    }

    showInputError(input, message) {
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
        errorDiv.textContent = message;
    }

    clearInputError(input) {
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
            errorDiv.textContent = '';
        }
    }

    toggleUnitSystem() {
        const unitSystem = this.form.querySelector('#unitSystem').value;
        const metricInputs = this.form.querySelector('.metric-inputs');
        const imperialInputs = this.form.querySelector('.imperial-inputs');
        
        if (unitSystem === 'metric') {
            metricInputs.classList.remove('d-none');
            imperialInputs.classList.add('d-none');
            
            // Enable metric inputs
            this.form.querySelectorAll('.metric-inputs input').forEach(input => {
                input.disabled = false;
                input.required = true;
            });
            
            // Disable imperial inputs
            this.form.querySelectorAll('.imperial-inputs input').forEach(input => {
                input.disabled = true;
                input.required = false;
                input.value = '';
            });
        } else {
            metricInputs.classList.add('d-none');
            imperialInputs.classList.remove('d-none');
            
            // Enable imperial inputs
            this.form.querySelectorAll('.imperial-inputs input').forEach(input => {
                input.disabled = false;
                input.required = true;
            });
            
            // Disable metric inputs
            this.form.querySelectorAll('.metric-inputs input').forEach(input => {
                input.disabled = true;
                input.required = false;
                input.value = '';
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            
            // Validate all required inputs
            let isValid = true;
            this.form.querySelectorAll('input[type="number"]').forEach(input => {
                if (input.required && !input.disabled) {
                    isValid = this.validateInput(input) && isValid;
                }
            });

            if (!isValid) {
                throw new Error('الرجاء تصحيح الأخطاء في النموذج');
            }
            
            this.calculateBMI(data);
        } catch (error) {
            this.showError(error.message);
        }
    }

    calculateBMI(data) {
        let weight, height;

        if (data.unitSystem === 'metric') {
            weight = parseFloat(data.weightKg);
            height = parseFloat(data.heightCm) / 100; // Convert cm to meters
        } else {
            // Convert imperial to metric
            weight = parseFloat(data.weightLbs) * 0.453592; // Convert lbs to kg
            const heightInches = (parseFloat(data.heightFt) * 12) + parseFloat(data.heightIn);
            height = heightInches * 0.0254; // Convert inches to meters
        }

        const bmi = weight / (height * height);
        const category = this.getBMICategory(bmi);
        const idealWeight = this.calculateIdealWeight(height, data.gender);
        const bodyFat = this.estimateBodyFat(bmi, parseInt(data.age), data.gender);

        this.displayResults({
            bmi,
            category,
            idealWeight,
            currentWeight: weight,
            bodyFat,
            gender: data.gender,
            age: parseInt(data.age)
        });

        this.saveToHistory({
            date: new Date().toLocaleDateString('ar-EG'),
            bmi,
            weight,
            height,
            category: category.text,
            bodyFat
        });
    }

    getBMICategory(bmi) {
        for (const [key, data] of Object.entries(this.bmiCategories)) {
            if (bmi <= data.max) {
                return { ...data, key };
            }
        }
        return this.bmiCategories.morbilyObese;
    }

    calculateIdealWeight(height, gender) {
        // Using Hamwi formula
        const baseWeight = gender === 'male' ? 48 : 45.5; // kg for first 152.4 cm
        const additionalHeight = Math.max(0, (height * 100) - 152.4);
        const weightPerCm = gender === 'male' ? 1.1 : 0.9;
        const idealWeight = baseWeight + (additionalHeight * weightPerCm);
        
        return {
            min: idealWeight * 0.9,
            max: idealWeight * 1.1
        };
    }

    estimateBodyFat(bmi, age, gender) {
        // Using Deurenberg formula
        const genderFactor = gender === 'male' ? 1 : 0;
        const bodyFat = (1.20 * bmi) + (0.23 * age) - (10.8 * genderFactor) - 5.4;
        return Math.max(0, Math.min(bodyFat, 100));
    }

    updateBMIIndicator(bmi) {
        if (!this.bmiIndicator) return;

        // Calculate position (0-100%)
        let position = 0;
        if (bmi <= 18.5) {
            position = (bmi / 18.5) * 18.5;
        } else if (bmi <= 24.9) {
            position = 18.5 + ((bmi - 18.5) / 6.4) * 6.5;
        } else if (bmi <= 29.9) {
            position = 25 + ((bmi - 24.9) / 5) * 5;
        } else if (bmi <= 34.9) {
            position = 30 + ((bmi - 29.9) / 5) * 5;
        } else {
            position = Math.min(100, 35 + ((bmi - 34.9) / 5) * 5);
        }
        
        this.bmiIndicator.style.left = `${position}%`;
    }

    displayResults(results) {
        const { bmi, category, idealWeight, currentWeight, bodyFat, gender, age } = results;
        const weightDiff = currentWeight - idealWeight.min;
        
        this.resultContainer.innerHTML = `
            <div class="result-card ${category.class}">
                <h3>نتائج حساب مؤشر كتلة الجسم</h3>
                
                <div class="bmi-display">
                    <div class="bmi-value">${bmi.toFixed(1)}</div>
                    <div class="bmi-category">${category.text}</div>
                </div>

                <div class="info-group">
                    <h4>تفاصيل النتائج</h4>
                    <p>الوزن المثالي: ${idealWeight.min.toFixed(1)} - ${idealWeight.max.toFixed(1)} كجم</p>
                    <p>نسبة الدهون التقريبية: ${bodyFat.toFixed(1)}%</p>
                    ${weightDiff > 0 ? 
                        `<p>تحتاج إلى إنقاص ${weightDiff.toFixed(1)} كجم للوصول للوزن المثالي</p>` :
                        weightDiff < 0 ?
                        `<p>تحتاج إلى زيادة ${Math.abs(weightDiff).toFixed(1)} كجم للوصول للوزن المثالي</p>` :
                        `<p>أنت في نطاق الوزن المثالي</p>`
                    }
                </div>

                <div class="recommendations">
                    <h4>توصيات صحية</h4>
                    ${this.getHealthRecommendations(category.key, bodyFat, gender, age)}
                </div>
            </div>
        `;

        this.updateBMIIndicator(bmi);
    }

    getHealthRecommendations(category, bodyFat, gender, age) {
        const recommendations = {
            underweight: `
                <ul>
                    <li>زيادة السعرات الحرارية اليومية بشكل صحي (300-500 سعر حراري إضافي)</li>
                    <li>تناول 5-6 وجبات صغيرة خلال اليوم</li>
                    <li>التركيز على الأطعمة الغنية بالبروتين والكربوهيدرات المعقدة</li>
                    <li>ممارسة تمارين بناء العضلات 3-4 مرات أسبوعياً</li>
                    <li>تناول المكسرات والأفوكادو والزيوت الصحية</li>
                </ul>
            `,
            normal: `
                <ul>
                    <li>الحفاظ على نمط الحياة الصحي الحالي</li>
                    <li>ممارسة الرياضة 150 دقيقة أسبوعياً على الأقل</li>
                    <li>تناول غذاء متوازن يشمل جميع العناصر الغذائية</li>
                    <li>شرب 8-10 أكواب ماء يومياً</li>
                    <li>النوم 7-8 ساعات يومياً</li>
                </ul>
            `,
            overweight: `
                <ul>
                    <li>تقليل السعرات الحرارية اليومية بمقدار 500 سعر</li>
                    <li>ممارسة تمارين القلب والأيروبكس 30-45 دقيقة يومياً</li>
                    <li>تناول الخضروات والفواكه في كل وجبة</li>
                    <li>تجنب الأطعمة المصنعة والسكريات المضافة</li>
                    <li>تناول البروتين في كل وجبة للحفاظ على الشعور بالشبع</li>
                </ul>
            `,
            obese: `
                <ul>
                    <li>استشارة أخصائي تغذية لوضع خطة غذائية مناسبة</li>
                    <li>البدء بتمارين خفيفة مثل المشي 20-30 دقيقة يومياً</li>
                    <li>تجنب الأطعمة المقلية والوجبات السريعة</li>
                    <li>مراقبة حجم الوجبات واستخدام صحون أصغر</li>
                    <li>الاهتمام بالصحة النفسية وإدارة التوتر</li>
                </ul>
            `,
            severelyObese: `
                <ul>
                    <li>استشارة طبية عاجلة لتقييم الحالة الصحية</li>
                    <li>وضع خطة شاملة لإنقاص الوزن تحت إشراف طبي</li>
                    <li>البدء بتمارين منخفضة التأثير لحماية المفاصل</li>
                    <li>مراقبة مستويات السكر وضغط الدم بانتظام</li>
                    <li>الانضمام لمجموعات الدعم وطلب المساعدة النفسية</li>
                </ul>
            `,
            morbilyObese: `
                <ul>
                    <li>استشارة طبية فورية لتقييم خيارات العلاج المتاحة</li>
                    <li>دراسة إمكانية التدخل الجراحي مع الطبيب المختص</li>
                    <li>وضع خطة طويلة المدى للتعامل مع السمنة</li>
                    <li>العمل مع فريق طبي متكامل يشمل أخصائي تغذية ونفسي</li>
                    <li>مراقبة المؤشرات الحيوية بشكل دوري</li>
                </ul>
            `
        };

        return recommendations[category] || recommendations.normal;
    }

    saveToHistory(entry) {
        let history = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
        history.unshift(entry);
        history = history.slice(0, 10); // Keep only last 10 entries
        localStorage.setItem('bmiHistory', JSON.stringify(history));
        this.displayHistory(history);
    }

    loadHistory() {
        const history = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
        this.displayHistory(history);
    }

    displayHistory(history) {
        if (!this.historyContainer) return;
        
        if (history.length === 0) {
            this.historyContainer.innerHTML = '<p class="text-muted text-center">لا يوجد سجل سابق</p>';
            return;
        }

        const historyHTML = history.map(entry => `
            <div class="history-item">
                <div class="d-flex justify-content-between align-items-center">
                    <span class="date">${entry.date}</span>
                    <span class="badge ${this.getBMIBadgeClass(entry.bmi)}">${entry.bmi.toFixed(1)}</span>
                </div>
                <small class="text-muted">
                    الوزن: ${entry.weight.toFixed(1)} كجم | 
                    الطول: ${(entry.height * 100).toFixed(1)} سم |
                    نسبة الدهون: ${entry.bodyFat.toFixed(1)}%
                </small>
            </div>
        `).join('');

        this.historyContainer.innerHTML = historyHTML;
    }

    getBMIBadgeClass(bmi) {
        if (bmi < 18.5) return 'bg-info';
        if (bmi < 25) return 'bg-success';
        if (bmi < 30) return 'bg-warning';
        return 'bg-danger';
    }

    showError(message) {
        this.resultContainer.innerHTML = `
            <div class="alert alert-danger">
                ${message}
            </div>
        `;
    }
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        new BMICalculator();
    } catch (error) {
        console.error('Error initializing BMI calculator:', error);
    }
});
