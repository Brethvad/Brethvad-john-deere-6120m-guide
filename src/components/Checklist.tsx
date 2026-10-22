import { Check, PowerOff, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { CHECKLISTS } from "@/content/checklists";
import { SOURCES } from "@/content/sources";
import { load, save } from "@/lib/storage";
import { sourceUrl } from "@/lib/sources";

export function ChecklistView({ id }: { id: string }) {
  const list = CHECKLISTS[id];
  const key = `checklist:${id}`;
  const [done, setDone] = useState<Record<string, boolean>>(() => load(key, {}));
  useEffect(() => save(key, done), [key, done]);
  if (!list) return null;

  const total = list.groups.reduce((n, g) => n + g.items.length, 0);
  const count = Object.values(done).filter(Boolean).length;

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-jd-50 px-4 py-3">
        <div>
          <p className="font-semibold text-jd-900">{list.title}</p>
          <p className="text-sm text-muted num" aria-live="polite">{count} av {total} punkter kontrollert</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-32 overflow-hidden rounded-full bg-white" aria-hidden>
            <div className="h-full bg-jd-600 transition-all" style={{ width: `${(count / total) * 100}%` }} />
          </div>
          <button onClick={() => setDone({})} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted hover:bg-white hover:text-ink">
            <RotateCcw className="size-4" aria-hidden /> Nullstill
          </button>
        </div>
      </div>
      {list.intro && <p className="px-4 pt-3 text-sm text-muted">{list.intro}</p>}
      <div className="divide-y divide-line">
        {list.groups.map((g, gi) => (
          <fieldset key={g.title} className="px-4 py-3">
            <legend className="sr-only">{g.title}</legend>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="font-semibold">{g.title}</span>
              <span className="chip bg-surface text-muted"><PowerOff className="size-3" aria-hidden />{g.condition}</span>
            </div>
            <ul className="space-y-1">
              {g.items.map((item, ii) => {
                const k = `${gi}-${ii}`;
                const checked = !!done[k];
                const src = item.source ? SOURCES[item.source] : undefined;
                return (
                  <li key={k}>
                    <label className={`flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-surface ${checked ? "text-muted" : ""}`}>
                      <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => setDone((d) => ({ ...d, [k]: !d[k] }))} />
                      <span className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-jd-500 ${checked ? "border-jd-600 bg-jd-600 text-white" : "border-line bg-white"}`} aria-hidden>
                        {checked && <Check className="size-4" />}
                      </span>
                      <span className="text-[15px] leading-relaxed">
                        <span className={checked ? "line-through decoration-1" : ""}>{item.text}</span>
                        {src && (
                          <a href={sourceUrl(src.file)} target="_blank" rel="noopener noreferrer" className="ml-1 text-xs text-jd-700 hover:underline" onClick={(e) => e.stopPropagation()}>
                            [kilde]
                          </a>
                        )}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
