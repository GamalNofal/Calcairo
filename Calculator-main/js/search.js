document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('#calculator-search input');
    const searchForm = document.querySelector('#calculator-search');
    const calculatorCards = document.querySelectorAll('.calculator-card');
    
    // Prevent form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch();
    });

    // Debounce function to limit how often the search is performed
    function debounce(func, wait) {
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

    // Perform the search with highlighting
    const performSearch = debounce(() => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let hasResults = false;

        calculatorCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const links = Array.from(card.querySelectorAll('.calculator-links a'));
            const cardTexts = links.map(link => link.textContent.toLowerCase());
            
            // Check if the card matches the search
            const matchesSearch = title.includes(searchTerm) || 
                cardTexts.some(text => text.includes(searchTerm));
            
            // Show/hide card with animation
            if (matchesSearch) {
                hasResults = true;
                card.style.display = '';
                highlightMatches(card, searchTerm);
                animateCard(card);
            } else {
                card.style.display = 'none';
            }
        });

        // Show no results message if needed
        updateNoResultsMessage(hasResults);
    }, 300);

    // Add input event listener with debouncing
    searchInput.addEventListener('input', performSearch);

    // Highlight matching text
    function highlightMatches(card, searchTerm) {
        if (!searchTerm) {
            // Reset highlights if search is empty
            card.querySelectorAll('mark').forEach(mark => {
                const text = mark.textContent;
                mark.replaceWith(text);
            });
            return;
        }

        const elements = [
            card.querySelector('h3'),
            ...card.querySelectorAll('.calculator-links a')
        ];

        elements.forEach(element => {
            if (!element) return;
            
            let html = element.textContent;
            // Remove existing highlights
            html = html.replace(/<\/?mark>/g, '');
            
            // Add new highlights
            const regex = new RegExp(searchTerm, 'gi');
            html = html.replace(regex, match => `<mark>${match}</mark>`);
            
            element.innerHTML = html;
        });
    }

    // Animate card appearance
    function animateCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }

    // Update no results message
    function updateNoResultsMessage(hasResults) {
        let noResultsMsg = document.getElementById('no-results-message');
        
        if (!hasResults && searchInput.value.trim()) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-results-message';
                noResultsMsg.className = 'text-center py-4';
                noResultsMsg.innerHTML = '<p class="text-muted">لا توجد نتائج للبحث</p>';
                document.querySelector('#categories .row').appendChild(noResultsMsg);
            }
            noResultsMsg.style.display = 'block';
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
});
