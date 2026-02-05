/**
 * Azienda Page Data Fetching
 */

import { getAziendaPage, getHeader, getFooter } from "@/lib/payload";
import {
  fallbackAziendaPage,
  fallbackHeader,
  fallbackFooter,
} from "@/lib/fallback-data";
import type { AziendaPage, HeaderData, Footer } from "@/types/payload";

export interface AziendaPageData {
  page: AziendaPage;
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
function mergeAziendaPageData(
  cmsData: AziendaPage | null,
  fallback: AziendaPage,
): AziendaPage {
  if (!cmsData) return fallback;

  const timeline = getArrayOrFallback(
    cmsData.storiaSection?.timeline,
    fallback.storiaSection?.timeline ?? [],
  );
  const values = getArrayOrFallback(
    cmsData.valoriSection?.values,
    fallback.valoriSection?.values ?? [],
  );
  const aree = getArrayOrFallback(
    cmsData.organigrammaSection?.aree,
    fallback.organigrammaSection?.aree ?? [],
  );
  const members = getArrayOrFallback(
    cmsData.teamSection?.members,
    fallback.teamSection?.members ?? [],
  );
  const certifications = getArrayOrFallback(
    cmsData.certificazioniSection?.certifications,
    fallback.certificazioniSection?.certifications ?? [],
  );

  return {
    ...fallback,
    ...cmsData,
    storiaSection: {
      ...fallback.storiaSection,
      ...cmsData.storiaSection,
      timeline,
    },
    valoriSection: {
      ...fallback.valoriSection,
      ...cmsData.valoriSection,
      values,
    },
    organigrammaSection: {
      ...fallback.organigrammaSection,
      ...cmsData.organigrammaSection,
      aree,
    },
    teamSection: {
      ...fallback.teamSection,
      ...cmsData.teamSection,
      members,
    },
    certificazioniSection: {
      ...fallback.certificazioniSection,
      ...cmsData.certificazioniSection,
      certifications,
    },
  };
}

export async function getAziendaPageData(): Promise<AziendaPageData> {
  const [pageResult, headerResult, footerResult] = await Promise.all([
    getAziendaPage().catch(() => null),
    getHeader().catch(() => null),
    getFooter().catch(() => null),
  ]);

  return {
    page: mergeAziendaPageData(pageResult, fallbackAziendaPage),
    header: headerResult ?? fallbackHeader,
    footer: footerResult ?? fallbackFooter,
  };
}
