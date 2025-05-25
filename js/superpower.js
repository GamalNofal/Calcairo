// قائمة الأسئلة والخيارات
const questions = [
    {
        id: 'morning',
        text: 'كيف يبدأ يومك المثالي؟',
        options: [
            { value: 'flying', text: '🌅 الطيران فوق المدينة عند الشروق' },
            { value: 'teleport', text: '⚡ الانتقال الفوري إلى أي مكان' },
            { value: 'mind', text: '🧠 قراءة أفكار الناس في الطريق' },
            { value: 'strength', text: '💪 تمارين خارقة في الجيم' }
        ]
    },
    {
        id: 'hobby',
        text: 'ما هي هوايتك المفضلة؟',
        options: [
            { value: 'tech', text: '🤖 اختراع أجهزة متطورة' },
            { value: 'nature', text: '🌿 التواصل مع الطبيعة' },
            { value: 'art', text: '🎨 الرسم والإبداع' },
            { value: 'help', text: '🤝 مساعدة الآخرين' }
        ]
    },
    {
        id: 'challenge',
        text: 'ما هو أكبر تحدٍ تواجهه؟',
        options: [
            { value: 'time', text: '⏰ عدم وجود وقت كافٍ' },
            { value: 'energy', text: '🔋 نفاد الطاقة سريعاً' },
            { value: 'focus', text: '🎯 تشتت التركيز' },
            { value: 'balance', text: '⚖️ التوازن بين العمل والحياة' }
        ]
    },
    {
        id: 'mission',
        text: 'ما هي مهمتك المفضلة كبطل خارق؟',
        options: [
            { value: 'protect', text: '🛡️ حماية المدينة من الأشرار' },
            { value: 'heal', text: '💖 شفاء المرضى والجرحى' },
            { value: 'teach', text: '📚 تعليم ومساعدة الأطفال' },
            { value: 'nature', text: '🌍 حماية البيئة والطبيعة' }
        ]
    },
    {
        id: 'team',
        text: 'كيف تفضل العمل؟',
        options: [
            { value: 'solo', text: '🦹‍♂️ بطل منفرد مثل باتمان' },
            { value: 'duo', text: '👥 مع شريك موثوق' },
            { value: 'team', text: '🦸‍♂️ ضمن فريق من الأبطال' },
            { value: 'mentor', text: '👨‍🏫 كمدرب للأبطال الجدد' }
        ]
    },
    {
        id: 'style',
        text: 'ما هو أسلوبك في مواجهة المشاكل؟',
        options: [
            { value: 'smart', text: '🧩 التفكير والتخطيط بذكاء' },
            { value: 'direct', text: '🎯 المواجهة المباشرة' },
            { value: 'creative', text: '💡 الحلول الإبداعية' },
            { value: 'diplomatic', text: '🤝 الحوار والدبلوماسية' }
        ]
    }
];

// قائمة القوى الخارقة
const superpowers = {
    'المتحكم بالزمن ⌛': {
        description: 'لديك القدرة على التحكم في الوقت! يمكنك إيقافه، إرجاعه، أو التنقل عبر الزمن',
        abilities: [
            'إيقاف الزمن للحظات قصيرة ⏸️',
            'العودة 10 دقائق إلى الماضي ⏪',
            'رؤية المستقبل القريب 🔮',
            'منح الوقت الإضافي للآخرين 🎁'
        ],
        warning: 'تحذير: التلاعب بالزمن قد يؤدي إلى نتائج غير متوقعة! ⚠️'
    },
    'العقل الخارق 🧠': {
        description: 'عقلك قوي بشكل استثنائي! يمكنك قراءة الأفكار والتحكم في الأشياء عن بعد',
        abilities: [
            'قراءة أفكار الآخرين 📖',
            'تحريك الأشياء بقوة العقل 🪄',
            'الاتصال الذهني عن بعد 📡',
            'حل المشكلات المعقدة في ثوانٍ 🧮'
        ],
        warning: 'تحذير: استخدم قدراتك العقلية بحكمة واحترم خصوصية الآخرين! 🤫'
    },
    'المخترع العبقري 🤖': {
        description: 'لديك عقل علمي متطور وقدرة على اختراع أي شيء تتخيله!',
        abilities: [
            'اختراع أجهزة متطورة في دقائق ⚡',
            'تطوير حلول تكنولوجية للمشاكل 💡',
            'فهم وتطوير أي تقنية 🔧',
            'التواصل مع الذكاء الاصطناعي 🤖'
        ],
        warning: 'تحذير: مع القوة التكنولوجية تأتي مسؤولية كبيرة! 🔬'
    },
    'المعالج السحري 💫': {
        description: 'تمتلك قوى شفاء وتجديد خارقة! يمكنك مساعدة الآخرين وشفاء أي مرض',
        abilities: [
            'شفاء الجروح والأمراض لمسياً 🤚',
            'تجديد الطاقة والحيوية ⚡',
            'تنقية البيئة من التلوث 🌱',
            'منح السعادة والإيجابية للآخرين 😊'
        ],
        warning: 'تحذير: قواك تستنزف طاقتك، تحتاج للراحة بعد استخدامها! 🌙'
    },
    'حامي الطبيعة 🌿': {
        description: 'لديك قدرة خارقة على التواصل مع الطبيعة والتحكم في عناصرها!',
        abilities: [
            'التحدث مع النباتات والحيوانات 🗣️',
            'التحكم في الطقس والعناصر 🌪️',
            'تنمية وشفاء النباتات 🌱',
            'استدعاء مساعدة الحيوانات 🦊'
        ],
        warning: 'تحذير: الطبيعة قوية وغير متوقعة، استخدم قواك بحذر! 🍃'
    },
    'البطل الخفي 🎭': {
        description: 'تمتلك قدرات خارقة في التخفي والتسلل! يمكنك حل المشاكل دون أن يراك أحد',
        abilities: [
            'التخفي عن الأنظار في أي وقت 👻',
            'المرور عبر الجدران والأبواب 🚪',
            'نسخ شكل أي شخص أو شيء 🎭',
            'إخفاء الآخرين معك 🫂'
        ],
        warning: 'تحذير: مع القوة الخفية تأتي مسؤولية الحفاظ على الأسرار! 🤫'
    }
};

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('superpowerForm');
    const questionContainer = document.getElementById('questionContainer');
    const resultDiv = document.getElementById('result');
    const progressBar = document.querySelector('.progress-bar');
    
    let currentQuestion = 0;
    const answers = {};

    function showQuestion(index) {
        if (index >= questions.length) {
            showResults();
            return;
        }

        const question = questions[index];
        const progress = ((index + 1) / questions.length) * 100;

        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);

        const optionsHTML = question.options
            .map(option => `
                <div class="form-check mb-3">
                    <input class="form-check-input" type="radio" 
                           name="question" value="${option.value}" 
                           id="${option.value}" required>
                    <label class="form-check-label" for="${option.value}">
                        ${option.text}
                    </label>
                </div>
            `).join('');

        questionContainer.innerHTML = `
            <div class="question-slide" style="opacity: 0; transform: translateY(20px);">
                <h3 class="question-title mb-4">${question.text}</h3>
                ${optionsHTML}
                <button type="submit" class="btn btn-primary w-100 mt-4">
                    ${index === questions.length - 1 ? 'اكتشف قوتك الخارقة! 🦸‍♂️' : 'السؤال التالي ⚡'}
                </button>
            </div>
        `;

        // إضافة تأثير حركي بعد فترة قصيرة
        setTimeout(() => {
            const questionSlide = questionContainer.querySelector('.question-slide');
            questionSlide.style.opacity = '1';
            questionSlide.style.transform = 'translateY(0)';
        }, 50);
    }

    function handleAnswer(e) {
        e.preventDefault();
        const selectedOption = document.querySelector('input[name="question"]:checked');
        if (!selectedOption) return;

        answers[questions[currentQuestion].id] = selectedOption.value;
        currentQuestion++;
        showQuestion(currentQuestion);
    }

    function calculateSuperpower() {
        const powerPoints = {
            'المتحكم بالزمن ⌛': 0,
            'العقل الخارق 🧠': 0,
            'المخترع العبقري 🤖': 0,
            'المعالج السحري 💫': 0,
            'حامي الطبيعة 🌿': 0,
            'البطل الخفي 🎭': 0
        };

        // تحليل الإجابات وحساب النقاط
        if (answers.morning === 'flying' || answers.morning === 'teleport') {
            powerPoints['المتحكم بالزمن ⌛'] += 2;
        }
        if (answers.morning === 'mind' || answers.style === 'smart') {
            powerPoints['العقل الخارق 🧠'] += 2;
        }
        if (answers.hobby === 'tech' || answers.style === 'creative') {
            powerPoints['المخترع العبقري 🤖'] += 2;
        }
        if (answers.mission === 'heal' || answers.hobby === 'help') {
            powerPoints['المعالج السحري 💫'] += 2;
        }
        if (answers.hobby === 'nature' || answers.mission === 'nature') {
            powerPoints['حامي الطبيعة 🌿'] += 2;
        }
        if (answers.team === 'solo' || answers.style === 'smart') {
            powerPoints['البطل الخفي 🎭'] += 2;
        }

        // إضافة نقاط إضافية بناءً على التحديات والأسلوب
        if (answers.challenge === 'time') powerPoints['المتحكم بالزمن ⌛'] += 1;
        if (answers.challenge === 'focus') powerPoints['العقل الخارق 🧠'] += 1;
        if (answers.style === 'creative') powerPoints['المخترع العبقري 🤖'] += 1;
        if (answers.team === 'mentor') powerPoints['المعالج السحري 💫'] += 1;
        if (answers.mission === 'nature') powerPoints['حامي الطبيعة 🌿'] += 1;
        if (answers.style === 'diplomatic') powerPoints['البطل الخفي 🎭'] += 1;

        return Object.entries(powerPoints)
            .reduce((a, b) => a[1] > b[1] ? a : b)[0];
    }

    function showResults() {
        const superpower = calculateSuperpower();
        const power = superpowers[superpower];

        resultDiv.innerHTML = `
            <div class="result-box mt-4" style="opacity: 0; transform: translateY(20px);">
                <h3 class="text-center mb-4">قوتك الخارقة هي:</h3>
                <div class="superpower-name display-4 text-center mb-4">
                    <span class="floating-emoji">${superpower.split(' ')[0]}</span>
                    ${superpower.split(' ').slice(1).join(' ')}
                </div>
                
                <div class="superpower-description mb-4">
                    <p class="lead">${power.description}</p>
                </div>

                <div class="abilities-box mb-4">
                    <h4 class="mb-3">قدراتك الخارقة:</h4>
                    <ul class="list-group">
                        ${power.abilities.map(ability => 
                            `<li class="list-group-item">
                                <i class="bi bi-stars me-2"></i>
                                ${ability}
                             </li>`
                        ).join('')}
                    </ul>
                </div>

                <div class="warning-box alert alert-warning">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    ${power.warning}
                </div>

                <button onclick="location.reload()" class="btn btn-primary w-100 mt-4">
                    اختبر قوة خارقة أخرى! 🦸‍♂️
                </button>
            </div>
        `;

        // عرض النتيجة مع تأثير حركي
        resultDiv.style.display = 'block';
        setTimeout(() => {
            resultDiv.querySelector('.result-box').style.opacity = '1';
            resultDiv.querySelector('.result-box').style.transform = 'translateY(0)';
        }, 50);
        
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // تهيئة الاختبار
    showQuestion(0);
    form.addEventListener('submit', handleAnswer);
});
