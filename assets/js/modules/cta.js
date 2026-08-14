/**
 * Links de CTA para WhatsApp.
 * O HTML já traz um href válido (funciona sem JS); aqui apenas enriquecemos
 * o link com a mensagem específica do contexto declarado em `data-cta`.
 */

import { whatsappUrl } from '../config.js';

export function initCta() {
  document.querySelectorAll('[data-cta]').forEach((link) => {
    link.href = whatsappUrl(link.dataset.cta);
  });
}
