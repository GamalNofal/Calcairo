document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('unitConverterForm');
    const categorySelect = document.getElementById('category');
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const valueInput = document.getElementById('value');
    const resultDiv = document.getElementById('result');

    // Unit definitions with Arabic names
    const units = {
        length: {
            meter: { name: 'متر', factor: 1 },
            kilometer: { name: 'كيلومتر', factor: 1000 },
            centimeter: { name: 'سنتيمتر', factor: 0.01 },
            millimeter: { name: 'ملليمتر', factor: 0.001 },
            mile: { name: 'ميل', factor: 1609.344 },
            yard: { name: 'ياردة', factor: 0.9144 },
            foot: { name: 'قدم', factor: 0.3048 },
            inch: { name: 'بوصة', factor: 0.0254 }
        },
        weight: {
            kilogram: { name: 'كيلوغرام', factor: 1 },
            gram: { name: 'غرام', factor: 0.001 },
            milligram: { name: 'ملليغرام', factor: 0.000001 },
            pound: { name: 'باوند', factor: 0.45359237 },
            ounce: { name: 'أونصة', factor: 0.028349523125 },
            ton: { name: 'طن', factor: 1000 }
        },
        temperature: {
            celsius: { name: 'درجة مئوية' },
            fahrenheit: { name: 'درجة فهرنهايت' },
            kelvin: { name: 'كلفن' }
        },
        area: {
            squareMeter: { name: 'متر مربع', factor: 1 },
            squareKilometer: { name: 'كيلومتر مربع', factor: 1000000 },
            hectare: { name: 'هكتار', factor: 10000 },
            acre: { name: 'فدان', factor: 4046.8564224 },
            squareFoot: { name: 'قدم مربع', factor: 0.09290304 }
        },
        volume: {
            cubicMeter: { name: 'متر مكعب', factor: 1 },
            liter: { name: 'لتر', factor: 0.001 },
            milliliter: { name: 'ملليلتر', factor: 0.000001 },
            gallon: { name: 'غالون', factor: 0.003785411784 },
            quart: { name: 'ربع غالون', factor: 0.000946352946 }
        },
        speed: {
            meterPerSecond: { name: 'متر/ثانية', factor: 1 },
            kilometerPerHour: { name: 'كم/ساعة', factor: 0.277777778 },
            milePerHour: { name: 'ميل/ساعة', factor: 0.44704 },
            knot: { name: 'عقدة', factor: 0.514444444 }
        },
        time: {
            second: { name: 'ثانية', factor: 1 },
            minute: { name: 'دقيقة', factor: 60 },
            hour: { name: 'ساعة', factor: 3600 },
            day: { name: 'يوم', factor: 86400 },
            week: { name: 'أسبوع', factor: 604800 }
        },
        pressure: {
            pascal: { name: 'باسكال', factor: 1 },
            kilopascal: { name: 'كيلوباسكال', factor: 1000 },
            bar: { name: 'بار', factor: 100000 },
            psi: { name: 'رطل/بوصة²', factor: 6894.757293178 }
        },
        energy: {
            joule: { name: 'جول', factor: 1 },
            kilojoule: { name: 'كيلوجول', factor: 1000 },
            calorie: { name: 'سعرة حرارية', factor: 4.184 },
            kilocalorie: { name: 'كيلو سعرة', factor: 4184 }
        }
    };

    // Populate category options
    categorySelect.addEventListener('change', updateUnitOptions);

    // Initial population of unit options
    updateUnitOptions();

    function updateUnitOptions() {
        const category = categorySelect.value;
        const categoryUnits = units[category];

        // Clear existing options
        fromUnitSelect.innerHTML = '';
        toUnitSelect.innerHTML = '';

        // Add new options
        for (const [key, unit] of Object.entries(categoryUnits)) {
            fromUnitSelect.add(new Option(unit.name, key));
            toUnitSelect.add(new Option(unit.name, key));
        }

        // Select different units by default
        if (toUnitSelect.options.length > 1) {
            toUnitSelect.selectedIndex = 1;
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        convert();
    });

    function convert() {
        const category = categorySelect.value;
        const fromUnit = fromUnitSelect.value;
        const toUnit = toUnitSelect.value;
        const value = parseFloat(valueInput.value);

        let result;
        let formula = '';

        if (category === 'temperature') {
            // Special handling for temperature
            const conversions = {
                celsiusToFahrenheit: (c) => (c * 9/5) + 32,
                celsiusToKelvin: (c) => c + 273.15,
                fahrenheitToCelsius: (f) => (f - 32) * 5/9,
                fahrenheitToKelvin: (f) => (f - 32) * 5/9 + 273.15,
                kelvinToCelsius: (k) => k - 273.15,
                kelvinToFahrenheit: (k) => (k - 273.15) * 9/5 + 32
            };

            if (fromUnit === toUnit) {
                result = value;
                formula = `${value} ${units[category][fromUnit].name}`;
            } else {
                switch(fromUnit + 'To' + toUnit.charAt(0).toUpperCase() + toUnit.slice(1)) {
                    case 'celsiusToFahrenheit':
                        result = conversions.celsiusToFahrenheit(value);
                        formula = `(${value}°C × 9/5) + 32 = ${result}°F`;
                        break;
                    case 'celsiusToKelvin':
                        result = conversions.celsiusToKelvin(value);
                        formula = `${value}°C + 273.15 = ${result}K`;
                        break;
                    case 'fahrenheitToCelsius':
                        result = conversions.fahrenheitToCelsius(value);
                        formula = `(${value}°F - 32) × 5/9 = ${result}°C`;
                        break;
                    case 'fahrenheitToKelvin':
                        result = conversions.fahrenheitToKelvin(value);
                        formula = `(${value}°F - 32) × 5/9 + 273.15 = ${result}K`;
                        break;
                    case 'kelvinToCelsius':
                        result = conversions.kelvinToCelsius(value);
                        formula = `${value}K - 273.15 = ${result}°C`;
                        break;
                    case 'kelvinToFahrenheit':
                        result = conversions.kelvinToFahrenheit(value);
                        formula = `(${value}K - 273.15) × 9/5 + 32 = ${result}°F`;
                        break;
                }
            }
        } else {
            // Standard conversion using factors
            const fromFactor = units[category][fromUnit].factor;
            const toFactor = units[category][toUnit].factor;
            result = (value * fromFactor) / toFactor;
            formula = `${value} × ${fromFactor} ÷ ${toFactor} = ${result}`;
        }

        // Update UI
        document.getElementById('fromValue').textContent = formatNumber(value);
        document.getElementById('toValue').textContent = formatNumber(result);
        document.getElementById('fromUnitText').textContent = units[category][fromUnit].name;
        document.getElementById('toUnitText').textContent = units[category][toUnit].name;
        document.getElementById('formula').textContent = formula;

        // Show results
        resultDiv.classList.remove('d-none');
    }

    function formatNumber(number) {
        // Format number to at most 8 decimal places
        return Number(number.toFixed(8)).toString();
    }
});
