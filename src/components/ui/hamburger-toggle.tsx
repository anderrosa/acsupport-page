import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export interface HamburgerToggleProps extends ComponentProps<'button'> {
  open: boolean
}

export function HamburgerToggle({
  open,
  className,
  ...props
}: HamburgerToggleProps) {
  return (
    <button
      type="button"
      data-slot="hamburger-toggle"
      data-open={open ? '' : undefined}
      aria-expanded={open}
      className={twMerge(
        'group flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-1.5',
        'focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none',
        className,
      )}
      {...props}
    >
      <span
        className={twMerge(
          'block h-0.5 w-6 bg-white transition-all duration-300 group-hover:bg-white/80',
          open && 'translate-y-2 rotate-45',
        )}
      />
      <span
        className={twMerge(
          'block h-0.5 bg-white transition-all duration-300 group-hover:bg-white/80',
          open ? 'w-0 opacity-0' : 'w-6',
        )}
      />
      <span
        className={twMerge(
          'block h-0.5 w-6 bg-white transition-all duration-300 group-hover:bg-white/80',
          open && '-translate-y-2 -rotate-45',
        )}
      />
    </button>
  )
}
