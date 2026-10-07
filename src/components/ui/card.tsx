import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type CardProps = ComponentProps<'div'>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={twMerge(
        'flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 text-foreground shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={twMerge('flex flex-col gap-1.5', className)}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="card-title"
      className={twMerge('font-heading text-xl font-semibold text-navy', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={twMerge('text-base text-foreground-subtle', className)}
      {...props}
    />
  )
}

export function CardAction({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={twMerge('self-start justify-self-end', className)}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={twMerge(className)}
      {...props}
    />
  )
}

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={twMerge('flex items-center [.border-t]:pt-6', className)}
      {...props}
    />
  )
}
