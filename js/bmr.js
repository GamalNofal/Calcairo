import { ValidationError, debounce, validateInput, addToHistory } from './utils.js';

class BMRCalculator {
    constructor() {
        this.form = document.getElementById('bmrForm');
        this.resultContainer = document.getElementById('result');
        this.inputs = {
            gender: () => document.querySelector('input[name="gender"]:checked'),
            age: document.getElementById('age'),
            weight: document.getElementById('weight'),
            height: document.getElementById('height'),
            activityLevel: document.getElementById('activityLevel'),
            goal: document.getElementById('goal')
        };

        this.macroRatios = {
            lose: { protein: 0.40, carbs: 0.35, fat: 0.25 },
            maintain: { protein: 0.30, carbs: 0.45, fat: 0.25 },
            gain: { protein: 0.30, carbs: 0.50, fat: 0.20 }
        };

        this.calorieAdjustments = {
            lose: -500,
            maintain: 0,
            gain: 500
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Real-time calculation with debouncing
        const debouncedCalculate = debounce(() => this.calculateBMR(), 500);

        Object.values(this.inputs).forEach(input => {
            if (typeof input === 'function') {
                document.querySelectorAll('input[name="gender"]').forEach(radio => {
                    radio.addEventListener('change', debouncedCalculate);
                });
            } else {
                input.addEventListener('input', debouncedCalculate);
            }
        });

        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateBMR();
        });
    }

    validateInputs() {
        const validations = {
            age: { min: 15, max: 100 },
            weight: { min: 30, max: 300 },
            height: { min: 100, max: 250 }
        };

        for (const [field, limits] of Object.entries(validations)) {
            validateInput(this.inputs[field], limits.min, limits.max);
        }
    }

    calculateBMR() {
        try {
            this.validateInputs();

            const gender = this.inputs.gender().value;
            const age = parseInt(this.inputs.age.value);
            const weight = parseFloat(this.inputs.weight.value);
            const height = parseInt(this.inputs.height.value);
            const activityLevel = parseFloat(this.inputs.activityLevel.value);
            const goal = this.inputs.goal.value;

            // Mifflin-St Jeor Equation
            const bmr = gender === 'male'
                ? (10 * weight) + (6.25 * height) - (5 * age) + 5
                : (10 * weight) + (6.25 * height) - (5 * age) - 161;

            const tdee = bmr * activityLevel;
            const goalCalories = Math.round(tdee + this.calorieAdjustments[goal]);
            const macros = this.calculateMacros(goalCalories, goal);

            this.displayResults(bmr, tdee, goalCalories, macros);
            this.saveToHistory(bmr, tdee, goalCalories, macros);

        } catch (error) {
            if (error instanceof ValidationError) {
                console.error('Validation error:', error.message);
                // Handle validation error (e.g., show error message to user)
            } else {
                console.error('Unexpected error:', error);
                throw error;
            }
        }
    }

    calculateMacros(calories, goal) {
        const ratios = this.macroRatios[goal];
        return {
            protein: Math.round((calories * ratios.protein) / 4),
            carbs: Math.round((calories * ratios.carbs) / 4),
            fat: Math.round((calories * ratios.fat) / 9)
        };
    }

    displayResults(bmr, tdee, goalCalories, macros) {
        // Update basic values
        document.getElementById('bmrValue').textContent = Math.round(bmr);
        document.getElementById('tdeeValue').textContent = Math.round(tdee);
        document.getElementById('goalCalories').textContent = goalCalories;

        // Update macronutrient values and progress bars
        const macroElements = ['protein', 'carbs', 'fat'];
        const totalMacros = Object.values(macros).reduce((sum, val) => sum + val, 0);

        macroElements.forEach(macro => {
            document.getElementById(`${macro}Grams`).textContent = macros[macro];
            document.getElementById(`${macro}Bar`).style.width = 
                `${(macros[macro] / totalMacros) * 100}%`;
        });

        this.updateRecommendations(goalCalories, macros);
        
        // Show results with smooth scroll
        this.resultContainer.style.display = 'block';
        this.resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    updateRecommendations(calories, macros) {
        const recommendations = {
            protein: [
                'البيض والبياض',
                'صدور الدجاج',
                'السمك (السلمون، التونة)',
                'اللحوم الحمراء الخالية من الدهون',
                'منتجات الألبان قليلة الدسم'
            ],
            carbs: [
                'الأرز البني',
                'الشوفان',
                'البطاطا الحلوة',
                'الكينوا',
                'الخضروات الورقية'
            ],
            fat: [
                'زيت الزيتون',
                'الأفوكادو',
                'المكسرات',
                'زبدة الفول السوداني',
                'بذور الشيا'
            ]
        };

        // Update recommendation lists
        Object.keys(recommendations).forEach(macro => {
            const list = document.getElementById(`${macro}Foods`);
            list.innerHTML = recommendations[macro]
                .map(food => `<li class="list-group-item">${food}</li>`)
                .join('');
        });
    }

    saveToHistory(bmr, tdee, goalCalories, macros) {
        const historyEntry = {
            date: new Date().toISOString(),
            inputs: {
                gender: this.inputs.gender().value,
                age: this.inputs.age.value,
                weight: this.inputs.weight.value,
                height: this.inputs.height.value,
                activityLevel: this.inputs.activityLevel.value,
                goal: this.inputs.goal.value
            },
            results: {
                bmr: Math.round(bmr),
                tdee: Math.round(tdee),
                goalCalories,
                macros
            }
        };

        addToHistory('bmr-history', historyEntry);
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BMRCalculator();
});
