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

document.addEventListener("DOMContentLoaded", function () {
    const strikerSelect = document.getElementById("match-live-update-striker");
    const nonStrikerSelect = document.getElementById("match-live-update-non-striker");

    function updateNonStrikerOptions() {
        const strikerValue = strikerSelect.value;
        [...nonStrikerSelect.options].forEach(option => {
            option.disabled = option.value && option.value === strikerValue;
        });
    }

    function updateStrikerOptions() {
        const nonStrikerValue = nonStrikerSelect.value;
        [...strikerSelect.options].forEach(option => {
            option.disabled = option.value && option.value === nonStrikerValue;
        });
    }

    strikerSelect.addEventListener("change", () => {
        updateNonStrikerOptions();
    });

    nonStrikerSelect.addEventListener("change", () => {
        updateStrikerOptions();
    });

    // Initial setup in case of pre-filled values
    updateStrikerOptions();
    updateNonStrikerOptions();
});

