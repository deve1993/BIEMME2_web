# BIEMME 2 - Sito Web Aziendale

Sito web corporate per **BIEMME 2**, azienda leader nel settore delle costruzioni edili con sede a Morengo (BG), attiva da oltre 30 anni nel campo dell'edilizia residenziale, industriale e dei servizi di pronto intervento.

## Panoramica

Questo progetto implementa un sito web moderno e performante utilizzando le tecnologie web piu avanzate del 2024/2025. Il sito presenta i servizi dell'azienda, la storia, il team e permette ai clienti di richiedere preventivi.

### Caratteristiche Principali

- **Design Moderno e Responsive** - Layout ottimizzato per tutti i dispositivi
- **Hero Slider Dinamico** - Presentazione visiva dei servizi principali
- **Pagine Informative** - Homepage, Azienda, Servizi, Contatti, Pronto Intervento
- **Fallback Data System** - Funzionamento garantito anche senza CMS
- **Ottimizzazione Immagini** - Utilizzo di Next.js Image per performance ottimali
- **SEO Ready** - Struttura ottimizzata per i motori di ricerca

## Tech Stack

| Tecnologia       | Versione | Scopo                          |
| ---------------- | -------- | ------------------------------ |
| **Next.js**      | 15.x     | Framework React con App Router |
| **React**        | 19.x     | Libreria UI                    |
| **TypeScript**   | 5.x      | Type safety                    |
| **Tailwind CSS** | 4.x      | Styling utility-first          |
| **Payload CMS**  | 3.x      | Content Management (opzionale) |
| **Sharp**        | 0.34.x   | Ottimizzazione immagini        |

## Struttura del Progetto

```
BIEMME2_web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (site)/            # Route group per il sito
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── azienda/       # Pagina Azienda
│   │   │   ├── servizi/       # Pagina Servizi
│   │   │   ├── contatti/      # Pagina Contatti
│   │   │   ├── privacy/       # Privacy Policy
│   │   │   └── cookie/        # Cookie Policy
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Stili globali
│   ├── components/
│   │   ├── layout/            # Header, Footer, Logo
│   │   └── ui/                # Componenti riutilizzabili
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── GradientText.tsx
│   │       ├── HeroSlider.tsx
│   │       └── SectionTitle.tsx
│   ├── lib/
│   │   ├── data/              # Funzioni fetch dati
│   │   ├── fallback-data.ts   # Dati statici di fallback
│   │   └── payload.ts         # Configurazione CMS
│   └── types/
│       └── payload.ts         # TypeScript types
├── public/                     # Asset statici
├── Context/                    # Documentazione di contesto
└── .claude/                    # Configurazione Claude Code
```

## Installazione

### Prerequisiti

- Node.js 18.x o superiore
- npm, yarn, pnpm o bun

### Setup

1. **Clona il repository**

   ```bash
   git clone https://github.com/deve1993/BIEMME2_web.git
   cd BIEMME2_web
   ```

2. **Installa le dipendenze**

   ```bash
   npm install
   # oppure
   bun install
   ```

3. **Configura le variabili d'ambiente**

   Crea un file `.env.local` con le seguenti variabili (opzionali per il CMS):

   ```env
   PAYLOAD_CMS_URL=http://localhost:3001
   ```

4. **Avvia il server di sviluppo**

   ```bash
   npm run dev
   # oppure
   bun dev
   ```

5. **Apri il browser**

   Naviga su [http://localhost:3000](http://localhost:3000)

## Scripts Disponibili

| Comando         | Descrizione                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Avvia il server di sviluppo   |
| `npm run build` | Crea la build di produzione   |
| `npm run start` | Avvia il server di produzione |
| `npm run lint`  | Esegue ESLint                 |

## Pagine del Sito

### Homepage (`/`)

- Hero slider con presentazione servizi
- Sezione features con icone Material Symbols
- Statistiche aziendali (30+ anni, 200+ appartamenti, 100% soddisfazione)
- Portfolio progetti recenti
- Call-to-action per preventivi

### Azienda (`/azienda`)

- Storia aziendale con timeline interattiva
- Valori aziendali (Passione, Efficienza, Innovazione)
- Team e organico
- Certificazioni (ISO 9001, CQOP SOA)

### Servizi (`/servizi`)

- Edilizia Residenziale
- Edilizia Industriale
- Scavi e Movimento Terra
- Specializzazione Zootecnica
- Parco macchine e attrezzature

### Contatti (`/contatti`)

- Form di contatto
- Informazioni di contatto
- Mappa sede

### Legal

- Privacy Policy (`/privacy`)
- Cookie Policy (`/cookie`)

## Architettura Dati

Il sito supporta due modalita di funzionamento:

### 1. Con Payload CMS (Consigliato)

I dati vengono recuperati dinamicamente dal CMS, permettendo aggiornamenti senza deploy.

### 2. Modalita Fallback (Default)

Se il CMS non e disponibile, il sito utilizza dati statici definiti in `src/lib/fallback-data.ts`, garantendo sempre il funzionamento del sito.

## Componenti UI

### Button

Pulsante con varianti: `primary`, `outline`, `ghost`, `gradient`

### Card

Card container con header, content e footer opzionali

### SectionTitle

Titolo sezione con subtitle, titolo principale e descrizione

### HeroSlider

Slider hero con navigazione e autoplay

### GradientText

Testo con gradiente personalizzabile

## Design System

### Colori Principali

- **Primary**: Gradiente rosso/borgogna (#9E3A34 -> #5C2A2A)
- **Background**: Bianco/Grigio chiaro
- **Text**: Nero/Grigio scuro

### Tipografia

- Font: System fonts con fallback
- Heading: Font-light, uppercase, tracking-wide
- Body: Font-light, leading-relaxed

### Icone

Utilizzo di [Material Symbols](https://fonts.google.com/icons) per tutte le icone

## Contatti Azienda

**BIEMME 2 Srl**

- **Indirizzo**: Via Cavalier Quarto Agliardi, 18 - 24050 Morengo (BG)
- **Telefono**: +39 0363 958310 / +39 346 3157500
- **Email**: info@biemme2.com
- **P.IVA**: 03002360166

## Licenza

Questo progetto e proprietario di BIEMME 2 Srl. Tutti i diritti riservati.

---

Sviluppato con Next.js 15, React 19 e Tailwind CSS 4.
