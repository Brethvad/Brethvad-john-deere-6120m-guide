import { CheckCircle2, CircleHelp, Settings2 } from "lucide-react";
import type { Verification } from "@/content/types";

const MAP: Record<Verification, { label: string; title: string; cls: string; icon: typeof CheckCircle2 }> = {
  verifisert: {
    label: "Verifisert i manualen",
    title: "Står i OMAL219620 og gjelder denne traktortypen.",
    cls: "bg-jd-100 text-jd-800",
    icon: CheckCircle2,
  },
  avhenger: {
    label: "Avhenger av utstyr",
    title: "Står i manualen, men gjelder bare hvis traktoren har dette utstyret eller denne versjonen. Sjekk traktoren.",
    cls: "bg-signal-soft text-[#5a4d00]",
    icon: Settings2,
  },
  uverifisert: {
    label: "Ikke verifisert",
    title: "Ikke bekreftet for denne traktoren. Guiden gir ikke betjeningsinstruksjoner basert på dette.",
    cls: "bg-[#eceff1] text-[#37474f]",
    icon: CircleHelp,
  },
};

export function VerificationBadge({ value }: { value: Verification }) {
  const m = MAP[value];
  const I = m.icon;
  return (
    <span className={`chip ${m.cls}`} title={m.title}>
      <I className="size-3.5" aria-hidden />
      {m.label}
    </span>
  );
}
