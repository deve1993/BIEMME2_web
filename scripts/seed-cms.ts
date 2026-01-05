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

import { getPayload } from "payload";
import config from "../payload.config";

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
    title: "Rapidità Pronto Intervento",
    subtitle: "SERVIZIO DI PRONTO INTERVENTO",
    description:
      "Siamo in grado di offrire un servizio di pronto intervento immediato per urgenze, ad esempio rotture di tubazioni, ingorghi di scarichi, interventi che richiedono tempestività.",
    icon: "emergency",
    order: 3,
    active: true,
  },
];

const stats = [
  {
    value: "30",
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
    year: "1990",
    title: "Fondazione",
    description:
      "Nasce Biemme 2 per volontà dei soci fondatori Giovanni Berta e Giuseppe Maffioletti, con l'obiettivo di portare qualità e rigore nel settore delle costruzioni industriali nel nord Italia.",
    icon: "foundation",
    order: 1,
    active: true,
  },
  {
    year: "2005",
    title: "Nuova Sede",
    description:
      "Trasferimento nel nuovo polo industriale di 5000mq, permettendo l'acquisizione di grandi macchinari e l'espansione del team tecnico.",
    icon: "domain",
    order: 2,
    active: true,
  },
  {
    year: "2024",
    title: "Espansione",
    description:
      "Ampliamento organico e nuove tecnologie. Biemme 2 apre le porte a progetti europei mantenendo le radici salde nel territorio.",
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
    name: "Sabrina Bove",
    role: "Amministrazione",
    bio: "Impiegata amministrativa\namministrazione@biemme2.com",
    order: 2,
    active: true,
  },
  {
    name: "Ketty Pozzoni",
    role: "Amministrazione",
    bio: "info@biemme2.com",
    order: 3,
    active: true,
  },
  {
    name: "Giuseppe Sonzogni",
    role: "Geometra",
    bio: "Direzione lavori\nsonzogni@biemme2.com\n3486855615",
    order: 4,
    active: true,
  },
  {
    name: "Giovanni Berta",
    role: "Commerciale",
    bio: "berta@biemme2.com\n3478881790",
    order: 5,
    active: true,
  },
];

const certifications = [
  {
    name: "ISO 9001:2015",
    description:
      "Certificazione Sistema di Gestione Qualità (LL-C Certification)",
    order: 1,
    active: true,
  },
  {
    name: "CQOP SOA",
    description: "Attestazione per l'esecuzione di Opere Pubbliche (Cat. OG1)",
    order: 2,
    active: true,
  },
  {
    name: "Sicurezza",
    description:
      "Rigoroso rispetto delle normative D.Lgs 81/08 in ogni cantiere",
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
    title: "Pronto Intervento H24",
    slug: "pronto-intervento",
    description:
      "Servizio di emergenza attivo 24 ore su 24, festivi inclusi. Interveniamo tempestivamente per rotture tubazioni, ingorghi, cedimenti strutturali e messe in sicurezza urgenti.",
    icon: "emergency_home",
    features: [
      { text: "Reperibilità 24/7" },
      { text: "Intervento immediato" },
      { text: "Riparazione guasti idrici" },
      { text: "Puntellazioni urgenti" },
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
    title: "EDILIZIA RESIDENZIALE PRIVATA",
    description:
      "La nostra specialità con oltre 200 appartamenti realizzati in 10 anni. Focus su strutture solide, estetica curata, finiture dettagliate, tecnologia avanzata e mantenibilità nel tempo.",
    icon: "apartment",
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
    name: "Manitou MRT 2150",
    description:
      "Sollevatore telescopico rotativo per movimentazione carichi e lavorazioni in quota ad alta precisione.",
    order: 1,
    active: true,
  },
  {
    name: "Volvo FM370 & Autogrù",
    description:
      "Autocarro pesante con gru integrata per trasporto materiali e posizionamento in cantiere.",
    order: 2,
    active: true,
  },
  {
    name: "Volvo ECR 58",
    description:
      "Escavatore compatto cingolato, ideale per scavi di fondazione e lavori in spazi ristretti.",
    order: 3,
    active: true,
  },
  {
    name: "Komatsu PC 14R",
    description:
      "Miniescavatore ultra-compatto per ristrutturazioni e interventi di precisione.",
    order: 4,
    active: true,
  },
];

// Homepage global data with hero slides
const homePageData = {
  seo: {
    title: "BIEMME 2 - Costruzioni Edili dal 1990",
    description:
      "Costruzioni edili, ristrutturazioni e pronto intervento. Oltre 30 anni di esperienza nel settore edilizio.",
  },
  heroSlider: {
    badge: "Dal 1990",
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
        title: "Rapidità Pronto Intervento",
        description:
          "Siamo in grado di offrire un servizio di pronto intervento immediato per urgenze, ad esempio rotture di tubazioni, ingorghi di scarichi, interventi che richiedono tempestività.",
        icon: "emergency",
      },
    ],
  },
  statsSection: {
    stats: [
      { value: "30", suffix: "+", label: "Anni di Esperienza" },
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
    { label: "Pronto Intervento", href: "/pronto-intervento" },
    { label: "Contatti", href: "/contatti" },
  ],
  cta: {
    label: "Contattaci",
    href: "/contatti",
    phone: "+39 0363 88288",
  },
};

const footerData = {
  companyInfo: {
    name: "BIEMME 2 S.r.l.",
    description:
      "Da oltre 30 anni costruiamo qualità nel territorio bergamasco. Edilizia residenziale, industriale, restauro e ristrutturazioni.",
  },
  contact: {
    address: "Via Bergamo, 35/37",
    city: "24050 Morengo (BG)",
    phone: "+39 0363 88288",
    email: "info@biemme2.com",
    vatNumber: "P.IVA 02481290165",
  },
  columns: [
    {
      title: "Azienda",
      links: [
        { label: "Chi Siamo", href: "/azienda" },
        { label: "Pronto Intervento", href: "/pronto-intervento" },
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

  // Seed all collections
  await seedCollection("features", features);
  await seedCollection("stats", stats);
  await seedCollection("highlights", highlights);
  await seedCollection("projects", projects);
  await seedCollection("timeline", timeline);
  await seedCollection("values", values);
  await seedCollection("team-members", team);
  await seedCollection("certifications", certifications);
  await seedCollection("services", services);
  await seedCollection("pillars", pillars);
  await seedCollection("benefits", benefits);
  await seedCollection("machinery", machinery);

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
