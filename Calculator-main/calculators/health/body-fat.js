document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const form = document.getElementById('bodyFatForm');
    const resultContainer = document.getElementById('result');
    const femaleOnlyFields = document.querySelectorAll('.female-only');
    const genderInputs = document.getElementsByName('gender');

    // Body fat categories
    const categories = {
        male: {
            essential: { min: 2, max: 5, label: 'دهون ضرورية' },
            athletic: { min: 6, max: 13, label: 'رياضي' },
            fitness: { min: 14, max: 17, label: 'لائق' },
            average: { min: 18, max: 24, label: 'متوسط' },
            obese: { min: 25, max: 100, label: 'سمنة' }
        },
        female: {
            essential: { min: 10, max: 13, label: 'دهون ضرورية' },
            athletic: { min: 14, max: 20, label: 'رياضي' },
            fitness: { min: 21, max: 24, label: 'لائق' },
            average: { min: 25, max: 31, label: 'متوسط' },
            obese: { min: 32, max: 100, label: 'سمنة' }
        }
    };

    // Handle gender change
    genderInputs.forEach(input => {
        input.addEventListener('change', function() {
            femaleOnlyFields.forEach(field => {
                field.style.display = this.value === 'female' ? 'block' : 'none';
            });
            if (this.value === 'female') {
                document.getElementById('hip').required = true;
            } else {
                document.getElementById('hip').required = false;
            }
        });
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateBodyFat();
    });

    function calculateBodyFat() {
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseInt(document.getElementById('age').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseInt(document.getElementById('height').value);
        const neck = parseFloat(document.getElementById('neck').value);
        const waist = parseFloat(document.getElementById('waist').value);
        const hip = gender === 'female' ? parseFloat(document.getElementById('hip').value) : 0;

        let bodyFat;
        if (gender === 'male') {
            bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
            bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        }

        // Ensure body fat is within reasonable limits
        bodyFat = Math.max(2, Math.min(bodyFat, 60));

        displayResults(bodyFat, gender);
    }

    function getCategory(bodyFat, gender) {
        const cats = categories[gender];
        for (let category in cats) {
            if (bodyFat >= cats[category].min && bodyFat <= cats[category].max) {
                return cats[category].label;
            }
        }
        return 'سمنة';
    }

    function displayResults(bodyFat, gender) {
        // Update percentage and category
        document.getElementById('bodyFatPercentage').textContent = bodyFat.toFixed(1);
        document.getElementById('bodyFatCategory').textContent = getCategory(bodyFat, gender);

        // Update progress bars
        const cats = categories[gender];
        document.getElementById('essentialFat').style.width = `${cats.essential.max}%`;
        document.getElementById('athleticFat').style.width = `${cats.athletic.max - cats.athletic.min}%`;
        document.getElementById('fitnessFat').style.width = `${cats.fitness.max - cats.fitness.min}%`;
        document.getElementById('averageFat').style.width = `${cats.average.max - cats.average.min}%`;

        // Update recommendations
        updateRecommendations(bodyFat, gender);

        // Show results
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function updateRecommendations(bodyFat, gender) {
        const recommendationsList = document.getElementById('recommendations');
        recommendationsList.innerHTML = '';

        const cats = categories[gender];
        const recommendations = [];

        // Add category-specific recommendations
        if (bodyFat <= cats.essential.max) {
            recommendations.push(
                'نسبة الدهون لديك منخفضة جداً. يجب زيادة السعرات الحرارية بشكل صحي',
                'استشر أخصائي تغذية لوضع خطة غذائية مناسبة',
                'ركز على تناول البروتين والدهون الصحية'
            );
        } else if (bodyFat <= cats.athletic.max) {
            recommendations.push(
                'نسبة الدهون لديك مثالية للرياضيين',
                'حافظ على نظامك الغذائي والتدريبي الحالي',
                'تأكد من حصولك على قسط كافٍ من الراحة'
            );
        } else if (bodyFat <= cats.fitness.max) {
            recommendations.push(
                'نسبة الدهون لديك صحية ومثالية',
                'حافظ على نمط حياتك النشط',
                'ركز على التمارين المتنوعة للحفاظ على لياقتك'
            );
        } else if (bodyFat <= cats.average.max) {
            recommendations.push(
                'يمكنك تحسين نسبة الدهون من خلال:',
                'زيادة النشاط البدني اليومي',
                'تقليل السعرات الحرارية بشكل معتدل',
                'التركيز على الأطعمة الغنية بالبروتين'
            );
        } else {
            recommendations.push(
                'يُنصح باستشارة أخصائي تغذية لوضع خطة غذائية مناسبة',
                'ابدأ بممارسة تمارين خفيفة مثل المشي',
                'قلل من تناول السكريات والدهون المشبعة',
                'اشرب كمية كافية من الماء يومياً'
            );
        }

        // Add general recommendations
        recommendations.push(
            'احرص على شرب الماء بكميات كافية',
            'نظم ساعات نومك',
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
