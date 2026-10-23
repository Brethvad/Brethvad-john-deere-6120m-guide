import type { SourceId, Verification } from "./types";

// The tractor this guide is built around, and how each configuration item
// relates to the manual. Update this file when the tractor's serial plate or
// order information confirms (or corrects) an item.

export const TRACTOR = {
  model: "John Deere 6120M",
  manual: "OMAL219620 (utgave 19, © 2020)",
  manualCovers: "6110M, 6120M, 6130M og 6145M",
  modelYear: "2023",
  /** Not supplied yet. */
  serial: null as string | null,
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
    verification: "bekreftet",
    sources: ["spec-engine"],
  },
  {
    label: "Modellår",
    supplied: "2023",
    manual:
      "Manualen guiden bygger på er utgave 19 fra 2020, og den nevner modellår 2019 (MY19) for enkelte detaljer. En 2023-modell er nyere enn manualen. Detaljer kan derfor ha endret seg, for eksempel motorversjon (Stage V), display og programvare.",
    verification: "bekreftet",
    todo:
      "Spør forhandleren om det finnes en nyere utgave av operatørmanualen for 2023-modellen. Finnes den, er den mer korrekt enn denne guiden der de to er uenige.",
    sources: ["spec-engine"],
  },
  {
    label: "Serienummer (PIN)",
    supplied: "Kommer senere",
    manual:
      "PIN står på typeskiltet på venstre side. Motornummeret står på høyre side av motoren. Med PIN kan forhandleren slå opp nøyaktig utstyr og riktig manual.",
    verification: "uverifisert",
    todo: "Les av PIN og motornummer, og legg dem inn her. Sjekk deretter med forhandler hvilken manual som gjelder for akkurat dette serienummeret.",
    sources: ["serial-plate"],
  },
  {
    label: "Girkasse",
    supplied: "AutoQuad, 24/24, 40 km/t",
    manual:
      "I manualen heter denne girkassen AutoQuad™ PLUS (24 forover/24 bakover, 40 km/t), beskrevet i seksjon 48. Guiden bruker manualens navn.",
    verification: "bekreftet",
    sources: ["aq-shift", "travel-speed", "controls-pq-aq", "instrument-panel"],
  },
  {
    label: "Fronthydraulikk",
    supplied: "Fronthydraulikk",
    manual:
      "Manualen beskriver tre ulike ting foran: (1) Economy frontlift med løft/senk via SCV I og egen stengeventil, (2) frontkoplinger for redskap via SCV II, og (3) hydraulikkuttak foran og/eller under høyre trinn styrt med multifunksjonsspaken (typisk for frontlaster). Frontlift og frontkraftuttak er eget ekstrautstyr.",
    verification: "bekreftet",
    todo:
      "Utstyret er bekreftet, men ikke hvilken variant. Er det trepunkt frontløft med stengeventil, bare hurtigkoplinger foran, eller styring fra multifunksjonsspaken (joystick)? Finnes frontkraftuttak (egen PTO-bryter)?",
    sources: ["scv-levers", "front-hitch-economy", "front-hitch-economy-controls", "scv-front-hitch-hoses", "mfl-front-loader"],
  },
  {
    label: "Fjæret foraksel",
    supplied: "Ja",
    manual:
      "Fjæret foraksel virker helautomatisk over 1,5 km/t. Feil vises med gult CAUTION- eller rødt STOP-lys. Trykkakkumulatoren skal kontrolleres og senere byttes av forhandler.",
    verification: "bekreftet",
    sources: ["front-suspension", "front-axle-accumulator"],
  },
  {
    label: "Førerhusfjæring",
    supplied: "Ja",
    manual:
      "Manualen nevner både mekanisk førerhusfjæring (fjærben med innstillingsring, kontroll «ved behov») og hydraulisk førerhusfjæring (sylinder med smørepunkt). Den beskriver ingen betjening fra førersetet.",
    verification: "bekreftet",
    todo:
      "Utstyret er bekreftet, men ikke typen. Se bak førerhuset (mellom førerhus og bakskjermer): fjærben med skrufjær og innstillingsring er mekanisk, hydraulikksylindre er hydraulisk. Det avgjør om sylinderen skal smøres i den månedlige kontrollen.",
    sources: ["cab-suspension-check", "lubrication-points"],
  },
  {
    label: "LED-lys",
    supplied: "LED-lys",
    manual:
      "Manualen beskriver lysfunksjonene og bryterne, men ikke en egen «LED-pakke». Den eneste LED-spesifikke opplysningen er at defekte LED-lykter byttes som hel enhet. Arbeidslys foran i hjørnene, på taket, på bakskjermene og ekstra frontlys er ekstrautstyr.",
    verification: "bekreftet",
    todo: "Hvilke lykter som sitter på, er ikke kartlagt. Gå rundt traktoren med lyset på og noter dem (se sjekklisten på Lys-siden).",
    sources: ["lights-overview", "worklight-switches-cab"],
  },
  {
    label: "Førerhus",
    supplied: "Førerhus (fjæret)",
    manual:
      "Guiden beskriver betjening for traktor med førerhus. Manualen har egne avsnitt for åpen førerplass, men de er ikke tatt med.",
    verification: "bekreftet",
    sources: ["light-switch-cab", "emergency-exits"],
  },
  {
    label: "Snøutstyr",
    supplied: "Tokvam VT 280 City (vikeplog) og Tokvam 240 THS (snøfreser)",
    manual:
      "Ikke omtalt i John Deere-manualen. Guiden bygger på Tokvams bruksanvisninger og produktsider, sammenholdt med traktorens data.",
    verification: "bekreftet",
    todo:
      "Les CE-nummeret på maskinskiltet til freseren (to versjoner av 240 THS). Avklar med forhandler: hvilket feste og uttak plogen skal ha foran, hvilken kontakt ventilene skal ha strøm fra, og om traktorens oljetrykk (opptil 205 bar) er greit for tutsvingen (maks 175 bar).",
    sources: ["vt-tech", "vt-hydraulics", "ths-tech", "ths-connect"],
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
