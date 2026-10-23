import { BookOpen, ExternalLink } from "lucide-react";
import { SOURCES } from "@/content/sources";
import { sourceUrl } from "@/lib/sources";

/** Collapsible list of manual pages a section is based on. */
export function SourceRefs({ ids, compact = false }: { ids?: string[]; compact?: boolean }) {
  const list = (ids ?? []).map((id) => SOURCES[id]).filter(Boolean);
  if (!list.length) return null;
  return (
    <details className={`group ${compact ? "" : "mt-4"} text-sm`}>
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-md px-1.5 py-1 text-muted hover:bg-jd-50 hover:text-jd-800">
        <BookOpen className="size-4" aria-hidden />
        {list.every((s) => !s.url) ? "Kilde i manualen" : "Kilder"} ({list.length})
      </summary>
      <ul className="mt-2 space-y-1.5 border-l-2 border-jd-100 pl-3">
        {list.map((s) => (
          <li key={s.id}>
            <a href={sourceUrl(s)} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-start gap-1 text-jd-700 hover:underline">
              <span>
                <span className="font-medium">{s.title}</span>
                <span className="text-muted"> — {s.section}</span>
              </span>
              <ExternalLink className="mt-1 size-3 shrink-0 opacity-60" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
