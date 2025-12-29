# Better Auth Reference Guide

> The most comprehensive authentication framework for TypeScript

## Overview

Better Auth is a modern, type-safe authentication library that works with any framework. It provides:
- Email/Password authentication
- OAuth providers (Google, GitHub, Discord, etc.)
- Two-factor authentication (2FA)
- Organizations and teams
- API keys
- Stripe integration

## Installation

```bash
pnpm add better-auth
```

## Basic Setup

### Server Configuration
```typescript
// lib/auth.ts
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/lib/db"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
})
```

### API Route (Next.js)
```typescript
// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

export const { GET, POST } = toNextJsHandler(auth)
```

### Client Setup
```typescript
// lib/auth-client.ts
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
})

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient
```

## Authentication Methods

### Email/Password
```typescript
// Sign Up
const { data, error } = await authClient.signUp.email({
  email: "user@example.com",
  password: "securepassword",
  name: "John Doe",
})

// Sign In
const { data, error } = await authClient.signIn.email({
  email: "user@example.com",
  password: "securepassword",
})

// Sign Out
await authClient.signOut()
```

### OAuth Providers
```typescript
// Google Sign In
await authClient.signIn.social({
  provider: "google",
  callbackURL: "/dashboard",
})

// GitHub Sign In
await authClient.signIn.social({
  provider: "github",
  callbackURL: "/dashboard",
})
```

### Magic Link
```typescript
// Server config
import { magicLink } from "better-auth/plugins"

export const auth = betterAuth({
  // ... other config
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendEmail({
          to: email,
          subject: "Sign in to MyApp",
          html: `<a href="${url}">Click here to sign in</a>`,
        })
      },
    }),
  ],
})

// Client usage
await authClient.signIn.magicLink({
  email: "user@example.com",
  callbackURL: "/dashboard",
})
```

## Session Management

### Get Session (Server)
```typescript
// In Server Component or Server Action
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}
```

### Get Session (Client)
```typescript
"use client"

import { useSession } from "@/lib/auth-client"

export function UserProfile() {
  const { data: session, isPending } = useSession()

  if (isPending) return <div>Loading...</div>
  if (!session) return <div>Not authenticated</div>

  return (
    <div>
      <p>Welcome, {session.user.name}</p>
      <p>Email: {session.user.email}</p>
    </div>
  )
}
```

## Middleware Protection

```typescript
// middleware.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Redirect authenticated users from auth pages
  if (request.nextUrl.pathname.startsWith("/login")) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
```

## Plugins

### Two-Factor Authentication
```typescript
import { twoFactor } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    twoFactor({
      issuer: "MyApp",
    }),
  ],
})

// Client: Enable 2FA
const { data } = await authClient.twoFactor.enable()
// Returns QR code URL for authenticator app

// Client: Verify 2FA
await authClient.twoFactor.verifyTotp({
  code: "123456",
})
```

### Organizations
```typescript
import { organization } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    organization({
      allowUserToCreateOrganization: true,
    }),
  ],
})

// Create organization
const { data } = await authClient.organization.create({
  name: "My Company",
  slug: "my-company",
})

// Invite member
await authClient.organization.inviteMember({
  organizationId: org.id,
  email: "member@example.com",
  role: "member",
})
```

### Stripe Integration
```typescript
import { stripe } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    stripe({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY!,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      plans: [
        {
          name: "pro",
          priceId: "price_xxx",
          limits: {
            projects: 10,
          },
        },
      ],
    }),
  ],
})

// Create checkout session
const { data } = await authClient.stripe.createCheckoutSession({
  planName: "pro",
  successUrl: "/dashboard?success=true",
  cancelUrl: "/pricing",
})
```

### API Keys
```typescript
import { apiKey } from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [
    apiKey({
      prefix: "myapp_",
    }),
  ],
})

// Create API key
const { data } = await authClient.apiKey.create({
  name: "My API Key",
  expiresIn: 30 * 24 * 60 * 60 * 1000, // 30 days
})
```

## Database Schema

Better Auth creates these tables automatically:

```sql
-- Users
CREATE TABLE "user" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT,
  "email" TEXT UNIQUE NOT NULL,
  "emailVerified" BOOLEAN DEFAULT FALSE,
  "image" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Sessions
CREATE TABLE "session" (
  "id" TEXT PRIMARY KEY,
  "expiresAt" TIMESTAMP NOT NULL,
  "token" TEXT UNIQUE NOT NULL,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "userId" TEXT REFERENCES "user"("id")
);

-- Accounts (OAuth)
CREATE TABLE "account" (
  "id" TEXT PRIMARY KEY,
  "accountId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "userId" TEXT REFERENCES "user"("id"),
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "expiresAt" TIMESTAMP
);

-- Verification tokens
CREATE TABLE "verification" (
  "id" TEXT PRIMARY KEY,
  "identifier" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "expiresAt" TIMESTAMP NOT NULL
);
```

## Environment Variables

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key

# Database
DATABASE_URL=postgresql://...

# OAuth - Google
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx

# OAuth - GitHub
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx

# Stripe (if using)
STRIPE_SECRET_KEY=sk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## Components Example

### Login Form
```typescript
"use client"

import { useState } from "react"
import { signIn } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    })

    if (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => signIn.social({ provider: "google" })}
      >
        Google
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => signIn.social({ provider: "github" })}
      >
        GitHub
      </Button>
    </form>
  )
}
```

## Resources

- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Better Auth GitHub](https://github.com/better-auth/better-auth)
- [Plugins List](https://www.better-auth.com/docs/plugins)
- [Migration Guides](https://www.better-auth.com/docs/guides)
