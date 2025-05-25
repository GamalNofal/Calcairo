// حقائق مضحكة عن القطط
const CAT_FACTS_LIST = [
    "القطط تقضي 70% من حياتها في النوم! 😴",
    "القطط لديها ذاكرة أفضل من الكلاب! 🧠",
    "القطط تستطيع الجري بسرعة تصل إلى 30 ميل في الساعة! 🏃",
    "القطط لا تتعرق من جسمها، بل من مخالبها فقط! 💦",
    "القطط تستطيع القفز 6 مرات أطول من طولها! 🦘",
    "القطط لديها 32 عضلة في كل أذن! 👂",
    "القطط تستطيع إصدار أكثر من 100 صوت مختلف! 🗣️",
    "القطط تستطيع رؤية في الظلام 6 مرات أفضل من البشر! 👁️"
];

// صفات القطط حسب النشاط
const CAT_PERSONALITIES = {
    sleep: {
        trait: "القط الكسول",
        description: "أنت تحب النوم مثل القطط تماماً! تقضي وقتاً طويلاً في الراحة والاسترخاء 😴"
    },
    play: {
        trait: "القط النشيط",
        description: "أنت مليء بالطاقة والحيوية مثل القط الصغير! تحب اللعب والمرح 🎮"
    },
    eat: {
        trait: "القط الشره",
        description: "أنت تستمتع بالطعام مثل القط المدلل! دائماً تبحث عن وجبة لذيذة 😋"
    },
    explore: {
        trait: "القط المغامر",
        description: "أنت فضولي ومغامر مثل قط الشوارع! تحب اكتشاف كل ما هو جديد 🗺️"
    },
    social: {
        trait: "القط الاجتماعي",
        description: "أنت ودود ومحبوب مثل القط المنزلي! تحب التواصل مع الآخرين 😺"
    }
};

// Initialize when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCatAgeCalculator();
});

function initializeCatAgeCalculator() {
    const catAgeForm = document.getElementById('catAgeForm');
    const humanAgeInput = document.getElementById('humanAge');
    const catLoverSelect = document.getElementById('catLover');

    if (!catAgeForm || !humanAgeInput || !catLoverSelect) {
        console.error('Required elements not found!');
        return;
    }

    // Form submission handler
    catAgeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateCatAge();
    });

    // Age input handler
    humanAgeInput.addEventListener('input', function() {
        if (this.value > 120) {
            this.value = 120;
            showTooltip(this, 'واو! هل أنت حقاً بهذا العمر؟ 😲');
        }
    });

    // Cat lover selection handler
    catLoverSelect.addEventListener('change', function() {
        if (this.value === 'yes') {
            playMeow();
        }
    });
}

function calculateCatAge() {
    const humanAge = parseInt(document.getElementById('humanAge').value);
    const catLover = document.getElementById('catLover').value;
    const activity = document.getElementById('activity').value;

    if (isNaN(humanAge) || humanAge < 1) {
        showTooltip(document.getElementById('humanAge'), 'الرجاء إدخال عمر صحيح');
        return;
    }

    // Calculate cat age using a more accurate formula
    let catAge;
    if (humanAge <= 1) {
        catAge = humanAge * 15;
    } else if (humanAge <= 2) {
        catAge = 15 + (humanAge - 1) * 9;
    } else {
        catAge = 24 + (humanAge - 2) * 4;
    }

    // Adjust cat age based on personality factors
    let personalityBonus = 0;
    if (catLover === 'yes') personalityBonus += 2;
    if (activity === 'sleep') personalityBonus += 3;
    if (activity === 'play') personalityBonus += 1;

    catAge += personalityBonus;

    // Generate fun cat facts based on the calculated age
    const personalizedFacts = getCatFacts(catAge, activity, catLover);
    
    displayResult(catAge, personalizedFacts);
}

function getCatFacts(catAge, activity, catLover) {
    const ageFacts = {
        young: [
            'أنت قط صغير مليء بالطاقة! 🐱',
            'تحب اللعب والجري وراء الفراشات! 🦋',
            'تقضي معظم وقتك في النوم والأكل واللعب 😺'
        ],
        adult: [
            'أنت قط بالغ حكيم! 😸',
            'لديك شخصية مستقلة وتعرف ما تريد 🐱',
            'تحب الاسترخاء في الشمس والتأمل 🌞'
        ],
        senior: [
            'أنت قط كبير وحكيم! 😺',
            'تفضل الهدوء والراحة على الضجيج 😌',
            'لديك خبرة كبيرة في الحياة 🎓'
        ]
    };

    let ageGroup = catAge < 20 ? 'young' : (catAge < 50 ? 'adult' : 'senior');
    let selectedFacts = [...ageFacts[ageGroup]];

    // Add personality-based facts
    if (activity === 'sleep') {
        selectedFacts.push('تحب النوم كثيراً مثل القطط الحقيقية! 😴');
    } else if (activity === 'play') {
        selectedFacts.push('أنت قط نشيط يحب اللعب والمرح! 🎮');
    }

    if (catLover === 'yes') {
        selectedFacts.push('أنت من عشاق القطط وتفهم لغتهم! 😻');
    }

    // Add a random fact from the general list
    selectedFacts.push(CAT_FACTS_LIST[Math.floor(Math.random() * CAT_FACTS_LIST.length)]);

    return selectedFacts;
}

function displayResult(catAge, facts) {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) return;

    const activity = document.getElementById('activity').value;
    
    let moodClass = '';
    let emoji = '';
    
    switch(activity) {
        case 'sleep':
            moodClass = 'sleepy';
            emoji = '😴';
            break;
        case 'play':
            moodClass = 'playful';
            emoji = '😺';
            break;
        case 'eat':
            moodClass = 'happy';
            emoji = '😋';
            break;
        case 'explore':
            moodClass = 'playful';
            emoji = '🐱';
            break;
        case 'social':
            moodClass = 'happy';
            emoji = '😸';
            break;
        default:
            moodClass = 'happy';
            emoji = '😺';
    }

    resultDiv.innerHTML = `
        <div class="cat-result ${moodClass}">
            <div class="cat-emoji">${emoji}</div>
            <h3>عمرك بسنوات القطط هو</h3>
            <div class="cat-age">${catAge} سنة</div>
            <div class="cat-message">
                ${facts.map(fact => `<p>${fact}</p>`).join('')}
            </div>
            <div class="personality-info mt-4">
                <h4>${CAT_PERSONALITIES[activity].trait}</h4>
                <p>${CAT_PERSONALITIES[activity].description}</p>
            </div>
        </div>
    `;
    
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'var(--bs-primary)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '0.5rem 1rem';
    tooltip.style.borderRadius = '5px';
    tooltip.style.zIndex = '1000';
    
    element.parentNode.appendChild(tooltip);
    
    setTimeout(() => tooltip.remove(), 3000);
}

function playMeow() {
    // Create a subtle animation effect instead of sound
    const body = document.querySelector('body');
    const pawPrint = document.createElement('div');
    pawPrint.innerHTML = '🐾';
    pawPrint.style.position = 'fixed';
    pawPrint.style.right = Math.random() * 100 + 'vw';
    pawPrint.style.top = Math.random() * 100 + 'vh';
    pawPrint.style.fontSize = '2rem';
    pawPrint.style.opacity = '0.2';
    pawPrint.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
    pawPrint.style.animation = 'pawPrint 1s ease-out forwards';
    
    body.appendChild(pawPrint);
    setTimeout(() => pawPrint.remove(), 1000);
}
