document.addEventListener('DOMContentLoaded', () => {
    // Desktop Nav Elements
    const desktopUserMenu = document.getElementById('header-desktop-user-menu');
    const desktopDropdown = document.getElementById('header-desktop-dropdown');

    // Mobile Nav Elements
    const mobileUserMenu = document.getElementById('header-mobile-user-menu');
    const mobileDropdownMenu = document.getElementById('header-mobile-dropdown');
    const hamburgerBtn = document.getElementById('header-hamburger-btn');
    const mobileLinksDropdown = document.getElementById('header-mobile-links-dropdown');

    // Function to hide all dropdowns
    const hideAllDropdowns = () => {
        desktopDropdown.classList.remove('header-visible');
        mobileDropdownMenu.classList.remove('header-visible');
        mobileLinksDropdown.classList.remove('header-visible');
    };

    // Toggle Desktop User Menu
    if (desktopUserMenu) {
        desktopUserMenu.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click from closing immediately
            hideAllDropdowns(); // Close others
            desktopDropdown.classList.toggle('header-visible');
        });
    }

    // Toggle Mobile User Menu
    if (mobileUserMenu) {
        mobileUserMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            hideAllDropdowns(); // Close others
            mobileDropdownMenu.classList.toggle('header-visible');
        });
    }

    // Toggle Hamburger Menu
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hideAllDropdowns(); // Close others
            mobileLinksDropdown.classList.toggle('header-visible');
        });
    }

    // Close all dropdowns when clicking anywhere on the document (outside a dropdown)
    document.addEventListener('click', (e) => {
        // Check if the click target is inside any dropdown or user menu
        const isClickInsideDropdown = e.target.closest('.header-dropdown') || e.target.closest('.header-user-menu') || e.target.closest('.header-mobile-menu');
        
        if (!isClickInsideDropdown) {
            hideAllDropdowns();
        }
    });

    // Optional: Close dropdowns if the window is resized from mobile to desktop or vice-versa
    let currentWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        if (window.innerWidth !== currentWidth) {
            hideAllDropdowns();
            currentWidth = window.innerWidth;
        }
    });
});