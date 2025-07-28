document.addEventListener("DOMContentLoaded", () => {
  const favForm = document.querySelector("#viewers-dashboard-fav-add-form");
  const favBtn = document.querySelectorAll(".viewers-dashboard-fav-add");
  const remForm = document.querySelector("#viewers-dashboard-fav-remove-form");
  const remBtn = document.querySelectorAll(".viewers-dashboard-fav-remove-trigger");

  favBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      favForm.style.display = favForm.style.display === "flex" ? "none" : "flex";
    });
  });

  remBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      remForm.style.display = remForm.style.display === "flex" ? "none" : "flex";
    });
  });
});

// Add this code to your viewer_dashboard.js file

document.addEventListener('DOMContentLoaded', () => {
    // Find the elements for the "Buy Credits" modal
    const buyCreditsBtn = document.getElementById('buy-credits-btn'); 
    const modal = document.getElementById('buy-credits-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    // This 'if' block makes the script safe to run on any page
    if (buyCreditsBtn && modal && closeModalBtn) {
        
        // Show the modal when the "Buy Credits" button is clicked
        buyCreditsBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        // Hide the modal when the 'x' is clicked
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Hide the modal if the user clicks on the dark overlay area
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }

    // ... (your other viewer_dashboard.js logic can go here)
});
