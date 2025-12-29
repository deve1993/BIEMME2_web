---
name: cms-setup
description: Initialize a new Payload CMS 3.0 project with @deve1993/web-cms-kit. Interactive setup wizard for database, collections, and configuration.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Task
---

# CMS Setup Skill

Initialize new Payload CMS project with preset collections.

## Usage

Invoke with `/cms-setup` or when user says:
- "setup new cms project"
- "initialize payload cms"
- "create e-commerce cms"

## Workflow

### 1. Ask Project Requirements

Questions to ask:
1. **Project name**: What's the project name?
2. **Project type**: ecommerce, portfolio, blog, or custom?
3. **Database**: PostgreSQL (recommended), MongoDB, or SQLite?
4. **Locales**: Which languages? (e.g., it, en, de)
5. **Features**: Stripe, S3, Live Preview?
6. **Deployment**: Vercel, Docker, Railway?

### 2. Create Project Structure

```bash
# Create Next.js + Payload project
npx create-payload-app@latest my-project --db postgres

# Or add to existing Next.js
cd existing-project
npm install payload @payloadcms/next @payloadcms/db-postgres
npm install @deve1993/web-cms-kit
```

### 3. Configure Payload

Generate `payload.config.ts`:

```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  baseCollections,
  ecommerceCollections, // or portfolioCollections, blogCollections
  baseGlobals,
} from '@deve1993/web-cms-kit'

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    ...baseCollections,
    ...ecommerceCollections,
  ],
  globals: baseGlobals,
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  localization: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
  },
})
```

### 4. Setup Environment

Create `.env`:

```env
DATABASE_URI=postgresql://user:pass@localhost:5432/cms
PAYLOAD_SECRET=your-super-secret-key-minimum-32-chars
NEXT_PUBLIC_URL=http://localhost:3000
```

### 5. Run Migrations

```bash
npx payload migrate:create
npx payload migrate
```

### 6. Start Development

```bash
npm run dev
```

Admin panel: http://localhost:3000/admin

## Preset Options

### E-commerce
```typescript
import { ecommerceCollections } from '@deve1993/web-cms-kit/collections/ecommerce'
// Includes: Products, Categories, Orders, Customers, Reviews
```

### Portfolio
```typescript
import { portfolioCollections } from '@deve1993/web-cms-kit/collections/portfolio'
// Includes: Projects, Services, Team, Testimonials, Clients
```

### Blog
```typescript
import { blogCollections } from '@deve1993/web-cms-kit/collections/blog'
// Includes: Posts, Authors, PostCategories, Tags
```

## Output

After successful setup:
- Configured `payload.config.ts`
- Environment template `.env.example`
- Database migrations ready
- Admin panel at `/admin`

## Next Steps

Guide user to:
1. Run database migrations
2. Create first admin user
3. Configure plugins (Stripe, etc.)
4. Build frontend pages
5. Set up live preview
