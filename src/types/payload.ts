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
  phone?: string;
  phoneLabel?: string;
  email?: string;
  emailLabel?: string;
  address?: {
    street?: string;
    city?: string;
    province?: string;
    cap?: string;
    country?: string;
  };
  vatNumber?: string;
  fiscalCode?: string;
}

export interface Header {
  logo?: {
    image?: Media;
    darkImage?: Media;
    text?: string;
    link?: string;
  };
  navigation?: Menu | string;
  cta?: {
    enabled?: boolean;
    text?: string;
    link?: string;
    style?: "primary" | "secondary" | "outline" | "gradient";
  };
  contactInfo?: {
    phone?: string;
    phoneLabel?: string;
    email?: string;
    emailLabel?: string;
  };
  socialLinks?: SocialLink[];
  settings?: {
    sticky?: boolean;
    transparent?: boolean;
    showLanguageSwitcher?: boolean;
    showSearch?: boolean;
  };
}

export interface Footer {
  logo?: {
    image?: Media;
    text?: string;
    description?: string;
  };
  columns?: FooterColumn[];
  contactInfo?: ContactInfo;
  socialLinks?: SocialLink[];
  newsletter?: {
    enabled?: boolean;
    title?: string;
    description?: string;
    buttonText?: string;
    placeholderText?: string;
  };
  cta?: {
    enabled?: boolean;
    text?: string;
    link?: string;
    style?: "primary" | "secondary" | "outline" | "gradient";
  };
  bottomBar?: {
    copyright?: string;
    legalLinks?: {
      label: string;
      url: string;
    }[];
    paymentMethods?: string[];
  };
}

export interface FooterColumn {
  title: string;
  menu?: Menu | string;
  links?: {
    label: string;
    url: string;
    page?: Page | string;
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
