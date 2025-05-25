// Size conversion tables
const sizeTables = {
    tops: {
        US: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
        UK: [6, 8, 10, 12, 14, 16, 18],
        EU: [34, 36, 38, 40, 42, 44, 46],
        letter: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
        bust_cm: [82, 87, 92, 97, 102, 107, 112]
    },
    pants: {
        US: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
        UK: [6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
        EU: [32, 34, 36, 38, 40, 42, 44, 46, 48, 50],
        letter: ['XS', 'S', 'S', 'M', 'M', 'L', 'L', 'XL', 'XL', '2XL'],
        waist_cm: [64, 66, 69, 71, 74, 76, 79, 81, 84, 86]
    },
    dresses: {
        US: [0, 2, 4, 6, 8, 10, 12, 14],
        UK: [4, 6, 8, 10, 12, 14, 16, 18],
        EU: [32, 34, 36, 38, 40, 42, 44, 46],
        letter: ['XS', 'S', 'S', 'M', 'M', 'L', 'L', 'XL'],
        bust_cm: [82, 84, 86, 88, 90, 92, 94, 96]
    },
    shoes: {
        US: [5, 6, 7, 8, 9, 10, 11],
        UK: [3, 4, 5, 6, 7, 8, 9],
        EU: [35, 36, 37, 38, 39, 40, 41],
        cm: [22.5, 23, 23.5, 24, 24.5, 25, 25.5]
    }
};

// Find the closest size in the target standard
function findClosestSize(value, array) {
    if (typeof array[0] === 'string') {
        const numericValue = parseFloat(value);
        const index = Math.min(Math.floor(numericValue / 2), array.length - 1);
        return array[index];
    }
    
    return array.reduce((prev, curr) => {
        return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
}

// Convert size between standards
function convertSize(type, fromStandard, size) {
    const table = sizeTables[type];
    let fromIndex;
    
    if (typeof table[fromStandard][0] === 'string') {
        fromIndex = table[fromStandard].indexOf(size.toUpperCase());
        if (fromIndex === -1) {
            // Try to find numeric part if it's like "2XL"
            const numericPart = size.match(/\d+/);
            if (numericPart) {
                fromIndex = table[fromStandard].findIndex(s => s.includes(numericPart[0]));
            }
        }
    } else {
        fromIndex = table[fromStandard].findIndex(s => Math.abs(s - size) < 0.1);
    }
    
    if (fromIndex === -1) {
        fromIndex = findClosestSizeIndex(size, table[fromStandard]);
    }
    
    const results = {};
    for (const standard in table) {
        if (standard !== 'bust_cm' && standard !== 'waist_cm' && standard !== 'cm') {
            results[standard] = table[standard][fromIndex];
        }
    }
    
    // Add measurement in cm if available
    if (table.bust_cm) {
        results['measurement'] = `محيط الصدر: ${table.bust_cm[fromIndex]} سم`;
    } else if (table.waist_cm) {
        results['measurement'] = `محيط الخصر: ${table.waist_cm[fromIndex]} سم`;
    } else if (table.cm) {
        results['measurement'] = `الطول: ${table.cm[fromIndex]} سم`;
    }
    
    return results;
}

function findClosestSizeIndex(value, array) {
    let minDiff = Infinity;
    let closestIndex = 0;
    
    array.forEach((item, index) => {
        const diff = Math.abs(parseFloat(item) - value);
        if (diff < minDiff) {
            minDiff = diff;
            closestIndex = index;
        }
    });
    
    return closestIndex;
}

// Save recent calculations to local storage
function saveRecentCalculation(type, fromStandard, size, results) {
    const recentCalcs = JSON.parse(localStorage.getItem('recentSizeCalcs') || '[]');
    recentCalcs.unshift({
        type,
        fromStandard,
        size,
        results,
        timestamp: new Date().toISOString()
    });
    // Keep only last 5 calculations
    recentCalcs.splice(5);
    localStorage.setItem('recentSizeCalcs', JSON.stringify(recentCalcs));
}

// Validate input size
function validateSize(type, standard, size) {
    const table = sizeTables[type];
    if (!table[standard]) {
        throw new Error('Invalid standard selected');
    }
    
    if (typeof size === 'string' && !table[standard].includes(size.toUpperCase())) {
        throw new Error('Invalid size for selected standard');
    }
    
    if (typeof size === 'number' && !table[standard].includes(size)) {
        throw new Error('Size out of range for selected standard');
    }
    
    return true;
}

// Handle form submission
document.getElementById('sizeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const type = document.getElementById('clothingType').value;
    const fromStandard = document.getElementById('fromStandard').value;
    const size = document.getElementById('size').value;
    const resultDiv = document.getElementById('result');
    
    try {
        // Clear previous errors
        resultDiv.classList.remove('text-danger');
        
        // Validate input
        validateSize(type, fromStandard, size);
        
        // Convert size
        const results = {};
        Object.keys(sizeTables[type]).forEach(standard => {
            if (standard !== fromStandard && standard !== 'bust_cm' && standard !== 'waist_cm' && standard !== 'cm') {
                results[standard] = convertSize(type, fromStandard, size);
            }
        });
        
        // Save to recent calculations
        saveRecentCalculation(type, fromStandard, size, results);
        
        // Display results
        let resultHTML = '<div class="mt-4"><h4>Size Equivalents:</h4><ul class="list-unstyled">';
        Object.entries(results).forEach(([standard, value]) => {
            resultHTML += `<li><strong>${getStandardName(standard)}:</strong> ${value}</li>`;
        });
        resultHTML += '</ul></div>';
        resultHTML += '<button class="btn btn-sm btn-secondary mt-2" onclick="copyResults()">Copy Results</button>';
        
        resultDiv.innerHTML = resultHTML;
    } catch (error) {
        resultDiv.classList.add('text-danger');
        resultDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
});

// Copy results to clipboard
function copyResults() {
    const resultDiv = document.getElementById('result');
    const text = resultDiv.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = resultDiv.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = originalText, 2000);
    });
}

// Display recent calculations if they exist
function displayRecentCalculations() {
    const recentCalcs = JSON.parse(localStorage.getItem('recentSizeCalcs') || '[]');
    const recentDiv = document.getElementById('recentCalculations');
    if (!recentDiv || recentCalcs.length === 0) return;
    
    let html = '<h4 class="mt-4">Recent Calculations:</h4><div class="list-group">';
    recentCalcs.forEach(calc => {
        html += `
            <div class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">${new Date(calc.timestamp).toLocaleDateString()}</small>
                    <span class="badge bg-secondary">${calc.type}</span>
                </div>
                <div class="mt-1">
                    <strong>${getStandardName(calc.fromStandard)}:</strong> ${calc.size}
                </div>
                <div class="mt-1">
                    ${Object.entries(calc.results).map(([std, val]) => 
                        `<span class="me-2"><small>${getStandardName(std)}:</small> ${val}</span>`
                    ).join('')}
                </div>
            </div>
        `;
    });
    html += '</div>';
    recentDiv.innerHTML = html;
}

// Initialize recent calculations display
document.addEventListener('DOMContentLoaded', displayRecentCalculations);

function getStandardName(standard) {
    const names = {
        'US': 'مقاس أمريكي',
        'UK': 'مقاس بريطاني',
        'EU': 'مقاس أوروبي',
        'letter': 'مقاس حرفي',
        'measurement': 'القياس'
    };
    return names[standard] || standard;
}
