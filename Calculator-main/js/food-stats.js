// قائمة الأطعمة التي سيتم حساب إحصائياتها
const foodItems = [
    {
        id: 'burger',
        title: 'البرجر 🍔',
        description: 'كم برجر تأكل في الشهر؟',
        funFact: 'هل تعلم؟ لو وضعت كل البرجر الذي أكلته في صف واحد، سيصل طوله إلى {length} متر!',
        calories: 250,
        emoji: '🍔'
    },
    {
        id: 'pizza',
        title: 'البيتزا 🍕',
        description: 'كم بيتزا تأكل في الشهر؟',
        funFact: 'واو! لو جمعت كل البيتزا التي أكلتها، ستغطي مساحة {area} متر مربع!',
        calories: 285,
        emoji: '🍕'
    },
    {
        id: 'coffee',
        title: 'القهوة ☕',
        description: 'كم كوب قهوة تشرب في اليوم؟',
        funFact: 'مذهل! لو جمعت كل القهوة التي شربتها، ستملأ {cups} حوض سباحة صغير!',
        calories: 2,
        emoji: '☕'
    },
    {
        id: 'chocolate',
        title: 'الشوكولاتة 🍫',
        description: 'كم قطعة شوكولاتة تأكل في الأسبوع؟',
        funFact: 'رائع! بكمية الشوكولاتة التي أكلتها، يمكنك صنع تمثال شوكولاتة بارتفاع {height} سم!',
        calories: 150,
        emoji: '🍫'
    },
    {
        id: 'rice',
        title: 'الأرز 🍚',
        description: 'كم مرة تأكل الأرز في الأسبوع؟',
        funFact: 'هل تعلم؟ كمية الأرز التي أكلتها تكفي لتغذية {meals} شخص لمدة يوم كامل!',
        calories: 130,
        emoji: '🍚'
    }
];

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('foodStatsForm');
    const resultDiv = document.getElementById('result');
    const progressBar = document.querySelector('.progress-bar');
    let userAnswers = {};

    let currentQuestionIndex = 0;
    const questions = [
        {
            question: "كم وجبة تأكل في اليوم عادةً؟",
            options: ["1-2", "3-4", "5+"],
            weight: { healthNut: [0, 1, 0], foodie: [0, 0, 1], traditional: [1, 0, 0] }
        },
        {
            question: "هل تفضل الطعام الحار؟",
            options: ["نعم، كثيراً! 🌶️", "أحياناً", "لا أحب الحار"],
            weight: { healthNut: [0, 1, 0], foodie: [1, 0, 0], traditional: [0, 0, 1] }
        },
        {
            question: "كم مرة تطلب طعاماً من المطاعم أسبوعياً؟",
            options: ["نادراً", "1-3 مرات", "4+ مرات"],
            weight: { healthNut: [1, 0, 0], foodie: [0, 0, 1], traditional: [0, 1, 0] }
        },
        {
            question: "هل تأكل الخضروات بانتظام؟",
            options: ["نعم، يومياً", "أحياناً", "نادراً"],
            weight: { healthNut: [1, 0, 0], foodie: [0, 1, 0], traditional: [0, 0, 1] }
        },
        {
            question: "ما هو وقت الوجبة المفضل لديك؟",
            options: ["الفطور", "الغداء", "العشاء"],
            weight: { healthNut: [1, 0, 0], foodie: [0, 1, 0], traditional: [0, 0, 1] }
        }
    ];

    const foodProfiles = {
        healthNut: {
            title: "عاشق الصحة! 🥗",
            description: "أنت تهتم كثيراً بصحتك وتختار طعامك بعناية. استمر هكذا!",
            recommendations: [
                "جرب إضافة المزيد من البذور والمكسرات إلى وجباتك",
                "استمتع بتناول الفواكه الطازجة كوجبات خفيفة",
                "اشرب الماء بكثرة بين الوجبات"
            ],
            emoji: "🥗"
        },
        foodie: {
            title: "عاشق الطعام! 🍕",
            description: "أنت تستمتع بتجربة أصناف مختلفة من الطعام وتقدر النكهات المتنوعة.",
            recommendations: [
                "جرب المطاعم التي تقدم أطباقاً من مختلف الثقافات",
                "تعلم طبخ أطباق جديدة في المنزل",
                "شارك تجاربك الغذائية مع الأصدقاء"
            ],
            emoji: "🍕"
        },
        traditional: {
            title: "محب للتقليدي! 🍖",
            description: "أنت تفضل الأطباق التقليدية والمألوفة. لا بأس في ذلك!",
            recommendations: [
                "حاول إضافة نكهات جديدة إلى أطباقك المفضلة",
                "جرب تناول الخضروات بطرق مختلفة",
                "استمتع بالوجبات العائلية التقليدية"
            ],
            emoji: "🍖"
        }
    };

    function showQuestion(index) {
        const questionContainer = document.getElementById('questionContainer');
        if (index >= questions.length) {
            calculateAndShowResults();
            return;
        }

        const question = questions[index];
        const progressPercentage = (index / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.setAttribute('aria-valuenow', progressPercentage);

        let html = `
            <div class="question-slide">
                <h3 class="mb-4">${question.question}</h3>
                <div class="options-container">
        `;

        question.options.forEach((option, i) => {
            html += `
                <div class="form-check custom-option mb-3">
                    <input class="form-check-input" type="radio" name="question${index}" id="option${i}" value="${i}" required>
                    <label class="form-check-label" for="option${i}">
                        ${option}
                    </label>
                </div>
            `;
        });

        html += `
                </div>
                <button type="submit" class="btn btn-primary w-100 mt-4">
                    ${index === questions.length - 1 ? 'اعرض النتائج! 🎉' : 'التالي ⏭️'}
                </button>
            </div>
        `;

        questionContainer.innerHTML = html;
        
        // Add animation
        const questionSlide = questionContainer.querySelector('.question-slide');
        questionSlide.style.animation = 'slideIn 0.5s ease-out';
    }

    function handleAnswer(e) {
        e.preventDefault();
        const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
        if (!selectedOption) return;

        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
        
        const questionSlide = document.querySelector('.question-slide');
        questionSlide.style.animation = 'slideOut 0.5s ease-out';
        
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(currentQuestionIndex);
            } else {
                calculateAndShowResults();
            }
        }, 400);
    }

    function calculateFoodProfile() {
        const scores = {
            healthNut: 0,
            foodie: 0,
            traditional: 0
        };

        // Calculate scores based on answers and weights
        Object.entries(userAnswers).forEach(([questionIndex, answer]) => {
            const question = questions[questionIndex];
            Object.entries(question.weight).forEach(([profile, weights]) => {
                scores[profile] += weights[answer];
            });
        });

        // Find the profile with highest score
        const maxScore = Math.max(...Object.values(scores));
        const profile = Object.entries(scores).find(([_, score]) => score === maxScore)[0];
        
        return {
            ...foodProfiles[profile],
            scores: Object.entries(scores).map(([name, score]) => ({
                name: foodProfiles[name].title,
                score: (score / Object.keys(userAnswers).length) * 100
            }))
        };
    }

    function calculateFoodStats() {
        const monthsInYear = 12;
        const weeksInYear = 52;
        const daysInYear = 365;
        
        // Example calculations based on average consumption
        return {
            burgers: Math.round(Math.random() * 50 + 20) * monthsInYear,
            pizzaArea: Math.round(Math.random() * 30 + 10),
            coffeeCups: Math.round(Math.random() * 500 + 200) * daysInYear,
            chocolateHeight: Math.round(Math.random() * 100 + 50),
            caloriesPerYear: Math.round(Math.random() * 500000 + 300000)
        };
    }

    function calculateAndShowResults() {
        const profile = calculateFoodProfile();
        const stats = calculateFoodStats();
        
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <div class="result-container">
                <div class="profile-section text-center mb-5">
                    <div class="profile-emoji mb-3">${profile.emoji}</div>
                    <h2 class="mb-3">${profile.title}</h2>
                    <p class="lead mb-4">${profile.description}</p>
                    
                    <div class="profile-scores mb-4">
                        ${profile.scores.map(score => `
                            <div class="score-bar mb-3">
                                <div class="score-label">${score.name}</div>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" 
                                         style="width: ${score.score}%" 
                                         aria-valuenow="${score.score}" 
                                         aria-valuemin="0" 
                                         aria-valuemax="100">
                                        ${Math.round(score.score)}%
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="stats-section mb-5">
                    <h3 class="text-center mb-4">إحصائيات مثيرة! 📊</h3>
                    <div class="row g-4">
                        <div class="col-md-6">
                            <div class="stat-card">
                                <div class="stat-emoji">🍔</div>
                                <div class="stat-value">${stats.burgers}</div>
                                <div class="stat-label">برجر في السنة</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="stat-card">
                                <div class="stat-emoji">🍕</div>
                                <div class="stat-value">${stats.pizzaArea}</div>
                                <div class="stat-label">متر مربع من البيتزا</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="stat-card">
                                <div class="stat-emoji">☕</div>
                                <div class="stat-value">${stats.coffeeCups}</div>
                                <div class="stat-label">كوب قهوة في السنة</div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="stat-card">
                                <div class="stat-emoji">🔥</div>
                                <div class="stat-value">${(stats.caloriesPerYear / 1000).toFixed(1)}K</div>
                                <div class="stat-label">سعرة حرارية في السنة</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="recommendations-section mb-5">
                    <h3 class="text-center mb-4">توصيات خاصة لك 🌟</h3>
                    <div class="recommendations-list">
                        ${profile.recommendations.map(rec => `
                            <div class="recommendation-item">
                                <i class="bi bi-check-circle-fill"></i>
                                <span>${rec}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="text-center mt-4">
                    <button onclick="resetQuiz()" class="btn btn-primary btn-lg">
                        جرب مرة أخرى! 🔄
                    </button>
                    <button onclick="shareResults()" class="btn btn-outline-primary btn-lg ms-2">
                        شارك النتائج! 🔗
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('foodStatsForm').style.display = 'none';
        resultDiv.style.display = 'block';
        
        // Animate progress bars
        setTimeout(() => {
            document.querySelectorAll('.progress-bar').forEach(bar => {
                bar.style.transition = 'width 1s ease-out';
                bar.style.width = bar.getAttribute('aria-valuenow') + '%';
            });
        }, 100);
    }

    function resetQuiz() {
        currentQuestionIndex = 0;
        userAnswers = {};
        document.getElementById('foodStatsForm').style.display = 'block';
        document.getElementById('result').style.display = 'none';
        showQuestion(0);
    }

    function shareResults() {
        // Implement sharing functionality
        alert('قريباً! سيتم إضافة خاصية مشاركة النتائج في التحديث القادم 🔜');
    }

    // تهيئة الاختبار
    showQuestion(0);
    form.addEventListener('submit', handleAnswer);
});
