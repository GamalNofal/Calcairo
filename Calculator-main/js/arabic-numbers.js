// Arabic Numbers Converter Class
class ArabicNumberConverter {
    constructor() {
        this.arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        this.persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        this.englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this.history = JSON.parse(localStorage.getItem('numberConversionHistory') || '[]');
        this.maxHistoryItems = 50;
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateHistory();
    }

    initializeElements() {
        this.form = document.getElementById('arabicNumberForm');
        this.englishInput = document.getElementById('arabicNumber');
        this.arabicInput = document.getElementById('hindiNumber');
        this.persianInput = document.getElementById('persianNumber');
        this.historyContainer = document.getElementById('conversionHistory');
    }

    attachEventListeners() {
        // Add input event listeners
        if (this.englishInput) {
            this.englishInput.addEventListener('input', () => this.handleInput('english'));
        }
        if (this.arabicInput) {
            this.arabicInput.addEventListener('input', () => this.handleInput('arabic'));
        }
        if (this.persianInput) {
            this.persianInput.addEventListener('input', () => this.handleInput('persian'));
        }

        // Add copy button listeners
        document.querySelectorAll('.copy-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const type = e.currentTarget.getAttribute('data-copy');
                let textToCopy = '';
                switch(type) {
                    case 'arabic':
                        textToCopy = this.englishInput.value;
                        break;
                    case 'hindi':
                        textToCopy = this.arabicInput.value;
                        break;
                    case 'persian':
                        textToCopy = this.persianInput.value;
                        break;
                }
                this.copyToClipboard(textToCopy, type);
            });
        });
    }

    handleInput(source) {
        let value = '';
        switch(source) {
            case 'english':
                value = this.englishInput.value.trim();
                if (!this.isValidInput(value)) return;
                this.arabicInput.value = this.toArabic(value);
                this.persianInput.value = this.toPersian(value);
                break;
            case 'arabic':
                value = this.arabicInput.value.trim();
                if (!this.isValidInput(value)) return;
                this.englishInput.value = this.toEnglish(value);
                this.persianInput.value = this.toPersian(this.toEnglish(value));
                break;
            case 'persian':
                value = this.persianInput.value.trim();
                if (!this.isValidInput(value)) return;
                this.englishInput.value = this.toEnglish(this.fromPersian(value));
                this.arabicInput.value = this.toArabic(this.toEnglish(this.fromPersian(value)));
                break;
        }

        if (value) {
            this.addToHistory({
                english: this.englishInput.value,
                arabic: this.arabicInput.value,
                persian: this.persianInput.value,
                timestamp: new Date().toISOString()
            });
        }
    }

    isValidInput(value) {
        if (!value) return false;
        const pattern = new RegExp('^[' + 
            this.englishNumbers.join('') + 
            this.arabicNumbers.join('') + 
            this.persianNumbers.join('') + 
            ']+$');
        return pattern.test(value);
    }

    toArabic(number) {
        return number.toString().split('').map(digit => {
            const index = this.englishNumbers.indexOf(digit);
            return index !== -1 ? this.arabicNumbers[index] : digit;
        }).join('');
    }

    toEnglish(number) {
        return number.toString().split('').map(digit => {
            const arabicIndex = this.arabicNumbers.indexOf(digit);
            if (arabicIndex !== -1) return this.englishNumbers[arabicIndex];
            const persianIndex = this.persianNumbers.indexOf(digit);
            return persianIndex !== -1 ? this.englishNumbers[persianIndex] : digit;
        }).join('');
    }

    toPersian(number) {
        return number.toString().split('').map(digit => {
            const index = this.englishNumbers.indexOf(digit);
            return index !== -1 ? this.persianNumbers[index] : digit;
        }).join('');
    }

    fromPersian(number) {
        return number.toString().split('').map(digit => {
            const index = this.persianNumbers.indexOf(digit);
            return index !== -1 ? this.englishNumbers[index] : digit;
        }).join('');
    }

    addToHistory(conversion) {
        this.history.unshift(conversion);
        if (this.history.length > this.maxHistoryItems) {
            this.history.pop();
        }
        localStorage.setItem('numberConversionHistory', JSON.stringify(this.history));
        this.updateHistory();
    }

    updateHistory() {
        if (!this.historyContainer) return;

        if (this.history.length === 0) {
            this.historyContainer.innerHTML = '<div class="text-center text-muted">لا يوجد سجل تحويلات</div>';
            return;
        }

        this.historyContainer.innerHTML = this.history.map(item => `
            <div class="history-item">
                <div class="conversion-details">
                    <div>
                        <span class="badge bg-primary">إنجليزي</span>
                        <span class="ms-2">${item.english}</span>
                    </div>
                    <div>
                        <span class="badge bg-success">عربي</span>
                        <span class="ms-2">${item.arabic}</span>
                    </div>
                    <div>
                        <span class="badge bg-info">فارسي</span>
                        <span class="ms-2">${item.persian}</span>
                    </div>
                </div>
                <small class="text-muted d-block mt-2">
                    ${new Date(item.timestamp).toLocaleString('ar-EG')}
                </small>
            </div>
        `).join('');
    }

    async copyToClipboard(text, type) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('تم نسخ ' + this.getTypeLabel(type) + ' بنجاح!', 'success');
        } catch (err) {
            this.showToast('حدث خطأ أثناء النسخ', 'error');
            console.error('Failed to copy:', err);
        }
    }

    getTypeLabel(type) {
        switch(type) {
            case 'arabic': return 'الأرقام الإنجليزية';
            case 'hindi': return 'الأرقام العربية';
            case 'persian': return 'الأرقام الفارسية';
            default: return '';
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} show`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    clearHistory() {
        this.history = [];
        localStorage.removeItem('numberConversionHistory');
        this.updateHistory();
        this.showToast('تم مسح السجل بنجاح', 'success');
    }
}

// Initialize the converter when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.converter = new ArabicNumberConverter();
});
