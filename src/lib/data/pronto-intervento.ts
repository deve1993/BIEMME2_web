/**
 * Pronto Intervento Page Data Fetching
 */

import { getProntoInterventoPage, getHeader, getFooter } from "@/lib/payload";
import {
  fallbackProntoInterventoPage,
  fallbackHeader,
  fallbackFooter,
} from "@/lib/fallback-data";
import type { ProntoInterventoPage, HeaderData, Footer } from "@/types/payload";

export interface ProntoInterventoPageData {
  page: ProntoInterventoPage;
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
function mergeProntoInterventoPageData(
  cmsData: ProntoInterventoPage | null,
  fallback: ProntoInterventoPage,
): ProntoInterventoPage {
  if (!cmsData) return fallback;

  const services = getArrayOrFallback(
    cmsData.emergencyServicesSection?.services,
    fallback.emergencyServicesSection?.services ?? [],
  );
  const steps = getArrayOrFallback(
    cmsData.processSection?.steps,
    fallback.processSection?.steps ?? [],
  );
  const benefits = getArrayOrFallback(
    cmsData.whyUsSection?.benefits,
    fallback.whyUsSection?.benefits ?? [],
  );
  const stats = getArrayOrFallback(
    cmsData.statsSection?.stats,
    fallback.statsSection?.stats ?? [],
  );

  return {
    ...fallback,
    ...cmsData,
    emergencyServicesSection: {
      ...fallback.emergencyServicesSection,
      ...cmsData.emergencyServicesSection,
      services,
    },
    processSection: {
      ...fallback.processSection,
      ...cmsData.processSection,
      steps,
    },
    whyUsSection: {
      ...fallback.whyUsSection,
      ...cmsData.whyUsSection,
      benefits,
    },
    statsSection: {
      ...fallback.statsSection,
      ...cmsData.statsSection,
      stats,
    },
  };
}

export async function getProntoInterventoPageData(): Promise<ProntoInterventoPageData> {
  const [pageResult, headerResult, footerResult] = await Promise.all([
    getProntoInterventoPage().catch(() => null),
    getHeader().catch(() => null),
    getFooter().catch(() => null),
  ]);

  return {
    page: mergeProntoInterventoPageData(
      pageResult,
      fallbackProntoInterventoPage,
    ),
    header: headerResult ?? fallbackHeader,
    footer: footerResult ?? fallbackFooter,
  };
}
