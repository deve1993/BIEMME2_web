---
name: performance-optimizer
description: Optimize web performance with Core Web Vitals, bundle analysis, React 19 Server Components, and Next.js 16 caching strategies
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Task
  - WebFetch
---

# Performance Optimizer Skill

Expert skill for web performance optimization. Improves Core Web Vitals, reduces bundle size, and implements React 19/Next.js 16 performance patterns.

## Performance Targets

| Metric | Target | Excellent |
|--------|--------|-----------|
| Lighthouse | > 90 | > 95 |
| LCP | < 2.5s | < 1.8s |
| INP | < 200ms | < 100ms |
| CLS | < 0.1 | < 0.05 |
| Bundle | < 200KB | < 100KB |

## Optimization Strategies

### React 19

#### Server Components
```typescript
// Zero client JS
async function ProductList() {
  const products = await db.products.findMany()
  return <ProductGrid products={products} />
}
```

#### React Compiler
- Automatic memoization
- No manual useMemo/useCallback

### Next.js 16

#### Image Optimization
```typescript
<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  priority
  placeholder="blur"
/>
```

#### Dynamic Imports
```typescript
const HeavyChart = dynamic(() => import('./Chart'), {
  loading: () => <Skeleton />,
  ssr: false,
})
```

#### Caching
```typescript
export const revalidate = 3600
fetch(url, { next: { revalidate: 3600 } })
```

### Bundle Optimization

#### Tree Shaking
```typescript
// ✅ Named imports
import { Button } from '@/components'

// ❌ Avoid
import * as Icons from 'lucide-react'
```

### Loading Strategy

```html
<link rel="preload" href="/fonts/inter.woff2" as="font" crossorigin />
<link rel="preconnect" href="https://api.example.com" />
```

## Commands

```bash
# Lighthouse
npx lighthouse https://example.com --output=json

# Bundle analysis
npm run build && npx @next/bundle-analyzer
```

## When to Use

- Core Web Vitals improvement
- Bundle size reduction
- Loading speed optimization
- SEO performance
