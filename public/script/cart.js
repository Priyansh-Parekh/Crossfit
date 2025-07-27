document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons that DO NOT have the 'listener-attached' class yet.
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn:not(.listener-attached)');

    addToCartButtons.forEach(button => {
        // Immediately add the class to prevent other scripts from re-attaching a listener.
        button.classList.add('listener-attached');

        button.addEventListener('click', async (event) => {
            // Prevent the form or link from submitting if it's inside one
            event.preventDefault(); 
            
            const productId = event.currentTarget.dataset.id;
            
            // Disable the button to prevent rapid-fire clicks while processing
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
                    // Provide visual feedback on success
                    button.innerHTML = '<i class="fas fa-check"></i> Added!';
                    // Optional: Revert text after a delay
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
});
