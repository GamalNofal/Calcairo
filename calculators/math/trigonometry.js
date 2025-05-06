document.addEventListener('DOMContentLoaded', function() {
    // Basic Functions Elements
    const angle = document.getElementById('angle');
    const angleMode = document.getElementsByName('angleMode');
    const angleUnit = document.querySelector('.angle-unit');
    const sinResult = document.getElementById('sinResult');
    const cosResult = document.getElementById('cosResult');
    const tanResult = document.getElementById('tanResult');

    // Inverse Functions Elements
    const inverseValue = document.getElementById('inverseValue');
    const arcsinResult = document.getElementById('arcsinResult');
    const arccosResult = document.getElementById('arccosResult');
    const arctanResult = document.getElementById('arctanResult');

    // Triangle Solver Elements
    const sideA = document.getElementById('sideA');
    const sideB = document.getElementById('sideB');
    const sideC = document.getElementById('sideC');
    const angleA = document.getElementById('angleA');
    const angleB = document.getElementById('angleB');
    const angleC = document.getElementById('angleC');
    const solveTriangleBtn = document.getElementById('solveTriangle');
    const triangleCanvas = document.getElementById('triangleCanvas');
    const triangleResults = document.getElementById('triangleResults');
    const triangleSolution = document.getElementById('triangleSolution');

    // Unit Circle Elements
    const unitCircle = document.getElementById('unitCircle');
    const unitCircleAngle = document.getElementById('unitCircleAngle');
    const unitCircleAngleValue = document.getElementById('unitCircleAngleValue');
    const unitCircleCos = document.getElementById('unitCircleCos');
    const unitCircleSin = document.getElementById('unitCircleSin');

    // Constants
    const PRECISION = 6;
    const DEG_TO_RAD = Math.PI / 180;
    const RAD_TO_DEG = 180 / Math.PI;

    // Convert between degrees and radians
    function toRadians(degrees) {
        return degrees * DEG_TO_RAD;
    }

    function toDegrees(radians) {
        return radians * RAD_TO_DEG;
    }

    // Get current angle mode
    function isRadians() {
        return document.getElementById('radiansMode').checked;
    }

    // Format number to fixed precision
    function formatNumber(num) {
        return Number(num.toFixed(PRECISION));
    }

    // Basic trigonometric functions
    function updateBasicFunctions() {
        const inputAngle = parseFloat(angle.value);
        if (isNaN(inputAngle)) return;

        const angleInRad = isRadians() ? inputAngle : toRadians(inputAngle);
        
        sinResult.textContent = formatNumber(Math.sin(angleInRad));
        cosResult.textContent = formatNumber(Math.cos(angleInRad));
        tanResult.textContent = formatNumber(Math.tan(angleInRad));
    }

    // Inverse trigonometric functions
    function updateInverseFunctions() {
        const value = parseFloat(inverseValue.value);
        if (isNaN(value)) return;

        let asin = Math.asin(value);
        let acos = Math.acos(value);
        let atan = Math.atan(value);

        if (!isRadians()) {
            asin = toDegrees(asin);
            acos = toDegrees(acos);
            atan = toDegrees(atan);
        }

        arcsinResult.textContent = formatNumber(asin);
        arccosResult.textContent = formatNumber(acos);
        arctanResult.textContent = formatNumber(atan);
    }

    // Triangle solver
    function solveTriangle() {
        const sides = {
            a: parseFloat(sideA.value),
            b: parseFloat(sideB.value),
            c: parseFloat(sideC.value)
        };

        const angles = {
            A: parseFloat(angleA.value),
            B: parseFloat(angleB.value),
            C: parseFloat(angleC.value)
        };

        // Convert angles to radians for calculations
        if (!isRadians()) {
            for (let angle in angles) {
                if (!isNaN(angles[angle])) {
                    angles[angle] = toRadians(angles[angle]);
                }
            }
        }

        // Count known values
        const knownSides = Object.values(sides).filter(v => !isNaN(v)).length;
        const knownAngles = Object.values(angles).filter(v => !isNaN(v)).length;

        let solution = '';

        // SSS case
        if (knownSides === 3) {
            // Calculate angles using law of cosines
            angles.A = Math.acos((sides.b * sides.b + sides.c * sides.c - sides.a * sides.a) / (2 * sides.b * sides.c));
            angles.B = Math.acos((sides.a * sides.a + sides.c * sides.c - sides.b * sides.b) / (2 * sides.a * sides.c));
            angles.C = Math.PI - angles.A - angles.B;
        }
        // SAS case
        else if (knownSides === 2 && knownAngles === 1) {
            // Implementation depends on which values are known
            // This is a simplified version
            if (!isNaN(angles.C) && !isNaN(sides.a) && !isNaN(sides.b)) {
                sides.c = Math.sqrt(sides.a * sides.a + sides.b * sides.b - 2 * sides.a * sides.b * Math.cos(angles.C));
                angles.A = Math.asin(sides.a * Math.sin(angles.C) / sides.c);
                angles.B = Math.PI - angles.A - angles.C;
            }
            // Add other SAS cases as needed
        }
        // ASA or AAS case
        else if (knownAngles === 2 && knownSides >= 1) {
            // Calculate third angle
            const knownAngleSum = (isNaN(angles.A) ? 0 : angles.A) + 
                                (isNaN(angles.B) ? 0 : angles.B) + 
                                (isNaN(angles.C) ? 0 : angles.C);
            if (isNaN(angles.A)) angles.A = Math.PI - knownAngleSum;
            if (isNaN(angles.B)) angles.B = Math.PI - knownAngleSum;
            if (isNaN(angles.C)) angles.C = Math.PI - knownAngleSum;

            // Use law of sines to find remaining sides
            if (!isNaN(sides.a)) {
                sides.b = sides.a * Math.sin(angles.B) / Math.sin(angles.A);
                sides.c = sides.a * Math.sin(angles.C) / Math.sin(angles.A);
            } else if (!isNaN(sides.b)) {
                sides.a = sides.b * Math.sin(angles.A) / Math.sin(angles.B);
                sides.c = sides.b * Math.sin(angles.C) / Math.sin(angles.B);
            } else if (!isNaN(sides.c)) {
                sides.a = sides.c * Math.sin(angles.A) / Math.sin(angles.C);
                sides.b = sides.c * Math.sin(angles.B) / Math.sin(angles.C);
            }
        }

        // Convert angles back to degrees if necessary
        if (!isRadians()) {
            angles.A = toDegrees(angles.A);
            angles.B = toDegrees(angles.B);
            angles.C = toDegrees(angles.C);
        }

        // Format solution
        solution += `<div class="mb-3">
            <strong>الأضلاع:</strong><br>
            a = ${formatNumber(sides.a)}<br>
            b = ${formatNumber(sides.b)}<br>
            c = ${formatNumber(sides.c)}
        </div>
        <div class="mb-3">
            <strong>الزوايا:</strong><br>
            A = ${formatNumber(angles.A)}${isRadians() ? ' rad' : '°'}<br>
            B = ${formatNumber(angles.B)}${isRadians() ? ' rad' : '°'}<br>
            C = ${formatNumber(angles.C)}${isRadians() ? ' rad' : '°'}
        </div>
        <div>
            <strong>المساحة:</strong><br>
            ${formatNumber(0.5 * sides.a * sides.b * Math.sin(isRadians() ? angles.C : toRadians(angles.C)))}
        </div>`;

        triangleSolution.innerHTML = solution;
        triangleResults.style.display = 'block';
        drawTriangle(sides, angles);
    }

    // Draw triangle on canvas
    function drawTriangle(sides, angles) {
        const ctx = triangleCanvas.getContext('2d');
        const width = triangleCanvas.width;
        const height = triangleCanvas.height;
        const padding = 40;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Scale triangle to fit canvas
        const maxSide = Math.max(sides.a, sides.b, sides.c);
        const scale = (Math.min(width, height) - 2 * padding) / maxSide;

        // Calculate vertices
        const ax = padding;
        const ay = height - padding;
        const bx = ax + sides.c * scale;
        const by = ay;
        const cx = ax + sides.a * scale * Math.cos(isRadians() ? angles.C : toRadians(angles.C));
        const cy = ay - sides.a * scale * Math.sin(isRadians() ? angles.C : toRadians(angles.C));

        // Draw triangle
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.lineTo(cx, cy);
        ctx.closePath();
        ctx.strokeStyle = '#0d6efd';
        ctx.stroke();

        // Label vertices
        ctx.font = '16px Cairo';
        ctx.fillStyle = '#000';
        ctx.fillText('A', ax - 20, ay + 20);
        ctx.fillText('B', bx + 10, by + 20);
        ctx.fillText('C', cx, cy - 10);
    }

    // Update unit circle
    function updateUnitCircle() {
        const angle = parseFloat(unitCircleAngle.value);
        const angleRad = toRadians(angle);
        const centerX = 150;
        const centerY = 150;
        const radius = 140;

        // Calculate point position
        const x = centerX + radius * Math.cos(angleRad);
        const y = centerY - radius * Math.sin(angleRad);

        // Update unit circle display
        unitCircle.innerHTML = `
            <!-- Axes -->
            <div class="unit-circle-axis" style="width: 2px; height: 100%; left: 50%; top: 0;"></div>
            <div class="unit-circle-axis" style="width: 100%; height: 2px; left: 0; top: 50%;"></div>
            
            <!-- Angle line -->
            <div class="unit-circle-line" style="width: ${radius}px; height: 2px; left: ${centerX}px; top: ${centerY}px; transform: rotate(${-angle}deg);"></div>
            
            <!-- Point -->
            <div class="unit-circle-marker" style="left: ${x}px; top: ${y}px;"></div>
            
            <!-- Labels -->
            <div class="unit-circle-label" style="right: 10px; top: 50%;">1</div>
            <div class="unit-circle-label" style="left: 10px; top: 50%;">-1</div>
            <div class="unit-circle-label" style="left: 50%; top: 10px;">1</div>
            <div class="unit-circle-label" style="left: 50%; bottom: 10px;">-1</div>
        `;

        // Update values
        unitCircleAngleValue.textContent = `${angle}°`;
        unitCircleCos.textContent = formatNumber(Math.cos(angleRad));
        unitCircleSin.textContent = formatNumber(Math.sin(angleRad));
    }

    // Event Listeners
    angle.addEventListener('input', updateBasicFunctions);
    angleMode.forEach(radio => radio.addEventListener('change', function() {
        angleUnit.textContent = isRadians() ? 'راديان' : 'درجة';
        updateBasicFunctions();
        updateInverseFunctions();
    }));

    inverseValue.addEventListener('input', updateInverseFunctions);
    solveTriangleBtn.addEventListener('click', solveTriangle);
    unitCircleAngle.addEventListener('input', updateUnitCircle);

    // Initialize unit circle
    updateUnitCircle();

    // Set canvas size
    function resizeCanvas() {
        triangleCanvas.width = triangleCanvas.offsetWidth;
        triangleCanvas.height = triangleCanvas.offsetHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
});
