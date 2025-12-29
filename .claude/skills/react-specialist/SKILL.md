---
name: react-specialist
description: Master React 19 patterns including Server Components, React Compiler, use API, and advanced hooks for scalable applications
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Task
---

# React Specialist Skill

Expert skill for implementing advanced React 19 patterns. Focuses on Server Components, React Compiler optimization, and modern state management.

## Technology Stack (2025)

- **React 19.2** - React Compiler, use API
- **TypeScript 5.9** - Strict mode
- **TanStack Query 6** - Server state
- **Zustand 5** - Client state
- **Motion 12** - Animations

## React 19 Features

### use API
```typescript
import { use } from 'react'

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise)
  return comments.map(c => <Comment key={c.id} {...c} />)
}
```

### useOptimistic
```typescript
function LikeButton({ likes, onLike }) {
  const [optimisticLikes, addOptimistic] = useOptimistic(likes)

  return (
    <button onClick={() => {
      addOptimistic(prev => prev + 1)
      onLike()
    }}>
      ❤️ {optimisticLikes}
    </button>
  )
}
```

### useActionState
```typescript
'use client'
function Form() {
  const [state, action, pending] = useActionState(submitForm, null)
  return (
    <form action={action}>
      <input name="email" />
      <button disabled={pending}>Submit</button>
    </form>
  )
}
```

### React Compiler
- Automatic memoization
- No manual useMemo/useCallback needed
- Compile-time optimizations

## Advanced Patterns

### Compound Components
```typescript
const Tabs = ({ children, defaultValue }) => {
  const [active, setActive] = useState(defaultValue)
  return (
    <TabsContext value={{ active, setActive }}>
      {children}
    </TabsContext>
  )
}
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent
```

### Polymorphic Components
```typescript
type Props<E extends ElementType> = { as?: E } & ComponentPropsWithoutRef<E>

function Box<E extends ElementType = 'div'>({ as, ...props }: Props<E>) {
  const Component = as || 'div'
  return <Component {...props} />
}
```

## When to Use

- Implementing React 19 patterns
- State management architecture
- Performance optimization
- Component library development
