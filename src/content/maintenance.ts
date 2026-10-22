import type { MaintenanceTask, MaintenanceInterval } from "./types";

// Each task is placed in the interval of the manual section it is printed in
// (Section 90 = daily, 95 = first 100 h, 100 = every 500 h, 110 = yearly,
// 115 = 1500 h / 2 years, 117 = 4500 h, 120 = 6000 h, 125 = as required).
// "who": tasks the manual says to leave to an authorised dealer are "verksted".
// Oil and filter changes are described as owner maintenance in the manual, but
// require tools and correct fluids — shown as "fører eller verksted".

export const INTERVAL_ORDER: MaintenanceInterval[] = [
  "før bruk",
  "daglig / 10 t",
  "etter første 100 t",
  "hver 500 t",
  "årlig",
  "1500 t / 2 år",
  "4500 t",
  "6000 t",
  "ved behov",
  "se serviceoversikt",
];

export const INTERVAL_INFO: Record<MaintenanceInterval, string> = {
  "før bruk": "Hver gang før du kjører.",
  "daglig / 10 t": "Hver dag eller hver 10. driftstime.",
  "etter første 100 t": "Én gang, når timetelleren viser 100 timer (ny traktor).",
  "hver 500 t": "Første gang ved 500 timer, deretter hver 500. time. Lydsignal ved start minner deg på det.",
  "årlig": "En gang i året.",
  "1500 t / 2 år": "Hver 1500. time eller hvert 2. år — det som kommer først.",
  "4500 t": "Hver 4500. time.",
  "6000 t": "Hver 6000. time (avhenger av kjølevæsketype).",
  "ved behov": "Når det trengs, eller når et varsel ber om det.",
  "se serviceoversikt": "Intervallet står i manualens samlede serviceoversikt og kunne ikke leses sikkert her. Ta det med forhandler.",
};

export const MAINTENANCE: MaintenanceTask[] = [
  // Daily
  { task: "Rengjør radiator, kondensator, oljekjøler og området rundt motoren", interval: "daglig / 10 t", who: "fører", source: "daily-radiator" },
  { task: "Kontroller kjølevæskenivået", interval: "daglig / 10 t", who: "fører", source: "daily-coolant" },
  { task: "Kontroller drivstofffilteret for vann og bunnfall", interval: "daglig / 10 t", who: "fører", source: "daily-fuel-filter" },
  { task: "Kontroller motoroljenivået", interval: "daglig / 10 t", who: "fører", source: "daily-engine-oil" },
  { task: "Kontroller girkasse-/hydraulikkoljenivået", interval: "daglig / 10 t", who: "fører", source: "daily-trans-oil" },
  { task: "Kontroller lekkoljebeholdere (hvis montert)", interval: "daglig / 10 t", who: "fører", source: "all-service-tasks" },
  { task: "Kontroller bremsene", interval: "daglig / 10 t", who: "fører", source: "daily-brakes" },
  { task: "Kontroller lysene", interval: "daglig / 10 t", who: "fører", source: "daily-lights" },
  { task: "Smør alle smørepunkter", interval: "daglig / 10 t", who: "fører", note: "Bare nødvendig daglig ved svært vått og gjørmete arbeid.", source: "lubrication-points" },

  // First 100 h
  { task: "Hent ut og rett feilkoder, slett dem etterpå", interval: "etter første 100 t", who: "fører eller verksted", source: "service-100" },
  { task: "Kontroller at alle lys og frontlys virker", interval: "etter første 100 t", who: "fører", source: "service-100" },
  { task: "Bytt hydraulikkoljefilter og girkasseoljefilter", interval: "etter første 100 t", who: "fører eller verksted", source: "service-100" },
  { task: "Firehjulsaksel: oljeskift i navgir og akselhus", interval: "etter første 100 t", who: "fører eller verksted", source: "service-100" },
  { task: "Kontroller luftinntaksslanger for lekkasje", interval: "etter første 100 t", who: "fører", source: "service-100" },
  { task: "Kontroller moment på bolter: trekkstang, frontløftramme, frontlasterramme", interval: "etter første 100 t", who: "fører eller verksted", source: "service-100" },

  // Every 500 h
  { task: "Kontroller sperren mot utilsiktet kjøring (movement inhibitor)", interval: "hver 500 t", who: "fører eller verksted", source: "movement-inhibitor" },
  { task: "Kontroller sikkerhetskretsen for kraftuttak", interval: "hver 500 t", who: "fører eller verksted", source: "pto-safety-circuit" },
  { task: "Førerhus: kontroller låser og gummilister på dører, vinduer og takluke", interval: "hver 500 t", who: "fører", source: "cab-seals" },
  { task: "Førerhus: bytt aktivt kullfilter (hvis montert) — senest etter 1 år", interval: "hver 500 t", who: "fører", source: "carbon-filter" },
  { task: "Kontroller luftinntaksslanger", interval: "hver 500 t", who: "fører", source: "air-intake-hoses" },
  { task: "Kontroller drivreimen for slitasje", interval: "hver 500 t", who: "fører", note: "Ved slitasje: kontakt forhandler.", source: "drive-belt" },
  { task: "Kontroller motorens jordforbindelse", interval: "hver 500 t", who: "fører", source: "engine-ground" },
  { task: "Lufting og kontroll av bremsesystemet", interval: "hver 500 t", who: "verksted", source: "brake-bleed" },
  { task: "Drivstofftank: tapp ut vann og bunnfall", interval: "hver 500 t", who: "fører", source: "fuel-tank-service" },
  { task: "Bytt drivstofffiltre", interval: "hver 500 t", who: "fører eller verksted", source: "fuel-filter-change" },
  { task: "Firehjulsaksel: kontroller oljenivå i akselhus og navgir uten brems", interval: "hver 500 t", who: "fører", source: "fwd-housing-level" },
  { task: "Firehjulsaksel: oljeskift i navgir med brems", interval: "hver 500 t", who: "fører eller verksted", source: "fwd-final-brake-oil" },
  { task: "Frontkraftuttak: bytt oljefilter (hvis montert)", interval: "hver 500 t", who: "fører eller verksted", source: "front-pto-filter" },
  {
    task: "Bytt motorolje og motoroljefilter",
    interval: "hver 500 t",
    who: "fører eller verksted",
    note: "500 t gjelder bare med John Deere Plus-50™ II, lavsvovel diesel (≤ 15 ppm) og godkjent John Deere-filter. Andre oljer: 250 t. Uansett minst én gang i året. Halver intervallet ved biodiesel over B20.",
    source: "engine-oil-interval",
  },
  { task: "Bytt girkasse- og hydraulikkoljefiltre (eller når gult CAUTION-lys og melding vises)", interval: "hver 500 t", who: "fører eller verksted", source: "trans-filters" },
  { task: "Kontroller moment på hjulbolter (for og bak) og hjulvekter", interval: "hver 500 t", who: "fører eller verksted", source: "wheel-bolts-front-fwd" },
  { task: "Frontløft: kontroller bolter (hvis montert)", interval: "hver 500 t", who: "fører eller verksted", source: "front-hitch-torque" },
  { task: "Trekkstang: stram bolter og kontroller slitasje", interval: "hver 500 t", who: "fører", source: "drawbar-wear" },
  { task: "Bakre kraftuttak: smør støtte for svingbar akselstump", interval: "hver 500 t", who: "fører", source: "rear-pto-stub" },
  { task: "Smør bakakselens lagre (hvis smørenipler)", interval: "hver 500 t", who: "fører", note: "Maks 6–8 slag med vanlig fettpresse.", source: "rear-axle-bearings" },
  { task: "Smør alle smørepunkter", interval: "hver 500 t", who: "fører", source: "lubrication-points" },
  { task: "Lys: kontroller innstilling av frontlys", interval: "hver 500 t", who: "fører eller verksted", source: "all-service-tasks" },

  // Yearly
  { task: "Kontroller setebeltet for skade og funksjon (eller hver 500 t)", interval: "årlig", who: "fører", source: "seat-belt-inspect" },
  { task: "Test kjølevæsken med teststrimler", interval: "årlig", who: "fører", source: "coolant-test" },
  { task: "Kontroller alle hydraulikkslanger", interval: "årlig", who: "fører", source: "hoses-inspect" },
  { task: "Øvrige årlige punkter (bl.a. motorolje minst én gang i året)", interval: "årlig", who: "fører eller verksted", source: "annual-other" },

  // 1500 h / 2 years
  { task: "Bytt førerhusets luftfiltre (også resirkuleringsfilter)", interval: "1500 t / 2 år", who: "fører", source: "cab-air-filters" },
  { task: "Bytt primærfilter i motorens luftfilter (eller når gult CAUTION-lys og melding vises)", interval: "1500 t / 2 år", who: "fører", source: "air-cleaner" },
  { task: "Bytt filter i veivhusventilasjonens oljeutskiller (hvis montert)", interval: "1500 t / 2 år", who: "fører eller verksted", source: "crankcase-vent" },
  { task: "Firehjulsaksel: oljeskift i akselhus og navgir uten brems", interval: "1500 t / 2 år", who: "fører eller verksted", source: "fwd-housing-oil" },
  { task: "Skift girkasse-/hydraulikkolje og rengjør innsugssil", interval: "1500 t / 2 år", who: "fører eller verksted", note: "52 liter (+1 l med krypegir). Hy-Gard™ eller olje etter JDM J20C/J20D.", source: "trans-oil-change" },
  { task: "Frontkraftuttak: oljeskift (hvis montert)", interval: "1500 t / 2 år", who: "fører eller verksted", source: "front-pto-oil" },
  { task: "Fjæret foraksel: kontroll av trykkakkumulator", interval: "1500 t / 2 år", who: "verksted", source: "front-axle-accumulator" },

  // 4500 h
  { task: "Bytt sekundærelement i motorens luftfilter (senest ved hvert 4. primærfilterbytte)", interval: "4500 t", who: "fører", source: "air-cleaner-secondary" },
  { task: "AdBlue-system: rengjør tank, bytt filter i doseringsenhet, bytt sugesil", interval: "4500 t", who: "verksted", note: "Manualens oversikt sier at AdBlue-systemet skal betjenes av autorisert forhandler.", source: "def-tank-clean" },

  // 6000 h
  {
    task: "Skift kjølevæske",
    interval: "6000 t",
    who: "fører eller verksted",
    note: "6000 t / 6 år gjelder COOL-GARD™ II med årlig test. Uten årlig test: 4000 t / 4 år. Annen kjølevæske: 2000 t / 2 år.",
    source: "coolant-interval-note",
  },
  { task: "Bytt in-line AdBlue-filter (hvis montert)", interval: "6000 t", who: "verksted", source: "def-inline-filter" },

  // As required
  { task: "Rengjør førerhusets luftfiltre", interval: "ved behov", who: "fører", source: "cab-air-clean" },
  { task: "Luft drivstoffsystemet (f.eks. etter tom tank)", interval: "ved behov", who: "fører", source: "fuel-bleed" },
  { task: "Rengjør bimetallfjæren på viskovifta", interval: "ved behov", who: "fører", source: "viscous-clean" },
  { task: "Kontroll av viskovifta", interval: "ved behov", who: "verksted", source: "viscous-check" },
  { task: "Smør alle smørepunkter etter høytrykksvask", interval: "ved behov", who: "fører", source: "lubrication-points" },
  { task: "Kontroller mekanisk førerhusfjæring", interval: "ved behov", who: "fører eller verksted", note: "Defekte dempere byttes av forhandler.", source: "cab-suspension-check" },
  { task: "AdBlue-tank: rengjør sil i påfyllingshalsen", interval: "ved behov", who: "fører", source: "def-filler-screen" },
  { task: "AdBlue-tank: kontroller luftefilteret (støvete forhold)", interval: "ved behov", who: "fører", source: "def-vent" },
  { task: "Bytt partikkelfilter (DPF) når lampen for eksosfilter og varsel lyser", interval: "ved behov", who: "verksted", source: "dpf-change" },
  { task: "Bytt sikringer og releer", interval: "ved behov", who: "fører", source: "fuses-lcs" },
  { task: "Bytt lyspærer. LED-lykter byttes som hel enhet.", interval: "ved behov", who: "fører eller verksted", source: "lamp-led-note" },

  // Unclear interval
  { task: "Justering av motorventiler", interval: "se serviceoversikt", who: "verksted", source: "all-service-tasks" },
  { task: "Bytte av trykkakkumulator for fjæret foraksel", interval: "se serviceoversikt", who: "verksted", source: "all-service-tasks" },
];

export const SEASONAL = {
  storage: [
    "Gjelder lagring i mer enn 6 måneder (opptil ett år).",
    "Skift motorolje og filter, og girkasseolje og filter — brukt olje beskytter ikke godt nok.",
    "Rengjør luftfilteret.",
    "Ved lagring i ett år eller mer: tapp, skyll og fyll kjølesystemet.",
    "Fyll drivstofftanken.",
    "Ta ut og rengjør batteriene. Lagre dem kjølig og tørt, fulladet.",
    "Vask traktoren med saltfritt vann. Flekk-lakker skader. Smør blanke metallflater med fett eller rustbeskyttelse.",
    "Tett åpninger som lufterør og eksosutløp.",
    "Lagre tørt og beskyttet. Ute: dekk til med vanntett presenning.",
    "Klosse opp traktoren slik at dekkene ikke står på bakken. Beskytt dekkene mot varme og sol.",
    "Med klimaanlegg: drei innerdelen av remskiven noen omdreininger én gang i måneden.",
  ],
  fromStorage: [
    "Fjern beskyttelsen. Kontroller dekktrykk og fjern klossene.",
    "Sett i batteriet og koble til (minus er jord).",
    "Kontroller girkasse-/hydraulikkolje, drivstoff, kjølevæske og motorolje.",
    "Fjern rusk og fremmedlegemer under panseret og førerhuset.",
    "Start motoren bare med god ventilasjon — kvelningsfare.",
    "Manualen ber om en «750-timers kontroll» — denne er ikke beskrevet nærmere. Ta kontakt med forhandler.",
  ],
  winter: [
    "Velg olje og kjølevæske etter forventet temperatur (se manualens tabeller).",
    "Frostvæske i spylervæsken.",
    "Kjølevæskevarmer (hvis montert): ca. 2 timer ved −15 °C. Bruk alltid jordfeilbryter.",
    "AdBlue fryser ved ca. −11 °C. Tanken har varmeelement. Ikke koble fra batteriet før 4 minutter etter motorstopp.",
  ],
};
