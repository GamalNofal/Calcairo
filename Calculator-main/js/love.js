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

        // Name compatibility (40%)
        const nameScore = calculateNameCompatibility(name1, name2);
        score += nameScore * 0.4;
        details.push({
            category: 'توافق الأسماء',
            score: nameScore,
            message: getNameMessage(nameScore)
        });

        // Zodiac compatibility (60%)
        const zodiacScore = calculateZodiacCompatibility(birthdate1, birthdate2);
        score += zodiacScore * 0.6;
        details.push({
            category: 'توافق الأبراج',
            score: zodiacScore,
            message: getZodiacMessage(zodiacScore)
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

    function displayResults(score, details) {
        // Hide loading
        loadingDiv.classList.add('d-none');
        
        // Update percentage
        percentageSpan.textContent = score + '%';
        
        // Set result message
        resultMessage.textContent = getFinalMessage(score);
        
        // Display compatibility details
        compatibilityDiv.innerHTML = details.map(detail => `
            <div class="mb-3">
                <h4 class="mb-2">
                    <i class="bi bi-star-fill text-warning me-2"></i>
                    ${detail.category}
                </h4>
                <div class="progress mb-2" style="height: 20px;">
                    <div class="progress-bar bg-danger" role="progressbar" 
                         style="width: ${detail.score}%">
                        ${detail.score}%
                    </div>
                </div>
                <p class="text-muted">${detail.message}</p>
            </div>
        `).join('');
        
        // Show results
        resultDiv.classList.remove('d-none');
    }

    function getFinalMessage(score) {
        if (score >= 90) return '💕 توافق استثنائي! أنتما مخلوقان لبعضكما البعض';
        if (score >= 80) return '💝 توافق رائع! لديكما فرصة كبيرة للنجاح';
        if (score >= 70) return '💖 توافق جيد جداً! هناك إمكانية جيدة للعلاقة';
        if (score >= 60) return '💗 توافق جيد! يمكنكما العمل على تحسين العلاقة';
        return '❤️ توافق معتدل، قد تحتاجان لمزيد من التفاهم';
    }
});
