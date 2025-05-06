// Common utility functions and validation for all calculators
export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

// Input validation utilities
export const validators = {
    isNumber: (value) => !isNaN(value) && value !== '',
    isPositive: (value) => Number(value) > 0,
    isInRange: (value, min, max) => Number(value) >= min && Number(value) <= max,
    isInteger: (value) => Number.isInteger(Number(value)),
    isDate: (value) => !isNaN(Date.parse(value)),
    isNonEmpty: (value) => value?.trim().length > 0,
    isEmail: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
};

// Input validation function
export function validateInput(input, min, max) {
    const value = input.value.trim();
    
    if (!value) {
        throw new ValidationError('يرجى ملء هذا الحقل');
    }
    
    const numValue = parseInt(value);
    
    if (isNaN(numValue)) {
        throw new ValidationError('يرجى إدخال رقم صحيح');
    }
    
    if (numValue < min || numValue > max) {
        throw new ValidationError(`يجب أن تكون القيمة بين ${min} و ${max}`);
    }
    
    return numValue;
}

// Form handling utilities
export const formUtils = {
    // Get form data as an object
    getFormData: (form) => {
        const formData = new FormData(form);
        return Object.fromEntries(formData.entries());
    },

    // Validate form inputs based on data attributes
    validateForm: (form) => {
        const errors = [];
        const inputs = form.querySelectorAll('[data-validate]');
        
        inputs.forEach(input => {
            const validations = input.dataset.validate.split(',');
            const value = input.value;
            
            validations.forEach(validation => {
                const [rule, ...params] = validation.trim().split(':');
                if (!validators[rule](value, ...params)) {
                    errors.push({
                        field: input.name,
                        message: input.dataset.errorMsg || `Invalid value for ${input.name}`
                    });
                }
            });
        });
        
        return errors;
    }
};

// Error handling and logging
export const errorHandler = {
    // Log errors to console in development
    logError: (error, context = {}) => {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Error:', {
                message: error.message,
                stack: error.stack,
                context
            });
        }
        // In production, you might want to send this to a logging service
    },

    // Display user-friendly error message
    showError: (message, container) => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger alert-dismissible fade show';
        errorDiv.role = 'alert';
        errorDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        container.prepend(errorDiv);
    }
};

// Common calculator utilities
export const calculatorUtils = {
    // Format number with specified decimal places
    formatNumber: (number, decimals = 2) => {
        return Number(number).toLocaleString('ar-EG', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    // Parse localized number back to float
    parseLocalizedNumber: (str) => {
        return parseFloat(str.replace(/[٬٫]/g, '.').replace(/[^\d.-]/g, ''));
    },

    // Debounce function for input handlers
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Debounce function
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Local storage utilities
export const storageUtils = {
    // Save calculator history
    saveToHistory: (calculatorId, data) => {
        try {
            const history = JSON.parse(localStorage.getItem('calculatorHistory') || '{}');
            history[calculatorId] = history[calculatorId] || [];
            history[calculatorId].unshift({
                timestamp: new Date().toISOString(),
                data
            });
            // Keep only last 10 entries
            history[calculatorId] = history[calculatorId].slice(0, 10);
            localStorage.setItem('calculatorHistory', JSON.stringify(history));
        } catch (error) {
            errorHandler.logError(error, { context: 'saveToHistory' });
        }
    },

    // Get calculator history
    getHistory: (calculatorId) => {
        try {
            const history = JSON.parse(localStorage.getItem('calculatorHistory') || '{}');
            return history[calculatorId] || [];
        } catch (error) {
            errorHandler.logError(error, { context: 'getHistory' });
            return [];
        }
    }
};

// Add to history function
export function addToHistory(key, data) {
    let history = JSON.parse(localStorage.getItem(key) || '[]');
    history.unshift(data);
    if (history.length > 10) {
        history.pop();
    }
    localStorage.setItem(key, JSON.stringify(history));
}
