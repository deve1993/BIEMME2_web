---
name: seo-optimizer
description: Optimize websites for search engines with Next.js 16 Metadata API, structured data, Core Web Vitals, and modern SEO best practices
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

# SEO Optimizer Skill

Expert skill for search engine optimization. Implements Next.js 16 Metadata API, structured data, and Core Web Vitals optimization.

## Technology Stack (2025)

- **Next.js 16** - Metadata API, sitemap.ts
- **Schema.org** - Structured data
- **Lighthouse** - Core Web Vitals
- **Google Search Console** - Monitoring

## Next.js 16 SEO

### Metadata API
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: { default: 'Site', template: '%s | Site' },
  description: 'Description',
  openGraph: {
    type: 'website',
    siteName: 'Site Name',
  },
  robots: { index: true, follow: true },
}
```

### Dynamic Metadata
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.image] },
  }
}
```

### Sitemap
```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  return [
    { url: 'https://example.com', lastModified: new Date(), priority: 1 },
    ...posts.map(p => ({
      url: `https://example.com/blog/${p.slug}`,
      lastModified: p.updatedAt,
      priority: 0.8,
    })),
  ]
}
```

### Structured Data
```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  datePublished: post.publishedAt,
  author: { '@type': 'Person', name: post.author },
}

<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

## Core Web Vitals

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |

## Checklist

- [ ] Metadata on all pages
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] Structured data
- [ ] Image optimization
- [ ] Core Web Vitals passing

## When to Use

- SEO optimization
- Metadata implementation
- Structured data
- Performance for SEO
