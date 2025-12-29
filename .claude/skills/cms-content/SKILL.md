---
name: cms-content
description: Manage CMS content - import, export, seed data, bulk operations.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# CMS Content Skill

Manage Payload CMS content operations.

## Usage

Invoke with `/cms-content [operation]` or when user says:
- "import products from csv"
- "export orders to json"
- "seed database"
- "bulk update products"

## Operations

### Import Data

#### From CSV
```typescript
import { parse } from 'csv-parse/sync'
import fs from 'fs'
import { getPayload } from 'payload'
import config from '@payload-config'

async function importFromCSV(filePath: string, collection: string) {
  const payload = await getPayload({ config })
  const content = fs.readFileSync(filePath, 'utf-8')
  const records = parse(content, { columns: true })

  let imported = 0
  let failed = 0

  for (const record of records) {
    try {
      await payload.create({
        collection,
        data: record,
      })
      imported++
    } catch (error) {
      console.error(`Failed: ${JSON.stringify(record)}`, error)
      failed++
    }
  }

  console.log(`Imported: ${imported}, Failed: ${failed}`)
}

// Usage
await importFromCSV('./products.csv', 'products')
```

#### From JSON
```typescript
async function importFromJSON(filePath: string, collection: string) {
  const payload = await getPayload({ config })
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const records = Array.isArray(data) ? data : [data]

  for (const record of records) {
    await payload.create({
      collection,
      data: record,
    })
  }
}
```

### Export Data

#### To JSON
```typescript
async function exportToJSON(collection: string, outputPath: string) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection,
    limit: 0, // Get all
    depth: 0, // No population
  })

  fs.writeFileSync(outputPath, JSON.stringify(docs, null, 2))
  console.log(`Exported ${docs.length} documents to ${outputPath}`)
}

// Usage
await exportToJSON('products', './export-products.json')
```

#### With Relationships
```typescript
async function exportWithRelations(collection: string, outputPath: string) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection,
    limit: 0,
    depth: 2, // Include nested relationships
  })

  fs.writeFileSync(outputPath, JSON.stringify(docs, null, 2))
}
```

### Seed Database

```typescript
async function seedDatabase() {
  const payload = await getPayload({ config })

  // Seed categories
  const categories = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Clothing', slug: 'clothing' },
    { name: 'Books', slug: 'books' },
  ]

  for (const category of categories) {
    await payload.create({
      collection: 'categories',
      data: category,
    })
  }

  // Seed products
  const products = [
    { name: 'Laptop', slug: 'laptop', price: 999.99 },
    { name: 'T-Shirt', slug: 't-shirt', price: 29.99 },
    { name: 'Novel', slug: 'novel', price: 14.99 },
  ]

  for (const product of products) {
    await payload.create({
      collection: 'products',
      data: {
        ...product,
        _status: 'published',
      },
    })
  }

  console.log('Database seeded!')
}
```

### Bulk Operations

#### Bulk Update
```typescript
async function bulkUpdate(collection: string, where: object, data: object) {
  const payload = await getPayload({ config })

  const result = await payload.update({
    collection,
    where,
    data,
  })

  console.log(`Updated ${result.docs.length} documents`)
}

// Example: Mark all products in category as featured
await bulkUpdate(
  'products',
  { categories: { contains: 'sale-category-id' } },
  { featured: true }
)
```

#### Bulk Delete
```typescript
async function bulkDelete(collection: string, where: object) {
  const payload = await getPayload({ config })

  const result = await payload.delete({
    collection,
    where,
  })

  console.log(`Deleted ${result.docs.length} documents`)
}

// Example: Delete old drafts
await bulkDelete(
  'products',
  {
    _status: { equals: 'draft' },
    updatedAt: { less_than: '2024-01-01' },
  }
)
```

#### Publish All Drafts
```typescript
async function publishAllDrafts(collection: string) {
  const payload = await getPayload({ config })

  await payload.update({
    collection,
    where: {
      _status: { equals: 'draft' },
    },
    data: {
      _status: 'published',
    },
  })
}
```

### Data Migration

#### Between Collections
```typescript
async function migrateData(
  sourceCollection: string,
  targetCollection: string,
  transform: (doc: any) => any
) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: sourceCollection,
    limit: 0,
  })

  for (const doc of docs) {
    const transformedData = transform(doc)
    await payload.create({
      collection: targetCollection,
      data: transformedData,
    })
  }
}

// Example: Migrate old products to new format
await migrateData('old-products', 'products', (doc) => ({
  name: doc.title,
  slug: doc.slug,
  price: doc.priceInCents / 100,
  description: doc.content,
}))
```

## Script Template

Create `scripts/cms-content.ts`:

```typescript
import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })

  // Your operation here
  const { docs } = await payload.find({
    collection: 'products',
  })

  console.log(`Found ${docs.length} products`)

  process.exit(0)
}

main().catch(console.error)
```

Run with:
```bash
npx tsx scripts/cms-content.ts
```

## Output

- Data imported/exported successfully
- Count of processed documents
- Error log for failed operations
