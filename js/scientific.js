document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let memory = 0;
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let shouldResetDisplay = false;

    // Format number to Arabic locale
    function formatNumber(number) {
        return new Intl.NumberFormat('ar-EG', {
            maximumFractionDigits: 10
        }).format(number);
    }

    // Update display
    function updateDisplay(value = currentInput) {
        display.value = value;
    }

    // Clear calculator
    function clear() {
        currentInput = '';
        previousInput = '';
        operation = null;
        updateDisplay('0');
    }

    // Handle number input
    function inputNumber(number) {
        if (shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else {
            currentInput = currentInput === '0' ? number : currentInput + number;
        }
        updateDisplay();
    }

    // Handle decimal point
    function inputDecimal() {
        if (shouldResetDisplay) {
            currentInput = '0.';
            shouldResetDisplay = false;
        } else if (!currentInput.includes('.')) {
            currentInput = currentInput === '' ? '0.' : currentInput + '.';
        }
        updateDisplay();
    }

    // Handle basic operations
    function handleOperation(op) {
        const current = parseFloat(currentInput);
        
        if (isNaN(current)) return;

        if (operation !== null) {
            calculate();
        }

        previousInput = current;
        operation = op;
        shouldResetDisplay = true;
    }

    // Calculate result
    function calculate() {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        let result;
        switch (operation) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operation = null;
        previousInput = '';
        shouldResetDisplay = true;
        updateDisplay(formatNumber(result));
    }

    // Handle scientific functions
    function handleScientific(action) {
        const current = parseFloat(currentInput);
        if (isNaN(current)) return;

        let result;
        switch (action) {
            case 'sin':
                result = Math.sin(current * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(current * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(current * Math.PI / 180);
                break;
            case 'log':
                result = Math.log10(current);
                break;
            case 'ln':
                result = Math.log(current);
                break;
            case 'sqrt':
                result = Math.sqrt(current);
                break;
            case 'power':
                result = Math.pow(current, 2);
                break;
            case 'exp':
                result = Math.exp(current);
                break;
            case 'pi':
                result = Math.PI;
                break;
            case 'e':
                result = Math.E;
                break;
            case 'reciprocal':
                result = 1 / current;
                break;
            case 'percent':
                result = current / 100;
                break;
            case 'negate':
                result = -current;
                break;
        }

        if (!isNaN(result) && isFinite(result)) {
            currentInput = result.toString();
            updateDisplay(formatNumber(result));
            shouldResetDisplay = true;
        } else {
            updateDisplay('Error');
            shouldResetDisplay = true;
        }
    }

    // Handle memory operations
    function handleMemory(action) {
        const current = parseFloat(currentInput);
        
        switch (action) {
            case 'memory-clear':
                memory = 0;
                break;
            case 'memory-recall':
                currentInput = memory.toString();
                updateDisplay(formatNumber(memory));
                shouldResetDisplay = true;
                break;
            case 'memory-add':
                if (!isNaN(current)) {
                    memory += current;
                }
                shouldResetDisplay = true;
                break;
            case 'memory-subtract':
                if (!isNaN(current)) {
                    memory -= current;
                }
                shouldResetDisplay = true;
                break;
        }
    }

    // Handle backspace
    function handleBackspace() {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '') {
                currentInput = '0';
            }
            updateDisplay();
        }
    }

    // Event listeners for buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const number = button.getAttribute('data-number');
            const action = button.getAttribute('data-action');

            if (number) {
                inputNumber(number);
            } else if (action) {
                switch (action) {
                    case 'clear':
                        clear();
                        break;
                    case 'decimal':
                        inputDecimal();
                        break;
                    case 'equals':
                        calculate();
                        break;
                    case 'backspace':
                        handleBackspace();
                        break;
                    case 'add':
                    case 'subtract':
                    case 'multiply':
                    case 'divide':
                        handleOperation(action);
                        break;
                    case 'memory-clear':
                    case 'memory-recall':
                    case 'memory-add':
                    case 'memory-subtract':
                        handleMemory(action);
                        break;
                    default:
                        handleScientific(action);
                }
            }
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        
        if (/[0-9]/.test(key)) {
            inputNumber(key);
        } else {
            switch (key) {
                case '.':
                    inputDecimal();
                    break;
                case '+':
                    handleOperation('add');
                    break;
                case '-':
                    handleOperation('subtract');
                    break;
                case '*':
                    handleOperation('multiply');
                    break;
                case '/':
                    handleOperation('divide');
                    break;
                case 'Enter':
                    calculate();
                    break;
                case 'Backspace':
                    handleBackspace();
                    break;
                case 'Escape':
                    clear();
                    break;
            }
        }
    });

    // Initialize display
    clear();
});
