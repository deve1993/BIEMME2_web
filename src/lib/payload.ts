/**
 * Payload CMS API Client
 * Headless CMS integration with multi-tenant support
 */

import type {
  Page,
  Post,
  Category,
  Tag,
  Menu,
  Media,
  Header,
  Footer,
  Feature,
  TeamMember,
  Stat,
  Service,
  Timeline,
  Value,
  Certification,
  Pillar,
  Benefit,
  Machinery,
  Highlight,
  Project,
  Testimonial,
  FAQ,
  PayloadResponse,
} from "@/types/payload";

// ============================================================================
// Configuration
// ============================================================================

const CMS_URL = process.env.CMS_URL || "http://localhost:3000";
const TENANT_SLUG = process.env.TENANT_SLUG || "biemme2";

// Default revalidation time (60 seconds)
const DEFAULT_REVALIDATE = 60;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Build API URL with query parameters
 */
function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>,
): string {
  const url = new URL(`${CMS_URL}/api${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Fetch data from Payload CMS with tenant header
 */
async function fetchFromCMS<T>(
  endpoint: string,
  options?: {
    params?: Record<string, string | number | boolean | undefined>;
    revalidate?: number;
  },
): Promise<T> {
  const url = buildUrl(endpoint, options?.params);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-tenant-slug": TENANT_SLUG,
    },
    next: {
      revalidate: options?.revalidate ?? DEFAULT_REVALIDATE,
    },
  });

  if (!response.ok) {
    throw new Error(`CMS API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get full media URL
 */
export function getMediaUrl(media: Media | string | undefined | null): string {
  if (!media) return "";

  if (typeof media === "string") {
    // If it's already a URL or relative path
    if (media.startsWith("http") || media.startsWith("/")) {
      return media.startsWith("http") ? media : `${CMS_URL}${media}`;
    }
    return `${CMS_URL}/media/${media}`;
  }

  // If it's a Media object
  if (media.url) {
    return media.url.startsWith("http") ? media.url : `${CMS_URL}${media.url}`;
  }

  return "";
}

/**
 * Get thumbnail URL from media
 */
export function getThumbnailUrl(
  media: Media | undefined | null,
  size: "thumbnail" | "card" | "hero" = "thumbnail",
): string {
  if (!media) return "";

  const sizeUrl = media.sizes?.[size]?.url;
  if (sizeUrl) {
    return sizeUrl.startsWith("http") ? sizeUrl : `${CMS_URL}${sizeUrl}`;
  }

  return getMediaUrl(media);
}

// ============================================================================
// Pages API
// ============================================================================

/**
 * Get all published pages
 */
export async function getPages(options?: {
  limit?: number;
  page?: number;
  locale?: string;
}): Promise<PayloadResponse<Page>> {
  return fetchFromCMS<PayloadResponse<Page>>("/pages", {
    params: {
      "where[status][equals]": "published",
      limit: options?.limit,
      page: options?.page,
      locale: options?.locale,
      depth: 2,
    },
  });
}

/**
 * Get a single page by slug
 */
export async function getPageBySlug(
  slug: string,
  options?: { locale?: string },
): Promise<Page | null> {
  const response = await fetchFromCMS<PayloadResponse<Page>>("/pages", {
    params: {
      "where[slug][equals]": slug,
      "where[status][equals]": "published",
      locale: options?.locale,
      depth: 2,
      limit: 1,
    },
  });

  return response.docs[0] || null;
}

/**
 * Get page by ID
 */
export async function getPageById(
  id: string,
  options?: { locale?: string },
): Promise<Page | null> {
  try {
    return await fetchFromCMS<Page>(`/pages/${id}`, {
      params: {
        locale: options?.locale,
        depth: 2,
      },
    });
  } catch {
    return null;
  }
}

// ============================================================================
// Posts API
// ============================================================================

/**
 * Get published posts with pagination
 */
export async function getPosts(options?: {
  limit?: number;
  page?: number;
  categorySlug?: string;
  tagSlug?: string;
  locale?: string;
}): Promise<PayloadResponse<Post>> {
  const params: Record<string, string | number | boolean | undefined> = {
    "where[status][equals]": "published",
    sort: "-publishedAt",
    limit: options?.limit ?? 10,
    page: options?.page,
    locale: options?.locale,
    depth: 2,
  };

  if (options?.categorySlug) {
    params["where[categories.slug][equals]"] = options.categorySlug;
  }

  if (options?.tagSlug) {
    params["where[tags.slug][equals]"] = options.tagSlug;
  }

  return fetchFromCMS<PayloadResponse<Post>>("/posts", { params });
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(
  slug: string,
  options?: { locale?: string },
): Promise<Post | null> {
  const response = await fetchFromCMS<PayloadResponse<Post>>("/posts", {
    params: {
      "where[slug][equals]": slug,
      "where[status][equals]": "published",
      locale: options?.locale,
      depth: 2,
      limit: 1,
    },
  });

  return response.docs[0] || null;
}

/**
 * Get related posts (same category, excluding current)
 */
export async function getRelatedPosts(
  post: Post,
  limit: number = 3,
): Promise<Post[]> {
  if (!post.categories?.length) return [];

  const categoryIds = post.categories.map((cat) =>
    typeof cat === "string" ? cat : cat.id,
  );

  const response = await fetchFromCMS<PayloadResponse<Post>>("/posts", {
    params: {
      "where[status][equals]": "published",
      "where[id][not_equals]": post.id,
      "where[categories][in]": categoryIds.join(","),
      sort: "-publishedAt",
      limit,
      depth: 1,
    },
  });

  return response.docs;
}

// ============================================================================
// Categories API
// ============================================================================

/**
 * Get all categories
 */
export async function getCategories(options?: {
  locale?: string;
}): Promise<Category[]> {
  const response = await fetchFromCMS<PayloadResponse<Category>>(
    "/categories",
    {
      params: {
        locale: options?.locale,
        limit: 100,
        depth: 1,
      },
    },
  );

  return response.docs;
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(
  slug: string,
  options?: { locale?: string },
): Promise<Category | null> {
  const response = await fetchFromCMS<PayloadResponse<Category>>(
    "/categories",
    {
      params: {
        "where[slug][equals]": slug,
        locale: options?.locale,
        limit: 1,
      },
    },
  );

  return response.docs[0] || null;
}

// ============================================================================
// Tags API
// ============================================================================

/**
 * Get all tags
 */
export async function getTags(options?: { locale?: string }): Promise<Tag[]> {
  const response = await fetchFromCMS<PayloadResponse<Tag>>("/tags", {
    params: {
      locale: options?.locale,
      limit: 100,
    },
  });

  return response.docs;
}

/**
 * Get tag by slug
 */
export async function getTagBySlug(
  slug: string,
  options?: { locale?: string },
): Promise<Tag | null> {
  const response = await fetchFromCMS<PayloadResponse<Tag>>("/tags", {
    params: {
      "where[slug][equals]": slug,
      locale: options?.locale,
      limit: 1,
    },
  });

  return response.docs[0] || null;
}

// ============================================================================
// Menus API
// ============================================================================

/**
 * Get menu by slug
 */
export async function getMenu(
  slug: string,
  options?: { locale?: string },
): Promise<Menu | null> {
  const response = await fetchFromCMS<PayloadResponse<Menu>>("/menus", {
    params: {
      "where[slug][equals]": slug,
      locale: options?.locale,
      depth: 3,
      limit: 1,
    },
  });

  return response.docs[0] || null;
}

/**
 * Get all menus
 */
export async function getMenus(options?: { locale?: string }): Promise<Menu[]> {
  const response = await fetchFromCMS<PayloadResponse<Menu>>("/menus", {
    params: {
      locale: options?.locale,
      depth: 3,
      limit: 50,
    },
  });

  return response.docs;
}

// ============================================================================
// Globals API
// ============================================================================

/**
 * Get header global
 */
export async function getHeader(options?: {
  locale?: string;
}): Promise<Header | null> {
  try {
    return await fetchFromCMS<Header>("/globals/header", {
      params: {
        locale: options?.locale,
        depth: 2,
      },
    });
  } catch {
    return null;
  }
}

/**
 * Get footer global
 */
export async function getFooter(options?: {
  locale?: string;
}): Promise<Footer | null> {
  try {
    return await fetchFromCMS<Footer>("/globals/footer", {
      params: {
        locale: options?.locale,
        depth: 2,
      },
    });
  } catch {
    return null;
  }
}

// ============================================================================
// Features API
// ============================================================================

/**
 * Get all features
 */
export async function getFeatures(options?: {
  limit?: number;
  active?: boolean;
  locale?: string;
}): Promise<Feature[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
    depth: 1,
  };

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  const response = await fetchFromCMS<PayloadResponse<Feature>>("/features", {
    params,
  });

  return response.docs;
}

// ============================================================================
// Team API
// ============================================================================

/**
 * Get all team members
 */
export async function getTeamMembers(options?: {
  limit?: number;
  active?: boolean;
  locale?: string;
}): Promise<TeamMember[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
    depth: 1,
  };

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  const response = await fetchFromCMS<PayloadResponse<TeamMember>>("/team", {
    params,
  });

  return response.docs;
}

// ============================================================================
// Stats API
// ============================================================================

/**
 * Get all stats
 */
export async function getStats(options?: {
  limit?: number;
  active?: boolean;
  locale?: string;
}): Promise<Stat[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
  };

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  const response = await fetchFromCMS<PayloadResponse<Stat>>("/stats", {
    params,
  });

  return response.docs;
}

// ============================================================================
// Services API
// ============================================================================

/**
 * Get all services
 */
export async function getServices(options?: {
  limit?: number;
  featured?: boolean;
  active?: boolean;
  locale?: string;
}): Promise<Service[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
    depth: 2,
  };

  if (options?.featured !== undefined) {
    params["where[featured][equals]"] = options.featured;
  }

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  const response = await fetchFromCMS<PayloadResponse<Service>>("/services", {
    params,
  });

  return response.docs;
}

/**
 * Get service by slug
 */
export async function getServiceBySlug(
  slug: string,
  options?: { locale?: string },
): Promise<Service | null> {
  const response = await fetchFromCMS<PayloadResponse<Service>>("/services", {
    params: {
      "where[slug][equals]": slug,
      locale: options?.locale,
      depth: 2,
      limit: 1,
    },
  });

  return response.docs[0] || null;
}

// ============================================================================
// Timeline API
// ============================================================================

/**
 * Get all timeline items
 */
export async function getTimeline(options?: {
  limit?: number;
  active?: boolean;
  locale?: string;
}): Promise<Timeline[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
    depth: 1,
  };

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  const response = await fetchFromCMS<PayloadResponse<Timeline>>("/timeline", {
    params,
  });

  return response.docs;
}

// ============================================================================
// Values API
// ============================================================================

/**
 * Get all values
 */
export async function getValues(options?: {
  limit?: number;
  active?: boolean;
  locale?: string;
}): Promise<Value[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
    depth: 1,
  };

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  const response = await fetchFromCMS<PayloadResponse<Value>>("/values", {
    params,
  });

  return response.docs;
}

// ============================================================================
// Certifications API
// ============================================================================

/**
 * Get all certifications
 */
export async function getCertifications(options?: {
  limit?: number;
  active?: boolean;
  locale?: string;
}): Promise<Certification[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
    depth: 1,
  };

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  const response = await fetchFromCMS<PayloadResponse<Certification>>(
    "/certifications",
    { params },
  );

  return response.docs;
}

// ============================================================================
// Pillars API
// ============================================================================

/**
 * Get all pillars
 */
export async function getPillars(options?: {
  limit?: number;
  active?: boolean;
  locale?: string;
}): Promise<Pillar[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
    depth: 1,
  };

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  const response = await fetchFromCMS<PayloadResponse<Pillar>>("/pillars", {
    params,
  });

  return response.docs;
}

// ============================================================================
// Benefits API
// ============================================================================

/**
 * Get all benefits
 */
export async function getBenefits(options?: {
  limit?: number;
  active?: boolean;
  locale?: string;
}): Promise<Benefit[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
    depth: 1,
  };

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  const response = await fetchFromCMS<PayloadResponse<Benefit>>("/benefits", {
    params,
  });

  return response.docs;
}

// ============================================================================
// Machinery API
// ============================================================================

/**
 * Get all machinery
 */
export async function getMachinery(options?: {
  limit?: number;
  featured?: boolean;
  active?: boolean;
  locale?: string;
}): Promise<Machinery[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
    depth: 1,
  };

  if (options?.featured !== undefined) {
    params["where[featured][equals]"] = options.featured;
  }

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  const response = await fetchFromCMS<PayloadResponse<Machinery>>(
    "/machinery",
    {
      params,
    },
  );

  return response.docs;
}

// ============================================================================
// Highlights API
// ============================================================================

/**
 * Get all highlights
 */
export async function getHighlights(options?: {
  limit?: number;
  featured?: boolean;
  active?: boolean;
  locale?: string;
}): Promise<Highlight[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
    depth: 1,
  };

  if (options?.featured !== undefined) {
    params["where[featured][equals]"] = options.featured;
  }

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  const response = await fetchFromCMS<PayloadResponse<Highlight>>(
    "/highlights",
    {
      params,
    },
  );

  return response.docs;
}

// ============================================================================
// Projects API
// ============================================================================

/**
 * Get all projects
 */
export async function getProjects(options?: {
  limit?: number;
  featured?: boolean;
  active?: boolean;
  category?: string;
  locale?: string;
}): Promise<Project[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
    depth: 2,
  };

  if (options?.featured !== undefined) {
    params["where[featured][equals]"] = options.featured;
  }

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  if (options?.category) {
    params["where[category][equals]"] = options.category;
  }

  const response = await fetchFromCMS<PayloadResponse<Project>>("/projects", {
    params,
  });

  return response.docs;
}

/**
 * Get project by slug
 */
export async function getProjectBySlug(
  slug: string,
  options?: { locale?: string },
): Promise<Project | null> {
  const response = await fetchFromCMS<PayloadResponse<Project>>("/projects", {
    params: {
      "where[slug][equals]": slug,
      locale: options?.locale,
      depth: 2,
      limit: 1,
    },
  });

  return response.docs[0] || null;
}

// ============================================================================
// Testimonials API
// ============================================================================

/**
 * Get all testimonials
 */
export async function getTestimonials(options?: {
  limit?: number;
  featured?: boolean;
  active?: boolean;
  locale?: string;
}): Promise<Testimonial[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
    depth: 1,
  };

  if (options?.featured !== undefined) {
    params["where[featured][equals]"] = options.featured;
  }

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  const response = await fetchFromCMS<PayloadResponse<Testimonial>>(
    "/testimonials",
    { params },
  );

  return response.docs;
}

// ============================================================================
// FAQ API
// ============================================================================

/**
 * Get all FAQs
 */
export async function getFAQs(options?: {
  limit?: number;
  category?: string;
  active?: boolean;
  locale?: string;
}): Promise<FAQ[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    sort: "order",
    limit: options?.limit ?? 100,
    locale: options?.locale,
    depth: 1,
  };

  if (options?.category) {
    params["where[category][equals]"] = options.category;
  }

  if (options?.active !== undefined) {
    params["where[active][equals]"] = options.active;
  }

  const response = await fetchFromCMS<PayloadResponse<FAQ>>("/faq", {
    params,
  });

  return response.docs;
}

// ============================================================================
// Search API
// ============================================================================

/**
 * Search across pages and posts
 */
export async function search(
  query: string,
  options?: {
    type?: "pages" | "posts" | "all";
    limit?: number;
    locale?: string;
  },
): Promise<{
  pages: Page[];
  posts: Post[];
}> {
  const type = options?.type ?? "all";
  const limit = options?.limit ?? 10;

  const [pagesResult, postsResult] = await Promise.all([
    type === "all" || type === "pages"
      ? fetchFromCMS<PayloadResponse<Page>>("/pages", {
          params: {
            "where[status][equals]": "published",
            "where[or][0][title][contains]": query,
            "where[or][1][content][contains]": query,
            locale: options?.locale,
            limit,
          },
        })
      : Promise.resolve({ docs: [] }),
    type === "all" || type === "posts"
      ? fetchFromCMS<PayloadResponse<Post>>("/posts", {
          params: {
            "where[status][equals]": "published",
            "where[or][0][title][contains]": query,
            "where[or][1][excerpt][contains]": query,
            locale: options?.locale,
            limit,
          },
        })
      : Promise.resolve({ docs: [] }),
  ]);

  return {
    pages: pagesResult.docs,
    posts: postsResult.docs,
  };
}

// ============================================================================
// Utility Exports
// ============================================================================

export { CMS_URL, TENANT_SLUG };
