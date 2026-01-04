/**
 * Fallback Data
 * Static data used when CMS is not available
 * This ensures the site works even without the CMS connection
 */

import type {
  HomePage,
  ServiziPage,
  AziendaPage,
  ContattiPage,
  ProntoInterventoPage,
  Header,
  Footer,
} from "@/types/payload";

// ============================================================================
// Homepage Fallback Data
// ============================================================================

export const fallbackHomePage: HomePage = {
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
        imageUrl: "/img/hero-1.webp",
        ctaText: "Scopri di più",
        ctaHref: "/servizi#industriale",
      },
      {
        title: "Costruzioni",
        subtitle: "CIVILI",
        description:
          "Il nostro Know how ci permette di realizzare qualsiasi progetto dal disegno all'opera finita, rispettando le esigenze del committente.",
        imageUrl: "/img/hero-2.webp",
        ctaText: "Scopri di più",
        ctaHref: "/servizi#residenziale",
      },
      {
        title: "Ristrutturazione",
        subtitle: "E RESTAURO",
        description:
          "Possiamo ristrutturare e restaurare immobili, in base alle esigenze tecniche richieste.",
        imageUrl: "/img/hero-3.webp",
        ctaText: "Scopri di più",
        ctaHref: "/servizi",
      },
    ],
    secondaryCta: { label: "Richiedi Preventivo", href: "/contatti" },
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

// ============================================================================
// Servizi Page Fallback Data
// ============================================================================

export const fallbackServiziPage: ServiziPage = {
  seo: {
    title: "Servizi - BIEMME 2",
    description:
      "Edilizia residenziale, industriale, scavi e pronto intervento. Scopri tutti i nostri servizi.",
  },
  hero: {
    badge: "Esperienza e Solidità",
    title: "Le Nostre Specializzazioni",
    description:
      "Eccellenza tecnica e potenza operativa al servizio di ogni progetto costruttivo.",
  },
  servicesSection: {
    services: [
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
      },
      {
        title: "Edilizia Industriale",
        slug: "edilizia-industriale",
        excerpt:
          "Strutture in acciaio, capannoni logistici e impianti produttivi. Garantiamo rapidità di esecuzione e massima affidabilità strutturale per supportare la crescita del tuo business.",
        icon: "factory",
      },
      {
        title: "Scavi e Movimento Terra",
        slug: "scavi-movimento-terra",
        excerpt:
          "Preparazione del terreno, sbancamenti e fondazioni. Il nostro parco macchine avanzato ci permette di operare su qualsiasi terreno con precisione millimetrica e in totale sicurezza.",
        icon: "landscape",
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
      },
    ],
  },
  pillarsSection: {
    subtitle: "Il Nostro Approccio",
    title: "I 4 Pilastri del Servizio",
    pillars: [
      {
        title: "IL RISPETTO DELLE NORME",
        description:
          "Biemme 2 applica normative di sicurezza e tutela ambientale nei progetti residenziali, industriali e commerciali. Studiamo continuamente tecnologie per energie rinnovabili, impianti fotovoltaici, geotermici e soluzioni di efficienza energetica.",
        icon: "gavel",
      },
      {
        title: "PROGRAMMAZIONE",
        description:
          "La qualità di una costruzione non è un obiettivo semplice, per questo occorre anche una buona programmazione. Il nostro approccio include ingegnerizzazione del progetto, analisi tecnico-economica, identificazione di criticità e piani di manutenzione programmata.",
        icon: "calendar_month",
      },
      {
        title: "SUPPORTO TECNICO",
        description:
          "Biemme 2 offre assistenza prima, durante e dopo la costruzione. Ci posizioniamo come partner sincero e affidabile, fornendo autentica garanzia del buon esito del prodotto edilizio.",
        icon: "support_agent",
      },
      {
        title: "EDILIZIA RESIDENZIALE PRIVATA",
        description:
          "La nostra specialità con oltre 200 appartamenti realizzati in 10 anni. Focus su strutture solide, estetica curata, finiture dettagliate, tecnologia avanzata e mantenibilità nel tempo.",
        icon: "apartment",
      },
    ],
  },
  benefitsSection: {
    subtitle: "PERCHÉ BIEMME 2",
    title: "I Vantaggi di Sceglierci",
    benefits: [
      {
        title: "Riduzione Consumi",
        description:
          "Tecnologie innovative per riscaldamento, isolamento termico e acustico, domotica integrata per il massimo risparmio energetico.",
        icon: "bolt",
      },
      {
        title: "Benessere",
        description:
          "Distribuzione funzionale degli spazi, architettura di qualità, coinvolgimento di professionisti territoriali per garantire il massimo comfort abitativo.",
        icon: "spa",
      },
      {
        title: "Durabilità",
        description:
          "Materiali e tecnologie di qualità superiore. Tutte le certificazioni sono disponibili al cliente per garantire la massima trasparenza.",
        icon: "verified",
      },
    ],
  },
  machinerySection: {
    title: "Il Nostro Parco Macchine",
    machinery: [
      {
        name: "Manitou MRT 2150",
        description:
          "Sollevatore telescopico rotativo per movimentazione carichi e lavorazioni in quota ad alta precisione.",
        icon: "agriculture",
      },
      {
        name: "Volvo FM370 & Autogrù",
        description:
          "Autocarro pesante con gru integrata per trasporto materiali e posizionamento in cantiere.",
        icon: "local_shipping",
      },
      {
        name: "Volvo ECR 58",
        description:
          "Escavatore compatto cingolato, ideale per scavi di fondazione e lavori in spazi ristretti.",
        icon: "construction",
      },
      {
        name: "Komatsu PC 14R",
        description:
          "Miniescavatore ultra-compatto per ristrutturazioni e interventi di precisione.",
        icon: "handyman",
      },
    ],
  },
  ctaSection: {
    title: "Pronto a Costruire il Futuro?",
    description:
      "Contattaci per discutere il tuo progetto e ricevere un preventivo personalizzato.",
    buttonLabel: "Richiedi Preventivo",
    buttonHref: "/contatti",
  },
};

// ============================================================================
// Azienda Page Fallback Data
// ============================================================================

export const fallbackAziendaPage: AziendaPage = {
  seo: {
    title: "Chi Siamo - BIEMME 2",
    description:
      "Scopri la storia, i valori e il team di BIEMME 2. Oltre 30 anni di esperienza nel settore edilizio.",
  },
  hero: {
    badge: "La Nostra Identità",
    title: "Chi Siamo",
    description:
      "COSTRUTTORI PER PASSIONE, PROFESSIONISTI PER SCELTA. Da oltre 30 anni trasformiamo idee in edifici solidi e duraturi.",
  },
  storiaSection: {
    title: "La Nostra Storia",
    description:
      "Un percorso di crescita costante, guidato dalla passione per l'edilizia di qualità.",
    timeline: [
      {
        year: "1990",
        title: "Fondazione",
        description:
          "Nasce Biemme 2 per volontà dei soci fondatori Giovanni Berta e Giuseppe Maffioletti, con l'obiettivo di portare qualità e rigore nel settore delle costruzioni industriali nel nord Italia.",
        icon: "foundation",
      },
      {
        year: "2005",
        title: "Nuova Sede",
        description:
          "Trasferimento nel nuovo polo industriale di 5000mq, permettendo l'acquisizione di grandi macchinari e l'espansione del team tecnico.",
        icon: "domain",
      },
      {
        year: "2024",
        title: "Espansione",
        description:
          "Ampliamento organico e nuove tecnologie. Biemme 2 apre le porte a progetti europei mantenendo le radici salde nel territorio.",
        icon: "rocket_launch",
      },
    ],
  },
  valoriSection: {
    title: "I Nostri Valori",
    values: [
      {
        title: "Passione",
        description:
          "La passione per il lavoro rappresenta al meglio lo spirito che muove la proprietà e le maestranze.",
        icon: "shield",
      },
      {
        title: "Efficienza",
        description:
          "Ogni progetto è una sfida che affrontiamo con dedizione e competenza, garantendo elevati standard qualitativi.",
        icon: "diamond",
      },
      {
        title: "Innovazione",
        description:
          "Migliorare il nostro territorio attraverso tecniche costruttive all'avanguardia e rispetto per l'ambiente.",
        icon: "eco",
      },
    ],
  },
  organigrammaSection: {
    title: "Organigramma",
    direzione: {
      title: "Direzione Generale",
      subtitle: "Strategia, Sviluppo & Controllo",
    },
    aree: [
      { title: "Area Tecnica", subtitle: "Progetti & Cantieri" },
      { title: "Amministrazione", subtitle: "Contabilità & Finanza" },
      { title: "Commerciale", subtitle: "Vendite & Clienti" },
    ],
  },
  teamSection: {
    title: "La Squadra",
    members: [
      {
        name: "Geom. Paolo Pini",
        role: "Geometra",
        bio: "Direzione Lavori\npini@biemme2.com\n3478881791",
        photo: {
          id: "photo-1",
          url: "/img/team/paolo-pini.webp",
          filename: "paolo-pini.webp",
          mimeType: "image/webp",
          filesize: 0,
        } as any,
      },
      {
        name: "Sabrina Bove",
        role: "Amministrazione",
        bio: "Impiegata amministrativa\namministrazione@biemme2.com",
        photo: {
          id: "photo-2",
          url: "/img/team/sabrina-bove.webp",
          filename: "sabrina-bove.webp",
          mimeType: "image/webp",
          filesize: 0,
        } as any,
      },
      {
        name: "Ketty Pozzoni",
        role: "Amministrazione",
        bio: "info@biemme2.com",
        photo: {
          id: "photo-3",
          url: "/img/team/ketty-pozzoni.webp",
          filename: "ketty-pozzoni.webp",
          mimeType: "image/webp",
          filesize: 0,
        } as any,
      },
      {
        name: "Giuseppe Sonzogni",
        role: "Geometra",
        bio: "Direzione lavori\nsonzogni@biemme2.com\n3486855615",
        photo: {
          id: "photo-4",
          url: "/img/team/giuseppe-sonzogni.webp",
          filename: "giuseppe-sonzogni.webp",
          mimeType: "image/webp",
          filesize: 0,
        } as any,
      },
      {
        name: "Giovanni Berta",
        role: "Commerciale",
        bio: "berta@biemme2.com\n3478881790",
        photo: {
          id: "photo-5",
          url: "/img/team/giovanni-berta.webp",
          filename: "giovanni-berta.webp",
          mimeType: "image/webp",
          filesize: 0,
        } as any,
      },
    ],
  },
  certificazioniSection: {
    title: "Qualità Certificata",
    description:
      "Operiamo secondo i più alti standard internazionali per garantire sicurezza, affidabilità e rispetto dell'ambiente.",
    certifications: [
      {
        name: "Attestazione SOA",
        description:
          "Qualificazione all'esecuzione di lavori pubblici per categorie e classifiche di importo illimitato.",
        icon: "workspace_premium",
      },
      {
        name: "ISO 9001:2015",
        description:
          "Sistema di gestione della qualità certificato per garantire la massima soddisfazione del cliente.",
        icon: "verified",
      },
      {
        name: "Sicurezza",
        description:
          "Rigoroso rispetto delle normative sulla sicurezza nei cantieri (D.Lgs 81/08).",
        icon: "health_and_safety",
      },
    ],
  },
};

// ============================================================================
// Contatti Page Fallback Data
// ============================================================================

export const fallbackContattiPage: ContattiPage = {
  seo: {
    title: "Contatti - BIEMME 2",
    description:
      "Contattaci per un preventivo gratuito. Siamo a Morengo (BG), disponibili per progetti in tutta la Lombardia.",
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
      { label: "Pronto Intervento", value: "pronto-intervento" },
      { label: "Altro", value: "altro" },
    ],
    submitLabel: "Invia Messaggio",
    successMessage:
      "Grazie per averci contattato! Ti risponderemo al più presto.",
  },
  mapSection: {
    title: "Dove Siamo",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2792.7!2d9.6883!3d45.5397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4781526c3a8eea3b%3A0x89a7e1e8d0e4f0c0!2sVia%20Bergamo%2C%2035%2C%2024050%20Morengo%20BG!5e0!3m2!1sit!2sit!4v1704000000000!5m2!1sit!2sit",
    coordinates: {
      lat: 45.5397,
      lng: 9.6883,
    },
  },
};

// ============================================================================
// Pronto Intervento Page Fallback Data
// ============================================================================

export const fallbackProntoInterventoPage: ProntoInterventoPage = {
  seo: {
    title: "Pronto Intervento H24 - BIEMME 2",
    description:
      "Servizio di pronto intervento edile 24 ore su 24. Interveniamo per emergenze idrauliche, strutturali e messe in sicurezza.",
  },
  hero: {
    badge: "Servizio Emergenze",
    title: "Pronto Intervento H24",
    description:
      "Siamo operativi 24 ore su 24, 7 giorni su 7, festivi inclusi. Il nostro team di professionisti è pronto a intervenire tempestivamente per qualsiasi emergenza edile.",
    phone: "+39 0363 958310",
    phoneLabel: "Chiama Ora",
    availability: "Disponibili 24/7, festivi inclusi",
  },
  emergencyServicesSection: {
    subtitle: "I Nostri Servizi",
    title: "Interventi di Emergenza",
    services: [
      {
        icon: "plumbing",
        title: "Pronto Intervento Idraulico",
        description:
          "Riparazione immediata di perdite, rotture tubazioni, ingorghi e allagamenti.",
        features: [
          { text: "Riparazione perdite" },
          { text: "Sblocco scarichi" },
          { text: "Intervento allagamenti" },
        ],
      },
      {
        icon: "foundation",
        title: "Puntellatura e Stabilizzazione",
        description:
          "Messa in sicurezza di strutture pericolanti, cedimenti e crolli parziali.",
        features: [
          { text: "Puntellamenti urgenti" },
          { text: "Rinforzo strutturale" },
          { text: "Messa in sicurezza" },
        ],
      },
      {
        icon: "roofing",
        title: "Messa in Sicurezza Tetti",
        description:
          "Interventi rapidi per danni da maltempo, tegole rotte e infiltrazioni.",
        features: [
          { text: "Riparazione coperture" },
          { text: "Teli protettivi" },
          { text: "Bonifica infiltrazioni" },
        ],
      },
    ],
  },
  processSection: {
    title: "Come Funziona",
    steps: [
      {
        number: "01",
        icon: "call",
        title: "Chiamata",
        description: "Contattaci al nostro numero attivo 24/7",
      },
      {
        number: "02",
        icon: "location_on",
        title: "Sopralluogo",
        description: "Arriviamo sul posto in tempi rapidi",
      },
      {
        number: "03",
        icon: "build",
        title: "Intervento",
        description: "Eseguiamo la messa in sicurezza",
      },
      {
        number: "04",
        icon: "check_circle",
        title: "Soluzione",
        description: "Risolviamo il problema definitivamente",
      },
    ],
  },
  whyUsSection: {
    subtitle: "Perché Sceglierci",
    title: "Esperienza e Rapidità",
    description:
      "Con oltre 30 anni di esperienza, garantiamo interventi rapidi e professionali per ogni tipo di emergenza.",
    benefits: [
      {
        icon: "schedule",
        title: "Tempi Rapidi",
        description: "Intervento entro 2 ore dalla chiamata",
      },
      {
        icon: "verified",
        title: "Certificati",
        description: "Personale qualificato e assicurato",
      },
      {
        icon: "groups",
        title: "Team Esperto",
        description: "Professionisti con esperienza decennale",
      },
      {
        icon: "construction",
        title: "Attrezzatura Pro",
        description: "Mezzi e strumenti professionali",
      },
    ],
  },
  statsSection: {
    stats: [
      { value: "30+", label: "Anni di Esperienza" },
      { value: "24/7", label: "Sempre Operativi" },
      { value: "100%", label: "Clienti Soddisfatti" },
    ],
  },
  ctaSection: {
    title: "Hai un'Emergenza?",
    description:
      "Non aspettare, chiamaci subito. Il nostro team è pronto a intervenire.",
    phone: "+39 0363 958310",
    buttonLabel: "Chiama Ora",
  },
};

// ============================================================================
// Header/Footer Fallback Data
// ============================================================================

export const fallbackHeader: Header = {
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
    label: "Quotazione",
    href: "/contatti#form",
    phone: "+39 0363 958310",
  },
};

export const fallbackFooter: Footer = {
  companyInfo: {
    name: "BIEMME 2 S.r.l.",
    description:
      "Costruzioni edili dal 1990. Qualità, affidabilità e passione.",
  },
  contact: {
    address: "Via Cavalier Quarto Agliardi, 18",
    city: "24050 Morengo (BG)",
    phone: "+39 0363 958310",
    email: "info@biemme2.com",
    vatNumber: "01998580164",
  },
  columns: [
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
      ],
    },
  ],
  legal: {
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookie" },
    ],
  },
};
