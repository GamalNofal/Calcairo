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
        emoji: '🐏',
        funny_facts: ['يحب التحدث عن نفسه لدرجة أن الناس يظنون أنه مقدم برامج! 🎤', 'لديه طاقة تكفي لشحن هاتف محمول! 🔋', 'يتخذ قرارات سريعة حتى في اختيار وجبة الغداء! 🍽️']
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
        emoji: '🐂',
        funny_facts: ['يمكنه تذوق الطعام في أحلامه! 😋', 'عناده يمكن أن يحرك الجبال! ⛰️', 'يحفظ قائمة المطاعم أكثر من حفظه لأرقام الهواتف! 📝']
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
        emoji: '👥',
        funny_facts: ['يتحدث مع نفسه ويجيب أيضاً! 🗣️', 'لديه شخصيتان: واحدة للعمل وأخرى للحفلات! 🎭', 'يمكنه قراءة كتابين في نفس الوقت! 📚']
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
        emoji: '🦀',
        funny_facts: ['يبكي أثناء مشاهدة إعلانات الطعام! 😢', 'لديه ذاكرة خارقة لتذكر كل موقف محرج! 🤦', 'يحتفظ بصور الطعام أكثر من صور العائلة! 📸']
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
        emoji: '🦁',
        funny_facts: ['يعتقد أن السيلفي اخترع من أجله! 🤳', 'يضع نفسه كخلفية للهاتف! 📱', 'يعتبر المرآة أفضل صديق! 👑']
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
        emoji: '👧',
        funny_facts: ['يرتب حتى الإيموجي حسب الألوان! 🎨', 'لديه جدول زمني لترتيب جدوله الزمني! 📅', 'يصحح الأخطاء الإملائية في رسائل الآخرين ذهنياً! ✍️']
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
        emoji: '⚖️',
        funny_facts: ['يقضي ساعة في اختيار فلتر الصورة! 🖼️', 'يوازن بين القهوة والشاي بشرب كليهما! ☕', 'يحتاج لرأي الجميع حتى في اختيار لون الجوارب! 🧦']
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
        emoji: '🦂',
        funny_facts: ['يحفظ أسرار لا يعرفها حتى أصحابها! 🤫', 'نظرته تخيف حتى الظلام! 👀', 'يعرف كل شيء ولكن يتظاهر بأنه لا يعرف شيئاً! 🕵️']
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
        emoji: '🏹',
        funny_facts: ['يخطط لرحلة حول العالم وينتهي به الأمر في المقهى المجاور! ☕', 'يعتقد أن الصراحة هي أن تقول كل ما يخطر ببالك! 🗣️', 'يضحك على نكتة قالها لنفسه! 😄']
    },
    'الجدي': { 
        symbol: '♑', 
        traits: 'طموح، منضبط، عملي', 
        element: 'الأرض',
        lucky_numbers: [10, 19, 28],
        compatibility: ['الثور', 'العذراء'],
        color: '#001F3F',
        stone: 'الماس',
        description: 'برج الجدي طموح وعملي، يسعى دائماً للنجاح والتقدم.',
        emoji: '🐐',
        funny_facts: ['يضع خطة خمسية لشراء البقالة! 🛒', 'يعتبر الجدول الإكسل أفضل اختراع في التاريخ! 📊', 'يحتفل بإنجازاته بالعمل لساعات إضافية! 💼']
    },
    'الدلو': { 
        symbol: '♒', 
        traits: 'مبتكر، مستقل، إنساني', 
        element: 'الهواء',
        lucky_numbers: [11, 20, 29],
        compatibility: ['الجوزاء', 'الميزان'],
        color: '#01FF70',
        stone: 'العقيق الأزرق',
        description: 'برج الدلو مبتكر وفريد، يفكر خارج الصندوق دائماً.',
        emoji: '🏺',
        funny_facts: ['يخترع مشاكل ليجد لها حلولاً! 💡', 'يعتقد أن الروبوتات ستكون أفضل أصدقائه! 🤖', 'يلبس جوارب مختلفة عمداً! 🧦']
    },
    'الحوت': { 
        symbol: '♓', 
        traits: 'حساس، فني، حالم', 
        element: 'الماء',
        lucky_numbers: [12, 21, 30],
        compatibility: ['السرطان', 'العقرب'],
        color: '#0074D9',
        stone: 'حجر القمر',
        description: 'برج الحوت حساس وخيالي، يتميز بالإبداع والحدس القوي.',
        emoji: '🐟',
        funny_facts: ['يعيش في عالم موازٍ معظم الوقت! 🌌', 'يتحدث مع النباتات ويعتقد أنها تفهمه! 🌿', 'ينسى أين وضع هاتفه وهو يتحدث به! 📱']
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
    
    // Fade out
    daySelect.style.opacity = '0';
    setTimeout(() => {
        daySelect.innerHTML = '<option value="">اختر اليوم</option>';
        
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            if (i === currentDay) option.selected = true;
            daySelect.appendChild(option);
        }
        
        // Fade in
        daySelect.style.opacity = '1';
        daySelect.style.transition = 'opacity 0.3s ease-in';
    }, 200);
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
    const zodiacSymbol = resultDiv.querySelector('.zodiac-symbol');
    const zodiacName = resultDiv.querySelector('.zodiac-name');
    const traits = resultDiv.querySelector('.traits span');
    const element = resultDiv.querySelector('.element span');
    const stone = resultDiv.querySelector('.stone span');
    const compatibility = resultDiv.querySelector('.compatibility span');
    const description = resultDiv.querySelector('.description span');
    const numbers = resultDiv.querySelector('.numbers span');
    const funnyFacts = resultDiv.querySelector('.funny-facts');

    // Clear previous results
    resultDiv.style.opacity = '0';
    
    // Set new content
    zodiacSymbol.innerHTML = `${zodiacInfo.symbol} ${zodiacInfo.emoji}`;
    zodiacName.innerHTML = `برج ${Object.keys(ZODIAC_SIGNS).find(key => ZODIAC_SIGNS[key] === zodiacInfo)}`;
    traits.textContent = zodiacInfo.traits;
    element.innerHTML = `${getElementEmoji(zodiacInfo.element)} ${zodiacInfo.element}`;
    stone.textContent = zodiacInfo.stone;
    compatibility.innerHTML = zodiacInfo.compatibility.map(sign => `<span class="compatibility-sign">${sign}</span>`).join(' ، ');
    description.textContent = zodiacInfo.description;
    funnyFacts.innerHTML = zodiacInfo.funny_facts.map(fact => `<li>${fact}</li>`).join('');
    
    // Display lucky numbers with animation
    numbers.innerHTML = zodiacInfo.lucky_numbers
        .map(num => `<span class="lucky-number">${num}</span>`)
        .join(' ، ');

    // Show results with animation
    resultDiv.style.display = 'block';
    setTimeout(() => {
        resultDiv.style.opacity = '1';
        resultDiv.style.transition = 'opacity 0.5s ease-in';
    }, 100);

    // Animate lucky numbers
    const luckyNumbers = resultDiv.querySelectorAll('.lucky-number');
    luckyNumbers.forEach((num, index) => {
        setTimeout(() => {
            num.style.transform = 'scale(1)';
            num.style.opacity = '1';
        }, index * 200);
    });
}

function getElementEmoji(element) {
    const emojis = {
        'النار': '🔥',
        'الأرض': '🌍',
        'الهواء': '💨',
        'الماء': '💧'
    };
    return emojis[element] || '';
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

// إضافة مؤثرات حركية للأزرار
function addButtonEffects() {
    const submitButton = document.querySelector('.discover-btn');
    
    submitButton.addEventListener('mouseover', () => {
        submitButton.style.transform = 'translateY(-2px)';
    });
    
    submitButton.addEventListener('mouseout', () => {
        submitButton.style.transform = 'translateY(0)';
    });
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    populateDateDropdowns();
    initializeZodiacCalculator();
    addButtonEffects();
});
