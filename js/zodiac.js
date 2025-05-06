// معلومات الأبراج
const ZODIAC_SIGNS = {
    'الحمل': { 
        symbol: '♈', 
        traits: 'شجاع، متحمس، مغامر', 
        element: 'النار',
        lucky_numbers: [1, 9, 17],
        compatibility: ['الأسد', 'القوس'],
        color: '#FF4136',
        stone: 'الياقوت الأحمر',
        description: 'برج الحمل هو أول الأبراج، يتميز أصحابه بالشجاعة والحماس والطاقة العالية.',
        emoji: '🐏'
    },
    'الثور': { 
        symbol: '♉', 
        traits: 'صبور، موثوق، عملي', 
        element: 'الأرض',
        lucky_numbers: [2, 6, 15],
        compatibility: ['العذراء', 'الجدي'],
        color: '#2ECC40',
        stone: 'الزمرد',
        description: 'برج الثور يتميز بالصبر والثبات، محب للجمال والفنون والطبيعة.',
        emoji: '🐂'
    },
    'الجوزاء': { 
        symbol: '♊', 
        traits: 'متكيف، ذكي، فضولي', 
        element: 'الهواء',
        lucky_numbers: [3, 12, 21],
        compatibility: ['الميزان', 'الدلو'],
        color: '#FFDC00',
        stone: 'العقيق',
        description: 'برج الجوزاء متعدد المواهب، سريع التكيف، يحب التواصل والتعلم.',
        emoji: '👥'
    },
    'السرطان': { 
        symbol: '♋', 
        traits: 'عاطفي، حدسي، محب', 
        element: 'الماء',
        lucky_numbers: [4, 13, 22],
        compatibility: ['العقرب', 'الحوت'],
        color: '#B10DC9',
        stone: 'اللؤلؤ',
        description: 'برج السرطان هو أكثر الأبراج عاطفية وحدساً! 💫',
        emoji: '🦀'
    },
    'الأسد': { 
        symbol: '♌', 
        traits: 'إبداعي، كريم، متفائل', 
        element: 'النار',
        lucky_numbers: [5, 14, 23],
        compatibility: ['الحمل', 'القوس'],
        color: '#FF851B',
        stone: 'الياقوت الأصفر',
        description: 'برج الأسد هو أكثر الأبراج النارية حماساً وإبداعاً! 🔥',
        emoji: '🦁'
    },
    'العذراء': { 
        symbol: '♍', 
        traits: 'منظم، تحليلي، مخلص', 
        element: 'الأرض',
        lucky_numbers: [6, 15, 24],
        compatibility: ['الثور', 'الجدي'],
        color: '#7FDBFF',
        stone: 'العقيق اليماني',
        description: 'برج العذراء دقيق ومنظم، يهتم بالتفاصيل والصحة والنظام.',
        emoji: '👧'
    },
    'الميزان': { 
        symbol: '♎', 
        traits: 'دبلوماسي، عادل، اجتماعي', 
        element: 'الهواء',
        lucky_numbers: [7, 16, 25],
        compatibility: ['الجوزاء', 'الدلو'],
        color: '#F012BE',
        stone: 'الياقوت الأزرق',
        description: 'برج الميزان يحب العدل والتوازن، دبلوماسي ومحب للجمال.',
        emoji: '⚖️'
    },
    'العقرب': { 
        symbol: '♏', 
        traits: 'قوي، غامض، عاطفي', 
        element: 'الماء',
        lucky_numbers: [8, 17, 26],
        compatibility: ['السرطان', 'الحوت'],
        color: '#85144B',
        stone: 'الزبرجد',
        description: 'برج العقرب غامض وقوي، يتميز بالذكاء العاطفي والحدس القوي.',
        emoji: '🦂'
    },
    'القوس': { 
        symbol: '♐', 
        traits: 'متفائل، مغامر، صريح', 
        element: 'النار',
        lucky_numbers: [9, 18, 27],
        compatibility: ['الحمل', 'الأسد'],
        color: '#39CCCC',
        stone: 'الفيروز',
        description: 'برج القوس متفائل ومغامر، يحب السفر واكتشاف الثقافات الجديدة.',
        emoji: '🏹'
    },
    'الجدي': { 
        symbol: '♑', 
        traits: 'طموح، منضبط، صبور', 
        element: 'الأرض',
        lucky_numbers: [10, 19, 28],
        compatibility: ['الثور', 'العذراء'],
        color: '#01FF70',
        stone: 'الماس',
        description: 'برج الجدي طموح وعملي، يسعى دائماً للنجاح والتقدم في الحياة.',
        emoji: '🐐'
    },
    'الدلو': { 
        symbol: '♒', 
        traits: 'مستقل، مبتكر، إنساني', 
        element: 'الهواء',
        lucky_numbers: [11, 20, 29],
        compatibility: ['الجوزاء', 'الميزان'],
        color: '#001F3F',
        stone: 'الفيروز',
        description: 'برج الدلو مبتكر ومستقل، يهتم بالإنسانية والتقدم العلمي.',
        emoji: '🏺'
    },
    'الحوت': { 
        symbol: '♓', 
        traits: 'حساس، فني، حالم', 
        element: 'الماء',
        lucky_numbers: [12, 21, 30],
        compatibility: ['السرطان', 'العقرب'],
        color: '#0074D9',
        stone: 'الزبرجد',
        description: 'برج الحوت حساس وفني، يتميز بالخيال الواسع والإبداع.',
        emoji: '🐟'
    }
};

// ملء القوائم المنسدلة للتاريخ
function populateDateDropdowns() {
    const daySelect = document.getElementById('birthDay');
    const monthSelect = document.getElementById('birthMonth');
    const yearSelect = document.getElementById('birthYear');

    // إضافة الأيام
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    // إضافة الأشهر
    const months = ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    // إضافة السنوات
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

// تحديث عدد الأيام حسب الشهر والسنة
function updateDays() {
    const daySelect = document.getElementById('birthDay');
    const monthSelect = document.getElementById('birthMonth');
    const yearSelect = document.getElementById('birthYear');
    
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    
    if (!month || !year) return;
    
    const daysInMonth = new Date(year, month, 0).getDate();
    const currentDay = parseInt(daySelect.value);
    
    daySelect.innerHTML = '<option value="">اختر اليوم</option>';
    
    for (let i = 1; i <= daysInMonth; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === currentDay) option.selected = true;
        daySelect.appendChild(option);
    }
}

// تهيئة حاسبة الأبراج
function initializeZodiacCalculator() {
    const form = document.getElementById('zodiacForm');
    const monthSelect = document.getElementById('birthMonth');
    const yearSelect = document.getElementById('birthYear');

    monthSelect.addEventListener('change', updateDays);
    yearSelect.addEventListener('change', updateDays);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const day = parseInt(document.getElementById('birthDay').value);
        const month = parseInt(document.getElementById('birthMonth').value);
        
        if (day && month) {
            const zodiacSign = calculateZodiacSign(day, month);
            displayZodiacResult(ZODIAC_SIGNS[zodiacSign]);
        } else {
            showError('الرجاء إدخال تاريخ ميلادك بشكل صحيح');
        }
    });
}

// عرض النتيجة مع الرسوم المتحركة
function displayZodiacResult(zodiacInfo) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="result-card">
            <div class="zodiac-symbol mb-4">
                <span class="display-1">${zodiacInfo.emoji}</span>
                <span class="display-4 ms-2">${zodiacInfo.symbol}</span>
            </div>
            <h2 class="zodiac-name mb-4">برجك هو: ${Object.keys(ZODIAC_SIGNS).find(key => ZODIAC_SIGNS[key] === zodiacInfo)}</h2>
            <div class="zodiac-details">
                <div class="row">
                    <div class="col-md-6">
                        <div class="info-item mb-3">
                            <i class="bi bi-stars"></i>
                            <strong>الصفات:</strong> ${zodiacInfo.traits}
                        </div>
                        <div class="info-item mb-3">
                            <i class="bi bi-droplet-fill"></i>
                            <strong>العنصر:</strong> ${zodiacInfo.element}
                        </div>
                        <div class="info-item mb-3">
                            <i class="bi bi-dice-5"></i>
                            <strong>أرقام الحظ:</strong> ${zodiacInfo.lucky_numbers.join(', ')}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="info-item mb-3">
                            <i class="bi bi-heart-fill"></i>
                            <strong>التوافق مع:</strong> ${zodiacInfo.compatibility.join('، ')}
                        </div>
                        <div class="info-item mb-3">
                            <i class="bi bi-palette-fill"></i>
                            <strong>اللون المميز:</strong> <span style="color: ${zodiacInfo.color}">■</span>
                        </div>
                        <div class="info-item mb-3">
                            <i class="bi bi-gem"></i>
                            <strong>الحجر الكريم:</strong> ${zodiacInfo.stone}
                        </div>
                    </div>
                </div>
                <div class="description mt-4">
                    <p class="lead">${zodiacInfo.description}</p>
                </div>
            </div>
            <button onclick="resetCalculator()" class="btn btn-primary mt-4">
                <i class="bi bi-arrow-repeat"></i> حساب برج آخر
            </button>
        </div>
    `;
    
    // تمرير إلى النتيجة
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// إعادة تعيين الحاسبة
function resetCalculator() {
    document.getElementById('zodiacForm').reset();
    document.getElementById('result').style.display = 'none';
}

// حساب البرج
function calculateZodiacSign(day, month) {
    const dates = {
        'الحمل': [[21, 3], [19, 4]],
        'الثور': [[20, 4], [20, 5]],
        'الجوزاء': [[21, 5], [20, 6]],
        'السرطان': [[21, 6], [22, 7]],
        'الأسد': [[23, 7], [22, 8]],
        'العذراء': [[23, 8], [22, 9]],
        'الميزان': [[23, 9], [22, 10]],
        'العقرب': [[23, 10], [21, 11]],
        'القوس': [[22, 11], [21, 12]],
        'الجدي': [[22, 12], [19, 1]],
        'الدلو': [[20, 1], [18, 2]],
        'الحوت': [[19, 2], [20, 3]]
    };

    for (let sign in dates) {
        const [[startDay, startMonth], [endDay, endMonth]] = dates[sign];
        if (
            (month === startMonth && day >= startDay) ||
            (month === endMonth && day <= endDay)
        ) {
            return sign;
        }
    }
    
    return 'الجدي'; // للتواريخ المتبقية في نهاية ديسمبر
}

// عرض رسالة خطأ
function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <i class="bi bi-exclamation-triangle-fill"></i>
            ${message}
        </div>
    `;
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    populateDateDropdowns();
    initializeZodiacCalculator();
});
