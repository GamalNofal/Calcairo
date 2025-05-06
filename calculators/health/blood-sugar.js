document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const mgdlForm = document.getElementById('mgdlForm');
    const mmolForm = document.getElementById('mmolForm');
    const resultContainer = document.getElementById('result');
    const quickConversions = document.getElementById('quickConversions');

    // Blood sugar ranges in mg/dL
    const ranges = {
        fasting: {
            normal: { min: 70, max: 99 },
            prediabetes: { min: 100, max: 125 },
            diabetes: { min: 126, max: 1000 }
        },
        postMeal: {
            normal: { min: 70, max: 140 },
            prediabetes: { min: 141, max: 199 },
            diabetes: { min: 200, max: 1000 }
        },
        a1c: {
            normal: { min: 4, max: 5.6 },
            prediabetes: { min: 5.7, max: 6.4 },
            diabetes: { min: 6.5, max: 14 }
        }
    };

    // Common values for quick conversion
    const commonValues = [
        { mgdl: 70, label: 'الحد الأدنى الطبيعي', icon: 'exclamation-triangle' },
        { mgdl: 99, label: 'الحد الأقصى الطبيعي للصائم', icon: 'check-circle' },
        { mgdl: 140, label: 'الحد الأقصى الطبيعي بعد الأكل', icon: 'clock' },
        { mgdl: 180, label: 'هدف ما بعد الوجبة لمرضى السكري', icon: 'bullseye' },
        { mgdl: 200, label: 'عتبة تشخيص السكري', icon: 'exclamation-circle' }
    ];

    // Lifestyle tips based on blood sugar levels
    const lifestyleTips = {
        low: [
            { tip: 'تناول 15 جرام من الكربوهيدرات سريعة المفعول', icon: 'lightning' },
            { tip: 'تناول وجبات منتظمة ولا تتخطى أي وجبة', icon: 'clock-history' },
            { tip: 'احمل دائماً سكر سريع المفعول معك', icon: 'bag-check' }
        ],
        normal: [
            { tip: 'حافظ على نمط حياتك الصحي', icon: 'heart' },
            { tip: 'مارس الرياضة بانتظام (30 دقيقة يومياً)', icon: 'bicycle' },
            { tip: 'تناول الخضروات والبروتين في كل وجبة', icon: 'egg-fried' }
        ],
        prediabetes: [
            { tip: 'قلل من تناول السكريات المكررة', icon: 'dash-circle' },
            { tip: 'زد من النشاط البدني (45 دقيقة يومياً)', icon: 'person-walking' },
            { tip: 'راقب وزنك وحاول خسارة 5-7% من وزنك', icon: 'graph-down-arrow' }
        ],
        diabetes: [
            { tip: 'راجع طبيبك لوضع خطة علاجية', icon: 'hospital' },
            { tip: 'قس السكر بانتظام وسجل القراءات', icon: 'journal-check' },
            { tip: 'تعلم حساب الكربوهيدرات في طعامك', icon: 'calculator' }
        ]
    };

    // Food impact on blood sugar
    const foodImpact = {
        fast: [
            { food: 'العسل', impact: 'سريع جداً', icon: '🍯' },
            { food: 'التمر', impact: 'سريع', icon: '🌴' },
            { food: 'الخبز الأبيض', impact: 'سريع', icon: '🍞' }
        ],
        moderate: [
            { food: 'الأرز البني', impact: 'معتدل', icon: '🌾' },
            { food: 'البقوليات', impact: 'معتدل', icon: '🥜' },
            { food: 'الفواكه الكاملة', impact: 'معتدل', icon: '🍎' }
        ],
        slow: [
            { food: 'الخضروات الورقية', impact: 'بطيء', icon: '🥬' },
            { food: 'المكسرات', impact: 'بطيء', icon: '🥜' },
            { food: 'الأفوكادو', impact: 'بطيء', icon: '🥑' }
        ]
    };

    // Form submission handlers
    mgdlForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const mgdl = parseFloat(document.getElementById('mgdlInput').value);
        convertAndDisplay(mgdl, 'mgdl');
    });

    mmolForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const mmol = parseFloat(document.getElementById('mmolInput').value);
        convertAndDisplay(mmol, 'mmol');
    });

    function convertAndDisplay(value, fromUnit) {
        let mgdlValue, mmolValue;
        
        if (fromUnit === 'mgdl') {
            mgdlValue = value;
            mmolValue = mgdlToMmol(value);
        } else {
            mmolValue = value;
            mgdlValue = mmolToMgdl(value);
        }

        // Display results with animation
        const conversionResult = document.getElementById('conversionResult');
        conversionResult.style.opacity = '0';
        setTimeout(() => {
            conversionResult.innerHTML = `
                <span style="color: #198754;">${mgdlValue} mg/dL = ${mmolValue.toFixed(1)} mmol/L</span>
            `;
            conversionResult.style.opacity = '1';
            conversionResult.style.transition = 'opacity 0.5s ease-in';
        }, 200);

        // Update range status
        updateRangeStatus(mgdlValue);

        // Update range indicator with animation
        updateRangeIndicator(mgdlValue);

        // Update quick conversions
        updateQuickConversions(fromUnit);

        // Update recommendations and lifestyle tips
        updateRecommendations(mgdlValue);

        // Show food impact
        updateFoodImpact(mgdlValue);

        // Show results with smooth animation
        resultContainer.style.opacity = '0';
        resultContainer.style.display = 'block';
        setTimeout(() => {
            resultContainer.style.opacity = '1';
            resultContainer.style.transition = 'opacity 0.5s ease-in';
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    function mgdlToMmol(mgdl) {
        return mgdl / 18.0182;
    }

    function mmolToMgdl(mmol) {
        return mmol * 18.0182;
    }

    function updateRangeStatus(mgdl) {
        let status, color;
        
        if (mgdl < ranges.fasting.normal.max) {
            status = 'طبيعي';
            color = '#198754';  // Bootstrap success green
        } else if (mgdl < ranges.fasting.prediabetes.max) {
            status = 'ما قبل السكري';
            color = '#ffc107';  // Bootstrap warning yellow
        } else {
            status = 'نطاق السكري';
            color = '#dc3545';  // Bootstrap danger red
        }

        document.getElementById('rangeStatus').innerHTML = `
            <span style="color: ${color}; font-weight: 600;">${status}</span>
        `;
    }

    function updateRangeIndicator(mgdl) {
        // Calculate position percentage (0-100)
        let position;
        if (mgdl <= ranges.fasting.normal.max) {
            position = (mgdl / ranges.fasting.normal.max) * 20; // First 20% of bar
        } else if (mgdl <= ranges.fasting.prediabetes.max) {
            position = 20 + ((mgdl - ranges.fasting.normal.max) / 
                (ranges.fasting.prediabetes.max - ranges.fasting.normal.max)) * 20; // Next 20%
        } else {
            position = Math.min(40 + ((mgdl - ranges.fasting.prediabetes.max) / 
                (ranges.fasting.diabetes.max - ranges.fasting.prediabetes.max)) * 60, 100); // Remaining 60%
        }

        const marker = document.getElementById('valueMarker');
        const label = document.getElementById('markerLabel');
        
        marker.style.left = `${position}%`;
        label.textContent = `${Math.round(mgdl)} mg/dL`;
    }

    function updateQuickConversions(fromUnit) {
        quickConversions.innerHTML = '';
        
        commonValues.forEach(value => {
            const div = document.createElement('div');
            div.className = 'quick-convert-item';
            div.innerHTML = `
                <span>${value.label}</span>
                <span>
                    <strong>${value.mgdl} mg/dL</strong>
                    <span class="text-muted">=</span>
                    <strong>${mgdlToMmol(value.mgdl).toFixed(1)} mmol/L</strong>
                    <i class="bi bi-${value.icon} text-primary ms-2"></i>
                </span>
            `;
            quickConversions.appendChild(div);
        });
    }

    function updateRecommendations(mgdl) {
        const recommendationsList = document.getElementById('recommendations');
        recommendationsList.innerHTML = '';

        let category;
        if (mgdl < ranges.fasting.normal.min) {
            category = 'low';
        } else if (mgdl <= ranges.fasting.normal.max) {
            category = 'normal';
        } else if (mgdl <= ranges.fasting.prediabetes.max) {
            category = 'prediabetes';
        } else {
            category = 'diabetes';
        }

        // Add lifestyle tips
        const tipsSection = document.createElement('div');
        tipsSection.className = 'mb-4';
        tipsSection.innerHTML = `
            <h5 class="mb-3">
                <i class="bi bi-lightbulb-fill text-warning me-2"></i>
                نصائح نمط الحياة
            </h5>
            <div class="list-group">
                ${lifestyleTips[category].map(tip => `
                    <div class="list-group-item list-group-item-action d-flex align-items-center" 
                         style="animation: fadeIn 0.5s ease-in;">
                        <i class="bi bi-${tip.icon} text-primary me-3"></i>
                        <span>${tip.tip}</span>
                    </div>
                `).join('')}
            </div>
        `;
        recommendationsList.appendChild(tipsSection);

        // Add general recommendations
        const generalSection = document.createElement('div');
        generalSection.className = 'mb-4';
        generalSection.innerHTML = `
            <h5 class="mb-3">
                <i class="bi bi-info-circle-fill text-info me-2"></i>
                معلومات مهمة
            </h5>
            <ul class="list-unstyled">
                <li class="mb-2">
                    <i class="bi bi-check2-circle text-success me-2"></i>
                    المستويات الطبيعية للسكر الصائم: ${ranges.fasting.normal.min}-${ranges.fasting.normal.max} mg/dL
                </li>
                <li class="mb-2">
                    <i class="bi bi-check2-circle text-success me-2"></i>
                    المستويات الطبيعية بعد الأكل: ${ranges.postMeal.normal.min}-${ranges.postMeal.normal.max} mg/dL
                </li>
                <li class="mb-2">
                    <i class="bi bi-clock text-primary me-2"></i>
                    يجب قياس السكر الصائم بعد 8 ساعات من الصيام
                </li>
            </ul>
        `;
        recommendationsList.appendChild(generalSection);
    }

    function updateFoodImpact(mgdl) {
        const foodSection = document.createElement('div');
        foodSection.className = 'mt-4';
        foodSection.innerHTML = `
            <h5 class="mb-3">
                <i class="bi bi-basket-fill text-success me-2"></i>
                تأثير الأطعمة على السكر
            </h5>
            <div class="row g-3">
                ${Object.entries(foodImpact).map(([speed, foods]) => `
                    <div class="col-md-4">
                        <div class="card h-100" style="animation: fadeIn 0.5s ease-in;">
                            <div class="card-body">
                                <h6 class="card-title text-center mb-3">
                                    ${speed === 'fast' ? 'تأثير سريع' : 
                                      speed === 'moderate' ? 'تأثير معتدل' : 'تأثير بطيء'}
                                </h6>
                                ${foods.map(food => `
                                    <div class="d-flex align-items-center mb-2">
                                        <span class="me-2">${food.icon}</span>
                                        <span>${food.food}</span>
                                        <span class="ms-auto small text-muted">${food.impact}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        document.getElementById('recommendations').appendChild(foodSection);
    }
});
