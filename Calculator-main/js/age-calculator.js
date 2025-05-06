document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ageCalculatorForm');
    const resultDiv = document.getElementById('result');
    const birthDateInput = document.getElementById('birthDate');

    // Set max date to today
    const today = new Date();
    birthDateInput.max = today.toISOString().split('T')[0];

    function calculateAge(birthDate) {
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        // Adjust for negative days
        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
            days += lastMonth.getDate();
        }

        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    }

    function calculateTotalValues(birthDate) {
        const today = new Date();
        const diffTime = Math.abs(today - birthDate);
        const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                          (today.getMonth() - birthDate.getMonth());

        return { totalDays, totalWeeks, totalMonths };
    }

    function getNextBirthday(birthDate) {
        const today = new Date();
        const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        
        if (nextBirthday < today) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }

        const daysUntil = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
        return {
            date: nextBirthday,
            daysUntil: daysUntil
        };
    }

    function getUpcomingEvents(birthDate, age) {
        const events = [];
        const nextBirthday = getNextBirthday(birthDate);
        
        events.push({
            name: `عيد ميلادك الـ ${age.years + 1}`,
            daysLeft: nextBirthday.daysUntil,
            date: nextBirthday.date
        });

        // Add more milestone events
        const milestones = [18, 21, 25, 30, 40, 50, 60, 70, 80, 90, 100];
        const nextMilestone = milestones.find(m => m > age.years);
        
        if (nextMilestone) {
            const daysToMilestone = Math.ceil(
                (new Date(birthDate.getTime() + (nextMilestone * 365.25 * 24 * 60 * 60 * 1000)) - new Date()) 
                / (1000 * 60 * 60 * 24)
            );
            
            if (daysToMilestone > 0) {
                events.push({
                    name: `عيد ميلادك الـ ${nextMilestone}`,
                    daysLeft: daysToMilestone,
                    date: new Date(new Date().getTime() + (daysToMilestone * 24 * 60 * 60 * 1000))
                });
            }
        }

        return events.sort((a, b) => a.daysLeft - b.daysLeft);
    }

    function formatDate(date) {
        return new Intl.DateTimeFormat('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }

    function displayResults(birthDate) {
        const age = calculateAge(birthDate);
        const totals = calculateTotalValues(birthDate);
        const events = getUpcomingEvents(birthDate, age);

        // Update main age display
        document.getElementById('years').textContent = age.years;
        document.getElementById('months').textContent = age.months;
        document.getElementById('days').textContent = age.days;

        // Update total values
        document.getElementById('totalDays').textContent = totals.totalDays.toLocaleString('ar-EG');
        document.getElementById('totalWeeks').textContent = totals.totalWeeks.toLocaleString('ar-EG');
        document.getElementById('totalMonths').textContent = totals.totalMonths.toLocaleString('ar-EG');

        // Update upcoming events
        const eventsHtml = events.map(event => `
            <li class="mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <span>${event.name}</span>
                    <div>
                        <small class="text-muted">${formatDate(event.date)}</small>
                        <span class="badge bg-success ms-2">${event.daysLeft} يوم</span>
                    </div>
                </div>
            </li>
        `).join('');

        document.getElementById('upcomingEvents').innerHTML = eventsHtml;
        resultDiv.style.display = 'block';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const birthDate = new Date(birthDateInput.value);
        
        if (isNaN(birthDate.getTime())) {
            alert('الرجاء إدخال تاريخ صحيح');
            return;
        }

        if (birthDate > new Date()) {
            alert('تاريخ الميلاد لا يمكن أن يكون في المستقبل');
            return;
        }

        displayResults(birthDate);
    });
});
