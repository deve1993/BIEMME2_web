/**
 * Payload CMS Types
 * Types for the headless CMS integration
 */

// ============================================================================
// Base Types
// ============================================================================

export interface Media {
  id: string;
  alt?: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width?: number;
  height?: number;
  url: string;
  thumbnailURL?: string;
  sizes?: {
    thumbnail?: MediaSize;
    card?: MediaSize;
    hero?: MediaSize;
  };
}

export interface MediaSize {
  url: string;
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  filename: string;
}

// ============================================================================
// SEO Types
// ============================================================================

export interface SEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: Media;
  noIndex?: boolean;
  noFollow?: boolean;
}

// ============================================================================
// Rich Text / Content Types
// ============================================================================

export interface RichTextNode {
  type: string;
  children?: RichTextNode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  relationTo?: string;
  value?: unknown;
}

export type RichText = RichTextNode[];

// ============================================================================
// Page Types
// ============================================================================

export interface Page {
  id: string;
  title: string;
  slug: string;
  content?: RichText;
  hero?: {
    type: "none" | "image" | "video";
    title?: string;
    subtitle?: string;
    description?: string;
    image?: Media;
    videoUrl?: string;
    ctaLabel?: string;
    ctaLink?: string;
  };
  sections?: PageSection[];
  seo?: SEO;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface PageSection {
  id: string;
  blockType: string;
  // Dynamic fields based on blockType
  [key: string]: unknown;
}

// ============================================================================
// Blog Types
// ============================================================================

export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image?: Media;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: RichText;
  featuredImage?: Media;
  categories?: Category[];
  tags?: Tag[];
  author?: Author;
  publishedAt?: string;
  seo?: SEO;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  id: string;
  name: string;
  email?: string;
  avatar?: Media;
  bio?: string;
}

// ============================================================================
// Navigation Types
// ============================================================================

export interface MenuItem {
  id: string;
  label: string;
  type: "link" | "page" | "dropdown";
  url?: string;
  page?: Page | string;
  openInNewTab?: boolean;
  children?: MenuItem[];
}

export interface Menu {
  id: string;
  title: string;
  slug: string;
  items: MenuItem[];
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Global Types
// ============================================================================

export interface SocialLink {
  platform:
    | "facebook"
    | "instagram"
    | "linkedin"
    | "twitter"
    | "youtube"
    | "tiktok"
    | "pinterest"
    | "whatsapp"
    | "telegram";
  url: string;
  label?: string;
}

export interface ContactInfo {
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
  pec?: string;
  vatNumber?: string;
}

export interface HeaderData {
  logo?: {
    image?: Media;
    alt?: string;
  };
  navigation?: {
    label: string;
    href: string;
    children?: {
      label: string;
      href: string;
      description?: string;
    }[];
  }[];
  cta?: {
    label?: string;
    href?: string;
    phone?: string;
  };
}

/** @deprecated Use HeaderData instead to avoid conflicts with React component */
export type Header = HeaderData;

export interface Footer {
  companyInfo?: {
    name?: string;
    description?: string;
    logo?: Media;
  };
  contact?: {
    address?: string;
    city?: string;
    phone?: string;
    mobilePhone?: string;
    email?: string;
    pec?: string;
    vatNumber?: string;
  };
  columns?: FooterColumn[];
  social?: {
    platform: "facebook" | "instagram" | "linkedin" | "youtube";
    url: string;
  }[];
  legal?: {
    copyright?: string;
    links?: {
      label: string;
      href: string;
    }[];
  };
}

export interface FooterColumn {
  title: string;
  links?: {
    label: string;
    href: string;
  }[];
}

// ============================================================================
// Content Collection Types
// ============================================================================

export interface Feature {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  image?: Media;
  link?: {
    enabled?: boolean;
    text?: string;
    url?: string;
  };
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  photo?: Media;
  email?: string;
  phone?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  description?: string;
  icon?: string;
  prefix?: string;
  suffix?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: RichText;
  icon?: string;
  image?: Media;
  gallery?: Media[];
  features?: {
    title: string;
    description?: string;
  }[];
  pricing?: {
    showPrice?: boolean;
    price?: string;
    priceDescription?: string;
  };
  cta?: {
    text?: string;
    link?: string;
  };
  seo?: SEO;
  order: number;
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Timeline {
  id: string;
  year: string;
  title: string;
  description?: string;
  image?: Media;
  icon?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Value {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  image?: Media;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  name: string;
  description?: string;
  issuer?: string;
  year?: string;
  expirationDate?: string;
  logo?: Media;
  document?: Media;
  link?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pillar {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  image?: Media;
  color?: string;
  link?: {
    enabled?: boolean;
    text?: string;
    url?: string;
  };
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Benefit {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  image?: Media;
  highlight?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Machinery {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category?: string;
  manufacturer?: string;
  model?: string;
  year?: string;
  image?: Media;
  gallery?: Media[];
  specifications?: {
    label: string;
    value: string;
  }[];
  capabilities?: string[];
  order: number;
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Highlight {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  type?: "generic" | "product" | "service" | "event" | "news" | "promo";
  icon?: string;
  image?: Media;
  value?: string;
  badge?: string;
  link?: {
    enabled?: boolean;
    text?: string;
    url?: string;
  };
  order: number;
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: RichText;
  client?: string;
  category?: string;
  tags?: string[];
  year?: string;
  duration?: string;
  featuredImage?: Media;
  gallery?: Media[];
  testimonial?: {
    enabled?: boolean;
    quote?: string;
    author?: string;
    role?: string;
  };
  results?: {
    metric: string;
    label: string;
  }[];
  link?: {
    enabled?: boolean;
    text?: string;
    url?: string;
  };
  seo?: SEO;
  order: number;
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: Media;
  companyLogo?: Media;
  rating?: number;
  featured: boolean;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer?: RichText;
  category?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface PayloadError {
  errors: {
    message: string;
    name: string;
  }[];
}

// ============================================================================
// Page Global Types
// ============================================================================

export interface HeroSlide {
  title: string;
  subtitle: string;
  description?: string;
  image?: Media;
  imageUrl?: string;
  mobileImageUrl?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface HomePage {
  seo?: {
    title?: string;
    description?: string;
    ogImage?: Media;
  };
  heroSlider?: {
    badge?: string;
    slides?: HeroSlide[];
    secondaryCta?: { label?: string; href?: string };
    autoplayInterval?: number;
  };
  featuresSection?: {
    subtitle?: string;
    title?: string;
    description?: string;
    features?: {
      title: string;
      description?: string;
      icon?: string;
    }[];
  };
  statsSection?: {
    stats?: {
      value: string;
      suffix?: string;
      prefix?: string;
      label: string;
    }[];
  };
  highlightsSection?: {
    highlights?: {
      title: string;
      subtitle?: string;
      icon?: string;
    }[];
  };
  ctaSection?: {
    title?: string;
    description?: string;
    buttonLabel?: string;
    buttonHref?: string;
    phone?: string;
  };
}

export interface ServiziPage {
  seo?: {
    title?: string;
    description?: string;
    ogImage?: Media;
  };
  hero?: {
    badge?: string;
    title?: string;
    description?: string;
  };
  servicesSection?: {
    services?: {
      title: string;
      slug: string;
      excerpt?: string;
      icon?: string;
      image?: Media;
      features?: { title: string }[];
    }[];
  };
  pillarsSection?: {
    subtitle?: string;
    title?: string;
    pillars?: {
      title: string;
      description?: string;
      icon?: string;
    }[];
  };
  benefitsSection?: {
    subtitle?: string;
    title?: string;
    benefits?: {
      title: string;
      description?: string;
      icon?: string;
    }[];
  };
  machinerySection?: {
    title?: string;
    description?: string;
    machinery?: {
      name: string;
      description?: string;
      icon?: string;
      image?: Media;
    }[];
  };
  ctaSection?: {
    title?: string;
    description?: string;
    buttonLabel?: string;
    buttonHref?: string;
  };
}

export interface AziendaPage {
  seo?: {
    title?: string;
    description?: string;
    ogImage?: Media;
  };
  hero?: {
    badge?: string;
    title?: string;
    description?: string;
  };
  storiaSection?: {
    title?: string;
    description?: string;
    timeline?: {
      year: string;
      title: string;
      description?: string;
      icon?: string;
    }[];
  };
  valoriSection?: {
    title?: string;
    values?: {
      title: string;
      description?: string;
      icon?: string;
    }[];
  };
  organigrammaSection?: {
    title?: string;
    direzione?: {
      title?: string;
      subtitle?: string;
    };
    aree?: {
      title: string;
      subtitle?: string;
    }[];
  };
  teamSection?: {
    title?: string;
    description?: string;
    members?: {
      name: string;
      role: string;
      bio?: string;
      photo?: Media;
    }[];
  };
  certificazioniSection?: {
    title?: string;
    description?: string;
    certifications?: {
      name: string;
      description?: string;
      icon?: string;
      image?: Media;
      imageUrl?: string;
    }[];
  };
}

export interface ContattiPage {
  seo?: {
    title?: string;
    description?: string;
    ogImage?: Media;
  };
  hero?: {
    badge?: string;
    title?: string;
    description?: string;
  };
  contactInfo?: {
    sedeTitle?: string;
    address?: string;
    city?: string;
    telefonoTitle?: string;
    phone?: string;
    mobilePhone?: string;
    emailTitle?: string;
    email?: string;
    orari?: string;
  };
  formSection?: {
    title?: string;
    description?: string;
    servizi?: {
      label: string;
      value: string;
    }[];
    submitLabel?: string;
    successMessage?: string;
  };
  mapSection?: {
    title?: string;
    embedUrl?: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
  };
}

export interface PrivacyPage {
  seo?: {
    title?: string;
    description?: string;
  };
  header?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    lastUpdate?: string;
  };
  companyInfo?: {
    name?: string;
    address?: string;
    vatNumber?: string;
    email?: string;
    phone?: string;
  };
  sections?: {
    title: string;
    content?: RichText;
  }[];
}

export interface CookiePage {
  seo?: {
    title?: string;
    description?: string;
  };
  header?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    lastUpdate?: string;
  };
  companyInfo?: {
    name?: string;
    website?: string;
    email?: string;
  };
  cookieTypes?: {
    category: string;
    description?: string;
    requiresConsent?: boolean;
    cookies?: {
      name: string;
      purpose?: string;
      duration?: string;
      provider?: string;
    }[];
  }[];
  thirdPartyServices?: {
    name: string;
    privacyUrl?: string;
  }[];
  browserLinks?: {
    browser: string;
    url: string;
  }[];
}
