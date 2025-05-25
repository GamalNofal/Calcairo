document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const form = document.getElementById('dateConverterForm');
    const resultDiv = document.getElementById('result');
    const todayBtn = document.getElementById('useToday');
    const swapBtn = document.getElementById('swapCalendars');
    const dayInput = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const fromCalendarSelect = document.getElementById('fromCalendar');
    const toCalendarSelect = document.getElementById('toCalendar');

    // Calendar month names in Arabic
    const calendarMonths = {
        gregorian: [
            'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
            'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
        ],
        hijri: [
            'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة',
            'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
        ]
    };

    // Initialize month select options
    function updateMonthOptions(calendar) {
        const months = calendarMonths[calendar];
        monthSelect.innerHTML = '';
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index + 1;
            option.textContent = month;
            monthSelect.appendChild(option);
        });
    }

    // Initialize with today's date
    async function setToday() {
        const today = new Date();
        const calendar = fromCalendarSelect.value;
        updateMonthOptions(calendar);

        if (calendar === 'gregorian') {
            dayInput.value = today.getDate();
            monthSelect.value = today.getMonth() + 1;
            yearInput.value = today.getFullYear();
        } else {
            try {
                // Get today's Hijri date
                const apiUrl = 'https://api.aladhan.com/v1/gToH';
                const params = new URLSearchParams({
                    date: `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`,
                    adjustment: 0
                });

                const response = await fetch(`${apiUrl}?${params}`);
                if (!response.ok) {
                    throw new Error('فشل الاتصال بخدمة التحويل');
                }

                const data = await response.json();
                console.log('API Response:', data.data);
                if (data.code === 200 && data.data && data.data.hijri) {
                    const hijriDate = data.data.hijri;
                    dayInput.value = parseInt(hijriDate.day);
                    // Update month options before setting the value
                    updateMonthOptions('hijri');
                    monthSelect.value = parseInt(hijriDate.month.number);
                    yearInput.value = parseInt(hijriDate.year);
                } else {
                    throw new Error('فشل تحويل التاريخ');
                }
            } catch (error) {
                showError(error.message);
                // Fallback to Gregorian
                dayInput.value = today.getDate();
                monthSelect.value = today.getMonth() + 1;
                yearInput.value = today.getFullYear();
            }
        }

        if (this && this.id === 'useToday') {
            convertDate();
        }
    }

    function isValidDate(day, month, year, calendar) {
        if (!day || !month || !year || day < 1 || month < 1 || month > 12 || year < 1) {
            return false;
        }

        if (calendar === 'gregorian') {
            // Check if it's a valid Gregorian date
            const date = new Date(year, month - 1, day);
            return date.getMonth() === month - 1 && date.getDate() === day;
        } else {
            // For Hijri calendar
            // Months alternate between 30 and 29 days
            const maxDays = month % 2 === 1 ? 30 : 29;
            
            // Special case for Dhu al-Hijjah in leap years
            if (month === 12) {
                // Leap years occur in years 2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29 of 30-year cycle
                const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
                const yearInCycle = year % 30;
                if (leapYears.includes(yearInCycle)) {
                    return day <= 30;
                }
            }
            
            return day <= maxDays;
        }
    }

    async function convertDate() {
        try {
            const day = parseInt(dayInput.value);
            const month = parseInt(monthSelect.value);
            const year = parseInt(yearInput.value);
            const fromCalendar = fromCalendarSelect.value;
            const toCalendar = toCalendarSelect.value;

            if (!isValidDate(day, month, year, fromCalendar)) {
                throw new Error('التاريخ المدخل غير صحيح');
            }

            if (fromCalendar === toCalendar) {
                displayResult({
                    original: formatDate(day, month, year, fromCalendar),
                    converted: formatDate(day, month, year, toCalendar),
                    weekday: getWeekdayName(new Date(year, month - 1, day))
                });
                return;
            }

            const endpoint = fromCalendar === 'gregorian' ? 'gToH' : 'hToG';
            const apiUrl = `https://api.aladhan.com/v1/${endpoint}`;
            const params = new URLSearchParams({
                date: `${day}-${month}-${year}`,
                adjustment: 0
            });

            const response = await fetch(`${apiUrl}?${params}`);
            if (!response.ok) {
                throw new Error('فشل الاتصال بخدمة التحويل');
            }

            const data = await response.json();
            console.log('API Response:', data.data);
            if (!data.data) {
                throw new Error('فشل تحويل التاريخ');
            }

            let formattedDate;
            let weekDay;
            if (fromCalendar === 'gregorian') {
                const hijriDate = data.data.hijri;
                formattedDate = `${hijriDate.day} ${hijriDate.month.ar} ${hijriDate.year}`;
                weekDay = hijriDate.weekday.ar;
            } else {
                const gregDate = data.data.gregorian;
                formattedDate = `${gregDate.day} ${calendarMonths.gregorian[parseInt(gregDate.month.number) - 1]} ${gregDate.year}`;
                weekDay = gregDate.weekday.ar;
            }

            console.log('Formatted date:', formattedDate);
            console.log('Weekday:', weekDay);

            const result = {
                original: formatDate(day, month, year, fromCalendar),
                converted: formattedDate,
                weekday: weekDay || ''  // Use empty string if weekDay is undefined
            };

            console.log('Final result:', result);
            displayResult(result);

        } catch (error) {
            showError(error.message || 'حدث خطأ أثناء تحويل التاريخ');
        }
    }

    function displayResult(result) {
        resultDiv.classList.remove('d-none');
        document.getElementById('originalDate').textContent = result.original;
        document.getElementById('convertedDate').textContent = `${result.weekday} ${result.converted}`;
        showSuccess('تم التحويل بنجاح');
    }

    function formatDate(day, month, year, calendar) {
        const monthName = calendar === 'gregorian' ? 
            calendarMonths.gregorian[month - 1] : 
            calendarMonths.hijri[month - 1];
        return `${day} ${monthName} ${year}`;
    }

    function getWeekdayName(date) {
        const weekDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return weekDays[date.getDay()];
    }

    function showError(message) {
        const alertDiv = document.getElementById('alertMessage');
        alertDiv.className = 'alert alert-danger';
        alertDiv.textContent = message;
        alertDiv.style.display = 'block';
        setTimeout(() => alertDiv.style.display = 'none', 3000);
    }

    function showSuccess(message) {
        const alertDiv = document.getElementById('alertMessage');
        alertDiv.className = 'alert alert-success';
        alertDiv.textContent = message;
        alertDiv.style.display = 'block';
        setTimeout(() => alertDiv.style.display = 'none', 3000);
    }

    function updateDayLimit() {
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearInput.value);
        const calendar = fromCalendarSelect.value;
        
        let maxDays;
        if (calendar === 'gregorian') {
            maxDays = new Date(year, month, 0).getDate();
        } else {
            // Hijri months alternate between 29 and 30 days
            maxDays = month % 2 === 0 ? 29 : 30;
        }
        
        dayInput.max = maxDays;
        if (parseInt(dayInput.value) > maxDays) {
            dayInput.value = maxDays;
        }
    }

    // Event Listeners
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (form.checkValidity()) {
            await convertDate();
        }
        form.classList.add('was-validated');
    });

    todayBtn.addEventListener('click', setToday);

    swapBtn.addEventListener('click', function() {
        const tempValue = fromCalendarSelect.value;
        fromCalendarSelect.value = toCalendarSelect.value;
        toCalendarSelect.value = tempValue;
        updateMonthOptions(fromCalendarSelect.value);
        convertDate();
    });

    fromCalendarSelect.addEventListener('change', function() {
        updateMonthOptions(this.value);
    });

    monthSelect.addEventListener('change', updateDayLimit);
    yearInput.addEventListener('change', updateDayLimit);

    // Initialize
    updateMonthOptions(fromCalendarSelect.value);
    setToday();
});
