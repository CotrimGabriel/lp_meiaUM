/**
 * Navegação do cabeçalho.
 * - Alterna o menu mobile mantendo `aria-expanded` e `hidden` sincronizados.
 * - Fecha ao clicar em um link, pressionar Esc ou clicar fora.
 * - Marca a seção visível como item atual da navegação.
 * - Aplica sombra no header quando a página é rolada.
 */

/** Deve acompanhar o breakpoint do menu em layout.css. */
const DESKTOP_BREAKPOINT = '(min-width: 64em)';

/** @param {HTMLElement} header @param {HTMLElement} nav @param {HTMLButtonElement} toggle */
function setupMobileMenu(header, nav, toggle) {
  const desktop = window.matchMedia(DESKTOP_BREAKPOINT);

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.hidden = !open;
  };

  const close = () => setOpen(false);

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || nav.hidden) return;
    close();
    toggle.focus();
  });

  document.addEventListener('click', (event) => {
    if (!nav.hidden && !header.contains(event.target)) close();
  });

  // Ao voltar para desktop, o menu não deve ficar preso em estado aberto.
  desktop.addEventListener('change', (event) => {
    if (event.matches) close();
  });

  close();
}

/** @param {HTMLElement} header */
function setupScrollState(header) {
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

/** @param {HTMLElement} nav */
function setupActiveSection(nav) {
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => {
          links.forEach((link) => {
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.setAttribute('aria-current', 'true');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );

  sections.forEach((section) => observer.observe(section));
}

export function initNavigation() {
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');

  if (!header || !nav || !toggle) return;

  setupMobileMenu(header, nav, toggle);
  setupScrollState(header);
  setupActiveSection(nav);
}
