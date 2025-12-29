---
name: nextjs-developer
description: Build full-stack Next.js 16 applications with App Router, Server Components, Server Actions, and modern deployment patterns
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Task
---

# Next.js Developer Skill

Expert skill for building production-ready Next.js 16 applications. Implements App Router, Server Components, Server Actions, and optimizes for performance and SEO.

## Technology Stack (2025)

- **Next.js 16** - Turbopack, Cache Components, PPR
- **React 19.2** - Server Components, use API
- **TypeScript 5.9** - Strict mode
- **Tailwind CSS 4.0** - CSS-first config
- **Prisma 6** / **Drizzle 0.40** - Database ORM

## Patterns

### App Router Structure
```
app/
├── layout.tsx
├── page.tsx
├── loading.tsx
├── error.tsx
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── dashboard/
│   ├── layout.tsx
│   └── page.tsx
└── api/
    └── route.ts
```

### Server Component
```typescript
async function ProductList() {
  const products = await db.products.findMany()
  return <ProductGrid products={products} />
}
```

### Client Component
```typescript
'use client'
export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### Server Action
```typescript
'use server'
export async function createPost(formData: FormData) {
  await db.posts.create({ data: { title: formData.get('title') } })
  revalidatePath('/posts')
}
```

### Metadata API
```typescript
export const metadata: Metadata = {
  title: { default: 'Site', template: '%s | Site' },
  description: 'Description',
  openGraph: { type: 'website' },
}
```

## Performance Targets

- Lighthouse > 95
- TTFB < 200ms
- LCP < 2.5s

## When to Use

- Building full-stack Next.js apps
- Server-side rendering needs
- SEO-critical applications
- API routes and Server Actions
