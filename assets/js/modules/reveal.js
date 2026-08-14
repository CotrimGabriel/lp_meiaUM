/**
 * Animação de entrada dos blocos ao entrar na viewport.
 * Melhoria progressiva: os elementos só ficam ocultos quando a classe `js`
 * está no <html> e o navegador suporta IntersectionObserver.
 */

export function initReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // anima uma única vez
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
  );

  targets.forEach((element) => observer.observe(element));
}
