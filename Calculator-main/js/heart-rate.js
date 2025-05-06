document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('heartRateForm');
    const resultDiv = document.getElementById('result');

    const intensityRanges = {
        light: { min: 0.5, max: 0.6 },
        moderate: { min: 0.6, max: 0.7 },
        hard: { min: 0.7, max: 0.8 },
        veryhard: { min: 0.8, max: 0.9 },
        maximum: { min: 0.9, max: 1.0 }
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        calculateHeartRate();
    });

    function calculateHeartRate() {
        // Get form values
        const age = parseInt(document.getElementById('age').value);
        const restingHR = parseInt(document.getElementById('restingHR').value);
        const intensity = document.getElementById('intensity').value;

        // Calculate maximum heart rate using Tanaka formula
        const maxHR = 208 - (0.7 * age);

        // Calculate heart rate reserve (HRR)
        const hrReserve = maxHR - restingHR;

        // Calculate target heart rate range using Karvonen formula
        const range = intensityRanges[intensity];
        const targetLow = Math.round(hrReserve * range.min + restingHR);
        const targetHigh = Math.round(hrReserve * range.max + restingHR);

        // Update UI
        document.getElementById('maxHR').textContent = Math.round(maxHR);
        document.getElementById('hrReserve').textContent = Math.round(hrReserve);
        document.getElementById('targetHR').textContent = `${targetLow} - ${targetHigh}`;

        // Show results
        resultDiv.classList.remove('d-none');
    }
});
