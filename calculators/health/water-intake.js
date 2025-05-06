class WaterIntakeCalculator {
    constructor() {
        this.form = document.getElementById('waterIntakeForm');
        this.resultContainer = document.getElementById('result');
        this.waterAmountElement = document.getElementById('waterAmount');
        this.glassesAmountElement = document.getElementById('glassesAmount');
        this.recommendationsList = document.getElementById('recommendations');
        this.progressContainer = document.getElementById('waterProgressContainer');
        this.progressBar = document.getElementById('waterProgressBar');
        this.progressText = document.getElementById('waterProgressText');
        
        this.waterGoal = 0;
        this.currentWater = 0;
        this.glassSize = 250; // ml
        
        this.initializeEventListeners();
        this.loadProgress();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateWaterIntake();
        });

        // Add glass tracking buttons
        document.getElementById('addGlass').addEventListener('click', () => this.addWater());
        document.getElementById('removeGlass').addEventListener('click', () => this.removeWater());
        document.getElementById('resetProgress').addEventListener('click', () => this.resetProgress());
        
        // Add input validation
        const weightInput = document.getElementById('weight');
        
        // Validate on input
        weightInput.addEventListener('input', (e) => {
            let value = e.target.value;
            
            // Remove any non-numeric characters except decimal point and first minus sign
            value = value.replace(/[^\d.-]/g, '');
            
            // Ensure only one decimal point
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
            
            // Limit decimal places to 1
            if (parts.length === 2 && parts[1].length > 1) {
                value = parts[0] + '.' + parts[1].substring(0, 1);
            }
            
            // Update input value
            weightInput.value = value;
        });

        // Validate on change (when user finishes typing)
        weightInput.addEventListener('change', (e) => {
            let value = e.target.value;
            
            // Convert to number and validate range
            let numValue = parseFloat(value);
            
            if (isNaN(numValue) || numValue < 20) {
                numValue = 20;
            } else if (numValue > 300) {
                numValue = 300;
            }
            
            // Update with validated value
            weightInput.value = numValue;
        });

        // Validate on form submission
        this.form.addEventListener('submit', (e) => {
            const weight = parseFloat(weightInput.value);
            if (isNaN(weight) || weight < 20 || weight > 300) {
                e.preventDefault();
                alert('الرجاء إدخال وزن صحيح بين 20 و 300 كجم');
                weightInput.focus();
                return false;
            }
        });
    }

    calculateWaterIntake() {
        const weight = parseFloat(document.getElementById('weight').value);
        const activityLevel = parseFloat(document.getElementById('activityLevel').value);
        const climate = parseFloat(document.getElementById('climate').value);

        // Enhanced calculation considering multiple factors
        let waterInMl = weight * 30; // Base calculation
        
        // Activity level adjustment
        waterInMl *= activityLevel;
        
        // Climate adjustment
        waterInMl *= climate;
        
        // Additional adjustments based on time of day
        const hour = new Date().getHours();
        if (hour >= 22 || hour < 6) {
            waterInMl *= 0.8; // Reduce recommended intake during night hours
        }

        // Convert to liters (rounded to 2 decimal places)
        const waterInLiters = (waterInMl / 1000).toFixed(2);
        const glasses = Math.ceil(waterInMl / this.glassSize);

        // Update display
        this.waterAmountElement.textContent = waterInLiters;
        this.glassesAmountElement.textContent = glasses;
        
        // Set water goal
        this.waterGoal = waterInMl;
        this.updateProgress();
        
        // Generate recommendations
        this.updateRecommendations(glasses, climate, activityLevel);

        // Show results and progress
        this.resultContainer.style.display = 'block';
        this.progressContainer.style.display = 'block';
        
        // Save goal to localStorage
        localStorage.setItem('waterGoal', this.waterGoal);
        
        // Smooth scroll to results
        this.resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    updateRecommendations(glasses, climate, activityLevel) {
        const timeOfDay = new Date().getHours();
        const recommendations = [
            'ابدأ يومك بكوب ماء عند الاستيقاظ',
            'احمل معك زجاجة ماء أينما ذهبت',
            `وزع شرب الماء على ${Math.min(6, Math.ceil(glasses/4))} وجبات خلال اليوم`,
            'اشرب كوباً من الماء قبل كل وجبة بـ 30 دقيقة',
            'استخدم تطبيقاً لتتبع شرب الماء',
            'ضع تذكيرات على هاتفك لشرب الماء'
        ];

        // Time-based recommendations
        if (timeOfDay >= 5 && timeOfDay <= 9) {
            recommendations.push('اشرب كوبين من الماء عند الاستيقاظ لتنشيط جسمك');
        } else if (timeOfDay >= 22 || timeOfDay <= 4) {
            recommendations.push('قلل من شرب الماء قبل النوم لتجنب الاستيقاظ ليلاً');
        }

        // Climate-specific recommendations
        if (climate === 1.2) {
            recommendations.push('زد كمية الماء في الأيام الحارة');
            recommendations.push('تجنب المشروبات المحتوية على الكافيين في الطقس الحار');
            recommendations.push('راقب علامات الجفاف مثل العطش الشديد ولون البول الداكن');
        } else if (climate === 0.9) {
            recommendations.push('يمكنك شرب المشروبات الساخنة مثل الشاي الأخضر أو اليانسون');
            recommendations.push('حافظ على شرب الماء حتى في الطقس البارد');
        }

        // Activity-specific recommendations
        if (activityLevel >= 1.55) {
            recommendations.push('اشرب 250-500 مل من الماء قبل التمرين بساعتين');
            recommendations.push('اشرب 150-250 مل كل 15-20 دقيقة أثناء التمرين');
            recommendations.push('اشرب 500 مل من الماء بعد التمرين مباشرة');
            recommendations.push('راقب لون البول للتأكد من مستوى الترطيب');
        }

        // Clear and update recommendations
        this.recommendationsList.innerHTML = '';
        recommendations.forEach(recommendation => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="bi bi-check2-circle text-primary me-2"></i>${recommendation}`;
            li.className = 'mb-2 recommendation-item';
            this.recommendationsList.appendChild(li);
        });
    }

    addWater() {
        this.currentWater = Math.min(this.waterGoal, this.currentWater + this.glassSize);
        this.updateProgress();
        this.saveProgress();
    }

    removeWater() {
        this.currentWater = Math.max(0, this.currentWater - this.glassSize);
        this.updateProgress();
        this.saveProgress();
    }

    resetProgress() {
        this.currentWater = 0;
        this.updateProgress();
        this.saveProgress();
    }

    updateProgress() {
        if (!this.waterGoal) return;
        
        const percentage = Math.min(100, (this.currentWater / this.waterGoal) * 100);
        this.progressBar.style.width = `${percentage}%`;
        this.progressText.textContent = `${Math.round(percentage)}%`;
        
        // Update progress message
        const progressMessage = document.getElementById('progressMessage');
        if (percentage < 25) {
            progressMessage.textContent = 'تحتاج إلى شرب المزيد من الماء!';
            progressMessage.className = 'text-danger';
        } else if (percentage < 50) {
            progressMessage.textContent = 'أنت في المسار الصحيح، استمر!';
            progressMessage.className = 'text-warning';
        } else if (percentage < 75) {
            progressMessage.textContent = 'أداء جيد! واصل التقدم';
            progressMessage.className = 'text-info';
        } else {
            progressMessage.textContent = 'ممتاز! أنت تحافظ على مستوى ترطيب جيد';
            progressMessage.className = 'text-success';
        }
    }

    saveProgress() {
        const today = new Date().toLocaleDateString();
        localStorage.setItem('waterProgress', JSON.stringify({
            date: today,
            current: this.currentWater,
            goal: this.waterGoal
        }));
    }

    loadProgress() {
        const saved = localStorage.getItem('waterProgress');
        if (saved) {
            const data = JSON.parse(saved);
            const today = new Date().toLocaleDateString();
            
            if (data.date === today) {
                this.currentWater = data.current;
                this.waterGoal = data.goal;
                this.updateProgress();
            } else {
                this.resetProgress();
            }
        }
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WaterIntakeCalculator();
});
