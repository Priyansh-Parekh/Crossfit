document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.merch-filter-btn');
    const productCards = document.querySelectorAll('.merch-card');
    const noResultsMessage = document.querySelector('.merch-no-results');

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.category;

            // Update active state on buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            let visibleProducts = 0;

            // Show/hide product cards based on category
            productCards.forEach(card => {
                const cardCategory = card.dataset.category;
                const shouldBeVisible = selectedCategory === 'all' || selectedCategory === cardCategory;

                card.style.display = shouldBeVisible ? 'flex' : 'none';

                if (shouldBeVisible) {
                    visibleProducts++;
                }
            });

            // Show a message if no products match the filter
            if (noResultsMessage) {
               noResultsMessage.style.display = visibleProducts === 0 ? 'block' : 'none';
            }
        });
    });
});