# Quality Check

Comando per eseguire un audit completo della qualita del codice.

## Uso

```
/quality-check [scope]
```

## Scope

- `all` - Audit completo
- `lint` - Solo ESLint/TypeScript
- `test` - Solo test
- `a11y` - Solo accessibilita
- `perf` - Solo performance
- `security` - Solo sicurezza

## Checks Eseguiti

### Lint & Types
```bash
npx tsc --noEmit
npx eslint src/ --ext .ts,.tsx
```

### Tests
```bash
npm test
npm run test:coverage
```

### Accessibilita
- WCAG 2.1 AA compliance
- ARIA labels
- Keyboard navigation
- Color contrast

### Performance
- Lighthouse audit
- Bundle size analysis
- Core Web Vitals
- Image optimization

### Security
- Dependency audit
- Environment variables check
- XSS vulnerabilities
- SQL injection patterns

## Output

```
Quality Report
==============

Lint:        ✅ Passed (0 errors, 2 warnings)
Types:       ✅ Passed
Tests:       ✅ 45/45 passed (92% coverage)
A11y:        ⚠️ 3 issues found
Performance: ✅ Score: 94
Security:    ✅ No vulnerabilities

Details:
- A11y: Missing alt text on 2 images
- A11y: Low contrast on footer links
- A11y: Missing label on search input

Recommendations:
1. Add alt text to images in Hero section
2. Increase contrast ratio on footer
3. Add aria-label to search input
```

## Agenti Coinvolti

- code-quality
- test-generator
- a11y-auditor
- performance-auditor
- security-scanner
