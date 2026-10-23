import type { Block, Page } from "./types";
import { betjening } from "./pages/betjening";
import { girkasse } from "./pages/girkasse";
import { hydraulikk } from "./pages/hydraulikk";
import { fjaering } from "./pages/fjaering";
import { lys } from "./pages/lys";
import { redskap } from "./pages/redskap";
import { veitransport } from "./pages/veitransport";
import { forerhus, dagligKontroll, manedligKontroll, vedlikehold, sikkerhet } from "./pages/other";
import { CONTROLS, ZONE_LABEL } from "./controls";
import { PROBLEMS } from "./problems";
import { GLOSSARY } from "./glossary";
import { SPECS } from "./specs";
import { PARTS } from "./parts";
import { MAINTENANCE } from "./maintenance";
import { CHECKLISTS } from "./checklists";

/** Content pages rendered by the generic page renderer, keyed by slug. */
export const PAGES: Record<string, Page> = Object.fromEntries(
  [forerhus, betjening, girkasse, hydraulikk, fjaering, lys, redskap, veitransport, dagligKontroll, manedligKontroll, vedlikehold, sikkerhet].map((p) => [p.slug, p]),
);

export interface NavItem {
  to: string;
  label: string;
  icon: string;
  group: string;
}

/** Main navigation, in the order requested for the guide. */
export const NAV: NavItem[] = [
  { to: "/", label: "Oversikt", icon: "home", group: "Oversikt" },
  { to: "/3d", label: "3D-modell", icon: "box", group: "Oversikt" },
  { to: "/forerhus", label: "Førerhus", icon: "armchair", group: "Førerhus" },
  { to: "/betjening", label: "Betjening", icon: "steering", group: "Betjening" },
  { to: "/girkasse", label: "Girkasse", icon: "cog", group: "Systemer" },
  { to: "/hydraulikk", label: "Hydraulikk", icon: "droplets", group: "Systemer" },
  { to: "/fjaering", label: "Fjæring", icon: "waves", group: "Systemer" },
  { to: "/lys", label: "Lys", icon: "lightbulb", group: "Systemer" },
  { to: "/redskap", label: "Redskap", icon: "link", group: "Betjening" },
  { to: "/veitransport", label: "Veitransport", icon: "truck", group: "Betjening" },
  { to: "/daglig-kontroll", label: "Daglig kontroll", icon: "clipboard-check", group: "Kontroll og vedlikehold" },
  { to: "/manedlig-kontroll", label: "Månedlig kontroll", icon: "calendar-check", group: "Kontroll og vedlikehold" },
  { to: "/vedlikehold", label: "Vedlikehold", icon: "wrench", group: "Kontroll og vedlikehold" },
  { to: "/feilsoking", label: "Feilsøking", icon: "search-check", group: "Kontroll og vedlikehold" },
  { to: "/spesifikasjoner", label: "Spesifikasjoner", icon: "table", group: "Referanse" },
  { to: "/ordliste", label: "Ordliste", icon: "book", group: "Referanse" },
  { to: "/sikkerhet", label: "Sikkerhet", icon: "shield", group: "Referanse" },
  { to: "/kilder", label: "Kilder og status", icon: "file-check", group: "Referanse" },
];

export function titleFor(path: string): string {
  const item = NAV.find((n) => n.to === path);
  return item?.label ?? PAGES[path.replace(/^\//, "")]?.nav ?? "";
}

// ─── Search ────────────────────────────────────────────────────────────────

export interface SearchDoc {
  id: string;
  title: string;
  kind: "Side" | "Avsnitt" | "Betjening" | "Feilsøking" | "Ordliste" | "Spesifikasjon" | "3D-del" | "Vedlikehold" | "Sjekkliste";
  to: string;
  context: string;
  text: string;
}

function blockText(b: Block): string {
  switch (b.type) {
    case "p":
    case "simple":
      return b.text;
    case "list":
      return b.items.join(" ");
    case "steps":
      return [b.title ?? "", ...b.items].join(" ");
    case "callout":
      return `${b.title ?? ""} ${b.text}`;
    case "table":
      return [b.caption ?? "", ...b.head, ...b.rows.flat()].join(" ");
    case "details":
      return [b.title, ...b.blocks.map(blockText)].join(" ");
    case "checklist":
      return CHECKLISTS[b.id]?.groups.flatMap((g) => [g.title, ...g.items.map((i) => i.text)]).join(" ") ?? "";
    default:
      return "";
  }
}

function buildDocs(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const page of Object.values(PAGES)) {
    docs.push({ id: `page-${page.slug}`, title: page.title, kind: "Side", to: `/${page.slug}`, context: page.nav, text: page.intro });
    for (const s of page.sections) {
      docs.push({
        id: `sec-${page.slug}-${s.id}`,
        title: s.title,
        kind: "Avsnitt",
        to: `/${page.slug}#${s.id}`,
        context: page.nav,
        text: s.blocks.map(blockText).join(" "),
      });
    }
  }
  for (const c of CONTROLS) {
    docs.push({
      id: `ctl-${c.id}`,
      title: c.name,
      kind: "Betjening",
      to: `/forerhus?k=${c.id}`,
      context: ZONE_LABEL[c.zone],
      text: [c.nameEn, c.location, c.what, ...c.how, c.expect, ...c.mistakes, ...c.safety, ...(c.ifNotWorking ?? [])].join(" "),
    });
  }
  for (const p of PROBLEMS) {
    docs.push({
      id: `prob-${p.id}`,
      title: p.title,
      kind: "Feilsøking",
      to: `/feilsoking#${p.id}`,
      context: p.area,
      text: [...p.symptoms, ...p.causes, ...p.checks, ...p.next, ...p.stop, ...p.dealer].join(" "),
    });
  }
  for (const t of GLOSSARY) {
    docs.push({ id: `term-${t.term}`, title: t.term, kind: "Ordliste", to: `/ordliste#${encodeURIComponent(t.term)}`, context: "Ordliste", text: `${t.en ?? ""} ${t.explanation} ${t.onThisTractor ?? ""}` });
  }
  for (const s of SPECS) {
    docs.push({ id: `spec-${s.group}-${s.label}`, title: s.label, kind: "Spesifikasjon", to: "/spesifikasjoner", context: s.group, text: `${s.value} ${s.note ?? ""}` });
  }
  for (const p of PARTS) {
    docs.push({ id: `part-${p.id}`, title: p.name, kind: "3D-del", to: `/3d?del=${p.id}`, context: "3D-modell", text: [p.what, p.how, p.when, p.operate ?? "", ...p.safety].join(" ") });
  }
  for (const [i, m] of MAINTENANCE.entries()) {
    docs.push({ id: `maint-${i}`, title: m.task, kind: "Vedlikehold", to: "/vedlikehold", context: m.interval, text: m.note ?? "" });
  }
  return docs;
}

export const SEARCH_DOCS = buildDocs();

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9æøå\s]/g, " ");

/** Simple ranked search: every query word must match; title hits weigh most. */
export function search(query: string, limit = 30): SearchDoc[] {
  const words = normalize(query).split(/\s+/).filter((w) => w.length > 1);
  if (!words.length) return [];
  const scored: { doc: SearchDoc; score: number }[] = [];
  for (const doc of SEARCH_DOCS) {
    const title = normalize(doc.title);
    const body = normalize(`${doc.context} ${doc.text}`);
    let score = 0;
    let ok = true;
    for (const w of words) {
      const inTitle = title.includes(w);
      const inBody = body.includes(w);
      if (!inTitle && !inBody) {
        ok = false;
        break;
      }
      score += inTitle ? (title.startsWith(w) ? 12 : 8) : 2;
    }
    if (!ok) continue;
    if (doc.kind === "Side") score += 3;
    if (doc.kind === "Betjening" || doc.kind === "Feilsøking") score += 1;
    scored.push({ doc, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.doc);
}

/** Extract a short snippet around the first query word. */
export function snippet(doc: SearchDoc, query: string, size = 140): string {
  const words = normalize(query).split(/\s+/).filter((w) => w.length > 1);
  const text = doc.text;
  const lower = normalize(text);
  const idx = words.map((w) => lower.indexOf(w)).filter((i) => i >= 0).sort((a, b) => a - b)[0] ?? 0;
  const start = Math.max(0, idx - 40);
  const s = text.slice(start, start + size);
  return (start > 0 ? "… " : "") + s + (start + size < text.length ? " …" : "");
}
