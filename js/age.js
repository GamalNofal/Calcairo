import { validators, formUtils, errorHandler, calculatorUtils, storageUtils } from './utils.js';

class AgeCalculator {
    constructor() {
        this.form = document.getElementById('ageForm');
        this.resultContainer = document.getElementById('resultContainer');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time calculation on date change
        const birthDateInput = this.form.querySelector('#birthDate');
        birthDateInput.addEventListener('change', 
            calculatorUtils.debounce(() => this.calculateAge(), 300)
        );
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            const errors = formUtils.validateForm(this.form);
            if (errors.length > 0) {
                throw new ValidationError(errors[0].message);
            }
            await this.calculateAge();
        } catch (error) {
            errorHandler.showError(error.message, this.resultContainer);
            errorHandler.logError(error, { context: 'ageCalculator' });
        }
    }

    async calculateAge() {
        try {
            const birthDate = new Date(this.form.querySelector('#birthDate').value);
            const today = new Date();

            // Validate birth date
            if (!validators.isDate(birthDate)) {
                throw new ValidationError('الرجاء إدخال تاريخ صحيح');
            }
            if (birthDate > today) {
                throw new ValidationError('تاريخ الميلاد لا يمكن أن يكون في المستقبل');
            }

            const ageDetails = this.calculateAgeDetails(birthDate, today);
            this.displayResults(ageDetails);

            // Save to history
            storageUtils.saveToHistory('age', {
                birthDate: birthDate.toISOString(),
                calculationDate: today.toISOString(),
                ageDetails
            });

        } catch (error) {
            errorHandler.showError(error.message, this.resultContainer);
            errorHandler.logError(error, { context: 'calculateAge' });
        }
    }

    calculateAgeDetails(birthDate, today) {
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        // Adjust for negative months or days
        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate());
            days = Math.floor((today - lastMonth) / (1000 * 60 * 60 * 24));
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // Calculate additional details
        const totalMonths = years * 12 + months;
        const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;
        const totalSeconds = totalMinutes * 60;

        // Calculate next birthday
        const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

        // Calculate zodiac sign
        const zodiacSign = this.getZodiacSign(birthDate);

        return {
            years,
            months,
            days,
            totalMonths,
            totalDays,
            totalHours,
            totalMinutes,
            totalSeconds,
            daysUntilBirthday,
            zodiacSign
        };
    }

    getZodiacSign(birthDate) {
        const day = birthDate.getDate();
        const month = birthDate.getMonth() + 1;
        
        const zodiacSigns = {
            'الحمل': [[3, 21], [4, 19]],
            'الثور': [[4, 20], [5, 20]],
            'الجوزاء': [[5, 21], [6, 20]],
            'السرطان': [[6, 21], [7, 22]],
            'الأسد': [[7, 23], [8, 22]],
            'العذراء': [[8, 23], [9, 22]],
            'الميزان': [[9, 23], [10, 22]],
            'العقرب': [[10, 23], [11, 21]],
            'القوس': [[11, 22], [12, 21]],
            'الجدي': [[12, 22], [1, 19]],
            'الدلو': [[1, 20], [2, 18]],
            'الحوت': [[2, 19], [3, 20]]
        };

        for (const [sign, [[startMonth, startDay], [endMonth, endDay]]] of Object.entries(zodiacSigns)) {
            if (
                (month === startMonth && day >= startDay) ||
                (month === endMonth && day <= endDay)
            ) {
                return sign;
            }
        }
        return 'الجدي'; // Default for edge case (Dec 22-31)
    }

    displayResults(results) {
        const {
            years, months, days, totalMonths, totalDays,
            totalHours, totalMinutes, totalSeconds,
            daysUntilBirthday, zodiacSign
        } = results;

        const formatter = new Intl.NumberFormat('ar-EG');

        this.resultContainer.innerHTML = `
            <div class="result-card">
                <h3>نتائج حساب العمر</h3>
                
                <div class="info-group primary-info">
                    <h4>العمر الدقيق</h4>
                    <p>${years} سنة، ${months} شهر، و ${days} يوم</p>
                </div>

                <div class="info-group">
                    <h4>تفاصيل إضافية</h4>
                    <p>إجمالي الأشهر: ${formatter.format(totalMonths)} شهر</p>
                    <p>إجمالي الأيام: ${formatter.format(totalDays)} يوم</p>
                    <p>إجمالي الساعات: ${formatter.format(totalHours)} ساعة</p>
                    <p>إجمالي الدقائق: ${formatter.format(totalMinutes)} دقيقة</p>
                    <p>إجمالي الثواني: ${formatter.format(totalSeconds)} ثانية</p>
                </div>

                <div class="info-group">
                    <h4>معلومات إضافية</h4>
                    <p>برجك الفلكي: ${zodiacSign}</p>
                    <p>الأيام المتبقية حتى عيد ميلادك: ${daysUntilBirthday} يوم</p>
                </div>
            </div>
        `;
    }
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AgeCalculator();
});
