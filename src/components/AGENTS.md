# AGENTS.md — Componentes

> Documentação de padrões para criação de componentes React neste projeto.
> Para stack, cores e tipografia globais, veja [`/AGENTS.md`](../../AGENTS.md).

---

## Organização

```
components/
├── AGENTS.md          ← este arquivo
├── ui/                ← reutilizáveis (Button, Card, Input…)
│   ├── button.tsx
│   └── card.tsx
├── shared/            ← peças da landing usadas em mais de uma section
│   └── brand-logo.tsx
├── layout/            ← estrutura global (nav, etc.)
│   └── nav-menu.tsx
├── hero/
│   ├── hero.tsx
│   └── scroll-indication.tsx
├── services/
│   └── services-section.tsx
├── about/
│   ├── about-section.tsx
│   ├── about-highlights.tsx
│   └── about-stats.tsx
├── contact/
│   ├── contact-section.tsx
│   ├── contact-form.tsx
│   └── contact-info.tsx
└── footer/
    └── footer.tsx
```

| Pasta | Quando usar |
|---|---|
| `components/ui/` | Componente genérico, reutilizável em qualquer contexto |
| `components/shared/` | Peça específica da landing, mas compartilhada entre sections |
| `components/layout/` | Estrutura global da página (nav, shell) |
| `components/{section}/` | Componentes de uma section da landing (hero, about, contact…) |

**Sem barrel files** (`index.ts`) em qualquer pasta.

---

## Nomenclatura

| Item | Padrão | Exemplo |
|---|---|---|
| Arquivos | lowercase com hífens | `hero-section.tsx`, `nav-bar.tsx` |
| Componentes | PascalCase | `HeroSection`, `Button` |
| Exports | **Named exports** de componentes e tipos | `export function Button()` |
| Imports | alias `@/` | `import { Button } from '@/components/ui/button'` |

---

## O que exportar

### ✅ Pode exportar

- Componentes: `export function Button()`, `export function Card()`
- Tipos de props: `export interface ButtonProps`, `export type CardProps`
- Sub-componentes de compound: `export function CardHeader()`

### ❌ Não exportar

- Constantes de variantes: `buttonVariants`, `cardVariants`, etc.
- Helpers internos de estilo
- Qualquer implementação que não seja componente ou tipo público

```tsx
// ✅ Correto — variantes são internas ao arquivo
const buttonVariants = tv({ ... })

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {}
export function Button({ ... }: ButtonProps) { ... }

// ❌ Errado — expõe implementação interna
export const buttonVariants = tv({ ... })
```

**Motivo:** variantes são detalhe de implementação. Consumidores usam props (`variant`, `size`), nunca classes cruas. Isso mantém a API limpa e evita acoplamento.

---

## Estrutura com Variantes (`tv()`)

```tsx
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: [
    'inline-flex cursor-pointer items-center justify-center rounded-lg border font-medium transition-colors',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
  ],
  variants: {
    variant: {
      primary: 'border-primary bg-primary text-primary-foreground hover:bg-primary-hover',
      secondary: 'border-border bg-secondary text-secondary-foreground hover:bg-cinza/90',
      outline: 'border-border bg-surface text-foreground hover:bg-muted',
      ghost: 'border-transparent bg-transparent text-foreground-subtle hover:text-foreground',
      destructive: 'border-destructive bg-destructive text-primary-foreground hover:bg-destructive/90',
    },
    size: {
      sm: 'h-8 gap-1.5 px-3 text-sm [&_svg]:size-3.5',
      md: 'h-9 gap-2 px-4 text-base [&_svg]:size-4',
      lg: 'h-10 gap-2.5 px-6 text-lg [&_svg]:size-4',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      data-slot="button"
      data-disabled={disabled ? '' : undefined}
      className={twMerge(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
```

---

## Compound Components

Para componentes com sub-partes (Card, Dialog, etc.):

```tsx
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type CardProps = ComponentProps<'div'>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={twMerge('flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 shadow-sm', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-header" className={twMerge('flex flex-col gap-1.5', className)} {...props} />
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
  return <p data-slot="card-description" className={twMerge('text-base text-foreground-subtle', className)} {...props} />
}

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-content" className={twMerge(className)} {...props} />
}

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={twMerge('flex items-center [.border-t]:pt-6', className)} {...props} />
}
```

---

## TypeScript

```tsx
// ✅ Estender ComponentProps + VariantProps
export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

// ✅ type alias quando não há props extras
export type CardProps = ComponentProps<'div'>

// ✅ Import type para tipos
import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'

// ❌ Não usar React.FC, forwardRef, nem any
// ❌ Não usar default export
```

---

## Padrões de Estilo

```tsx
// Merge de classes — sempre twMerge
className={twMerge('classes-base', className)}

// Identificação de slots
<div data-slot="card-header">

// Estados com data-attributes
data-disabled={disabled ? '' : undefined}
className="data-disabled:opacity-50 data-selected:bg-primary"

// Focus visible em interativos
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

// Ícones Phosphor
import { RocketLaunch } from '@phosphor-icons/react'
<RocketLaunch className="size-4" weight="duotone" />

// Tamanho de ícones em variantes
'[&_svg]:size-4'

// Botões de ícone precisam de aria-label
<button aria-label="Fechar"><X className="size-4" /></button>

// Props spread no final
{...props}
```

### Cores em componentes

Usar tokens semânticos — nunca HEX no JSX:

```
bg-surface, bg-primary, bg-primary-hover, bg-accent, bg-accent-hover, bg-secondary, bg-muted
text-foreground, text-foreground-subtle, text-primary-foreground, text-navy, text-azure
border-border, ring-ring
```

Ver paleta completa em [`/AGENTS.md`](../../AGENTS.md#cores-da-marca).

### Tipografia em componentes

Usar escala Tailwind — nunca px fixo no JSX:

```
text-sm, text-base, text-lg, text-xl, text-2xl … text-6xl
font-sans (corpo), font-heading (títulos)
```

---

## Base UI (headless)

Usar `@base-ui/react` para comportamento complexo. Estilizar com `twMerge()` e tokens do tema.

```tsx
// Dialog
import * as Dialog from '@base-ui/react/dialog'

// Tabs
import * as Tabs from '@base-ui/react/tabs'

// Select
import * as Select from '@base-ui/react/select'

// Menu
import * as Menu from '@base-ui/react/menu'
```

---

## Conversão de Design → Componente

1. Reutilizável em qualquer projeto? → `ui/`. Compartilhado entre sections? → `shared/`. Section da landing? → `{section}/`
2. Mapear cores para tokens da marca
3. Mapear tipografia para escala Tailwind
4. Variantes visuais? → `tv()` interno (sem export)
5. Sub-partes? → compound components com `data-slot`
6. Focus visible e `aria-label` em interativos

---

## Checklist

- [ ] Arquivo lowercase com hífens
- [ ] Named export de componentes e tipos
- [ ] **Variantes `tv()` sem export**
- [ ] `ComponentProps<'elemento'>` + `VariantProps` quando aplicável
- [ ] Classes com `twMerge()`
- [ ] `data-slot` em cada sub-elemento
- [ ] Estados via `data-*:` (ex: `data-disabled:`, `data-selected:`)
- [ ] Cores e tipografia via tokens/classes do tema
- [ ] Focus visible em interativos
- [ ] `aria-label` em botões de ícone
- [ ] `{...props}` no final
- [ ] Sem `forwardRef`, sem `default export`

---

## Componentes Disponíveis

| Componente | Arquivo | Exports |
|---|---|---|
| Button | `ui/button.tsx` | `Button`, `ButtonProps` |
| Card | `ui/card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`, `CardProps` |
