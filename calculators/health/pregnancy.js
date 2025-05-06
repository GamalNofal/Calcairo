document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const form = document.getElementById('pregnancyCalculatorForm');
    const resultContainer = document.getElementById('result');
    const lmpDateGroup = document.getElementById('lmpDateGroup');
    const conceptionDateGroup = document.getElementById('conceptionDateGroup');
    const calculationTypeInputs = document.getElementsByName('calculationType');

    // Reference date (source of truth)
    const referenceDate = new Date('2024-12-08T17:39:22+02:00');

    // Listen for calculation type change
    calculationTypeInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value === 'lmp') {
                lmpDateGroup.style.display = 'block';
                conceptionDateGroup.style.display = 'none';
            } else {
                lmpDateGroup.style.display = 'none';
                conceptionDateGroup.style.display = 'block';
            }
        });
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateDueDate();
    });

    function calculateDueDate() {
        const calculationType = document.querySelector('input[name="calculationType"]:checked').value;
        const cycleLength = parseInt(document.getElementById('cycleLength').value);
        let dueDate, conceptionDate;

        if (calculationType === 'lmp') {
            const lmpDate = new Date(document.getElementById('lmpDate').value);
            // Naegele's rule with cycle length adjustment
            const cycleDiff = cycleLength - 28;
            dueDate = new Date(lmpDate);
            dueDate.setDate(dueDate.getDate() + 280 + cycleDiff); // 280 days = 40 weeks
            conceptionDate = new Date(lmpDate);
            conceptionDate.setDate(conceptionDate.getDate() + 14 + cycleDiff);
        } else {
            conceptionDate = new Date(document.getElementById('conceptionDate').value);
            dueDate = new Date(conceptionDate);
            dueDate.setDate(dueDate.getDate() + 266); // 266 days = 38 weeks
        }

        displayResults(dueDate, conceptionDate);
    }

    function displayResults(dueDate, conceptionDate) {
        // Calculate current week
        const today = new Date(referenceDate);
        const pregnancyStart = new Date(conceptionDate);
        pregnancyStart.setDate(pregnancyStart.getDate() - 14); // Adjust to LMP
        const diffTime = Math.abs(today - pregnancyStart);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const currentWeek = Math.floor(diffDays / 7);

        // Update result elements
        document.getElementById('dueDate').textContent = formatDate(dueDate);
        document.getElementById('currentWeek').textContent = `الأسبوع ${currentWeek}`;
        document.getElementById('currentTrimester').textContent = getTrimester(currentWeek);

        // Update timeline and tips
        updateTimeline(currentWeek, dueDate);
        updateTips(currentWeek);

        // Show results
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ar-EG', options);
    }

    function getTrimester(week) {
        if (week < 13) return 'الأول (الأسبوع 1-12)';
        if (week < 27) return 'الثاني (الأسبوع 13-26)';
        return 'الثالث (الأسبوع 27-40)';
    }

    function updateTimeline(currentWeek, dueDate) {
        const timeline = document.getElementById('pregnancyTimeline');
        timeline.innerHTML = '';

        const milestones = [
            { week: 12, text: 'نهاية الثلث الأول - موعد فحص الموجات فوق الصوتية الأول' },
            { week: 20, text: 'منتصف الحمل - موعد تحديد جنس الجنين' },
            { week: 24, text: 'فحص السكري الحملي' },
            { week: 28, text: 'بداية الثلث الثالث' },
            { week: 36, text: 'موعد فحص بكتيريا B العقدية' },
            { week: 40, text: 'موعد الولادة المتوقع' }
        ];

        milestones.forEach(milestone => {
            if (milestone.week > currentWeek) {
                const div = document.createElement('div');
                div.className = 'timeline-item';
                const weeksUntil = milestone.week - currentWeek;
                div.innerHTML = `
                    <i class="bi bi-calendar-event text-primary"></i>
                    <strong>الأسبوع ${milestone.week}:</strong>
                    <span>${milestone.text}</span>
                    <small class="text-muted">(بعد ${weeksUntil} أسابيع)</small>
                `;
                timeline.appendChild(div);
            }
        });
    }

    function updateTips(currentWeek) {
        const tipsContainer = document.getElementById('pregnancyTips');
        tipsContainer.innerHTML = '';

        const generalTips = [
            'تناولي الفيتامينات والمكملات الغذائية الموصى بها',
            'حافظي على نظام غذائي متوازن وصحي',
            'مارسي التمارين الخفيفة بانتظام بعد استشارة طبيبك',
            'احصلي على قسط كافٍ من النوم والراحة',
            'اشربي الكثير من الماء يومياً'
        ];

        const weeklyTips = {
            12: 'موعد مهم لفحص الموجات فوق الصوتية الأول',
            20: 'يمكن تحديد جنس الجنين في هذه المرحلة',
            28: 'ابدئي في تحضير حقيبة المستشفى',
            36: 'راقبي حركات الجنين بانتظام'
        };

        // Add general tips
        generalTips.forEach(tip => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="bi bi-check2-circle text-primary me-2"></i>${tip}`;
            li.className = 'mb-2';
            tipsContainer.appendChild(li);
        });

        // Add week-specific tip if available
        if (weeklyTips[currentWeek]) {
            const li = document.createElement('li');
            li.innerHTML = `<i class="bi bi-star-fill text-warning me-2"></i>${weeklyTips[currentWeek]}`;
            li.className = 'mb-2 fw-bold';
            tipsContainer.appendChild(li);
        }
    }
});
