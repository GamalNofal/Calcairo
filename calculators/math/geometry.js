document.addEventListener('DOMContentLoaded', function() {
    const shapeSelector = document.getElementById('shapeSelector');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultContainer = document.getElementById('result');
    const shapeForms = document.querySelectorAll('.shape-form');
    const shapeTips = document.getElementById('shapeTips');

    // Shape-specific tips
    const tips = {
        triangle: [
            'مساحة المثلث = (القاعدة × الارتفاع) ÷ 2',
            'محيط المثلث = مجموع أطوال الأضلاع الثلاثة',
            'يمكن حساب مساحة المثلث باستخدام صيغة هيرون إذا كانت أطوال الأضلاع معروفة'
        ],
        circle: [
            'مساحة الدائرة = π × نصف القطر²',
            'محيط الدائرة = 2 × π × نصف القطر',
            'π تساوي تقريباً 3.14159'
        ],
        square: [
            'مساحة المربع = طول الضلع²',
            'محيط المربع = 4 × طول الضلع',
            'قطر المربع = طول الضلع × √2'
        ],
        rectangle: [
            'مساحة المستطيل = الطول × العرض',
            'محيط المستطيل = 2 × (الطول + العرض)',
            'قطر المستطيل = √(الطول² + العرض²)'
        ],
        parallelogram: [
            'مساحة متوازي الأضلاع = القاعدة × الارتفاع',
            'محيط متوازي الأضلاع = 2 × (القاعدة + الجانب)',
            'الارتفاع هو المسافة العمودية بين القاعدتين المتوازيتين'
        ],
        trapezoid: [
            'مساحة شبه المنحرف = [(القاعدة الأولى + القاعدة الثانية) × الارتفاع] ÷ 2',
            'محيط شبه المنحرف = القاعدة الأولى + القاعدة الثانية + الجانبين',
            'الارتفاع هو المسافة العمودية بين القاعدتين المتوازيتين'
        ]
    };

    // Show selected shape form and update tips
    shapeSelector.addEventListener('change', function() {
        shapeForms.forEach(form => form.style.display = 'none');
        document.getElementById(this.value + 'Form').style.display = 'block';
        updateTips(this.value);
        resultContainer.style.display = 'none';
    });

    // Update tips based on selected shape
    function updateTips(shape) {
        shapeTips.innerHTML = '';
        tips[shape].forEach(tip => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="bi bi-info-circle text-primary me-2"></i>${tip}`;
            shapeTips.appendChild(li);
        });
    }

    // Calculate button click handler
    calculateBtn.addEventListener('click', function() {
        const shape = shapeSelector.value;
        let area = 0;
        let perimeter = 0;
        let additionalInfo = '';

        switch(shape) {
            case 'triangle':
                const sideA = parseFloat(document.getElementById('triangleSideA').value);
                const sideB = parseFloat(document.getElementById('triangleSideB').value);
                const sideC = parseFloat(document.getElementById('triangleSideC').value);
                const height = parseFloat(document.getElementById('triangleHeight').value);

                if (sideA && sideB && sideC) {
                    // Calculate area using Heron's formula
                    const s = (sideA + sideB + sideC) / 2;
                    area = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
                } else if (sideA && height) {
                    area = (sideA * height) / 2;
                }

                if (sideA && sideB && sideC) {
                    perimeter = sideA + sideB + sideC;
                }

                break;

            case 'circle':
                const radius = parseFloat(document.getElementById('circleRadius').value);
                if (radius) {
                    area = Math.PI * radius * radius;
                    perimeter = 2 * Math.PI * radius;
                    additionalInfo = `
                        <div class="mb-3">
                            <strong>القطر:</strong>
                            <span>${(2 * radius).toFixed(2)}</span>
                        </div>
                    `;
                }
                break;

            case 'square':
                const side = parseFloat(document.getElementById('squareSide').value);
                if (side) {
                    area = side * side;
                    perimeter = 4 * side;
                    additionalInfo = `
                        <div class="mb-3">
                            <strong>القطر:</strong>
                            <span>${(side * Math.sqrt(2)).toFixed(2)}</span>
                        </div>
                    `;
                }
                break;

            case 'rectangle':
                const length = parseFloat(document.getElementById('rectangleLength').value);
                const width = parseFloat(document.getElementById('rectangleWidth').value);
                if (length && width) {
                    area = length * width;
                    perimeter = 2 * (length + width);
                    additionalInfo = `
                        <div class="mb-3">
                            <strong>القطر:</strong>
                            <span>${Math.sqrt(length * length + width * width).toFixed(2)}</span>
                        </div>
                    `;
                }
                break;

            case 'parallelogram':
                const base = parseFloat(document.getElementById('parallelogramBase').value);
                const pHeight = parseFloat(document.getElementById('parallelogramHeight').value);
                const pSide = parseFloat(document.getElementById('parallelogramSide').value);
                if (base && pHeight) {
                    area = base * pHeight;
                }
                if (base && pSide) {
                    perimeter = 2 * (base + pSide);
                }
                break;

            case 'trapezoid':
                const base1 = parseFloat(document.getElementById('trapezoidBase1').value);
                const base2 = parseFloat(document.getElementById('trapezoidBase2').value);
                const tHeight = parseFloat(document.getElementById('trapezoidHeight').value);
                const tSide = parseFloat(document.getElementById('trapezoidSide').value);
                if (base1 && base2 && tHeight) {
                    area = ((base1 + base2) * tHeight) / 2;
                }
                if (base1 && base2 && tSide) {
                    perimeter = base1 + base2 + (2 * tSide);
                }
                break;
        }

        // Display results
        if (area || perimeter) {
            document.getElementById('areaResult').textContent = area.toFixed(2);
            document.getElementById('perimeterResult').textContent = perimeter.toFixed(2);
            document.getElementById('additionalResults').innerHTML = additionalInfo;
            resultContainer.style.display = 'block';
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Initialize tips for default shape
    updateTips(shapeSelector.value);
});
