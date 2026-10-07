import type { SectionId } from '@/lib/sections'

export function scrollToSection(sectionId: SectionId) {
  const target = document.getElementById(sectionId)
  if (!target) return

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
