---
name: cms-deploy
description: Deploy Payload CMS to Vercel, Docker, or other platforms. Configure production environment.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# CMS Deploy Skill

Deploy Payload CMS project to production.

## Usage

Invoke with `/cms-deploy` or when user says:
- "deploy cms to vercel"
- "setup docker deployment"
- "configure production"

## Deployment Options

### Option 1: Vercel (Recommended)

#### 1. Database Setup
Choose one:
- **Vercel Postgres**: Built-in, easy setup
- **Neon**: Serverless PostgreSQL
- **Supabase**: PostgreSQL with extras

#### 2. Environment Variables

Set in Vercel dashboard:
```
DATABASE_URI=postgresql://...
PAYLOAD_SECRET=your-production-secret-32-chars-min
NEXT_PUBLIC_URL=https://your-domain.vercel.app
```

#### 3. Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URI
vercel env add PAYLOAD_SECRET

# Deploy to production
vercel --prod
```

#### 4. Run Migrations

```bash
vercel env pull
npx payload migrate
```

### Option 2: Docker Self-Hosted

#### 1. Dockerfile

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

#### 2. docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - DATABASE_URI=postgresql://postgres:password@db:5432/cms
      - PAYLOAD_SECRET=${PAYLOAD_SECRET}
      - NEXT_PUBLIC_URL=https://your-domain.com
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=cms
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

#### 3. Deploy

```bash
# Build and start
docker-compose up -d

# Run migrations
docker-compose exec app npx payload migrate

# View logs
docker-compose logs -f app
```

### Option 3: Railway

#### 1. Create Project
- Connect GitHub repository
- Add PostgreSQL service

#### 2. Configure Variables
```
DATABASE_URI=${{Postgres.DATABASE_URL}}
PAYLOAD_SECRET=your-secret
NEXT_PUBLIC_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

#### 3. Deploy
Push to GitHub - Railway auto-deploys.

## Production Checklist

### Security
- [ ] PAYLOAD_SECRET is unique (32+ chars)
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] CSP headers configured

### Database
- [ ] DATABASE_URI is production URL
- [ ] Backups configured
- [ ] Migrations applied
- [ ] Connection pooling configured

### Media Storage
- [ ] S3/Cloud storage for production
- [ ] CDN configured
- [ ] Image optimization enabled

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Logging configured
- [ ] Health checks enabled
- [ ] Uptime monitoring

### Performance
- [ ] Caching configured
- [ ] CDN for static assets
- [ ] Database indexes optimized

## S3 Storage Configuration

```typescript
// payload.config.ts
import { s3Storage } from '@payloadcms/storage-s3'

export default buildConfig({
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
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

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Migration Failures
```bash
# Check migration status
npx payload migrate:status

# Reset if needed (development only!)
npx payload migrate:reset
npx payload migrate
```

### Connection Issues
- Verify DATABASE_URI format
- Check firewall/security groups
- Ensure database is running
- Check SSL requirements

## Output

- Production-ready deployment
- Environment variables configured
- Migrations applied
- Admin user created
