/**
 * Servizi Page Data Fetching
 */

import { getServiziPage, getHeader, getFooter } from "@/lib/payload";
import {
  fallbackServiziPage,
  fallbackHeader,
  fallbackFooter,
} from "@/lib/fallback-data";
import type { ServiziPage, HeaderData, Footer } from "@/types/payload";

export interface ServiziPageData {
  page: ServiziPage;
  header: HeaderData;
  footer: Footer;
}

/**
 * Helper to get array or fallback if empty
 */
function getArrayOrFallback<T>(
  arr: T[] | undefined | null,
  fallbackArr: T[],
): T[] {
  return arr && arr.length > 0 ? arr : fallbackArr;
}

/**
 * Merge CMS data with fallback, using fallback for empty arrays
 */
function mergeServiziPageData(
  cmsData: ServiziPage | null,
  fallback: ServiziPage,
): ServiziPage {
  if (!cmsData) return fallback;

  const services = getArrayOrFallback(
    cmsData.servicesSection?.services,
    fallback.servicesSection?.services ?? [],
  );
  const pillars = getArrayOrFallback(
    cmsData.pillarsSection?.pillars,
    fallback.pillarsSection?.pillars ?? [],
  );
  const benefits = getArrayOrFallback(
    cmsData.benefitsSection?.benefits,
    fallback.benefitsSection?.benefits ?? [],
  );
  const machinery = getArrayOrFallback(
    cmsData.machinerySection?.machinery,
    fallback.machinerySection?.machinery ?? [],
  );

  return {
    ...fallback,
    ...cmsData,
    servicesSection: {
      ...fallback.servicesSection,
      ...cmsData.servicesSection,
      services,
    },
    pillarsSection: {
      ...fallback.pillarsSection,
      ...cmsData.pillarsSection,
      pillars,
    },
    benefitsSection: {
      ...fallback.benefitsSection,
      ...cmsData.benefitsSection,
      benefits,
    },
    machinerySection: {
      ...fallback.machinerySection,
      ...cmsData.machinerySection,
      machinery,
    },
  };
}

export async function getServiziPageData(): Promise<ServiziPageData> {
  const [pageResult, headerResult, footerResult] = await Promise.all([
    getServiziPage().catch(() => null),
    getHeader().catch(() => null),
    getFooter().catch(() => null),
  ]);

  return {
    page: mergeServiziPageData(pageResult, fallbackServiziPage),
    header: headerResult ?? fallbackHeader,
    footer: footerResult ?? fallbackFooter,
  };
}
