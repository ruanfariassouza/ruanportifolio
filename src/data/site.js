export const CONTACT_EMAIL = (import.meta.env.VITE_CONTACT_EMAIL || '').trim()
export const WHATSAPP_URL = (import.meta.env.VITE_WHATSAPP_URL || '').trim()
export const LINKEDIN_URL = (import.meta.env.VITE_LINKEDIN_URL || '').trim()
export const INSTAGRAM_URL = (import.meta.env.VITE_INSTAGRAM_URL || '').trim()

export const contactChannels = [
  CONTACT_EMAIL && { label: 'E-mail', href: `mailto:${CONTACT_EMAIL}` },
  WHATSAPP_URL && { label: 'WhatsApp', href: WHATSAPP_URL },
  LINKEDIN_URL && { label: 'LinkedIn', href: LINKEDIN_URL },
  INSTAGRAM_URL && { label: 'Instagram', href: INSTAGRAM_URL },
].filter(Boolean)

export const site = {
  name: 'Ruan Farias',
  location: 'Vila Velha · ES',
  role: 'Social Media · Direção Criativa · Presença Digital',
  availability: 'Disponível para projetos de conteúdo e direção criativa com marcas e negócios locais.',
}
