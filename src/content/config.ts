import type { SourceId, Verification } from "./types";

// The tractor this guide is built around, and how each configuration item
// relates to the manual. Update this file when the tractor's serial plate or
// order information confirms (or corrects) an item.

export const TRACTOR = {
  model: "John Deere 6120M",
  manual: "OMAL219620 (utgave 19, © 2020)",
  manualCovers: "6110M, 6120M, 6130M og 6145M",
};

export interface ConfigItem {
  label: string;
  supplied: string;
  manual: string;
  verification: Verification;
  todo?: string;
  sources: SourceId[];
}

export const CONFIG: ConfigItem[] = [
  {
    label: "Modell",
    supplied: "John Deere 6120M",
    manual:
      "Manualen OMAL219620 dekker 6110M–6145M. For 6120M oppgir den 4-sylindret motor (4045HL), 88 kW ved 2100 o/min og 542 Nm ved 1500 o/min.",
    verification: "verifisert",
    sources: ["spec-engine"],
  },
  {
    label: "Modellår og serienummer",
    supplied: "Ikke oppgitt",
    manual:
      "Manualen er fra 2020 og nevner modellår 2019 (MY19) for enkelte detaljer. Motorversjonen (Stage IV versjon 1–3 eller Stage V) avhenger av produksjonsår.",
    verification: "uverifisert",
    todo:
      "Les produktidentifikasjonsnummeret (PIN) på typeskiltet på venstre side og motornummeret på høyre side av motoren. Sjekk med forhandler at OMAL219620 er riktig manual for akkurat dette serienummeret.",
    sources: ["serial-plate", "spec-engine"],
  },
  {
    label: "Girkasse",
    supplied: "AutoQuad, 24/24, 40 km/t",
    manual:
      "Manualen har ingen egen «AutoQuad». Den beskriver AutoQuad™ PLUS (24 forover/24 bakover, 40 km/t) i seksjon 48, ved siden av PowrQuad™, PowrQuad™ PLUS og CommandQuad™ PLUS. Guiden forutsetter AutoQuad™ PLUS.",
    verification: "avhenger",
    todo:
      "Bekreft at girkassen er AutoQuad™ PLUS: gruppespaken skal ha girknapper, en Automatic-knapp og en håndclutch-knapp, og instrumentpanelet skal ha et AUTO-symbol ved girindikatoren. Har traktoren egen girspak i stedet for knapper, er det en PowrQuad™, og girkassedelen gjelder ikke.",
    sources: ["aq-shift", "travel-speed", "controls-pq-aq", "instrument-panel"],
  },
  {
    label: "Fronthydraulikk",
    supplied: "Fronthydraulikk",
    manual:
      "Manualen beskriver tre ulike ting foran: (1) Economy frontlift med løft/senk via SCV I og egen stengeventil, (2) frontkoplinger for redskap via SCV II, og (3) hydraulikkuttak foran og/eller under høyre trinn styrt med multifunksjonsspaken (typisk for frontlaster). Frontlift og frontkraftuttak er eget ekstrautstyr.",
    verification: "avhenger",
    todo:
      "Sjekk hva som faktisk sitter foran: Er det et trepunkt frontløft med stengeventil? Er det bare hurtigkoplinger foran? Styres de fra SCV-spakene eller fra multifunksjonsspaken (joystick)? Er det frontkraftuttak (egen PTO-bryter)?",
    sources: ["scv-levers", "front-hitch-economy", "front-hitch-economy-controls", "scv-front-hitch-hoses", "mfl-front-loader"],
  },
  {
    label: "Fjæret foraksel",
    supplied: "Ja",
    manual:
      "Fjæret foraksel virker helautomatisk over 1,5 km/t. Feil vises med gult CAUTION- eller rødt STOP-lys. Trykkakkumulatoren skal kontrolleres og senere byttes av forhandler.",
    verification: "verifisert",
    sources: ["front-suspension", "front-axle-accumulator"],
  },
  {
    label: "Førerhusfjæring",
    supplied: "Ja",
    manual:
      "Manualen nevner både mekanisk førerhusfjæring (fjærben med innstillingsring, kontroll «ved behov») og hydraulisk førerhusfjæring (sylinder med smørepunkt). Den beskriver ingen betjening fra førersetet.",
    verification: "avhenger",
    todo:
      "Se bak førerhuset (mellom førerhus og bakskjermer): Er det fjærben med skrufjær og innstillingsring (mekanisk) eller hydraulikksylindre (hydraulisk)?",
    sources: ["cab-suspension-check", "lubrication-points"],
  },
  {
    label: "LED-lyspakke",
    supplied: "LED-lys",
    manual:
      "Manualen beskriver lysfunksjonene og bryterne, men ikke en egen «LED-pakke». Den eneste LED-spesifikke opplysningen er at defekte LED-lykter byttes som hel enhet. Arbeidslys foran i hjørnene, på taket, på bakskjermene og ekstra frontlys er ekstrautstyr.",
    verification: "avhenger",
    todo: "Gå rundt traktoren med lyset på og noter hvilke lykter som finnes (se sjekklisten på Lys-siden).",
    sources: ["lights-overview", "worklight-switches-cab"],
  },
  {
    label: "Førerhus",
    supplied: "Førerhus (fjæret)",
    manual:
      "Guiden beskriver betjening for traktor med førerhus. Manualen har egne avsnitt for åpen førerplass, men de er ikke tatt med.",
    verification: "verifisert",
    sources: ["light-switch-cab", "emergency-exits"],
  },
  {
    label: "Bremser",
    supplied: "Ikke oppgitt",
    manual:
      "Fotbremsen kan ha én pedal eller to pedaler (styrebrems). Guiden beskriver begge.",
    verification: "avhenger",
    todo: "Se om det er én eller to bremsepedaler, og om det finnes en lås som kobler pedalene sammen.",
    sources: ["service-brakes", "controls-pq-aq"],
  },
];
