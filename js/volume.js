document.addEventListener('DOMContentLoaded', function() {
    const shapeSelect = document.getElementById('shapeSelect');
    const resultDiv = document.getElementById('result');
    const volumeResult = document.getElementById('volumeResult');
    
    // Get all shape forms
    const forms = {
        cube: document.getElementById('cubeForm'),
        cuboid: document.getElementById('cuboidForm'),
        sphere: document.getElementById('sphereForm'),
        cylinder: document.getElementById('cylinderForm'),
        cone: document.getElementById('coneForm')
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

    // Calculate volume based on shape
    function calculateVolume(shape, values) {
        switch(shape) {
            case 'cube':
                return Math.pow(values.side, 3);
            case 'cuboid':
                return values.length * values.width * values.height;
            case 'sphere':
                return (4/3) * Math.PI * Math.pow(values.radius, 3);
            case 'cylinder':
                return Math.PI * Math.pow(values.radius, 2) * values.height;
            case 'cone':
                return (1/3) * Math.PI * Math.pow(values.radius, 2) * values.height;
            default:
                return 0;
        }
    }

    // Handle shape selection change
    shapeSelect.addEventListener('change', function() {
        showSelectedForm(this.value);
    });

    // Handle cube form submission
    forms.cube.addEventListener('submit', function(e) {
        e.preventDefault();
        const side = parseFloat(document.getElementById('cubeSide').value);
        const volume = calculateVolume('cube', { side });
        volumeResult.textContent = formatNumber(volume);
        resultDiv.classList.remove('d-none');
    });

    // Handle cuboid form submission
    forms.cuboid.addEventListener('submit', function(e) {
        e.preventDefault();
        const length = parseFloat(document.getElementById('cuboidLength').value);
        const width = parseFloat(document.getElementById('cuboidWidth').value);
        const height = parseFloat(document.getElementById('cuboidHeight').value);
        const volume = calculateVolume('cuboid', { length, width, height });
        volumeResult.textContent = formatNumber(volume);
        resultDiv.classList.remove('d-none');
    });

    // Handle sphere form submission
    forms.sphere.addEventListener('submit', function(e) {
        e.preventDefault();
        const radius = parseFloat(document.getElementById('sphereRadius').value);
        const volume = calculateVolume('sphere', { radius });
        volumeResult.textContent = formatNumber(volume);
        resultDiv.classList.remove('d-none');
    });

    // Handle cylinder form submission
    forms.cylinder.addEventListener('submit', function(e) {
        e.preventDefault();
        const radius = parseFloat(document.getElementById('cylinderRadius').value);
        const height = parseFloat(document.getElementById('cylinderHeight').value);
        const volume = calculateVolume('cylinder', { radius, height });
        volumeResult.textContent = formatNumber(volume);
        resultDiv.classList.remove('d-none');
    });

    // Handle cone form submission
    forms.cone.addEventListener('submit', function(e) {
        e.preventDefault();
        const radius = parseFloat(document.getElementById('coneRadius').value);
        const height = parseFloat(document.getElementById('coneHeight').value);
        const volume = calculateVolume('cone', { radius, height });
        volumeResult.textContent = formatNumber(volume);
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
