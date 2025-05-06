document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('percentageForm');
    const resultDiv = document.getElementById('result');
    const resultValueSpan = document.getElementById('resultValue');
    const resultDescriptionP = document.getElementById('resultDescription');

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        calculatePercentage();
    });

    // Calculate percentage
    function calculatePercentage() {
        const number = parseFloat(document.getElementById('number').value);
        const percentage = parseFloat(document.getElementById('percentage').value);
        
        // Calculate result
        const result = (number * percentage) / 100;
        
        // Display result
        displayResult(result, number, percentage);
    }

    // Display percentage result
    function displayResult(result, number, percentage) {
        const roundedResult = Math.round(result * 100) / 100;
        resultValueSpan.textContent = roundedResult;
        
        // Create description
        resultDescriptionP.textContent = `${percentage}% من ${number} = ${roundedResult}`;

        // Show result
        resultDiv.classList.remove('d-none');
        
        // Smooth scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Input validation for negative numbers
    const inputs = form.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = Math.abs(this.value);
            }
        });
    });
});
