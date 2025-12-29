/**
 * Pronto Intervento Page Data Fetching
 */

import { getServiceBySlug, getHeader, getFooter } from "@/lib/payload";
import {
  fallbackProntoInterventoService,
  fallbackContactInfo,
} from "@/lib/fallback-data";
import type { Service, Header, Footer, ContactInfo } from "@/types/payload";

export interface ProntoInterventoPageData {
  service: Service;
  contactInfo: ContactInfo | null;
  header: Header | null;
  footer: Footer | null;
}

export async function getProntoInterventoPageData(): Promise<ProntoInterventoPageData> {
  const [serviceResult, header, footer] = await Promise.all([
    getServiceBySlug("pronto-intervento").catch(() => null),
    getHeader().catch(() => null),
    getFooter().catch(() => null),
  ]);

  return {
    service: serviceResult ?? fallbackProntoInterventoService,
    contactInfo: footer?.contactInfo ?? fallbackContactInfo,
    header,
    footer,
  };
}
