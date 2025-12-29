# Tailwind CSS Reference Guide

> Utility-first CSS framework for rapid UI development

## Setup (Tailwind v4)

### Installation
```bash
pnpm add tailwindcss @tailwindcss/postcss postcss
```

### Configuration
```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

### CSS Variables
```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Tailwind v4 New Features

### CSS-First Configuration
```css
/* New @theme directive */
@import "tailwindcss";

@theme {
  --color-primary: oklch(0.5 0.2 240);
  --font-display: "Inter", sans-serif;
  --spacing-lg: 2rem;
}
```

### Custom Utilities
```css
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

### Custom Variants
```css
@variant dark (&:where(.dark, .dark *));
@variant hocus (&:hover, &:focus);
```

## Layout

### Flexbox
```tsx
// Basic flex
<div className="flex items-center justify-between">

// Column
<div className="flex flex-col gap-4">

// Wrap
<div className="flex flex-wrap gap-2">

// Grow/Shrink
<div className="flex-1">           {/* flex: 1 1 0% */}
<div className="flex-auto">        {/* flex: 1 1 auto */}
<div className="flex-none">        {/* flex: none */}
<div className="grow">             {/* flex-grow: 1 */}
<div className="shrink-0">         {/* flex-shrink: 0 */}
```

### Grid
```tsx
// Basic grid
<div className="grid grid-cols-3 gap-4">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Auto-fit (responsive without breakpoints)
<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">

// Grid spans
<div className="col-span-2">
<div className="col-span-full">
<div className="col-start-2 col-end-4">

// Grid rows
<div className="row-span-2">
<div className="grid-rows-3">
```

### Container
```tsx
<div className="container mx-auto px-4">

// With max-width
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

## Spacing

### Padding & Margin
```tsx
// All sides
<div className="p-4">    {/* padding: 1rem */}
<div className="m-4">    {/* margin: 1rem */}

// Specific sides
<div className="pt-4">   {/* padding-top */}
<div className="pr-4">   {/* padding-right */}
<div className="pb-4">   {/* padding-bottom */}
<div className="pl-4">   {/* padding-left */}

// Horizontal/Vertical
<div className="px-4">   {/* padding-left & right */}
<div className="py-4">   {/* padding-top & bottom */}
<div className="mx-auto"> {/* margin auto horizontal */}

// Negative margins
<div className="-mt-4">  {/* margin-top: -1rem */}

// Gap (Flex/Grid)
<div className="gap-4">     {/* gap: 1rem */}
<div className="gap-x-4">   {/* column-gap */}
<div className="gap-y-4">   {/* row-gap */}
```

### Spacing Scale
```
0    = 0px
px   = 1px
0.5  = 0.125rem (2px)
1    = 0.25rem (4px)
2    = 0.5rem (8px)
3    = 0.75rem (12px)
4    = 1rem (16px)
5    = 1.25rem (20px)
6    = 1.5rem (24px)
8    = 2rem (32px)
10   = 2.5rem (40px)
12   = 3rem (48px)
16   = 4rem (64px)
20   = 5rem (80px)
24   = 6rem (96px)
```

## Typography

### Font Size
```tsx
<p className="text-xs">     {/* 12px */}
<p className="text-sm">     {/* 14px */}
<p className="text-base">   {/* 16px */}
<p className="text-lg">     {/* 18px */}
<p className="text-xl">     {/* 20px */}
<p className="text-2xl">    {/* 24px */}
<p className="text-3xl">    {/* 30px */}
<p className="text-4xl">    {/* 36px */}
<p className="text-5xl">    {/* 48px */}
```

### Font Weight
```tsx
<p className="font-light">      {/* 300 */}
<p className="font-normal">     {/* 400 */}
<p className="font-medium">     {/* 500 */}
<p className="font-semibold">   {/* 600 */}
<p className="font-bold">       {/* 700 */}
```

### Text Utilities
```tsx
// Color
<p className="text-gray-500">
<p className="text-primary">
<p className="text-muted-foreground">

// Alignment
<p className="text-left">
<p className="text-center">
<p className="text-right">

// Decoration
<p className="underline">
<p className="line-through">
<p className="no-underline">

// Transform
<p className="uppercase">
<p className="lowercase">
<p className="capitalize">

// Line clamp (truncate)
<p className="truncate">                {/* single line */}
<p className="line-clamp-2">            {/* 2 lines */}
<p className="line-clamp-3">            {/* 3 lines */}

// Leading (line-height)
<p className="leading-none">     {/* 1 */}
<p className="leading-tight">    {/* 1.25 */}
<p className="leading-normal">   {/* 1.5 */}
<p className="leading-relaxed">  {/* 1.625 */}
```

## Colors

### Background
```tsx
<div className="bg-white dark:bg-slate-900">
<div className="bg-primary">
<div className="bg-secondary">
<div className="bg-muted">
<div className="bg-accent">

// Opacity
<div className="bg-black/50">       {/* 50% opacity */}
<div className="bg-white/75">       {/* 75% opacity */}

// Gradients
<div className="bg-linear-to-r from-purple-500 to-pink-500">
<div className="bg-linear-to-br from-blue-500 via-purple-500 to-pink-500">
```

### Text & Border
```tsx
<p className="text-gray-900 dark:text-gray-100">
<div className="border border-gray-200 dark:border-gray-800">
<div className="border-b border-border">
```

## Borders & Shadows

### Border Radius
```tsx
<div className="rounded">        {/* 0.25rem */}
<div className="rounded-md">     {/* 0.375rem */}
<div className="rounded-lg">     {/* 0.5rem */}
<div className="rounded-xl">     {/* 0.75rem */}
<div className="rounded-2xl">    {/* 1rem */}
<div className="rounded-full">   {/* 9999px */}

// Specific corners
<div className="rounded-t-lg">
<div className="rounded-r-lg">
<div className="rounded-b-lg">
<div className="rounded-l-lg">
```

### Box Shadow
```tsx
<div className="shadow-sm">
<div className="shadow">
<div className="shadow-md">
<div className="shadow-lg">
<div className="shadow-xl">
<div className="shadow-2xl">
<div className="shadow-none">

// Ring (focus outline)
<button className="focus:ring-2 focus:ring-primary focus:ring-offset-2">
```

## Responsive Design

### Breakpoints
```
sm   640px    @media (min-width: 640px)
md   768px    @media (min-width: 768px)
lg   1024px   @media (min-width: 1024px)
xl   1280px   @media (min-width: 1280px)
2xl  1536px   @media (min-width: 1536px)
```

### Usage
```tsx
// Mobile-first approach
<div className="
  flex flex-col           /* mobile: column */
  md:flex-row             /* tablet+: row */
  gap-4
  md:gap-8                /* larger gap on tablet+ */
">
  <div className="
    w-full                /* mobile: full width */
    md:w-1/2              /* tablet+: half width */
  ">
```

## Transitions & Animations

### Transitions
```tsx
<button className="
  transition-colors duration-200 ease-in-out
  hover:bg-primary
">

// Specific properties
<div className="transition-all">
<div className="transition-opacity">
<div className="transition-transform">

// Duration
<div className="duration-75">
<div className="duration-150">
<div className="duration-300">
<div className="duration-500">

// Timing
<div className="ease-linear">
<div className="ease-in">
<div className="ease-out">
<div className="ease-in-out">
```

### Transforms
```tsx
<div className="scale-100 hover:scale-105">
<div className="rotate-0 hover:rotate-12">
<div className="translate-x-0 hover:translate-x-2">
<div className="transform hover:scale-110">
```

### Animations
```tsx
<div className="animate-spin">
<div className="animate-ping">
<div className="animate-pulse">
<div className="animate-bounce">
```

## Interactive States

### Hover, Focus, Active
```tsx
<button className="
  bg-primary
  hover:bg-primary/90
  focus:outline-none
  focus:ring-2
  focus:ring-ring
  focus:ring-offset-2
  active:scale-95
">
```

### Disabled
```tsx
<button className="
  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:pointer-events-none
">
```

### Group & Peer
```tsx
// Group hover
<div className="group">
  <div className="group-hover:text-primary">
    Hover parent to change me
  </div>
</div>

// Peer (sibling)
<input className="peer" />
<p className="peer-invalid:text-red-500">
  Error message
</p>
```

## Dark Mode

### Class Strategy
```tsx
// Manual toggle
<html className="dark">

// Component example
<div className="
  bg-white dark:bg-slate-900
  text-gray-900 dark:text-gray-100
  border-gray-200 dark:border-gray-800
">
```

## Utility Patterns

### cn() Helper
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage
<div className={cn(
  "flex items-center gap-2",
  isActive && "bg-primary",
  disabled && "opacity-50",
  className
)} />
```

### Common Component Classes

```tsx
// Card
const cardClasses = "rounded-lg border bg-card text-card-foreground shadow-sm"

// Button
const buttonClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"

// Input
const inputClasses = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

// Badge
const badgeClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"
```

## Best Practices

1. **Mobile-First** - Start with mobile styles, add breakpoint modifiers
2. **Use cn()** - For conditional and mergeable classes
3. **CSS Variables** - For theming and dark mode
4. **Semantic Colors** - Use `primary`, `secondary`, etc. over raw colors
5. **Consistent Spacing** - Stick to the spacing scale
6. **Group Related** - Keep related utilities together
7. **Extract Components** - Don't repeat long class strings
