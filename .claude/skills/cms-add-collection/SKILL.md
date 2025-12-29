---
name: cms-add-collection
description: Add new collection to existing Payload CMS project. Generate collection files with proper types, hooks, and access control.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# CMS Add Collection Skill

Add new collection to Payload CMS project.

## Usage

Invoke with `/cms-add-collection [name]` or when user says:
- "add products collection"
- "create new collection"
- "add reviews to cms"

## Workflow

### 1. Gather Requirements

Ask the user:
1. **Collection name**: singular form (e.g., "product")
2. **Fields needed**: What data should it store?
3. **Relationships**: Links to other collections?
4. **Access control**: Who can read/create/update/delete?
5. **Features**: Drafts? Localization? Live preview?

### 2. Generate Collection File

Create `src/collections/[Name].ts`:

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
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    // Additional fields...
  ],
}
```

### 3. Register in Config

Update `payload.config.ts`:

```typescript
import { Products } from './collections/Products'

export default buildConfig({
  collections: [
    // existing collections...
    Products,
  ],
})
```

### 4. Create Migration

```bash
npx payload migrate:create
```

### 5. Generate Types

```bash
npx payload generate:types
```

## Field Templates

### Product Fields
```typescript
fields: [
  { name: 'name', type: 'text', required: true, localized: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'description', type: 'richText', localized: true },
  { name: 'price', type: 'number', required: true, min: 0 },
  { name: 'images', type: 'array', fields: [
    { name: 'image', type: 'upload', relationTo: 'media' },
  ]},
  { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true },
]
```

### Post Fields
```typescript
fields: [
  { name: 'title', type: 'text', required: true, localized: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'author', type: 'relationship', relationTo: 'users', required: true },
  { name: 'content', type: 'richText', required: true, localized: true },
  { name: 'featuredImage', type: 'upload', relationTo: 'media' },
  { name: 'publishedAt', type: 'date' },
]
```

### Page Fields
```typescript
fields: [
  { name: 'title', type: 'text', required: true, localized: true },
  { name: 'slug', type: 'text', required: true, unique: true },
  { name: 'layout', type: 'blocks', blocks: [...] },
  { name: 'seo', type: 'group', fields: [...] },
]
```

## Access Control Templates

### Public Read, Auth Write
```typescript
access: {
  read: () => true,
  create: ({ req }) => !!req.user,
  update: ({ req }) => !!req.user,
  delete: ({ req }) => req.user?.role === 'admin',
}
```

### Admin Only
```typescript
access: {
  read: ({ req }) => req.user?.role === 'admin',
  create: ({ req }) => req.user?.role === 'admin',
  update: ({ req }) => req.user?.role === 'admin',
  delete: ({ req }) => req.user?.role === 'admin',
}
```

### Published or Admin
```typescript
access: {
  read: ({ req }) => {
    if (req.user?.role === 'admin') return true
    return { _status: { equals: 'published' } }
  },
}
```

## Output

- New collection file in `src/collections/`
- Updated `payload.config.ts`
- Migration file ready
- TypeScript types generated
