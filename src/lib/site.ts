function readEnv(value: string | undefined) {
  return value?.trim() ?? ''
}

export const CONTACT_EMAIL = readEnv(import.meta.env.VITE_CONTACT_EMAIL)
export const WHATSAPP_NUMBER = readEnv(import.meta.env.VITE_WHATSAPP_NUMBER)
export const INSTAGRAM_URL = readEnv(import.meta.env.VITE_INSTAGRAM_URL)
export const LINKEDIN_URL = readEnv(import.meta.env.VITE_LINKEDIN_URL)
