/**
 * Azienda Page Data Fetching
 */

import {
  getTimeline,
  getValues,
  getTeamMembers,
  getCertifications,
  getHeader,
  getFooter,
} from "@/lib/payload";
import {
  fallbackTimeline,
  fallbackValues,
  fallbackTeam,
  fallbackCertifications,
} from "@/lib/fallback-data";
import type {
  Timeline,
  Value,
  TeamMember,
  Certification,
  Header,
  Footer,
} from "@/types/payload";

export interface AziendaPageData {
  timeline: Timeline[];
  values: Value[];
  team: TeamMember[];
  certifications: Certification[];
  header: Header | null;
  footer: Footer | null;
}

export async function getAziendaPageData(): Promise<AziendaPageData> {
  const [
    timelineResult,
    valuesResult,
    teamResult,
    certificationsResult,
    header,
    footer,
  ] = await Promise.all([
    getTimeline({ active: true }).catch(() => null),
    getValues({ active: true }).catch(() => null),
    getTeamMembers({ active: true }).catch(() => null),
    getCertifications({ active: true }).catch(() => null),
    getHeader().catch(() => null),
    getFooter().catch(() => null),
  ]);

  return {
    timeline: timelineResult ?? fallbackTimeline,
    values: valuesResult ?? fallbackValues,
    team: teamResult ?? fallbackTeam,
    certifications: certificationsResult ?? fallbackCertifications,
    header,
    footer,
  };
}
