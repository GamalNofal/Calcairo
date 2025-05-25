document.addEventListener('DOMContentLoaded', function() {
    const conversionType = document.getElementById('conversionType');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const inputValue = document.getElementById('inputValue');
    const outputValue = document.getElementById('outputValue');
    const swapUnitsBtn = document.getElementById('swapUnits');
    const conversionTips = document.getElementById('conversionTips');
    const commonConversions = document.getElementById('commonConversions');

    // Conversion units and their relationships to base unit
    const units = {
        length: {
            meter: 1,
            kilometer: 1000,
            centimeter: 0.01,
            millimeter: 0.001,
            mile: 1609.344,
            yard: 0.9144,
            foot: 0.3048,
            inch: 0.0254
        },
        area: {
            'متر مربع': 1,
            'كيلومتر مربع': 1000000,
            'سنتيمتر مربع': 0.0001,
            'هكتار': 10000,
            'فدان': 4200,
            'قدم مربع': 0.092903,
            'ياردة مربعة': 0.836127
        },
        volume: {
            'متر مكعب': 1,
            'لتر': 0.001,
            'مليلتر': 0.000001,
            'جالون': 0.003785,
            'قدم مكعب': 0.028317,
            'بوصة مكعبة': 0.000016387
        },
        weight: {
            'كيلوجرام': 1,
            'جرام': 0.001,
            'طن': 1000,
            'رطل': 0.453592,
            'أونصة': 0.0283495
        },
        temperature: {
            'سيليزيوس': 'C',
            'فهرنهايت': 'F',
            'كلفن': 'K'
        }
    };

    // Tips for each conversion type
    const tips = {
        length: [
            '1 متر = 100 سنتيمتر',
            '1 كيلومتر = 1000 متر',
            '1 ميل = 1.60934 كيلومتر'
        ],
        area: [
            '1 متر مربع = 10.764 قدم مربع',
            '1 هكتار = 10000 متر مربع',
            '1 فدان = 4200 متر مربع'
        ],
        volume: [
            '1 لتر = 1000 مليلتر',
            '1 متر مكعب = 1000 لتر',
            '1 جالون = 3.785 لتر'
        ],
        weight: [
            '1 كيلوجرام = 1000 جرام',
            '1 رطل = 0.453592 كيلوجرام',
            '1 طن = 1000 كيلوجرام'
        ],
        temperature: [
            'درجة حرارة تجمد الماء: 0°C = 32°F = 273.15K',
            'درجة حرارة غليان الماء: 100°C = 212°F = 373.15K',
            'الصفر المطلق: -273.15°C = -459.67°F = 0K'
        ]
    };

    // Common conversions for each type
    const common = {
        length: [
            { from: 'kilometer', to: 'mile', value: 1 },
            { from: 'meter', to: 'foot', value: 1 },
            { from: 'centimeter', to: 'inch', value: 1 }
        ],
        area: [
            { from: 'متر مربع', to: 'قدم مربع', value: 1 },
            { from: 'هكتار', to: 'فدان', value: 1 }
        ],
        volume: [
            { from: 'لتر', to: 'جالون', value: 1 },
            { from: 'متر مكعب', to: 'قدم مكعب', value: 1 }
        ],
        weight: [
            { from: 'كيلوجرام', to: 'رطل', value: 1 },
            { from: 'جرام', to: 'أونصة', value: 1 }
        ],
        temperature: [
            { from: 'سيليزيوس', to: 'فهرنهايت', value: 0 },
            { from: 'سيليزيوس', to: 'كلفن', value: 0 }
        ]
    };

    // Initialize units for conversion type
    function initializeUnits(type) {
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';
        
        for (let unit in units[type]) {
            fromUnit.add(new Option(unit, unit));
            toUnit.add(new Option(unit, unit));
        }

        // Set default 'to' unit to something different than 'from' unit
        if (toUnit.options.length > 1) {
            toUnit.selectedIndex = 1;
        }

        updateTips(type);
        updateCommonConversions(type);
    }

    // Update tips for selected conversion type
    function updateTips(type) {
        conversionTips.innerHTML = '';
        tips[type].forEach(tip => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="bi bi-info-circle text-primary me-2"></i>${tip}`;
            conversionTips.appendChild(li);
        });
    }

    // Update common conversions
    function updateCommonConversions(type) {
        commonConversions.innerHTML = '';
        common[type].forEach(conv => {
            const result = convert(conv.value, conv.from, conv.to, type);
            const div = document.createElement('div');
            div.className = 'col-md-6 mb-2';
            div.innerHTML = `
                <div class="common-conversion-item">
                    ${conv.value} ${conv.from} = ${result.toFixed(2)} ${conv.to}
                </div>
            `;
            commonConversions.appendChild(div);
        });
    }

    // Convert between units
    function convert(value, from, to, type) {
        if (type === 'temperature') {
            return convertTemperature(value, from, to);
        }

        const fromBase = units[type][from];
        const toBase = units[type][to];
        return (value * fromBase) / toBase;
    }

    // Special handling for temperature conversion
    function convertTemperature(value, from, to) {
        let celsius;

        // Convert to Celsius first
        switch(from) {
            case 'سيليزيوس':
                celsius = value;
                break;
            case 'فهرنهايت':
                celsius = (value - 32) * 5/9;
                break;
            case 'كلفن':
                celsius = value - 273.15;
                break;
        }

        // Convert from Celsius to target unit
        switch(to) {
            case 'سيليزيوس':
                return celsius;
            case 'فهرنهايت':
                return (celsius * 9/5) + 32;
            case 'كلفن':
                return celsius + 273.15;
        }
    }

    // Event Listeners
    conversionType.addEventListener('change', function() {
        initializeUnits(this.value);
        convert();
    });

    [fromUnit, toUnit, inputValue].forEach(element => {
        element.addEventListener('change', function() {
            if (inputValue.value) {
                const result = convert(
                    parseFloat(inputValue.value),
                    fromUnit.value,
                    toUnit.value,
                    conversionType.value
                );
                outputValue.value = result.toFixed(6);
            }
        });
    });

    inputValue.addEventListener('input', function() {
        if (this.value) {
            const result = convert(
                parseFloat(this.value),
                fromUnit.value,
                toUnit.value,
                conversionType.value
            );
            outputValue.value = result.toFixed(6);
        } else {
            outputValue.value = '';
        }
    });

    swapUnitsBtn.addEventListener('click', function() {
        const tempUnit = fromUnit.value;
        fromUnit.value = toUnit.value;
        toUnit.value = tempUnit;
        
        if (inputValue.value) {
            const result = convert(
                parseFloat(inputValue.value),
                fromUnit.value,
                toUnit.value,
                conversionType.value
            );
            outputValue.value = result.toFixed(6);
        }
    });

    // Initialize with default type
    initializeUnits(conversionType.value);
});
