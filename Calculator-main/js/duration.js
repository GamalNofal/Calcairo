document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('durationForm');
    const inputValue = document.getElementById('inputValue');
    const inputUnit = document.getElementById('inputUnit');
    const resultDiv = document.getElementById('result');

    // Conversion rates to seconds
    const conversions = {
        seconds: 1,
        minutes: 60,
        hours: 3600,
        days: 86400,
        weeks: 604800,
        months: 2629800,  // Average month (30.44 days)
        years: 31557600   // Average year (365.25 days)
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        calculateDuration();
    });

    function calculateDuration() {
        // Convert input to seconds first
        const value = parseFloat(inputValue.value);
        const unit = inputUnit.value;
        const totalSeconds = value * conversions[unit];

        // Calculate all units
        const results = {
            years: totalSeconds / conversions.years,
            months: totalSeconds / conversions.months,
            weeks: totalSeconds / conversions.weeks,
            days: totalSeconds / conversions.days,
            hours: totalSeconds / conversions.hours,
            minutes: totalSeconds / conversions.minutes,
            seconds: totalSeconds
        };

        // Update UI
        for (const [unit, value] of Object.entries(results)) {
            document.getElementById(unit).textContent = formatNumber(value);
        }

        resultDiv.classList.remove('d-none');
    }

    function formatNumber(number) {
        // Format number to 2 decimal places if it has decimals
        return number % 1 === 0 ? number.toString() : number.toFixed(2);
    }
});
