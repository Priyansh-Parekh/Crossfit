// Disable already selected players in captain and vice captain dropdowns only

document.addEventListener('DOMContentLoaded', function () {
  const captainSelect = document.getElementById('club-leader-selection-captain');
  const vicecapSelect = document.getElementById('club-leader-selection-vicecap');
  // Wicketkeeper select is not restricted

  function updateOptions() {
    const selectedCaptain = captainSelect.value;
    const selectedVicecap = vicecapSelect.value;

    // Update captain options (disable if selected as vice captain)
    Array.from(captainSelect.options).forEach(option => {
      if (option.value === '' || (option.disabled && option.selected)) return;
      option.disabled = (option.value === selectedVicecap);
    });

    // Update vice captain options (disable if selected as captain)
    Array.from(vicecapSelect.options).forEach(option => {
      if (option.value === '' || (option.disabled && option.selected)) return;
      option.disabled = (option.value === selectedCaptain);
    });
  }

  captainSelect.addEventListener('change', updateOptions);
  vicecapSelect.addEventListener('change', updateOptions);
});
