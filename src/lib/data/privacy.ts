/**
 * Privacy Page Data Fetching
 */

import { getPrivacyPage } from "@/lib/payload";
import { fallbackPrivacyPage } from "@/lib/fallback-data";
import type { PrivacyPage } from "@/types/payload";

export interface PrivacyPageData {
  page: PrivacyPage;
}

/**
 * Merge CMS data with fallback
 */
function mergePrivacyPageData(
  cmsData: PrivacyPage | null,
  fallback: PrivacyPage,
): PrivacyPage {
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
    // Use CMS sections if available, otherwise fallback
    sections:
      cmsData.sections && cmsData.sections.length > 0
        ? cmsData.sections
        : fallback.sections,
  };
}

export async function getPrivacyPageData(): Promise<PrivacyPageData> {
  const pageResult = await getPrivacyPage().catch(() => null);

  return {
    page: mergePrivacyPageData(pageResult, fallbackPrivacyPage),
  };
}
