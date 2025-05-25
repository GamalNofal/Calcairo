document.addEventListener('DOMContentLoaded', function() {
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const swapUnits = document.getElementById('swapUnits');

    // Conversion rates to kilograms (base unit)
    const conversionRates = {
        'kg': 1, // kilogram (base unit)
        'g': 0.001, // gram
        'mg': 0.000001, // milligram
        't': 1000, // metric ton
        'lb': 0.45359237, // pound
        'oz': 0.028349523125, // ounce
        'st': 6.35029318, // stone
    };

    function convert() {
        if (!fromValue.value) {
            toValue.value = '';
            return;
        }

        const inputValue = parseFloat(fromValue.value);
        const fromRate = conversionRates[fromUnit.value];
        const toRate = conversionRates[toUnit.value];

        // Convert to base unit (kilograms) then to target unit
        const result = (inputValue * fromRate) / toRate;
        
        // Format the result based on the magnitude
        if (Math.abs(result) < 0.01 || Math.abs(result) >= 1000000) {
            toValue.value = result.toExponential(6);
        } else {
            toValue.value = result.toFixed(6).replace(/\.?0+$/, '');
        }
    }

    // Event listeners
    fromValue.addEventListener('input', convert);
    fromUnit.addEventListener('change', convert);
    toUnit.addEventListener('change', convert);

    // Swap units button
    swapUnits.addEventListener('click', function() {
        const tempUnit = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = tempUnit;

        const tempValue = fromValue.value;
        fromValue.value = toValue.value;
        toValue.value = tempValue;

        convert();
    });

    // Initialize the converter
    convert();
});
