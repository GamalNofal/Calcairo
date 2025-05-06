document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const form = document.getElementById('bpForm');
    const resultContainer = document.getElementById('result');
    const readingsList = document.getElementById('readingsList');

    // Blood pressure categories
    const bpCategories = {
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

    // Pulse rate ranges
    const pulseRanges = {
        low: { min: 0, max: 60, name: 'منخفض' },
        normal: { min: 60, max: 100, name: 'طبيعي' },
        high: { min: 100, max: 300, name: 'مرتفع' }
    };

    // Initialize readings history
    let readingsHistory = JSON.parse(localStorage.getItem('bpReadings')) || [];

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        analyzeBloodPressure();
    });

    function analyzeBloodPressure() {
        const systolic = parseInt(document.getElementById('systolic').value);
        const diastolic = parseInt(document.getElementById('diastolic').value);
        const pulse = document.getElementById('pulseRate').value ? 
            parseInt(document.getElementById('pulseRate').value) : null;
        const readingTime = document.getElementById('readingTime').value;

        // Get BP category
        const category = getBPCategory(systolic, diastolic);
        
        // Save reading
        saveReading(systolic, diastolic, pulse, category, readingTime);

        // Display results
        displayResults(systolic, diastolic, pulse, category);

        // Show results container
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function getBPCategory(systolic, diastolic) {
        // Check from highest to lowest severity
        if (systolic >= 180 || diastolic >= 120) return bpCategories.crisis;
        if (systolic >= 140 || diastolic >= 90) return bpCategories.stage2;
        if (systolic >= 130 || diastolic >= 80) return bpCategories.stage1;
        if (systolic >= 120 && diastolic < 80) return bpCategories.elevated;
        return bpCategories.normal;
    }

    function getPulseCategory(pulse) {
        if (pulse < pulseRanges.normal.min) return pulseRanges.low;
        if (pulse > pulseRanges.normal.max) return pulseRanges.high;
        return pulseRanges.normal;
    }

    function saveReading(systolic, diastolic, pulse, category, readingTime) {
        const reading = {
            systolic,
            diastolic,
            pulse,
            category: category.name,
            time: readingTime,
            date: new Date().toISOString()
        };

        readingsHistory.unshift(reading);
        if (readingsHistory.length > 10) readingsHistory.pop();
        
        localStorage.setItem('bpReadings', JSON.stringify(readingsHistory));
        updateReadingsList();
    }

    function displayResults(systolic, diastolic, pulse, category) {
        // Update reading value
        document.getElementById('bpValue').textContent = `${systolic}/${diastolic} mmHg`;
        
        // Update category with color
        document.getElementById('bpCategory').innerHTML = `
            <span class="text-${category.color}">${category.name}</span>
        `;

        // Update pulse if provided
        const pulseStatus = document.getElementById('pulseStatus');
        if (pulse) {
            const pulseCategory = getPulseCategory(pulse);
            document.getElementById('pulseValue').innerHTML = `
                ${pulse} نبضة/دقيقة 
                <span class="text-${pulseCategory === pulseRanges.normal ? 'success' : 'danger'}">
                    (${pulseCategory.name})
                </span>
            `;
            pulseStatus.style.display = 'block';
        } else {
            pulseStatus.style.display = 'none';
        }

        // Update gauge marker
        updateGaugeMarker(systolic, diastolic, category);

        // Update recommendations
        updateRecommendations(category, pulse);
    }

    function updateGaugeMarker(systolic, diastolic, category) {
        const marker = document.getElementById('systolicMarker');
        const label = marker.querySelector('.bp-label');
        
        // Calculate position based on systolic pressure
        let position = calculateGaugePosition(systolic);
        
        marker.style.left = `${position}%`;
        label.textContent = `${systolic}/${diastolic}`;
    }

    function calculateGaugePosition(systolic) {
        // Calculate position on the gauge (0-100%)
        if (systolic <= 120) {
            return (systolic / 120) * 20; // Normal range (0-20%)
        } else if (systolic <= 129) {
            return 20 + ((systolic - 120) / 9) * 20; // Elevated range (20-40%)
        } else if (systolic <= 139) {
            return 40 + ((systolic - 130) / 9) * 20; // Stage 1 range (40-60%)
        } else if (systolic <= 180) {
            return 60 + ((systolic - 140) / 40) * 20; // Stage 2 range (60-80%)
        } else {
            return Math.min(80 + ((systolic - 180) / 20) * 20, 100); // Crisis range (80-100%)
        }
    }

    function updateReadingsList() {
        readingsList.innerHTML = '';
        
        readingsHistory.forEach(reading => {
            const div = document.createElement('div');
            div.className = 'reading-item';
            
            const category = Object.values(bpCategories)
                .find(cat => cat.name === reading.category);
            
            div.innerHTML = `
                <div>
                    <div class="reading-value">${reading.systolic}/${reading.diastolic} mmHg</div>
                    <small class="text-muted">${reading.time}</small>
                </div>
                <span class="reading-category bg-${category.color} text-white">
                    ${category.name}
                </span>
            `;
            
            readingsList.appendChild(div);
        });
    }

    function updateRecommendations(category, pulse) {
        const recommendationsList = document.getElementById('recommendations');
        recommendationsList.innerHTML = '';

        const recommendations = [];

        // Category-specific recommendations
        switch(category) {
            case bpCategories.normal:
                recommendations.push(
                    'حافظ على نمط حياتك الصحي',
                    'استمر في النشاط البدني المنتظم',
                    'حافظ على نظام غذائي صحي منخفض الصوديوم'
                );
                break;
            case bpCategories.elevated:
                recommendations.push(
                    'قلل من تناول الملح',
                    'مارس الرياضة بانتظام',
                    'تجنب التدخين والكحول',
                    'راقب ضغط الدم بشكل دوري'
                );
                break;
            case bpCategories.stage1:
            case bpCategories.stage2:
                recommendations.push(
                    'راجع طبيبك في أقرب وقت',
                    'قلل من تناول الملح بشكل كبير',
                    'مارس تمارين معتدلة يومياً',
                    'تناول الأدوية كما وصفها الطبيب',
                    'تجنب الإجهاد والتوتر'
                );
                break;
            case bpCategories.crisis:
                recommendations.push(
                    'توجه إلى الطوارئ فوراً',
                    'لا تقم بأي نشاط بدني',
                    'خذ أدويتك إذا كنت تتناول علاجاً لضغط الدم'
                );
                break;
        }

        // Pulse-specific recommendations
        if (pulse) {
            const pulseCategory = getPulseCategory(pulse);
            if (pulseCategory !== pulseRanges.normal) {
                recommendations.push(
                    'راجع طبيبك بخصوص معدل النبض',
                    'سجل معدل النبض بانتظام'
                );
            }
        }

        // Add general recommendations
        recommendations.push(
            'قس ضغط الدم في نفس الوقت يومياً',
            'احتفظ بسجل لقراءات ضغط الدم',
            'تناول غذاءً صحياً غنياً بالخضروات والفواكه'
        );

        // Display recommendations
        recommendations.forEach(recommendation => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="bi bi-check2-circle text-primary me-2"></i>${recommendation}`;
            li.className = 'mb-2';
            recommendationsList.appendChild(li);
        });
    }

    // Initialize readings list
    updateReadingsList();
});
