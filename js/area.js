document.addEventListener('DOMContentLoaded', function() {
    const shapeSelect = document.getElementById('shapeSelect');
    const resultDiv = document.getElementById('result');
    const areaResult = document.getElementById('areaResult');
    
    // Get all shape forms
    const forms = {
        square: document.getElementById('squareForm'),
        rectangle: document.getElementById('rectangleForm'),
        circle: document.getElementById('circleForm'),
        triangle: document.getElementById('triangleForm'),
        trapezoid: document.getElementById('trapezoidForm')
    };

    // Format number to Arabic locale
    function formatNumber(number) {
        return new Intl.NumberFormat('ar-EG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    }

    // Show selected shape form and hide others
    function showSelectedForm(selectedShape) {
        Object.entries(forms).forEach(([shape, form]) => {
            if (shape === selectedShape) {
                form.classList.remove('d-none');
            } else {
                form.classList.add('d-none');
            }
        });
        resultDiv.classList.add('d-none');
    }

    // Calculate area based on shape
    function calculateArea(shape, values) {
        switch(shape) {
            case 'square':
                return values.side * values.side;
            case 'rectangle':
                return values.length * values.width;
            case 'circle':
                return Math.PI * values.radius * values.radius;
            case 'triangle':
                return 0.5 * values.base * values.height;
            case 'trapezoid':
                return 0.5 * (values.base1 + values.base2) * values.height;
            default:
                return 0;
        }
    }

    // Handle shape selection change
    shapeSelect.addEventListener('change', function() {
        showSelectedForm(this.value);
    });

    // Handle square form submission
    forms.square.addEventListener('submit', function(e) {
        e.preventDefault();
        const side = parseFloat(document.getElementById('squareSide').value);
        const area = calculateArea('square', { side });
        areaResult.textContent = formatNumber(area);
        resultDiv.classList.remove('d-none');
    });

    // Handle rectangle form submission
    forms.rectangle.addEventListener('submit', function(e) {
        e.preventDefault();
        const length = parseFloat(document.getElementById('rectangleLength').value);
        const width = parseFloat(document.getElementById('rectangleWidth').value);
        const area = calculateArea('rectangle', { length, width });
        areaResult.textContent = formatNumber(area);
        resultDiv.classList.remove('d-none');
    });

    // Handle circle form submission
    forms.circle.addEventListener('submit', function(e) {
        e.preventDefault();
        const radius = parseFloat(document.getElementById('circleRadius').value);
        const area = calculateArea('circle', { radius });
        areaResult.textContent = formatNumber(area);
        resultDiv.classList.remove('d-none');
    });

    // Handle triangle form submission
    forms.triangle.addEventListener('submit', function(e) {
        e.preventDefault();
        const base = parseFloat(document.getElementById('triangleBase').value);
        const height = parseFloat(document.getElementById('triangleHeight').value);
        const area = calculateArea('triangle', { base, height });
        areaResult.textContent = formatNumber(area);
        resultDiv.classList.remove('d-none');
    });

    // Handle trapezoid form submission
    forms.trapezoid.addEventListener('submit', function(e) {
        e.preventDefault();
        const base1 = parseFloat(document.getElementById('trapezoidBase1').value);
        const base2 = parseFloat(document.getElementById('trapezoidBase2').value);
        const height = parseFloat(document.getElementById('trapezoidHeight').value);
        const area = calculateArea('trapezoid', { base1, base2, height });
        areaResult.textContent = formatNumber(area);
        resultDiv.classList.remove('d-none');
    });

    // Input validation
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
});
