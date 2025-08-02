document.addEventListener("DOMContentLoaded", () => {

  // Favorite Teams Add Form Toggle
  const favForm = document.querySelector("#viewers-dashboard-fav-add-form");
  const favBtn = document.querySelector(".viewers-dashboard-fav-add");
  if (favForm && favBtn) {
    favBtn.addEventListener("click", () => {
      favForm.style.display = favForm.style.display === "block" ? "none" : "block";
    });
  }

  // Favorite Teams Remove Form Toggle
  const remForm = document.querySelector("#viewers-dashboard-fav-remove-form");
  const remBtn = document.querySelector(".viewers-dashboard-fav-remove-trigger");
  if (remForm && remBtn) {
    remBtn.addEventListener("click", () => {
      remForm.style.display = remForm.style.display === "block" ? "none" : "block";
    });
  }

});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('buy-credits-modal');
  const openBtn = document.getElementById('buy-credits-btn');
  const closeBtn = modal ? modal.querySelector('.viewers-dashboard-close-modal') : null;

  function openModal() {
    if (!modal) return;
    modal.style.display = 'flex'; // make visible for animation
    // Trigger reflow and add class for animation
    requestAnimationFrame(() => {
      modal.classList.add('show');
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('show');
    modal.addEventListener('transitionend', function handler() {
      if (modal) modal.style.display = 'none';
      modal.removeEventListener('transitionend', handler);
    });
  }

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
    // --- Logic for Razorpay "Buy Credits" Modal ---
    const buyCreditsBtn = document.getElementById('buy-credits-btn');
    const modal = document.getElementById('buy-credits-modal');
    const closeModalBtn = modal ? modal.querySelector('.viewers-dashboard-close-modal') : null;
    const buyCreditsForm = document.getElementById('buy-credits-form');

    if (buyCreditsBtn && modal && closeModalBtn && buyCreditsForm) {
        
        // --- Modal Control ---
        buyCreditsBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
        closeModalBtn.addEventListener('click', () => { modal.style.display = 'none'; });
        window.addEventListener('click', (event) => {
            if (event.target == modal) modal.style.display = 'none';
        });

        // --- Razorpay Payment Flow ---
        buyCreditsForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const amount = document.getElementById('amount').value;
            const razorpayBtn = document.getElementById('razorpay-btn');

            razorpayBtn.disabled = true;
            razorpayBtn.textContent = 'Creating Order...';

            try {
                // 1. Create an order on your backend
                const orderResponse = await fetch('/payment/create_order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: amount })
                });

                if (!orderResponse.ok) throw new Error('Failed to create order.');

                const order = await orderResponse.json();

                // RAZORPAY_KEY_ID=rzp_live_eUiQlEQgnR9Jaz
                // RAZORPAY_KEY_SECRET=PZRIrgQj4vWsxlmMVVtdSZYr
                // 2. Configure and open Razorpay Checkout
                const options = {
                    key: 'rzp_live_eUiQlEQgnR9Jaz', // IMPORTANT: Replace with your Razorpay Test Key ID
                    amount: order.amount,
                    currency: order.currency,
                    name: "Crossfit Credits",
                    description: "Purchase of in-app credits",
                    order_id: order.id,
                    handler: function (response) {
                        // This function creates and submits a hidden form to your verification route
                        const verificationForm = document.createElement('form');
                        verificationForm.method = 'POST';
                        verificationForm.action = '/payment/verify_payment';
                        
                        const fields = {
                            payment_id: response.razorpay_payment_id,
                            order_id: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                            amount: amount
                        };

                        for (const key in fields) {
                            const input = document.createElement('input');
                            input.type = 'hidden';
                            input.name = key;
                            input.value = fields[key];
                            verificationForm.appendChild(input);
                        }
                        
                        document.body.appendChild(verificationForm);
                        verificationForm.submit();
                    },
                    theme: {
                        color: "#FF4C30" // Your orange theme color
                    }
                };

                const rzp1 = new Razorpay(options);
                rzp1.open();
                
                rzp1.on('payment.failed', function (response){
                    alert("Payment failed: " + response.error.description);
                    razorpayBtn.disabled = false;
                    razorpayBtn.textContent = 'Proceed to Pay';
                });

            } catch (error) {
                alert('An error occurred. Please try again.');
                razorpayBtn.disabled = false;
                razorpayBtn.textContent = 'Proceed to Pay';
            }
        });
    }
});
