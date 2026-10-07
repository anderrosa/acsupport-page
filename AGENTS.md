# AGENTS.md — AC Support Landing Page

Guia geral do projeto. Para padrões de componentes, veja [`src/components/AGENTS.md`](src/components/AGENTS.md).

---

## Stack

| Tecnologia | Uso |
|---|---|
| **React 19** | Sem `forwardRef` |
| **TypeScript** | Strict, `import type` para tipos |
| **Tailwind CSS v4** | `@theme`, CSS variables, escala tipográfica nativa |
| **Tailwind Variants** (`tailwind-variants`) | Variantes internas aos componentes (`tv()`) |
| **Tailwind Merge** (`tailwind-merge`) | Merge de classes (`twMerge()`) |
| **Base UI React** (`@base-ui/react`) | Componentes headless |
| **Phosphor Icons** (`@phosphor-icons/react`) | Ícones |
| **Vite** + **pnpm** | Build e pacotes |

> **Não usar shadcn/ui**, Radix Slot, nem `class-variance-authority`.

---

## Estrutura de Pastas

```
src/
├── assets/
├── components/
│   ├── AGENTS.md    ← padrões de componentes
│   ├── ui/          ← reutilizáveis (Button, Card, Input…)
│   ├── shared/      ← peças compartilhadas da landing
│   ├── layout/      ← nav e estrutura global
│   ├── hero/
│   ├── services/
│   ├── about/
│   ├── contact/
│   └── footer/
├── hooks/
├── lib/
├── App.tsx
├── main.tsx
└── index.css
```

---

## Cores da Marca

| Token | HEX | Classe Tailwind | Uso |
|---|---|---|---|
| **Navy** | `#003855` | `bg-navy`, `text-navy` | **Cor principal** — títulos, CTAs, fundos dark |
| Navy Hover | `#004d6e` | `bg-navy-hover` | Hover de elementos navy |
| Azure | `#3e7489` | `bg-azure`, `text-azure` | Destaque secundário, ícones, acentos |
| Azure Hover | `#356879` | `bg-azure-hover` | Hover de elementos azure |
| Cinza | `#4e5459` | `bg-cinza`, `text-cinza` | Texto secundário, bordas |
| Branco | `#ffffff` | `bg-brand-white`, `bg-white` | Fundos claros |
| Preto | `#000000` | `bg-brand-black`, `bg-black` | Texto principal |

### Tokens Semânticos

```
bg-primary, bg-primary-hover      → navy (#003855) — cor principal
bg-accent, bg-accent-hover        → azure (#3e7489) — destaque
bg-surface, bg-surface-raised     → fundos
bg-secondary, bg-muted            → cinza / neutros

text-foreground                   → texto principal
text-foreground-subtle            → texto secundário (#4e5459)
text-primary-foreground           → texto em bg primary (#ffffff)

border-border, border-input       → bordas (#4e5459)
ring-ring                         → focus ring
```

> Nunca hardcodar cores no JSX.

---

## Tipografia

- **Montserrat** → corpo (`font-sans`)
- **Raleway** → títulos (`font-heading`)
- Base: **16px** (`text-base`)

| Elemento | Classes |
|---|---|
| `h1` | `font-heading text-4xl md:text-5xl lg:text-6xl` |
| `h2` | `font-heading text-3xl md:text-4xl` |
| `h3` | `font-heading text-2xl md:text-3xl` |
| Subtítulo | `text-xl text-foreground-subtle` |
| Corpo | `text-base` |
| Pequeno | `text-sm text-foreground-subtle` |

---

## Comandos

```bash
pnpm dev       # Servidor de desenvolvimento
pnpm build     # Build de produção
pnpm lint      # ESLint
pnpm preview   # Preview do build
```
