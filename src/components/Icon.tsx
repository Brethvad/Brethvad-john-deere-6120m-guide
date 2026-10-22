import {
  Armchair, Book, Box, ClipboardCheck, Cog, Droplets, FileCheck, Home, Lightbulb, Link2, SearchCheck, Shield,
  Table2, Truck, Waves, Wrench, CircleDot, type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  box: Box,
  armchair: Armchair,
  steering: CircleDot,
  cog: Cog,
  droplets: Droplets,
  waves: Waves,
  lightbulb: Lightbulb,
  link: Link2,
  truck: Truck,
  "clipboard-check": ClipboardCheck,
  wrench: Wrench,
  "search-check": SearchCheck,
  table: Table2,
  book: Book,
  shield: Shield,
  "file-check": FileCheck,
};

export function Icon({ name, className = "size-4" }: { name: string; className?: string }) {
  const C = ICONS[name] ?? CircleDot;
  return <C className={className} aria-hidden />;
}
