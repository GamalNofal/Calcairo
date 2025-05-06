import { ValidationError, debounce, validateInput, addToHistory } from './utils.js';

class BloodPressureAnalyzer {
    constructor() {
        this.form = document.getElementById('bpForm');
        this.resultContainer = document.getElementById('result');
        this.readingsList = document.getElementById('readingsList');
        
        this.inputs = {
            systolic: document.getElementById('systolic'),
            diastolic: document.getElementById('diastolic'),
            pulse: document.getElementById('pulseRate'),
            readingTime: document.getElementById('readingTime')
        };

        this.bpCategories = {
            normal: {
                name: 'طبيعي',
                systolic: { min: 0, max: 120 },
                diastolic: { min: 0, max: 80 },
                color: 'success',
                position: 10
            },
            elevated: {
                name: 'مرتفع',
                systolic: { min: 120, max: 129 },
                diastolic: { min: 0, max: 80 },
                color: 'warning',
                position: 30
            },
            stage1: {
                name: 'المرحلة 1',
                systolic: { min: 130, max: 139 },
                diastolic: { min: 80, max: 89 },
                color: 'orange',
                position: 50
            },
            stage2: {
                name: 'المرحلة 2',
                systolic: { min: 140, max: 180 },
                diastolic: { min: 90, max: 120 },
                color: 'danger',
                position: 70
            },
            crisis: {
                name: 'أزمة ارتفاع ضغط الدم',
                systolic: { min: 180, max: 300 },
                diastolic: { min: 120, max: 200 },
                color: 'purple',
                position: 90
            }
        };

        this.pulseRanges = {
            low: { min: 0, max: 60, name: 'منخفض' },
            normal: { min: 60, max: 100, name: 'طبيعي' },
            high: { min: 100, max: 300, name: 'مرتفع' }
        };

        this.readingsHistory = this.loadHistory();
        this.setupEventListeners();
        this.updateReadingsList();
    }

    setupEventListeners() {
        // Real-time analysis with debouncing
        const debouncedAnalyze = debounce(() => this.analyzeBloodPressure(), 500);

        Object.values(this.inputs).forEach(input => {
            input.addEventListener('input', debouncedAnalyze);
        });

        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.analyzeBloodPressure();
        });
    }

    loadHistory() {
        return JSON.parse(localStorage.getItem('bp-history')) || [];
    }

    validateInputs() {
        const validations = {
            systolic: { min: 70, max: 300 },
            diastolic: { min: 40, max: 200 },
            pulse: { min: 40, max: 300 }
        };

        for (const [field, limits] of Object.entries(validations)) {
            if (this.inputs[field].value) {
                validateInput(this.inputs[field], limits.min, limits.max);
            }
        }

        // Additional validation for systolic/diastolic relationship
        const systolic = parseInt(this.inputs.systolic.value);
        const diastolic = parseInt(this.inputs.diastolic.value);
        
        if (systolic <= diastolic) {
            throw new ValidationError('الضغط الانقباضي يجب أن يكون أعلى من الضغط الانبساطي');
        }
    }

    analyzeBloodPressure() {
        try {
            // Clear previous errors
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(el => el.remove());

            this.validateInputs();

            const systolic = parseInt(this.inputs.systolic.value);
            const diastolic = parseInt(this.inputs.diastolic.value);
            const pulse = this.inputs.pulse.value ? parseInt(this.inputs.pulse.value) : null;
            const readingTime = this.inputs.readingTime.value || new Date().toLocaleTimeString('ar-EG');

            const category = this.getBPCategory(systolic, diastolic);
            
            this.saveReading(systolic, diastolic, pulse, category, readingTime);
            this.displayResults(systolic, diastolic, pulse, category);
            this.updateGaugeMarker(systolic, diastolic, category);
            this.updateRecommendations(category, pulse);

            this.resultContainer.style.display = 'block';
            this.resultContainer.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            if (error instanceof ValidationError) {
                // Create error message element
                const errorDiv = document.createElement('div');
                errorDiv.className = 'alert alert-danger error-message';
                errorDiv.textContent = error.message;
                
                // Insert error message before the form
                this.form.parentNode.insertBefore(errorDiv, this.form);
                
                // Hide results if there's an error
                this.resultContainer.style.display = 'none';
            } else {
                console.error('Unexpected error:', error);
                throw error;
            }
        }
    }

    getBPCategory(systolic, diastolic) {
        if (systolic >= 180 || diastolic >= 120) return this.bpCategories.crisis;
        if (systolic >= 140 || diastolic >= 90) return this.bpCategories.stage2;
        if (systolic >= 130 || diastolic >= 80) return this.bpCategories.stage1;
        if (systolic >= 120 && diastolic < 80) return this.bpCategories.elevated;
        return this.bpCategories.normal;
    }

    getPulseCategory(pulse) {
        if (pulse < this.pulseRanges.normal.min) return this.pulseRanges.low;
        if (pulse > this.pulseRanges.normal.max) return this.pulseRanges.high;
        return this.pulseRanges.normal;
    }

    saveReading(systolic, diastolic, pulse, category, readingTime) {
        const reading = {
            date: new Date().toISOString(),
            systolic,
            diastolic,
            pulse,
            category: category.name,
            color: category.color,
            readingTime: readingTime
        };

        this.readingsHistory.unshift(reading);
        if (this.readingsHistory.length > 10) {
            this.readingsHistory.pop();
        }

        addToHistory('bp-history', reading);
        this.updateReadingsList();
    }

    displayResults(systolic, diastolic, pulse, category) {
        // Update category display
        document.getElementById('bpCategory').textContent = category.name;
        document.getElementById('bpCategory').className = `alert alert-${category.color}`;

        // Update readings display
        document.getElementById('systolicValue').textContent = systolic;
        document.getElementById('diastolicValue').textContent = diastolic;
        
        if (pulse) {
            const pulseCategory = this.getPulseCategory(pulse);
            document.getElementById('pulseValue').textContent = pulse;
            document.getElementById('pulseCategory').textContent = pulseCategory.name;
        }

        this.updateGaugeMarker(systolic, diastolic, category);
        this.updateRecommendations(category, pulse);
    }

    updateGaugeMarker(systolic, diastolic, category) {
        const position = this.calculateGaugePosition(systolic);
        const marker = document.querySelector('.bp-marker');
        marker.style.left = `${position}%`;
        marker.style.backgroundColor = `var(--bs-${category.color})`;
    }

    calculateGaugePosition(systolic) {
        const minSystolic = 90;
        const maxSystolic = 200;
        const position = ((systolic - minSystolic) / (maxSystolic - minSystolic)) * 100;
        return Math.max(0, Math.min(100, position));
    }

    updateReadingsList() {
        this.readingsList.innerHTML = this.readingsHistory
            .map(reading => `
                <div class="reading-item">
                    <div class="reading-info">
                        <span class="reading-time">${reading.readingTime}</span>
                        <span class="reading-value">${reading.systolic}/${reading.diastolic}</span>
                        ${reading.pulse ? `<span class="reading-pulse">النبض: ${reading.pulse}</span>` : ''}
                    </div>
                    <span class="reading-category bg-${reading.color}">${reading.category}</span>
                </div>
            `).join('');
    }

    updateRecommendations(category, pulse) {
        const recommendations = {
            lifestyle: [
                'تناول نظام غذائي صحي منخفض الصوديوم',
                'ممارسة التمارين الرياضية بانتظام',
                'الحفاظ على وزن صحي',
                'الحد من تناول الكحول',
                'الإقلاع عن التدخين',
                'إدارة التوتر',
                'النوم الكافي'
            ],
            medical: []
        };

        // Add medical recommendations based on category
        if (category === this.bpCategories.crisis) {
            recommendations.medical.push(
                'اطلب العناية الطبية الفورية',
                'توجه إلى أقرب غرفة طوارئ'
            );
        } else if (category === this.bpCategories.stage2) {
            recommendations.medical.push(
                'استشر طبيبك في أقرب وقت ممكن',
                'قد تحتاج إلى تعديل الأدوية'
            );
        } else if (category === this.bpCategories.stage1) {
            recommendations.medical.push(
                'راجع طبيبك لمناقشة خطة العلاج',
                'قد تحتاج إلى بدء العلاج الدوائي'
            );
        }

        // Update recommendation lists
        document.getElementById('lifestyleRecs').innerHTML = recommendations.lifestyle
            .map(rec => `<li class="list-group-item">${rec}</li>`)
            .join('');

        document.getElementById('medicalRecs').innerHTML = recommendations.medical
            .map(rec => `<li class="list-group-item">${rec}</li>`)
            .join('');
    }
}

// Initialize analyzer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BloodPressureAnalyzer();
});
