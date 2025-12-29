# CLAUDE.md

This file provides guidance to Claude Code when working on web development projects in this repository.

## Purpose

This workspace is designed for **professional web development** with intelligent agent orchestration. Claude Code should assist in building modern, scalable, and maintainable web applications using industry best practices.

---

## 🎯 Project Initialization Workflow

When starting a new project, Claude should:

1. **Understand Requirements** - Ask clarifying questions about:
   - Project type (landing page, e-commerce, SaaS, blog, etc.)
   - Target stack (Next.js, React, Vue, etc.)
   - Required features (i18n, auth, CMS, payments, etc.)
   - Design preferences (Tailwind, styled-components, etc.)
   - Deployment target (Vercel, Netlify, AWS, etc.)

2. **Invoke Agent Organizer** - Use the **agent-organizer** agent to:
   - Break down the project into logical phases
   - Assign specialized agents to appropriate tasks
   - Create a comprehensive development roadmap

3. **Project Setup** - Initialize the chosen technology stack with:
   - Modern tooling configuration
   - Best practice folder structure
   - Essential dependencies
   - Development environment setup

---

## 🤖 Available Specialized Agents

Claude Code has access to specialized agents in `.claude/agents/`. Use them strategically:

### **agent-organizer**
- **When**: Complex multi-phase projects requiring coordination
- **Use for**: Project planning, task breakdown, team assembly
- **Example**: "Plan a complete e-commerce website with Next.js"

### **nextjs-developer**
- **When**: Working with Next.js 14+ projects
- **Use for**: App Router, Server Components, Server Actions, routing, deployment
- **Example**: "Set up Next.js with App Router and internationalization"

### **react-specialist**
- **When**: Advanced React patterns needed
- **Use for**: Custom hooks, performance optimization, complex state management
- **Example**: "Optimize this component tree for better performance"

### **frontend-developer**
- **When**: Building UI components and features
- **Use for**: Component architecture, accessibility, responsive design
- **Example**: "Create a reusable card component with variants"

### **ui-designer**
- **When**: Visual design and design systems needed
- **Use for**: Design systems, color schemes, typography, visual hierarchy
- **Example**: "Create a cohesive design system for this project"

### **ux-researcher**
- **When**: User experience optimization required
- **Use for**: User flows, usability analysis, UX best practices
- **Example**: "Analyze the checkout flow for usability issues"

### **seo-specialist**
- **When**: SEO optimization needed
- **Use for**: Meta tags, structured data, performance, Core Web Vitals
- **Example**: "Optimize this site for search engines"

### **prompt-engineer**
- **When**: Integrating AI features or optimizing prompts
- **Use for**: LLM integration, prompt optimization, AI workflows
- **Example**: "Design a prompt system for content generation"

### **web-page-debugger**
- **When**: Debugging and quality assurance needed
- **Use for**: Bug detection and fixing across all frameworks (React, Vue, Angular, Svelte, Next.js), HTML/CSS/JS validation, browser compatibility, accessibility issues, performance problems, security vulnerabilities
- **Example**: "Analyze this page for bugs and accessibility issues" or "Fix all validation errors in the codebase"

### **ui-component-manager**
- **When**: Adding or managing UI components from component libraries
- **Use for**: Installing, searching, customizing components from shadcn/ui, Aceternity, Magic UI, ReactBits, 21st.dev, Radix UI, and other modern libraries; handling dependencies and configuration; creating component variants; framework conversion
- **Example**: "Install the shadcn/ui button component" or "Search for a good animated card component" or "Customize the dialog component to match our theme"

### **web-performance-optimizer**
- **When**: Performance optimization and analysis needed
- **Use for**: Lighthouse audits, Core Web Vitals optimization (LCP, FID/INP, CLS), bundle size analysis, code splitting, lazy loading, image/font optimization, framework-specific performance improvements
- **Example**: "Optimize this site for Core Web Vitals" or "Analyze and reduce bundle size" or "Run performance audit and implement optimizations"

---

## 🏗️ Architecture Guidelines

### Recommended Tech Stack Options

#### **Option 1: Next.js (Recommended for most projects)**
```
Framework: Next.js 15+ with App Router
Language: TypeScript
Styling: Tailwind CSS v4
Package Manager: Bun (recommended) or npm
Runtime: Node.js (production)
Deployment: Vercel
```

#### **Option 2: React + Vite**
```
Framework: React 18+ with Vite
Language: TypeScript
Styling: Tailwind CSS or styled-components
Package Manager: Bun (recommended) or npm
Deployment: Netlify/Vercel
```

#### **Option 3: Static Site**
```
Framework: Astro or Next.js Static Export
Language: TypeScript
Styling: Tailwind CSS
Package Manager: Bun (recommended) or npm
Deployment: Any static host
```

### Essential Features to Consider

**Internationalization (i18n)**
- Library: `next-intl` for Next.js or `react-i18next`
- Structure: `messages/{locale}.json` for translations
- Routing: Locale-based routes (`/en/`, `/it/`, `/cs/`)

**Authentication**
- Options: NextAuth.js, Clerk, Supabase Auth
- Session management and protected routes

**Content Management**
- Headless CMS: Sanity, Contentful, Strapi
- Or MDX for file-based content

**Styling Architecture**
- Tailwind CSS with custom design tokens
- CSS-in-JS if dynamic theming required
- Design system with reusable components

**UI Component Libraries** (Use ui-component-manager agent)
- Recommended: shadcn/ui (copy-paste components)
- Alternatives: Aceternity UI, Magic UI, ReactBits, 21st.dev
- Primitives: Radix UI, Headless UI
- Pre-styled: daisyUI, Flowbite
- Data visualization: Tremor

**Performance**
- Image optimization (Next.js Image component)
- Code splitting and lazy loading
- Font optimization (next/font)

**SEO**
- Meta tags via `next/head` or metadata API
- Structured data (JSON-LD)
- Sitemap and robots.txt generation

---

## 📁 Project Structure Templates

### Next.js App Router Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Internationalized routes (if i18n)
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── ...            # Other pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── lib/                  # Utilities and configurations
├── styles/               # Global styles
└── types/                # TypeScript types

messages/                 # i18n translations (if applicable)
├── en.json
├── it.json
└── cs.json

public/                   # Static assets
```

### Component Organization
```
components/
├── ui/                   # UI library components (shadcn/ui, etc.)
│   ├── button.tsx       # Installed via ui-component-manager
│   ├── card.tsx
│   ├── dialog.tsx
│   └── input.tsx
├── layout/              # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Navigation.tsx
└── features/            # Feature-specific components
    ├── Hero/
    ├── ContactForm/
    └── ProductCard/
```

**Note**: Use the **ui-component-manager** agent to install components from shadcn/ui and other libraries into the `components/ui/` directory.

---

## 🔄 Development Workflow

### Phase 1: Planning (Use agent-organizer)
1. Gather requirements
2. Choose tech stack
3. Define project structure
4. Create development roadmap
5. Set up todo tracking with TodoWrite tool

### Phase 2: Setup (Use nextjs-developer or frontend-developer)
1. Initialize project with chosen framework
2. Configure TypeScript, ESLint, Prettier
3. Set up styling system (Tailwind recommended)
4. Configure internationalization if needed
5. Set up git repository

### Phase 3: Development (Use specialized agents)
1. Install required UI components (ui-component-manager)
2. Build core layout components (frontend-developer)
3. Implement pages and routing (nextjs-developer)
4. Create UI components with design system (ui-designer)
5. Optimize UX and accessibility (ux-researcher)
6. Implement features with best practices (react-specialist)

### Phase 4: Optimization (Use specialized agents)
1. Debug and fix issues (web-page-debugger)
2. Performance audit and optimization (web-performance-optimizer)
3. Core Web Vitals optimization (web-performance-optimizer)
4. SEO implementation (seo-specialist)
5. Accessibility audit (frontend-developer)
6. Code review and refactoring

### Phase 5: Deployment
1. Build optimization
2. Environment variable configuration
3. Deploy to chosen platform
4. Set up CI/CD if applicable

---

## 🎨 Design System Guidelines

When creating components, follow these principles:

**Component Composition**
- Build small, reusable components
- Use compound components for complex UI
- Implement proper prop types with TypeScript

**Styling Conventions**
- Use Tailwind utility classes for rapid development
- Extract repeated patterns into components
- Maintain consistent spacing scale (4px grid)

**Accessibility**
- Semantic HTML elements
- Proper ARIA labels
- Keyboard navigation support
- Color contrast compliance (WCAG AA minimum)

**Responsive Design**
- Mobile-first approach
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test on multiple viewport sizes

---

## 🌍 Internationalization Best Practices

If implementing i18n:

**Folder Structure**
```
messages/
├── en.json    # English translations
├── it.json    # Italian translations
└── cs.json    # Czech translations
```

**Translation Keys**
Use nested structure for organization:
```json
{
  "common": {
    "nav": {
      "home": "Home",
      "about": "About",
      "contact": "Contact"
    }
  },
  "pages": {
    "home": {
      "hero": {
        "title": "Welcome",
        "subtitle": "Your subtitle here"
      }
    }
  }
}
```

**Usage in Components**
```tsx
import {useTranslations} from 'next-intl';

export function Hero() {
  const t = useTranslations('pages.home.hero');
  return <h1>{t('title')}</h1>;
}
```

---

## ✅ Quality Checklist

Before considering a project complete, ensure:

- [ ] **Code Quality** - Run web-page-debugger agent to detect and fix all bugs
- [ ] **HTML/CSS Validation** - No validation errors or warnings
- [ ] **Performance Optimization** - Run web-performance-optimizer agent for Core Web Vitals and bundle analysis
- [ ] All pages are responsive (mobile, tablet, desktop)
- [ ] Accessibility score > 90 (Lighthouse)
- [ ] Performance score > 90 (Lighthouse)
- [ ] Core Web Vitals passing (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] SEO meta tags on all pages
- [ ] Images optimized and using Next.js Image component
- [ ] No console errors or warnings
- [ ] TypeScript strict mode with no errors
- [ ] Loading and error states implemented
- [ ] Forms have proper validation
- [ ] Links and navigation working correctly
- [ ] **Browser Compatibility** - Tested on Chrome, Firefox, Safari, Edge
- [ ] **Security** - No XSS vulnerabilities, CSP configured if needed

---

## 🚀 Common Commands

### Bun (Recommended - Hybrid Approach)

```bash
# Package Management (7x faster than npm)
bun install          # Install dependencies
bun add [package]    # Add a package
bun remove [package] # Remove a package
bunx [cli-tool]      # Execute CLI tools (like npx)

# Development (instant startup)
bun run dev          # Start dev server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run type-check   # Run TypeScript compiler check

# Testing
bun run test         # Run tests (Vitest)
bun run test:watch   # Run tests in watch mode
bun run test:e2e     # Run end-to-end tests
bun test             # Native Bun test runner (alternative)

# Security & Analysis
bun audit            # Security audit
bun outdated         # Check outdated packages
```

### npm (Fallback / Legacy)

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check

# Testing (if configured)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests
```

### When to Use What

| Task | Bun | npm | Recommendation |
|------|-----|-----|----------------|
| Install dependencies | `bun install` | `npm ci` | **Bun** (7x faster) |
| Add packages | `bun add` | `npm install` | **Bun** |
| Run scripts | `bun run` | `npm run` | **Bun** (instant) |
| Execute CLIs | `bunx` | `npx` | **Bun** |
| Security audit | `bun audit` | `npm audit` | Both work |
| CI/CD pipelines | `bun install` | `npm ci` | **Bun** (3x faster CI) |
| Production runtime | Node.js | Node.js | **Node.js** (stable) |
| Test runner | Vitest | Vitest | **Vitest** (mature) |
| Dev server HMR | Vite | Vite | **Vite** (excellent) |

---

## 💡 Claude Code Behavior Guidelines

**Agent Usage**
- Use TodoWrite tool extensively for task tracking
- Invoke specialized agents proactively when their expertise is needed
- Run agents in parallel when tasks are independent
- Use agent-organizer for complex multi-phase projects
- Use ui-component-manager when users need UI components instead of building from scratch
- Use web-performance-optimizer proactively after major feature implementations to ensure performance targets
- Prioritize component libraries (shadcn/ui, etc.) for faster development

**Code Quality**
- Always use TypeScript with strict mode
- Prefer functional components with hooks
- Follow React best practices and modern patterns
- Write clean, self-documenting code with clear naming
- Use web-page-debugger agent proactively after implementing features to catch bugs early
- Validate HTML, CSS, and JavaScript before considering a feature complete

**Communication**
- Ask clarifying questions when requirements are ambiguous
- Provide progress updates when working on multi-step tasks
- Explain architectural decisions when making them
- Use TodoWrite to give visibility into task progress

**File Operations**
- Read files before editing them
- Prefer editing existing files over creating new ones
- Use proper indentation and formatting
- Follow existing code style in the project

---

## 🎯 Project-Specific Configuration

> **Note**: This section should be updated once a specific project is initialized.
> After project setup, document here:
> - Chosen tech stack
> - Specific features implemented
> - Custom configuration details
> - Deployment information
> - Environment variables needed

### Current Project Status
```
Status: Awaiting initialization
Stack: To be determined
Features: To be determined
```

---

## 📚 Resources

**Official Documentation**
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

**Best Practices**
- [Web.dev](https://web.dev) - Performance and best practices
- [MDN Web Docs](https://developer.mozilla.org) - Web standards
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility

---

*This CLAUDE.md file is designed to guide Claude Code in building professional, modern web applications with intelligent agent orchestration and industry best practices.*
