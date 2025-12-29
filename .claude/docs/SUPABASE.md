# Supabase & Database Reference Guide

> PostgreSQL, Drizzle ORM, Auth, and Storage patterns

## Supabase Client Setup

### Browser Client
```typescript
// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Server Client
```typescript
// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component - cookies are read-only
          }
        },
      },
    }
  )
}
```

### Admin Client (Service Role)
```typescript
// lib/supabase/admin.ts
import { createClient } from "@supabase/supabase-js"

// Only use server-side, bypasses RLS
export const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
```

## Drizzle ORM Setup

### Installation
```bash
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit
```

### Configuration
```typescript
// drizzle.config.ts
import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: ".env.local" })

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

### Database Client
```typescript
// lib/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Disable prefetch for Supabase connection pooling (Transaction mode)
const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client, { schema })
```

## Schema Definition

### Basic Tables
```typescript
// lib/db/schema.ts
import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Enum example
export const roleEnum = pgEnum("role", ["user", "admin", "moderator"])

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  role: roleEnum("role").default("user").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

// Posts table
export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content"),
  published: boolean("published").default(false).notNull(),
  authorId: uuid("author_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

// Comments table
export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  postId: uuid("post_id")
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  authorId: uuid("author_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

// Type exports
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert
```

### Relations
```typescript
// lib/db/schema.ts (continued)
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
}))

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
}))

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
}))
```

## Query Patterns

### Basic CRUD
```typescript
// lib/db/queries/users.ts
import { db } from "../index"
import { users, type NewUser } from "../schema"
import { eq, and, or, like, desc, asc, sql } from "drizzle-orm"

// Create
export async function createUser(data: NewUser) {
  const [user] = await db.insert(users).values(data).returning()
  return user
}

// Read (single)
export async function getUserById(id: string) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  })
}

// Read (many with filtering)
export async function getUsers(options?: {
  role?: string
  search?: string
  limit?: number
  offset?: number
}) {
  const { role, search, limit = 10, offset = 0 } = options ?? {}

  return db.query.users.findMany({
    where: and(
      role ? eq(users.role, role) : undefined,
      search ? like(users.name, `%${search}%`) : undefined
    ),
    limit,
    offset,
    orderBy: [desc(users.createdAt)],
  })
}

// Update
export async function updateUser(id: string, data: Partial<NewUser>) {
  const [user] = await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning()
  return user
}

// Delete
export async function deleteUser(id: string) {
  await db.delete(users).where(eq(users.id, id))
}
```

### Relational Queries
```typescript
// Get user with posts
export async function getUserWithPosts(id: string) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      posts: {
        where: eq(posts.published, true),
        orderBy: [desc(posts.createdAt)],
        limit: 10,
      },
    },
  })
}

// Get post with author and comments
export async function getPostWithDetails(id: string) {
  return db.query.posts.findFirst({
    where: eq(posts.id, id),
    with: {
      author: true,
      comments: {
        with: { author: true },
        orderBy: [asc(comments.createdAt)],
      },
    },
  })
}
```

### Complex Queries
```typescript
// Aggregations
export async function getUserStats(userId: string) {
  const result = await db
    .select({
      totalPosts: sql<number>`count(${posts.id})`,
      publishedPosts: sql<number>`count(case when ${posts.published} then 1 end)`,
    })
    .from(posts)
    .where(eq(posts.authorId, userId))

  return result[0]
}

// Join query
export async function getRecentPostsWithAuthors(limit = 10) {
  return db
    .select({
      post: posts,
      author: {
        id: users.id,
        name: users.name,
        avatarUrl: users.avatarUrl,
      },
    })
    .from(posts)
    .innerJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    .limit(limit)
}

// Transaction
export async function createPostWithNotification(
  postData: NewPost,
  notifyUsers: string[]
) {
  return db.transaction(async (tx) => {
    const [post] = await tx.insert(posts).values(postData).returning()

    await tx.insert(notifications).values(
      notifyUsers.map((userId) => ({
        userId,
        type: "new_post",
        data: { postId: post.id },
      }))
    )

    return post
  })
}
```

## Authentication

### Sign Up
```typescript
// app/auth/signup/actions.ts
"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/auth/verify-email")
}
```

### Sign In
```typescript
// app/auth/login/actions.ts
"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/dashboard")
}
```

### OAuth
```typescript
// app/auth/oauth/actions.ts
"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signInWithGoogle() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect(data.url)
}
```

### Auth Callback
```typescript
// app/auth/callback/route.ts
import { createClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL("/dashboard", request.url))
}
```

### Get Current User
```typescript
// Server Component or Server Action
import { createClient } from "@/lib/supabase/server"

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Client Component
"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
```

## Row Level Security (RLS)

### Enable RLS in Migration
```sql
-- supabase/migrations/XXXX_enable_rls.sql

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data"
ON users FOR SELECT
USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data"
ON users FOR UPDATE
USING (auth.uid() = id);

-- Anyone can read published posts
CREATE POLICY "Anyone can read published posts"
ON posts FOR SELECT
USING (published = true);

-- Authors can manage their own posts
CREATE POLICY "Authors can manage own posts"
ON posts FOR ALL
USING (auth.uid() = author_id);
```

## Storage

### Upload File
```typescript
export async function uploadAvatar(userId: string, file: File) {
  const supabase = await createClient()

  const fileExt = file.name.split(".").pop()
  const fileName = `${userId}-${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from("avatars")
    .getPublicUrl(data.path)

  return publicUrl
}
```

### Delete File
```typescript
export async function deleteAvatar(path: string) {
  const supabase = await createClient()

  const { error } = await supabase.storage.from("avatars").remove([path])

  if (error) throw error
}
```

## Migrations

### Generate Migration
```bash
pnpm db:generate
# Creates: supabase/migrations/XXXX_*.sql
```

### Apply Migrations

#### Option 1: Drizzle Kit
```bash
pnpm db:migrate
```

#### Option 2: Supabase CLI
```bash
supabase db push
```

### Push Schema (Development)
```bash
# Quick iteration without migration files
pnpm db:push
```

## Environment Variables

```bash
# .env.local

# Supabase Project
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database URL (Transaction mode - port 6543)
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres

# Database URL (Session mode - port 5432, for migrations)
DATABASE_URL_DIRECT=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
```

## Best Practices

1. **Use Connection Pooling**: Always use Transaction mode (`port 6543`) with `prepare: false`
2. **Type Safety**: Export `$inferSelect` and `$inferInsert` types
3. **RLS First**: Enable RLS on all tables, use service role only when necessary
4. **Migrations**: Use Drizzle Kit for schema changes, commit migrations to git
5. **Transactions**: Use for multi-table operations to ensure data consistency
6. **Indexes**: Add indexes for frequently queried columns
7. **Soft Deletes**: Consider `deletedAt` column instead of hard deletes
