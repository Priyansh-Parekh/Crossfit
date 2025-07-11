// nav.js

document.addEventListener('DOMContentLoaded', () => {
  // 👉 Desktop
  const desktopUserMenu     = document.querySelector('.desktop-nav .user-menu');
  const desktopDropdown     = desktopUserMenu.querySelector('.dropdown');

  // 👉 Mobile
  const mobileUserMenu      = document.querySelector('.mobile-nav .user-menu');
  const mobileDropdownMenu  = mobileUserMenu.querySelector('.dropdown');

  const hamburgerBtn        = document.querySelector('.mobile-nav .hamburger');
  const mobileLinksDropdown = document.querySelector('.mobile-nav .mobile-dropdown');

  // ✅ Toggle Desktop User Menu
  desktopUserMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    desktopDropdown.classList.toggle('hidden');
  });

  // ✅ Toggle Mobile User Menu
  mobileUserMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileDropdownMenu.classList.toggle('hidden');
  });

  // ✅ Toggle Hamburger Menu
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileLinksDropdown.classList.toggle('hidden');
  });

  // ✅ Close all dropdowns when clicking outside
  document.addEventListener('click', () => {
    desktopDropdown.classList.add('hidden');
    mobileDropdownMenu.classList.add('hidden');
    mobileLinksDropdown.classList.add('hidden');
  });
});
