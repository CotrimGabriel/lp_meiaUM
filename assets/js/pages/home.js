/**
 * Ponto de entrada da página Home.
 * Cada página tem seu próprio arquivo, importando apenas os módulos que usa.
 */

import { initNavigation } from '../modules/navigation.js';
import { initFaq } from '../modules/faq.js';
import { initReveal } from '../modules/reveal.js';
import { initCta } from '../modules/cta.js';

function init() {
  initNavigation();
  initFaq();
  initReveal();
  initCta();

  // Ano do rodapé sempre atualizado.
  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = String(new Date().getFullYear());
}

// Módulos são adiados por padrão, mas isto cobre execuções fora de ordem.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
