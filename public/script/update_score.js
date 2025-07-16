// Form submission with animation
document.querySelector('.match-live-update-form').addEventListener('submit', function (e) {
    const submitBtn = document.querySelector('.match-live-update-submit-btn');
    submitBtn.innerHTML = '🔄 Updating...';
    submitBtn.style.background = 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)';
});

// Add hover effects to sections
document.querySelectorAll('.match-live-update-section').forEach(section => {
    section.addEventListener('mouseenter', function () {
        this.style.borderColor = '#ff6b6b';
    });

    section.addEventListener('mouseleave', function () {
        this.style.borderColor = '#f0f0f0';
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const wicketSelect = document.getElementById("match-live-update-wicket");
    const wicketOptions = document.querySelectorAll(".match-live-update-wicket-option");

    // Hide all wicket options initially
    wicketOptions.forEach(el => el.style.display = "none");

    wicketSelect.addEventListener("change", function () {
        if (this.value === "yes") {
            // Show options if "yes"
            wicketOptions.forEach(el => el.style.display = "block");
        } else {
            // Hide if "no" or default
            wicketOptions.forEach(el => el.style.display = "none");
        }
    });
});
