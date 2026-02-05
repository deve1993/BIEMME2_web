/**
 * Homepage Data Fetching
 */

import { getHomePage, getHeader, getFooter } from "@/lib/payload";
import {
  fallbackHomePage,
  fallbackHeader,
  fallbackFooter,
} from "@/lib/fallback-data";
import type { HomePage, HeaderData, Footer } from "@/types/payload";

export interface HomePageData {
  page: HomePage;
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
function mergeHomePageData(
  cmsData: HomePage | null,
  fallback: HomePage,
): HomePage {
  if (!cmsData) return fallback;

  // Get heroSlider slides with fallback
  const heroSlides = getArrayOrFallback(
    cmsData.heroSlider?.slides,
    fallback.heroSlider?.slides ?? [],
  );

  // Get features with fallback
  const features = getArrayOrFallback(
    cmsData.featuresSection?.features,
    fallback.featuresSection?.features ?? [],
  );

  // Get stats with fallback
  const stats = getArrayOrFallback(
    cmsData.statsSection?.stats,
    fallback.statsSection?.stats ?? [],
  );

  // Get highlights with fallback
  const highlights = getArrayOrFallback(
    cmsData.highlightsSection?.highlights,
    fallback.highlightsSection?.highlights ?? [],
  );

  return {
    ...fallback,
    ...cmsData,
    heroSlider: {
      ...fallback.heroSlider,
      ...cmsData.heroSlider,
      slides: heroSlides,
    },
    featuresSection: {
      ...fallback.featuresSection,
      ...cmsData.featuresSection,
      features,
    },
    statsSection: {
      ...fallback.statsSection,
      ...cmsData.statsSection,
      stats,
    },
    highlightsSection: {
      ...fallback.highlightsSection,
      ...cmsData.highlightsSection,
      highlights,
    },
  };
}

/**
 * Merge footer data - always use fallback columns (until CMS is properly seeded)
 */
function mergeFooterData(cmsData: Footer | null, fallback: Footer): Footer {
  if (!cmsData) return fallback;

  return {
    ...fallback,
    ...cmsData,
    // Always use fallback columns - they are curated and don't have broken links
    columns: fallback.columns ?? [],
  };
}

export async function getHomePageData(): Promise<HomePageData> {
  const [pageResult, headerResult, footerResult] = await Promise.all([
    getHomePage().catch(() => null),
    getHeader().catch(() => null),
    getFooter().catch(() => null),
  ]);

  return {
    page: mergeHomePageData(pageResult, fallbackHomePage),
    header: headerResult ?? fallbackHeader,
    footer: mergeFooterData(footerResult, fallbackFooter),
  };
}
