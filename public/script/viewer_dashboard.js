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

