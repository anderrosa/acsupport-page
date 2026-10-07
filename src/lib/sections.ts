export const SECTION_IDS = {
  home: 'home',
  servicos: 'servicos',
  sobre: 'sobre',
  contato: 'contato',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const SECTION_HASHES = {
  home: `#${SECTION_IDS.home}`,
  servicos: `#${SECTION_IDS.servicos}`,
  sobre: `#${SECTION_IDS.sobre}`,
  contato: `#${SECTION_IDS.contato}`,
} as const

export const navLinks = [
  { label: 'Home', href: SECTION_HASHES.home },
  { label: 'Serviços', href: SECTION_HASHES.servicos },
  { label: 'Sobre nós', href: SECTION_HASHES.sobre },
  { label: 'Contato', href: SECTION_HASHES.contato },
] as const
