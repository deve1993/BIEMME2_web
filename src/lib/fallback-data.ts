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
  PrivacyPage,
  CookiePage,
  HeaderData,
  Footer,
} from "@/types/payload";

// ============================================================================
// Homepage Fallback Data
// ============================================================================

export const fallbackHomePage: HomePage = {
  seo: {
    title: "BIEMME 2 - Costruzioni Edili dal 1986",
    description:
      "Costruzioni edili e ristrutturazioni. Oltre 40 anni di esperienza nel settore edilizio in Lombardia.",
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
        mobileImageUrl: "/img/hero-1-mobile.webp",
        ctaText: "Scopri di più",
        ctaHref: "/servizi#industriale",
      },
      {
        title: "Costruzioni",
        subtitle: "CIVILI",
        description:
          "Il nostro Know how ci permette di realizzare qualsiasi progetto dal disegno all'opera finita, rispettando le esigenze del committente.",
        imageUrl: "/img/hero-2-opt.webp",
        mobileImageUrl: "/img/hero-2-mobile.webp",
        ctaText: "Scopri di più",
        ctaHref: "/servizi#residenziale",
      },
      {
        title: "Ristrutturazione",
        subtitle: "E RESTAURO",
        description:
          "Possiamo ristrutturare e restaurare immobili, in base alle esigenze tecniche richieste.",
        imageUrl: "/img/hero-3-opt.webp",
        mobileImageUrl: "/img/hero-3-mobile.webp",
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
      {
        title: "Appassionati",
        subtitle: "Amiamo ciò che costruiamo.",
        icon: "gem",
      },
      {
        title: "Onesti e Trasparenti",
        subtitle: "Chiarezza in ogni preventivo.",
        icon: "shield",
      },
      {
        title: "Sempre Disponibili",
        subtitle: "Il tuo partner di fiducia.",
        icon: "users",
      },
    ],
  },
  ctaSection: {
    title: "Pronti a Costruire il Tuo Progetto?",
    description:
      "Contattaci oggi per una consulenza gratuita e scopri come possiamo realizzare la tua visione.",
    buttonLabel: "Contattaci Ora",
    buttonHref: "/contatti",
    phone: "+39 0363958310",
  },
};

// ============================================================================
// Servizi Page Fallback Data
// ============================================================================

export const fallbackServiziPage: ServiziPage = {
  seo: {
    title: "Servizi - BIEMME 2",
    description:
      "Edilizia residenziale, industriale, scavi e specializzazione zootecnica. Scopri tutti i nostri servizi.",
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
        title: "Specializzazione in Ambito Zootecnico",
        slug: "zootecnico",
        excerpt:
          "Negli anni ci siamo specializzati nella costruzione e ristrutturazione di stalle e di tutte le infrastrutture connesse alla vita e al funzionamento di un'azienda agricola.",
        icon: "agriculture",
        features: [
          { title: "Costruzione stalle" },
          { title: "Ristrutturazione edifici rurali" },
          { title: "Infrastrutture agricole" },
          { title: "Impianti zootecnici" },
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
        title: "AZIONE AD AMPIO RAGGIO",
        description:
          "Dall'appartamento alla villetta, dal capannone industriale alla stalla per allevamenti zootecnici, negli anni abbiamo maturato competenze diversificate e creato squadre specializzate nei diversi ambiti di costruzione.",
        icon: "diversity_3",
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
        name: "MANITOU MRT 2260 + MT 625 H + MT 420 H",
        description:
          "Sollevatori telescopici rotativi per movimentazione carichi e lavorazioni in quota ad alta precisione.",
        icon: "building2",
      },
      {
        name: "VT 43 R",
        description:
          "Autogrù per trasporto materiali e posizionamento in cantiere.",
        icon: "wrench",
      },
      {
        name: "KOMATSU PC 80",
        description:
          "Escavatore compatto cingolato, ideale per scavi di fondazione e lavori in spazi ristretti.",
        icon: "factory",
      },
      {
        name: "KOMATSU PC 18 (x2)",
        description:
          "Miniescavatori ultra-compatti per ristrutturazioni e interventi di precisione.",
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
      "Scopri la storia, i valori e il team di BIEMME 2. Oltre 40 anni di esperienza nel settore edilizio.",
  },
  hero: {
    badge: "La Nostra Identità",
    title: "Chi Siamo",
    description:
      "COSTRUTTORI PER PASSIONE, PROFESSIONISTI PER SCELTA. Da oltre 40 anni trasformiamo idee in edifici solidi e duraturi.",
  },
  storiaSection: {
    title: "La Nostra Storia",
    description:
      "Un percorso di crescita costante, guidato dalla passione per l'edilizia di qualità.",
    timeline: [
      {
        year: "1986",
        title: "Fondazione",
        description:
          "Nasce Biemme 2 per volontà dei soci fondatori, tra i quali rimane tutt'oggi amministratore il sig. Giovanni Berta, con l'obiettivo di portare qualità e rigore nel settore delle costruzioni industriali nel nord Italia.",
        icon: "foundation",
      },
      {
        year: "2000",
        title: "Nuova Sede",
        description:
          "Trasferimento nel nuovo insediamento produttivo di 4000 mq, permettendo l'acquisizione di grandi macchinari e l'espansione del team tecnico.",
        icon: "domain",
      },
      {
        year: "2024",
        title: "Espansione",
        description:
          "Ampliamento organico e nuove tecnologie. Biemme 2 apre le porte a progetti innovativi mantenendo le radici salde nel territorio, caratterizzato da una forte cultura di professionalità nel campo dell'edilizia.",
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
          "OG 1 Classe IV-BIS · N. 75284/10/00 · Valida fino al 15/12/2026",
        icon: "workspace_premium",
        imageUrl: "/img/cert-soa.webp",
      },
      {
        name: "ISO 9001:2015",
        description:
          "N. 3925188 · Costruzione di edifici · Scadenza 07/11/2028",
        icon: "verified",
        imageUrl: "/img/cert-iso-9001.webp",
      },
      {
        name: "Cassa Edile Awards 2025",
        description:
          "Categorie SPRINT e FAIR PLAY · Edil Cassa Bergamo",
        icon: "health_and_safety",
        imageUrl: "/img/cert-cassa-edile.webp",
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
    address: "Via Cav. Agliardi, 18",
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
    coordinates: {
      lat: 45.5426,
      lng: 9.6903,
    },
  },
};

// ============================================================================
// Header/Footer Fallback Data
// ============================================================================

export const fallbackHeader: HeaderData = {
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
    label: "Quotazione",
    href: "/contatti#form",
    phone: "+39 0363958310",
  },
};

export const fallbackFooter: Footer = {
  companyInfo: {
    name: "BIEMME 2 S.r.l.",
    description:
      "Costruzioni edili dal 1986. Qualità, affidabilità e passione.",
  },
  contact: {
    address: "Via Cav. Agliardi, 18",
    city: "24050 Morengo (BG)",
    phone: "+39 0363958310",
    mobilePhone: "+39 3463157500",
    email: "info@biemme2.com",
    vatNumber: "03002360166",
  },
  columns: [
    {
      title: "Azienda",
      links: [
        { label: "Chi Siamo", href: "/azienda" },
        { label: "Contatti", href: "/contatti" },
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

// ============================================================================
// Privacy Page Fallback Data
// ============================================================================

export const fallbackPrivacyPage: PrivacyPage = {
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

// ============================================================================
// Cookie Page Fallback Data
// ============================================================================

export const fallbackCookiePage: CookiePage = {
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
