document.addEventListener("DOMContentLoaded", function () {
    const selects = document.querySelectorAll(".match-setup-form select");

    // Function to update option availability
    function updateOptions() {
        const selectedValues = Array.from(selects)
            .map(select => select.value)
            .filter(value => value !== "--select--" && value !== "");

        selects.forEach(select => {
            const currentValue = select.value;

            Array.from(select.options).forEach(option => {
                if (option.disabled && option.value !== "--select--") {
                    option.disabled = false; // Reset everything first
                }

                // Disable if the option is selected in another dropdown
                if (
                    selectedValues.includes(option.value) &&
                    option.value !== currentValue
                ) {
                    option.disabled = true;
                }
            });
        });
    }

    // Attach listener to every select
    selects.forEach(select => {
        select.addEventListener("change", updateOptions);
    });

    // Initial call to set the disabled options
    updateOptions();
});