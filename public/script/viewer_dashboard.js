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

  // Buy Credits Modal Logic
  const buyCreditsBtn = document.getElementById('buy-credits-btn');
  const modal = document.getElementById('buy-credits-modal');
  const closeModalBtn = document.querySelector('.close-modal');

  if (buyCreditsBtn && modal && closeModalBtn) {
    // Show the modal when the "Buy Credits" button is clicked
    buyCreditsBtn.addEventListener('click', () => {
      modal.style.display = 'block';
    });

    // Hide the modal when the 'x' is clicked
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Hide the modal if the user clicks outside the modal content (on the overlay)
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

});
