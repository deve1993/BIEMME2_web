/**
 * Cookie Page Data Fetching
 */

import { getCookiePage } from "@/lib/payload";
import { fallbackCookiePage } from "@/lib/fallback-data";
import type { CookiePage } from "@/types/payload";

export interface CookiePageData {
  page: CookiePage;
}

/**
 * Merge CMS data with fallback
 */
function mergeCookiePageData(
  cmsData: CookiePage | null,
  fallback: CookiePage,
): CookiePage {
  if (!cmsData) return fallback;

  return {
    ...fallback,
    ...cmsData,
    header: {
      ...fallback.header,
      ...cmsData.header,
    },
    companyInfo: {
      ...fallback.companyInfo,
      ...cmsData.companyInfo,
    },
    // Use CMS cookie types if available, otherwise fallback
    cookieTypes:
      cmsData.cookieTypes && cmsData.cookieTypes.length > 0
        ? cmsData.cookieTypes
        : fallback.cookieTypes,
    // Use CMS third party services if available, otherwise fallback
    thirdPartyServices:
      cmsData.thirdPartyServices && cmsData.thirdPartyServices.length > 0
        ? cmsData.thirdPartyServices
        : fallback.thirdPartyServices,
    // Use CMS browser links if available, otherwise fallback
    browserLinks:
      cmsData.browserLinks && cmsData.browserLinks.length > 0
        ? cmsData.browserLinks
        : fallback.browserLinks,
  };
}

export async function getCookiePageData(): Promise<CookiePageData> {
  const pageResult = await getCookiePage().catch(() => null);

  return {
    page: mergeCookiePageData(pageResult, fallbackCookiePage),
  };
}
