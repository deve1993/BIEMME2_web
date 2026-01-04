/**
 * DynamicIcon - Componente ottimizzato per icone con SVG Sprite
 *
 * Usa <use href="#icon-name"> per referenziare le icone definite
 * una sola volta in IconSprite.tsx - riduce drasticamente l'HTML
 *
 * IMPORTANTE: IconSprite deve essere incluso nel layout root
 */
import { memo, type ComponentProps } from "react";

// Mapping nomi alternativi -> nome canonico
const aliasMap: Record<string, string> = {
  // Lucide -> canonical
  ChevronDown: "chevron_down",
  ChevronLeft: "chevron_left",
  ChevronRight: "chevron_right",
  ArrowRight: "arrow_right",
  CheckCircle: "check_circle",
  AlertCircle: "alert_circle",
  Loader2: "loader",
  Phone: "call",
  Mail: "mail",
  MapPin: "location_on",
  BadgeCheck: "badge_check",
  Building2: "building2",
  Menu: "menu",
  X: "x",
  Siren: "siren",
  Gem: "gem",
  Wrench: "wrench",
  UserCog: "user_cog",
  Handshake: "handshake",
  Users: "users",
  // Material Symbols -> canonical (mappati a icone disponibili)
  architecture: "construction",
  home_work: "home",
  home_repair_service: "wrench",
  apartment: "building2",
  domain: "factory",
  emergency: "emergency",
  emergency_home: "emergency",
  health_and_safety: "shield",
  workspace_premium: "verified",
  schedule: "loader",
  groups: "users",
  landscape: "construction",
  gavel: "shield",
  calendar_month: "loader",
  support_agent: "users",
  bolt: "siren",
  spa: "gem",
  agriculture: "construction",
  local_shipping: "construction",
  handyman: "wrench",
  foundation: "construction",
  rocket_launch: "arrow_right",
  diamond: "gem",
  eco: "verified",
  plumbing: "wrench",
  roofing: "home",
  build: "wrench",
  check_circle: "check_circle",
  location_on: "location_on",
  call: "call",
};

// Lista icone disponibili nello sprite
const availableIcons = new Set([
  "menu",
  "x",
  "chevron_down",
  "chevron_left",
  "chevron_right",
  "arrow_right",
  "check_circle",
  "alert_circle",
  "loader",
  "call",
  "mail",
  "location_on",
  "badge_check",
  "construction",
  "home",
  "factory",
  "building2",
  "emergency",
  "siren",
  "verified",
  "shield",
  "gem",
  "wrench",
  "user_cog",
  "handshake",
  "users",
]);

interface DynamicIconProps extends ComponentProps<"svg"> {
  /** Nome icona (Lucide o Material Symbols) */
  name: string;
  /** Dimensione in pixel (default: 24) */
  size?: number;
}

/**
 * Renderizza un'icona SVG usando <use> per referenziare lo sprite
 * Riduce drasticamente la dimensione HTML (ogni icona è solo <use href="..."/>)
 * Memoizzato per evitare re-render inutili
 *
 * IMPORTANTE: IconSprite deve essere incluso nel layout root
 *
 * @example
 * <DynamicIcon name="menu" size={24} className="text-primary" />
 * <DynamicIcon name="ChevronDown" size={16} /> // Lucide-style name
 */
export const DynamicIcon = memo(function DynamicIconBase({
  name,
  size = 24,
  className,
  style,
  ...props
}: DynamicIconProps) {
  // Risolvi alias (Lucide o Material)
  const canonicalName = aliasMap[name] || name;

  // Usa fallback se icona non disponibile
  const iconName = availableIcons.has(canonicalName)
    ? canonicalName
    : "construction";

  return (
    <svg
      className={className}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
      suppressHydrationWarning
      {...props}
    >
      <use href={`#icon-${iconName}`} suppressHydrationWarning />
    </svg>
  );
});

// Export per type checking
export type IconName = keyof typeof aliasMap | string;
