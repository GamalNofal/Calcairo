// قائمة الأسئلة
const questions = [
    {
        id: 'motivation',
        text: 'ما الذي يدفعك للتصرف كبطل؟',
        options: [
            { value: 'justice', text: '⚖️ إحقاق العدل ومحاربة الظلم', points: { justice: 5, protection: 3, innovation: 1 } },
            { value: 'help', text: '🤝 مساعدة المحتاجين', points: { protection: 5, empathy: 3, justice: 1 } },
            { value: 'discovery', text: '🔬 اكتشاف قدرات جديدة', points: { innovation: 5, mystery: 3, strength: 1 } },
            { value: 'adventure', text: '🌟 البحث عن المغامرة', points: { strength: 5, mystery: 3, speed: 1 } }
        ]
    },
    {
        id: 'challenge',
        text: 'كيف تواجه التحديات الصعبة؟',
        options: [
            { value: 'plan', text: '🧠 أخطط بعناية قبل التصرف', points: { intelligence: 5, strategy: 3, innovation: 1 } },
            { value: 'instinct', text: '⚡ أعتمد على حدسي وأتصرف بسرعة', points: { speed: 5, instinct: 3, strength: 1 } },
            { value: 'team', text: '👥 أطلب المساعدة من الآخرين', points: { leadership: 5, empathy: 3, protection: 1 } },
            { value: 'force', text: '💪 أواجه التحدي بكل قوتي', points: { strength: 5, courage: 3, justice: 1 } }
        ]
    },
    {
        id: 'weakness',
        text: 'ما هي نقطة ضعفك الأكبر؟',
        options: [
            { value: 'emotions', text: '❤️ عواطفي تتحكم في قراراتي', points: { empathy: 5, protection: 3, mystery: 1 } },
            { value: 'trust', text: '🤔 صعوبة الثقة بالآخرين', points: { mystery: 5, strategy: 3, intelligence: 1 } },
            { value: 'perfectionism', text: '✨ السعي للكمال', points: { intelligence: 5, innovation: 3, leadership: 1 } },
            { value: 'impulsive', text: '⚡ التصرف بتهور', points: { speed: 5, courage: 3, instinct: 1 } }
        ]
    },
    {
        id: 'power',
        text: 'أي قوة خارقة تتمنى امتلاكها؟',
        options: [
            { value: 'fly', text: '🦅 الطيران', points: { freedom: 5, speed: 3, courage: 1 } },
            { value: 'mind', text: '🧠 قراءة الأفكار', points: { mystery: 5, empathy: 3, intelligence: 1 } },
            { value: 'strength', text: '💪 قوة خارقة', points: { strength: 5, protection: 3, courage: 1 } },
            { value: 'invisibility', text: '👻 الاختفاء', points: { mystery: 5, strategy: 3, speed: 1 } }
        ]
    },
    {
        id: 'goal',
        text: 'ما هو هدفك الأسمى كبطل خارق؟',
        options: [
            { value: 'peace', text: '🕊️ نشر السلام في العالم', points: { protection: 5, empathy: 3, justice: 1 } },
            { value: 'knowledge', text: '📚 اكتشاف أسرار الكون', points: { intelligence: 5, innovation: 3, mystery: 1 } },
            { value: 'evil', text: '⚔️ محاربة الشر', points: { justice: 5, strength: 3, courage: 1 } },
            { value: 'protect', text: '🛡️ حماية الضعفاء', points: { protection: 5, leadership: 3, empathy: 1 } }
        ]
    }
];

const superheroes = {
    'العقل الخارق 🧠': {
        description: 'أنت بطل يتميز بالذكاء الخارق والقدرة على حل المشكلات المعقدة!',
        mainPowers: ['الذكاء الخارق', 'التحليل السريع', 'الابتكار'],
        traits: ['ذكي', 'استراتيجي', 'مبتكر'],
        weakness: 'الانغماس في التفكير لفترات طويلة',
        primaryAttributes: ['intelligence', 'innovation', 'strategy'],
        advice: [
            'استخدم ذكاءك لمساعدة الآخرين في حل مشاكلهم',
            'لا تدع التفكير المفرط يمنعك من التصرف',
            'شارك معرفتك مع الآخرين'
        ],
        stats: {
            intelligence: 95,
            strategy: 90,
            innovation: 85,
            speed: 60,
            strength: 50
        }
    },
    'حامي العدالة ⚖️': {
        description: 'أنت بطل يكرس حياته لتحقيق العدالة ومحاربة الظلم!',
        mainPowers: ['حس العدالة القوي', 'القيادة الحكيمة', 'الشجاعة'],
        traits: ['عادل', 'شجاع', 'قيادي'],
        weakness: 'التمسك الشديد بالمثاليات',
        primaryAttributes: ['justice', 'leadership', 'courage'],
        advice: [
            'كن مرناً في تطبيق العدالة',
            'استمع لوجهات النظر المختلفة',
            'ساعد في نشر الوعي بالحقوق والواجبات'
        ],
        stats: {
            justice: 95,
            leadership: 85,
            courage: 80,
            empathy: 75,
            strength: 70
        }
    },
    'المحارب الأسطوري 💪': {
        description: 'أنت بطل يتمتع بقوة جسدية خارقة وشجاعة لا تقهر!',
        mainPowers: ['القوة الخارقة', 'المقاومة العالية', 'السرعة الفائقة'],
        traits: ['قوي', 'شجاع', 'مقدام'],
        weakness: 'التسرع في اتخاذ القرارات',
        primaryAttributes: ['strength', 'courage', 'speed'],
        advice: [
            'استخدم قوتك بحكمة وفقط عند الضرورة',
            'تعلم متى تتراجع',
            'احمِ الضعفاء ولا تستعرض قوتك'
        ],
        stats: {
            strength: 95,
            courage: 90,
            speed: 85,
            protection: 80,
            strategy: 50
        }
    },
    'الحامي الرحيم 🛡️': {
        description: 'أنت بطل يتميز بقدرته على حماية الآخرين والتعاطف معهم!',
        mainPowers: ['درع حماية قوي', 'تعاطف خارق', 'قيادة حكيمة'],
        traits: ['حامي', 'متعاطف', 'حكيم'],
        weakness: 'تحمل آلام الآخرين',
        primaryAttributes: ['protection', 'empathy', 'leadership'],
        advice: [
            'لا تنسَ الاعتناء بنفسك أيضاً',
            'علّم الآخرين كيف يحمون أنفسهم',
            'اسمح للآخرين بمساعدتك أحياناً'
        ],
        stats: {
            protection: 95,
            empathy: 90,
            leadership: 85,
            strength: 75,
            courage: 70
        }
    },
    'الظل الغامض 🌙': {
        description: 'أنت بطل يعمل في الخفاء ويحل الألغاز المعقدة!',
        mainPowers: ['التخفي', 'الحدس القوي', 'الذكاء التكتيكي'],
        traits: ['غامض', 'ذكي', 'استراتيجي'],
        weakness: 'صعوبة الثقة بالآخرين',
        primaryAttributes: ['mystery', 'strategy', 'intelligence'],
        advice: [
            'لا تدع الشك يسيطر على حياتك',
            'شارك معلوماتك مع حلفائك',
            'استخدم غموضك لمفاجأة الأشرار'
        ],
        stats: {
            mystery: 95,
            strategy: 90,
            intelligence: 85,
            speed: 80,
            empathy: 60
        }
    }
};

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('superheroForm');
    const resultDiv = document.getElementById('result');
    const progressBar = document.querySelector('.progress-bar');
    const questionContainer = document.getElementById('questionContainer');

    let currentQuestion = 0;
    const answers = {};
    const points = {
        intelligence: 0, strategy: 0, innovation: 0,
        justice: 0, leadership: 0, courage: 0,
        strength: 0, speed: 0, protection: 0,
        empathy: 0, mystery: 0, freedom: 0,
        instinct: 0
    };

    function showQuestion(index) {
        if (index >= questions.length) {
            calculateResults();
            return;
        }

        const question = questions[index];
        const progress = ((index + 1) / questions.length) * 100;

        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);

        const optionsHTML = question.options
            .map(option => `
                <div class="custom-option mb-3">
                    <input class="form-check-input" type="radio" 
                           name="question" value="${option.value}" 
                           id="${option.value}" required>
                    <label class="form-check-label" for="${option.value}">
                        ${option.text}
                    </label>
                </div>
            `).join('');

        const questionHTML = `
            <div class="question-slide">
                <h3 class="question-title mb-4">${question.text}</h3>
                <div class="options-container">
                    ${optionsHTML}
                </div>
                <button type="submit" class="btn btn-primary w-100 mt-4">
                    ${index === questions.length - 1 ? 'اكتشف قواك الخارقة! 🦸‍♂️' : 'السؤال التالي ⏭️'}
                </button>
            </div>
        `;

        // Add fade out animation to current question
        if (questionContainer.children.length > 0) {
            questionContainer.children[0].style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                questionContainer.innerHTML = questionHTML;
                // Add fade in animation to new question
                questionContainer.children[0].style.animation = 'slideIn 0.3s ease-out';
            }, 300);
        } else {
            questionContainer.innerHTML = questionHTML;
            questionContainer.children[0].style.animation = 'slideIn 0.3s ease-out';
        }
    }

    function handleAnswer(e) {
        e.preventDefault();
        const selectedOption = document.querySelector('input[name="question"]:checked');
        if (!selectedOption) return;

        const question = questions[currentQuestion];
        const answer = question.options.find(opt => opt.value === selectedOption.value);
        
        // Add points from the selected answer
        for (const [attribute, value] of Object.entries(answer.points)) {
            points[attribute] += value;
        }

        answers[question.id] = selectedOption.value;
        currentQuestion++;
        showQuestion(currentQuestion);
    }

    function calculateResults() {
        // Calculate the most suitable superhero based on points
        let maxPoints = 0;
        let superheroType = '';

        for (const [hero, data] of Object.entries(superheroes)) {
            const totalPoints = data.primaryAttributes.reduce((sum, attr) => sum + points[attr], 0);
            if (totalPoints > maxPoints) {
                maxPoints = totalPoints;
                superheroType = hero;
            }
        }

        const hero = superheroes[superheroType];
        
        // Calculate power levels for stats chart
        const powerLevels = Object.entries(hero.stats)
            .map(([stat, value]) => ({
                stat: stat,
                value: value,
                color: getStatColor(value)
            }));

        showResults(hero, powerLevels);
    }

    function getStatColor(value) {
        if (value >= 90) return '#2ecc71'; // Green for high stats
        if (value >= 75) return '#3498db'; // Blue for good stats
        if (value >= 60) return '#f1c40f'; // Yellow for average stats
        return '#e74c3c'; // Red for low stats
    }

    function showResults(hero, powerLevels) {
        resultDiv.innerHTML = `
            <div class="result-container">
                <div class="hero-profile text-center mb-5">
                    <div class="hero-icon mb-3 display-1">${hero.description.split(' ')[0]}</div>
                    <h2 class="mb-3">${hero.description}</h2>
                    
                    <div class="powers-section mt-4">
                        <h3 class="mb-3">قواك الخارقة الرئيسية ⚡</h3>
                        <div class="powers-grid">
                            ${hero.mainPowers.map(power => `
                                <div class="power-item">
                                    <span class="power-text">${power}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="traits-section mt-4">
                        <h3 class="mb-3">سماتك المميزة 🌟</h3>
                        <div class="traits-list">
                            ${hero.traits.map(trait => `
                                <span class="trait-badge">${trait}</span>
                            `).join('')}
                        </div>
                    </div>

                    <div class="weakness-section mt-4">
                        <h3 class="mb-3">نقطة ضعفك 🎯</h3>
                        <div class="weakness-box">
                            ${hero.weakness}
                        </div>
                    </div>

                    <div class="stats-section mt-5">
                        <h3 class="mb-4">إحصائيات قواك 📊</h3>
                        <div class="stats-grid">
                            ${powerLevels.map(stat => `
                                <div class="stat-bar-container">
                                    <div class="stat-label">${getStatLabel(stat.stat)}</div>
                                    <div class="stat-bar">
                                        <div class="stat-fill" style="width: ${stat.value}%; background-color: ${stat.color}">
                                            <span class="stat-value">${stat.value}%</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="advice-section mt-5">
                        <h3 class="mb-3">نصائح لتطوير قواك 💡</h3>
                        <div class="advice-list">
                            ${hero.advice.map(tip => `
                                <div class="advice-item">
                                    <i class="bi bi-stars"></i>
                                    <span>${tip}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="actions mt-5">
                        <button onclick="location.reload()" class="btn btn-primary btn-lg">
                            اختبر قواك مرة أخرى! 🔄
                        </button>
                        <button onclick="shareResults()" class="btn btn-outline-primary btn-lg ms-2">
                            شارك نتيجتك! 🔗
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        resultDiv.style.display = 'block';
        
        // Animate stats bars
        setTimeout(() => {
            document.querySelectorAll('.stat-fill').forEach((bar, index) => {
                bar.style.animation = `fillBar 1s ease-out ${index * 0.2}s forwards`;
            });
        }, 100);

        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }

    function getStatLabel(stat) {
        const labels = {
            intelligence: 'الذكاء',
            strategy: 'التخطيط',
            innovation: 'الابتكار',
            justice: 'العدالة',
            leadership: 'القيادة',
            courage: 'الشجاعة',
            strength: 'القوة',
            speed: 'السرعة',
            protection: 'الحماية',
            empathy: 'التعاطف',
            mystery: 'الغموض'
        };
        return labels[stat] || stat;
    }

    function shareResults() {
        alert('قريباً! سيتم إضافة خاصية مشاركة النتائج في التحديث القادم 🔜');
    }

    // تهيئة الاختبار
    showQuestion(0);
    form.addEventListener('submit', handleAnswer);
});
