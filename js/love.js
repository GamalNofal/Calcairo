document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loveCalculator');
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    const percentageSpan = document.getElementById('percentage');
    const resultMessage = document.getElementById('resultMessage');
    const compatibilityDiv = document.getElementById('compatibility');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const name1 = document.getElementById('name1').value.trim();
        const name2 = document.getElementById('name2').value.trim();
        const birthdate1 = document.getElementById('birthdate1').value;
        const birthdate2 = document.getElementById('birthdate2').value;

        // Show loading animation
        loadingDiv.classList.remove('d-none');
        resultDiv.classList.add('d-none');

        // Calculate after animation
        setTimeout(() => calculateLovePercentage(name1, name2, birthdate1, birthdate2), 1500);
    });

    function calculateLovePercentage(name1, name2, birthdate1, birthdate2) {
        let score = 0;
        let details = [];

        // Name compatibility (30%)
        const nameScore = calculateNameCompatibility(name1, name2);
        score += nameScore * 0.3;
        details.push({
            category: 'توافق الأسماء',
            score: nameScore,
            message: getNameMessage(nameScore)
        });

        // Zodiac compatibility (40%)
        const zodiacScore = calculateZodiacCompatibility(birthdate1, birthdate2);
        score += zodiacScore * 0.4;
        details.push({
            category: 'توافق الأبراج',
            score: zodiacScore,
            message: getZodiacMessage(zodiacScore)
        });

        // Numerology compatibility (30%)
        const numerologyScore = calculateNumerologyCompatibility(name1, name2, birthdate1, birthdate2);
        score += numerologyScore * 0.3;
        details.push({
            category: 'توافق الأرقام',
            score: numerologyScore,
            message: getNumerologyMessage(numerologyScore)
        });

        // Round the final score
        const finalScore = Math.round(score);

        displayResults(finalScore, details);
    }

    function calculateNameCompatibility(name1, name2) {
        let score = 0;
        
        // Convert names to lowercase for comparison
        name1 = name1.toLowerCase();
        name2 = name2.toLowerCase();

        // Common letters bonus
        const commonLetters = new Set([...name1].filter(letter => name2.includes(letter)));
        score += (commonLetters.size / Math.max(name1.length, name2.length)) * 50;

        // Length similarity bonus
        const lengthDiff = Math.abs(name1.length - name2.length);
        score += (1 - lengthDiff / Math.max(name1.length, name2.length)) * 30;

        // First letter bonus
        if (name1[0] === name2[0]) {
            score += 20;
        }

        return Math.min(100, Math.round(score));
    }

    function calculateZodiacCompatibility(date1, date2) {
        const zodiac1 = getZodiacSign(new Date(date1));
        const zodiac2 = getZodiacSign(new Date(date2));
        
        const compatibility = {
            'الحمل': { 'الأسد': 90, 'القوس': 90, 'الجوزاء': 85, 'الدلو': 80 },
            'الثور': { 'العذراء': 90, 'الجدي': 90, 'السرطان': 85, 'الحوت': 80 },
            'الجوزاء': { 'الميزان': 90, 'الدلو': 90, 'الحمل': 85, 'الأسد': 80 },
            'السرطان': { 'العقرب': 90, 'الحوت': 90, 'الثور': 85, 'العذراء': 80 },
            'الأسد': { 'الحمل': 90, 'القوس': 90, 'الجوزاء': 85, 'الميزان': 80 },
            'العذراء': { 'الثور': 90, 'الجدي': 90, 'السرطان': 85, 'العقرب': 80 },
            'الميزان': { 'الجوزاء': 90, 'الدلو': 90, 'الأسد': 85, 'القوس': 80 },
            'العقرب': { 'السرطان': 90, 'الحوت': 90, 'العذراء': 85, 'الجدي': 80 },
            'القوس': { 'الحمل': 90, 'الأسد': 90, 'الميزان': 85, 'الدلو': 80 },
            'الجدي': { 'الثور': 90, 'العذراء': 90, 'العقرب': 85, 'الحوت': 80 },
            'الدلو': { 'الجوزاء': 90, 'الميزان': 90, 'القوس': 85, 'الحمل': 80 },
            'الحوت': { 'السرطان': 90, 'العقرب': 90, 'الجدي': 85, 'الثور': 80 }
        };

        if (zodiac1 === zodiac2) return 95; // Same sign
        if (compatibility[zodiac1]?.[zodiac2]) return compatibility[zodiac1][zodiac2];
        if (compatibility[zodiac2]?.[zodiac1]) return compatibility[zodiac2][zodiac1];
        return 60; // Default compatibility
    }

    function getZodiacSign(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();

        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'الحمل';
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'الثور';
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'الجوزاء';
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'السرطان';
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'الأسد';
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'العذراء';
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'الميزان';
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'العقرب';
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'القوس';
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'الجدي';
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'الدلو';
        return 'الحوت';
    }

    function getNameMessage(score) {
        if (score >= 90) return 'توافق استثنائي في الأسماء!';
        if (score >= 80) return 'توافق ممتاز في الأسماء';
        if (score >= 70) return 'توافق جيد جداً في الأسماء';
        if (score >= 60) return 'توافق جيد في الأسماء';
        return 'توافق معتدل في الأسماء';
    }

    function getZodiacMessage(score) {
        if (score >= 90) return 'توافق فلكي مثالي!';
        if (score >= 80) return 'توافق فلكي ممتاز';
        if (score >= 70) return 'توافق فلكي جيد جداً';
        if (score >= 60) return 'توافق فلكي جيد';
        return 'توافق فلكي معتدل';
    }

    function calculateNumerologyCompatibility(name1, name2, date1, date2) {
        // Calculate life path numbers
        const lifePathNumber1 = calculateLifePathNumber(date1);
        const lifePathNumber2 = calculateLifePathNumber(date2);
        
        // Calculate destiny numbers
        const destinyNumber1 = calculateDestinyNumber(name1);
        const destinyNumber2 = calculateDestinyNumber(name2);

        let score = 0;
        
        // Life path compatibility
        if (lifePathNumber1 === lifePathNumber2) score += 50;
        else if (Math.abs(lifePathNumber1 - lifePathNumber2) === 1) score += 40;
        else if ([1,3,5,7,9].includes(lifePathNumber1) && [1,3,5,7,9].includes(lifePathNumber2)) score += 35;
        else if ([2,4,6,8].includes(lifePathNumber1) && [2,4,6,8].includes(lifePathNumber2)) score += 35;
        
        // Destiny number compatibility
        if (destinyNumber1 === destinyNumber2) score += 50;
        else if (Math.abs(destinyNumber1 - destinyNumber2) === 1) score += 40;
        else score += 25;

        return score;
    }

    function calculateLifePathNumber(dateStr) {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        let sum = day + month + Array.from(String(year), Number).reduce((a, b) => a + b, 0);
        while (sum > 9) {
            sum = Array.from(String(sum), Number).reduce((a, b) => a + b, 0);
        }
        return sum;
    }

    function calculateDestinyNumber(name) {
        const letterValues = {
            'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
            'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
            's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
        };
        
        let sum = Array.from(name.toLowerCase())
            .filter(char => letterValues[char])
            .reduce((acc, char) => acc + letterValues[char], 0);
            
        while (sum > 9) {
            sum = Array.from(String(sum), Number).reduce((a, b) => a + b, 0);
        }
        return sum;
    }

    function getNumerologyMessage(score) {
        if (score >= 90) return 'توافق رقمي مثالي! طاقتكما متناغمة بشكل استثنائي';
        if (score >= 80) return 'توافق رقمي ممتاز! لديكما تناغم روحي قوي';
        if (score >= 70) return 'توافق رقمي جيد جداً! طاقتكما متكاملة';
        if (score >= 60) return 'توافق رقمي جيد! يمكنكما العمل على تحسين العلاقة';
        return 'توافق رقمي معتدل، حاولا فهم بعضكما البعض بشكل أفضل';
    }

    function displayResults(score, details) {
        // Hide loading and show results
        loadingDiv.classList.add('d-none');
        resultDiv.classList.remove('d-none');
        
        // Animate percentage counter
        let currentScore = 0;
        const duration = 1500;
        const interval = 20;
        const steps = duration / interval;
        const increment = score / steps;
        
        const counter = setInterval(() => {
            currentScore += increment;
            if (currentScore >= score) {
                currentScore = score;
                clearInterval(counter);
            }
            percentageSpan.textContent = Math.round(currentScore) + '%';
        }, interval);
        
        // Set result message with emoji animation
        resultMessage.innerHTML = getFinalMessage(score);
        
        // Get names for fun facts
        const name1 = document.getElementById('name1').value.trim();
        const name2 = document.getElementById('name2').value.trim();
        
        // Display compatibility details with fade-in animation
        compatibilityDiv.innerHTML = details.map((detail, index) => `
            <div class="mb-4 detail-item" style="animation: fadeIn 0.5s ${index * 0.2}s forwards; opacity: 0;">
                <h4 class="mb-2 text-end">
                    ${detail.category}
                    <i class="bi bi-star-fill text-warning"></i>
                </h4>
                <div class="progress mb-2" style="height: 20px; direction: ltr;">
                    <div class="progress-bar bg-danger" role="progressbar" 
                         style="width: ${detail.score}%">
                        ${detail.score}%
                    </div>
                </div>
                <p class="text-muted">${detail.message}</p>
            </div>
        `).join('');

        // Add fun facts
        const funFacts = getFunFacts(score, name1, name2);
        if (funFacts.length > 0) {
            compatibilityDiv.innerHTML += `
                <div class="mt-4 fun-facts">
                    <h4 class="mb-3 text-end">
                        حقائق ممتعة
                        <i class="bi bi-lightbulb-fill text-warning"></i>
                    </h4>
                    <ul class="list-unstyled">
                        ${funFacts.map((fact, index) => `
                            <li class="mb-2 text-end" style="animation: fadeIn 0.5s ${(index + details.length) * 0.2}s forwards; opacity: 0;">
                                ${fact}
                                <i class="bi bi-check-circle-fill text-success"></i>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        // Add relationship advice
        const advice = getRelationshipAdvice(score, details);
        compatibilityDiv.innerHTML += `
            <div class="mt-4 advice" style="animation: fadeIn 0.5s ${(funFacts.length + details.length) * 0.2}s forwards; opacity: 0;">
                <h4 class="mb-3 text-end">
                    نصيحة للعلاقة
                    <i class="bi bi-heart-fill text-danger"></i>
                </h4>
                <p class="text-muted">${advice}</p>
            </div>
        `;

        // Initialize sharing buttons after results are displayed
        setTimeout(() => {
            const shareButtons = document.querySelectorAll('.share-buttons button');
            shareButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const platform = button.getAttribute('data-platform');
                    const resultText = `${name1} و ${name2}: ${score}% - ${resultMessage.textContent}`;
                    shareResult(platform, resultText);
                });
            });
        }, duration);
    }

    function getFunFacts(score, name1, name2) {
        const facts = [];
        
        // Add random fun facts based on score
        if (score >= 90) {
            facts.push(
                `لو كان ${name1} و ${name2} بيتزا، لكانت أفضل بيتزا في العالم! 🍕`,
                'حتى الكواكب تغار من توافقكما! 🌍✨',
                'نسبة التوافق بينكما أعلى من نسبة الماء في البطيخ! 🍉'
            );
        } else if (score >= 80) {
            facts.push(
                `${name1} و ${name2} مثل الشاي والنعناع - مزيج مثالي! ☕️`,
                'توافقكما يجعل حتى القطط تبتسم! 😺',
                'لو كان حبكما أغنية، لكانت الأكثر استماعاً على سبوتيفاي! 🎵'
            );
        } else if (score >= 70) {
            facts.push(
                'علاقتكما مثل البطاطس المقلية - لا يمكن مقاومتها! 🍟',
                `${name1} و ${name2} مثل الإيموجي - يفهمان بعضهما البعض بدون كلام! 😄`,
                'حتى الواي فاي يغار من قوة اتصالكما! 📶'
            );
        } else if (score >= 60) {
            facts.push(
                'علاقتكما مثل الطقس في الربيع - متقلبة لكنها جميلة! 🌸',
                'مثل محاولة تعليم قطة السباحة - صعب لكنه ممكن! 🐱',
                'توافقكما مثل البطارية - يحتاج إلى شحن من وقت لآخر! 🔋'
            );
        } else {
            facts.push(
                'علاقتكما مثل محاولة تناول الحساء بالشوكة - تحتاج إلى صبر! 🥄',
                'مثل الجوارب المختلفة - مختلفان لكن يمكن أن تعملا معاً! 🧦',
                'حتى النملة تحمل أشياء أثقل من مشاكلكما! 🐜'
            );
        }

        // Add random universal facts
        const universalFacts = [
            `هل تعلمون أن ${name1} و ${name2} يتنفسان نفس الهواء؟ عجيب! 😱`,
            'العلماء يؤكدون أن الضحك معاً يزيد نسبة التوافق بين الشريكين! 😂',
            'دراسات تؤكد أن المشي معاً يزيد نسبة التوافق بين الشريكين! 👫',
            'الأزواج السعداء يأكلون البيتزا معاً مرتين في الشهر على الأقل! 🍕',
            'الأشخاص المتوافقون يميلون إلى مشاهدة نفس المسلسلات! 📺'
        ];

        // Add 2 random universal facts
        const randomUniversalFacts = universalFacts.sort(() => 0.5 - Math.random()).slice(0, 2);
        facts.push(...randomUniversalFacts);

        // Shuffle all facts and return 3 random facts
        return facts.sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    function getRelationshipAdvice(score, details) {
        if (score >= 90) {
            return 'علاقتكما متميزة! حافظا على التواصل المفتوح والصادق، واستمرا في تطوير علاقتكما من خلال الأنشطة المشتركة والحوار البناء.';
        } else if (score >= 80) {
            return 'لديكما أساس قوي للعلاقة! ركزا على فهم احتياجات بعضكما البعض، وخصصا وقتاً للأنشطة المشتركة التي تقوي روابطكما.';
        } else if (score >= 70) {
            return 'علاقتكما واعدة! اعملا على تحسين التواصل بينكما، وحاولا فهم وجهات نظر بعضكما البعض بشكل أفضل.';
        } else if (score >= 60) {
            return 'يمكنكما بناء علاقة جيدة من خلال الصبر والتفاهم. ركزا على نقاط القوة المشتركة وتعلما من الاختلافات بينكما.';
        } else {
            return 'كل علاقة تحتاج إلى جهد وتفاهم. حاولا التركيز على التواصل الجيد وفهم احتياجات بعضكما البعض.';
        }
    }

    function shareResult(platform, text) {
        const url = encodeURIComponent(window.location.href);
        const encodedText = encodeURIComponent(`${text} - حاسبة الحب والتوافق`);
        let shareUrl = '';
        
        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${url}`;
                break;
            case 'messenger':
                shareUrl = `https://www.facebook.com/dialog/send?app_id=936529753100615&link=${url}&redirect_uri=${url}&quote=${encodedText}`;
                break;
        }
        
        if (shareUrl) {
            const width = 600;
            const height = 400;
            const left = (window.innerWidth - width) / 2;
            const top = (window.innerHeight - height) / 2;
            window.open(shareUrl, '_blank', `width=${width},height=${height},left=${left},top=${top},location=0,menubar=0`);
        }
    }

    function getFinalMessage(score) {
        if (score >= 90) return '💕 توافق استثنائي! أنتما مخلوقان لبعضكما البعض';
        if (score >= 80) return '💝 توافق رائع! لديكما فرصة كبيرة للنجاح';
        if (score >= 70) return '💖 توافق جيد جداً! هناك إمكانية جيدة للعلاقة';
        if (score >= 60) return '💗 توافق جيد! يمكنكما العمل على تحسين العلاقة';
        return '❤️ توافق معتدل، قد تحتاجان لمزيد من التفاهم';
    }
});
