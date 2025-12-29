# Payload CMS 3.0 Reference

Guida completa per Payload CMS 3.0 con @deve1993/web-cms-kit.

## Quick Start

### Installazione

```bash
# Nuovo progetto
npx create-payload-app@latest my-cms --db postgres

# Aggiungi a progetto Next.js esistente
npm install payload @payloadcms/next @payloadcms/db-postgres
npm install @deve1993/web-cms-kit
```

### Configurazione Base

```typescript
// payload.config.ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  baseCollections,
  ecommerceCollections,
  baseGlobals,
} from '@deve1993/web-cms-kit'

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    ...baseCollections,      // Users, Media, Pages
    ...ecommerceCollections, // Products, Categories, Orders, etc.
  ],
  globals: baseGlobals,      // Settings, Header, Footer
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

### Environment Variables

```env
DATABASE_URI=postgresql://user:pass@localhost:5432/cms
PAYLOAD_SECRET=your-super-secret-key-minimum-32-chars
NEXT_PUBLIC_URL=http://localhost:3000
```

### Migrazioni

```bash
npx payload migrate:create
npx payload migrate
```

---

## web-cms-kit Presets

### Base Collections (sempre necessarie)
```typescript
import { baseCollections } from '@deve1993/web-cms-kit/collections/base'
// → Users, Media, Pages
```

### E-commerce
```typescript
import { ecommerceCollections } from '@deve1993/web-cms-kit/collections/ecommerce'
// → Products, Categories, Orders, Customers, Reviews
```

### Portfolio
```typescript
import { portfolioCollections } from '@deve1993/web-cms-kit/collections/portfolio'
// → Projects, Services, Team, Testimonials, Clients
```

### Blog
```typescript
import { blogCollections } from '@deve1993/web-cms-kit/collections/blog'
// → Posts, Authors, PostCategories, Tags
```

### Fields Riutilizzabili
```typescript
import {
  slugField,      // Slug auto-generato
  seoFields,      // Meta title, description, image
  priceField,     // Prezzo con validazione
  imageField,     // Upload singola immagine
  galleryField,   // Array di immagini
  addressFields,  // Indirizzo completo
} from '@deve1993/web-cms-kit/fields'
```

### Blocks per Layout
```typescript
import {
  Hero,
  Content,
  Gallery,
  CallToAction,
  FAQ,
  Contact,
} from '@deve1993/web-cms-kit/blocks'
```

### Access Control
```typescript
import {
  isAdmin,           // Solo admin
  isAdminOrEditor,   // Admin o editor
  isLoggedIn,        // Qualsiasi utente loggato
  isAdminOrSelf,     // Admin o proprietario
  isAdminOrPublished // Admin o documento pubblicato
} from '@deve1993/web-cms-kit/access'
```

---

## Collection Design

### Struttura Base

```typescript
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', '_status', 'updatedAt'],
    group: 'Shop',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  versions: {
    drafts: true,
  },
  fields: [
    // ... fields
  ],
}
```

### Field Types

#### Campi Base
```typescript
{ name: 'title', type: 'text', required: true, localized: true }
{ name: 'description', type: 'textarea', maxLength: 500 }
{ name: 'price', type: 'number', min: 0, required: true }
{ name: 'email', type: 'email', required: true }
{ name: 'publishedAt', type: 'date' }
{ name: 'featured', type: 'checkbox', defaultValue: false }
```

#### Select e Radio
```typescript
{
  name: 'status',
  type: 'select',
  options: [
    { label: 'Bozza', value: 'draft' },
    { label: 'Pubblicato', value: 'published' },
  ],
  defaultValue: 'draft',
}
```

#### Upload e Relationships
```typescript
// Upload singolo
{ name: 'image', type: 'upload', relationTo: 'media' }

// Relationship singola
{ name: 'author', type: 'relationship', relationTo: 'users' }

// Relationship multipla
{ name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true }

// Relationship polimorfica
{ name: 'related', type: 'relationship', relationTo: ['posts', 'products'], hasMany: true }
```

#### Array e Groups
```typescript
// Array
{
  name: 'gallery',
  type: 'array',
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'caption', type: 'text', localized: true },
  ],
}

// Group
{
  name: 'seo',
  type: 'group',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
  ],
}
```

#### Blocks e Tabs
```typescript
// Blocks (layout flessibile)
{
  name: 'layout',
  type: 'blocks',
  blocks: [Hero, Content, Gallery, CTA],
}

// Tabs (organizzazione admin)
{
  type: 'tabs',
  tabs: [
    { label: 'Contenuto', fields: [...] },
    { label: 'SEO', fields: [...] },
  ],
}
```

---

## Local API

### Query
```typescript
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

// Find con filtri
const { docs } = await payload.find({
  collection: 'products',
  where: {
    _status: { equals: 'published' },
    price: { less_than: 100 },
  },
  sort: '-createdAt',
  limit: 10,
  depth: 2,
})

// Find by ID
const product = await payload.findByID({
  collection: 'products',
  id: '123',
})

// Count
const { totalDocs } = await payload.count({
  collection: 'products',
  where: { featured: { equals: true } },
})
```

### Create
```typescript
const newProduct = await payload.create({
  collection: 'products',
  data: {
    name: 'Prodotto',
    price: 99.99,
  },
})

// Con locale specifico
await payload.create({
  collection: 'products',
  data: { name: 'Product Name' },
  locale: 'en',
})
```

### Update
```typescript
// Singolo documento
await payload.update({
  collection: 'products',
  id: '123',
  data: { price: 79.99 },
})

// Bulk update
await payload.update({
  collection: 'products',
  where: { categories: { contains: 'sale' } },
  data: { featured: true },
})
```

### Delete
```typescript
// Singolo
await payload.delete({
  collection: 'products',
  id: '123',
})

// Bulk delete
await payload.delete({
  collection: 'products',
  where: {
    _status: { equals: 'draft' },
    createdAt: { less_than: '2024-01-01' },
  },
})
```

---

## Access Control

### Collection Level
```typescript
access: {
  read: ({ req }) => {
    if (req.user?.role === 'admin') return true
    return { _status: { equals: 'published' } }
  },
  create: ({ req }) => req.user?.role === 'admin',
  update: ({ req }) => {
    if (req.user?.role === 'admin') return true
    return { createdBy: { equals: req.user?.id } }
  },
  delete: ({ req }) => req.user?.role === 'admin',
}
```

### Field Level
```typescript
{
  name: 'internalNotes',
  type: 'textarea',
  access: {
    read: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
  },
}
```

---

## Hooks

### beforeChange
```typescript
hooks: {
  beforeChange: [
    ({ data, operation }) => {
      if (operation === 'create' && data.title && !data.slug) {
        data.slug = data.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')
      }
      return data
    },
  ],
}
```

### afterChange
```typescript
hooks: {
  afterChange: [
    async ({ doc, operation }) => {
      if (operation === 'create' || operation === 'update') {
        await revalidatePath(`/products/${doc.slug}`)
      }
    },
  ],
}
```

### beforeValidate
```typescript
hooks: {
  beforeValidate: [
    ({ data }) => {
      if (data.salePrice && data.price <= data.salePrice) {
        throw new Error('Il prezzo scontato deve essere minore del prezzo normale')
      }
      return data
    },
  ],
}
```

---

## Plugins

### SEO Plugin
```typescript
import { seoPlugin } from '@payloadcms/plugin-seo'

export default buildConfig({
  plugins: [
    seoPlugin({
      collections: ['pages', 'posts', 'products'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title} | My Site`,
      generateDescription: ({ doc }) => doc.excerpt,
    }),
  ],
})
```

### S3 Storage
```typescript
import { s3Storage } from '@payloadcms/storage-s3'

export default buildConfig({
  plugins: [
    s3Storage({
      collections: { media: true },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY!,
          secretAccessKey: process.env.S3_SECRET_KEY!,
        },
        region: process.env.S3_REGION!,
      },
    }),
  ],
})
```

### Stripe Plugin
```typescript
import { stripePlugin } from '@payloadcms/plugin-stripe'

export default buildConfig({
  plugins: [
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY!,
      sync: [{
        collection: 'products',
        stripeResourceType: 'products',
        fields: [
          { fieldPath: 'name', stripeProperty: 'name' },
          { fieldPath: 'price', stripeProperty: 'default_price.unit_amount' },
        ],
      }],
    }),
  ],
})
```

---

## CLI Commands

```bash
# Migrazioni
npx payload migrate:create    # Crea nuova migrazione
npx payload migrate           # Applica migrazioni
npx payload migrate:status    # Stato migrazioni
npx payload migrate:reset     # Reset (solo development!)

# Types
npx payload generate:types    # Genera TypeScript types

# web-cms-kit CLI
npx @deve1993/web-cms-kit init                 # Setup wizard
npx @deve1993/web-cms-kit add-preset ecommerce # Aggiungi preset
npx @deve1993/web-cms-kit add-collection posts # Aggiungi collezione
```

---

## Frontend Integration

### Server Component
```typescript
// app/products/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function ProductsPage() {
  const payload = await getPayload({ config })

  const { docs: products } = await payload.find({
    collection: 'products',
    where: { _status: { equals: 'published' } },
  })

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

### With Caching
```typescript
import { unstable_cache } from 'next/cache'

const getProducts = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return payload.find({
      collection: 'products',
      where: { _status: { equals: 'published' } },
    })
  },
  ['products'],
  { revalidate: 60, tags: ['products'] }
)

export default async function ProductsPage() {
  const { docs: products } = await getProducts()
  // ...
}
```

### Revalidation
```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { collection } = await req.json()
  revalidateTag(collection)
  return Response.json({ revalidated: true })
}
```

---

## Deployment

### Vercel
```bash
vercel
vercel env add DATABASE_URI
vercel env add PAYLOAD_SECRET
vercel --prod
```

### Docker
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - DATABASE_URI=postgresql://postgres:password@db:5432/cms
      - PAYLOAD_SECRET=${PAYLOAD_SECRET}
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=cms
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## Best Practices

1. **Database**: Usa PostgreSQL per produzione
2. **Drafts**: Abilita versioning per contenuti editabili
3. **Access Control**: Configura sempre permessi appropriati
4. **Localization**: Segna esplicitamente i campi localizzabili
5. **Types**: Rigenera types dopo ogni modifica schema
6. **Hooks**: Usa afterChange per revalidazione cache
7. **Admin UX**: Configura useAsTitle e defaultColumns
8. **Media**: Usa S3/cloud storage in produzione

---

## Links

- [Payload Docs](https://payloadcms.com/docs)
- [Payload GitHub](https://github.com/payloadcms/payload)
- [web-cms-kit](https://github.com/deve1993/web-cms-kit)
