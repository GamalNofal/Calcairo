document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calorieForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        calculateCalories();
    });

    function calculateCalories() {
        // Get form values
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseInt(document.getElementById('age').value);
        const height = parseInt(document.getElementById('height').value);
        const weight = parseInt(document.getElementById('weight').value);
        const activity = parseFloat(document.getElementById('activity').value);
        const goal = document.getElementById('goal').value;

        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Calculate TDEE (Total Daily Energy Expenditure)
        const tdee = Math.round(bmr * activity);

        // Calculate target calories based on goal
        let targetCalories;
        switch(goal) {
            case 'lose':
                // Aim for 0.5-1kg loss per week (500-1000 calorie deficit)
                targetCalories = Math.round(tdee - 750);
                break;
            case 'gain':
                // Aim for 0.5kg gain per week (500 calorie surplus)
                targetCalories = Math.round(tdee + 500);
                break;
            default: // maintain
                targetCalories = tdee;
        }

        // Update UI
        document.getElementById('bmr').textContent = Math.round(bmr);
        document.getElementById('tdee').textContent = tdee;
        document.getElementById('targetCalories').textContent = targetCalories;

        // Show results
        resultDiv.classList.remove('d-none');
    }
});
