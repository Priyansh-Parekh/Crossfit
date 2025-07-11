function showSection(id, clickedButton) {
    // Hide all current
    document.querySelectorAll(".current").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    // Update button active state
    document.querySelectorAll(".option-menu button").forEach(btn => btn.classList.remove("active"));
    clickedButton.classList.add("active");
}

function goToSection(id) {
  const targetBtn = [...document.querySelectorAll(".option-menu button")]
    .find(btn => btn.textContent.toLowerCase().includes(id.replace('-', ' ')));

  if (targetBtn) targetBtn.click();
}

// Select dashboard by default on load
window.onload = function () {
    const firstButton = document.querySelector(".option-menu button");
    if (firstButton) firstButton.click();
};