import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type TextareaProps = ComponentProps<'textarea'>

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={twMerge(
        'min-h-32 w-full resize-y rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-white',
        'placeholder:text-white/40',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
