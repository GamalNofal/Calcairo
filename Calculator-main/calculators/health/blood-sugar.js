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
        }
    };

    // Common values for quick conversion
    const commonValues = [
        { mgdl: 70, label: 'الحد الأدنى الطبيعي' },
        { mgdl: 99, label: 'الحد الأقصى الطبيعي للصائم' },
        { mgdl: 140, label: 'الحد الأقصى الطبيعي بعد الأكل' },
        { mgdl: 180, label: 'هدف ما بعد الوجبة لمرضى السكري' },
        { mgdl: 200, label: 'عتبة تشخيص السكري' }
    ];

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

        // Display results
        document.getElementById('conversionResult').innerHTML = `
            ${mgdlValue} mg/dL = ${mmolValue.toFixed(1)} mmol/L
        `;

        // Update range status
        updateRangeStatus(mgdlValue);

        // Update range indicator
        updateRangeIndicator(mgdlValue);

        // Update quick conversions
        updateQuickConversions(fromUnit);

        // Update recommendations
        updateRecommendations(mgdlValue);

        // Show results
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function mgdlToMmol(mgdl) {
        return mgdl / 18.0182;
    }

    function mmolToMgdl(mmol) {
        return mmol * 18.0182;
    }

    function updateRangeStatus(mgdl) {
        let status, className;
        
        if (mgdl < ranges.fasting.normal.max) {
            status = 'طبيعي';
            className = 'text-success';
        } else if (mgdl < ranges.fasting.prediabetes.max) {
            status = 'ما قبل السكري';
            className = 'text-warning';
        } else {
            status = 'نطاق السكري';
            className = 'text-danger';
        }

        document.getElementById('rangeStatus').innerHTML = `
            <span class="${className}">${status}</span>
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
                </span>
            `;
            quickConversions.appendChild(div);
        });
    }

    function updateRecommendations(mgdl) {
        const recommendationsList = document.getElementById('recommendations');
        recommendationsList.innerHTML = '';

        const recommendations = [
            'المستويات الطبيعية للسكر الصائم: 70-99 mg/dL (3.9-5.5 mmol/L)',
            'المستويات الطبيعية بعد الأكل: 70-140 mg/dL (3.9-7.8 mmol/L)',
            'يجب قياس السكر الصائم بعد 8 ساعات من الصيام'
        ];

        if (mgdl < ranges.fasting.normal.min) {
            recommendations.push(
                'مستوى السكر منخفض، تناول شيئاً حلواً سريعاً',
                'راجع طبيبك إذا تكرر انخفاض السكر'
            );
        } else if (mgdl > ranges.fasting.prediabetes.max) {
            recommendations.push(
                'راجع طبيبك لتقييم الحالة',
                'قلل من تناول السكريات والنشويات',
                'مارس الرياضة بانتظام'
            );
        }

        // Add general recommendations
        recommendations.push(
            'احرص على قياس السكر بانتظام',
            'احتفظ بسجل لقراءات السكر',
            'اتبع نظاماً غذائياً صحياً'
        );

        // Display recommendations
        recommendations.forEach(recommendation => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="bi bi-check2-circle text-primary me-2"></i>${recommendation}`;
            li.className = 'mb-2';
            recommendationsList.appendChild(li);
        });
    }
});
