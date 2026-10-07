import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type InputProps = ComponentProps<'input'>

export function Input({ className, type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={twMerge(
        'h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-base text-white',
        'placeholder:text-white/40',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
