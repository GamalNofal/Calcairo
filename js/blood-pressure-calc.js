document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const form = document.getElementById('bpForm');
    const resultContainer = document.getElementById('result');
    const readingsList = document.getElementById('readingsList');
    const bpCategory = document.getElementById('bpCategory');
    const recommendations = document.getElementById('recommendations');
    const bpMarker = document.getElementById('bpMarker');

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

    // Initialize readings history from localStorage
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

        if (isNaN(systolic) || isNaN(diastolic)) {
            alert('الرجاء إدخال قيم صحيحة لضغط الدم');
            return;
        }

        // Get BP category
        const category = getBPCategory(systolic, diastolic);
        
        // Save reading
        saveReading(systolic, diastolic, pulse, category, readingTime);

        // Display results
        displayResults(systolic, diastolic, pulse, category);

        // Show results container and scroll to it
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function getBPCategory(systolic, diastolic) {
        if (systolic >= 180 || diastolic >= 120) return 'crisis';
        if (systolic >= 140 || diastolic >= 90) return 'stage2';
        if (systolic >= 130 || diastolic >= 80) return 'stage1';
        if (systolic >= 120 && diastolic < 80) return 'elevated';
        return 'normal';
    }

    function getPulseCategory(pulse) {
        if (pulse < pulseRanges.low.max) return 'low';
        if (pulse > pulseRanges.high.min) return 'high';
        return 'normal';
    }

    function saveReading(systolic, diastolic, pulse, category, readingTime) {
        const reading = {
            systolic,
            diastolic,
            pulse,
            category,
            readingTime,
            timestamp: new Date().toISOString()
        };

        readingsHistory.unshift(reading);
        if (readingsHistory.length > 10) {
            readingsHistory.pop();
        }

        localStorage.setItem('bpReadings', JSON.stringify(readingsHistory));
        updateReadingsList();
    }

    function displayResults(systolic, diastolic, pulse, category) {
        const categoryInfo = bpCategories[category];

        // Update category display
        bpCategory.className = `alert alert-${categoryInfo.color}`;
        bpCategory.innerHTML = `
            <strong>التصنيف: ${categoryInfo.name}</strong><br>
            الضغط الانقباضي: ${systolic} mmHg<br>
            الضغط الانبساطي: ${diastolic} mmHg
            ${pulse ? `<br>معدل النبض: ${pulse} نبضة/دقيقة` : ''}
        `;

        // Update gauge marker position
        updateGaugeMarker(systolic, category);

        // Update recommendations
        updateRecommendations(category, pulse);
    }

    function updateGaugeMarker(systolic, category) {
        const position = calculateGaugePosition(systolic);
        bpMarker.style.left = `${position}%`;
    }

    function calculateGaugePosition(systolic) {
        if (systolic <= 120) return (systolic / 120) * 20;
        if (systolic <= 129) return 20 + ((systolic - 120) / 9) * 20;
        if (systolic <= 139) return 40 + ((systolic - 129) / 10) * 20;
        if (systolic <= 180) return 60 + ((systolic - 139) / 41) * 20;
        return 80 + ((systolic - 180) / 120) * 20;
    }

    function updateReadingsList() {
        readingsList.innerHTML = readingsHistory.length ? '' : '<p class="text-muted">لا توجد قراءات سابقة</p>';
        
        readingsHistory.forEach(reading => {
            const categoryInfo = bpCategories[reading.category];
            const date = new Date(reading.timestamp);
            const formattedDate = date.toLocaleDateString('ar-EG');
            
            const readingElement = document.createElement('div');
            readingElement.className = 'reading-item';
            readingElement.innerHTML = `
                <div>
                    <div class="reading-value">
                        ${reading.systolic}/${reading.diastolic} mmHg
                        ${reading.pulse ? `- ${reading.pulse} نبضة/دقيقة` : ''}
                    </div>
                    <small class="text-muted">${formattedDate} - ${reading.readingTime}</small>
                </div>
                <span class="reading-category bg-${categoryInfo.color} text-white">
                    ${categoryInfo.name}
                </span>
            `;
            readingsList.appendChild(readingElement);
        });
    }

    function updateRecommendations(category, pulse) {
        let recommendationText = '';
        
        // Blood pressure recommendations
        switch(category) {
            case 'normal':
                recommendationText = 'ضغط دمك طبيعي. حافظ على نمط حياة صحي من خلال:';
                recommendationText += '<ul>';
                recommendationText += '<li>ممارسة الرياضة بانتظام</li>';
                recommendationText += '<li>اتباع نظام غذائي صحي</li>';
                recommendationText += '<li>الحفاظ على وزن صحي</li>';
                recommendationText += '</ul>';
                break;
            case 'elevated':
                recommendationText = 'ضغط دمك مرتفع قليلاً. يُنصح بـ:';
                recommendationText += '<ul>';
                recommendationText += '<li>تقليل تناول الملح</li>';
                recommendationText += '<li>زيادة النشاط البدني</li>';
                recommendationText += '<li>تجنب التوتر</li>';
                recommendationText += '</ul>';
                break;
            case 'stage1':
            case 'stage2':
                recommendationText = 'ضغط دمك مرتفع. يجب:';
                recommendationText += '<ul>';
                recommendationText += '<li>استشارة الطبيب في أقرب وقت</li>';
                recommendationText += '<li>تناول الأدوية كما وصفها الطبيب</li>';
                recommendationText += '<li>مراقبة ضغط الدم بانتظام</li>';
                recommendationText += '</ul>';
                break;
            case 'crisis':
                recommendationText = '<strong class="text-danger">تحذير: أزمة ارتفاع ضغط الدم!</strong><br>';
                recommendationText += 'يجب التوجه فوراً إلى أقرب مستشفى أو الاتصال بالإسعاف.';
                break;
        }

        // Pulse recommendations if available
        if (pulse) {
            const pulseCategory = getPulseCategory(pulse);
            recommendationText += '<br><br><strong>معدل النبض:</strong><br>';
            switch(pulseCategory) {
                case 'low':
                    recommendationText += 'معدل النبض منخفض. استشر طبيبك إذا كنت تشعر بالدوار أو التعب.';
                    break;
                case 'normal':
                    recommendationText += 'معدل النبض طبيعي. حافظ على نشاطك البدني المنتظم.';
                    break;
                case 'high':
                    recommendationText += 'معدل النبض مرتفع. تجنب الكافيين والتوتر، واستشر طبيبك إذا استمر الارتفاع.';
                    break;
            }
        }

        recommendations.innerHTML = recommendationText;
    }

    // Initialize readings list
    updateReadingsList();
});
