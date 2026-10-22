import { AlertOctagon, AlertTriangle, HelpCircle, Info, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";
import type { CalloutKind } from "@/content/types";

const STYLE: Record<CalloutKind, { label: string; cls: string; icon: typeof Info }> = {
  fare: { label: "Fare", cls: "border-danger bg-danger-soft text-[#5c120c]", icon: AlertOctagon },
  advarsel: { label: "Advarsel", cls: "border-[#d97706] bg-warn-soft text-[#4a3000]", icon: AlertTriangle },
  viktig: { label: "Viktig", cls: "border-jd-600 bg-jd-50 text-jd-900", icon: ShieldAlert },
  merk: { label: "Merk", cls: "border-info bg-info-soft text-[#123a55]", icon: Info },
  usikker: { label: "Ikke bekreftet for denne traktoren", cls: "border-[#7c6f00] bg-signal-soft text-[#3d3600]", icon: HelpCircle },
};

export function Callout({ kind, title, children }: { kind: CalloutKind; title?: string; children: ReactNode }) {
  const s = STYLE[kind];
  const I = s.icon;
  return (
    <div className={`flex gap-3 rounded-lg border-l-4 p-4 ${s.cls}`} role={kind === "fare" || kind === "advarsel" ? "alert" : "note"}>
      <I className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div className="min-w-0">
        <p className="text-sm font-bold">{title ?? s.label}</p>
        <div className="mt-1 text-[15px] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
