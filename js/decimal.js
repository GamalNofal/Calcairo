document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('decimalForm');
    const resultDiv = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');
    const inputNumber = document.getElementById('inputNumber');
    const fromSystem = document.getElementById('fromSystem');
    const toSystem = document.getElementById('toSystem');

    // Add input validation based on selected number system
    fromSystem.addEventListener('change', function() {
        updateInputValidation();
    });

    function updateInputValidation() {
        const system = fromSystem.value;
        let pattern = '';
        let placeholder = '';

        switch(system) {
            case 'binary':
                pattern = '^[01]+$';
                placeholder = 'مثال: 1010';
                break;
            case 'decimal':
                pattern = '^[0-9]+$';
                placeholder = 'مثال: 42';
                break;
            case 'octal':
                pattern = '^[0-7]+$';
                placeholder = 'مثال: 52';
                break;
            case 'hexadecimal':
                pattern = '^[0-9A-Fa-f]+$';
                placeholder = 'مثال: 2A';
                break;
        }

        inputNumber.pattern = pattern;
        inputNumber.placeholder = placeholder;
    }

    // Initial validation setup
    updateInputValidation();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        convertNumber();
    });

    copyButton.addEventListener('click', function() {
        const resultNumber = document.getElementById('resultNumber');
        resultNumber.select();
        document.execCommand('copy');
        
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="bi bi-check"></i> تم النسخ';
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });

    function convertNumber() {
        const input = inputNumber.value.trim();
        const from = fromSystem.value;
        const to = toSystem.value;

        // First convert to decimal
        let decimal;
        try {
            decimal = toDecimal(input, from);
        } catch (error) {
            alert('خطأ في تنسيق الرقم المدخل');
            return;
        }

        // Then convert from decimal to target system
        const result = fromDecimal(decimal, to);
        displayResult(result, decimal);
    }

    function toDecimal(number, fromSystem) {
        switch(fromSystem) {
            case 'binary':
                return parseInt(number, 2);
            case 'decimal':
                return parseInt(number, 10);
            case 'octal':
                return parseInt(number, 8);
            case 'hexadecimal':
                return parseInt(number, 16);
            default:
                throw new Error('نظام عددي غير معروف');
        }
    }

    function fromDecimal(decimal, toSystem) {
        switch(toSystem) {
            case 'binary':
                return decimal.toString(2);
            case 'decimal':
                return decimal.toString(10);
            case 'octal':
                return decimal.toString(8);
            case 'hexadecimal':
                return decimal.toString(16).toUpperCase();
            default:
                throw new Error('نظام عددي غير معروف');
        }
    }

    function displayResult(result, decimal) {
        // Display main result
        document.getElementById('resultNumber').value = result;

        // Display all conversions
        document.getElementById('binaryValue').textContent = decimal.toString(2);
        document.getElementById('decimalValue').textContent = decimal.toString(10);
        document.getElementById('octalValue').textContent = decimal.toString(8);
        document.getElementById('hexValue').textContent = decimal.toString(16).toUpperCase();

        // Show results
        resultDiv.classList.remove('d-none');
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // Add input validation
    inputNumber.addEventListener('input', function() {
        const system = fromSystem.value;
        let isValid = true;
        let value = this.value.trim().toUpperCase();

        switch(system) {
            case 'binary':
                isValid = /^[01]*$/.test(value);
                break;
            case 'decimal':
                isValid = /^[0-9]*$/.test(value);
                break;
            case 'octal':
                isValid = /^[0-7]*$/.test(value);
                break;
            case 'hexadecimal':
                isValid = /^[0-9A-F]*$/.test(value);
                break;
        }

        if (!isValid) {
            this.value = this.value.slice(0, -1);
        }
    });
});
