import type { Page } from "../types";

// Implement facts come from Tokvam's own user manuals and product pages
// (sources prefixed vt- and ths-). Tractor-side facts come from OMAL219620.
// Where Tokvam's documents disagree with each other, both values are shown.

export const snoutstyr: Page = {
  slug: "snoutstyr",
  title: "Snøutstyr: Tokvam VT 280 City og 240 THS",
  nav: "Snøutstyr",
  group: "Betjening",
  icon: "snowflake",
  intro:
    "Vikeplogen sitter foran og snøfreseren bak. Her finner du hvordan de passer traktoren, hvordan du kobler dem til og bruker dem, og hva som skal vedlikeholdes. Les også Tokvams bruksanvisninger, som følger med redskapene.",
  sections: [
    {
      id: "oversikt",
      title: "Redskapene",
      verification: "verifisert",
      blocks: [
        {
          type: "table",
          caption: "Tokvam-redskapene på denne traktoren",
          head: ["", "VT 280 City (vikeplog)", "240 THS (snøfreser)"],
          rows: [
            ["Type", "Lav vikeplog for by, plasser og lav fart der god sikt er viktig", "Totrinns snøfreser"],
            ["Plassering", "Foran: frontløft, frontlaster eller lignende, med passende feste", "Bak: bakre trepunkt. Kjøreretning «trekkende»."],
            ["Drift", "Hydraulisk: ett dobbeltvirkende uttak og elektriske ventiler («super swing»)", "Kraftuttak 540 o/min. Hydraulisk tutsving på ett dobbeltvirkende uttak."],
            ["Bredde", "Bruksanvisning: 2355–2892 mm. Produktside: arbeidsbredde 233–280 cm.", "Arbeidsbredde 240 cm"],
            ["Vekt", "Bruksanvisning: 625 kg («foreløpig»). Produktside: 595 kg.", "800 kg eller 840 kg, avhengig av versjon"],
            ["Vinkling", "35° (produktside)", "—"],
          ],
        },
        {
          type: "callout",
          kind: "usikker",
          title: "Fra Tokvam, ikke fra John Deere",
          text:
            "Opplysningene om plogen og freseren kommer fra Tokvams bruksanvisninger og produktsider. Tokvams egne dokumenter er ikke helt enige om vekt og mål. Det som står på maskinskiltet og i bruksanvisningen for ditt serienummer, gjelder.",
        },
        {
          type: "callout",
          kind: "merk",
          title: "Sjekk versjonen av snøfreseren",
          text:
            "Bruksanvisningen har to versjoner av 240 THS. Fra CE-nr. 2710016: 840 kg, 70–120 hk. Fra CE-nr. 9023001: 800 kg, 70–150 hk. Maskinskiltet sitter bak på venstre side av freseren. Bruksanvisningen for plogen gjelder fra CE-nr. 8923001.",
        },
      ],
      sources: ["vt-tech", "vt-product", "vt-280-page", "ths-tech", "ths-safety", "ths-240-page"],
    },
    {
      id: "passer",
      title: "Passer de traktoren?",
      verification: "avhenger",
      blocks: [
        {
          type: "p",
          text: "Tokvams krav sammenholdt med John Deere-manualens data for 6120M. Punkter merket «Avklar» bør du ta med forhandler eller Tokvam før første bruk.",
        },
        {
          type: "table",
          caption: "Krav fra Tokvam mot traktorens data",
          head: ["", "Tokvam krever", "Traktoren (OMAL219620)", "Vurdering"],
          rows: [
            ["Plog: bærerens vekt", "Opptil 10 tonn (bruksanvisning). 4–10 tonn (produktside).", "Egenvekt ca. 5,7 t (eksempelutstyr). Maks totalvekt 9150 kg.", "Innenfor"],
            ["Plog: oljetrykk", "Maks 210 bar", "Maks 205 bar (foran oppgitt til 200 bar)", "Innenfor"],
            ["Plog: hydraulikk", "Ett dobbeltvirkende uttak. Kan bygges om til to.", "Frontkoplinger via SCV II, eller uttak styrt av multifunksjonsspaken. Avhenger av fronthydraulikken.", "Avklar"],
            ["Plog: strøm", "12 eller 24 V til ventilene, 7,5 A sikring. 7-polet kontakt til ventiler og lys.", "Foran: 7-polet stikkontakt (lys) og 3-polet strømuttak (maks 25 A), hvis montert.", "Avklar hvilken kontakt"],
            ["Plog: vekt foran", "595–625 kg", "Frontløft (hvis montert): 3300 kg kontinuerlig", "Innenfor"],
            ["Freser: effekt", "70–120 hk eller 70–150 hk, avhengig av versjon", "88 kW (ca. 120 hk). Maks 71 kW (96 hk) på bakre kraftuttak.", "Innenfor"],
            ["Freser: kraftuttak", "540 o/min", "540 finnes på alle versjoner av bakre kraftuttak. Redskap på 540 må ikke trenge mer enn 70 kW.", "Passer"],
            ["Freser: oljetrykk", "Maks 175 bar for tutsvingen (250 bar for hydraulisk deflektor, ekstrautstyr)", "Maks 205 bar", "Avklar"],
            ["Freser: vekt bak", "800 eller 840 kg", "Bakløft: 3964 kg eller 5278 kg ved koplingspunkt", "Innenfor"],
          ],
        },
        {
          type: "callout",
          kind: "advarsel",
          title: "Oljetrykket til tutsvingen",
          text:
            "Tokvam oppgir maks 175 bar for tutsvingen, mens traktorens hydraulikk kan gi opptil 205 bar. Guiden kan ikke si om det er et problem. Spør forhandler eller Tokvam før du kobler til, for eksempel om det trengs en trykkbegrensning.",
        },
        {
          type: "callout",
          kind: "merk",
          text: "Hvilket uttak plogen skal bruke foran, avhenger av hvilken fronthydraulikk traktoren har. Det er ikke kartlagt ennå (se Kilder og status).",
        },
      ],
      sources: ["vt-tech", "vt-hydraulics", "vt-product", "ths-tech", "ths-connect", "spec-weights", "spec-hydraulics", "spec-hitch", "spec-pto", "pto-options", "scv-front-hitch-hoses"],
    },
    {
      id: "ballast",
      title: "Vekt og ballast",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Minst 20 % av traktorens egenvekt må ligge på forakselen, ellers styrer den dårlig. En snøfreser på 800 kg bak letter forakselen.",
            "Med redskap foran må bakakselen ha nok vekt for grep, bremsing og stabilitet.",
            "Ballasten må kanskje endres når du bytter redskap, eller kjører med bare det ene.",
            "Aksellast og totalvekt med redskap må ikke overskrides: foran 4380 kg, bak 7070 kg, totalt 9150 kg.",
            "Vil du vite sikkert, kan du veie traktoren med redskapene montert.",
          ],
        },
        {
          type: "p",
          text: "Tokvam påpeker at kjøreegenskapene endres med plogen på, fordi vekten fordeles annerledes.",
        },
      ],
      sources: ["ballast-selection", "ballast-guidelines", "spec-weights", "tire-pressure-guidelines", "vt-safety"],
    },
    {
      id: "plog",
      title: "Vikeplogen VT 280 City",
      verification: "verifisert",
      blocks: [
        {
          type: "steps",
          title: "Koble til",
          items: [
            "Sørg for at ingen står mellom plogen og traktoren.",
            "Kjør inntil plogen og koble til festet.",
            "Koble strøm og hydraulikk til uttakene.",
            "Kontroller at koblingsboltene er låst.",
            "Kjør alle bevegelser flere ganger, så luften går ut av hydraulikken.",
          ],
        },
        {
          type: "p",
          text:
            "Plogen kan låses i høyden med de fire medfølgende boltene. De settes inn forfra og låses bak med en splint. Plogen kan da bare pendle ±6° sideveis.",
        },
        {
          type: "callout",
          kind: "fare",
          title: "Ingen beskyttelse ved rygging",
          text:
            "Sjokkventilene slipper ut hydraulikken hvis plogen treffer store hindringer, men bare når du kjører forover. Rygger du, har hydraulikken ingen beskyttelse.",
        },
        {
          type: "list",
          items: [
            "Plogen er laget for lav fart.",
            "Sikten kan bli dårligere, og kjøreegenskapene endres.",
            "Traktoren blir lengre foran. Vær ekstra forsiktig i kryss og ved utkjøring.",
            "Lys og blinklys foran kan bli dekket. Bruk da ekstra lys. Tokvam har et LED-lyssett som ekstrautstyr, og refleks er standard.",
            "Senk plogen når du forlater traktoren.",
            "Ikke juster sjokkventilene. De er stilt inn fra fabrikken. For høyt trykk kan skade både traktor og plog ved kollisjon.",
          ],
        },
        {
          type: "steps",
          title: "Koble fra",
          items: [
            "Fell vingene tilbake til V-stilling.",
            "Sett plogen på et plant og stabilt underlag, og avlast hydraulikken.",
            "Koble fra strøm, hydraulikk og koblingsbolter.",
          ],
        },
        {
          type: "p",
          text: "Slik du avlaster og kobler fra hydraulikken foran på traktoren, står under Hydraulikk → Koble fra foran.",
        },
      ],
      sources: ["vt-connect", "vt-hydraulics", "vt-product", "vt-safety", "vt-280-page", "front-hitch-economy", "scv-front-hitch-hoses"],
    },
    {
      id: "freser",
      title: "Snøfreseren 240 THS",
      verification: "verifisert",
      blocks: [
        {
          type: "steps",
          title: "Koble til",
          items: [
            "Ingen skal stå mellom freseren og traktoren mens noen sitter i førersetet.",
            "Fest freseren i bakre trepunkt. Kontroller at boltene sitter godt. Pass fingrene ved boltene til underarmer og toppstag.",
            "Koble slangene for tutsvingen til et dobbeltvirkende uttak bak. Sjekk at koplingene er tette og slangene hele. Se avsnittet om oljetrykk over.",
            "Stopp motoren og ta ut nøkkelen før du monterer kraftoverføringsakselen.",
            "Før første bruk: kontroller lengden på kraftoverføringsakselen, og juster den om nødvendig (se akselens egen bruksanvisning). For lang aksel kan knekke lageret i freseren og/eller traktorens PTO-tapp når freseren løftes.",
            "Monter akselen med sikkerhetsdelen mot freseren. Fest kjettingene på vernet både mot traktoren og mot freseren.",
            "Drei akselen rundt for hånd og sjekk at den ikke tar borti noe.",
          ],
        },
        {
          type: "callout",
          kind: "advarsel",
          text:
            "Løft aldri freseren så høyt at akselen trekkes ned mot sneglen. Når det skjer, avhenger av hvor traktorens PTO-tapp sitter og hvor høyt du løfter.",
        },
        {
          type: "steps",
          title: "Innstilling",
          items: [
            "Juster med toppstaget til freseren står vannrett mot bakken. Vekten skal hovedsakelig ligge på skiene bak.",
            "På løs grusvei: kjør med litt langt toppstag, så du ikke får med stein og grus.",
            "Still aldri freseren for langt forover. Det belaster akselen og fremre lager for mye. Tokvam anbefaler derfor ikke hydraulisk toppstag.",
            "Skiene bak har to høyder. Flytt boltene til ønsket hull.",
            "Tuten styres med traktorens hydraulikk. Klaffen stilles med stag, eller med hydraulikk hvis den har det.",
          ],
        },
        {
          type: "steps",
          title: "Bruk",
          items: [
            "Velg 540 o/min med PTO-spaken mens kraftuttaket er AV.",
            "Slå av SoftShift under arbeid med kraftuttak.",
            "Senk turtallet før du slår kraftuttaket på og av. Brå stopp av viften knekker brytebolten og sliter på drivverket.",
            "Slå av kraftuttaket før du løfter freseren.",
          ],
        },
        {
          type: "callout",
          kind: "fare",
          title: "Sikkerhet under bruk",
          text:
            "Rett aldri snøsprut mot folk, dyr, biler, bygninger eller noe annet som kan skades, og husk at is og stein kan følge med. Ved tetting: stopp traktoren og ta ut nøkkelen. Bruk spade eller stake, aldri hender eller føtter. Viften kan stå i spenn og slå når en fastkjørt gjenstand løsner. Gå aldri mellom traktor og freser mens kraftuttaket går. Gå aldri under freseren når den henger i løftet.",
        },
        {
          type: "list",
          items: [
            "Ved rygging er det fare for klemming, og freseren kan gi dårligere sikt. Rygg aldri mot noen.",
            "Sett aldri freseren ned når folk eller dyr er i nærheten.",
            "I transportstilling kan freseren dekke traktorens lys hvis den er løftet for høyt.",
            "Tokvam anbefaler å ha et egnet verktøy (spade eller stake) i traktoren før du begynner.",
            "Bruk aldri kraftoverføring med skadet vern. Alle deksler skal være på, også dekselet over brytebolten.",
          ],
        },
        {
          type: "p",
          text:
            "Brytebolten for sneglen sitter under dekselet bak på venstre side. Til 240 THS er det M8×45 med låsemutter, kvalitet 8.8. Bolt med annen dimensjon eller kvalitet kan redusere garantien. Brytebolten i kraftoverføringsakselen står i akselens egen bruksanvisning.",
        },
        {
          type: "steps",
          title: "Koble fra",
          items: [
            "Sett freseren på et plant og stabilt underlag.",
            "Koble fra hydraulikkslangene.",
            "Koble fra kraftoverføringsakselen (motor av, nøkkel ut).",
            "Ta ut boltene i toppstag og underarmer, og ta vare på dem.",
          ],
        },
      ],
      sources: ["ths-connect", "ths-use", "ths-safety", "ths-shear", "rear-pto-engage", "rear-pto-speed", "rotating-drivelines", "attach-implements"],
    },
    {
      id: "vedlikehold",
      title: "Vedlikehold av redskapene",
      verification: "verifisert",
      blocks: [
        {
          type: "callout",
          kind: "advarsel",
          text:
            "Sett redskapet på bakken, sett på parkeringsbremsen, slå av tenningen og ta ut nøkkelen før vedlikehold. Når du bytter sliteskjær på plogen, skal den stå på bukker. Den må ikke bare henge i traktoren.",
        },
        {
          type: "table",
          caption: "Vikeplog VT 280 City (Tokvams vedlikeholdsplan)",
          head: ["Når", "Hva"],
          rows: [
            ["Etter de første 10 timene", "Generell kontroll. Etterstram alle skruer."],
            ["Før hver bruk", "Generell kontroll: slanger (lekkasje og brudd), slitasje på sliteskjær, skader på konstruksjonen (særlig skjærholder og rundt kingbolten), sikkerhetsutstyret på plass."],
            ["Hver 10. time", "Vask ved behov."],
            ["Hver 30. time", "Smør alle smørepunkter (kjør vingene i Y-stilling for å nå dem). Vask."],
            ["Hver sesong eller hver 6. måned", "Etterstram alle skruer."],
            ["Lagring over lengre tid", "Smør alle smørepunkter, vask, og smør stempelstengene med fett mot rust."],
          ],
        },
        {
          type: "list",
          items: [
            "Vask oftere hvis plogen brukes på saltede veier. Ikke rett høytrykksspyleren mot sylinderpakninger, smørepunkter eller slangekoplinger.",
            "Feil skal rettes før plogen brukes igjen.",
          ],
        },
        {
          type: "table",
          caption: "Snøfreser 240 THS (Tokvams bruksanvisning)",
          head: ["Når", "Hva"],
          rows: [
            ["Etter de første 10 timene", "Etterstram alle skruer. Smør alle bevegelige deler."],
            ["Hver 10. time", "Smør kjedene bak og på siden. Smør knutekrysset med brytebolten bak (utsatt for fukt)."],
            ["Hver 40. time", "Smør lagrene, forsiktig så pakningene ikke ødelegges. Smør svingkransen og drei tuten for å fordele fettet. Kontroller oljenivået i vinkelgiret."],
            ["Ved behov", "Stram kjedene. De skal gi 1,5–2 cm når du trykker midt på med tommelen."],
            ["Én gang i året / etter hver sesong", "Skift olje i vinkelgiret: 1,2 liter GL5 80/90 eller tilsvarende."],
            ["Før lagring", "Rengjør og smør grundig. Kontroller slanger og koplinger."],
          ],
        },
        {
          type: "list",
          items: [
            "Svingkransen er utsatt for vær. Bruk kuldefett (−40 °C) etter klimaet.",
            "Sliteskjærene har doble hull. De kan først flyttes ned og deretter snus. Følg med på slitasjen, så skruer og fester ikke ødelegges.",
            "Kraftoverføringsakselen smøres etter sin egen bruksanvisning.",
            "Sett alltid dekslene på igjen før du starter, og sjekk at du ikke har glemt verktøy i kjedekassen.",
          ],
        },
        {
          type: "callout",
          kind: "merk",
          text:
            "Begge bruksanvisningene sier at arbeidsgiver skal sørge for årlig kontroll etter forskrift FOR-1998-06-26-608. Sjekk hos Arbeidstilsynet hvilke regler som gjelder i dag, og om de gjelder deg.",
        },
      ],
      sources: ["vt-safety", "ths-service", "ths-shear"],
    },
    {
      id: "vinter",
      title: "Traktoren om vinteren",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Under 0 °C: bruk vinterdiesel, eller tilsett et kuldemiddel (f.eks. Fuel-Protect vinter) i vanlig diesel.",
            "Vinterdiesel kan gi litt mindre effekt. Sjekk dieseltypen før du feilsøker lav effekt i kulde.",
            "Bruk ikke vinterfront (stoff, papp eller plate) foran grillen. Brukes den likevel, skal den aldri dekke hele grillen. Omtrent 25 % i midten skal alltid være åpent.",
            "Med kjettinger skal det være minst 100 mm mellom dekk og skjerm, både fra dekksiden og fra slitebanen.",
            "Kjølevæskevarmer (hvis montert) og AdBlue i kulde: se Vedlikehold → Vinter.",
            "Bruk trinn og håndtak når du går inn og ut, og vær ekstra forsiktig når snø gjør dem glatte.",
          ],
        },
      ],
      sources: ["cold-weather", "tire-guidelines", "steps-handholds"],
    },
    {
      id: "veikjoring",
      title: "På vei med snøutstyr",
      verification: "avhenger",
      blocks: [
        {
          type: "list",
          items: [
            "Plogen er opptil 2892 mm bred, mens traktoren selv er maks 2550 mm.",
            "Kontroller at lys, blinklys og refleks ikke er dekket av plog eller freser. Bruk ellers ekstra lys.",
            "Bruk sjekklisten «Før offentlig vei» på Veitransport-siden.",
          ],
        },
        {
          type: "callout",
          kind: "usikker",
          title: "Lovkrav er ikke tatt med",
          text:
            "Regler for bredde, lys, merking og fart med snøplog og snøfreser på offentlig vei står ikke her. Se Statens vegvesen og vognkortet. Tokvam og John Deere sier ikke hva som er lovlig i Norge.",
        },
      ],
      sources: ["spec-dimensions", "drive-roads", "vt-280-page", "front-hitch-economy"],
    },
    {
      id: "sjekkliste",
      title: "Sjekkliste før snørydding",
      verification: "verifisert",
      blocks: [{ type: "checklist", id: "snoutstyr" }],
      sources: ["vt-safety", "vt-connect", "ths-connect", "ths-use", "ths-service", "rear-pto-engage"],
    },
  ],
  related: ["redskap", "hydraulikk", "veitransport", "manedlig-kontroll"],
};
