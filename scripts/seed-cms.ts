/**
 * CMS Seed Script
 *
 * This script populates the Payload CMS with initial data from the existing
 * hardcoded content in the website.
 *
 * Usage:
 *   npx tsx scripts/seed-cms.ts
 *
 * Make sure your CMS is running at the URL specified in CMS_URL
 * and the tenant slug is correctly set in TENANT_SLUG.
 */

import "dotenv/config";

const CMS_URL = process.env.CMS_URL ?? "http://localhost:3000";
const TENANT_SLUG = process.env.TENANT_SLUG ?? "biemme2";

// Headers for authenticated requests
const headers = {
  "Content-Type": "application/json",
  "x-tenant-slug": TENANT_SLUG,
};

async function postToCMS<T>(
  endpoint: string,
  data: Record<string, unknown>,
): Promise<T | null> {
  try {
    const response = await fetch(`${CMS_URL}/api${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Error creating ${endpoint}:`, response.status, text);
      return null;
    }

    const result = await response.json();
    console.log(`Created ${endpoint}:`, result.doc?.id ?? result.id);
    return result.doc ?? result;
  } catch (error) {
    console.error(`Failed to create ${endpoint}:`, error);
    return null;
  }
}

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
    subtitle: "Amiamo ciò che costruiamo.",
    order: 1,
    active: true,
  },
  {
    title: "Onesti e Trasparenti",
    subtitle: "Chiarezza in ogni preventivo.",
    order: 2,
    active: true,
  },
  {
    title: "Sempre Disponibili",
    subtitle: "Il tuo partner di fiducia.",
    order: 3,
    active: true,
  },
];

const projects = [
  {
    title: "Polo Logistico Verona",
    slug: "polo-logistico-verona",
    excerpt:
      "Realizzazione di una struttura logistica di 5000mq con tecniche di prefabbricazione avanzata.",
    category: "Industriale",
    order: 1,
    featured: true,
    active: true,
  },
  {
    title: 'Complesso "Le Terrazze"',
    slug: "complesso-le-terrazze",
    excerpt:
      "Complesso residenziale di lusso classe A4, con finiture di pregio e domotica integrata.",
    category: "Residenziale",
    order: 2,
    featured: true,
    active: true,
  },
  {
    title: "Viadotto Nord",
    slug: "viadotto-nord",
    excerpt:
      "Manutenzione straordinaria e rinforzo strutturale dei piloni portanti.",
    category: "Infrastrutture",
    order: 3,
    featured: true,
    active: true,
  },
  {
    title: "Uffici Direzionali",
    slug: "uffici-direzionali",
    excerpt:
      "Riqualificazione completa di 1200mq di uffici con soluzioni open space moderne.",
    category: "Ristrutturazioni",
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
    role: "Direzione Tecnica e Lavori",
    bio: "Responsabile della gestione operativa dei cantieri e del coordinamento tecnico. Garantisce che ogni progetto sia eseguito a regola d'arte.",
    order: 1,
    active: true,
  },
  {
    name: "Sabrina Bove",
    role: "Amministrazione e Contabilità",
    bio: "Gestione amministrativa e contabile. Il punto di riferimento per la trasparenza fiscale e la gestione burocratica delle commesse.",
    order: 2,
    active: true,
  },
  {
    name: "Squadre Operative",
    role: "Maestranze Specializzate",
    bio: "Operai e tecnici specializzati con anni di esperienza diretta in cantiere, formati per operare con i nostri macchinari avanzati.",
    order: 3,
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
    excerpt:
      "Dalla progettazione alla consegna chiavi in mano. Realizziamo complessi residenziali moderni con un focus assoluto su efficienza energetica, materiali premium e design sostenibile.",
    icon: "home_work",
    features: [
      { title: "Certificazioni energetiche Classe A" },
      { title: "Finiture di alto pregio" },
      { title: "Gestione completa del cantiere" },
    ],
    order: 1,
    featured: true,
    active: true,
  },
  {
    title: "Edilizia Industriale",
    slug: "edilizia-industriale",
    excerpt:
      "Strutture in acciaio, capannoni logistici e impianti produttivi. Garantiamo rapidità di esecuzione e massima affidabilità strutturale per supportare la crescita del tuo business.",
    icon: "factory",
    order: 2,
    featured: true,
    active: true,
  },
  {
    title: "Scavi e Movimento Terra",
    slug: "scavi-movimento-terra",
    excerpt:
      "Preparazione del terreno, sbancamenti e fondazioni. Il nostro parco macchine avanzato ci permette di operare su qualsiasi terreno con precisione millimetrica e in totale sicurezza.",
    icon: "landscape",
    order: 3,
    featured: true,
    active: true,
  },
  {
    title: "Pronto Intervento H24",
    slug: "pronto-intervento",
    excerpt:
      "Servizio di emergenza attivo 24 ore su 24, festivi inclusi. Interveniamo tempestivamente per rotture tubazioni, ingorghi, cedimenti strutturali e messe in sicurezza urgenti.",
    icon: "emergency_home",
    features: [
      { title: "Reperibilità 24/7" },
      { title: "Intervento immediato" },
      { title: "Riparazione guasti idrici" },
      { title: "Puntellazioni urgenti" },
    ],
    order: 4,
    featured: true,
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
    icon: "agriculture",
    order: 1,
    active: true,
  },
  {
    name: "Volvo FM370 & Autogrù",
    description:
      "Autocarro pesante con gru integrata per trasporto materiali e posizionamento in cantiere.",
    icon: "local_shipping",
    order: 2,
    active: true,
  },
  {
    name: "Volvo ECR 58",
    description:
      "Escavatore compatto cingolato, ideale per scavi di fondazione e lavori in spazi ristretti.",
    icon: "construction",
    order: 3,
    active: true,
  },
  {
    name: "Komatsu PC 14R",
    description:
      "Miniescavatore ultra-compatto per ristrutturazioni e interventi di precisione.",
    icon: "handyman",
    order: 4,
    active: true,
  },
];

// ============================================================================
// SEED FUNCTION
// ============================================================================

async function seedCMS() {
  console.log("=".repeat(60));
  console.log("Starting CMS Seed...");
  console.log(`CMS URL: ${CMS_URL}`);
  console.log(`Tenant: ${TENANT_SLUG}`);
  console.log("=".repeat(60));

  // Seed Features
  console.log("\n--- Seeding Features ---");
  for (const feature of features) {
    await postToCMS("/features", feature);
  }

  // Seed Stats
  console.log("\n--- Seeding Stats ---");
  for (const stat of stats) {
    await postToCMS("/stats", stat);
  }

  // Seed Highlights
  console.log("\n--- Seeding Highlights ---");
  for (const highlight of highlights) {
    await postToCMS("/highlights", highlight);
  }

  // Seed Projects
  console.log("\n--- Seeding Projects ---");
  for (const project of projects) {
    await postToCMS("/projects", project);
  }

  // Seed Timeline
  console.log("\n--- Seeding Timeline ---");
  for (const item of timeline) {
    await postToCMS("/timeline", item);
  }

  // Seed Values
  console.log("\n--- Seeding Values ---");
  for (const value of values) {
    await postToCMS("/values", value);
  }

  // Seed Team
  console.log("\n--- Seeding Team Members ---");
  for (const member of team) {
    await postToCMS("/team-members", member);
  }

  // Seed Certifications
  console.log("\n--- Seeding Certifications ---");
  for (const cert of certifications) {
    await postToCMS("/certifications", cert);
  }

  // Seed Services
  console.log("\n--- Seeding Services ---");
  for (const service of services) {
    await postToCMS("/services", service);
  }

  // Seed Pillars
  console.log("\n--- Seeding Pillars ---");
  for (const pillar of pillars) {
    await postToCMS("/pillars", pillar);
  }

  // Seed Benefits
  console.log("\n--- Seeding Benefits ---");
  for (const benefit of benefits) {
    await postToCMS("/benefits", benefit);
  }

  // Seed Machinery
  console.log("\n--- Seeding Machinery ---");
  for (const machine of machinery) {
    await postToCMS("/machinery", machine);
  }

  console.log("\n" + "=".repeat(60));
  console.log("CMS Seed Complete!");
  console.log("=".repeat(60));
}

// Run the seed
seedCMS().catch(console.error);
