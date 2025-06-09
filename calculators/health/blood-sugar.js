document.addEventListener('DOMContentLoaded', function () {
    const mgdlForm = document.getElementById('mgdlForm');
    const mmolForm = document.getElementById('mmolForm');
    const resultContainer = document.getElementById('result');
    const quickConversions = document.getElementById('quickConversions');
  
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
  
    const commonValues = [
      { mgdl: 70, label: 'الحد الأدنى الطبيعي', icon: 'exclamation-triangle' },
      { mgdl: 99, label: 'الحد الأقصى الطبيعي للصائم', icon: 'check-circle' },
      { mgdl: 140, label: 'الحد الأقصى الطبيعي بعد الأكل', icon: 'clock' },
      { mgdl: 180, label: 'هدف ما بعد الوجبة لمرضى السكري', icon: 'bullseye' },
      { mgdl: 200, label: 'عتبة تشخيص السكري', icon: 'exclamation-circle' }
    ];
  
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
  
    mgdlForm.addEventListener('submit', e => {
      e.preventDefault();
      const mgdl = parseFloat(document.getElementById('mgdlInput').value);
      if (!isNaN(mgdl)) convertAndDisplay(mgdl, 'mgdl');
    });
  
    mmolForm.addEventListener('submit', e => {
      e.preventDefault();
      const mmol = parseFloat(document.getElementById('mmolInput').value);
      if (!isNaN(mmol)) convertAndDisplay(mmol, 'mmol');
    });
  
    function mgdlToMmol(mgdl) {
      return mgdl / 18.0182;
    }
  
    function mmolToMgdl(mmol) {
      return mmol * 18.0182;
    }
  
    function convertAndDisplay(value, fromUnit) {
      const mgdl = fromUnit === 'mgdl' ? value : mmolToMgdl(value);
      const mmol = fromUnit === 'mmol' ? value : mgdlToMmol(value);
  
      showConversion(mgdl, mmol);
      updateRangeStatus(mgdl);
      updateRangeIndicator(mgdl);
      updateQuickConversions();
      updateRecommendations(mgdl);
  
      resultContainer.style.display = 'block';
      setTimeout(() => {
        resultContainer.style.opacity = '1';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  
    function showConversion(mgdl, mmol) {
      const result = document.getElementById('conversionResult');
      result.style.opacity = '0';
      setTimeout(() => {
        result.innerHTML = `<span style="color: #198754;">${mgdl.toFixed(0)} mg/dL = ${mmol.toFixed(1)} mmol/L</span>`;
        result.style.opacity = '1';
        result.style.transition = 'opacity 0.5s ease-in';
      }, 200);
    }
  
    function updateRangeStatus(mgdl) {
      const rangeText = document.getElementById('rangeStatus');
      let status, color;
  
      if (mgdl < ranges.fasting.normal.min) {
        status = 'منخفض';
        color = '#0dcaf0';
      } else if (mgdl <= ranges.fasting.normal.max) {
        status = 'طبيعي';
        color = '#198754';
      } else if (mgdl <= ranges.fasting.prediabetes.max) {
        status = 'ما قبل السكري';
        color = '#ffc107';
      } else {
        status = 'سكري';
        color = '#dc3545';
      }
  
      rangeText.innerHTML = `<span style="color:${color}; font-weight:600">${status}</span>`;
    }
  
    function updateRangeIndicator(mgdl) {
      let percent = 0;
      if (mgdl <= 99) percent = (mgdl / 99) * 20;
      else if (mgdl <= 125) percent = 20 + ((mgdl - 99) / 26) * 20;
      else percent = Math.min(40 + ((mgdl - 125) / 875) * 60, 100);
  
      document.getElementById('valueMarker').style.left = `${percent}%`;
      document.getElementById('markerLabel').textContent = `${Math.round(mgdl)} mg/dL`;
    }
  
    function updateQuickConversions() {
      quickConversions.innerHTML = '';
      commonValues.forEach(val => {
        quickConversions.innerHTML += `
          <div class="quick-convert-item">
            <span>${val.label}</span>
            <span><strong>${val.mgdl} mg/dL</strong> = 
            <strong>${mgdlToMmol(val.mgdl).toFixed(1)} mmol/L</strong> 
            <i class="bi bi-${val.icon} text-primary ms-2"></i></span>
          </div>`;
      });
    }
  
    function updateRecommendations(mgdl) {
      const recommendationsList = document.getElementById('recommendations');
      recommendationsList.innerHTML = '';
  
      let category = 'normal';
      if (mgdl < ranges.fasting.normal.min) category = 'low';
      else if (mgdl <= ranges.fasting.normal.max) category = 'normal';
      else if (mgdl <= ranges.fasting.prediabetes.max) category = 'prediabetes';
      else category = 'diabetes';
  
      const tips = lifestyleTips[category];
      recommendationsList.innerHTML += `
        <div class="mb-4">
          <h5><i class="bi bi-lightbulb-fill text-warning me-2"></i> نصائح نمط الحياة</h5>
          <div class="list-group">
            ${tips.map(t => `
              <div class="list-group-item d-flex align-items-center" style="animation: fadeIn 0.5s ease-in;">
                <i class="bi bi-${t.icon} text-primary me-3"></i>
                <span>${t.tip}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="mb-4">
          <h5><i class="bi bi-info-circle-fill text-info me-2"></i> معلومات مهمة</h5>
          <ul class="list-unstyled">
            <li><i class="bi bi-check2-circle text-success me-2"></i> المستوى الطبيعي للصائم: 70–99 mg/dL</li>
            <li><i class="bi bi-check2-circle text-success me-2"></i> بعد الأكل: حتى 140 mg/dL</li>
            <li><i class="bi bi-clock text-primary me-2"></i> يجب قياس السكر الصائم بعد 8 ساعات من الصيام</li>
          </ul>
        </div>
      `;
    }
  });
  