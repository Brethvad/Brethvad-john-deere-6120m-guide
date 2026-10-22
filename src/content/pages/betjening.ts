import type { Page } from "../types";

export const betjening: Page = {
  slug: "betjening",
  title: "Komme i gang og kjøre",
  nav: "Betjening",
  group: "Betjening",
  icon: "steering",
  intro:
    "Fra du går inn i førerhuset til traktoren står trygt parkert: sete og ratt, sjekk før start, start, kjøring, bremsing, bakker og parkering.",
  sections: [
    {
      id: "inn-ut",
      title: "Gå inn og ut av førerhuset",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Ha alltid ansiktet mot traktoren når du går opp og ned.",
            "Hold tre kontaktpunkter med trinn, håndtak og rekkverk.",
            "Hold trinnene rene for gjørme, snø, olje og fett.",
            "Hopp aldri ut. Gå aldri på eller av en traktor som beveger seg.",
            "Setet kan dreies til venstre for å gjøre det lettere å gå inn og ut — lås det i kjøreretningen før du kjører.",
          ],
        },
        {
          type: "p",
          text:
            "Nødutganger: begge dørene (trekk i spaken og skyv ut) og bakruten (drei spaken mot høyre og skyv ut).",
        },
      ],
      sources: ["steps-handholds", "emergency-exits", "seat-msg85"],
    },
    {
      id: "sete",
      title: "Still inn setet og ta på setebeltet",
      verification: "avhenger",
      blocks: [
        {
          type: "steps",
          items: [
            "Lengde: trekk i spaken, skyv setet til riktig avstand til pedalene, slipp spaken så den låser.",
            "Vekt: sitt på setet og still fjæringen etter vekten din (50–130 kg). Luftsete: start motoren først, og still til det grønne merket vises.",
            "Høyde og ryggstøtte etter behov.",
            "Lås setet i kjøreretningen.",
            "Ta på setebeltet: dra det over kroppen, klikk låsen inn, dra i låsen for å kontrollere, og stram over hoftene.",
          ],
        },
        { type: "callout", kind: "advarsel", text: "Fare for klemming ved justering. Juster bare når traktoren står stille, og pass på at du ikke treffer spaker ved et uhell." },
        {
          type: "callout",
          kind: "merk",
          text: "Spakene på setet varierer med setetype (komfortsete MSG85, luftsete MSG95 m.fl.). Typen står på skiltet bak på setet.",
        },
        { type: "p", text: "Passasjersetet er bare for opplæring eller feilsøking. Ingen andre skal sitte på traktoren." },
      ],
      sources: ["seat-msg85", "seat-msg95", "seat-belt", "riders"],
    },
    {
      id: "ratt",
      title: "Still inn rattet og speilene",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Vinkel: trekk spaken på rattstammen opp, still rattet og slipp. Drar du bare i spaken, går rattet helt opp.",
            "Høyde: løsne ringen under rattet, still høyden og stram ringen igjen.",
            "Speil: juster speilene før du kjører på vei, og hold vinduene rene.",
          ],
        },
        {
          type: "callout",
          kind: "usikker",
          text: "Manualen beskriver ikke hvordan speilene justeres. Klatre ikke på deler av traktoren som ikke er laget for det — bruk sikker stige eller plattform.",
        },
      ],
      sources: ["steering-wheel", "drive-roads", "pressure-washer"],
    },
    {
      id: "for-start",
      title: "Sjekk før start",
      verification: "verifisert",
      blocks: [
        { type: "p", text: "Gjør den daglige kontrollen før første start for dagen. De viktigste punktene:" },
        {
          type: "list",
          items: [
            "Motorolje: traktoren står vannrett, parkeringslås på, motor av. Nivået skal være innenfor det skraverte feltet på peilestaven. Start ikke motoren hvis nivået er under nedre merke.",
            "Kjølevæske: mellom MIN og MAX med kald motor — aldri under MIN.",
            "Fotbrems: trå ned pedalen(e) før start. De skal ikke kunne trås helt i bunn, selv med stor kraft. Vent 30 sekunder før du prøver igjen. Går de i bunn: kontakt forhandler.",
            "Drivstofffilter: tapp ut vann og bunnfall hvis det har samlet seg.",
            "Etter lang tids stillstand: fjern rusk og fremmedlegemer under panseret og førerhuset.",
          ],
        },
      ],
      sources: ["prestart", "daily-engine-oil", "daily-coolant", "daily-brakes"],
    },
    {
      id: "start",
      title: "Starte motoren",
      verification: "verifisert",
      blocks: [
        {
          type: "steps",
          items: [
            "Sett hydraulikkspakene (SCV) i nøytral.",
            "Sett håndgassen i første tredjedel av vandringen (middels turtall).",
            "Sett kjøreretningshendelen i nøytral og legg inn parkeringslåsen.",
            "Vri nøkkelen ett hakk mot høyre. Vent til gløde-lampen slukker.",
            "Vri nøkkelen helt mot høyre. Slipp når motoren starter.",
            "Vent 2 sekunder før du bruker brytere og spaker.",
            "La motoren gå på tomgang uten last i minst 30 sekunder (turbo).",
          ],
        },
        { type: "callout", kind: "fare", text: "Start aldri motoren i et lukket rom — fare for forgiftning. Lukk panseret før start. Start bare fra førersetet." },
        {
          type: "list",
          items: [
            "Kjør ikke starteren mer enn 30 sekunder. Vent minst ett minutt før neste forsøk.",
            "Til kjølevæsken er 20 °C, går motoren på forhøyet tomgang (minst 1050 o/min).",
            "Kjør med moderat last til motoren har driftstemperatur.",
            "Stopper motoren under drift: start den igjen MED EN GANG, så turboen ikke blir overopphetet.",
          ],
        },
        {
          type: "table",
          caption: "Dette settes tilbake ved hver start",
          head: ["Funksjon", "Etter start"],
          rows: [
            ["Kraftuttak", "AV"],
            ["Fjernstyring av kraftuttak", "AV"],
            ["Differensialsperre", "AV"],
            ["Kjøreretning", "NØYTRAL (selv om forover/bakover var valgt)"],
            ["Frontlasterdemping", "AV"],
            ["Elektrisk multifunksjonsspak og elektriske SCV-er", "Låst"],
            ["iTEC™", "AV"],
          ],
        },
      ],
      sources: ["starting", "turbo", "runaway"],
    },
    {
      id: "instrumenter",
      title: "Forstå instrumentpanelet",
      verification: "verifisert",
      blocks: [
        { type: "diagram", id: "instrument-cluster", caption: "Instrumentpanelet (forenklet). Se Førerhus for forklaring av hver lampe." },
        {
          type: "table",
          head: ["Lampe", "Betyr", "Gjør dette"],
          rows: [
            ["Rød STOP (blinker)", "Alvorlig feil", "Stopp motoren UMIDDELBART. Les meldingen."],
            ["Gul CAUTION (blinker)", "Det har oppstått en feil", "Les meldingen i displayet."],
            ["Blå INFO", "Feil i en elektrisk komponent, eller informasjon", "Les meldingen. Kontakt forhandler ved behov."],
            ["Kjølevæsketemperatur i rødt felt", "Motoren er overopphetet", "Se Feilsøking → Overoppheting."],
            ["Drivstoffmåler blinker", "Reserve", "Fyll tanken. Kjør aldri tom."],
            ["AdBlue-varsel", "Lite AdBlue (DEF)", "Fyll AdBlue. Ellers reduseres motoreffekten."],
          ],
        },
      ],
      sources: ["instrument-panel", "coolant-gauge", "fuel-def-level", "aftertreatment-indicators"],
    },
    {
      id: "kjoring",
      title: "Kjøre av gårde",
      verification: "verifisert",
      blocks: [
        {
          type: "steps",
          items: [
            "Se deg rundt. Ingen skal være i nærheten av traktoren, redskapet eller arbeidsområdet.",
            "Trå clutch (eller hold håndclutch-knappen) og velg gruppe med gruppespaken.",
            "Slipp clutchen.",
            "Flytt kjøreretningshendelen til forover eller bakover. Traktoren begynner å kjøre.",
            "Bruk girknappene for gir 1–4.",
          ],
        },
        { type: "p", text: "Se Girkasse for detaljer om grupper, gir, automatikk og valg av gir." },
      ],
      sources: ["aq-shift", "safe-operation"],
    },
    {
      id: "bremser",
      title: "Styre og bremse",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Styringen er hydrostatisk. Uten motor blir rattet tungt.",
            "Bremsen er hydraulisk forsterket. Trå begge pedalene sammen.",
            "Bremser du med begge pedalene, kobles firehjulstrekken inn for ekstra bremseeffekt (lampen lyser).",
            "På glatt underlag: pump med bremsene.",
            "Uten motor blir pedalvandringen lengre.",
          ],
        },
        {
          type: "callout",
          kind: "advarsel",
          title: "To pedaler (styrebrems)",
          text:
            "På vei og fast underlag: pedalene SKAL være koblet sammen med pedallåsen. Trår du på bare én, kan traktoren skrense. I felt kan de kobles fra for styrehjelp — bare i svært lav fart. Koble dem sammen igjen etterpå.",
        },
        { type: "callout", kind: "fare", text: "Pedalene skal aldri gå helt i bunn med motoren i gang. Skjer det, kontakt forhandler straks." },
      ],
      sources: ["service-brakes", "safe-operation", "spec-hydraulics"],
    },
    {
      id: "firehjulstrekk",
      title: "Firehjulstrekk",
      verification: "verifisert",
      blocks: [
        {
          type: "table",
          head: ["Bryterstilling", "Firehjulstrekk"],
          rows: [
            ["A", "Av"],
            ["B (midt)", "På"],
            ["C", "Automatisk"],
          ],
        },
        {
          type: "table",
          caption: "Automatisk modus kobler…",
          head: ["Situasjon", "Firehjulstrekk"],
          rows: [
            ["Under 19 km/t og liten styrevinkel", "PÅ"],
            ["Over 23 km/t", "AV"],
            ["Styrevinkel større enn innstilt utkoplingsvinkel", "AV"],
          ],
        },
        {
          type: "list",
          items: [
            "Kan kobles inn og ut i alle gir, under kjøring og under last, uten clutch.",
            "Over 5 km/t kobles den alltid inn når du bremser med begge pedalene, til traktoren står stille.",
            "Koble ut før du kjører i høy fart på offentlig vei.",
          ],
        },
      ],
      sources: ["fwd-engage", "fwd-controls", "drive-roads"],
    },
    {
      id: "difflas",
      title: "Differensialsperre",
      verification: "verifisert",
      blocks: [
        {
          type: "p",
          text:
            "Differensialsperren låser bakhjulene sammen så de går like fort. Bruk den når ett bakhjul spinner mer enn det andre — men bare når forskjellen ikke er for stor.",
        },
        {
          type: "list",
          items: [
            "Manuelt: bryter stilling A eller fotknappen (hvis montert). Går ut når du bremser med én eller begge pedalene, eller trykker bryteren igjen. Det er ditt ansvar å slå den på igjen.",
            "Automatisk (bryter stilling B): PÅ under 19 km/t med liten styrevinkel og uten bremsing. AV over 23 km/t, ved bremsing eller stor styrevinkel. Bare på traktor med firehjulstrekk.",
          ],
        },
        { type: "callout", kind: "advarsel", text: "Prøv aldri å svinge med differensialsperren innkoplet." },
        { type: "callout", kind: "merk", text: "Før veikjøring: tråkk lett på bremsene for å være sikker på at differensialsperren ikke står inne." },
      ],
      sources: ["difflock-engage", "difflock-controls", "drive-roads"],
    },
    {
      id: "bakker",
      title: "Bakker, ujevnt terreng og trange steder",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Unngå hull, grøfter og hindringer som kan få traktoren til å velte — særlig i bakker.",
            "Unngå skarpe svinger oppover i bakke.",
            "Å kjøre forover opp av en grøft, gjørme eller en bratt bakke kan få traktoren til å velte bakover. Rygg ut hvis mulig.",
            "Velg lav fart, så du slipper å stoppe eller bytte gir i bakken.",
            "Unngå å starte, stoppe eller svinge i bakke. Mister dekkene grepet: slå av kraftuttaket og kjør sakte rett ned.",
            "Hold alle bevegelser rolige. Ingen brå endringer i fart eller retning.",
            "Kjør aldri nær kanten av grøfter, skrenter, bratte skråninger eller vann.",
            "Stabiliteten blir dårligere når redskapet er løftet høyt.",
            "Smal sporvidde og høy fart øker veltefaren sterkt.",
          ],
        },
        {
          type: "list",
          items: [
            "Trange steder og rygging: se deg rundt og se direkte bakover. Bruk en hjelper når sikten er dårlig.",
            "Stol ikke på et kamera alene.",
            "Senk farten når du svinger, bruker enkeltbremser eller kjører i ulendt terreng.",
          ],
        },
      ],
      sources: ["slopes", "backover", "safe-operation"],
    },
    {
      id: "parkere",
      title: "Stoppe og forlate traktoren",
      verification: "verifisert",
      blocks: [
        {
          type: "steps",
          items: [
            "Stopp helt. Sett kjøreretningshendelen i nøytral.",
            "Legg inn parkeringslåsen (gruppespaken). I bakke: trå også bremsene.",
            "Slå av kraftuttaket. Senk alle redskaper til bakken. Sett hydraulikkspakene i nøytral.",
            "Etter tungt arbeid eller høyt turtall: la motoren gå på tomgang noen minutter.",
            "Vri nøkkelen til STOP. Ta ut nøkkelen hvis traktoren står uten tilsyn.",
            "Gå ut med ansiktet mot traktoren.",
          ],
        },
        { type: "callout", kind: "fare", text: "Et gir som står inne med motoren av, hindrer IKKE traktoren i å rulle." },
        { type: "callout", kind: "viktig", text: "Stopp aldri motoren mens traktoren ruller — det kan skade elektronikken og girkassen. Nøkkelen må stå i STOP, ellers kan batteriet bli flatt." },
        {
          type: "callout",
          kind: "merk",
          text: "Traktoren kan ikke taues på vanlig måte. En traktor som ikke går, fraktes best på henger. Se Veitransport.",
        },
      ],
      sources: ["stopping", "parking", "safe-operation", "tow-tractor"],
    },
    {
      id: "innkjoring",
      title: "Ny traktor eller nye hjul (innkjøring)",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Etter de første 4 og 8 timene — og etter hjulskift: kontroller tiltrekkingsmoment på hjulbolter.",
            "Innen de første 100 timene: sjekk hjulboltene ofte.",
            "Etter de første 100 timene: utfør servicepunktene for «etter første 100 timer» (se Vedlikehold).",
          ],
        },
        {
          type: "table",
          caption: "Hjulbolter forhjul, 6110M–6130M med firehjulstrekk (8 hull)",
          head: ["Felg", "Moment"],
          rows: [
            ["Rund eller firkantet hjulskive (A)", "300 Nm"],
            ["Firkantet hjulskive, felg (B)", "210 Nm"],
            ["Vaffelfelg, gull-bolter (B)", "280 Nm"],
            ["Vaffelfelg, grå-blå bolter (B)", "265 Nm"],
          ],
        },
        { type: "callout", kind: "merk", text: "Bakhjul og andre akseltyper har andre moment. Se manualens avsnitt «After the First 4 and 8 Hours of Operation»." },
      ],
      sources: ["break-in-4-8", "break-in-100", "service-100"],
    },
  ],
  related: ["girkasse", "daglig-kontroll", "veitransport"],
};
