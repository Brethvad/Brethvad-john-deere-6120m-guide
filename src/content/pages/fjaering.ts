import type { Page } from "../types";

export const fjaering: Page = {
  slug: "fjaering",
  title: "Fjæret foraksel og førerhusfjæring",
  nav: "Fjæring",
  group: "Systemer",
  icon: "waves",
  intro:
    "Traktoren har to separate fjæringssystemer: fjæret foraksel (hydraulisk, automatisk) og fjæret førerhus. De virker og vedlikeholdes forskjellig.",
  sections: [
    {
      id: "oversikt",
      title: "To ulike systemer",
      verification: "verifisert",
      blocks: [
        { type: "diagram", id: "suspension", caption: "Fjæret foraksel foran, førerhusfjæring bak under førerhuset (forenklet)." },
        {
          type: "table",
          head: ["", "Fjæret foraksel", "Førerhusfjæring"],
          rows: [
            ["Hva den gjør", "Demper støt mellom foraksel og traktor — bedre grep, styring og komfort", "Demper vibrasjoner og støt mellom traktor og førerhus — bedre komfort for føreren"],
            ["Betjening", "Ingen. Helautomatisk over 1,5 km/t", "Ingen fra førersetet (ikke beskrevet i manualen)"],
            ["Feilvarsel", "Gult CAUTION- eller rødt STOP-lys + melding", "Ingen varsel — kjennes som unormal gynging"],
            ["Førerens vedlikehold", "Smøre universalledd og hydraulikksylinder", "Mekanisk: kontroll av innstilling ved behov. Hydraulisk: smøre sylinder"],
            ["Verksted", "Akkumulator: kontroll hver 1500 t / 2 år, senere bytte (se serviceoversikten)", "Mekanisk: bytte av demper (begge sider)"],
          ],
        },
      ],
      sources: ["front-suspension", "cab-suspension-check", "lubrication-points", "front-axle-accumulator"],
    },
    {
      id: "foraksel",
      title: "Fjæret foraksel",
      verification: "verifisert",
      blocks: [
        {
          type: "p",
          text:
            "Fjæringen på forakselen virker helt automatisk når traktoren kjører fortere enn 1,5 km/t. Du trenger ikke slå den på.",
        },
        {
          type: "list",
          items: [
            "Den reagerer ikke på endret last (for eksempel når et redskap kobles på eller av) før traktoren faktisk kjører.",
            "Normalt: traktoren går roligere over ujevnheter, uten varsellys.",
          ],
        },
        {
          type: "table",
          caption: "Hvis det kommer et varsel",
          head: ["Varsel", "Hva du gjør"],
          rows: [
            ["Gult CAUTION-lys + melding", "Traktoren kan kjøres, men vær forsiktig i høy fart. Les meldingen og rett årsaken."],
            ["Rødt STOP-lys + melding", "Stopp traktoren straks og slå av motoren. Les meldingen og rett årsaken."],
          ],
        },
        { type: "callout", kind: "fare", text: "Akkumulatoren står under trykk. Prøv aldri å slippe ut trykket ved å løsne en kopling. Akkumulatorer kan ikke repareres — overlat dem til verksted." },
      ],
      sources: ["front-suspension", "accumulator-safely"],
    },
    {
      id: "foraksel-vedlikehold",
      title: "Vedlikehold av fjæret foraksel",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Smør universalleddene og hydraulikksylinderen på den fjærede forakselen (se smørepunkter). Daglig ved svært vått og gjørmete forhold.",
            "Akselhus på fjæret foraksel: 6,4 liter olje (oljeskift hører til 1500 t / 2 år).",
            "Akkumulator: kontrolleres av forhandler hver 1500 t / 2 år. Bytte av akkumulator står også i manualens serviceoversikt — ta det med forhandler.",
          ],
        },
        {
          type: "callout",
          kind: "advarsel",
          title: "Smøre forakselens universalledd",
          text:
            "Stopp motoren og legg inn parkeringslåsen. Senk løft og frontlaster. For å nå smørenippelen: vri rattet helt ut, løft akselknærne med jekk til hjulet går fritt, og roter hjulet. Hold deg unna området under hjulet.",
        },
      ],
      sources: ["lubrication-points", "greasing", "spec-capacities", "front-axle-accumulator", "all-service-tasks"],
    },
    {
      id: "forerhus",
      title: "Førerhusfjæring",
      verification: "avhenger",
      blocks: [
        {
          type: "callout",
          kind: "usikker",
          title: "Mekanisk eller hydraulisk?",
          text:
            "Manualen nevner både mekanisk førerhusfjæring (fjærben med skrufjær og innstillingsring) og hydraulisk førerhusfjæring (sylinder med smørepunkt). Se bak på førerhuset for å finne ut hvilken traktoren har.",
        },
        {
          type: "p",
          text:
            "Førerhusfjæringen har ingen betjening fra førersetet i manualen. Den virker hele tiden. Fjærelementene er fabrikkinnstilt for en gjennomsnittlig last (innstilling I).",
        },
        {
          type: "table",
          caption: "Mekanisk førerhusfjæring — feil og årsaker",
          head: ["Du merker", "Årsak", "Løsning"],
          rows: [
            ["Førerhuset forsterker vibrasjonene", "Defekt demper", "Forhandler bytter demperne (alltid begge sider)"],
            ["For mykt — førerhuset gynger kraftig og slår hardt mot stopperen", "For lite forspenning", "Juster innstillingen"],
            ["For hardt", "For mye forspenning", "Juster innstillingen"],
          ],
        },
        {
          type: "details",
          title: "Kontrollere innstillingen (mekanisk) — slik manualen beskriver det",
          blocks: [
            {
              type: "steps",
              items: [
                "Stopp motoren og legg inn parkeringslåsen. Senk redskapet til bakken.",
                "Legg en vekt i førerhuset tilsvarende førerens vekt.",
                "Mål avstanden (a). Er den ca. 340 mm, trengs ingen justering.",
                "Juster ved behov med hakenøkkel (DIN1810–A 80–90): drei innstillingsringen til et hakk der (a) blir ca. 340 mm. Hvert av de 5 hakkene endrer ca. 3 mm.",
                "Bruk samme hakk på begge sider.",
              ],
            },
            {
              type: "callout",
              kind: "viktig",
              text: "Drei aldri ringen direkte fra I til IIIII eller fra IIIII til I — det ødelegger fjærbenet. Grip aldri inn i fjæren. Bruk vernebriller og hansker.",
            },
            {
              type: "p",
              text: "Er du usikker, overlat justeringen til forhandler. Defekte dempere skal alltid byttes av forhandler.",
            },
          ],
        },
        {
          type: "p",
          text: "Hydraulisk førerhusfjæring: sylinderen har et smørepunkt. Smør den sammen med de andre smørepunktene ved vått og gjørmete arbeid.",
        },
      ],
      sources: ["cab-suspension-check", "lubrication-points", "prestart"],
    },
    {
      id: "for-bruk",
      title: "Sjekk før bruk",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Ingen varsellys for forakselfjæring etter start.",
            "Ingen synlige oljelekkasjer ved forakselens fjæringssylinder.",
            "Ingen unormale lyder eller slag fra førerhuset når du kjører over ujevnheter.",
            "Ved svært vått og gjørmete arbeid: smør forakselens fjæringssylinder og førerhusfjæringen.",
          ],
        },
        {
          type: "callout",
          kind: "merk",
          text: "Traktoren hopper og spretter («power hop»)? Det skyldes oftest lastfordeling, ballast eller dekktrykk — ikke nødvendigvis fjæringen. Se Feilsøking.",
        },
      ],
      sources: ["front-suspension", "prestart", "ts-cab"],
    },
  ],
  related: ["vedlikehold", "feilsoking"],
};
