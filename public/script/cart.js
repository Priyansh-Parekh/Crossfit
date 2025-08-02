document.addEventListener('DOMContentLoaded', () => {

    // --- Helper function to update the main cart total ---
    function updateCartSummary() {
        let newTotal = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const subtotalText = item.querySelector('.cart-item__subtotal').textContent;
            // Remove non-numeric characters and parse as a float
            newTotal += parseFloat(subtotalText.replace(/[^0-9.-]+/g,""));
        });

        const totalElement = document.getElementById('cart-total');
        if (totalElement) {
            totalElement.textContent = `₹${newTotal.toFixed(2)}`;
        }
        
        // If there are no items left, refresh the page to show the "empty cart" message
        if (document.querySelectorAll('.cart-item').length === 0) {
            window.location.reload();
        }
    }

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
            const cartItem = button.closest('.cart-item');
            const quantityElement = cartItem.querySelector('.cart-item__quantity-value');
            const subtotalElement = cartItem.querySelector('.cart-item__subtotal');
            const priceText = cartItem.querySelector('.cart-item__meta:last-of-type').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.-]+/g,""));
            
            let currentQuantity = parseInt(quantityElement.textContent);

            if (currentQuantity > 1) {
                quantityElement.textContent = currentQuantity - 1;
                subtotalElement.textContent = `₹${((currentQuantity - 1) * price).toFixed(2)}`;
                updateCartSummary();
            } else {
                // If quantity is 1, remove the item
                cartItem.style.opacity = '0';
                setTimeout(() => {
                    cartItem.remove();
                    updateCartSummary();
                }, 300);
            }
            
            await fetch(`/cart/decrease/${productId}`, { method: 'POST' });
        });
    });

    // --- INCREASE QUANTITY (From Cart Page) ---
    const increaseButtons = document.querySelectorAll('.increase-btn:not(.listener-attached)');
    increaseButtons.forEach(button => {
        button.classList.add('listener-attached');
        button.addEventListener('click', async () => {
            const productId = button.dataset.id;
            const cartItem = button.closest('.cart-item');
            const quantityElement = cartItem.querySelector('.cart-item__quantity-value');
            const subtotalElement = cartItem.querySelector('.cart-item__subtotal');
            const priceText = cartItem.querySelector('.cart-item__meta:last-of-type').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.-]+/g,""));

            let currentQuantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = currentQuantity + 1;
            subtotalElement.textContent = `₹${((currentQuantity + 1) * price).toFixed(2)}`;
            updateCartSummary();
            
            await fetch(`/cart/add/${productId}`, { method: 'POST' });
        });
    });

    // --- REMOVE ITEM (From Cart Page) ---
    const removeButtons = document.querySelectorAll('.cart-item__remove-btn:not(.listener-attached)');
    removeButtons.forEach(button => {
        button.classList.add('listener-attached');
        button.addEventListener('click', async () => {
            const productId = button.dataset.id;
            const cartItem = button.closest('.cart-item');

            cartItem.style.opacity = '0';
            setTimeout(() => {
                cartItem.remove();
                updateCartSummary();
            }, 300);

            await fetch(`/cart/remove/${productId}`, { method: 'POST' });
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
