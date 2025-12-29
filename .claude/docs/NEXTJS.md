# Next.js 15 Reference Guide

> App Router, React 19, Server Components patterns

## Core Concepts

### Server Components (Default)
Server Components are the default in App Router. They:
- Run only on the server
- Can directly access databases, file systems
- Cannot use hooks, event handlers, or browser APIs
- Reduce client-side JavaScript bundle

```typescript
// app/users/page.tsx - Server Component
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"

export default async function UsersPage() {
  // Direct database access - no API needed
  const allUsers = await db.select().from(users)

  return (
    <ul>
      {allUsers.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### Client Components
Use `"use client"` directive when you need:
- Hooks (useState, useEffect, etc.)
- Event handlers (onClick, onChange, etc.)
- Browser APIs (localStorage, window, etc.)
- Third-party libraries that require client-side

```typescript
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <Button onClick={() => setCount((c) => c + 1)}>
      Count: {count}
    </Button>
  )
}
```

### Composition Pattern
Server Components can import Client Components, but not vice versa.

```typescript
// app/dashboard/page.tsx - Server Component
import { db } from "@/lib/db"
import { InteractiveChart } from "./interactive-chart" // Client Component

export default async function DashboardPage() {
  const data = await db.query.analytics.findMany()

  // Pass server data to client component as props
  return <InteractiveChart data={data} />
}
```

## Routing

### File-Based Routing
```
app/
├── page.tsx                    # /
├── about/page.tsx              # /about
├── blog/
│   ├── page.tsx                # /blog
│   └── [slug]/page.tsx         # /blog/:slug
├── (marketing)/                # Route group (no URL segment)
│   ├── pricing/page.tsx        # /pricing
│   └── features/page.tsx       # /features
└── api/
    └── users/route.ts          # /api/users
```

### Special Files
- `page.tsx` - Route UI
- `layout.tsx` - Shared layout (preserved on navigation)
- `loading.tsx` - Loading UI (Suspense boundary)
- `error.tsx` - Error UI (Error boundary)
- `not-found.tsx` - 404 UI
- `route.ts` - API endpoint

### Dynamic Routes

```typescript
// app/blog/[slug]/page.tsx
interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: PageProps) {
  // In Next.js 15, params is a Promise - must await
  const { slug } = await params

  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <article>{post.content}</article>
}

// Generate static params for SSG
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}
```

### Parallel Routes
```
app/
└── @modal/
    └── (.)photo/[id]/page.tsx  # Intercepting route for modal
```

## Data Fetching

### Server Component Fetching
```typescript
// Direct database query (recommended)
async function getUser(id: string) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  })
}

// Or fetch API with caching
async function getData() {
  const res = await fetch("https://api.example.com/data", {
    next: { revalidate: 3600 }, // Revalidate every hour
  })
  return res.json()
}
```

### Caching Strategies
```typescript
// Force dynamic (no cache)
export const dynamic = "force-dynamic"

// Or per-request
const data = await fetch(url, { cache: "no-store" })

// Revalidate on demand
import { revalidatePath, revalidateTag } from "next/cache"
revalidatePath("/blog")
revalidateTag("posts")
```

## Server Actions

### Basic Pattern
```typescript
// app/actions.ts
"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string

  // Validate
  if (!title || !content) {
    return { error: "Missing fields" }
  }

  // Create
  await db.insert(posts).values({ title, content })

  // Revalidate and redirect
  revalidatePath("/posts")
  redirect("/posts")
}
```

### Using with Forms
```typescript
// Form component (can be Server or Client Component)
import { createPost } from "./actions"

export function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Create</button>
    </form>
  )
}
```

### With useActionState (React 19)
```typescript
"use client"

import { useActionState } from "react"
import { createPost } from "./actions"

export function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(createPost, null)

  return (
    <form action={formAction}>
      <input name="title" required disabled={isPending} />
      <textarea name="content" required disabled={isPending} />
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </button>
    </form>
  )
}
```

## Metadata & SEO

### Static Metadata
```typescript
// app/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My App",
  description: "Welcome to my app",
  openGraph: {
    title: "My App",
    description: "Welcome to my app",
    images: ["/og-image.png"],
  },
}
```

### Dynamic Metadata
```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  return {
    title: post.title,
    description: post.excerpt,
  }
}
```

## Middleware

```typescript
// middleware.ts
import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check auth
  const token = request.cookies.get("token")

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Add headers
  const response = NextResponse.next()
  response.headers.set("x-custom-header", "value")

  return response
}

export const config = {
  matcher: [
    // Match all paths except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
```

## API Routes

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const limit = parseInt(searchParams.get("limit") || "10")

  const result = await db.select().from(users).limit(limit)

  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const [user] = await db.insert(users).values(body).returning()

  return NextResponse.json(user, { status: 201 })
}
```

### Dynamic API Routes
```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  const { id } = await params
  const user = await getUserById(id)

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}
```

## Image Optimization

```typescript
import Image from "next/image"

export function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={64}
      height={64}
      className="rounded-full"
      priority // Load immediately for LCP
    />
  )
}

// For external images, add to next.config.ts:
// images: { remotePatterns: [{ hostname: "example.com" }] }
```

## Configuration

### next.config.ts
```typescript
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Turbopack (dev)
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // Images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/old-path",
        destination: "/new-path",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
```

## Performance Patterns

### Streaming with Suspense
```typescript
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <SlowDataComponent />
      </Suspense>
    </div>
  )
}
```

### Parallel Data Fetching
```typescript
export default async function Page() {
  // Sequential (slow)
  const user = await getUser()
  const posts = await getPosts()

  // Parallel (fast)
  const [user, posts] = await Promise.all([
    getUser(),
    getPosts(),
  ])

  return <div>...</div>
}
```

### Route Prefetching
```typescript
import Link from "next/link"

// Prefetch is automatic for <Link> in viewport
<Link href="/dashboard">Dashboard</Link>

// Disable prefetch
<Link href="/large-page" prefetch={false}>Large Page</Link>
```

## Next.js 15 Breaking Changes

1. **Async Request APIs**: `params`, `searchParams`, `cookies()`, `headers()` are now Promises
2. **React 19**: New hooks like `useActionState`, `useFormStatus`
3. **Caching**: `fetch` requests are no longer cached by default
4. **Turbopack**: Stable for dev (use `next dev --turbo`)

```typescript
// Before (Next.js 14)
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id
}

// After (Next.js 15)
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
```
