import { ArrowRight, Lightbulb } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { PAGES } from "@/content";
import type { Block, Page, Section } from "@/content/types";
import { Diagram } from "@/diagrams";
import { Callout } from "./Callout";
import { ChecklistView } from "./Checklist";
import { SourceRefs } from "./Sources";
import { VerificationBadge } from "./Verification";

function SimpleBlock({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-signal bg-signal-soft px-3 py-1 text-sm font-medium text-[#4a4100] hover:bg-signal"
      >
        <Lightbulb className="size-4" aria-hidden /> {open ? "Skjul forenklet forklaring" : "Vis forenklet forklaring"}
      </button>
      {open && <p className="mt-2 rounded-lg bg-signal-soft/60 p-3 text-[15px] leading-relaxed">{text}</p>}
    </div>
  );
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-[16px] leading-relaxed">{block.text}</p>;
    case "simple":
      return <SimpleBlock text={block.text} />;
    case "list":
      return (
        <ul className="space-y-1.5 pl-1">
          {block.items.map((t, i) => (
            <li key={i} className="flex gap-2.5 text-[16px] leading-relaxed">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-jd-600" aria-hidden />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <div>
          {block.title && <p className="mb-2 font-semibold text-jd-900">{block.title}</p>}
          <ol className="space-y-2">
            {block.items.map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-jd-700 text-sm font-bold text-white num" aria-hidden>{i + 1}</span>
                <span className="pt-0.5 text-[16px] leading-relaxed">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    case "callout":
      return <Callout kind={block.kind} title={block.title}>{block.text}</Callout>;
    case "table":
      return (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-[15px]">
            {block.caption && <caption className="border-b border-line bg-jd-50 px-4 py-2 text-left text-sm font-semibold text-jd-900">{block.caption}</caption>}
            <thead className="bg-surface text-sm text-muted">
              <tr>{block.head.map((h) => <th key={h} scope="col" className="px-4 py-2 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-line">
              {block.rows.map((r, i) => (
                <tr key={i} className="align-top">
                  {r.map((c, j) => (j === 0 ? <th key={j} scope="row" className="px-4 py-2 font-medium">{c}</th> : <td key={j} className="px-4 py-2 num">{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "diagram":
      return <Diagram id={block.id} caption={block.caption} />;
    case "checklist":
      return <ChecklistView id={block.id} />;
    case "details":
      return (
        <details className="card group p-4">
          <summary className="cursor-pointer font-semibold text-jd-800 marker:text-jd-600">{block.title}</summary>
          <div className="mt-3 space-y-3">{block.blocks.map((b, i) => <BlockView key={i} block={b} />)}</div>
        </details>
      );
  }
}

export function SectionView({ section }: { section: Section }) {
  return (
    <section id={section.id} className="scroll-mt-24">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h2 className="text-xl font-bold tracking-tight text-jd-900 sm:text-2xl">{section.title}</h2>
        {section.verification && <VerificationBadge value={section.verification} />}
      </div>
      <div className="space-y-4">
        {section.blocks.map((b, i) => <BlockView key={i} block={b} />)}
      </div>
      <SourceRefs ids={section.sources} />
    </section>
  );
}

export function PageHeader({ title, intro }: { title: string; intro: string }) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-jd-900 sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">{intro}</p>
    </header>
  );
}

export function Toc({ sections }: { sections: Section[] }) {
  return (
    <nav aria-label="Innhold på siden" className="card mb-8 p-4">
      <p className="mb-2 text-sm font-semibold text-muted">På denne siden</p>
      <ol className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="flex gap-2 rounded px-1 py-0.5 text-[15px] text-jd-800 hover:bg-jd-50">
              <span className="text-muted num">{i + 1}.</span> {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Related({ slugs }: { slugs?: string[] }) {
  const pages = (slugs ?? []).map((s) => PAGES[s]).filter(Boolean);
  const extra = (slugs ?? []).filter((s) => !PAGES[s]);
  const labels: Record<string, string> = { feilsoking: "Feilsøking", spesifikasjoner: "Spesifikasjoner", ordliste: "Ordliste" };
  if (!pages.length && !extra.length) return null;
  return (
    <aside className="mt-12 border-t border-line pt-6">
      <p className="mb-3 text-sm font-semibold text-muted">Relaterte emner</p>
      <div className="flex flex-wrap gap-2">
        {pages.map((p) => (
          <Link key={p.slug} to={`/${p.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-jd-800 hover:border-jd-600">
            {p.nav} <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        ))}
        {extra.map((s) => (
          <Link key={s} to={`/${s}`} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-jd-800 hover:border-jd-600">
            {labels[s] ?? s} <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        ))}
      </div>
    </aside>
  );
}

export function PageView({ page, before }: { page: Page; before?: React.ReactNode }) {
  return (
    <article>
      <PageHeader title={page.title} intro={page.intro} />
      {before}
      {page.sections.length > 2 && <Toc sections={page.sections} />}
      <div className="space-y-12">
        {page.sections.map((s) => <SectionView key={s.id} section={s} />)}
      </div>
      <Related slugs={page.related} />
    </article>
  );
}
