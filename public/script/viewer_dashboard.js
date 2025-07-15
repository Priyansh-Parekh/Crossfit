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
