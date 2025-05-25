// Debounce function for performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Calculator data structure
const calculators = {
    math: [
        { name: 'النسبة المئوية', icon: 'percent', url: './calculators/math/percentage.html' },
        { name: 'الكسور', icon: 'slash', url: './calculators/math/fractions.html' },
        { name: 'المساحة', icon: 'square', url: './calculators/math/area.html' },
        { name: 'الحجم', icon: 'box', url: './calculators/math/volume.html' },
        { name: 'الحاسبة العلمية', icon: 'calculator', url: './calculators/math/scientific.html' }
    ],
    time: [
        { name: 'حساب العمر', icon: 'calendar-date', url: './calculators/time/age.html' },
        { name: 'الوقت بين تاريخين', icon: 'calendar-range', url: './calculators/time/date-diff.html' },
        { name: 'مدة الوقت', icon: 'clock', url: './calculators/time/duration.html' }
    ],
    health: [
        { name: 'مؤشر كتلة الجسم', icon: 'person', url: './calculators/health/bmi.html' },
        { name: 'السعرات الحرارية', icon: 'fire', url: './calculators/health/calories.html' },
        { name: 'نسبة الدهون', icon: 'heart-pulse', url: './calculators/health/body-fat.html' },
        { name: 'الوزن المثالي', icon: 'person-check', url: './calculators/health/ideal-weight.html' }
    ],
    conversion: [
        { name: 'الطول', icon: 'rulers', url: './calculators/conversion/length.html' },
        { name: 'الوزن', icon: 'weight', url: './calculators/conversion/weight.html' },
        { name: 'درجات الحرارة', icon: 'thermometer', url: './calculators/conversion/temperature.html' },
        { name: 'العملات', icon: 'currency-exchange', url: './calculators/conversion/currency.html' }
    ],
    financial: [
        { name: 'القروض', icon: 'cash-coin', url: './calculators/financial/loans.html' },
        { name: 'الرهن العقاري', icon: 'house', url: './calculators/financial/mortgage.html' },
        { name: 'التقاعد', icon: 'piggy-bank', url: './calculators/financial/retirement.html' },
        { name: 'المدخرات', icon: 'wallet2', url: './calculators/financial/savings.html' }
    ],
    misc: [
        { name: 'الحب', icon: 'heart', url: './calculators/misc/love.html' },
        { name: 'الأبراج', icon: 'stars', url: './calculators/misc/horoscope.html' },
        { name: 'الرحلات', icon: 'airplane', url: './calculators/misc/travel.html' },
        { name: 'العد العشري', icon: '123', url: './calculators/misc/decimal.html' }
    ]
};

// Search functionality with performance optimization
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchCalculator');
    
    if (searchInput) {
        // Add accessibility attributes
        searchInput.setAttribute('role', 'searchbox');
        searchInput.setAttribute('aria-label', 'البحث عن الآلات الحاسبة');
        
        // Debounced search handler
        const debouncedSearch = debounce(function(e) {
            const searchTerm = e.target.value.trim().toLowerCase();
            const allCalculators = Object.values(calculators).flat();
            const matchedCalculators = allCalculators.filter(calc => 
                calc.name.toLowerCase().includes(searchTerm)
            );
            updateSearchResults(matchedCalculators);
        }, 300);

        searchInput.addEventListener('input', debouncedSearch);
    }
});

// Function to update search results with accessibility
function updateSearchResults(results) {
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.className = 'search-results';
    searchResultsContainer.setAttribute('role', 'region');
    searchResultsContainer.setAttribute('aria-live', 'polite');
    
    if (results.length > 0) {
        const resultsList = document.createElement('ul');
        resultsList.setAttribute('role', 'listbox');
        
        results.forEach(result => {
            const resultItem = document.createElement('li');
            resultItem.setAttribute('role', 'option');
            
            const resultLink = document.createElement('a');
            resultLink.href = result.url;
            resultLink.className = 'search-result-item';
            resultLink.setAttribute('aria-label', result.name);
            
            resultLink.innerHTML = `
                <i class="bi bi-${result.icon}" aria-hidden="true"></i>
                <span>${result.name}</span>
            `;
            
            resultItem.appendChild(resultLink);
            resultsList.appendChild(resultItem);
        });
        
        searchResultsContainer.appendChild(resultsList);
    } else {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.setAttribute('role', 'status');
        noResults.textContent = 'لا توجد نتائج';
        searchResultsContainer.appendChild(noResults);
    }

    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }
    
    const searchContainer = document.querySelector('.search-container');
    searchContainer.appendChild(searchResultsContainer);
}

// Optimized smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            // Check if user prefers reduced motion
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
            
            // Update URL without scrolling
            history.pushState(null, '', `#${targetId}`);
        }
    });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
