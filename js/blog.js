document.addEventListener('DOMContentLoaded', function() {
    // Category filtering
    const filterButtons = document.querySelectorAll('.category-filters .btn');
    const blogPosts = document.querySelectorAll('#blogPosts > div');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter posts
            const category = button.dataset.category;
            blogPosts.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = '';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            blogPosts.forEach(post => {
                const title = post.querySelector('.card-title').textContent.toLowerCase();
                const text = post.querySelector('.card-text').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || text.includes(searchTerm)) {
                    post.style.display = '';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }
});
