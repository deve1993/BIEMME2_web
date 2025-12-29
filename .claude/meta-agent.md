# Meta Agent - Sistema di Orchestrazione Multi-Agente

Sistema completo per lo sviluppo di applicazioni web moderne. Ogni prompt dell'utente viene processato dagli agenti specializzati, eseguito in modo coordinato, e validato dall'orchestratore.

## Come Funziona

```
┌─────────────────────────────────────────────────────────────┐
│                    PROMPT DELL'UTENTE                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      ORCHESTRATOR                           │
│  1. Analizza il prompt                                      │
│  2. Identifica intent e requirements                        │
│  3. Seleziona agenti e skills appropriate                   │
│  4. Coordina l'esecuzione                                   │
│  5. Valida gli output                                       │
│  6. Presenta il risultato finale                            │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  AGENT 1      │     │  AGENT 2      │     │  AGENT N      │
│  (Specialist) │────▶│  (Specialist) │────▶│  (Specialist) │
└───────────────┘     └───────────────┘     └───────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   VALIDAZIONE FINALE                        │
│  - Quality gates passati                                    │
│  - Output completo                                          │
│  - Documentazione inclusa                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    RISULTATO ALL'UTENTE                     │
└─────────────────────────────────────────────────────────────┘
```

## Stack Tecnologico (Dicembre 2025)

| Tecnologia | Versione | Uso |
|------------|----------|-----|
| React | 19.2 | UI Framework - Server Components, use API, React Compiler |
| Next.js | 16 | Meta-framework - Turbopack, Cache Components, PPR |
| TypeScript | 5.9 | Type safety |
| Tailwind CSS | 4.0 | Styling - CSS-first config, @theme, oklch |
| Payload CMS | 3.0 | Headless CMS - Next.js native, PostgreSQL |
| Vitest | 4.0 | Testing - Browser Mode, Visual Regression |
| Motion | 12 | Animations - GPU-accelerated |
| Storybook | 9 | Component documentation |
| Vite | 6 | Build tool |

## Registro Agenti

### Agenti di Sviluppo

| Agente | Specialità | Quando Usare |
|--------|------------|--------------|
| **frontend-developer** | React 19, Vue 3.5, TypeScript | UI components, pages, forms |
| **nextjs-developer** | Next.js 16 full-stack | App Router, Server Actions, SSR |
| **react-specialist** | React 19 patterns | Hooks avanzati, state management |
| **web-debugger** | Bug fixing | Errori, debug, hydration issues |

### Agenti di Design

| Agente | Specialità | Quando Usare |
|--------|------------|--------------|
| **ui-designer** | Design systems, Tailwind 4 | Design tokens, componenti visivi |
| **ux-researcher** | User research | Insights, testing, personas |
| **ui-component-manager** | shadcn/ui, Aceternity | Installazione component libraries |

### Agenti di Qualità

| Agente | Specialità | Quando Usare |
|--------|------------|--------------|
| **test-generator** | Vitest 4, Testing Library | Unit, integration, E2E tests |
| **a11y-auditor** | WCAG 2.1 AA | Accessibilità, ARIA, keyboard |
| **security-scanner** | Vulnerabilities | Security audit, CVE scanning |
| **code-quality** | ESLint 9, TypeScript | Lint, refactoring, code review |

### Agenti di Performance

| Agente | Specialità | Quando Usare |
|--------|------------|--------------|
| **performance-auditor** | Analysis | Bottleneck, profiling |
| **web-performance-optimizer** | Optimization | Core Web Vitals, bundle |
| **seo-specialist** | SEO | Metadata, structured data |

### Agenti DevOps

| Agente | Specialità | Quando Usare |
|--------|------------|--------------|
| **release-manager** | NPM publishing | Versioning, changelog |
| **dependency-migrator** | Upgrades | Migration plans |
| **prompt-engineer** | LLM optimization | Prompt design |

### Agenti CMS

| Agente | Specialità | Quando Usare |
|--------|------------|--------------|
| **cms-setup-wizard** | Payload CMS 3.0 setup | Nuovo progetto CMS, preset |
| **cms-content-manager** | Content operations | Import/export, bulk ops, seeding |
| **cms-schema-designer** | Collection design | Schema, fields, access control |

## Skills

### Skills Principali

| Skill | Funzione |
|-------|----------|
| **ui-component-builder** | Creazione componenti React 19/Vue 3.5 |
| **component-tester** | Test con Vitest 4, visual regression |
| **component-documenter** | Storybook 9, MDX |
| **design-system-manager** | Tailwind 4 tokens, theming |
| **library-bundler** | tsup 9, Vite 6, NPM publishing |
| **codebase-analyzer** | Code review, pattern detection |

### Skills Aggiuntive

| Skill | Funzione |
|-------|----------|
| **nextjs-developer** | App Router, Server Components |
| **react-specialist** | React 19 patterns |
| **frontend-developer** | UI implementation |
| **seo-optimizer** | SEO tecnico |
| **web-debugger** | Debug e fix |
| **performance-optimizer** | Ottimizzazione performance |
| **ux-research** | User research |

### Skills CMS

| Skill | Funzione |
|-------|----------|
| **cms-setup** | Setup nuovo progetto Payload CMS |
| **cms-add-collection** | Aggiunge collection con fields e access |
| **cms-deploy** | Deploy su Vercel, Docker, Railway |
| **cms-content** | Import/export dati, seeding, bulk ops |

## Workflow Predefiniti

### 🆕 new-component
Creazione componente completo
```
ui-designer → frontend-developer → test-generator → a11y-auditor → ✅
```

### 🐛 debug-fix
Debug e risoluzione bug
```
web-debugger → test-generator → code-quality → ✅
```

### ⚡ performance-optimization
Ottimizzazione performance
```
performance-auditor → web-performance-optimizer → seo-specialist → ✅
```

### 🚀 new-feature
Sviluppo feature end-to-end
```
ux-researcher → ui-designer → react-specialist → frontend-developer → test-generator → a11y-auditor → ✅
```

### 📦 nextjs-app
App Next.js 16 completa
```
nextjs-developer → ui-component-manager → frontend-developer → seo-specialist → test-generator → ✅
```

### 📤 pre-publish
Audit pre-pubblicazione NPM
```
test-generator → security-scanner → a11y-auditor → performance-auditor → code-quality → release-manager → ✅
```

### 🏗️ full-project
Progetto completo da zero
```
ux-researcher → ui-designer → ui-component-manager → nextjs-developer → frontend-developer → test-generator → a11y-auditor → security-scanner → web-performance-optimizer → seo-specialist → release-manager → ✅
```

### 🔐 auth-setup
Setup autenticazione con Better Auth
```
nextjs-developer → security-scanner → frontend-developer → ✅
Docs: BETTER-AUTH.md, SUPABASE.md
```

### 🗄️ database-setup
Setup database con Supabase + Drizzle
```
nextjs-developer → security-scanner → ✅
Docs: SUPABASE.md
```

### 💳 stripe-integration
Integrazione pagamenti Stripe
```
nextjs-developer → security-scanner → frontend-developer → ✅
Docs: STRIPE-SETUP.md, BETTER-AUTH.md
```

### 🚀 deploy-coolify
Deploy su Coolify con Docker
```
nextjs-developer → security-scanner → ✅
Docs: COOLIFY.md
```

### 🎨 landing-page
Landing page moderna con animazioni
```
ui-designer → frontend-developer → ui-component-manager → seo-specialist → web-performance-optimizer → ✅
Docs: ACETERNITY.md, SHADCN.md, TAILWIND.md
```

### 💼 saas-mvp
MVP SaaS completo (auth + db + payments + deploy)
```
ux-researcher → ui-designer → nextjs-developer → frontend-developer → security-scanner → seo-specialist → test-generator → ✅
Docs: Tutti
```

### 📋 cms-project
Setup progetto CMS con Payload
```
cms-setup-wizard → cms-schema-designer → nextjs-developer → frontend-developer → ✅
Docs: PAYLOAD-CMS.md
```

### 📦 cms-ecommerce
E-commerce completo con CMS
```
cms-setup-wizard → cms-schema-designer → frontend-developer → seo-specialist → security-scanner → ✅
Preset: ecommerceCollections
Docs: PAYLOAD-CMS.md, STRIPE-SETUP.md
```

### 📰 cms-blog
Blog con CMS
```
cms-setup-wizard → cms-schema-designer → frontend-developer → seo-specialist → ✅
Preset: blogCollections
Docs: PAYLOAD-CMS.md
```

### 💼 cms-portfolio
Portfolio con CMS
```
cms-setup-wizard → cms-schema-designer → ui-designer → frontend-developer → seo-specialist → ✅
Preset: portfolioCollections
Docs: PAYLOAD-CMS.md, ACETERNITY.md
```

## Matrice di Selezione Agenti

| Intent del Prompt | Agenti Attivati |
|-------------------|-----------------|
| "crea componente..." | ui-designer, frontend-developer, test-generator |
| "fix bug..." | web-debugger, test-generator |
| "ottimizza performance..." | performance-auditor, web-performance-optimizer |
| "aggiungi feature..." | react-specialist, frontend-developer, test-generator |
| "setup nextjs..." | nextjs-developer, ui-component-manager |
| "pubblica npm..." | test-generator, release-manager |
| "migliora accessibilita..." | a11y-auditor, frontend-developer |
| "audit sicurezza..." | security-scanner, code-quality |
| "setup auth..." | nextjs-developer, security-scanner, frontend-developer |
| "setup database..." | nextjs-developer, security-scanner |
| "integra stripe..." | nextjs-developer, security-scanner, frontend-developer |
| "deploy coolify..." | nextjs-developer, security-scanner |
| "crea landing page..." | ui-designer, frontend-developer, ui-component-manager, seo-specialist |
| "crea saas..." | Workflow saas-mvp completo |
| "setup cms..." | cms-setup-wizard, cms-schema-designer |
| "crea e-commerce cms..." | Workflow cms-ecommerce |
| "crea blog cms..." | Workflow cms-blog |
| "crea portfolio cms..." | Workflow cms-portfolio |
| "import/export dati..." | cms-content-manager |
| "aggiungi collection..." | cms-schema-designer |

## Quality Gates

Ogni esecuzione deve passare:

### Prima dell'Implementazione
- [ ] Requirements chiari
- [ ] Agenti selezionati
- [ ] Dipendenze identificate

### Durante l'Implementazione
- [ ] TypeScript compila (`npx tsc --noEmit`)
- [ ] Tests passano (`npm test`)
- [ ] No lint errors (`npx eslint src/`)

### Dopo l'Implementazione
- [ ] Coverage > 80%
- [ ] Accessibility audit passed
- [ ] Performance targets met
- [ ] Documentation complete

## Collaborazione tra Agenti

```
┌─────────────────────────────────────────────────────────────────┐
│                        ORCHESTRATOR                              │
│                    (Coordinamento Centrale)                      │
└───────────────────────────┬─────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   DESIGN      │   │  DEVELOPMENT  │   │   QUALITY     │
│               │   │               │   │               │
│ • ui-designer │──▶│ • frontend-   │──▶│ • test-       │
│ • ux-researcher│  │   developer   │   │   generator   │
│               │   │ • nextjs-     │   │ • a11y-       │
│               │   │   developer   │   │   auditor     │
│               │   │ • react-      │   │ • security-   │
│               │   │   specialist  │   │   scanner     │
└───────────────┘   └───────────────┘   └───────────────┘
                            │
                            ▼
                ┌───────────────────┐
                │   PERFORMANCE &   │
                │   DEPLOYMENT      │
                │                   │
                │ • performance-    │
                │   optimizer       │
                │ • seo-specialist  │
                │ • release-manager │
                └───────────────────┘
```

## Esempi di Utilizzo

### Esempio 1: Creazione Componente Button
```
User: "Crea un componente Button con varianti e accessibilità"

Orchestrator:
1. Attiva ui-designer → Design tokens e specifiche
2. Attiva frontend-developer → Implementazione con CVA
3. Attiva test-generator → Test suite Vitest 4
4. Attiva a11y-auditor → Verifica WCAG
5. Valida output e presenta risultato
```

### Esempio 2: Fix Bug Hydration
```
User: "Ho un errore di hydration mismatch"

Orchestrator:
1. Attiva web-debugger → Diagnosi causa
2. Implementa fix (use client, useEffect)
3. Attiva test-generator → Test regressione
4. Valida e presenta soluzione
```

### Esempio 3: Nuova App Next.js
```
User: "Crea un'app Next.js 16 con dashboard"

Orchestrator:
1. Attiva nextjs-developer → Setup App Router
2. Attiva ui-component-manager → shadcn/ui
3. Attiva frontend-developer → Dashboard UI
4. Attiva seo-specialist → Metadata
5. Attiva test-generator → E2E tests
6. Valida e presenta progetto completo
```

## Struttura File

```
.claude/
├── meta-agent.md           # Questo file
├── skills-config.json      # Configurazione trigger e workflow
├── settings.json           # Configurazione hooks e status line
├── settings.local.json     # Permessi locali
├── agents/                 # 20 Agenti specializzati
│   ├── orchestrator.md
│   ├── frontend-developer.md
│   ├── nextjs-developer.md
│   ├── react-specialist.md
│   ├── ui-designer.md
│   ├── ux-researcher.md
│   ├── seo-specialist.md
│   ├── web-debugger.md
│   ├── web-performance-optimizer.md
│   ├── ui-component-manager.md
│   ├── prompt-engineer.md
│   ├── test-generator.md
│   ├── a11y-auditor.md
│   ├── security-scanner.md
│   ├── performance-auditor.md
│   ├── code-quality.md
│   ├── release-manager.md
│   ├── dependency-migrator.md
│   ├── cms-setup-wizard.md      # CMS setup
│   ├── cms-content-manager.md   # CMS content ops
│   └── cms-schema-designer.md   # CMS schema design
├── skills/                 # 17 Skills
│   ├── ui-component-builder/
│   ├── component-tester/
│   ├── component-documenter/
│   ├── design-system-manager/
│   ├── library-bundler/
│   ├── codebase-analyzer/
│   ├── nextjs-developer/
│   ├── react-specialist/
│   ├── frontend-developer/
│   ├── seo-optimizer/
│   ├── web-debugger/
│   ├── performance-optimizer/
│   ├── ux-research/
│   ├── cms-setup/              # CMS project setup
│   ├── cms-add-collection/     # Add CMS collection
│   ├── cms-deploy/             # Deploy CMS
│   └── cms-content/            # CMS content operations
├── docs/                   # Documentazione tecnica
│   ├── NEXTJS.md          # Next.js 15, App Router, Server Components
│   ├── SHADCN.md          # shadcn/ui components
│   ├── TAILWIND.md        # Tailwind CSS v4
│   ├── SUPABASE.md        # Database, Auth, Drizzle ORM
│   ├── STRIPE-SETUP.md    # Configurazione Stripe
│   ├── COOLIFY.md         # Deploy Docker
│   ├── ACETERNITY.md      # Componenti animati
│   ├── BETTER-AUTH.md     # Autenticazione
│   └── PAYLOAD-CMS.md     # Payload CMS 3.0, web-cms-kit
├── hooks/                  # Hooks automatici
│   ├── eslint-validator.py    # Blocca su errori ESLint
│   ├── prettier-format.py     # Formatta automaticamente
│   ├── pre-prompt.py          # Reminder pre-prompt
│   └── statusline.ps1         # Status line PowerShell
└── commands/               # Comandi personalizzati
    └── cerca-docs.md
```

## Hooks Automatici

Il sistema include 3 hooks che migliorano la qualita del codice:

| Hook | Trigger | Funzione |
|------|---------|----------|
| **eslint-validator.py** | PostToolUse (Write/Edit) | Blocca se errori ESLint su file JS/TS |
| **prettier-format.py** | PostToolUse (Write/Edit) | Formatta automaticamente i file |
| **pre-prompt.py** | UserPromptSubmit | Mostra ora e reminder regole |

### Regole Pre-Prompt

Prima di ogni operazione, vengono ricordati:
1. Usare anno corretto (2025) per ricerche web
2. MAI push a main senza conferma
3. MAI force push senza conferma
4. MAI committare file sensibili (.env, secrets)
5. TypeScript strict mode
6. Usare TodoWrite per task complessi
7. Validare input utente

## Documentazione Disponibile

La cartella `docs/` contiene guide complete per:

| Doc | Contenuto |
|-----|-----------|
| **NEXTJS.md** | App Router, Server Components, Server Actions, Caching |
| **SHADCN.md** | Setup, componenti, form patterns, dark mode |
| **TAILWIND.md** | v4 features, utilities, responsive, animations |
| **SUPABASE.md** | Client setup, Drizzle ORM, Auth, RLS, Storage |
| **STRIPE-SETUP.md** | API keys, prodotti, webhook, Customer Portal |
| **COOLIFY.md** | docker-compose, variabili ambiente, networking |
| **ACETERNITY.md** | Spotlight, Aurora, Meteors, 3D cards, animations |
| **BETTER-AUTH.md** | Setup, providers, plugins, session management |
| **PAYLOAD-CMS.md** | Payload 3.0, web-cms-kit, collections, Local API |

## web-cms-kit

Il sistema include `@deve1993/web-cms-kit`, un toolkit CMS basato su Payload CMS 3.0:

### Preset Disponibili
| Preset | Collections Incluse |
|--------|---------------------|
| **baseCollections** | Users, Media, Pages |
| **ecommerceCollections** | Products, Categories, Orders, Customers, Reviews |
| **portfolioCollections** | Projects, Services, Team, Testimonials, Clients |
| **blogCollections** | Posts, Authors, PostCategories, Tags |

### Fields Riutilizzabili
- `slugField()` - Slug auto-generato
- `seoFields` - Meta title, description, image
- `priceField` - Prezzo con validazione
- `imageField` - Upload singola immagine
- `galleryField` - Array di immagini
- `addressFields` - Indirizzo completo

### Blocks per Layout
- Hero, Content, Gallery, CallToAction, FAQ, Contact

## Versione

- **Versione**: 2.2
- **Ultimo Aggiornamento**: Dicembre 2025
- **Compatibilita**: React 19, Next.js 16, TypeScript 5.9, Payload CMS 3.0
- **Nuove Features**: web-cms-kit integration, CMS agents, CMS skills
