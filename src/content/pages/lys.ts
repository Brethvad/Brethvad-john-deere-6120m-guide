import type { Page } from "../types";

export const lys: Page = {
  slug: "lys",
  title: "Lys og sikt",
  nav: "Lys",
  group: "Systemer",
  icon: "lightbulb",
  intro:
    "Veilys skal gjøre deg synlig for andre trafikanter. Arbeidslys skal lyse opp arbeidsområdet — og er ikke tillatt på offentlig vei. Her er bryterne og lyktene, og hva som er standard og ekstrautstyr.",
  sections: [
    {
      id: "led",
      title: "Om LED-lyspakken",
      verification: "avhenger",
      blocks: [
        {
          type: "callout",
          kind: "usikker",
          text:
            "Traktoren er oppgitt med LED-lyspakke. Manualen beskriver ikke en egen LED-pakke — bare lysfunksjonene og bryterne. Hvilke lykter som finnes og om de er LED, må sjekkes på traktoren. Bruk sjekklisten nederst.",
        },
        {
          type: "p",
          text: "Det eneste manualen sier spesifikt om LED: En defekt LED-lykt byttes som en hel enhet (man bytter ikke pære).",
        },
      ],
      sources: ["lights-overview"],
    },
    {
      id: "lykter",
      title: "Hvor sitter lyktene?",
      verification: "avhenger",
      blocks: [
        { type: "diagram", id: "lights-front", caption: "Lykter foran (forenklet tegning basert på manualens oversikt)." },
        {
          type: "table",
          caption: "Foran",
          head: ["Lykt", "Plassering", "Status i manualen"],
          rows: [
            ["Nærlys (A)", "Nede i fronten", "Standard"],
            ["Fjernlys (B)", "I panseret", "Standard"],
            ["Arbeidslys i hjørnene (C)", "I panseret, ved siden av fjernlyset", "Ekstrautstyr"],
            ["Ekstra frontlys eller arbeidslys (D)", "På førerhusstolpene, begge sider", "Ekstrautstyr"],
            ["Blinklys/nødblink (E)", "Fremme på taket, ytterst", "Standard"],
            ["Arbeidslys på tak, ytre (F) og indre (G)", "Fremme på taket", "Ekstrautstyr"],
            ["Roterende varsellys (H)", "På taket", "Ekstrautstyr"],
            ["Sidemarkeringslys", "Begge sider", "Ekstrautstyr"],
          ],
        },
        { type: "diagram", id: "lights-rear", caption: "Lykter bak (forenklet)." },
        {
          type: "table",
          caption: "Bak",
          head: ["Lykt", "Plassering", "Status i manualen"],
          rows: [
            ["Baklys/bremselys og blinklys (I)", "Bak på skjermene", "Standard"],
            ["Arbeidslys på skjerm (J)", "Venstre eller høyre bakskjerm", "Ekstrautstyr"],
            ["Blinklys/nødblink (K)", "Bak på taket, ytterst", "Standard"],
            ["Arbeidslys bak på taket (L)", "Bak på taket, innerst", "Ekstrautstyr"],
            ["7-polet stikkontakt for tilhengerlys (M)", "Bak", "Standard"],
            ["Lys for ekstra bred kjøretøy", "Begge sider", "Ekstrautstyr"],
          ],
        },
        {
          type: "callout",
          kind: "merk",
          text: "Blinker du til høyre, blinker høyre side på tak og skjerm, mens venstre lys på taket lyser fast. Det er normalt.",
        },
      ],
      sources: ["lights-overview"],
    },
    {
      id: "lysbryter",
      title: "Lysbryteren",
      verification: "verifisert",
      blocks: [
        { type: "diagram", id: "light-switch", caption: "Lysbryteren har fire stillinger." },
        {
          type: "table",
          head: ["Stilling", "Hva lyser"],
          rows: [
            ["1 OFF", "Alt av"],
            ["2", "Parkeringslys (markerings- og baklys)"],
            ["3", "Hovedlys (frontlys)"],
            ["4", "Hovedlys — og arbeidslysene kan slås på"],
          ],
        },
        {
          type: "list",
          items: [
            "Nærlys/fjernlys med bryter B: ned = fjernlys, midt = nærlys, opp = lyshorn.",
            "Blå fjernlyslampe lyser i instrumentpanelet ved fjernlys.",
            "Ekstra frontlys på førerhusstolpene (hvis montert): egen bryter velger mellom vanlige frontlys og disse — for eksempel når et frontredskap dekker de vanlige lysene.",
          ],
        },
        { type: "callout", kind: "viktig", text: "Lyset slås ikke av når motoren stoppes. Slå det av hvis traktoren skal stå lenge, ellers kan batteriet bli flatt." },
      ],
      sources: ["light-switch-cab", "extra-headlights"],
    },
    {
      id: "blinklys",
      title: "Blinklys og horn",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Hendelen til venstre på rattstammen: skyv forbi første motstand til den låser seg.",
            "Midtstilling = av. Trykk mot rattstammen = horn.",
            "Med automatisk tilbakestilling: skyv til låsestilling og tilbake innen ett sekund. Blinkingen slutter etter 50 m (uten tilhenger), 70 m (1 tilhenger) eller 90 m (2 tilhengere).",
            "Rask blinking = defekt blinklyspære. Bytt den straks.",
          ],
        },
      ],
      sources: ["turn-horn-cab"],
    },
    {
      id: "nodblink",
      title: "Nødblink",
      verification: "verifisert",
      blocks: [
        { type: "p", text: "Trykk nødblinkbryteren ved lysbryteren. Lampen i bryteren lyser, og begge blinkpilene i instrumentpanelet blinker." },
        {
          type: "callout",
          kind: "merk",
          text:
            "Manualen sier at nødblink skal brukes ved kjøring på offentlig vei. Hvilke lys som kreves i Norge, styres av norsk regelverk — se Veitransport.",
        },
      ],
      sources: ["hazard-lights", "light-switch-cab"],
    },
    {
      id: "arbeidslys",
      title: "Arbeidslys",
      verification: "avhenger",
      blocks: [
        {
          type: "steps",
          items: [
            "Sett lysbryteren i stilling 4.",
            "Slå på ønskede arbeidslys med bryterne i panelet oppe til høyre.",
          ],
        },
        {
          type: "table",
          caption: "Bryterne for arbeidslys (førerhus)",
          head: ["Bryter", "Lykter"],
          rows: [
            ["A", "Arbeidslys i hjørnene foran (hvis montert)"],
            ["B", "Arbeidslys foran på taket"],
            ["C", "Arbeidslys bak på taket"],
            ["D", "Arbeidslys på bakskjermene (hvis montert)"],
            ["E", "Arbeidslys på frontlaster (hvis montert)"],
          ],
        },
        { type: "callout", kind: "advarsel", text: "Det er ikke tillatt å bruke arbeidslys på offentlig vei. Arbeidslysene slås heller ikke av når motoren stoppes." },
        { type: "p", text: "På traktor med ISOBUS kan redskapets vei- og arbeidslys styres via ISOBUS-kontakten. Se redskapets manual." },
      ],
      sources: ["worklight-switches-cab", "lights-overview"],
    },
    {
      id: "vei-vs-arbeid",
      title: "Veilys eller arbeidslys?",
      verification: "verifisert",
      blocks: [
        {
          type: "table",
          head: ["", "Veilys", "Arbeidslys"],
          rows: [
            ["Formål", "Synes og se veien i trafikk", "Lyse opp arbeidsområdet og redskapet"],
            ["Hvor", "Offentlig vei og ved veien", "Gårdsplass, jorde, skog — ikke offentlig vei"],
            ["Lykter", "Nærlys/fjernlys, parkeringslys, baklys, bremselys, blinklys", "Arbeidslys på tak, panser, skjermer, frontlaster"],
            ["Bryter", "Lysbryter stilling 2–3 + blinklys/nødblink", "Lysbryter stilling 4 + arbeidslysbrytere"],
          ],
        },
      ],
      sources: ["light-switch-cab", "worklight-switches-cab", "drive-roads"],
    },
    {
      id: "varsellys",
      title: "Roterende varsellys (hvis montert)",
      verification: "avhenger",
      blocks: [
        {
          type: "p",
          text: "Slås av og på med egen bryter (lampen i bryteren lyser). Manualen anbefaler bruk etter lokale regler — for eksempel ved svært lav fart eller når traktoren er ekstra bred. Ikke tillatt i alle land.",
        },
      ],
      sources: ["beacon-option"],
    },
    {
      id: "sikt",
      title: "Sjekkliste for lys og sikt før kjøring",
      verification: "verifisert",
      blocks: [
        { type: "checklist", id: "sikt" },
        {
          type: "p",
          text: "Dekker redskap eller last traktorens lys bak, skal du bruke ekstra lys på redskapet. Koble tilhengerlys til den 7-polede kontakten.",
        },
      ],
      sources: ["daily-lights", "drive-roads", "trailer-socket", "wiper"],
    },
  ],
  related: ["veitransport", "forerhus", "daglig-kontroll"],
};
