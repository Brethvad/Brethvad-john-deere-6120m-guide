// Content model for the guide. All technical content lives in typed data
// files under src/content and is rendered by generic components, so it can be
// corrected or extended without touching the presentation layer.

/** How well a piece of information is backed by the manual for this tractor. */
export type Verification =
  /** The owner has confirmed the tractor has this (used for the configuration). */
  | "bekreftet"
  /** Stated in OMAL219620 for the 6120M / AutoQuad PLUS / cab tractors. */
  | "verifisert"
  /** In the manual, but only applies if the tractor has that equipment or version. */
  | "avhenger"
  /** Not confirmed for this tractor; no operating instructions are given from it. */
  | "uverifisert";

export type SourceId = string;

export interface Source {
  id: SourceId;
  /** Manual section, e.g. "Seksjon 48 – Operate the Tractor — AutoQuad PLUS". */
  section: string;
  /** Page title as printed in the manual (English). */
  title: string;
  /** File name of the page in the online manual. */
  file: string;
}

export type CalloutKind = "fare" | "advarsel" | "viktig" | "merk" | "usikker";

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; title?: string; items: string[] }
  | { type: "callout"; kind: CalloutKind; title?: string; text: string }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "diagram"; id: DiagramId; caption?: string }
  | { type: "checklist"; id: string }
  | { type: "simple"; text: string }
  | { type: "details"; title: string; blocks: Block[] };

export type DiagramId =
  | "gear-structure"
  | "speed-chart"
  | "shift-controls"
  | "instrument-cluster"
  | "cab-layout"
  | "hydraulic-flow"
  | "front-hydraulics"
  | "scv-positions"
  | "light-switch"
  | "lights-front"
  | "lights-rear"
  | "suspension"
  | "rpm-load";

export interface Section {
  id: string;
  title: string;
  blocks: Block[];
  sources?: SourceId[];
  verification?: Verification;
}

export type NavGroup = "Oversikt" | "Førerhus" | "Betjening" | "Systemer" | "Kontroll og vedlikehold" | "Referanse";

export interface Page {
  slug: string;
  title: string;
  /** Short label for navigation. */
  nav: string;
  group: NavGroup;
  icon: string;
  intro: string;
  sections: Section[];
  related?: string[];
}

export type CabZone =
  | "rattstamme"
  | "instrumentpanel"
  | "gulv"
  | "hoyre-konsoll"
  | "hoyre-panel"
  | "sete"
  | "tak"
  | "utvendig";

export interface Control {
  id: string;
  name: string;
  nameEn: string;
  zone: CabZone;
  /** Where to find it, in words. */
  location: string;
  what: string;
  how: string[];
  expect: string;
  mistakes: string[];
  safety: string[];
  ifNotWorking?: string[];
  verification: Verification;
  note?: string;
  sources: SourceId[];
  link?: string;
  /** Position on the cab schematic (0–100 in both directions). */
  pos?: { x: number; y: number };
}

export type ModelArea = "utvendig" | "motor-foraksel" | "forerhus" | "instrumenter" | "hydraulikk" | "bakre";

export interface ModelPart {
  id: string;
  name: string;
  area: ModelArea;
  what: string;
  how: string;
  when: string;
  operate?: string;
  safety: string[];
  link: string;
  verification: Verification;
  /** True when the geometry is a simplified stand-in, not a factory-accurate shape. */
  illustrative: true;
  sources: SourceId[];
}

export interface Problem {
  id: string;
  title: string;
  area: string;
  symptoms: string[];
  causes: string[];
  checks: string[];
  next: string[];
  stop: string[];
  dealer: string[];
  sources: SourceId[];
}

export interface Checklist {
  id: string;
  title: string;
  intro?: string;
  groups: { title: string; condition: string; items: { text: string; source?: SourceId }[] }[];
}

export interface MaintenanceTask {
  task: string;
  interval: MaintenanceInterval;
  who: "fører" | "verksted" | "fører eller verksted";
  note?: string;
  source: SourceId;
}

export type MaintenanceInterval =
  | "før bruk"
  | "daglig / 10 t"
  | "etter første 100 t"
  | "hver 500 t"
  | "årlig"
  | "1500 t / 2 år"
  | "4500 t"
  | "6000 t"
  | "ved behov"
  | "se serviceoversikt";

export interface Spec {
  group: string;
  label: string;
  value: string;
  note?: string;
  verification: Verification;
  source: SourceId;
}

export interface Term {
  term: string;
  en?: string;
  explanation: string;
  onThisTractor?: string;
  link?: string;
}
