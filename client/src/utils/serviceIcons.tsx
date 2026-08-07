import {
  BarChart3,
  Bot,
  Cloud,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Globe,
  Headset,
  LifeBuoy,
  PenTool,
  Plug,
  RefreshCw,
  Shield,
  Smartphone,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import type { ComponentType } from 'react';

/**
 * Maps `Service.icon` keys (data/services.ts) to their lucide component.
 * Single source of truth — was previously duplicated (and out of date for
 * services 12-18) inside ServicesSection.
 */
export const SERVICE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  code: Code2,
  smartphone: Smartphone,
  trending: TrendingUp,
  pen: PenTool,
  gauge: Gauge,
  zap: Zap,
  spider: Globe,
  database: Database,
  headset: Headset,
  chart: BarChart3,
  sparkles: Sparkles,
  refresh: RefreshCw,
  cloud: Cloud,
  plug: Plug,
  'git-branch': GitBranch,
  shield: Shield,
  'life-buoy': LifeBuoy,
  bot: Bot,
};

/** Resolve a service icon key to its component, with a safe fallback. */
export function getServiceIcon(icon: string): ComponentType<{ className?: string }> {
  return SERVICE_ICONS[icon] ?? Code2;
}
