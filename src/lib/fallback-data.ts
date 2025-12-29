/**
 * Fallback Data
 * Static data used when CMS is not available
 * This ensures the site works even without the CMS connection
 */

import type {
  Feature,
  Stat,
  Highlight,
  Project,
  Timeline,
  Value,
  TeamMember,
  Certification,
  Service,
  Pillar,
  Benefit,
  Machinery,
  ContactInfo,
} from "@/types/payload";

// ============================================================================
// Homepage Fallback Data
// ============================================================================

export const fallbackFeatures: Feature[] = [
  {
    id: "feature-1",
    title: "Design e Costruzione",
    description:
      "Il nostro team, composto da professionisti del settore, avvalendosi di materiali di qualità e di tecniche costruttive all'avanguardia, garantisce l'esecuzione del progetto con i massimi livelli di qualità.",
    icon: "architecture",
    order: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "feature-2",
    title: "Restauro Ristrutturazione",
    description:
      "Nel corso degli anni sono stati numerosi i progetti di ristrutturazione e restauro realizzati su palazzi, edifici commerciali o abitazioni. Valorizzare un edificio è un compito che richiede il controllo completo delle attività operative.",
    icon: "home_repair_service",
    order: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "feature-3",
    title: "Rapidità Pronto Intervento",
    description:
      "Siamo in grado di offrire un servizio di pronto intervento immediato per urgenze, ad esempio rotture di tubazioni, ingorghi di scarichi, interventi che richiedono tempestività.",
    icon: "emergency",
    order: 3,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fallbackStats: Stat[] = [
  {
    id: "stat-1",
    value: "30",
    label: "Anni di Esperienza",
    suffix: "+",
    order: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "stat-2",
    value: "200",
    label: "Appartamenti Realizzati",
    suffix: "+",
    order: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "stat-3",
    value: "100",
    label: "Soddisfazione Clienti",
    suffix: "%",
    order: 3,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fallbackHighlights: Highlight[] = [
  {
    id: "highlight-1",
    title: "Appassionati",
    subtitle: "Amiamo ciò che costruiamo.",
    order: 1,
    featured: false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "highlight-2",
    title: "Onesti e Trasparenti",
    subtitle: "Chiarezza in ogni preventivo.",
    order: 2,
    featured: false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "highlight-3",
    title: "Sempre Disponibili",
    subtitle: "Il tuo partner di fiducia.",
    order: 3,
    featured: false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fallbackProjects: Project[] = [
  {
    id: "project-1",
    title: "Polo Logistico Verona",
    slug: "polo-logistico-verona",
    excerpt:
      "Realizzazione di una struttura logistica di 5000mq con tecniche di prefabbricazione avanzata.",
    category: "Industriale",
    order: 1,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "project-2",
    title: 'Complesso "Le Terrazze"',
    slug: "complesso-le-terrazze",
    excerpt:
      "Complesso residenziale di lusso classe A4, con finiture di pregio e domotica integrata.",
    category: "Residenziale",
    order: 2,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "project-3",
    title: "Viadotto Nord",
    slug: "viadotto-nord",
    excerpt:
      "Manutenzione straordinaria e rinforzo strutturale dei piloni portanti.",
    category: "Infrastrutture",
    order: 3,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "project-4",
    title: "Uffici Direzionali",
    slug: "uffici-direzionali",
    excerpt:
      "Riqualificazione completa di 1200mq di uffici con soluzioni open space moderne.",
    category: "Ristrutturazioni",
    order: 4,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ============================================================================
// Azienda Page Fallback Data
// ============================================================================

export const fallbackTimeline: Timeline[] = [
  {
    id: "timeline-1",
    year: "1990",
    title: "Fondazione",
    description:
      "Nasce Biemme 2 per volontà dei soci fondatori Giovanni Berta e Giuseppe Maffioletti, con l'obiettivo di portare qualità e rigore nel settore delle costruzioni industriali nel nord Italia.",
    icon: "foundation",
    order: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "timeline-2",
    year: "2005",
    title: "Nuova Sede",
    description:
      "Trasferimento nel nuovo polo industriale di 5000mq, permettendo l'acquisizione di grandi macchinari e l'espansione del team tecnico.",
    icon: "domain",
    order: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "timeline-3",
    year: "2024",
    title: "Espansione",
    description:
      "Ampliamento organico e nuove tecnologie. Biemme 2 apre le porte a progetti europei mantenendo le radici salde nel territorio.",
    icon: "rocket_launch",
    order: 3,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fallbackValues: Value[] = [
  {
    id: "value-1",
    title: "Passione",
    description:
      "La passione per il lavoro rappresenta al meglio lo spirito che muove la proprietà e le maestranze.",
    icon: "shield",
    order: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "value-2",
    title: "Efficienza",
    description:
      "Ogni progetto è una sfida che affrontiamo con dedizione e competenza, garantendo elevati standard qualitativi.",
    icon: "diamond",
    order: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "value-3",
    title: "Innovazione",
    description:
      "Migliorare il nostro territorio attraverso tecniche costruttive all'avanguardia e rispetto per l'ambiente.",
    icon: "eco",
    order: 3,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fallbackTeam: TeamMember[] = [
  {
    id: "team-1",
    name: "Geom. Paolo Pini",
    role: "Direzione Tecnica e Lavori",
    bio: "Responsabile della gestione operativa dei cantieri e del coordinamento tecnico. Garantisce che ogni progetto sia eseguito a regola d'arte.",
    order: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "team-2",
    name: "Sabrina Bove",
    role: "Amministrazione e Contabilità",
    bio: "Gestione amministrativa e contabile. Il punto di riferimento per la trasparenza fiscale e la gestione burocratica delle commesse.",
    order: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "team-3",
    name: "Squadre Operative",
    role: "Maestranze Specializzate",
    bio: "Operai e tecnici specializzati con anni di esperienza diretta in cantiere, formati per operare con i nostri macchinari avanzati.",
    order: 3,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fallbackCertifications: Certification[] = [
  {
    id: "cert-1",
    name: "ISO 9001:2015",
    description:
      "Certificazione Sistema di Gestione Qualità (LL-C Certification)",
    order: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cert-2",
    name: "CQOP SOA",
    description: "Attestazione per l'esecuzione di Opere Pubbliche (Cat. OG1)",
    order: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cert-3",
    name: "Sicurezza",
    description:
      "Rigoroso rispetto delle normative D.Lgs 81/08 in ogni cantiere",
    order: 3,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ============================================================================
// Servizi Page Fallback Data
// ============================================================================

export const fallbackServices: Service[] = [
  {
    id: "service-1",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "service-2",
    title: "Edilizia Industriale",
    slug: "edilizia-industriale",
    excerpt:
      "Strutture in acciaio, capannoni logistici e impianti produttivi. Garantiamo rapidità di esecuzione e massima affidabilità strutturale per supportare la crescita del tuo business.",
    icon: "factory",
    order: 2,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "service-3",
    title: "Scavi e Movimento Terra",
    slug: "scavi-movimento-terra",
    excerpt:
      "Preparazione del terreno, sbancamenti e fondazioni. Il nostro parco macchine avanzato ci permette di operare su qualsiasi terreno con precisione millimetrica e in totale sicurezza.",
    icon: "landscape",
    order: 3,
    featured: true,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "service-4",
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fallbackPillars: Pillar[] = [
  {
    id: "pillar-1",
    title: "IL RISPETTO DELLE NORME",
    description:
      "Biemme 2 applica normative di sicurezza e tutela ambientale nei progetti residenziali, industriali e commerciali. Studiamo continuamente tecnologie per energie rinnovabili, impianti fotovoltaici, geotermici e soluzioni di efficienza energetica.",
    icon: "gavel",
    order: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "pillar-2",
    title: "PROGRAMMAZIONE",
    description:
      "La qualità di una costruzione non è un obiettivo semplice, per questo occorre anche una buona programmazione. Il nostro approccio include ingegnerizzazione del progetto, analisi tecnico-economica, identificazione di criticità e piani di manutenzione programmata.",
    icon: "calendar_month",
    order: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "pillar-3",
    title: "SUPPORTO TECNICO",
    description:
      "Biemme 2 offre assistenza prima, durante e dopo la costruzione. Ci posizioniamo come partner sincero e affidabile, fornendo autentica garanzia del buon esito del prodotto edilizio.",
    icon: "support_agent",
    order: 3,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "pillar-4",
    title: "EDILIZIA RESIDENZIALE PRIVATA",
    description:
      "La nostra specialità con oltre 200 appartamenti realizzati in 10 anni. Focus su strutture solide, estetica curata, finiture dettagliate, tecnologia avanzata e mantenibilità nel tempo.",
    icon: "apartment",
    order: 4,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fallbackBenefits: Benefit[] = [
  {
    id: "benefit-1",
    title: "Riduzione Consumi",
    description:
      "Tecnologie innovative per riscaldamento, isolamento termico e acustico, domotica integrata per il massimo risparmio energetico.",
    icon: "bolt",
    order: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "benefit-2",
    title: "Benessere",
    description:
      "Distribuzione funzionale degli spazi, architettura di qualità, coinvolgimento di professionisti territoriali per garantire il massimo comfort abitativo.",
    icon: "spa",
    order: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "benefit-3",
    title: "Durabilità",
    description:
      "Materiali e tecnologie di qualità superiore. Tutte le certificazioni sono disponibili al cliente per garantire la massima trasparenza.",
    icon: "verified",
    order: 3,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fallbackMachinery: Machinery[] = [
  {
    id: "machinery-1",
    name: "Manitou MRT 2150",
    description:
      "Sollevatore telescopico rotativo per movimentazione carichi e lavorazioni in quota ad alta precisione.",
    icon: "agriculture",
    order: 1,
    featured: false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "machinery-2",
    name: "Volvo FM370 & Autogrù",
    description:
      "Autocarro pesante con gru integrata per trasporto materiali e posizionamento in cantiere.",
    icon: "local_shipping",
    order: 2,
    featured: false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "machinery-3",
    name: "Volvo ECR 58",
    description:
      "Escavatore compatto cingolato, ideale per scavi di fondazione e lavori in spazi ristretti.",
    icon: "construction",
    order: 3,
    featured: false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "machinery-4",
    name: "Komatsu PC 14R",
    description:
      "Miniescavatore ultra-compatto per ristrutturazioni e interventi di precisione.",
    icon: "handyman",
    order: 4,
    featured: false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ============================================================================
// Contatti Page Fallback Data
// ============================================================================

export const fallbackContactInfo: ContactInfo = {
  phone: "+39 0363 958310",
  email: "info@biemme2.com",
  address: {
    street: "Via Agliardi Cavaliere Quarto, 18",
    city: "Morengo",
    province: "BG",
    cap: "24050",
  },
  vatNumber: "01998580164",
};

// ============================================================================
// Pronto Intervento Fallback
// ============================================================================

export const fallbackProntoInterventoService: Service = {
  id: "service-pronto-intervento",
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
  order: 1,
  featured: true,
  active: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// ============================================================================
// Header Fallback Data
// ============================================================================

export type NavItem = {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
};

export const fallbackNavItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/azienda", label: "Azienda" },
  {
    href: "/servizi",
    label: "Servizi",
    dropdown: [
      { href: "/servizi", label: "Tutti i Servizi" },
      { href: "/pronto-intervento", label: "Pronto Intervento" },
    ],
  },
  { href: "/contatti", label: "Contatti" },
];

export const fallbackHeaderCta = {
  text: "Quotazione",
  href: "/contatti#form",
};

// ============================================================================
// Footer Fallback Data
// ============================================================================

export const fallbackFooterColumns = [
  {
    title: "Servizi",
    links: [
      { label: "Edilizia Residenziale", href: "/servizi#residenziale" },
      { label: "Edilizia Industriale", href: "/servizi#industriale" },
      { label: "Scavi e Movimento Terra", href: "/servizi#scavi" },
      { label: "Pronto Intervento", href: "/pronto-intervento" },
    ],
  },
  {
    title: "Azienda",
    links: [
      { label: "Chi Siamo", href: "/azienda" },
      { label: "Il Team", href: "/azienda#team" },
      { label: "Certificazioni", href: "/azienda#certificazioni" },
      { label: "Progetti", href: "/azienda#progetti" },
    ],
  },
];

export const fallbackFooterLegal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookie" },
];
