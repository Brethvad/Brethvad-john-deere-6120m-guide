import { AlertOctagon, ArrowRight, Search, Stethoscope, Wrench } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import { CabExplorer } from "@/components/CabExplorer";
import { PageHeader, PageView, Related } from "@/components/PageView";
import { SourceRefs } from "@/components/Sources";
import { sourceUrl } from "@/lib/sources";
import { VerificationBadge } from "@/components/Verification";
import { PAGES, search, snippet } from "@/content";
import { CONFIG, TRACTOR } from "@/content/config";
import { GLOSSARY } from "@/content/glossary";
import { INTERVAL_INFO, INTERVAL_ORDER, MAINTENANCE, SEASONAL } from "@/content/maintenance";
import { PROBLEMS } from "@/content/problems";
import { MANUAL_BASE, SOURCES } from "@/content/sources";
import { SPECS } from "@/content/specs";

export function ContentPage({ slug }: { slug: string }) {
  const page = PAGES[slug];
  if (!page) return <NotFound />;
  return <PageView page={page} />;
}

export function CabPage() {
  return <PageView page={PAGES.forerhus} before={<CabExplorer />} />;
}

// ─── Troubleshooting ───────────────────────────────────────────────────────

function List({ title, items, tone }: { title: string; items: string[]; tone?: "stop" | "dealer" }) {
  if (!items.length) return null;
  const cls = tone === "stop" ? "border-danger bg-danger-soft" : tone === "dealer" ? "border-info bg-info-soft" : "border-line bg-white";
  return (
    <div className={`rounded-lg border-l-4 p-3 ${cls}`}>
      <p className="text-sm font-bold">{title}</p>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-[15px] leading-relaxed">{items.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </div>
  );
}

export function TroubleshootingPage() {
  const { hash } = useLocation();
  const [q, setQ] = useState("");
  const [area, setArea] = useState("");
  const areas = [...new Set(PROBLEMS.map((p) => p.area))];
  const filtered = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return PROBLEMS.filter((p) => {
      if (area && p.area !== area) return false;
      const hay = [p.title, ...p.symptoms, ...p.causes].join(" ").toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [q, area]);

  return (
    <article>
      <PageHeader
        title="Feilsøking"
        intro="Finn symptomet, se mulige årsaker fra manualen, og hva du trygt kan sjekke selv. Et symptom beviser ikke hvilken del som er defekt."
      />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="ts-search" className="sr-only">Søk etter symptom</label>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input id="ts-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Beskriv symptomet, f.eks. «starter ikke» eller «rødt lys»" className="h-11 w-full rounded-lg border border-line bg-white pl-9 pr-3 focus:border-jd-600 focus:outline-none" />
        </div>
        <select aria-label="Område" value={area} onChange={(e) => setArea(e.target.value)} className="h-11 rounded-lg border border-line bg-white px-3">
          <option value="">Alle områder</option>
          {areas.map((a) => <option key={a}>{a}</option>)}
        </select>
      </div>
      <p className="mb-4 text-sm text-muted num" aria-live="polite">{filtered.length} problemer</p>
      <div className="space-y-4">
        {filtered.map((p) => (
          <details key={p.id} id={p.id} className="card group scroll-mt-24 open:shadow-sm" open={filtered.length <= 2 || hash === `#${p.id}`}>
            <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
              <Stethoscope className="size-5 shrink-0 text-jd-700" aria-hidden />
              <span className="flex-1">
                <span className="block font-semibold">{p.title}</span>
                <span className="block text-sm text-muted">{p.area} · {p.symptoms.slice(0, 2).join(" · ")}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted transition group-open:rotate-90" aria-hidden />
            </summary>
            <div className="space-y-3 border-t border-line p-4">
              <List title="1. Symptomer" items={p.symptoms} />
              <List title="2. Mulige årsaker (fra manualen)" items={p.causes} />
              <List title="3. Dette kan du trygt sjekke" items={p.checks} />
              <List title="4. Neste steg" items={p.next} />
              <List title="5. Stopp å bruke traktoren hvis …" items={p.stop} tone="stop" />
              <List title="6. Kontakt forhandler/verksted når …" items={p.dealer} tone="dealer" />
              <SourceRefs ids={p.sources} />
            </div>
          </details>
        ))}
        {!filtered.length && <p className="card p-6 text-center text-muted">Fant ingen problemer som passer. Prøv andre ord, eller bruk søket øverst.</p>}
      </div>
      <div className="mt-8 flex items-start gap-2 rounded-lg bg-info-soft p-4 text-sm">
        <AlertOctagon className="mt-0.5 size-4 shrink-0" aria-hidden />
        <p>Feilkoder vises i displayet sammen med en løsning. Guiden gjengir ikke feilkoder. Omgå aldri sikkerhetssystemer, og gjør ikke reparasjoner du ikke er opplært til.</p>
      </div>
      <Related slugs={["daglig-kontroll", "vedlikehold", "hydraulikk"]} />
    </article>
  );
}

// ─── Maintenance ───────────────────────────────────────────────────────────

export function MaintenancePage() {
  const [who, setWho] = useState("");
  const page = PAGES.vedlikehold;
  return (
    <PageView
      page={page}
      before={
        <section className="mb-10 space-y-6">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Hvem gjør jobben">
            {[["", "Alle"], ["fører", "Fører"], ["fører eller verksted", "Fører eller verksted"], ["verksted", "Verksted"]].map(([v, l]) => (
              <button key={v} onClick={() => setWho(v)} aria-pressed={who === v} className={`rounded-full px-3 py-1.5 text-sm font-medium ${who === v ? "bg-jd-700 text-white" : "border border-line bg-white hover:border-jd-600"}`}>
                {l}
              </button>
            ))}
          </div>
          {INTERVAL_ORDER.map((interval) => {
            const tasks = MAINTENANCE.filter((m) => m.interval === interval && (!who || m.who === who));
            if (!tasks.length) return null;
            return (
              <div key={interval} className="card overflow-hidden">
                <div className="border-b border-line bg-jd-50 px-4 py-2.5">
                  <h2 className="font-bold capitalize text-jd-900">{interval}</h2>
                  <p className="text-sm text-muted">{INTERVAL_INFO[interval]}</p>
                </div>
                <ul className="divide-y divide-line">
                  {tasks.map((t) => {
                    const s = SOURCES[t.source];
                    return (
                      <li key={t.task} className="grid gap-1 px-4 py-2.5 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-4">
                        <div>
                          <p className="text-[15px]">{t.task}</p>
                          {t.note && <p className="mt-0.5 text-sm text-muted">{t.note}</p>}
                          {s && <a href={sourceUrl(s)} target="_blank" rel="noopener noreferrer" className="text-xs text-jd-700 hover:underline">Kilde: {s.title}</a>}
                        </div>
                        <span className={`chip self-start ${t.who === "verksted" ? "bg-info-soft text-info" : t.who === "fører" ? "bg-jd-100 text-jd-800" : "bg-signal-soft text-[#5a4d00]"}`}>
                          <Wrench className="size-3" aria-hidden />{t.who}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <div className="grid gap-4 md:grid-cols-3">
            {[["Langtidslagring (over 6 mnd.)", SEASONAL.storage, "storage"], ["Ta traktoren i bruk igjen", SEASONAL.fromStorage, "storage-remove"], ["Vinter og kulde", SEASONAL.winter, "coolant-spec"]].map(([title, items, src]) => (
              <div key={title as string} className="card p-4">
                <h2 className="font-bold text-jd-900">{title as string}</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">{(items as string[]).map((i) => <li key={i}>{i}</li>)}</ul>
                <SourceRefs ids={[src as string]} />
              </div>
            ))}
          </div>
        </section>
      }
    />
  );
}

// ─── Specifications ────────────────────────────────────────────────────────

export function SpecsPage() {
  const groups = [...new Set(SPECS.map((s) => s.group))];
  return (
    <article>
      <PageHeader title="Spesifikasjoner" intro={`Verdier for ${TRACTOR.model} fra manualens spesifikasjonskapittel. Verdier som avhenger av utstyr er merket — sjekk traktorens egen ordreinformasjon og vognkort.`} />
      <div className="space-y-6">
        {groups.map((g) => (
          <section key={g} className="card overflow-x-auto">
            <h2 className="border-b border-line bg-jd-50 px-4 py-2.5 font-bold text-jd-900">{g}</h2>
            <table className="w-full min-w-[560px] text-left text-[15px]">
              <tbody className="divide-y divide-line">
                {SPECS.filter((s) => s.group === g).map((s) => (
                  <tr key={s.label} className="align-top">
                    <th scope="row" className="w-2/5 px-4 py-2.5 font-medium">{s.label}</th>
                    <td className="px-4 py-2.5 num">
                      {s.value}
                      {s.note && <p className="mt-0.5 text-sm text-muted">{s.note}</p>}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <VerificationBadge value={s.verification} />
                      <a href={sourceUrl(SOURCES[s.source] ?? { file: "" })} target="_blank" rel="noopener noreferrer" className="mt-1 block text-xs text-jd-700 hover:underline">kilde</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </div>
    </article>
  );
}

// ─── Glossary ──────────────────────────────────────────────────────────────

export function GlossaryPage() {
  const [q, setQ] = useState("");
  const list = GLOSSARY.filter((t) => `${t.term} ${t.en ?? ""} ${t.explanation}`.toLowerCase().includes(q.toLowerCase())).sort((a, b) => a.term.localeCompare(b.term, "nb"));
  return (
    <article>
      <PageHeader title="Ordliste" intro="Traktorord forklart med enkle ord, og hva de betyr på denne traktoren." />
      <label htmlFor="gl-search" className="sr-only">Filtrer ordlisten</label>
      <input id="gl-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filtrer …" className="mb-4 h-11 w-full max-w-md rounded-lg border border-line bg-white px-3 focus:border-jd-600 focus:outline-none" />
      <dl className="grid gap-3 md:grid-cols-2">
        {list.map((t) => (
          <div key={t.term} id={encodeURIComponent(t.term)} className="card scroll-mt-24 p-4">
            <dt className="font-bold text-jd-900">{t.term}{t.en && <span className="ml-2 text-sm font-normal text-muted">({t.en})</span>}</dt>
            <dd className="mt-1 text-[15px] leading-relaxed">{t.explanation}</dd>
            {t.onThisTractor && <dd className="mt-1 text-sm text-muted">På denne traktoren: {t.onThisTractor}</dd>}
            {t.link && <dd className="mt-2"><Link to={t.link} className="text-sm font-semibold text-jd-700 hover:underline">Les mer →</Link></dd>}
          </div>
        ))}
      </dl>
      <SourceRefs ids={["glossary"]} />
    </article>
  );
}

// ─── Sources & status ──────────────────────────────────────────────────────

export function SourcesPage() {
  const pages = Object.values(PAGES);
  return (
    <article className="space-y-10">
      <PageHeader title="Kilder, verifisering og begrensninger" intro="Hva guiden bygger på, hvor sikkert det er, og hva som fortsatt må sjekkes på selve traktoren." />

      <section>
        <h2 className="mb-2 text-xl font-bold text-jd-900">Kilde</h2>
        <p className="text-[16px] leading-relaxed">
          Primærkilde: John Deere operatørmanual <strong>{TRACTOR.manual}</strong> «Tractors 6110M, 6120M, 6130M and 6145M», lest fra{" "}
          <a className="text-jd-700 underline" href={`${MANUAL_BASE}toc.html`} target="_blank" rel="noopener noreferrer">manuals.deere.com</a>. Guiden er en
          forenklet, egenskrevet læringsressurs og gjengir ikke manualen. Alle tegninger, skisser og 3D-modellen er laget for guiden. Manualen er
          opphavsrettslig beskyttet av Deere &amp; Company.
        </p>
        <p className="mt-2 text-[16px] leading-relaxed">
          Norske lovkrav er ikke gjengitt. For lovlig fart, lys og vekter: se{" "}
          <a className="text-jd-700 underline" href="https://lovdata.no/dokument/SF/forskrift/1990-01-25-92" target="_blank" rel="noopener noreferrer">forskrift om bruk av kjøretøy (Lovdata)</a>,{" "}
          <a className="text-jd-700 underline" href="https://lovdata.no/dokument/SF/forskrift/1986-03-21-747" target="_blank" rel="noopener noreferrer">trafikkreglene (Lovdata)</a> og{" "}
          <a className="text-jd-700 underline" href="https://www.vegvesen.no" target="_blank" rel="noopener noreferrer">Statens vegvesen</a>.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-bold text-jd-900">Traktorens konfigurasjon</h2>
        <div className="space-y-3">
          {CONFIG.map((c) => (
            <div key={c.label} className="card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-bold">{c.label} <span className="font-normal text-muted">— {c.supplied}</span></p>
                <VerificationBadge value={c.verification} />
              </div>
              <p className="mt-2 text-[15px] leading-relaxed">{c.manual}</p>
              {c.todo && <p className="mt-2 rounded-lg bg-signal-soft p-2.5 text-sm"><strong>Sjekk:</strong> {c.todo}</p>}
              <SourceRefs ids={c.sources} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-bold text-jd-900">Kildekart</h2>
        <p className="mb-3 text-sm text-muted">Hvert avsnitt i guiden med verifiseringsstatus og kildesider i manualen.</p>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface text-muted">
              <tr><th className="px-3 py-2">Emne</th><th className="px-3 py-2">Avsnitt</th><th className="px-3 py-2">Status</th><th className="px-3 py-2">Kilder i manualen</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {pages.flatMap((p) =>
                p.sections.map((s) => (
                  <tr key={`${p.slug}-${s.id}`} className="align-top">
                    <td className="px-3 py-2 font-medium">{p.nav}</td>
                    <td className="px-3 py-2"><Link to={`/${p.slug}#${s.id}`} className="text-jd-700 hover:underline">{s.title}</Link></td>
                    <td className="px-3 py-2">{s.verification && <VerificationBadge value={s.verification} />}</td>
                    <td className="px-3 py-2 text-muted">
                      {(s.sources ?? []).map((id) => SOURCES[id]).filter(Boolean).map((src, i) => (
                        <span key={src.id}>{i > 0 && "; "}<a href={sourceUrl(src)} target="_blank" rel="noopener noreferrer" className="hover:underline">{src.title}</a></span>
                      ))}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-bold text-jd-900">Kjente begrensninger</h2>
        <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed">
          <li>Traktoren er en {TRACTOR.modelYear}-modell, mens manualen er utgave 19 fra 2020. En nyere utgave kan avvike på enkelte punkter. Serienummeret er ikke lagt inn ennå.</li>
          <li>Eieren har bekreftet fronthydraulikk, men ikke hvilken variant (frontløft, frontkoplinger og/eller frontlasteruttak).</li>
          <li>Eieren har bekreftet førerhusfjæring og LED-lys, men ikke fjæringstypen (mekanisk eller hydraulisk) eller hvilke lykter som sitter på.</li>
          <li>Plasseringen av enkelte brytere (firehjulstrekk, differensialsperre, krypegir) vises ikke i oversiktsbildene guiden bygger på.</li>
          <li>Manualen beskriver ikke speiljustering, og serviceoversiktens tabell kunne ikke leses kolonne for kolonne. Intervallene er derfor hentet fra hvilket servicekapittel oppgaven står i.</li>
          <li>Manualen er selvmotsigende om tauing: ett avsnitt sier at traktoren ikke kan taues, et annet beskriver tauing. Guiden anbefaler frakt på henger.</li>
          <li>3D-modellen er illustrativ og bygget av enkle former.</li>
          <li>Manualen kan være oppdatert etter utgave 19. Ved programvareoppdateringer kan det finnes funksjoner som ikke er beskrevet.</li>
        </ul>
      </section>
    </article>
  );
}

// ─── Search ────────────────────────────────────────────────────────────────

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [input, setInput] = useState(q);
  const results = useMemo(() => search(q), [q]);
  return (
    <article>
      <PageHeader title="Søk" intro="Søker i sider, avsnitt, betjeningsorganer, feilsøking, ordliste, spesifikasjoner og vedlikehold." />
      <form role="search" onSubmit={(e) => { e.preventDefault(); setParams(input.trim() ? { q: input.trim() } : {}); }} className="relative mb-6 max-w-xl">
        <label htmlFor="search-page" className="sr-only">Søk</label>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
        <input id="search-page" autoFocus type="search" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Søk …" className="h-12 w-full rounded-xl border border-line bg-white pl-9 pr-3 text-base focus:border-jd-600 focus:outline-none" />
      </form>
      {q && <p className="mb-3 text-sm text-muted" aria-live="polite">{results.length} treff for «{q}»</p>}
      <ul className="space-y-2">
        {results.map((r) => (
          <li key={r.id}>
            <Link to={r.to} className="card block p-4 hover:border-jd-600">
              <span className="flex flex-wrap items-center gap-2">
                <span className="chip bg-jd-100 text-jd-800">{r.kind}</span>
                <span className="font-semibold">{r.title}</span>
                <span className="text-sm text-muted">· {r.context}</span>
              </span>
              {r.text && <span className="mt-1 block text-sm text-muted">{snippet(r, q)}</span>}
            </Link>
          </li>
        ))}
      </ul>
      {q && !results.length && <p className="card p-6 text-center text-muted">Ingen treff. Prøv et annet ord, f.eks. «olje», «lys», «PTO» eller «gruppe».</p>}
    </article>
  );
}

export function NotFound() {
  const { pathname } = useLocation();
  return (
    <article className="py-16 text-center">
      <h1 className="text-3xl font-bold text-jd-900">Siden finnes ikke</h1>
      <p className="mt-2 text-muted">Fant ikke «{pathname}».</p>
      <Link to="/" className="mt-6 inline-flex items-center gap-1 rounded-lg bg-jd-700 px-4 py-2 font-semibold text-white">Til oversikten</Link>
    </article>
  );
}
