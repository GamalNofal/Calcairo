document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('horoscopeForm');
    const resultDiv = document.getElementById('result');

    // Zodiac signs data
    const zodiacSigns = {
        aries: {
            name: 'الحمل',
            arabicName: 'الحمل',
            dateRange: '21 مارس - 19 أبريل',
            element: 'النار',
            planet: 'المريخ',
            gem: 'الماس',
            traits: [
                'شجاع وحماسي',
                'مستقل وقيادي',
                'متحمس ومغامر',
                'صريح ومباشر'
            ],
            compatibility: ['الأسد', 'القوس', 'الجوزاء', 'الدلو'],
            icon: 'bi-arrow-up-circle'
        },
        taurus: {
            name: 'الثور',
            arabicName: 'الثور',
            dateRange: '20 أبريل - 20 مايو',
            element: 'التراب',
            planet: 'الزهرة',
            gem: 'الزمرد',
            traits: [
                'صبور وموثوق',
                'عملي ومثابر',
                'محب للجمال',
                'مخلص ووفي'
            ],
            compatibility: ['العذراء', 'الجدي', 'السرطان', 'الحوت'],
            icon: 'bi-circle'
        },
        gemini: {
            name: 'الجوزاء',
            arabicName: 'الجوزاء',
            dateRange: '21 مايو - 20 يونيو',
            element: 'الهواء',
            planet: 'عطارد',
            gem: 'العقيق',
            traits: [
                'ذكي وفضولي',
                'متكيف ومرن',
                'اجتماعي ومتواصل',
                'مبدع ومتعدد المواهب'
            ],
            compatibility: ['الميزان', 'الدلو', 'الحمل', 'الأسد'],
            icon: 'bi-people'
        },
        cancer: {
            name: 'السرطان',
            arabicName: 'السرطان',
            dateRange: '21 يونيو - 22 يوليو',
            element: 'الماء',
            planet: 'القمر',
            gem: 'اللؤلؤ',
            traits: [
                'عاطفي وحساس',
                'حدسي وخيالي',
                'محب للأسرة',
                'حامي ومخلص'
            ],
            compatibility: ['العقرب', 'الحوت', 'الثور', 'العذراء'],
            icon: 'bi-moon'
        },
        leo: {
            name: 'الأسد',
            arabicName: 'الأسد',
            dateRange: '23 يوليو - 22 أغسطس',
            element: 'النار',
            planet: 'الشمس',
            gem: 'الياقوت',
            traits: [
                'واثق وكريم',
                'قيادي وطموح',
                'مبدع ومتفائل',
                'محب للحياة'
            ],
            compatibility: ['الحمل', 'القوس', 'الجوزاء', 'الميزان'],
            icon: 'bi-sun'
        },
        virgo: {
            name: 'العذراء',
            arabicName: 'العذراء',
            dateRange: '23 أغسطس - 22 سبتمبر',
            element: 'التراب',
            planet: 'عطارد',
            gem: 'الياقوت الأزرق',
            traits: [
                'منظم ودقيق',
                'عملي وتحليلي',
                'مخلص ومجتهد',
                'متواضع وخدوم'
            ],
            compatibility: ['الثور', 'الجدي', 'السرطان', 'العقرب'],
            icon: 'bi-person'
        },
        libra: {
            name: 'الميزان',
            arabicName: 'الميزان',
            dateRange: '23 سبتمبر - 22 أكتوبر',
            element: 'الهواء',
            planet: 'الزهرة',
            gem: 'الأوبال',
            traits: [
                'دبلوماسي وعادل',
                'اجتماعي ومتناغم',
                'رومانسي وجذاب',
                'محب للسلام'
            ],
            compatibility: ['الجوزاء', 'الدلو', 'الأسد', 'القوس'],
            icon: 'bi-balance-scale'
        },
        scorpio: {
            name: 'العقرب',
            arabicName: 'العقرب',
            dateRange: '23 أكتوبر - 21 نوفمبر',
            element: 'الماء',
            planet: 'المريخ وبلوتو',
            gem: 'التوباز',
            traits: [
                'عميق وغامض',
                'قوي وعاطفي',
                'حدسي ومخلص',
                'مصمم ومثابر'
            ],
            compatibility: ['السرطان', 'الحوت', 'العذراء', 'الجدي'],
            icon: 'bi-star'
        },
        sagittarius: {
            name: 'القوس',
            arabicName: 'القوس',
            dateRange: '22 نوفمبر - 21 ديسمبر',
            element: 'النار',
            planet: 'المشتري',
            gem: 'الفيروز',
            traits: [
                'متفائل ومغامر',
                'صريح وفلسفي',
                'محب للسفر',
                'مستقل وحر'
            ],
            compatibility: ['الحمل', 'الأسد', 'الميزان', 'الدلو'],
            icon: 'bi-arrow-up-right'
        },
        capricorn: {
            name: 'الجدي',
            arabicName: 'الجدي',
            dateRange: '22 ديسمبر - 19 يناير',
            element: 'التراب',
            planet: 'زحل',
            gem: 'العقيق الأسود',
            traits: [
                'طموح ومنظم',
                'مسؤول وجاد',
                'صبور ومثابر',
                'عملي وواقعي'
            ],
            compatibility: ['الثور', 'العذراء', 'العقرب', 'الحوت'],
            icon: 'bi-mountain'
        },
        aquarius: {
            name: 'الدلو',
            arabicName: 'الدلو',
            dateRange: '20 يناير - 18 فبراير',
            element: 'الهواء',
            planet: 'زحل وأورانوس',
            gem: 'العقيق اليماني',
            traits: [
                'مبتكر ومستقل',
                'إنساني وتقدمي',
                'ذكي وأصيل',
                'صديق مخلص'
            ],
            compatibility: ['الجوزاء', 'الميزان', 'الحمل', 'القوس'],
            icon: 'bi-water'
        },
        pisces: {
            name: 'الحوت',
            arabicName: 'الحوت',
            dateRange: '19 فبراير - 20 مارس',
            element: 'الماء',
            planet: 'المشتري ونبتون',
            gem: 'الزبرجد',
            traits: [
                'حساس وعاطفي',
                'حدسي وروحاني',
                'خيالي ورحيم',
                'فني ومبدع'
            ],
            compatibility: ['السرطان', 'العقرب', 'الثور', 'الجدي'],
            icon: 'bi-fish'
        }
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateZodiac();
    });

    function calculateZodiac() {
        const birthDate = new Date(document.getElementById('birthDate').value);
        if (!birthDate) {
            alert('يرجى إدخال تاريخ الميلاد');
            return;
        }

        const month = birthDate.getMonth() + 1;
        const day = birthDate.getDate();
        
        let zodiacSign = getZodiacSign(month, day);
        displayResult(zodiacSign);
    }

    function getZodiacSign(month, day) {
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns.aries;
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns.taurus;
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns.gemini;
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns.cancer;
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns.leo;
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns.virgo;
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns.libra;
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns.scorpio;
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns.sagittarius;
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns.capricorn;
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns.aquarius;
        return zodiacSigns.pisces;
    }

    function displayResult(zodiac) {
        // Update zodiac name and icon
        document.getElementById('zodiacName').textContent = `${zodiac.arabicName} (${zodiac.dateRange})`;
        document.getElementById('zodiacIcon').className = `bi ${zodiac.icon} display-1 text-warning`;

        // Update traits
        const traitsList = document.getElementById('zodiacTraits');
        traitsList.innerHTML = zodiac.traits.map(trait => 
            `<li class="list-group-item">${trait}</li>`
        ).join('');

        // Update elements
        document.getElementById('zodiacElements').innerHTML = `
            <span class="badge bg-primary me-2">${zodiac.element}</span>
            <span class="badge bg-success me-2">${zodiac.planet}</span>
            <span class="badge bg-info">${zodiac.gem}</span>
        `;

        // Update compatibility
        document.getElementById('compatibleSigns').innerHTML = 
            `<p class="mb-0">الأبراج المتوافقة: ${zodiac.compatibility.join('، ')}</p>`;

        // Show results
        resultDiv.classList.remove('d-none');
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
});
