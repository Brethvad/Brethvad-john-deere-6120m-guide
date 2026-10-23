import { AlertOctagon, ArrowRight, Box, ClipboardCheck, Clock, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Icon } from "@/components/Icon";
import { VerificationBadge } from "@/components/Verification";
import { CHECKLISTS } from "@/content/checklists";
import { CONFIG, TRACTOR } from "@/content/config";
import { load } from "@/lib/storage";
import { recentPages } from "@/lib/recent";

const SYSTEMS = [
  { to: "/forerhus", icon: "armchair", title: "Førerhus", text: "Hva gjør denne bryteren? Klikk deg rundt i førerplassen." },
  { to: "/girkasse", icon: "cog", title: "Girkasse", text: "Grupper, gir, automatikk og retningsskifte på AutoQuad™ PLUS." },
  { to: "/hydraulikk", icon: "droplets", title: "Hydraulikk", text: "Bakre uttak, frontløft, frontkoplinger og frontlaster — hver for seg." },
  { to: "/fjaering", icon: "waves", title: "Fjæring", text: "Fjæret foraksel og førerhusfjæring." },
  { to: "/lys", icon: "lightbulb", title: "Lys", text: "Veilys, arbeidslys, blinklys og sjekkliste for sikt." },
  { to: "/redskap", icon: "link", title: "Redskap", text: "Trepunktsløft, kraftuttak og trekkstang." },
];

const TASKS = [
  { to: "/betjening#start", label: "Starte motoren" },
  { to: "/girkasse#start", label: "Kjøre av gårde" },
  { to: "/girkasse#gruppespak", label: "Bytte gruppe og gir" },
  { to: "/girkasse#parkere", label: "Stoppe og parkere" },
  { to: "/hydraulikk#koble-til", label: "Koble til hydraulikkslanger" },
  { to: "/redskap#koble-til", label: "Koble til redskap i trepunktet" },
  { to: "/veitransport#klargjoring", label: "Klargjøre for veikjøring" },
  { to: "/manedlig-kontroll", label: "Månedlig smøring og kontroll" },
  { to: "/feilsoking#varsellys", label: "Et varsellys lyser" },
];

const ALERTS = [
  { title: "Rødt STOP-lys", text: "Stopp motoren umiddelbart og les meldingen i displayet.", to: "/feilsoking#varsellys" },
  { title: "Kjøreretningshendelen starter traktoren", text: "Med motoren i gang og en gruppe valgt kjører traktoren så snart hendelen flyttes.", to: "/girkasse#start" },
  { title: "Olje under trykk", text: "Let aldri etter hydraulikklekkasjer med hendene. Bruk papp.", to: "/hydraulikk#koble-fra" },
  { title: "Parkeringslås, ikke gir", text: "Et gir som står inne med motoren av hindrer ikke traktoren i å rulle.", to: "/betjening#parkere" },
];

function TractorIllustration() {
  return (
    <svg viewBox="0 0 520 300" className="h-auto w-full" role="img" aria-label="Illustrasjon av en traktor sett fra siden">
      <ellipse cx="270" cy="268" rx="230" ry="12" fill="#000" opacity="0.08" />
      <path d="M90 200 H380 L420 150 V120 H350 V40 H215 V128 H150 L95 150 Z" fill="#367c2b" />
      <rect x="225" y="50" width="115" height="75" rx="6" fill="#cfe6f0" opacity="0.9" />
      <rect x="213" y="32" width="146" height="14" rx="5" fill="#2b6223" />
      <path d="M95 150 H215 V128 H150 Z" fill="#2f6b25" />
      <rect x="198" y="38" width="8" height="110" rx="3" fill="#3a3f3a" />
      <circle cx="140" cy="222" r="44" fill="#1f221f" /><circle cx="140" cy="222" r="20" fill="#ffde00" />
      <circle cx="370" cy="210" r="58" fill="#1f221f" /><circle cx="370" cy="210" r="27" fill="#ffde00" />
      <rect x="82" y="168" width="14" height="10" rx="2" fill="#fffbe6" />
      <rect x="420" y="128" width="40" height="8" rx="2" fill="#5d6560" />
    </svg>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const recent = recentPages();
  const daily = CHECKLISTS.daglig;
  const total = daily.groups.reduce((n, g) => n + g.items.length, 0);
  const done = Object.values(load<Record<string, boolean>>("checklist:daglig", {})).filter(Boolean).length;

  return (
    <div className="space-y-10">
      <section className="card overflow-hidden">
        <div className="grid items-center gap-6 bg-gradient-to-br from-jd-50 to-white p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
          <div>
            <p className="chip bg-jd-100 text-jd-800">Interaktiv førerguide · norsk bokmål</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-jd-900 sm:text-4xl">{TRACTOR.model}</h1>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Lær betjening, daglig kontroll og feilsøking — med 3D-modell, førerhusutforsker og kildehenvisning til operatørmanualen {TRACTOR.manual}.
            </p>
            <form
              role="search"
              className="relative mt-5 max-w-lg"
              onSubmit={(e) => {
                e.preventDefault();
                if (q.trim()) navigate(`/sok?q=${encodeURIComponent(q.trim())}`);
              }}
            >
              <label htmlFor="home-search" className="sr-only">Søk i guiden</label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
              <input
                id="home-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Hva lurer du på? F.eks. «hydraulikk virker ikke»"
                className="h-12 w-full rounded-xl border border-line bg-white pl-11 pr-28 text-base focus:border-jd-600 focus:outline-none"
              />
              <button type="submit" className="absolute right-1.5 top-1.5 h-9 rounded-lg bg-jd-700 px-4 text-sm font-semibold text-white hover:bg-jd-800">Søk</button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/3d" className="inline-flex items-center gap-1.5 rounded-lg bg-jd-700 px-4 py-2 text-sm font-semibold text-white hover:bg-jd-800">
                <Box className="size-4" aria-hidden /> Utforsk i 3D
              </Link>
              <Link to="/daglig-kontroll" className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold hover:border-jd-600">
                <ClipboardCheck className="size-4" aria-hidden /> Daglig kontroll
              </Link>
            </div>
          </div>
          <Link to="/3d" aria-label="Åpne 3D-modellen" className="block">
            <TractorIllustration />
          </Link>
        </div>
      </section>

      <section aria-labelledby="sikkerhet">
        <h2 id="sikkerhet" className="mb-3 text-lg font-bold text-jd-900">Viktigste sikkerhetsregler</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {ALERTS.map((a) => (
            <Link key={a.title} to={a.to} className="group rounded-xl border-l-4 border-danger bg-danger-soft p-4 hover:shadow-sm">
              <p className="flex items-center gap-2 font-bold text-[#5c120c]"><AlertOctagon className="size-4" aria-hidden />{a.title}</p>
              <p className="mt-1 text-sm text-[#5c120c]">{a.text}</p>
            </Link>
          ))}
        </div>
        <Link to="/sikkerhet" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-jd-700 hover:underline">
          Alle sikkerhetsregler <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="systemer">
          <h2 id="systemer" className="mb-3 text-lg font-bold text-jd-900">Systemer</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {SYSTEMS.map((s) => (
              <Link key={s.to} to={s.to} className="card group flex gap-3 p-4 hover:border-jd-600">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-jd-100 text-jd-700">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <span>
                  <span className="flex items-center gap-1 font-semibold">{s.title}<ArrowRight className="size-3.5 opacity-0 transition group-hover:opacity-100" aria-hidden /></span>
                  <span className="text-sm text-muted">{s.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section aria-labelledby="oppgaver">
            <h2 id="oppgaver" className="mb-3 text-lg font-bold text-jd-900">Vanlige oppgaver</h2>
            <ul className="card divide-y divide-line">
              {TASKS.map((t) => (
                <li key={t.to}>
                  <Link to={t.to} className="flex items-center justify-between px-4 py-2.5 hover:bg-jd-50">
                    {t.label} <ArrowRight className="size-4 text-muted" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="daglig" className="card p-4">
            <h2 id="daglig" className="font-bold text-jd-900">Daglig kontroll i dag</h2>
            <p className="mt-1 text-sm text-muted num">{done} av {total} punkter avkrysset</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface" aria-hidden>
              <div className="h-full bg-jd-600" style={{ width: `${(done / total) * 100}%` }} />
            </div>
            <Link to="/daglig-kontroll" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-jd-700 hover:underline">
              Åpne sjekklisten <ArrowRight className="size-4" aria-hidden />
            </Link>
          </section>

          {recent.length > 0 && (
            <section aria-labelledby="nylig">
              <h2 id="nylig" className="mb-2 flex items-center gap-1.5 text-lg font-bold text-jd-900"><Clock className="size-4" aria-hidden />Nylig sett</h2>
              <div className="flex flex-wrap gap-2">
                {recent.map((r) => (
                  <Link key={r.path} to={r.path} className="rounded-full border border-line bg-white px-3 py-1 text-sm hover:border-jd-600">{r.title}</Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <section aria-labelledby="konfig">
        <h2 id="konfig" className="mb-1 text-lg font-bold text-jd-900">Denne traktoren</h2>
        <p className="mb-3 text-sm text-muted">Oppgitt konfigurasjon sammenholdt med manualen. Gule punkter må sjekkes på selve traktoren.</p>
        <div className="card divide-y divide-line">
          {CONFIG.map((c) => (
            <div key={c.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[180px_1fr_auto] sm:items-center sm:gap-4">
              <span className="font-semibold">{c.label}</span>
              <span className="text-sm text-muted">{c.supplied}</span>
              <VerificationBadge value={c.verification} />
            </div>
          ))}
        </div>
        <Link to="/kilder" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-jd-700 hover:underline">
          Se detaljer og hva som må sjekkes <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>
    </div>
  );
}
