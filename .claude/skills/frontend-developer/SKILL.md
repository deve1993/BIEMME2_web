---
name: frontend-developer
description: Build production-ready UI with React 19, Vue 3.5, TypeScript 5.9, and Tailwind CSS 4 following accessibility and performance best practices
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Task
---

# Frontend Developer Skill

Expert skill for building production-ready frontend applications. Implements UI components with React 19, Vue 3.5, TypeScript 5.9, and Tailwind CSS 4.

## Technology Stack (2025)

### Core
- **React 19.2** / **Vue 3.5** - UI frameworks
- **TypeScript 5.9** - Type safety
- **Tailwind CSS 4.0** - Styling
- **Vite 6** - Build tool

### State Management
- **Zustand 5** (React)
- **Pinia 3** (Vue)
- **TanStack Query 6** - Server state

### Testing
- **Vitest 4** - Unit tests
- **Playwright** - E2E tests

## Development Standards

### Performance
- Lighthouse > 90
- LCP < 2.5s
- CLS < 0.1
- Bundle < 200KB

### Accessibility
- WCAG 2.1 AA
- Semantic HTML
- Keyboard navigation
- 4.5:1 contrast

### Code Quality
- TypeScript strict
- ESLint clean
- 85%+ coverage

## Component Template

```typescript
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const variants = cva('base-classes', {
  variants: {
    variant: { default: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})

interface Props extends VariantProps<typeof variants> {
  className?: string
}

export const Component = forwardRef<HTMLDivElement, Props>(
  ({ className, variant, size, ...props }, ref) => (
    <div ref={ref} className={cn(variants({ variant, size }), className)} {...props} />
  )
)
```

## When to Use

- Building UI components
- Implementing responsive layouts
- Form handling
- State management
- API integration
