import type { Page } from "../types";

export const forerhus: Page = {
  slug: "forerhus",
  title: "Førerhuset og betjeningsorganene",
  nav: "Førerhus",
  group: "Førerhus",
  icon: "armchair",
  intro:
    "Klikk på et betjeningsorgan på skissen eller i listen for å se hva det heter, hvor det sitter, hva det gjør og hva du bør passe på. Skissen er forenklet og laget for denne guiden.",
  sections: [
    {
      id: "instrumentpanel",
      title: "Instrumentpanelet og varsellampene",
      verification: "verifisert",
      blocks: [
        { type: "diagram", id: "instrument-cluster", caption: "Instrumentpanel for PowrQuad™ PLUS / AutoQuad™ PLUS (forenklet tegning)." },
        {
          type: "table",
          head: ["Lampe", "Betyr"],
          rows: [
            ["Blå INFO", "Feil i en elektrisk komponent (f.eks. hydraulikk eller girkasse). Les meldingen."],
            ["Gul CAUTION", "Blinker ved feil. Les meldingen."],
            ["Rød STOP", "Blinker ved alvorlig feil. Stopp motoren UMIDDELBART."],
            ["N", "Kjøreretningshendel og gruppespak i nøytral."],
            ["Pil forover / bakover", "Gruppe valgt og kjøreretning forover eller bakover."],
            ["Firehjulstrekk", "Firehjulstrekk innkoplet."],
            ["Differensialsperre", "Differensialsperre innkoplet."],
            ["Fjernlys (blå)", "Fjernlys på."],
            ["PTO / front-PTO / bak-PTO", "Kraftuttak innkoplet (foran eller bak)."],
            ["Gløding", "Lyser når nøkkelen står i første stilling. Start ikke før den slukker."],
            ["Blinkpiler", "Blinklys eller nødblink."],
            ["Tilhenger 1 / 2", "Blinker når tilhenger er koblet til og blinklyset er på."],
            ["Parkeringsbrems/nødbrems", "Parkerings- eller nødbremsen er aktiv (ikke Nord-Amerika)."],
            ["Eksosfilterrens", "Partikkelfilteret renses."],
            ["Fjernstyring PTO", "Fjernstyring av bakre kraftuttak er aktiv."],
            ["Cruise", "Cruisekontroll aktiv."],
            ["IPM", "Intelligent Power Management aktiv (hvis montert)."],
            ["Girindikator 1–4 og AUTO", "Valgt gir. AUTO = automatisk girskift på. Strekene viser høyeste programmerte gir."],
            ["iTEC", "iTEC™ aktiv."],
          ],
        },
        {
          type: "list",
          items: [
            "Venstre urskive: turteller (× 1000 o/min). Høyre: speedometer (km/t eller mph).",
            "Nederst: kjølevæsketemperatur, drivstoff og AdBlue.",
            "Lampetest: ved start lyser lampene for montert utstyr i ca. 2 sekunder. Lyser en lampe ikke, kan LED eller sikring være defekt.",
          ],
        },
      ],
      sources: ["instrument-panel", "coolant-gauge", "fuel-def-level"],
    },
    {
      id: "display",
      title: "Det digitale displayet",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Øverst: driftstimer og klokke når tenningen slås på, fart når traktoren kjører, PTO-turtall når bakre kraftuttak går.",
            "Informasjonsmenyen (pil opp/ned): klokke, driftstimer, motorturtall, fart, distanse, areal, drivstofforbruk, front-PTO-turtall.",
            "Distanse, areal og forbruk nullstilles med langt trykk på Bekreft.",
            "Grunninnstillinger (Meny): lysstyrke dag/natt, kontrast, språk, enheter, tallformat, klokke, feilkoder.",
            "Serviceintervall: 20 timer før service piper det ved hver start. Nullstilles ved å holde begge piltastene ca. 7 sekunder i feltet for tid siden service.",
          ],
        },
        {
          type: "steps",
          title: "Slik endrer du en innstilling",
          items: ["Trykk Meny til ønsket side vises.", "Trykk Bekreft for å velge feltet.", "Endre verdien med pil opp/ned.", "Lagre med Bekreft. Gå ut med Meny."],
        },
      ],
      sources: ["display-ui", "display-basic", "display-info", "display-more"],
    },
    {
      id: "klima",
      title: "Varme, ventilasjon og klimaanlegg",
      verification: "verifisert",
      blocks: [
        {
          type: "table",
          head: ["Hva du vil", "Slik gjør du det"],
          rows: [
            ["Fjerne dugg eller is på frontruten", "Full varme, luftretning mot frontruten, vifte på 4"],
            ["Luft mot føreren", "Luftretning mot fører, juster dysene"],
            ["Jevn fordeling", "Luftretning mot vinduer, fører og gulv"],
            ["Tørke luften (dugg om vinteren)", "Klimabryter på kaktus, varmen i rødt felt, vifte 1 eller høyere"],
            ["Kjøle", "Klimabryter på snøfnugg, varmen i blått felt, vifte 1 eller høyere. Mer kjøling: drei regulatoren mot klokka"],
          ],
        },
        {
          type: "list",
          items: [
            "Kjøling virker først når det er over ca. 18 °C ute.",
            "Kjør klimaanlegget noen minutter én gang i måneden.",
            "Førerhuset beskytter ikke mot innånding av damp, aerosoler og støv fra sprøytemidler.",
          ],
        },
      ],
      sources: ["fan-louvers", "heating", "aircon", "hvac-controls"],
    },
    {
      id: "uttak",
      title: "Strømuttak og kontakter",
      verification: "avhenger",
      blocks: [
        {
          type: "table",
          head: ["Uttak", "Maks belastning"],
          rows: [
            ["12 V-uttak / sigarettenner (høyre sidekonsoll)", "120 W"],
            ["3-polet uttak (12 V, SAE)", "30 A sikring, 25 A kontinuerlig, maks 300 W per kurs"],
            ["ISOBUS-kontakt i førerhuset", "120 W"],
            ["Signalkontakt ISO 11786 (fart, PTO-turtall, redskapsbryter)", "10 A sikring"],
            ["Servicekontakt (CAN-bus)", "Bare service og diagnose — ikke koble til annet utstyr"],
          ],
        },
        { type: "callout", kind: "viktig", text: "Summen av alt som er koblet til samtidig må ikke overstige det kretsen tåler, selv om utstyret sitter i forskjellige uttak." },
      ],
      sources: ["outlet-12v", "outlet-sae", "isobus-cab", "signal-socket", "service-socket"],
    },
  ],
  related: ["betjening", "girkasse", "lys"],
};

export const dagligKontroll: Page = {
  slug: "daglig-kontroll",
  title: "Daglig kontroll",
  nav: "Daglig kontroll",
  group: "Kontroll og vedlikehold",
  icon: "clipboard-check",
  intro:
    "Gå gjennom listen før første start for dagen. Kryss av etter hvert — avkryssingen lagres i nettleseren din frem til du nullstiller. Hver gruppe sier om motoren skal være av eller på.",
  sections: [
    {
      id: "sjekkliste",
      title: "Sjekkliste",
      verification: "verifisert",
      blocks: [
        {
          type: "callout",
          kind: "advarsel",
          text:
            "Gjør aldri kontroller nær bevegelige deler mens motoren går. Det meste sjekkes med motoren AV, parkeringslås PÅ og redskaper senket.",
        },
        { type: "checklist", id: "daglig" },
      ],
      sources: ["prestart", "daily-engine-oil", "daily-coolant", "daily-trans-oil", "daily-brakes", "daily-lights", "daily-radiator", "daily-fuel-filter"],
    },
    {
      id: "detaljer",
      title: "Slik sjekker du væskene",
      verification: "verifisert",
      blocks: [
        {
          type: "steps",
          title: "Motorolje",
          items: [
            "Traktoren står vannrett, parkeringslås på, motor av.",
            "Sjekk kald (f.eks. om morgenen), eller vent ca. 40 minutter etter at motoren har gått.",
            "Trekk ut peilestaven, tørk den, sett den helt inn og trekk den ut igjen.",
            "Nivået skal være innenfor det skraverte feltet.",
            "Fyll olje med riktig viskositet gjennom påfyllingshalsen ved behov. Start ikke under nedre merke.",
          ],
        },
        {
          type: "steps",
          title: "Kjølevæske",
          items: [
            "Kald motor.",
            "Nivået i ekspansjonstanken skal være nær MAX og aldri under MIN.",
            "Fyll ved behov med riktig kjølevæske (COOL-GARD™ II).",
          ],
        },
        { type: "callout", kind: "fare", text: "Åpne bare kjølevæskelokket når det er så kaldt at du kan holde på det med bare hender. Løsne sakte til første stopp for å slippe ut trykket." },
        {
          type: "steps",
          title: "Girkasse-/hydraulikkolje",
          items: [
            "Sjekk med kald olje, helst om morgenen etter at traktoren har stått over natten.",
            "Traktoren vannrett, parkeringslås på.",
            "Senk underarmer, frontlaster, frontredskap og annet som tar olje fra girkassen.",
            "Nivået skal være mellom merkene i seglasset.",
          ],
        },
        {
          type: "steps",
          title: "Vann i drivstofffilteret",
          items: [
            "Åpne tappeskruen 3/4 omdreining. Stram den når vann og bunnfall har rent ut.",
            "Vri nøkkelen til første stilling så drivstoffpumpen går i ca. 120 sekunder.",
            "Var det vann i filteret: skru ut tappepluggen under tanken én omdreining med 1/2-tommers firkantnøkkel, tapp ut og stram med fingrene.",
          ],
        },
      ],
      sources: ["daily-engine-oil", "daily-coolant", "cooling-safely", "daily-trans-oil", "daily-fuel-filter"],
    },
  ],
  related: ["vedlikehold", "betjening", "feilsoking"],
};

export const vedlikehold: Page = {
  slug: "vedlikehold",
  title: "Vedlikehold",
  nav: "Vedlikehold",
  group: "Kontroll og vedlikehold",
  icon: "wrench",
  intro:
    "Oversikt over førerens vedlikehold og hva som skal gjøres av verksted. Intervallene gjelder normale forhold — vedlikehold oftere ved tøffe forhold. Før det du har gjort i manualens vedlikeholdslogg.",
  sections: [
    {
      id: "om",
      title: "Før du begynner",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Intervallene følger timetelleren. Hver 500. time piper det ved de fem neste startene.",
            "Senk alt redskap, stopp motoren, ta ut nøkkelen og koble fra batteriets jordkabel før arbeid på traktoren.",
            "Støtt traktoren med godkjente bukker — aldri bare på jekk.",
            "Monter alle vern igjen etter vedlikehold.",
            "Høytrykksvask: minst 1 m avstand, 45–90°, maks 120 bar og 50 °C. Ikke på kjølere, lagre og elektronikk. Smør alle smørepunkter etterpå.",
          ],
        },
        {
          type: "callout",
          kind: "merk",
          text: "Manualen beskriver oljeskift og filterbytte som eierens vedlikehold, men det krever verktøy og riktige væsker. Er du usikker, la verkstedet gjøre det.",
        },
      ],
      sources: ["service-intervals", "safe-maintenance", "park-safely", "pressure-washer", "greasing"],
    },
  ],
  related: ["daglig-kontroll", "spesifikasjoner", "feilsoking"],
};

export const sikkerhet: Page = {
  slug: "sikkerhet",
  title: "Sikkerhet",
  nav: "Sikkerhet",
  group: "Oversikt",
  icon: "shield",
  intro:
    "De vanligste traktorulykkene er velt, kollisjon med andre kjøretøy, feil start, å bli dratt inn i kraftuttaksaksler, fall fra traktoren og klemming ved tilkopling. Disse reglene står i manualens sikkerhetskapittel.",
  sections: [
    {
      id: "grunnregler",
      title: "Grunnregler",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Les manualen før du kjører. Kjør aldri trøtt, distrahert eller påvirket.",
            "Ingen skal være i nærheten av traktoren, redskapet eller arbeidsområdet når du starter og arbeider.",
            "Bruk setebelte. Ingen passasjerer — passasjersetet er bare for opplæring.",
            "Start bare fra førersetet, med kjøreretningshendelen i nøytral og parkeringslåsen på.",
            "Hold hender, føtter og klær unna drevne deler. Hold alle vern på plass.",
            "Gå aldri på eller av en traktor i bevegelse.",
            "Kjør aldri motoren i et lukket rom.",
          ],
        },
      ],
      sources: ["safe-operation", "riders", "runaway", "rotating-drivelines", "starting"],
    },
    {
      id: "forlate",
      title: "Før du går ut av traktoren",
      verification: "verifisert",
      blocks: [
        {
          type: "steps",
          items: [
            "Sett hydraulikkspakene i nøytral og slå av kraftuttaket.",
            "Senk redskaper til bakken.",
            "Legg inn parkeringslåsen.",
            "Stopp motoren. Ta ut nøkkelen hvis traktoren står uten tilsyn.",
          ],
        },
        { type: "callout", kind: "fare", text: "Et gir som står inne med motoren av hindrer IKKE traktoren i å rulle." },
      ],
      sources: ["safe-operation"],
    },
    {
      id: "trykk",
      title: "Olje under trykk",
      verification: "verifisert",
      blocks: [
        {
          type: "callout",
          kind: "fare",
          text:
            "Hydraulikkolje under trykk kan trenge inn i huden. Slipp ut trykket før du løsner noe. Let etter lekkasjer med en bit papp — aldri med hendene. Kommer olje inn i huden: oppsøk lege umiddelbart. Den må fjernes kirurgisk i løpet av få timer.",
        },
        { type: "p", text: "Akkumulatorer (bl.a. i forakselfjæringen) står under trykk. Prøv aldri å slippe ut trykket ved å løsne en kopling. Overlat dem til verksted." },
      ],
      sources: ["high-pressure", "accumulator-safely"],
    },
    {
      id: "velt",
      title: "Velt",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Unngå grøfter, hull og bratte kanter. Kjør aldri nær kanten av skrenter eller vann.",
            "Rygg ut av grøfter, gjørme og bratte bakker hvis mulig — å kjøre forover kan få traktoren til å velte bakover.",
            "Lav fart i bakker. Ikke start, stopp eller sving i bakke.",
            "Senk farten i svinger og med enkeltbremser.",
            "Løftet redskap gjør traktoren mindre stabil.",
            "Gjør aldri endringer på veltebøylen (ROPS).",
          ],
        },
      ],
      sources: ["slopes", "safe-operation", "rops"],
    },
    {
      id: "manualen",
      title: "Denne guiden erstatter ikke manualen",
      verification: "verifisert",
      blocks: [
        {
          type: "p",
          text:
            "Guiden er et opplæringshjelpemiddel basert på John Deere-manualen OMAL219620. Den erstatter ikke den offisielle manualen, obligatorisk opplæring eller fagkyndig service. Ved uenighet gjelder manualen og traktorens egne dekaler.",
        },
      ],
      sources: ["foreword"],
    },
  ],
  related: ["betjening", "daglig-kontroll"],
};
