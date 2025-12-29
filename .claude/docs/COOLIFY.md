# Coolify Docker Compose Deployment Guide

## Principio Fondamentale

Il file `docker-compose.yaml` e la **singola fonte di verita**.
Coolify legge e rispetta tutte le configurazioni definite nel compose file.

---

## Variabili d'Ambiente

### Sintassi Supportata

| Sintassi | Descrizione | Visibile UI |
|----------|-------------|-------------|
| `HARD_CODED=value` | Valore fisso | No |
| `${VAR}` | Editabile | Si |
| `${VAR:-default}` | Con valore predefinito | Si |
| `${VAR:?}` | Obbligatoria (bordo rosso se vuota) | Si |
| `${VAR:?default}` | Obbligatoria con prefill | Si |

### Esempio

```yaml
environment:
  # Hardcoded - NON visibile nell'UI
  - NODE_ENV=production

  # Editabile nell'UI
  - API_KEY=${API_KEY}

  # Editabile con default
  - LOG_LEVEL=${LOG_LEVEL:-info}

  # Obbligatoria - bordo rosso se vuota
  - DATABASE_URL=${DATABASE_URL:?}

  # Obbligatoria con valore prefillato
  - PORT=${PORT:?3000}
```

### Magic Variables (Preset Coolify)

Coolify genera automaticamente valori usando la sintassi `SERVICE_<TYPE>_<IDENTIFIER>`:

| Variable | Descrizione |
|----------|-------------|
| `${SERVICE_PASSWORD_<ID>}` | Password sicura auto-generata |
| `${SERVICE_USER_<ID>}` | Username random 16 caratteri |
| `${SERVICE_URL_<ID>}` | URL del servizio |
| `${SERVICE_FQDN_<ID>}` | Full qualified domain name |
| `${SERVICE_BASE64_<ID>}` | Stringa base64 random |

**IMPORTANTE:** Per porte, usare **trattini** (non underscore):
```yaml
# Corretto
- API_URL=${SERVICE_URL_APP-NAME_3000}

# Sbagliato
- API_URL=${SERVICE_URL_APP_NAME_3000}
```

### Variabili Condivise

```yaml
# Team level
- NODE_ENV={{team.NODE_ENV}}

# Project level
- API_URL={{project.API_URL}}

# Environment level
- DEBUG={{environment.DEBUG}}
```

---

## Networking

### Regole Critiche

1. **NON usare `ports:` nel compose per servizi esterni**
   - Coolify gestisce automaticamente il proxy
   - Causa conflitti se specificato

2. **Comunicazione interna via nome servizio**
   ```yaml
   # Nel servizio app
   - DATABASE_URL=postgresql://user:pass@db:5432/mydb
   # "db" e il nome del servizio PostgreSQL
   ```

3. **Per esporre un servizio:**
   - Assegna un dominio nell'UI di Coolify
   - Se la porta non e 80, specificala nel dominio (es. `myapp.com:3000`)

### Comunicazione Inter-Stack

Per connettere servizi in stack diversi:
1. Abilita "Connect to Predefined Network" in entrambi
2. Usa il nome completo: `service-name-<uuid>`

---

## Storage

### Directory Vuota

```yaml
volumes:
  - type: bind
    source: ./data
    target: /app/data
    is_directory: true  # <- Specifico Coolify, NON standard Docker
```

### File con Contenuto Inline

```yaml
volumes:
  - type: bind
    source: ./config.json
    target: /app/config.json
    content: |
      {
        "key": "value",
        "debug": false
      }
```

### Init SQL per Database

```yaml
db:
  image: postgres:16-alpine
  volumes:
    - postgres_data:/var/lib/postgresql/data
    - type: bind
      source: ./init.sql
      target: /docker-entrypoint-initdb.d/init.sql
      content: |
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

---

## Custom Docker Options

Nel campo "Custom Docker Options" dell'UI Coolify puoi usare:

```bash
# Capabilities
--cap-add SYS_ADMIN
--cap-drop NET_RAW

# Privileged mode
--privileged

# GPU support
--gpus all

# Shared memory
--shm-size 2g

# Custom entrypoint
--entrypoint /bin/sh
--entrypoint "sh -c 'npm start'"

# Device access
--device /dev/sda

# Resource limits
--ulimit nofile=65535:65535
```

---

## Template Next.js + PostgreSQL per Coolify

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      # Obbligatorie (bordo rosso se vuote)
      - DATABASE_URL=${DATABASE_URL:?}
      - BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET:?}

      # Con default
      - NODE_ENV=${NODE_ENV:-production}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL:-https://myapp.com}

      # Editabili
      - RESEND_API_KEY=${RESEND_API_KEY}
      - EMAIL_FROM=${EMAIL_FROM}
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      # Magic variables per credenziali auto-generate
      - POSTGRES_USER=${SERVICE_USER_POSTGRES}
      - POSTGRES_PASSWORD=${SERVICE_PASSWORD_POSTGRES}
      - POSTGRES_DB=${POSTGRES_DB:-auth_app}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

### DATABASE_URL con Magic Variables

Per costruire automaticamente la DATABASE_URL:

```yaml
app:
  environment:
    - DATABASE_URL=postgresql://${SERVICE_USER_POSTGRES}:${SERVICE_PASSWORD_POSTGRES}@db:5432/${POSTGRES_DB:-auth_app}
```

---

## Dockerfile Ottimizzato per Coolify

```dockerfile
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args iniettati da Coolify
ARG DATABASE_URL
ARG NEXT_PUBLIC_APP_URL

RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Gotchas & Tips

### Da Evitare

| Problema | Motivo |
|----------|--------|
| `ports: - "3000:3000"` | Conflitto con proxy Coolify |
| Variabili hardcoded | Non visibili/editabili nell'UI |
| `SOURCE_COMMIT` in build args | Invalida cache ad ogni commit |
| Underscore nelle magic vars con porte | Usa trattini: `APP-NAME_3000` |

### Best Practices

- **Usa sempre `${VAR}`** per variabili editabili nell'UI
- **Variabili critiche con `:?`** per forzare la configurazione
- **Health checks obbligatori** per `depends_on` affidabile
- **`is_directory: true`** per mount di directory vuote
- **Multi-stage Dockerfile** per immagini piccole (~150MB)

### Debug

```bash
# Verifica container healthy
docker ps

# Logs servizio specifico
docker logs <container_id>

# Accesso shell nel container
docker exec -it <container_id> sh
```

---

## Deploy Checklist

- [ ] Nessun `ports:` nel compose (tranne per comunicazione interna)
- [ ] Variabili critiche con `:?` (DATABASE_URL, SECRETS)
- [ ] Health checks configurati per tutti i servizi
- [ ] `output: "standalone"` in `next.config.ts`
- [ ] Dockerfile multi-stage ottimizzato
- [ ] Volumes per persistenza dati
- [ ] Magic variables per credenziali auto-generate
- [ ] Dominio assegnato nell'UI Coolify

---

## Riferimenti

- [Coolify Docker Compose Docs](https://coolify.io/docs/knowledge-base/docker/compose)
- [Coolify Environment Variables](https://coolify.io/docs/knowledge-base/environment-variables)
- [Coolify Custom Commands](https://coolify.io/docs/knowledge-base/docker/custom-commands)
- [Coolify Registry](https://coolify.io/docs/knowledge-base/docker/registry)
