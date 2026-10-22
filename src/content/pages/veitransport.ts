import type { Page } from "../types";

export const veitransport: Page = {
  slug: "veitransport",
  title: "Kjøring på offentlig vei",
  nav: "Veitransport",
  group: "Betjening",
  icon: "truck",
  intro:
    "Klargjøring for veikjøring: lys, speil, bremser, dekk, redskap og fart. Girkassen er laget for 40 km/t — det betyr ikke at du alltid har lov til å kjøre 40 km/t.",
  sections: [
    {
      id: "lov-vs-produsent",
      title: "Lovkrav og produsentens anvisninger er to forskjellige ting",
      verification: "verifisert",
      blocks: [
        {
          type: "callout",
          kind: "viktig",
          title: "40 km/t er traktorens konstruksjonshastighet — ikke en tillatelse",
          text:
            "Girkassen er konstruert for 40 km/t. Hvor fort du faktisk har lov til å kjøre, avhenger av norsk regelverk, traktorens registrering (vognkort), tilhenger eller redskap (deres konstruksjonshastighet og bremser), skilting og forholdene. Sjekk alltid vognkortet og gjeldende regler hos Statens vegvesen og på Lovdata.",
        },
        {
          type: "table",
          head: ["Kilde", "Hva den bestemmer"],
          rows: [
            ["Norsk regelverk (vegtrafikkloven med forskrifter)", "Lovlig fart, lys- og merkekrav, førerkort, vekter og tilhengerregler. Se lovdata.no og vegvesen.no."],
            ["Traktorens vognkort", "Registrert største hastighet, vekter og tilhengervekter for akkurat denne traktoren."],
            ["Redskapets/tilhengerens skilt og manual", "Største transporthastighet for redskapet."],
            ["John Deere-manualen (denne guiden)", "Hvordan traktoren skal klargjøres og brukes trygt."],
          ],
        },
        {
          type: "callout",
          kind: "merk",
          text:
            "Denne guiden gjengir ikke norske fartsgrenser for traktor. Regelverket endres, og det avhenger av registrering og kombinasjon. Kontroller selv i offisielle kilder.",
        },
      ],
      sources: ["travel-speed", "tow-speeds", "foreword"],
    },
    {
      id: "manual-fart",
      title: "Fart med tilhenger og redskap — ifølge manualen",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Kjør aldri fortere enn redskapets største transporthastighet (står på skiltet eller i redskapets manual). Traktoren kan kjøre fortere enn de fleste redskap tåler.",
            "Redskap uten bremser: ikke fortere enn 32 km/t (manualens generelle anbefaling).",
            "Redskap med bremser uten oppgitt maksfart: ikke fortere enn 40 km/t.",
            "Opptil 40 km/t må fullastet redskap veie mindre enn 4,5 ganger traktorens vekt.",
            "Hydraulisk bremset tilhenger (enkelledning): aldri fortere enn 25 km/t.",
          ],
        },
        {
          type: "callout",
          kind: "merk",
          text: "Dette er produsentens anbefalinger. Norske regler kan være strengere og går alltid foran.",
        },
      ],
      sources: ["tow-speeds", "trailer-brake-hyd", "towing-loads"],
    },
    {
      id: "klargjoring",
      title: "Klargjør traktoren for veikjøring",
      verification: "verifisert",
      blocks: [
        { type: "checklist", id: "veitransport" },
      ],
      sources: ["drive-roads", "scv-transport-lock", "rear-hitch-load", "service-brakes", "fwd-engage"],
    },
    {
      id: "kjoring",
      title: "Under kjøringen",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Følg med på trafikken bak deg, særlig i svinger, og bruk blinklys.",
            "Senk farten på is, vått underlag og grus.",
            "Unngå hull, grøfter, skarpe svinger, skråninger og hindringer.",
            "Gir ned i bakker, ulendt terreng og skarpe svinger — særlig med tungt redskap.",
            "Kjør aldri med girkassen i nøytral eller clutchen utkoplet. Rull aldri nedover i fri.",
            "Bremselengden øker med fart, tung last og i nedoverbakke.",
            "Tunge redskap kan begynne å svinge — senk farten.",
            "Kjør inn til siden før du stopper.",
          ],
        },
      ],
      sources: ["drive-roads", "towing-loads", "safety-chain", "safe-operation"],
    },
    {
      id: "frakt",
      title: "Frakt og tauing av traktoren",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "En traktor som ikke går, fraktes best på lastebil eller henger.",
            "Før frakt: lås panseret og lukk dører, takluke og vinduer.",
            "Surr fast i festepunktene med egnede stropper eller kjettinger, bruk kantbeskyttere, og lås med kiler. Ikke surr over ledninger og slanger.",
            "Tauing er begrenset. Uten motor er styringen tung og bremsepedalen går lengre. Se manualens avsnitt «Tow the Tractor» før du forsøker.",
          ],
        },
      ],
      sources: ["tow-tractor", "towing-loads"],
    },
  ],
  related: ["lys", "redskap", "betjening"],
};
