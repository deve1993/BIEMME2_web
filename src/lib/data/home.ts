/**
 * Homepage Data Fetching
 */

import {
  getFeatures,
  getStats,
  getHighlights,
  getProjects,
  getHeader,
  getFooter,
} from "@/lib/payload";
import {
  fallbackFeatures,
  fallbackStats,
  fallbackHighlights,
  fallbackProjects,
} from "@/lib/fallback-data";
import type {
  Feature,
  Stat,
  Highlight,
  Project,
  Header,
  Footer,
} from "@/types/payload";

export interface HomePageData {
  features: Feature[];
  stats: Stat[];
  highlights: Highlight[];
  projects: Project[];
  header: Header | null;
  footer: Footer | null;
}

export async function getHomePageData(): Promise<HomePageData> {
  const [
    featuresResult,
    statsResult,
    highlightsResult,
    projectsResult,
    header,
    footer,
  ] = await Promise.all([
    getFeatures({ active: true }).catch(() => null),
    getStats({ active: true }).catch(() => null),
    getHighlights({ active: true, limit: 3 }).catch(() => null),
    getProjects({ featured: true, active: true, limit: 4 }).catch(() => null),
    getHeader().catch(() => null),
    getFooter().catch(() => null),
  ]);

  return {
    features: featuresResult ?? fallbackFeatures,
    stats: statsResult ?? fallbackStats,
    highlights: highlightsResult ?? fallbackHighlights,
    projects: projectsResult ?? fallbackProjects,
    header,
    footer,
  };
}
