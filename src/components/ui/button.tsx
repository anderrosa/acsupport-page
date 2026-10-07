import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

import { ctaElevation, ctaElevationHover, ctaGradient, ctaGradientHover } from '@/lib/brand-styles'

const buttonVariants = tv({
  base: [
    'inline-flex cursor-pointer items-center justify-center rounded-lg border font-semibold transition-colors',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
  ],
  variants: {
    variant: {
      primary:
        'border-primary bg-primary text-primary-foreground hover:bg-primary-hover',
      secondary:
        'border-border bg-secondary text-secondary-foreground hover:bg-cinza/90',
      outline:
        'border-border bg-surface text-foreground hover:bg-muted',
      ghost:
        'border-transparent bg-transparent text-foreground-subtle hover:text-foreground',
      destructive:
        'border-destructive bg-destructive text-primary-foreground hover:bg-destructive/90',
      cta: twMerge(
        'border-0 text-navy transition-all duration-300 ease-out',
        ctaGradient,
        ctaGradientHover,
        ctaElevation,
        ctaElevationHover,
      ),
      hero: twMerge(
        'border-0 text-navy transition-all duration-300 ease-out',
        ctaGradient,
        ctaGradientHover,
        ctaElevation,
        ctaElevationHover,
      ),
      'hero-outline':
        'border-2 border-[#999999] bg-transparent text-white hover:bg-white/10',
    },
    size: {
      sm: 'h-8 gap-1.5 px-4 text-sm [&_svg]:size-3.5',
      md: 'h-9 gap-2 px-5 text-base [&_svg]:size-4',
      lg: 'h-11 gap-2 px-7 text-base [&_svg]:size-4',
      xl: 'h-12 gap-2.5 rounded-xl px-8 text-base [&_svg]:size-5 lg:h-14 lg:px-10 lg:text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string
  disabled?: boolean
}

export type ButtonProps = ButtonBaseProps &
  (
    | (ComponentProps<'button'> & { href?: never })
    | (ComponentProps<'a'> & { href: string })
  )

export function Button({
  className,
  variant,
  size,
  disabled,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = twMerge(buttonVariants({ variant, size }), className)

  if (href) {
    const anchorProps = props as ComponentProps<'a'>

    return (
      <a
        href={href}
        data-slot="button"
        data-disabled={disabled ? '' : undefined}
        className={classes}
        {...anchorProps}
      >
        {children}
      </a>
    )
  }

  const buttonProps = props as ComponentProps<'button'>

  return (
    <button
      type="button"
      data-slot="button"
      data-disabled={disabled ? '' : undefined}
      className={classes}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
