import { WHATSAPP_NUMBER } from '@/lib/site'

const messages = {
  saibaMais:
    'Oi, tudo bem? Eu encontrei vocês pelo site e gostaria de saber mais sobre os serviços oferecidos.',
  orcamento:
    'Oi, tudo bem? Eu encontrei vocês pelo site e tenho um projeto. Queria solicitar um orçamento.',
} as const

export type ContactFormData = {
  name: string
  email: string
  message: string
}

export function getWhatsAppUrl(message: string) {
  if (!WHATSAPP_NUMBER) return ''

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function buildContactWhatsAppUrl(data: ContactFormData) {
  const message = [
    `Oi, tudo bem? Meu nome é ${data.name.trim()}.`,
    '',
    `E-mail: ${data.email.trim()}`,
    '',
    data.message.trim(),
  ].join('\n')

  return getWhatsAppUrl(message)
}

export const whatsappSaibaMaisUrl = getWhatsAppUrl(messages.saibaMais)
export const whatsappOrcamentoUrl = getWhatsAppUrl(messages.orcamento)
