// قائمة الأسئلة
const questions = [
    {
        id: 'social',
        text: 'كم ساعة تقضي على وسائل التواصل الاجتماعي يومياً؟',
        options: [
            { value: '1', text: '🤓 أقل من ساعة' },
            { value: '3', text: '📱 1-3 ساعات' },
            { value: '5', text: '🤳 3-5 ساعات' },
            { value: '7', text: '🧟‍♂️ أكثر من 5 ساعات' }
        ]
    },
    {
        id: 'morning',
        text: 'ماذا تفعل أول ما تستيقظ؟',
        options: [
            { value: '0', text: '🏃‍♂️ أتمرن أو أمارس الرياضة' },
            { value: '1', text: '📝 أخطط ليومي' },
            { value: '2', text: '📱 أتصفح هاتفي' },
            { value: '3', text: '😴 أضغط زر الغفوة عدة مرات' }
        ]
    },
    {
        id: 'procrastination',
        text: 'كيف تتعامل مع المهام المهمة؟',
        options: [
            { value: '0', text: '✅ أنجزها فوراً' },
            { value: '1', text: '📅 أضعها في جدول' },
            { value: '2', text: '😅 أؤجلها حتى آخر لحظة' },
            { value: '3', text: '🙈 أتجاهلها وأتظاهر أنها غير موجودة' }
        ]
    },
    {
        id: 'weekend',
        text: 'كيف تقضي عطلة نهاية الأسبوع عادةً؟',
        options: [
            { value: '1', text: '📚 أتعلم مهارات جديدة' },
            { value: '2', text: '🎮 ألعب ألعاب الفيديو' },
            { value: '3', text: '📺 أشاهد المسلسلات' },
            { value: '4', text: '😴 أنام معظم اليوم' }
        ]
    },
    {
        id: 'notification',
        text: 'كيف تتعامل مع الإشعارات؟',
        options: [
            { value: '0', text: '🔕 أغلقها تماماً' },
            { value: '1', text: '⚡ أرد على المهم فقط' },
            { value: '2', text: '👀 أتحقق منها كل فترة' },
            { value: '3', text: '📱 أرد فوراً على كل شيء' }
        ]
    },
    {
        id: 'distraction',
        text: 'ما الذي يشتت انتباهك أكثر؟',
        options: [
            { value: '1', text: '📱 الهاتف والإشعارات' },
            { value: '2', text: '💭 أحلام اليقظة' },
            { value: '3', text: '👥 الدردشة مع الآخرين' },
            { value: '4', text: '🎵 الموسيقى والترفيه' }
        ]
    }
];

// قائمة النشاطات البديلة
const alternativeActivities = {
    '30min': [
        '🧘‍♂️ تأمل وتنفس عميق',
        '📚 قراءة فصل من كتاب',
        '💪 تمارين رياضية سريعة',
        '✍️ كتابة يوميات',
        '🎨 رسم أو تلوين للاسترخاء'
    ],
    '1hour': [
        '🏃‍♂️ جري أو مشي سريع',
        '📱 تعلم مهارة جديدة عبر الإنترنت',
        '🧹 تنظيم وترتيب المكتب',
        '🎯 إنجاز مهمة من قائمة المهام',
        '🌱 العناية بالنباتات المنزلية'
    ],
    '2hours': [
        '👨‍🍳 تعلم وصفة طبخ جديدة',
        '🎨 ممارسة هواية إبداعية',
        '📚 حضور درس تعليمي عبر الإنترنت',
        '✍️ العمل على مشروع جانبي',
        '🤝 التطوع في مجتمعك المحلي'
    ],
    '3hours': [
        '💼 تطوير مهارات مهنية جديدة',
        '🏃‍♂️ ممارسة رياضة كاملة',
        '📝 التخطيط لمشروع شخصي',
        '🎨 تعلم فن الخط العربي',
        '🤖 تعلم أساسيات البرمجة'
    ],
    '5hours': [
        '📚 إنهاء دورة تدريبية كاملة',
        '💡 بدء مشروع خاص',
        '🎯 تعلم لغة برمجة',
        '✨ تطوير مهارة احترافية',
        '📱 إنشاء محتوى مفيد'
    ]
};

// نصائح لإدارة الوقت
const timeManagementTips = [
    {
        title: 'تقنية بومودورو ⏰',
        description: '25 دقيقة عمل، 5 دقائق راحة. كرر 4 مرات ثم خذ راحة طويلة.'
    },
    {
        title: 'قانون الدقيقتين ⚡',
        description: 'إذا كانت المهمة تستغرق أقل من دقيقتين، قم بها فوراً.'
    },
    {
        title: 'مصفوفة إيزنهاور 📊',
        description: 'صنف مهامك حسب الأهمية والإلحاح لتحديد الأولويات.'
    },
    {
        title: 'قاعدة 80/20 🎯',
        description: '80% من النتائج تأتي من 20% من الجهد. ركز على الأهم.'
    },
    {
        title: 'تجنب تعدد المهام 🚫',
        description: 'ركز على مهمة واحدة في كل مرة للحصول على أفضل النتائج.'
    }
];

// حقائق مثيرة عن إضاعة الوقت
const funFacts = [
    {
        fact: 'نقضي حوالي 6 سنوات من حياتنا على وسائل التواصل الاجتماعي! 😱',
        icon: '📱'
    },
    {
        fact: 'نضيع 76 ساعة سنوياً في البحث عن الأشياء الضائعة! 🔍',
        icon: '⌚'
    },
    {
        fact: 'نقضي 5 أشهر من حياتنا في الانتظار في الطوابير! ⏳',
        icon: '🚶'
    },
    {
        fact: 'نضغط على زر الغفوة بمعدل 3-4 مرات قبل الاستيقاظ! 😴',
        icon: '⏰'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('timeWasterForm');
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
                    ${index === questions.length - 1 ? 'احسب الوقت المهدر! ⏰' : 'السؤال التالي ⏱️'}
                </button>
            </div>
        `;

        // إضافة تأثير حركي
        setTimeout(() => {
            const questionSlide = questionContainer.querySelector('.question-slide');
            questionSlide.style.opacity = '1';
            questionSlide.style.transform = 'translateY(0)';
        }, 50);
    }

    function calculateWastedTime() {
        let totalHours = 0;
        
        // حساب الساعات المهدرة
        Object.values(answers).forEach(value => {
            totalHours += parseInt(value);
        });

        // تحديد فئة الوقت المهدر
        let timeCategory;
        if (totalHours <= 2) {
            timeCategory = '30min';
        } else if (totalHours <= 4) {
            timeCategory = '1hour';
        } else if (totalHours <= 6) {
            timeCategory = '2hours';
        } else if (totalHours <= 8) {
            timeCategory = '3hours';
        } else {
            timeCategory = '5hours';
        }

        return {
            hours: totalHours,
            category: timeCategory
        };
    }

    function getRandomItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function showResults() {
        const { hours, category } = calculateWastedTime();
        const activities = getRandomItems(alternativeActivities[category], 3);
        const tips = getRandomItems(timeManagementTips, 3);
        const facts = getRandomItems(funFacts, 2);

        const hoursPerWeek = hours * 7;
        const hoursPerMonth = hours * 30;
        const hoursPerYear = hours * 365;

        resultDiv.innerHTML = `
            <div class="result-box mt-4" style="opacity: 0; transform: translateY(20px);">
                <div class="time-summary text-center mb-4">
                    <h3 class="mb-3">تحليل الوقت المهدر</h3>
                    <div class="row g-3">
                        <div class="col-6 col-md-3">
                            <div class="time-card">
                                <h4>${hours}</h4>
                                <p>ساعات يومياً</p>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="time-card">
                                <h4>${hoursPerWeek}</h4>
                                <p>ساعات أسبوعياً</p>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="time-card">
                                <h4>${hoursPerMonth}</h4>
                                <p>ساعات شهرياً</p>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="time-card">
                                <h4>${hoursPerYear}</h4>
                                <p>ساعات سنوياً</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="alternative-activities mb-4">
                    <h4 class="mb-3">
                        <i class="bi bi-lightning-charge-fill me-2"></i>
                        نشاطات مفيدة يمكنك القيام بها
                    </h4>
                    <div class="row g-3">
                        ${activities.map(activity => `
                            <div class="col-md-4">
                                <div class="activity-card">
                                    <p class="mb-0">${activity}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="tips-section mb-4">
                    <h4 class="mb-3">
                        <i class="bi bi-lightbulb-fill me-2"></i>
                        نصائح لإدارة وقتك
                    </h4>
                    <div class="row g-3">
                        ${tips.map(tip => `
                            <div class="col-md-4">
                                <div class="tip-card">
                                    <h5>${tip.title}</h5>
                                    <p class="mb-0">${tip.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="fun-facts mb-4">
                    <h4 class="mb-3">
                        <i class="bi bi-info-circle-fill me-2"></i>
                        حقائق مثيرة
                    </h4>
                    ${facts.map(fact => `
                        <div class="fact-card mb-2">
                            <span class="fact-icon">${fact.icon}</span>
                            <p class="mb-0">${fact.fact}</p>
                        </div>
                    `).join('')}
                </div>

                <button onclick="location.reload()" class="btn btn-primary w-100 mt-4">
                    حاول مرة أخرى! 🔄
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

    function handleAnswer(e) {
        e.preventDefault();
        const selectedOption = document.querySelector('input[name="question"]:checked');
        if (!selectedOption) return;

        answers[questions[currentQuestion].id] = selectedOption.value;
        currentQuestion++;
        showQuestion(currentQuestion);
    }

    // تهيئة الاختبار
    showQuestion(0);
    form.addEventListener('submit', handleAnswer);
});
