---
name: web-debugger
description: Debug and fix issues in React 19, Next.js 16, Vue 3.5 applications including hydration errors, TypeScript issues, and runtime bugs
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Task
---

# Web Debugger Skill

Expert skill for debugging modern web applications. Fixes React 19, Next.js 16, Vue 3.5 bugs including hydration errors, TypeScript issues, and runtime problems.

## Common Issues

### React 19

#### Hydration Mismatch
```typescript
// ❌ Problem
function Component() {
  return <div>{Date.now()}</div>
}

// ✅ Fix
'use client'
function Component() {
  const [time, setTime] = useState<number>()
  useEffect(() => setTime(Date.now()), [])
  return <div>{time ?? 'Loading...'}</div>
}
```

#### Missing use client
```typescript
// ❌ Hooks in Server Component
function Counter() {
  const [count, setCount] = useState(0)
}

// ✅ Add directive
'use client'
function Counter() {
  const [count, setCount] = useState(0)
}
```

### Next.js 16

#### Missing use server
```typescript
// ❌ Problem
async function submitForm(data) {
  await db.insert(data)
}

// ✅ Fix
'use server'
async function submitForm(data) {
  await db.insert(data)
}
```

### TypeScript

#### Type Mismatch
```typescript
// ❌ Problem
<Component count="5" />

// ✅ Fix
<Component count={5} />
```

## Debug Workflow

1. **Reproduce** - Steps to reproduce
2. **Isolate** - Minimal reproduction
3. **Diagnose** - Root cause
4. **Fix** - Implement solution
5. **Verify** - Test fix
6. **Document** - Record findings

## Validation Commands

```bash
npx tsc --noEmit      # TypeScript
npx eslint src/       # Linting
npm run build         # Build check
npm test              # Tests
```

## When to Use

- Fixing runtime errors
- Hydration issues
- TypeScript errors
- Build failures
