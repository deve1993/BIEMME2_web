/**
 * Contatti Page Data Fetching
 */

import { getContattiPage, getHeader, getFooter } from "@/lib/payload";
import {
  fallbackContattiPage,
  fallbackHeader,
  fallbackFooter,
} from "@/lib/fallback-data";
import type { ContattiPage, HeaderData, Footer } from "@/types/payload";

export interface ContattiPageData {
  page: ContattiPage;
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
function mergeContattiPageData(
  cmsData: ContattiPage | null,
  fallback: ContattiPage,
): ContattiPage {
  if (!cmsData) return fallback;

  const servizi = getArrayOrFallback(
    cmsData.formSection?.servizi,
    fallback.formSection?.servizi ?? [],
  );

  return {
    ...fallback,
    ...cmsData,
    contactInfo: {
      ...fallback.contactInfo,
      ...cmsData.contactInfo,
    },
    formSection: {
      ...fallback.formSection,
      ...cmsData.formSection,
      servizi,
    },
    mapSection: {
      ...fallback.mapSection,
      ...cmsData.mapSection,
    },
  };
}

export async function getContattiPageData(): Promise<ContattiPageData> {
  const [pageResult, headerResult, footerResult] = await Promise.all([
    getContattiPage().catch(() => null),
    getHeader().catch(() => null),
    getFooter().catch(() => null),
  ]);

  return {
    page: mergeContattiPageData(pageResult, fallbackContattiPage),
    header: headerResult ?? fallbackHeader,
    footer: footerResult ?? fallbackFooter,
  };
}
