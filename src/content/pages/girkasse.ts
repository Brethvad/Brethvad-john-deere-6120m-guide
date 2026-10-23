import type { Page } from "../types";

export const girkasse: Page = {
  slug: "girkasse",
  title: "AutoQuad™ PLUS-girkassen",
  nav: "Girkasse",
  group: "Systemer",
  icon: "cog",
  intro:
    "Girkassen har 6 grupper (A–F) med 4 gir i hver, altså 24 gir forover og 24 bakover. Gruppe velges med spak og clutch. Gir 1–4 skiftes med knapper uten clutch — eller automatisk.",
  sections: [
    {
      id: "variant",
      title: "Hvilken girkasse gjelder dette?",
      verification: "bekreftet",
      blocks: [
        {
          type: "callout",
          kind: "merk",
          title: "Girkassen på denne traktoren",
          text:
            "Eieren har bekreftet AutoQuad 24/24 med 40 km/t. I manualen OMAL219620 heter den AutoQuad™ PLUS, og den er beskrevet i seksjon 48. Kjennetegn: gruppespaken har girknapper, en Automatic-knapp og en håndclutch-knapp, og displayet har et AUTO-symbol.",
        },
        {
          type: "table",
          caption: "Girkassene i manualen — ikke bland dem",
          head: ["Girkasse", "Gir", "Hvordan gir skiftes", "Gjelder denne traktoren?"],
          rows: [
            ["PowrQuad™", "16/16 eller 24/24", "Egen girspak, gruppe med clutchpedal", "Nei"],
            ["PowrQuad™ PLUS", "16/16 eller 24/24", "Girknapper på gruppespaken, ingen automatikk", "Nei (men mange betjeningsdetaljer er like)"],
            ["AutoQuad™ PLUS", "24/24, 40 km/t", "Girknapper + automatisk girskift innen gruppen", "Ja — bekreftet av eier"],
            ["CommandQuad™ PLUS", "24/24", "Egen kjørespak, hastighetshjul, park-spak", "Nei"],
          ],
        },
      ],
      sources: ["travel-speed", "aq-shift", "pq-shift", "spec-transmission"],
    },
    {
      id: "oppbygging",
      title: "Slik er girkassen bygd opp",
      verification: "verifisert",
      blocks: [
        { type: "diagram", id: "gear-structure", caption: "6 grupper × 4 gir = 24 gir forover. Det samme bakover." },
        {
          type: "p",
          text:
            "Tenk på gruppene som «etasjer» og girene som «trinn» i hver etasje. Gruppe A er lavest (sakte, mye kraft), gruppe F er høyest (rask transport). Inne i hver gruppe gir 1 lavest og 4 høyest fart.",
        },
        {
          type: "list",
          items: [
            "Gruppe (A–F): velges med gruppespaken. Krever clutchpedal eller håndclutch-knappen.",
            "Gir (1–4): velges med girknappene på gruppespaken. Ingen clutch.",
            "Kjøreretning (forover/bakover): velges med hendelen til venstre for rattet. Ingen clutch.",
            "Planetgir, hydraulisk betjent. Retningsskiftet er elektrisk og skjer under last uten clutch.",
          ],
        },
        {
          type: "simple",
          text:
            "Kort sagt: Spaken velger «etasje», knappene velger «trinn», hendelen til venstre velger forover eller bakover.",
        },
      ],
      sources: ["aq-shift", "spec-transmission"],
    },
    {
      id: "fart",
      title: "Hvor fort går hvert gir?",
      verification: "verifisert",
      blocks: [
        {
          type: "p",
          text:
            "Farten i hvert gir avhenger av dekkstørrelsen (SRI-verdien). Tallene under gjelder for SRI 750 mm ved 2100 o/min (merketurtall). De er teoretiske — last, dekktrykk og slipp påvirker den faktiske farten.",
        },
        { type: "diagram", id: "speed-chart", caption: "Fart forover i km/t, SRI 750 mm, 2100 o/min (fra manualens fartstabell)." },
        {
          type: "table",
          caption: "Forover, SRI 750 mm, 2100 o/min (km/t)",
          head: ["Gruppe", "Gir 1", "Gir 2", "Gir 3", "Gir 4"],
          rows: [
            ["A", "1,4", "1,7", "2,0", "2,5"],
            ["B", "3,4", "4,1", "5,0", "6,1"],
            ["C", "5,6", "6,7", "8,1", "9,9"],
            ["D", "9,2", "11,1", "13,3", "16,2"],
            ["E", "14,9", "18,0", "21,6", "26,4"],
            ["F", "21,4", "25,8", "30,9", "37,9"],
          ],
        },
        {
          type: "callout",
          kind: "merk",
          text:
            "Finn traktorens SRI-verdi for bakdekkene for nøyaktige tall (se manualens fartstabeller og dekktabell). Gruppene overlapper hverandre: D4 (16,2) er for eksempel raskere enn E1 (14,9).",
        },
      ],
      sources: ["speeds-24-700", "travel-speed"],
    },
    {
      id: "start",
      title: "Kjøre av gårde",
      verification: "verifisert",
      blocks: [
        {
          type: "steps",
          items: [
            "Før du starter motoren: kjøreretningshendelen i nøytral, parkeringslås på.",
            "Start motoren og vent 2 sekunder før du bruker spaker og brytere.",
            "Trå inn clutchpedalen (eller hold inne håndclutch-knappen).",
            "Flytt gruppespaken ut av parkeringslåsen til ønsket gruppe.",
            "Slipp clutchen/knappen.",
            "Se deg rundt. Flytt kjøreretningshendelen til forover eller bakover — traktoren begynner å kjøre.",
          ],
        },
        {
          type: "callout",
          kind: "advarsel",
          text: "Med motoren i gang og en gruppe valgt setter kjøreretningshendelen traktoren i bevegelse med en gang.",
        },
        {
          type: "callout",
          kind: "merk",
          text:
            "Hvis kjøreretningshendelen ikke står i nøytral når motoren startes, kommer det en alarm og en melding. Etter at motoren har vært stoppet, går girkassen alltid til nøytral — sett hendelen i nøytral og velg retning på nytt.",
        },
      ],
      sources: ["aq-shift", "starting"],
    },
    {
      id: "gruppespak",
      title: "Bytte gruppe og gir",
      verification: "verifisert",
      blocks: [
        { type: "diagram", id: "shift-controls", caption: "Gruppespaken med knappene (forenklet tegning)." },
        {
          type: "list",
          items: [
            "Gruppe: krever clutchpedal eller håndclutch-knappen.",
            "Gir 1–4: trykk girknappene opp/ned. Ingen clutch.",
            "Ekstra girbryter (E) kan finnes i tillegg til knappene.",
          ],
        },
        {
          type: "steps",
          title: "Gire opp under last (transport) — med «speed matching» AV",
          items: [
            "Velg en gruppe som passer for kjøring med last.",
            "Legg inn 1. gir.",
            "Kjør og gir opp gjennom gruppene til øverste gruppe.",
            "Gir så opp gjennom girene.",
          ],
        },
        {
          type: "steps",
          title: "Gire opp under last — med «speed matching» PÅ",
          items: [
            "Velg en gruppe som passer for kjøring med last.",
            "Legg inn 1. gir.",
            "Kjør og gir opp gjennom girene til 4. gir.",
            "Velg neste gruppe — girkassen velger selv giret som passer farten.",
            "Fortsett å gire opp og bytte gruppe til ønsket fart.",
          ],
        },
        {
          type: "details",
          title: "Hva er «speed matching»?",
          blocks: [
            {
              type: "p",
              text:
                "Når speed matching er slått på og du bytter gruppe i 7 km/t eller mer, velger girkassen automatisk det giret i ny gruppe som passer farten. Du kan overstyre dette ved å trykke en girknapp mens du bytter gruppe. Slås av og på i displayets girkasseside.",
            },
          ],
        },
      ],
      sources: ["aq-shift", "aq-settings"],
    },
    {
      id: "clutch",
      title: "Clutch og håndclutch",
      verification: "verifisert",
      blocks: [
        {
          type: "p",
          text:
            "Du trenger bare clutch når du bytter gruppe eller skal stå stille med retning valgt. Girene 1–4 og kjøreretningen skiftes uten clutch.",
        },
        {
          type: "list",
          items: [
            "Håndclutch-knappen på gruppespaken: hold inne = utkoplet, slipp = innkoplet mykt.",
            "Håndclutchen egner seg ikke til å sige sakte inn mot et redskap.",
            "På traktor med setebryter: Har det ikke vært vekt på setet og ingen pedal trådd de siste 3 sekundene før du slipper knappen, kjører ikke traktoren. Sett da hendelen i nøytral og tilbake.",
            "Håndclutchen kan være deaktivert (diagnoseadresse PTQ167 — se manualens kapittel om feilkoder og innstillinger).",
          ],
        },
      ],
      sources: ["aq-shift"],
    },
    {
      id: "automatikk",
      title: "Automatisk girskift",
      verification: "verifisert",
      blocks: [
        {
          type: "p",
          text:
            "Automatikken skifter mellom gir 1–4 innenfor gruppen du har valgt. Den bytter ikke gruppe. Den gir opp eller ned ut fra gasspedal/håndgass og motorturtallet.",
        },
        {
          type: "steps",
          items: [
            "Trykk Automatic-knappen én gang. AUTO-symbolet og streker for høyeste gir vises.",
            "For å begrense høyeste gir (automatikken må være av først): trykk 1 gang = 4. gir, 2 ganger raskt = 3. gir, 3 ganger raskt = 2. gir.",
            "Slå av ved å trykke knappen igjen eller velge gir manuelt.",
          ],
        },
        {
          type: "table",
          caption: "Når girer automatikken? (potensiometer for automatikk)",
          head: ["Modus", "Gir opp", "Gir ned"],
          rows: [
            ["Eco", "Pedal/håndgass over 85 % og motor over 1870 o/min", "Over 55 % og under 1300 o/min, eller under 55 % og under 1100 o/min"],
            ["Power", "Pedal/håndgass over 85 % og motor over 2100 o/min", "Over 55 % og under 1720 o/min, eller under 55 % og under 1100 o/min"],
            ["Mellomstillinger", "Mellom Eco og Power", "Mellom Eco og Power"],
          ],
        },
        {
          type: "callout",
          kind: "viktig",
          text: "Eco-modus er BARE for lett feltarbeid og veikjøring uten tung last.",
        },
        {
          type: "callout",
          kind: "merk",
          text: "Innstillingen for høyeste gir forsvinner når automatikken slås av.",
        },
      ],
      sources: ["aq-shift", "aq-settings"],
    },
    {
      id: "kjoreretning",
      title: "Forover, bakover og retningsskifte",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Kjøreretningshendelen til venstre for rattet har forover, nøytral og bakover.",
            "Retningen skiftes uten clutch og under last.",
            "Forholdet mellom fart forover og bakover kan stilles mellom +3 og −3 i displayet.",
          ],
        },
        {
          type: "steps",
          title: "Skifte retning trygt",
          items: [
            "Senk farten.",
            "Se deg rundt — særlig bak traktoren og redskapet.",
            "Flytt hendelen til motsatt retning.",
          ],
        },
        {
          type: "callout",
          kind: "merk",
          title: "Kald olje",
          text:
            "Under 0 °C kan hendelen reagere tregt, under −10 °C kan retningsskiftet ta lengre tid, og under +5 °C er SoftShift slått av. Du kan måtte flytte hendelen flere ganger. Det blir normalt når oljen er varm.",
        },
      ],
      sources: ["aq-shift", "aq-settings", "backover"],
    },
    {
      id: "valg-av-gir",
      title: "Velge riktig gir",
      verification: "verifisert",
      blocks: [
        { type: "diagram", id: "rpm-load", caption: "Velg giret slik at turtallet faller 150–250 o/min når lasten kommer på." },
        {
          type: "list",
          items: [
            "Kjør i høyest mulige gir med redusert motorturtall.",
            "Velg giret slik at turtallet faller 150–250 o/min fra ubelastet når du arbeider.",
            "Ved lett arbeid: hold turtallet under 2000 o/min og velg gir slik at turtallet faller 200–300 o/min.",
            "Unngå at motoren blir overbelastet over lang tid.",
          ],
        },
        {
          type: "simple",
          text:
            "Motoren yter mest mellom ca. 1600 og 2100 o/min (konstant effekt-område). Høyere gir og lavere turtall sparer drivstoff så lenge motoren ikke «sliter». Faller turtallet mye når lasten kommer på, er giret for høyt.",
        },
        {
          type: "table",
          caption: "Turtall du bør kjenne (6120M)",
          head: ["Hva", "Verdi"],
          rows: [
            ["Tomgang", "850 o/min"],
            ["Merketurtall", "2100 o/min"],
            ["Høy tomgang", "2250 o/min"],
            ["Konstant effekt", "1600–2100 o/min"],
            ["Største dreiemoment", "542 Nm ved 1500 o/min"],
          ],
        },
      ],
      sources: ["fuel-consumption", "spec-engine", "travel-speed"],
    },
    {
      id: "krypegir",
      title: "Krypegir (hvis montert)",
      verification: "avhenger",
      blocks: [
        {
          type: "p",
          text:
            "Krypegir gir 12 ekstra, svært lave gir (ca. 0,14–1,08 km/t). Det er ekstrautstyr og ikke oppgitt for denne traktoren.",
        },
        {
          type: "steps",
          items: ["Stopp traktoren og trå clutch.", "Velg gruppe.", "Legg inn krypegiret. Motorturtall maks 1000 o/min."],
        },
        {
          type: "callout",
          kind: "viktig",
          text: "Aldri i gruppe D eller høyere, og aldri med jordbearbeidende redskap som trenger stor trekkraft. Det kan gi mekanisk skade.",
        },
      ],
      sources: ["creeper-engage", "creeper-controls", "spec-transmission"],
    },
    {
      id: "parkere",
      title: "Stoppe og parkere",
      verification: "verifisert",
      blocks: [
        {
          type: "steps",
          items: [
            "Stopp traktoren helt.",
            "Sett kjøreretningshendelen i nøytral.",
            "Legg gruppespaken i parkeringslås. I bakke: trå også bremsepedalene.",
            "Senk redskaper til bakken og sett hydraulikkspakene i nøytral.",
            "Slå av kraftuttaket. Stopp motoren med nøkkelen i STOP. Ta ut nøkkelen hvis du forlater traktoren.",
          ],
        },
        { type: "callout", kind: "fare", text: "Å la et gir stå inne med motoren av hindrer IKKE traktoren i å rulle. Bruk parkeringslåsen." },
        { type: "callout", kind: "viktig", text: "Legg aldri inn parkeringslåsen mens traktoren ruller. Stopp heller aldri motoren mens traktoren er i bevegelse." },
      ],
      sources: ["aq-shift", "parking", "stopping", "safe-operation"],
    },
    {
      id: "varsler",
      title: "Varsler og nødkjøring (come-home)",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Alarm + blått INFO-lys: gruppespaken i park mens kjøreretningshendelen ikke er i nøytral, eller hendelen flyttes ut av nøytral mens parkeringslåsen er på.",
            "Bare gir 1–3 tilgjengelig: girkassen mangler fartssignal.",
            "Rødt STOP-lys: stopp motoren straks og les meldingen.",
          ],
        },
        {
          type: "details",
          title: "Come-home: kjøre hjem ved elektrisk feil i girkassen",
          blocks: [
            {
              type: "p",
              text:
                "Ved elektrisk feil i girkassen kan traktoren kanskje kjøres i come-home-modus. Stopp motoren, ta ut kontakten (A) i sikrings-/releboksen, drei den 90° mot høyre og sett den inn igjen slik at «Come Home» står øverst. Start motoren. Se manualens avsnitt om sikringer og releer.",
            },
            {
              type: "list",
              items: [
                "Motorturtall maks 1500 o/min.",
                "Bare 1. gir i hver gruppe.",
                "Håndclutchen virker ikke.",
                "Retning kan bare skiftes når traktoren står stille og clutchpedalen er trådd.",
              ],
            },
            {
              type: "steps",
              title: "Start i come-home-modus",
              items: [
                "Følg instruksjonene i instrumentpanelet.",
                "Trå clutchpedalen og hold den nede.",
                "Velg gruppe.",
                "Velg retning med kjøreretningshendelen.",
                "Slipp clutchpedalen gradvis.",
              ],
            },
            { type: "callout", kind: "viktig", text: "Come-home er bare for å komme seg til verksted. Kontakt forhandler." },
          ],
        },
      ],
      sources: ["aq-shift", "come-home", "instrument-panel"],
    },
    {
      id: "innstillinger",
      title: "Innstillinger i displayet",
      verification: "verifisert",
      blocks: [
        {
          type: "table",
          head: ["Innstilling", "Hva den gjør"],
          rows: [
            ["Forhold forover/bakover (+3 til −3)", "Hvor mye raskere eller saktere traktoren går bakover enn forover. Ved automatikk gjelder høyeste innstilte gir foran."],
            ["SoftShift (PÅ / AV / Auto)", "Endrer motorturtallet kort for mykere girskift. Auto = på når PTO er av. Skal være AV ved PTO-arbeid."],
            ["Speed matching", "Velger gir som passer farten når du bytter gruppe over ca. 7 km/t."],
            ["FieldCruise-potensiometer", "Begrenser maks motorturtall ved PTO-arbeid (ned til 1050 o/min). Sett på maks eller «Off» når du ikke bruker PTO."],
            ["Automatikk-potensiometer", "Stiller girskiftpunktene mellom Eco og Power."],
          ],
        },
        {
          type: "steps",
          title: "Slik endrer du en innstilling",
          items: [
            "Trykk Meny til girkassesiden vises.",
            "Trykk Bekreft for å velge feltet.",
            "Endre med pil opp/ned.",
            "Lagre med Bekreft. Avslutt med Meny.",
          ],
        },
      ],
      sources: ["aq-settings", "rear-pto-engage", "display-ui"],
    },
    {
      id: "vanlige-feil",
      title: "Vanlige feil",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Bytte gruppe uten clutch eller håndclutch.",
            "Legge inn parkeringslås mens traktoren ruller.",
            "Glemme at kjøreretningshendelen starter traktoren med en gang.",
            "Bruke Eco-modus ved tung last.",
            "Bruke krypegir i gruppe D eller høyere.",
            "Stoppe motoren mens traktoren ruller — det kan skade elektronikk og girkasse.",
            "Kjøre med SoftShift på under PTO-arbeid.",
          ],
        },
      ],
      sources: ["aq-shift", "aq-settings", "stopping", "creeper-engage", "rear-pto-engage"],
    },
  ],
  related: ["betjening", "forerhus", "feilsoking"],
};
