document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('idealWeightForm');
    const resultDiv = document.getElementById('result');

    const frameFactors = {
        small: 0.9,
        medium: 1.0,
        large: 1.1
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        calculateIdealWeight();
    });

    function calculateIdealWeight() {
        // Get form values
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const height = parseInt(document.getElementById('height').value);
        const frame = document.getElementById('frame').value;
        const heightInInches = height / 2.54;
        const frameFactor = frameFactors[frame];

        // Calculate base heights (5 feet = 60 inches)
        const baseHeight = 60;
        const additionalInches = Math.max(0, heightInInches - baseHeight);

        // Calculate ideal weights using different formulas
        let hamwi, devine, robinson, miller;

        if (gender === 'male') {
            hamwi = (106 + (6 * additionalInches)) * frameFactor;
            devine = (110 + (5.06 * additionalInches)) * frameFactor;
            robinson = (107 + (6.1 * additionalInches)) * frameFactor;
            miller = (123 + (3.56 * additionalInches)) * frameFactor;
        } else {
            hamwi = (100 + (5 * additionalInches)) * frameFactor;
            devine = (100 + (4.92 * additionalInches)) * frameFactor;
            robinson = (100 + (5.4 * additionalInches)) * frameFactor;
            miller = (117 + (3.05 * additionalInches)) * frameFactor;
        }

        // Convert pounds to kilograms
        hamwi = poundsToKg(hamwi);
        devine = poundsToKg(devine);
        robinson = poundsToKg(robinson);
        miller = poundsToKg(miller);

        // Calculate range
        const weights = [hamwi, devine, robinson, miller];
        const minWeight = Math.min(...weights);
        const maxWeight = Math.max(...weights);

        // Update UI
        document.getElementById('hamwi').textContent = formatNumber(hamwi);
        document.getElementById('devine').textContent = formatNumber(devine);
        document.getElementById('robinson').textContent = formatNumber(robinson);
        document.getElementById('miller').textContent = formatNumber(miller);
        document.getElementById('range').textContent = `${formatNumber(minWeight)} - ${formatNumber(maxWeight)}`;

        // Show results
        resultDiv.classList.remove('d-none');
    }

    function poundsToKg(pounds) {
        return pounds * 0.453592;
    }

    function formatNumber(number) {
        return Math.round(number * 10) / 10;
    }
});
