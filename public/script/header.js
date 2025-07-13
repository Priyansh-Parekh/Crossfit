// header-nav.js

document.addEventListener('DOMContentLoaded', () => {
  // Desktop
  const desktopUserMenu = document.querySelector('.header-desktop-nav .header-user-menu');
  const desktopDropdown = document.querySelector('.header-desktop-nav .header-dropdown');

  // Mobile
  const mobileUserMenu = document.querySelector('.header-mobile-nav .header-user-menu');
  const mobileDropdownMenu = document.querySelector('.header-mobile-nav .header-dropdown');

  const hamburgerBtn = document.querySelector('.header-mobile-nav .header-hamburger');
  const mobileLinksDropdown = document.querySelector('.header-mobile-nav .header-mobile-dropdown');

  // Toggle Desktop User Menu
  if (desktopUserMenu && desktopDropdown) {
    desktopUserMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      desktopDropdown.classList.toggle('header-hidden');
    });
  }

  // Toggle Mobile User Menu
  if (mobileUserMenu && mobileDropdownMenu) {
    mobileUserMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDropdownMenu.classList.toggle('header-hidden');
    });
  }

  // Toggle Hamburger Menu
  if (hamburgerBtn && mobileLinksDropdown) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileLinksDropdown.classList.toggle('header-hidden');
    });
  }

  // Close all dropdowns when clicking outside
  document.addEventListener('click', () => {
    if (desktopDropdown) desktopDropdown.classList.add('header-hidden');
    if (mobileDropdownMenu) mobileDropdownMenu.classList.add('header-hidden');
    if (mobileLinksDropdown) mobileLinksDropdown.classList.add('header-hidden');
  });
});
