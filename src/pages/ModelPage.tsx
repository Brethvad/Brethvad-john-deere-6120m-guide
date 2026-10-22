import { AlertTriangle, ArrowRight, Info, Move3d, RotateCcw } from "lucide-react";
import { Component, Suspense, lazy, useMemo, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router";
import { PageHeader } from "@/components/PageView";
import { SourceRefs } from "@/components/Sources";
import { VerificationBadge } from "@/components/Verification";
import { AREA_LABEL, PARTS } from "@/content/parts";
import type { ModelArea } from "@/content/types";
import { hasWebGL, type ViewPreset } from "@/three/support";

const TractorScene = lazy(() => import("@/three/TractorScene"));

const VIEW_LABELS: [ViewPreset, string][] = [
  ["standard", "Standard"],
  ["foran", "Forfra"],
  ["bak", "Bakfra"],
  ["venstre", "Venstre"],
  ["hoyre", "Høyre"],
  ["ovenfra", "Ovenfra"],
  ["forerhus", "Førerhus"],
];

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function Fallback({ reason }: { reason: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
      <AlertTriangle className="size-8 text-[#d97706]" aria-hidden />
      <p className="font-semibold">3D-modellen kan ikke vises</p>
      <p className="max-w-sm text-sm text-muted">{reason} Du kan fortsatt velge delene i listen til høyre og lese om dem.</p>
    </div>
  );
}

export function ModelPage() {
  const [params, setParams] = useSearchParams();
  const selected = params.get("del") ?? "";
  const [area, setArea] = useState<ModelArea | "">("");
  const [view, setView] = useState<ViewPreset>("standard");
  const [token, setToken] = useState(0);
  const webgl = useMemo(() => hasWebGL(), []);
  const part = PARTS.find((p) => p.id === selected);

  const select = (id: string) => {
    const p = new URLSearchParams(params);
    p.set("del", id);
    setParams(p, { replace: true, preventScrollReset: true });
  };

  const parts = PARTS.filter((p) => !area || p.area === area);

  return (
    <article>
      <PageHeader
        title="Utforsk traktoren i 3D"
        intro="Drei, zoom og flytt modellen. Klikk på en del for å se hva den gjør, hvordan den brukes og hva du må passe på."
      />

      <div className="mb-4 flex items-start gap-2 rounded-lg border border-signal bg-signal-soft p-3 text-sm">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        <p>
          <strong>Illustrativ modell.</strong> Modellen er bygget av enkle former for å vise hvor delene sitter. Hovedmålene følger manualen
          (akselavstand 2580 mm, høyde ca. 2,7–2,9 m), men formene er ikke fabrikknøyaktige. Utstyr som frontløft vises selv om det ikke er bekreftet på din traktor.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div>
          <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label="Kameravinkel">
            {VIEW_LABELS.map(([v, l]) => (
              <button
                key={v}
                onClick={() => {
                  setArea("");
                  setView(v);
                  setToken((t) => t + 1);
                }}
                aria-pressed={view === v && !area}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${view === v && !area ? "bg-jd-700 text-white" : "border border-line bg-white hover:border-jd-600"}`}
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => {
                setArea("");
                setView("standard");
                setToken((t) => t + 1);
              }}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-sm font-medium hover:border-jd-600"
            >
              <RotateCcw className="size-4" aria-hidden /> Tilbakestill kamera
            </button>
          </div>
          <div className="card relative h-[58vh] min-h-[340px] overflow-hidden bg-[#eef2ea]">
            {webgl ? (
              <SceneBoundary fallback={<Fallback reason="Det oppstod en feil i 3D-visningen." />}>
                <Suspense fallback={<div className="flex h-full items-center justify-center text-muted">Laster 3D-modell …</div>}>
                  <TractorScene selected={selected} onSelect={select} area={area} view={view} viewToken={token} />
                </Suspense>
              </SceneBoundary>
            ) : (
              <Fallback reason="Nettleseren eller enheten din støtter ikke WebGL." />
            )}
            <p className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-white/85 px-2 py-1 text-xs text-muted">
              <Move3d className="size-3.5" aria-hidden /> Dra = drei · rull/klyp = zoom · høyreklikk eller to fingre = flytt
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Område">
            <span className="mr-1 self-center text-sm text-muted">Område:</span>
            {(["", ...Object.keys(AREA_LABEL)] as (ModelArea | "")[]).map((a) => (
              <button
                key={a || "alle"}
                onClick={() => {
                  setArea(a);
                  setToken((t) => t + 1);
                }}
                aria-pressed={area === a}
                className={`rounded-full px-3 py-1 text-sm ${area === a ? "bg-jd-700 text-white" : "border border-line bg-white hover:border-jd-600"}`}
              >
                {a ? AREA_LABEL[a] : "Alle"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 xl:sticky xl:top-20 xl:self-start">
          {part ? (
            <div className="card p-5" aria-live="polite">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-xl font-bold text-jd-900">{part.name}</h2>
                  <p className="text-sm text-muted">{AREA_LABEL[part.area]}</p>
                </div>
                <VerificationBadge value={part.verification} />
              </div>
              <dl className="mt-4 space-y-3 text-[15px] leading-relaxed">
                <div><dt className="text-sm font-semibold text-muted">Hva den gjør</dt><dd>{part.what}</dd></div>
                <div><dt className="text-sm font-semibold text-muted">Slik virker den</dt><dd>{part.how}</dd></div>
                <div><dt className="text-sm font-semibold text-muted">Når den brukes</dt><dd>{part.when}</dd></div>
                {part.operate && <div><dt className="text-sm font-semibold text-muted">Betjening</dt><dd>{part.operate}</dd></div>}
                <div className="rounded-lg border-l-4 border-[#d97706] bg-warn-soft p-3">
                  <dt className="text-sm font-bold text-[#4a3000]">Sikkerhet</dt>
                  <dd><ul className="mt-1 list-disc space-y-1 pl-5">{part.safety.map((s, i) => <li key={i}>{s}</li>)}</ul></dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <SourceRefs ids={part.sources} compact />
                <Link to={part.link} className="inline-flex items-center gap-1 text-sm font-semibold text-jd-700 hover:underline">
                  Les veiledningen <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          ) : (
            <div className="card p-5 text-muted">Velg en del i modellen eller i listen.</div>
          )}
          <div className="card max-h-[50vh] divide-y divide-line overflow-y-auto">
            {parts.map((p) => (
              <button
                key={p.id}
                onClick={() => select(p.id)}
                aria-current={p.id === selected}
                className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left hover:bg-jd-50 ${p.id === selected ? "bg-jd-50 font-semibold" : ""}`}
              >
                <span>{p.name}</span>
                <span className="text-xs text-muted">{AREA_LABEL[p.area]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
