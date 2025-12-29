/**
 * Servizi Page Data Fetching
 */

import {
  getServices,
  getPillars,
  getBenefits,
  getMachinery,
  getHeader,
  getFooter,
} from "@/lib/payload";
import {
  fallbackServices,
  fallbackPillars,
  fallbackBenefits,
  fallbackMachinery,
} from "@/lib/fallback-data";
import type {
  Service,
  Pillar,
  Benefit,
  Machinery,
  Header,
  Footer,
} from "@/types/payload";

export interface ServiziPageData {
  services: Service[];
  pillars: Pillar[];
  benefits: Benefit[];
  machinery: Machinery[];
  header: Header | null;
  footer: Footer | null;
}

export async function getServiziPageData(): Promise<ServiziPageData> {
  const [
    servicesResult,
    pillarsResult,
    benefitsResult,
    machineryResult,
    header,
    footer,
  ] = await Promise.all([
    getServices({ active: true }).catch(() => null),
    getPillars({ active: true }).catch(() => null),
    getBenefits({ active: true }).catch(() => null),
    getMachinery({ active: true }).catch(() => null),
    getHeader().catch(() => null),
    getFooter().catch(() => null),
  ]);

  return {
    services: servicesResult ?? fallbackServices,
    pillars: pillarsResult ?? fallbackPillars,
    benefits: benefitsResult ?? fallbackBenefits,
    machinery: machineryResult ?? fallbackMachinery,
    header,
    footer,
  };
}
