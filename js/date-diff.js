document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dateDiffForm');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');
    const includeTimeCheckbox = document.getElementById('includeTime');
    const timeInputs = document.querySelectorAll('.time-inputs');
    const timeResults = document.querySelectorAll('.time-result');
    const resultDiv = document.getElementById('result');

    // Set today's date for the "Today" buttons
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    document.getElementById('setStartToday').addEventListener('click', () => {
        startDateInput.value = todayString;
    });

    document.getElementById('setEndToday').addEventListener('click', () => {
        endDateInput.value = todayString;
    });

    // Toggle time inputs visibility
    includeTimeCheckbox.addEventListener('change', function() {
        timeInputs.forEach(input => {
            input.classList.toggle('d-none');
        });
        timeResults.forEach(result => {
            result.classList.toggle('d-none');
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        calculateDateDifference();
    });

    function calculateDateDifference() {
        let startDate = new Date(startDateInput.value);
        let endDate = new Date(endDateInput.value);

        if (includeTimeCheckbox.checked) {
            const [startHours, startMinutes] = startTimeInput.value.split(':');
            const [endHours, endMinutes] = endTimeInput.value.split(':');
            
            startDate.setHours(parseInt(startHours), parseInt(startMinutes));
            endDate.setHours(parseInt(endHours), parseInt(endMinutes));
        }

        if (startDate > endDate) {
            [startDate, endDate] = [endDate, startDate];
        }

        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffYears = Math.floor(diffDays / 365);
        const remainingDays = diffDays % 365;
        const diffMonths = Math.floor(remainingDays / 30);
        const finalDays = remainingDays % 30;

        let hours = 0;
        let minutes = 0;
        if (includeTimeCheckbox.checked) {
            const totalMinutes = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60));
            hours = Math.floor(totalMinutes / 60);
            minutes = totalMinutes % 60;
        }

        // Update detailed result
        let detailedResult = '';
        if (diffYears > 0) {
            detailedResult += diffYears + ' سنة ';
        }
        if (diffMonths > 0) {
            detailedResult += diffMonths + ' شهر ';
        }
        if (finalDays > 0) {
            detailedResult += finalDays + ' يوم ';
        }
        if (includeTimeCheckbox.checked && (hours > 0 || minutes > 0)) {
            if (hours > 0) {
                detailedResult += hours + ' ساعة ';
            }
            if (minutes > 0) {
                detailedResult += minutes + ' دقيقة';
            }
        }

        // Update single unit results
        document.getElementById('totalYears').textContent = (diffDays / 365).toFixed(2);
        document.getElementById('totalMonths').textContent = (diffDays / 30).toFixed(2);
        document.getElementById('totalDays').textContent = diffDays;
        if (includeTimeCheckbox.checked) {
            document.getElementById('totalHours').textContent = Math.floor(diffTime / (1000 * 60 * 60));
            document.getElementById('totalMinutes').textContent = Math.floor(diffTime / (1000 * 60));
        }

        document.getElementById('detailedResult').textContent = detailedResult || 'نفس التاريخ';
        resultDiv.classList.remove('d-none');
    }
});
