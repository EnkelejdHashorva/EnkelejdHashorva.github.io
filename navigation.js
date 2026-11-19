// The full navigation stays available if this script cannot run.
(() => {
  const menu = document.querySelector('.menu-toggle');
  const navigation = menu.closest('nav');
  const narrow = window.matchMedia('(max-width: 760px)');
  function closeMenu() {
    menu.setAttribute('aria-expanded', 'false');
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
  });
  navigation.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
  narrow.addEventListener('change', closeMenu);
  menu.hidden = false;
})();
