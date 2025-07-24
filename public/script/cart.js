document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.dataset.id;
            button.disabled = true; // Prevent multiple clicks
            button.textContent = 'Adding...';

            try {
                const response = await fetch(`/cart/add/${productId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });

                const result = await response.json();

                if (response.ok) {
                    alert(result.message); // Simple feedback
                } else {
                    alert(`Error: ${result.message}`);
                    if (response.status === 401) {
                        window.location.href = '/login'; // Redirect to login if not authenticated
                    }
                }
            } catch (error) {
                console.error('Failed to add to cart:', error);
                alert('An error occurred. Please try again.');
            } finally {
                button.disabled = false; // Re-enable button
                button.innerHTML = 'Add to Cart 🛒';
            }
        });
    });
});