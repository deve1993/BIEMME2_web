/**
 * CMS Seed Script - Local API Version
 *
 * This script populates the Payload CMS with initial data using the Local API.
 * No HTTP requests - direct database access.
 *
 * Usage:
 *   npx tsx scripts/seed-cms.ts
 *
 * Make sure MongoDB is running and MONGODB_URI is set in .env.local
 */

// Load environment variables from .env.local BEFORE any other imports
import "dotenv/config";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

// Ensure .env.local is loaded
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Debug: verify MongoDB URI is loaded
const MONGODB_URI = process.env.MONGODB_URI;
console.log("MongoDB URI:", MONGODB_URI?.substring(0, 50) + "...");

if (!MONGODB_URI || MONGODB_URI.includes("localhost")) {
  console.error("ERROR: MongoDB URI not properly loaded from .env.local");
  console.error(
    "Please ensure .env.local contains MONGODB_URI with MongoDB Atlas connection string",
  );
  process.exit(1);
}

import { getPayload } from "payload";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

// Import collections and globals
import { Media } from "../src/collections/Media";
import { Users } from "../src/collections/Users";
import { Header } from "../src/globals/Header";
import { Footer } from "../src/globals/Footer";
import { HomePage } from "../src/globals/HomePage";
import { ServiziPage } from "../src/globals/ServiziPage";
import { AziendaPage } from "../src/globals/AziendaPage";
import { ContattiPage } from "../src/globals/ContattiPage";
import { PrivacyPage } from "../src/globals/PrivacyPage";
import { CookiePage } from "../src/globals/CookiePage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Build config with explicit MongoDB URI (no fallback to localhost)
const config = buildConfig({
  admin: {
    user: "users",
  },
  collections: [Media, Users],
  globals: [
    Header,
    Footer,
    HomePage,
    ServiziPage,
    AziendaPage,
    ContattiPage,
    PrivacyPage,
    CookiePage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "seed-script-secret",
  db: mongooseAdapter({
    url: MONGODB_URI, // Use the pre-loaded value, not process.env
    connectOptions: {
      serverSelectionTimeoutMS: 30000, // 30 seconds for Atlas
      connectTimeoutMS: 30000,
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "../src/types/payload-types.ts"),
  },
  sharp,
});

// ============================================================================
// SEED DATA - Extracted from existing pages
// ============================================================================

const features = [
  {
    title: "Design e Costruzione",
    subtitle: "CURIAMO DIRETTAMENTE OGNI FASE: DAL PROGETTO ALLA REALIZZAZIONE",
    description:
      "Il nostro team, composto da professionisti del settore, avvalendosi di materiali di qualità e di tecniche costruttive all'avanguardia, garantisce l'esecuzione del progetto con i massimi livelli di qualità.",
    icon: "architecture",
    order: 1,
    active: true,
  },
  {
    title: "Restauro Ristrutturazione",
    subtitle: "OFFRIAMO UN SERVIZIO COMPLETO DI RISTRUTTURAZIONE",
    description:
      "Nel corso degli anni sono stati numerosi i progetti di ristrutturazione e restauro realizzati su palazzi, edifici commerciali o abitazioni. Valorizzare un edificio è un compito che richiede il controllo completo delle attività operative.",
    icon: "home_repair_service",
    order: 2,
    active: true,
  },
  {
    title: "Rapidità Intervento",
    subtitle: "RAPIDITÀ INTERVENTO",
    description:
      "In caso di necessità possiamo offrire un intervento celere di valutazione attenta e professionale della situazione in essere, al fine di concordare l'intervento migliore in accordo con il cliente.",
    icon: "emergency",
    order: 3,
    active: true,
  },
];

const stats = [
  {
    value: "40",
    label: "Anni di Esperienza",
    suffix: "+",
    order: 1,
    active: true,
  },
  {
    value: "200",
    label: "Appartamenti Realizzati",
    suffix: "+",
    order: 2,
    active: true,
  },
  {
    value: "100",
    label: "Soddisfazione Clienti",
    suffix: "%",
    order: 3,
    active: true,
  },
];

const highlights = [
  {
    title: "Appassionati",
    description: "Amiamo ciò che costruiamo.",
    order: 1,
    active: true,
  },
  {
    title: "Onesti e Trasparenti",
    description: "Chiarezza in ogni preventivo.",
    order: 2,
    active: true,
  },
  {
    title: "Sempre Disponibili",
    description: "Il tuo partner di fiducia.",
    order: 3,
    active: true,
  },
];

const projects = [
  {
    title: "Polo Logistico Verona",
    slug: "polo-logistico-verona",
    description:
      "Realizzazione di una struttura logistica di 5000mq con tecniche di prefabbricazione avanzata.",
    category: "industriale" as const,
    order: 1,
    featured: true,
    active: true,
  },
  {
    title: 'Complesso "Le Terrazze"',
    slug: "complesso-le-terrazze",
    description:
      "Complesso residenziale di lusso classe A4, con finiture di pregio e domotica integrata.",
    category: "residenziale" as const,
    order: 2,
    featured: true,
    active: true,
  },
  {
    title: "Restauro Palazzo Storico",
    slug: "restauro-palazzo-storico",
    description:
      "Restauro conservativo di palazzo del XVII secolo con tecniche tradizionali.",
    category: "restauro" as const,
    order: 3,
    featured: true,
    active: true,
  },
  {
    title: "Uffici Direzionali",
    slug: "uffici-direzionali",
    description:
      "Riqualificazione completa di 1200mq di uffici con soluzioni open space moderne.",
    category: "ristrutturazione" as const,
    order: 4,
    featured: true,
    active: true,
  },
];

const timeline = [
  {
    year: "1986",
    title: "Fondazione",
    description:
      "Nasce Biemme 2 per volontà dei soci fondatori, tra i quali rimane tutt'oggi amministratore il sig. Giovanni Berta, con l'obiettivo di portare qualità e rigore nel settore delle costruzioni industriali nel nord Italia.",
    icon: "foundation",
    order: 1,
    active: true,
  },
  {
    year: "2000",
    title: "Nuova Sede",
    description:
      "Trasferimento nel nuovo insediamento produttivo di 4000 mq, permettendo l'acquisizione di grandi macchinari e l'espansione del team tecnico.",
    icon: "domain",
    order: 2,
    active: true,
  },
  {
    year: "2024",
    title: "Espansione",
    description:
      "Ampliamento organico e nuove tecnologie. Biemme 2 apre le porte a progetti innovativi mantenendo le radici salde nel territorio, caratterizzato da una forte cultura di professionalità nel campo dell'edilizia.",
    icon: "rocket_launch",
    order: 3,
    active: true,
  },
];

const values = [
  {
    title: "Passione",
    description:
      "La passione per il lavoro rappresenta al meglio lo spirito che muove la proprietà e le maestranze.",
    icon: "shield",
    order: 1,
    active: true,
  },
  {
    title: "Efficienza",
    description:
      "Ogni progetto è una sfida che affrontiamo con dedizione e competenza, garantendo elevati standard qualitativi.",
    icon: "diamond",
    order: 2,
    active: true,
  },
  {
    title: "Innovazione",
    description:
      "Migliorare il nostro territorio attraverso tecniche costruttive all'avanguardia e rispetto per l'ambiente.",
    icon: "eco",
    order: 3,
    active: true,
  },
];

const team = [
  {
    name: "Geom. Paolo Pini",
    role: "Geometra",
    bio: "Direzione Lavori\npini@biemme2.com\n3478881791",
    order: 1,
    active: true,
  },
  {
    name: "Ketty Pozzoni",
    role: "Amministrazione",
    bio: "info@biemme2.com",
    order: 2,
    active: true,
  },
  {
    name: "Giuseppe Sonzogni",
    role: "Geometra",
    bio: "Direzione lavori\nsonzogni@biemme2.com\n3486855615",
    order: 3,
    active: true,
  },
  {
    name: "Giovanni Berta",
    role: "Commerciale",
    bio: "berta@biemme2.com\n3478881790",
    order: 4,
    active: true,
  },
];

const certifications = [
  {
    name: "ISO 9001:2015",
    description:
      "N. 3925188 - Certificazione Sistema di Gestione Qualità (LL-C Certification)",
    order: 1,
    active: true,
  },
  {
    name: "CQOP SOA",
    description:
      "SOA OG 1 IV BIS N. 75284/10/00 - Attestazione per l'esecuzione di Opere Pubbliche",
    order: 2,
    active: true,
  },
  {
    name: "Sicurezza",
    description:
      "Rigoroso rispetto delle normative D.Lgs 81/08 in ogni cantiere. CASSA EDILE AWARDS 2025, premio riconosciuto a chi compete lealmente rispettando le regole, i contratti di lavoro e i lavoratori nel settore edile.",
    order: 3,
    active: true,
  },
];

const services = [
  {
    title: "Edilizia Residenziale",
    slug: "edilizia-residenziale",
    description:
      "Dalla progettazione alla consegna chiavi in mano. Realizziamo complessi residenziali moderni con un focus assoluto su efficienza energetica, materiali premium e design sostenibile.",
    icon: "home_work",
    features: [
      { text: "Certificazioni energetiche Classe A" },
      { text: "Finiture di alto pregio" },
      { text: "Gestione completa del cantiere" },
    ],
    order: 1,
    active: true,
  },
  {
    title: "Edilizia Industriale",
    slug: "edilizia-industriale",
    description:
      "Strutture in acciaio, capannoni logistici e impianti produttivi. Garantiamo rapidità di esecuzione e massima affidabilità strutturale per supportare la crescita del tuo business.",
    icon: "factory",
    order: 2,
    active: true,
  },
  {
    title: "Scavi e Movimento Terra",
    slug: "scavi-movimento-terra",
    description:
      "Preparazione del terreno, sbancamenti e fondazioni. Il nostro parco macchine avanzato ci permette di operare su qualsiasi terreno con precisione millimetrica e in totale sicurezza.",
    icon: "landscape",
    order: 3,
    active: true,
  },
  {
    title: "Specializzazione in Ambito Zootecnico",
    slug: "zootecnico",
    description:
      "Negli anni ci siamo specializzati nella costruzione e ristrutturazione di stalle e di tutte le infrastrutture connesse alla vita e al funzionamento di un'azienda agricola.",
    icon: "agriculture",
    features: [
      { text: "Costruzione stalle" },
      { text: "Ristrutturazione edifici rurali" },
      { text: "Infrastrutture agricole" },
      { text: "Impianti zootecnici" },
    ],
    order: 4,
    active: true,
  },
];

const pillars = [
  {
    title: "IL RISPETTO DELLE NORME",
    description:
      "Biemme 2 applica normative di sicurezza e tutela ambientale nei progetti residenziali, industriali e commerciali. Studiamo continuamente tecnologie per energie rinnovabili, impianti fotovoltaici, geotermici e soluzioni di efficienza energetica.",
    icon: "gavel",
    order: 1,
    active: true,
  },
  {
    title: "PROGRAMMAZIONE",
    description:
      "La qualità di una costruzione non è un obiettivo semplice, per questo occorre anche una buona programmazione. Il nostro approccio include ingegnerizzazione del progetto, analisi tecnico-economica, identificazione di criticità e piani di manutenzione programmata.",
    icon: "calendar_month",
    order: 2,
    active: true,
  },
  {
    title: "SUPPORTO TECNICO",
    description:
      "Biemme 2 offre assistenza prima, durante e dopo la costruzione. Ci posizioniamo come partner sincero e affidabile, fornendo autentica garanzia del buon esito del prodotto edilizio.",
    icon: "support_agent",
    order: 3,
    active: true,
  },
  {
    title: "AZIONE AD AMPIO RAGGIO",
    description:
      "Dall'appartamento alla villetta, dal capannone industriale alla stalla per allevamenti zootecnici, negli anni abbiamo maturato competenze diversificate e creato squadre specializzate nei diversi ambiti di costruzione.",
    icon: "diversity_3",
    order: 4,
    active: true,
  },
];

const benefits = [
  {
    title: "Riduzione Consumi",
    description:
      "Tecnologie innovative per riscaldamento, isolamento termico e acustico, domotica integrata per il massimo risparmio energetico.",
    icon: "bolt",
    order: 1,
    active: true,
  },
  {
    title: "Benessere",
    description:
      "Distribuzione funzionale degli spazi, architettura di qualità, coinvolgimento di professionisti territoriali per garantire il massimo comfort abitativo.",
    icon: "spa",
    order: 2,
    active: true,
  },
  {
    title: "Durabilità",
    description:
      "Materiali e tecnologie di qualità superiore. Tutte le certificazioni sono disponibili al cliente per garantire la massima trasparenza.",
    icon: "verified",
    order: 3,
    active: true,
  },
];

const machinery = [
  {
    name: "MANITOU MRT 2260 + MT 625 H + MT 420 H",
    description:
      "Sollevatori telescopici rotativi per movimentazione carichi e lavorazioni in quota ad alta precisione.",
    order: 1,
    active: true,
  },
  {
    name: "VT 43 R",
    description:
      "Autogrù per trasporto materiali e posizionamento in cantiere.",
    order: 2,
    active: true,
  },
  {
    name: "KOMATSU PC 80",
    description:
      "Escavatore compatto cingolato, ideale per scavi di fondazione e lavori in spazi ristretti.",
    order: 3,
    active: true,
  },
  {
    name: "KOMATSU PC 18 (x2)",
    description:
      "Miniescavatori ultra-compatti per ristrutturazioni e interventi di precisione.",
    order: 4,
    active: true,
  },
];

// Homepage global data with hero slides
const homePageData = {
  seo: {
    title: "BIEMME 2 - Costruzioni Edili dal 1986",
    description:
      "Costruzioni edili, ristrutturazioni e pronto intervento. Oltre 40 anni di esperienza nel settore edilizio.",
  },
  heroSlider: {
    badge: "Dal 1986",
    slides: [
      {
        title: "Costruzioni",
        subtitle: "INDUSTRIALI",
        description:
          "La nostra esperienza e la nostra competenza ci permette di realizzare progetti industriali di ogni dimensione e complessità.",
        imageUrl: "/img/hero-1-opt.webp",
        ctaText: "Scopri di più",
        ctaHref: "/servizi#industriale",
      },
      {
        title: "Costruzioni",
        subtitle: "CIVILI",
        description:
          "Il nostro Know how ci permette di realizzare qualsiasi progetto dal disegno all'opera finita, rispettando le esigenze del committente.",
        imageUrl: "/img/hero-2-opt.webp",
        ctaText: "Scopri di più",
        ctaHref: "/servizi#residenziale",
      },
      {
        title: "Ristrutturazione",
        subtitle: "E RESTAURO",
        description:
          "Possiamo ristrutturare e restaurare immobili, in base alle esigenze tecniche richieste.",
        imageUrl: "/img/hero-3-opt.webp",
        ctaText: "Scopri di più",
        ctaHref: "/servizi",
      },
    ],
    secondaryCta: {
      label: "Richiedi Preventivo",
      href: "/contatti",
    },
    autoplayInterval: 6000,
  },
  featuresSection: {
    subtitle: "I NOSTRI SERVIZI",
    title: "Quello che ti serve",
    description: "Soluzioni complete per ogni esigenza costruttiva.",
    features: [
      {
        title: "Design e Costruzione",
        description:
          "Il nostro team, composto da professionisti del settore, avvalendosi di materiali di qualità e di tecniche costruttive all'avanguardia, garantisce l'esecuzione del progetto con i massimi livelli di qualità.",
        icon: "architecture",
      },
      {
        title: "Restauro Ristrutturazione",
        description:
          "Nel corso degli anni sono stati numerosi i progetti di ristrutturazione e restauro realizzati su palazzi, edifici commerciali o abitazioni. Valorizzare un edificio è un compito che richiede il controllo completo delle attività operative.",
        icon: "home_repair_service",
      },
      {
        title: "Rapidità Intervento",
        description:
          "In caso di necessità possiamo offrire un intervento celere di valutazione attenta e professionale della situazione in essere, al fine di concordare l'intervento migliore in accordo con il cliente.",
        icon: "emergency",
      },
    ],
  },
  statsSection: {
    stats: [
      { value: "40", suffix: "+", label: "Anni di Esperienza" },
      { value: "200", suffix: "+", label: "Appartamenti Realizzati" },
      { value: "100", suffix: "%", label: "Soddisfazione Clienti" },
    ],
  },
  highlightsSection: {
    highlights: [
      { title: "Appassionati", subtitle: "Amiamo ciò che costruiamo." },
      {
        title: "Onesti e Trasparenti",
        subtitle: "Chiarezza in ogni preventivo.",
      },
      { title: "Sempre Disponibili", subtitle: "Il tuo partner di fiducia." },
    ],
  },
  ctaSection: {
    title: "Pronti a Costruire il Tuo Progetto?",
    description:
      "Contattaci oggi per una consulenza gratuita e scopri come possiamo realizzare la tua visione.",
    buttonLabel: "Contattaci Ora",
    buttonHref: "/contatti",
    phone: "+39 0363 958310",
  },
};

const headerData = {
  logo: {
    alt: "BIEMME 2",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Azienda", href: "/azienda" },
    { label: "Servizi", href: "/servizi" },
    { label: "Contatti", href: "/contatti" },
  ],
  cta: {
    label: "Contattaci",
    href: "/contatti",
    phone: "+39 0363958310",
  },
};

const footerData = {
  companyInfo: {
    name: "BIEMME 2 S.r.l.",
    description:
      "Da oltre 40 anni costruiamo qualità nel territorio bergamasco. Edilizia residenziale, industriale, restauro e ristrutturazioni.",
  },
  contact: {
    address: "Via Cav. Agliardi, 18",
    city: "24050 Morengo (BG)",
    phone: "+39 0363958310",
    mobilePhone: "+39 3463157500",
    email: "info@biemme2.com",
    vatNumber: "P.IVA 03002360166",
  },
  columns: [
    {
      title: "Azienda",
      links: [
        { label: "Chi Siamo", href: "/azienda" },
        { label: "Servizi", href: "/servizi" },
        { label: "Contatti", href: "/contatti" },
      ],
    },
  ],
  legal: {
    copyright: "BIEMME 2 S.r.l. Tutti i diritti riservati.",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookie" },
    ],
  },
};

// Contatti Page Global Data
const contattiPageData = {
  seo: {
    title: "Contatti - BIEMME 2",
    description:
      "Contattaci per un preventivo gratuito. Siamo a Morengo (BG), disponibili per progetti in tutta la Lombardia. Tel: +39 0363 958310 / +39 346 3157500.",
  },
  hero: {
    badge: "Parla con noi",
    title: "Resta in Contatto",
    description:
      "Siamo sempre disponibili per discutere il tuo progetto. Contattaci per una consulenza gratuita.",
  },
  contactInfo: {
    sedeTitle: "Sede Principale",
    address: "Via Cavalier Quarto Agliardi, 18",
    city: "24050 Morengo (BG)",
    telefonoTitle: "Telefono",
    phone: "+39 0363 958310",
    mobilePhone: "+39 346 3157500",
    emailTitle: "Email",
    email: "info@biemme2.com",
    orari: "Lun-Ven, 8:00 - 18:00",
  },
  formSection: {
    title: "Inviaci un messaggio",
    servizi: [
      { label: "Edilizia Residenziale", value: "edilizia-residenziale" },
      { label: "Edilizia Industriale", value: "edilizia-industriale" },
      { label: "Scavi e Movimento Terra", value: "scavi-movimento-terra" },
      { label: "Altro", value: "altro" },
    ],
    submitLabel: "Invia Messaggio",
    successMessage:
      "Grazie per averci contattato! Ti risponderemo al più presto.",
  },
  mapSection: {
    title: "Dove Siamo",
    embedUrl:
      "https://maps.google.com/maps?q=Via+Cavalier+Quarto+Agliardi+18,+24050+Morengo+BG,+Italia&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
};

// Privacy Page Global Data
const privacyPageData = {
  seo: {
    title: "Privacy Policy | BIEMME 2 Costruzioni",
    description:
      "Informativa sulla privacy di BIEMME 2 S.r.l. ai sensi del GDPR (Regolamento UE 2016/679).",
  },
  header: {
    badge: "Informativa Legale",
    title: "Privacy Policy",
    subtitle:
      "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)",
    lastUpdate: "2024-12-01",
  },
  companyInfo: {
    name: "BIEMME 2 S.r.l.",
    address: "Via Cav. Agliardi, 18 - 24050 Morengo (BG)",
    vatNumber: "03002360166",
    email: "info@biemme2.com",
    phone: "+39 0363958310",
  },
  sections: [],
};

// Cookie Page Global Data
const cookiePageData = {
  seo: {
    title: "Cookie Policy | BIEMME 2 Costruzioni",
    description:
      "Informativa sui cookie utilizzati dal sito BIEMME 2 S.r.l. ai sensi del GDPR e della normativa italiana.",
  },
  header: {
    badge: "Informativa Legale",
    title: "Cookie Policy",
    subtitle:
      "Informativa sull'utilizzo dei cookie ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR) e del Provvedimento del Garante Privacy n. 229/2014",
    lastUpdate: "2024-12-01",
  },
  companyInfo: {
    name: "BIEMME 2 S.r.l.",
    website: "www.biemme2.com",
    email: "info@biemme2.com",
  },
  cookieTypes: [
    {
      category: "Cookie Tecnici (Necessari)",
      description:
        "Questi cookie sono essenziali per il corretto funzionamento del sito web. Non possono essere disattivati nei nostri sistemi.",
      requiresConsent: false,
      cookies: [
        {
          name: "session_id",
          purpose: "Gestione della sessione utente",
          duration: "Sessione",
          provider: "Prima parte",
        },
        {
          name: "csrf_token",
          purpose: "Protezione contro attacchi CSRF",
          duration: "Sessione",
          provider: "Prima parte",
        },
        {
          name: "cookie_consent",
          purpose: "Memorizza le preferenze sui cookie",
          duration: "12 mesi",
          provider: "Prima parte",
        },
      ],
    },
    {
      category: "Cookie Analitici",
      description:
        "Questi cookie ci permettono di contare le visite e le fonti di traffico per misurare e migliorare le prestazioni del nostro sito.",
      requiresConsent: true,
      cookies: [
        {
          name: "_ga",
          purpose: "Distingue gli utenti (Google Analytics)",
          duration: "2 anni",
          provider: "Google LLC",
        },
        {
          name: "_ga_*",
          purpose: "Mantiene lo stato della sessione (GA4)",
          duration: "2 anni",
          provider: "Google LLC",
        },
        {
          name: "_gid",
          purpose: "Distingue gli utenti",
          duration: "24 ore",
          provider: "Google LLC",
        },
      ],
    },
    {
      category: "Cookie di Funzionalità",
      description:
        "Questi cookie permettono al sito di fornire funzionalità avanzate e personalizzazione, come la memorizzazione delle preferenze.",
      requiresConsent: true,
      cookies: [
        {
          name: "theme_preference",
          purpose: "Memorizza la preferenza tema chiaro/scuro",
          duration: "1 anno",
          provider: "Prima parte",
        },
        {
          name: "language",
          purpose: "Memorizza la lingua preferita",
          duration: "1 anno",
          provider: "Prima parte",
        },
      ],
    },
  ],
  thirdPartyServices: [
    {
      name: "Google Analytics",
      privacyUrl: "https://policies.google.com/privacy",
    },
    {
      name: "Google Maps",
      privacyUrl: "https://policies.google.com/privacy",
    },
  ],
  browserLinks: [
    {
      browser: "Google Chrome",
      url: "https://support.google.com/chrome/answer/95647",
    },
    {
      browser: "Mozilla Firefox",
      url: "https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie",
    },
    {
      browser: "Apple Safari",
      url: "https://support.apple.com/it-it/guide/safari/sfri11471/mac",
    },
    {
      browser: "Microsoft Edge",
      url: "https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
    },
  ],
};

// ============================================================================
// SEED FUNCTION
// ============================================================================

async function seedCMS() {
  console.log("=".repeat(60));
  console.log("Starting CMS Seed with Local API...");
  console.log("=".repeat(60));

  const payload = await getPayload({ config });

  // Helper function to create documents
  async function seedCollection<T extends Record<string, unknown>>(
    collectionSlug: string,
    data: T[],
  ) {
    console.log(`\n--- Seeding ${collectionSlug} ---`);
    for (const item of data) {
      try {
        const result = await payload.create({
          collection: collectionSlug as never,
          data: item as never,
        });
        console.log(`Created ${collectionSlug}:`, result.id);
      } catch (error) {
        console.error(`Error creating ${collectionSlug}:`, error);
      }
    }
  }

  // Note: Collections like features, stats, highlights, etc. are no longer used
  // as all data is now stored in Globals. Keeping the seedCollection helper
  // for potential future use.

  // Seed globals
  console.log("\n--- Seeding HomePage Global ---");
  try {
    await payload.updateGlobal({
      slug: "home-page",
      data: homePageData as never,
    });
    console.log("HomePage global updated with hero slides");
  } catch (error) {
    console.error("Error updating home-page:", error);
  }

  console.log("\n--- Seeding Header Global ---");
  try {
    await payload.updateGlobal({
      slug: "header",
      data: headerData as never,
    });
    console.log("Header global updated");
  } catch (error) {
    console.error("Error updating header:", error);
  }

  console.log("\n--- Seeding Footer Global ---");
  try {
    await payload.updateGlobal({
      slug: "footer",
      data: footerData as never,
    });
    console.log("Footer global updated");
  } catch (error) {
    console.error("Error updating footer:", error);
  }

  console.log("\n--- Seeding Contatti Page Global ---");
  try {
    await payload.updateGlobal({
      slug: "contatti-page",
      data: contattiPageData as never,
    });
    console.log(
      "Contatti Page global updated with correct address and phone numbers",
    );
  } catch (error) {
    console.error("Error updating contatti-page:", error);
  }

  console.log("\n--- Seeding Privacy Page Global ---");
  try {
    await payload.updateGlobal({
      slug: "privacy-page",
      data: privacyPageData as never,
    });
    console.log("Privacy Page global updated");
  } catch (error) {
    console.error("Error updating privacy-page:", error);
  }

  console.log("\n--- Seeding Cookie Page Global ---");
  try {
    await payload.updateGlobal({
      slug: "cookie-page",
      data: cookiePageData as never,
    });
    console.log(
      "Cookie Page global updated with cookieTypes, thirdPartyServices, and browserLinks",
    );
  } catch (error) {
    console.error("Error updating cookie-page:", error);
  }

  // Create admin user if not exists
  console.log("\n--- Creating Admin User ---");
  try {
    const existingUsers = await payload.find({
      collection: "users",
      where: { email: { equals: "admin@biemme2.com" } },
    });

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: "users",
        data: {
          email: "admin@biemme2.com",
          password: "Admin123!",
          name: "Admin",
          role: "admin",
        },
      });
      console.log("Admin user created: admin@biemme2.com / Admin123!");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }

  console.log("\n" + "=".repeat(60));
  console.log("CMS Seed Complete!");
  console.log("=".repeat(60));

  process.exit(0);
}

// Run the seed
seedCMS().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
