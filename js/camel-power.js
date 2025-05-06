document.addEventListener('DOMContentLoaded', function() {
    const carTypeButtons = document.querySelectorAll('.car-type-btn');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsDiv = document.getElementById('results');
    const camelPowerResult = document.getElementById('camelPowerResult');
    const equivalentCamels = document.getElementById('equivalentCamels');
    const funFactsDiv = document.getElementById('funFacts');

    // Car type selection
    carTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            carTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Fun facts about camels and cars
    const funFacts = [
        "الجمل العربي يمكنه حمل ما يصل إلى 450 كيلوجرام من الأمتعة! ",
        "يمكن للجمل أن يسير لمسافة 40 كيلومتراً في اليوم محملاً بالبضائع ",
        "الجمل العربي يمكنه العيش بدون ماء لمدة تصل إلى أسبوعين ",
        "قوة الجمل تزداد في الظروف الصحراوية بينما تقل قوة المحركات ",
        "الجمل يمكنه تحمل درجات حرارة تصل إلى 50 درجة مئوية! "
    ];

    // Calculate button click handler
    calculateBtn.addEventListener('click', () => {
        const horsepower = parseFloat(document.getElementById('horsepower').value) || 0;
        const selectedType = document.querySelector('.car-type-btn.active');
        const multiplier = parseFloat(selectedType.dataset.multiplier);
        
        // Calculate camel power
        const camelPower = (horsepower * multiplier).toFixed(1);
        
        // Calculate equivalent number of camels (just for fun)
        const numCamels = Math.round(camelPower / 2); // Assuming each camel = 2 camel power

        // Display results with animation
        resultsDiv.style.display = 'block';
        animateNumber(camelPowerResult, camelPower);
        animateNumber(equivalentCamels, numCamels);
        
        // Display random fun facts
        displayFunFacts();

        // Track the calculation
        gtag('event', 'calculate', {
            'event_category': 'Fun Calculators',
            'event_label': 'Camel Power',
            'value': horsepower,
            'car_type': selectedType.dataset.type
        });
    });

    // Display random fun facts
    function displayFunFacts() {
        funFactsDiv.innerHTML = '';
        
        // Randomly select 3 unique facts
        const selectedFacts = [...funFacts]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        
        selectedFacts.forEach(fact => {
            const factDiv = document.createElement('div');
            factDiv.className = 'fun-fact';
            factDiv.innerHTML = `
                <p class="mb-0">
                    <i class="bi bi-lightbulb-fill me-2" style="color: #ffc107;"></i>
                    ${fact}
                </p>
            `;
            funFactsDiv.appendChild(factDiv);
        });
    }

    // Animate number counting up
    function animateNumber(element, final) {
        const duration = 1000;
        const start = 0;
        const increment = final / (duration / 16);
        let current = start;
        
        function updateNumber() {
            current += increment;
            if (current >= final) {
                element.textContent = Number(final).toLocaleString('ar-SA');
            } else {
                element.textContent = Math.round(current).toLocaleString('ar-SA');
                requestAnimationFrame(updateNumber);
            }
        }
        
        updateNumber();
    }
});

// Share functionality
async function shareResult() {
    const horsepower = document.getElementById('horsepower').value;
    const camelPower = document.getElementById('camelPowerResult').textContent;
    const equivalentCamels = document.getElementById('equivalentCamels').textContent;
    const carType = document.querySelector('.car-type-btn.active').textContent.trim();
    
    const shareText = " حولت ${horsepower} حصان من ${carType} إلى ${camelPower} قوة جمل!\n" +
                     "وهو ما يعادل قوة ${equivalentCamels} جمل عربي! \n\n" +
                     "جربها الآن على حاسبة قوة الجمل";
    
    try {
        if (navigator.share) {
            await navigator.share({
                title: 'حاسبة قوة الجمل',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: Copy to clipboard
            await navigator.clipboard.writeText(shareText);
            showToast('تم نسخ النتيجة إلى الحافظة');
        }
    } catch (error) {
        console.error('Error sharing:', error);
    }
}

// Show toast message
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }, 100);
}
