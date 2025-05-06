document.addEventListener('DOMContentLoaded', function() {
    const cardHeaders = document.querySelectorAll('.card-header');
    let activeCard = null;

    // Initialize all dropdowns as collapsed
    cardHeaders.forEach((header, index) => {
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('tabindex', '0');
        const content = header.nextElementSibling;
        if (content) {
            content.style.maxHeight = '0';
            content.style.opacity = '0';
            content.style.transition = 'max-height 0.3s ease-out, opacity 0.2s ease-out';
        }

        // Add click event listener to each header
        header.addEventListener('click', toggleDropdown);
        header.addEventListener('keydown', function(e) {
            switch(e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    toggleDropdown.call(this);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    cardHeaders[Math.min(index + 1, cardHeaders.length - 1)].focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    cardHeaders[Math.max(index - 1, 0)].focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    cardHeaders[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    cardHeaders[cardHeaders.length - 1].focus();
                    break;
            }
        });
    });

    function toggleDropdown() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        const content = this.nextElementSibling;

        // Close previously opened dropdown if exists
        if (activeCard && activeCard !== this) {
            activeCard.setAttribute('aria-expanded', 'false');
            const activeContent = activeCard.nextElementSibling;
            activeContent.style.maxHeight = '0';
            activeContent.style.opacity = '0';
        }

        // Toggle current dropdown
        this.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.opacity = '1';
            activeCard = this;
        } else {
            content.style.maxHeight = "0";
            content.style.opacity = '0';
            activeCard = null;
        }
    }
});
