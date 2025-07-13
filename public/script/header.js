// header-nav.js

document.addEventListener('DOMContentLoaded', () => {
  // Desktop
  const desktopUserMenu     = document.querySelector('.header-desktop-nav .header-user-menu');
  const desktopDropdown     = desktopUserMenu.querySelector('.header-dropdown');

  // Mobile
  const mobileUserMenu      = document.querySelector('.header-mobile-nav .header-user-menu');
  const mobileDropdownMenu  = mobileUserMenu.querySelector('.header-dropdown');

  const hamburgerBtn        = document.querySelector('.header-mobile-nav .header-hamburger');
  const mobileLinksDropdown = document.querySelector('.header-mobile-nav .header-mobile-dropdown');

  // Toggle Desktop User Menu
  desktopUserMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    desktopDropdown.classList.toggle('header-hidden');
  });

  // Toggle Mobile User Menu
  mobileUserMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileDropdownMenu.classList.toggle('header-hidden');
  });

  // Toggle Hamburger Menu
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileLinksDropdown.classList.toggle('header-hidden');
  });

  // Close all dropdowns when clicking outside
  document.addEventListener('click', () => {
    desktopDropdown.classList.add('header-hidden');
    mobileDropdownMenu.classList.add('header-hidden');
    mobileLinksDropdown.classList.add('header-hidden');
  });
});
