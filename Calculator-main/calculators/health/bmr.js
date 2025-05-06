document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const form = document.getElementById('bmrForm');
    const resultContainer = document.getElementById('result');

    // Macro ratios for different goals
    const macroRatios = {
        lose: {
            protein: 0.40,    // 40% protein
            carbs: 0.35,      // 35% carbs
            fat: 0.25         // 25% fat
        },
        maintain: {
            protein: 0.30,    // 30% protein
            carbs: 0.45,      // 45% carbs
            fat: 0.25         // 25% fat
        },
        gain: {
            protein: 0.30,    // 30% protein
            carbs: 0.50,      // 50% carbs
            fat: 0.20         // 20% fat
        }
    };

    // Calorie adjustments for goals
    const calorieAdjustments = {
        lose: -500,      // Deficit of 500 calories
        maintain: 0,     // No adjustment
        gain: 500        // Surplus of 500 calories
    };

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateBMR();
    });

    function calculateBMR() {
        // Get input values
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseInt(document.getElementById('age').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseInt(document.getElementById('height').value);
        const activityLevel = parseFloat(document.getElementById('activityLevel').value);
        const goal = document.getElementById('goal').value;

        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        // Calculate TDEE (Total Daily Energy Expenditure)
        const tdee = bmr * activityLevel;

        // Calculate goal calories
        const goalCalories = Math.round(tdee + calorieAdjustments[goal]);

        // Calculate macronutrient distribution
        const macros = calculateMacros(goalCalories, goal);

        // Display results
        displayResults(bmr, tdee, goalCalories, macros);
    }

    function calculateMacros(calories, goal) {
        const ratios = macroRatios[goal];
        
        return {
            protein: Math.round((calories * ratios.protein) / 4), // 4 calories per gram of protein
            carbs: Math.round((calories * ratios.carbs) / 4),     // 4 calories per gram of carbs
            fat: Math.round((calories * ratios.fat) / 9)          // 9 calories per gram of fat
        };
    }

    function displayResults(bmr, tdee, goalCalories, macros) {
        // Update basic values
        document.getElementById('bmrValue').textContent = Math.round(bmr);
        document.getElementById('tdeeValue').textContent = Math.round(tdee);
        document.getElementById('goalCalories').textContent = goalCalories;

        // Update macronutrient values
        document.getElementById('proteinGrams').textContent = macros.protein;
        document.getElementById('carbsGrams').textContent = macros.carbs;
        document.getElementById('fatGrams').textContent = macros.fat;

        // Update progress bars
        const totalMacros = macros.protein + macros.carbs + macros.fat;
        document.getElementById('proteinBar').style.width = `${(macros.protein / totalMacros) * 100}%`;
        document.getElementById('carbsBar').style.width = `${(macros.carbs / totalMacros) * 100}%`;
        document.getElementById('fatBar').style.width = `${(macros.fat / totalMacros) * 100}%`;

        // Update recommendations
        updateRecommendations(goalCalories, macros);

        // Show results
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function updateRecommendations(calories, macros) {
        const recommendationsList = document.getElementById('recommendations');
        recommendationsList.innerHTML = '';

        const goal = document.getElementById('goal').value;
        const activityLevel = parseFloat(document.getElementById('activityLevel').value);
        const recommendations = [];

        // Add goal-specific recommendations
        if (goal === 'lose') {
            recommendations.push(
                'قسم وجباتك إلى 5-6 وجبات صغيرة في اليوم',
                'ركز على الأطعمة الغنية بالألياف لتشعر بالشبع لفترة أطول',
                'اشرب الماء قبل الوجبات للمساعدة في تقليل الكميات',
                'تجنب الأطعمة المصنعة والسكريات المضافة'
            );
        } else if (goal === 'gain') {
            recommendations.push(
                'تناول وجبات أكبر وزد عدد الوجبات الخفيفة',
                'ركز على الأطعمة عالية السعرات الصحية مثل المكسرات وزيت الزيتون',
                'اشرب السموثي الغني بالبروتين والفواكه',
                'تناول وجبة قبل النوم غنية بالبروتين'
            );
        } else {
            recommendations.push(
                'حافظ على توازن السعرات المتناولة مع النشاط البدني',
                'تناول وجبات متوازنة تحتوي على جميع العناصر الغذائية',
                'راقب حجم الوجبات للحفاظ على وزنك'
            );
        }

        // Add activity-specific recommendations
        if (activityLevel >= 1.725) {
            recommendations.push(
                'تأكد من تناول كمية كافية من الكربوهيدرات قبل التمرين',
                'تناول البروتين خلال 30 دقيقة بعد التمرين',
                'اهتم بالراحة الكافية للتعافي'
            );
        }

        // Add general nutrition recommendations
        recommendations.push(
            `احرص على تناول ${macros.protein} جرام من البروتين موزعة على الوجبات`,
            'تناول الخضروات والفواكه الطازجة يومياً',
            'اشرب 8-10 أكواب من الماء يومياً',
            'تجنب الوجبات السريعة والمشروبات الغازية'
        );

        // Display recommendations
        recommendations.forEach(recommendation => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="bi bi-check2-circle text-primary me-2"></i>${recommendation}`;
            li.className = 'mb-2';
            recommendationsList.appendChild(li);
        });
    }
});
