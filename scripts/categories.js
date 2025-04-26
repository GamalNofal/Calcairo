// Categories Page JS - Accessibility, Interactivity, and Responsive Enhancements

document.addEventListener('DOMContentLoaded', () => {
    // Keyboard navigation for cards
    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                card.click();
            }
        });
    });

    // Optional: Animate cards on scroll (simple fade-in)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => {
        observer.observe(card);
    });
});

// CSS for fade-in effect (add this to categories.css):
// .category-card { opacity: 0; transform: translateY(18px); transition: opacity 0.5s, transform 0.5s; }
// .category-card.visible { opacity: 1; transform: none; }
