document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('urlForm');
    const serviceSelect = document.getElementById('service');
    const apiKeySection = document.getElementById('apiKeySection');
    const customOptions = document.getElementById('customOptions');
    const resultDiv = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'spinner-border spinner-border-sm text-success ms-2';
    loadingSpinner.setAttribute('role', 'status');

    // URL validation regex
    const urlRegex = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;

    // Service selection handler with improved UX
    serviceSelect.addEventListener('change', function() {
        apiKeySection.classList.toggle('d-none', this.value !== 'bitly');
        customOptions.classList.toggle('d-none', this.value !== 'custom');
        
        // Dynamic required fields
        const apiKeyInput = document.getElementById('apiKey');
        const customAliasInput = document.getElementById('customAlias');
        
        apiKeyInput.required = this.value === 'bitly';
        customAliasInput.required = this.value === 'custom';
        
        // Reset validation state
        form.classList.remove('was-validated');
    });

    // Form submission handler with improved error handling
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const longUrl = document.getElementById('longUrl').value;
        
        // Validate URL format
        if (!urlRegex.test(longUrl)) {
            showError('يرجى إدخال رابط صحيح يبدأ بـ http:// أو https://');
            return;
        }

        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        try {
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = 'جاري الاختصار... ';
            submitButton.appendChild(loadingSpinner);
            
            const service = serviceSelect.value;
            const apiKey = document.getElementById('apiKey').value;
            const customAlias = document.getElementById('customAlias')?.value;

            let shortUrl;
            
            switch(service) {
                case 'tinyurl':
                    shortUrl = await shortenWithTinyURL(longUrl);
                    break;
                case 'bitly':
                    if (!apiKey) {
                        throw new Error('مفتاح API مطلوب لخدمة Bitly');
                    }
                    shortUrl = await shortenWithBitly(longUrl, apiKey);
                    break;
                case 'custom':
                    shortUrl = createCustomShortUrl(longUrl, customAlias);
                    break;
                default:
                    throw new Error('يرجى اختيار خدمة اختصار صالحة');
            }

            displayResult(shortUrl);
            saveToHistory(longUrl, shortUrl, service);
            
        } catch (error) {
            showError(error.message || 'حدث خطأ أثناء اختصار الرابط');
        } finally {
            // Restore button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });

    // Copy button handler with improved feedback
    copyButton.addEventListener('click', async function() {
        const shortUrlInput = document.getElementById('shortUrl');
        
        try {
            await navigator.clipboard.writeText(shortUrlInput.value);
            showSuccess('تم نسخ الرابط بنجاح!');
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-check"></i> تم النسخ';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        } catch (err) {
            showError('فشل في نسخ الرابط');
        }
    });

    // TinyURL API with timeout and error handling
    async function shortenWithTinyURL(longUrl) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        try {
            const response = await fetch(
                `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`,
                { signal: controller.signal }
            );
            
            if (!response.ok) throw new Error('فشل في الاتصال بخدمة TinyURL');
            return await response.text();
        } finally {
            clearTimeout(timeoutId);
        }
    }

    // Bitly API with improved error handling
    async function shortenWithBitly(longUrl, apiKey) {
        const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ long_url: longUrl })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'فشل في الاتصال بخدمة Bitly');
        }

        return data.link;
    }

    // Custom URL shortener with validation
    function createCustomShortUrl(longUrl, alias) {
        const validAlias = alias.replace(/[^a-zA-Z0-9-_]/g, '');
        if (validAlias !== alias) {
            throw new Error('الاسم المخصص يجب أن يحتوي على أحرف وأرقام وشرطات فقط');
        }
        return `https://short.url/${validAlias || Math.random().toString(36).substr(2, 6)}`;
    }

    // Display result with animation
    function displayResult(shortUrl) {
        const resultDiv = document.getElementById('result');
        const shortUrlInput = document.getElementById('shortUrl');
        const shortUrlLink = document.getElementById('shortUrlLink');
        
        resultDiv.classList.remove('d-none');
        resultDiv.style.opacity = '0';
        
        shortUrlInput.value = shortUrl;
        shortUrlLink.href = shortUrl;
        
        // Animate appearance
        setTimeout(() => {
            resultDiv.style.transition = 'opacity 0.3s ease';
            resultDiv.style.opacity = '1';
        }, 50);
    }

    // Save to history
    function saveToHistory(longUrl, shortUrl, service) {
        const history = JSON.parse(localStorage.getItem('urlHistory') || '[]');
        history.unshift({
            longUrl,
            shortUrl,
            service,
            date: new Date().toISOString()
        });
        
        // Keep only last 10 items
        if (history.length > 10) history.pop();
        
        localStorage.setItem('urlHistory', JSON.stringify(history));
    }

    // Error display
    function showError(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show mt-3';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        form.insertAdjacentElement('beforebegin', alertDiv);
        
        setTimeout(() => alertDiv.remove(), 5000);
    }

    // Success message
    function showSuccess(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        form.insertAdjacentElement('beforebegin', alertDiv);
        
        setTimeout(() => alertDiv.remove(), 3000);
    }
});
