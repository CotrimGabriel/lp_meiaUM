/**
 * FAQ em acordeão.
 * O <details> já é acessível por padrão; o JS apenas garante que só um item
 * fique aberto por vez. Sem JS, o comportamento nativo continua funcionando.
 */

export function initFaq() {
  const accordion = document.querySelector('[data-accordion]');
  if (!accordion) return;

  const items = [...accordion.querySelectorAll('details')];

  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      items.filter((other) => other !== item && other.open).forEach((other) => {
        other.open = false;
      });
    });
  });
}
