/**
 * Payload CMS Local API Client
 * Direct database access through Payload Local API (embedded CMS)
 */

import { getPayload } from "payload";
import configPromise from "@payload-config";
import type {
  Media,
  Header,
  Footer,
  HomePage,
  ServiziPage,
  AziendaPage,
  ContattiPage,
  PrivacyPage,
  CookiePage,
} from "@/types/payload";

// ============================================================================
// Configuration
// ============================================================================

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

/**
 * Get Payload instance (fresh for each request to support Live Preview)
 */
async function getPayloadClient() {
  return await getPayload({ config: configPromise });
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get full media URL
 */
export function getMediaUrl(media: Media | string | undefined | null): string {
  if (!media) return "";

  // Handle local static images (e.g. from fallback data)
  if (typeof media === "object" && media.url?.startsWith("/img/")) {
    return media.url;
  }

  if (typeof media === "string") {
    if (media.startsWith("http") || media.startsWith("/")) {
      return media.startsWith("http") ? media : `${SERVER_URL}${media}`;
    }
    return `${SERVER_URL}/media/${media}`;
  }

  if (media.url) {
    return media.url.startsWith("http")
      ? media.url
      : `${SERVER_URL}${media.url}`;
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
    return sizeUrl.startsWith("http") ? sizeUrl : `${SERVER_URL}${sizeUrl}`;
  }

  return getMediaUrl(media);
}

// ============================================================================
// Layout Globals API
// ============================================================================

/**
 * Get header global
 */
export async function getHeader(): Promise<Header | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.findGlobal({
      slug: "header",
      depth: 2,
    });
    return result as Header;
  } catch {
    return null;
  }
}

/**
 * Get footer global
 */
export async function getFooter(): Promise<Footer | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.findGlobal({
      slug: "footer",
      depth: 2,
    });
    return result as Footer;
  } catch {
    return null;
  }
}

// ============================================================================
// Page Globals API
// ============================================================================

/**
 * Get homepage global
 */
export async function getHomePage(): Promise<HomePage | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.findGlobal({
      slug: "home-page",
      depth: 2,
    });
    return result as HomePage;
  } catch {
    return null;
  }
}

/**
 * Get servizi page global
 */
export async function getServiziPage(): Promise<ServiziPage | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.findGlobal({
      slug: "servizi-page",
      depth: 2,
    });
    return result as ServiziPage;
  } catch {
    return null;
  }
}

/**
 * Get azienda page global
 */
export async function getAziendaPage(): Promise<AziendaPage | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.findGlobal({
      slug: "azienda-page",
      depth: 2,
    });
    return result as AziendaPage;
  } catch {
    return null;
  }
}

/**
 * Get contatti page global
 */
export async function getContattiPage(): Promise<ContattiPage | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.findGlobal({
      slug: "contatti-page",
      depth: 2,
    });
    return result as ContattiPage;
  } catch {
    return null;
  }
}

/**
 * Get privacy page global
 */
export async function getPrivacyPage(): Promise<PrivacyPage | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.findGlobal({
      slug: "privacy-page",
      depth: 2,
    });
    return result as PrivacyPage;
  } catch {
    return null;
  }
}

/**
 * Get cookie page global
 */
export async function getCookiePage(): Promise<CookiePage | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.findGlobal({
      slug: "cookie-page",
      depth: 2,
    });
    return result as CookiePage;
  } catch {
    return null;
  }
}

// ============================================================================
// Utility Exports
// ============================================================================

export { SERVER_URL as CMS_URL };
