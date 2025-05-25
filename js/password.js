document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('passwordForm');
    const resultDiv = document.getElementById('result');
    const lengthSlider = document.getElementById('passwordLength');
    const lengthValue = document.getElementById('lengthValue');
    const copyButton = document.getElementById('copyButton');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const generateButton = document.getElementById('generateButton');
    const customWordsInput = document.getElementById('customWords');

    // Character sets with expanded options
    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        similar: 'il1IoO0',
        ambiguous: '{}[]()/\\\'"`~,;:.<>',
        arabic: 'أبتثجحخدذرزسشصضطظعغفقكلمنهوي'
    };

    // Password patterns for different strength levels
    const patterns = {
        weak: /^[a-zA-Z0-9]{1,7}$/,
        moderate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]).{12,}$/
    };

    // Update length value display with better formatting
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
        updateGenerateButtonState();
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generatePassword();
    });

    // Handle copy button with better feedback
    copyButton.addEventListener('click', async function() {
        const passwordField = document.getElementById('generatedPassword');
        try {
            await navigator.clipboard.writeText(passwordField.value);
            showToast('تم نسخ كلمة المرور بنجاح!', 'success');
            this.innerHTML = '<i class="bi bi-check"></i> تم النسخ';
            setTimeout(() => {
                this.innerHTML = '<i class="bi bi-clipboard"></i> نسخ';
            }, 2000);
        } catch (err) {
            showToast('حدث خطأ أثناء النسخ', 'error');
        }
    });

    // Update generate button state based on selections
    function updateGenerateButtonState() {
        const anySelected = document.getElementById('uppercase').checked ||
                          document.getElementById('lowercase').checked ||
                          document.getElementById('numbers').checked ||
                          document.getElementById('symbols').checked ||
                          document.getElementById('arabic').checked;
        
        generateButton.disabled = !anySelected;
        generateButton.title = anySelected ? '' : 'يرجى اختيار نوع واحد على الأقل من الأحرف';
    }

    // Add event listeners for all checkboxes
    ['uppercase', 'lowercase', 'numbers', 'symbols', 'arabic'].forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', updateGenerateButtonState);
        }
    });

    function generatePassword() {
        // Get options
        const length = parseInt(lengthSlider.value);
        const useUppercase = document.getElementById('uppercase').checked;
        const useLowercase = document.getElementById('lowercase').checked;
        const useNumbers = document.getElementById('numbers').checked;
        const useSymbols = document.getElementById('symbols').checked;
        const useArabic = document.getElementById('arabic').checked;
        const excludeSimilar = document.getElementById('excludeSimilar').checked;
        const excludeAmbiguous = document.getElementById('excludeAmbiguous').checked;
        const customWords = customWordsInput.value.trim();

        // Validate selections
        if (!useUppercase && !useLowercase && !useNumbers && !useSymbols && !useArabic && !customWords) {
            showToast('يرجى اختيار نوع واحد على الأقل من الأحرف', 'warning');
            return;
        }

        // Build character pool
        let chars = '';
        if (useUppercase) chars += charSets.uppercase;
        if (useLowercase) chars += charSets.lowercase;
        if (useNumbers) chars += charSets.numbers;
        if (useSymbols) chars += charSets.symbols;
        if (useArabic) chars += charSets.arabic;

        // Add custom words if provided
        if (customWords) {
            chars += customWords;
        }

        // Remove excluded characters
        if (excludeSimilar) {
            chars = chars.split('').filter(char => !charSets.similar.includes(char)).join('');
        }
        if (excludeAmbiguous) {
            chars = chars.split('').filter(char => !charSets.ambiguous.includes(char)).join('');
        }

        // Generate password with improved entropy
        let password = '';
        const charactersLength = chars.length;
        
        // Use crypto API for better randomness
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        
        // Ensure at least one character from each selected type
        if (useUppercase) password += getSecureRandomChar(charSets.uppercase);
        if (useLowercase) password += getSecureRandomChar(charSets.lowercase);
        if (useNumbers) password += getSecureRandomChar(charSets.numbers);
        if (useSymbols) password += getSecureRandomChar(charSets.symbols);
        if (useArabic) password += getSecureRandomChar(charSets.arabic);

        // Fill the rest with secure random values
        while (password.length < length) {
            const randomIndex = array[password.length] % charactersLength;
            password += chars.charAt(randomIndex);
        }

        // Shuffle the password using Fisher-Yates
        password = fisherYatesShuffle(password.split('')).join('');

        // Update UI
        document.getElementById('generatedPassword').value = password;
        updatePasswordStrength(password);
        resultDiv.classList.remove('d-none');
        
        // Show success message
        showToast('تم توليد كلمة مرور جديدة!', 'success');
    }

    function getSecureRandomChar(charSet) {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return charSet.charAt(array[0] % charSet.length);
    }

    function fisherYatesShuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);
            const j = array[0] % (i + 1);
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function updatePasswordStrength(password) {
        let score = 0;
        const length = password.length;

        // Base score from length
        score += Math.min(length * 4, 40);

        // Variety of characters
        if (/[A-Z]/.test(password)) score += 10;
        if (/[a-z]/.test(password)) score += 10;
        if (/\d/.test(password)) score += 10;
        if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score += 15;
        if (/[أ-ي]/.test(password)) score += 15;

        // Deductions for patterns
        if (/(.)\1{2,}/.test(password)) score -= 10; // Repeated characters
        if (/^[A-Za-z]+$/.test(password)) score -= 10; // Letters only
        if (/^\d+$/.test(password)) score -= 10; // Numbers only

        // Calculate percentage
        const percentage = Math.min(Math.max(score, 0), 100);
        
        // Update UI
        strengthBar.style.width = percentage + '%';
        strengthBar.className = 'progress-bar';
        
        if (percentage < 40) {
            strengthBar.classList.add('bg-danger');
            strengthText.textContent = 'ضعيفة';
            strengthText.className = 'text-danger';
        } else if (percentage < 70) {
            strengthBar.classList.add('bg-warning');
            strengthText.textContent = 'متوسطة';
            strengthText.className = 'text-warning';
        } else {
            strengthBar.classList.add('bg-success');
            strengthText.textContent = 'قوية';
            strengthText.className = 'text-success';
        }
    }

    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    // Initial state update
    updateGenerateButtonState();
});
