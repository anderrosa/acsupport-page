import { twMerge } from 'tailwind-merge'

import { headingGradientBg } from '@/lib/brand-styles'
import logo from '@/assets/acsupport-logo.svg'

const logoAspect = 'aspect-[359/237]'

/** Altura responsiva compartilhada (nav + footer). */
export const brandLogoSize = 'h-10 sm:h-11 md:h-12 lg:h-14'

export function BrandLogo({ className }: { className?: string }) {
  return (
    <div
      data-slot="brand-logo"
      className={twMerge(
        'w-auto shrink-0',
        logoAspect,
        headingGradientBg,
        brandLogoSize,
        className,
      )}
      style={{
        maskImage: `url(${logo})`,
        WebkitMaskImage: `url(${logo})`,
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
      role="img"
      aria-label="AC Support"
    />
  )
}
