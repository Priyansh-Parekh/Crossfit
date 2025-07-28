document.addEventListener('DOMContentLoaded', function () {
  const captainSelect = document.getElementById('club-leader-selection-captain');
  const vicecapSelect = document.getElementById('club-leader-selection-vicecap');
  // Wicketkeeper select is not restricted, so omitted here

  if (!captainSelect || !vicecapSelect) return; // safety check

  function updateOptions() {
    const selectedCaptain = captainSelect.value;
    const selectedVicecap = vicecapSelect.value;

    // Update captain options: disable option if selected in vice captain,
    // but never disable the currently selected option in captain.
    Array.from(captainSelect.options).forEach(option => {
      // Always keep empty option enabled
      if (option.value === '') {
        option.disabled = false;
        return;
      }
      // Disable if option value equals vice captain selected value, except if it's currently selected
      option.disabled = (option.value === selectedVicecap) && !option.selected;
    });

    // Update vice captain options: disable option if selected in captain,
    // but never disable the currently selected option in vice captain.
    Array.from(vicecapSelect.options).forEach(option => {
      if (option.value === '') {
        option.disabled = false;
        return;
      }
      option.disabled = (option.value === selectedCaptain) && !option.selected;
    });
  }

  // Initialize on page load
  updateOptions();

  captainSelect.addEventListener('change', updateOptions);
  vicecapSelect.addEventListener('change', updateOptions);
});
