import { AlertTriangle, ArrowRight, CircleHelp, ListChecks, MapPin, Wrench } from "lucide-react";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { CONTROLS, ZONE_LABEL } from "@/content/controls";
import type { CabZone, Control } from "@/content/types";
import { SourceRefs } from "./Sources";
import { VerificationBadge } from "./Verification";

const ZONES = Object.keys(ZONE_LABEL) as CabZone[];

/** Original schematic of the operator's view. Shapes are approximate. */
function CabSchematic({ selected, zone, onSelect }: { selected?: string; zone?: string; onSelect: (id: string) => void }) {
  const placed = CONTROLS.filter((c) => c.pos);
  return (
    <svg viewBox="0 0 100 100" className="h-auto w-full select-none" role="group" aria-label="Skisse av førerplassen med betjeningsorganer">
      <defs>
        <linearGradient id="glass" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#dfeef6" />
          <stop offset="1" stopColor="#f4f8f1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="100" rx="3" fill="url(#glass)" />
      {/* cab pillars */}
      <path d="M2 2 L14 98" stroke="#9aa59a" strokeWidth="2.2" />
      <path d="M98 2 L96 60" stroke="#9aa59a" strokeWidth="2.2" />
      {/* upper right panel */}
      <rect x="86" y="10" width="13" height="26" rx="1.5" fill="#cfd8cc" stroke="#7d8a7b" strokeWidth="0.3" />
      {/* dashboard */}
      <path d="M22 18 H78 L74 60 H26 Z" fill="#d9ddd6" stroke="#7d8a7b" strokeWidth="0.3" />
      <rect x="33" y="17" width="42" height="15" rx="2" fill="#2f342e" />
      <circle cx="41" cy="24.5" r="5" fill="#454c44" />
      <circle cx="59" cy="24.5" r="5" fill="#454c44" />
      <rect x="47.5" y="20" width="5" height="9" rx="0.8" fill="#cfe3c7" />
      {/* steering column & wheel */}
      <rect x="47" y="40" width="6" height="22" fill="#6c766a" />
      <circle cx="50" cy="38" r="14" fill="none" stroke="#3a403a" strokeWidth="2.2" />
      <circle cx="50" cy="38" r="3" fill="#3a403a" />
      {/* floor & pedals */}
      <path d="M14 66 H80 L84 98 H12 Z" fill="#c4cbc1" />
      <rect x="29" y="80" width="7" height="8" rx="1" fill="#555" />
      <rect x="56" y="80" width="5" height="8" rx="1" fill="#555" />
      <rect x="62" y="80" width="5" height="8" rx="1" fill="#555" />
      <rect x="71" y="78" width="4" height="11" rx="1" fill="#555" />
      {/* seat */}
      <path d="M38 66 H62 L64 80 H36 Z" fill="#475047" opacity="0.85" />
      {/* right console */}
      <path d="M76 42 H99 V99 H80 Z" fill="#b9c7b4" stroke="#7d8a7b" strokeWidth="0.3" />
      <text x="88" y="98" fontSize="2.4" textAnchor="middle" fill="#3d4a3b">høyre konsoll</text>
      <text x="92.5" y="9" fontSize="2.2" textAnchor="middle" fill="#3d4a3b">panel</text>

      {placed.map((c, i) => {
        const active = c.id === selected;
        const dim = zone && c.zone !== zone;
        return (
          <g
            key={c.id}
            transform={`translate(${c.pos!.x} ${c.pos!.y})`}
            className="cursor-pointer"
            opacity={dim ? 0.25 : 1}
            onClick={() => onSelect(c.id)}
            role="button"
            tabIndex={0}
            aria-label={c.name}
            aria-pressed={active}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelect(c.id))}
          >
            {active && <circle r="4.2" fill="#ffde00" opacity="0.6" />}
            <circle r="2.7" fill={active ? "#1d4524" : "#367c2b"} stroke="#fff" strokeWidth="0.6" />
            <text y="0.9" fontSize="2.5" fontWeight="700" textAnchor="middle" fill="#fff">{i + 1}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ControlDetail({ c }: { c: Control }) {
  return (
    <div className="card p-5" aria-live="polite">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold text-jd-900">{c.name}</h3>
          <p className="text-sm text-muted">{c.nameEn} · {ZONE_LABEL[c.zone]}</p>
        </div>
        <VerificationBadge value={c.verification} />
      </div>
      {c.note && <p className="mt-3 rounded-lg bg-signal-soft px-3 py-2 text-sm">{c.note}</p>}
      <dl className="mt-4 space-y-4 text-[15px] leading-relaxed">
        <div>
          <dt className="flex items-center gap-1.5 text-sm font-semibold text-muted"><MapPin className="size-4" aria-hidden />Hvor</dt>
          <dd>{c.location}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-muted">Hva den gjør</dt>
          <dd>{c.what}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-sm font-semibold text-muted"><ListChecks className="size-4" aria-hidden />Slik bruker du den</dt>
          <dd>
            <ol className="mt-1 list-decimal space-y-1 pl-5">{c.how.map((h, i) => <li key={i}>{h}</li>)}</ol>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-muted">Det skal skje</dt>
          <dd>{c.expect}</dd>
        </div>
        {c.mistakes.length > 0 && (
          <div>
            <dt className="text-sm font-semibold text-muted">Vanlige feil</dt>
            <dd><ul className="mt-1 list-disc space-y-1 pl-5">{c.mistakes.map((m, i) => <li key={i}>{m}</li>)}</ul></dd>
          </div>
        )}
        {c.safety.length > 0 && (
          <div className="rounded-lg border-l-4 border-[#d97706] bg-warn-soft p-3">
            <dt className="flex items-center gap-1.5 text-sm font-bold text-[#4a3000]"><AlertTriangle className="size-4" aria-hidden />Sikkerhet</dt>
            <dd><ul className="mt-1 list-disc space-y-1 pl-5">{c.safety.map((m, i) => <li key={i}>{m}</li>)}</ul></dd>
          </div>
        )}
        {c.ifNotWorking && (
          <div>
            <dt className="flex items-center gap-1.5 text-sm font-semibold text-muted"><Wrench className="size-4" aria-hidden />Hvis det ikke virker</dt>
            <dd><ul className="mt-1 list-disc space-y-1 pl-5">{c.ifNotWorking.map((m, i) => <li key={i}>{m}</li>)}</ul></dd>
          </div>
        )}
      </dl>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <SourceRefs ids={c.sources} compact />
        {c.link && (
          <Link to={c.link} className="inline-flex items-center gap-1 text-sm font-semibold text-jd-700 hover:underline">
            Les mer <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}

export function CabExplorer() {
  const [params, setParams] = useSearchParams();
  const selectedId = params.get("k") ?? "tenningslas";
  const zone = params.get("omrade") ?? "";
  const selected = CONTROLS.find((c) => c.id === selectedId) ?? CONTROLS[0];
  const placedIndex = useMemo(() => new Map(CONTROLS.filter((c) => c.pos).map((c, i) => [c.id, i + 1])), []);

  const select = (id: string) => {
    const p = new URLSearchParams(params);
    p.set("k", id);
    setParams(p, { replace: true, preventScrollReset: true });
  };
  const setZone = (z: string) => {
    const p = new URLSearchParams(params);
    if (z) p.set("omrade", z);
    else p.delete("omrade");
    setParams(p, { replace: true, preventScrollReset: true });
  };

  const list = CONTROLS.filter((c) => !zone || c.zone === zone);

  return (
    <section aria-labelledby="utforsker" className="mb-12">
      <h2 id="utforsker" className="sr-only">Førerhusutforsker</h2>
      <div className="mb-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Område i førerhuset">
        {["", ...ZONES].map((z) => (
          <button
            key={z || "alle"}
            role="tab"
            aria-selected={zone === z}
            onClick={() => setZone(z)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${zone === z ? "bg-jd-700 text-white" : "border border-line bg-white text-ink hover:border-jd-600"}`}
          >
            {z ? ZONE_LABEL[z] : "Alle"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="card overflow-hidden p-2">
            <CabSchematic selected={selected.id} zone={zone} onSelect={select} />
            <p className="flex items-start gap-1.5 px-2 pb-1 pt-2 text-xs text-muted">
              <CircleHelp className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              Forenklet skisse laget for guiden. Plasseringene bygger på manualens oversiktsbilder for traktor med PowrQuad™ PLUS/AutoQuad™ PLUS og kan avvike på din traktor. Organer uten nummer har ikke verifisert plassering.
            </p>
          </div>
          <div className="card divide-y divide-line">
            {list.map((c) => (
              <button
                key={c.id}
                onClick={() => select(c.id)}
                aria-current={c.id === selected.id}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-jd-50 ${c.id === selected.id ? "bg-jd-50" : ""}`}
              >
                <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${placedIndex.has(c.id) ? "bg-jd-600 text-white" : "border border-dashed border-muted text-muted"}`}>
                  {placedIndex.get(c.id) ?? "–"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{c.name}</span>
                  <span className="block truncate text-xs text-muted">{c.what}</span>
                </span>
                {c.verification !== "verifisert" && <span className="size-2 shrink-0 rounded-full bg-signal" title="Avhenger av utstyr / ikke verifisert" />}
              </button>
            ))}
          </div>
        </div>
        <div className="xl:sticky xl:top-20 xl:self-start">
          <ControlDetail c={selected} />
        </div>
      </div>
    </section>
  );
}
