/**
 * Contatti Page Data Fetching
 */

import { getServices, getFooter, getHeader } from "@/lib/payload";
import { fallbackContactInfo, fallbackServices } from "@/lib/fallback-data";
import type { Service, ContactInfo, Header, Footer } from "@/types/payload";

export interface ContattiPageData {
  contactInfo: ContactInfo;
  services: Service[];
  header: Header | null;
  footer: Footer | null;
}

export async function getContattiPageData(): Promise<ContattiPageData> {
  const [servicesResult, footer, header] = await Promise.all([
    getServices({ active: true }).catch(() => null),
    getFooter().catch(() => null),
    getHeader().catch(() => null),
  ]);

  return {
    contactInfo: footer?.contactInfo ?? fallbackContactInfo,
    services: servicesResult ?? fallbackServices,
    header,
    footer,
  };
}
