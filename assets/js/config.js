/**
 * Configuração central do site.
 * Alterar contato ou textos de CTA aqui reflete em toda a página.
 */

export const SITE = {
  /** Número no formato internacional, apenas dígitos (55 + DDD + número). */
  whatsappNumber: '5561999999999',
  email: 'contato@meiaum.com.br',
};

/** Mensagens pré-preenchidas por contexto de CTA. */
export const CTA_MESSAGES = {
  default: 'Olá! Quero falar com um especialista sobre o Habite-se do meu imóvel.',
  hero: 'Olá! Vi o site e quero regularizar meu imóvel no DF.',
  diagnostico: 'Olá! Minha situação não está listada no site. Posso receber um diagnóstico?',
  avaliacao: 'Olá! Quero solicitar a avaliação gratuita do meu imóvel.',
};

/**
 * Monta a URL do WhatsApp com a mensagem do contexto informado.
 * @param {keyof typeof CTA_MESSAGES} [context='default']
 * @returns {string}
 */
export function whatsappUrl(context = 'default') {
  const message = CTA_MESSAGES[context] ?? CTA_MESSAGES.default;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
