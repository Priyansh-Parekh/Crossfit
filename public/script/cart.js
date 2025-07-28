document.addEventListener('DOMContentLoaded', () => {

    // --- ADD TO CART (From Merchandise Page) ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn:not(.listener-attached)');
    addToCartButtons.forEach(button => {
        button.classList.add('listener-attached');
        button.addEventListener('click', async (event) => {
            const productId = event.currentTarget.dataset.id;
            button.disabled = true;
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';

            try {
                const response = await fetch(`/cart/add/${productId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });
                const result = await response.json();

                if (response.ok) {
                    button.innerHTML = '<i class="fas fa-check"></i> Added!';
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.disabled = false;
                    }, 2000);
                } else {
                    alert(`Error: ${result.message}`);
                    button.innerHTML = originalText;
                    button.disabled = false;
                    if (response.status === 401 || response.status === 403) {
                        window.location.href = '/login';
                    }
                }
            } catch (error) {
                console.error('Failed to add to cart:', error);
                alert('An error occurred. Please try again.');
                button.innerHTML = originalText;
                button.disabled = false;
            }
        });
    });

    // --- DECREASE QUANTITY (From Cart Page) ---
    const decreaseButtons = document.querySelectorAll('.decrease-btn:not(.listener-attached)');
    decreaseButtons.forEach(button => {
        button.classList.add('listener-attached');
        button.addEventListener('click', async () => {
            const productId = button.dataset.id;
            const response = await fetch(`/cart/decrease/${productId}`, { method: 'POST' });
            if (response.ok) window.location.reload();
        });
    });

    // --- REMOVE ITEM (From Cart Page) ---
    const removeButtons = document.querySelectorAll('.cart-item__remove-btn:not(.listener-attached)');
    removeButtons.forEach(button => {
        button.classList.add('listener-attached');
        button.addEventListener('click', async () => {
            const productId = button.dataset.id;
            const response = await fetch(`/cart/remove/${productId}`, { method: 'POST' });
            if (response.ok) window.location.reload();
        });
    });

    // --- CHECKOUT WITH CREDITS (From Cart Page) ---
    const checkoutButton = document.getElementById('checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', async () => {
            checkoutButton.disabled = true;
            checkoutButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            try {
                const response = await fetch('/cart/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });
                const result = await response.json();

                if (response.ok) {
                    alert(result.message);
                    window.location.href = '/merchandise';
                } else {
                    alert(`Error: ${result.message}`);
                    checkoutButton.disabled = false;
                    checkoutButton.innerHTML = '<i class="fas fa-credit-card"></i> Checkout with Credits';
                }
            } catch (error) {
                console.error('Checkout fetch error:', error);
                alert('A network error occurred. Please try again.');
                checkoutButton.disabled = false;
                checkoutButton.innerHTML = '<i class="fas fa-credit-card"></i> Checkout with Credits';
            }
        });
    }
});
