import type { Page } from "../types";

export const hydraulikk: Page = {
  slug: "hydraulikk",
  title: "Hydraulikk og fronthydraulikk",
  nav: "Hydraulikk",
  group: "Systemer",
  icon: "droplets",
  intro:
    "Hydraulikken bruker oljetrykk fra en pumpe til å bevege sylindre og drive motorer på redskap. Den deler olje med girkassen. Her er bakre uttak, fronthydraulikk og spakene forklart hver for seg.",
  sections: [
    {
      id: "prinsipp",
      title: "Slik virker hydraulikken",
      verification: "verifisert",
      blocks: [
        { type: "diagram", id: "hydraulic-flow", caption: "Fra pumpe via ventil (spak) og kopling til sylinder — og tilbake til girkassen." },
        {
          type: "list",
          items: [
            "Pumpen lager oljestrøm når motoren går. Oljen tas fra girkassen (felles girkasse-/hydraulikkolje).",
            "En ventil (SCV = Selective Control Valve, «hydraulikkuttak») styres av en spak i førerhuset og sender oljen til den ene eller andre koplingen.",
            "Slangene fra redskapet kobles i hurtigkoplingene. Oljen trykker sylinderen ut eller inn.",
            "Systemet er lastfølende (Load Sensing): trykket tilpasses det redskapet trenger.",
          ],
        },
        {
          type: "table",
          caption: "Hydraulikksystem (6110M–6145M) — avhenger av utstyr",
          head: ["", "LS-system", "PFC-system"],
          rows: [
            ["Pumpe", "Tannhjulspumpe 35 cm³", "Aksialstempelpumpe 45 cm³"],
            ["Oljemengde ved merketurtall", "80 l/min", "114 l/min"],
            ["Systemtrykk", "—", "41 bar standby, maks 205 bar"],
          ],
        },
        {
          type: "callout",
          kind: "merk",
          text:
            "Manualen oppgir 35 cm³-pumpen som bare for traktorer med åpen førerplass. Traktorer med førerhus har derfor trolig PFC-systemet med 45 cm³-pumpe, men det må bekreftes. SCV-ene kan være 200- eller 450-serien.",
        },
      ],
      sources: ["spec-hydraulics", "scv-oil-withdrawal"],
    },
    {
      id: "oversikt",
      title: "Hva er hva? Fem ting som ofte blandes",
      verification: "avhenger",
      blocks: [
        { type: "diagram", id: "front-hydraulics", caption: "Bak og foran: koplinger, løft og kraftuttak er forskjellige systemer." },
        {
          type: "table",
          head: ["System", "Hva det er", "Styres med", "Status for denne traktoren"],
          rows: [
            ["Bakre hydraulikkuttak (SCV I–III)", "Hurtigkoplinger bak for slanger fra redskap", "SCV-spakene på høyre konsoll", "Standard — antall uttak må sjekkes"],
            ["Frontkoplinger", "Hurtigkoplinger foran (på frontløftet) for slanger fra frontredskap", "SCV II (med Economy frontlift)", "Avhenger av utstyr"],
            ["Economy frontlift (frontløft)", "Trepunktsløft foran som løfter frontredskap", "SCV I + stengeventil foran", "Avhenger av utstyr — bekreft"],
            ["Hydraulikkuttak for frontlaster", "Koplinger foran og/eller under høyre trinn", "Multifunksjonsspaken (joystick)", "Avhenger av utstyr — bekreft"],
            ["Frontkraftuttak (front-PTO)", "Roterende aksel foran, 1000 o/min — IKKE hydraulikk", "Egen PTO-bryter", "Ekstrautstyr — ikke oppgitt"],
          ],
        },
        {
          type: "callout",
          kind: "usikker",
          title: "Hva betyr «fronthydraulikk» på din traktor?",
          text:
            "«Fronthydraulikk» kan bety frontkoplinger, frontløft, eller uttak for frontlaster. De styres forskjellig. Se foran på traktoren: Finnes det et trepunktsløft med stengeventil? Hurtigkoplinger på løftet? Koplinger under høyre trinn? En joystick i førerhuset? Følg bare avsnittene som passer det du finner.",
        },
      ],
      sources: ["scv-levers", "front-hitch-economy", "scv-front-hitch-hoses", "mfl-front-loader", "pto-options"],
    },
    {
      id: "scv",
      title: "Hydraulikkspakene (SCV)",
      verification: "verifisert",
      blocks: [
        { type: "diagram", id: "scv-positions", caption: "De fire stillingene på en SCV-spak." },
        {
          type: "table",
          head: ["Stilling", "Hva skjer"],
          rows: [
            ["Ut (låst stilling)", "Sylinderen går helt ut. Spaken går tilbake til nøytral når sylinderen er ute (med låsefunksjon)."],
            ["Mellom nøytral og ut", "Sylinderen går sakte ut. Jo lengre, desto raskere. Slipp = nøytral."],
            ["Nøytral", "Sylinderen holdes i stillingen."],
            ["Mellom nøytral og inn", "Sylinderen går sakte inn."],
            ["Inn (låst stilling)", "Sylinderen går helt inn."],
            ["Flyt (forbi inn)", "Sylinderen beveger seg fritt — redskapet følger bakken."],
          ],
        },
        {
          type: "list",
          items: [
            "Fargekoder bak: SCV I = grønn, SCV II = blå, SCV III = brun.",
            "Bak: utkopling (ut) = nederste kopling, innkopling (inn) = øverste kopling.",
            "Enkeltvirkende sylinder kobles i nederste kopling (ut).",
            "Mengderegulering: still slik at full bevegelse tar mer enn 1,5 sekunder. Raskere kan gi skade.",
            "Fabrikkinnstilt utløsning (450-serien): 180 bar.",
          ],
        },
        {
          type: "callout",
          kind: "advarsel",
          title: "Transportlås",
          text:
            "Lås SCV-spakene i nøytral med låsespakene når du kjører på vei, og alltid når de ikke brukes. Utilsiktet bevegelse av redskap kan gi dødsulykker.",
        },
      ],
      sources: ["scv-levers", "scv-transport-lock", "scv-raise-rate", "scv-connect", "spec-hydraulics"],
    },
    {
      id: "koble-til",
      title: "Koble til hydraulikkslanger",
      verification: "verifisert",
      blocks: [
        {
          type: "steps",
          items: [
            "Stopp motoren og legg inn parkeringslåsen.",
            "Sett SCV-spakene i nøytral og lås dem. Lås multifunksjonsspaken med låseringen (hvis montert).",
            "Rengjør støvhettene og slangene. Smuss skader hydraulikken.",
            "Vri støvhettene til side.",
            "Sjekk symbolene på koplingene (ut/inn) mot hvordan sylinderen skal bevege seg.",
            "Skyv slangene godt inn i koplingene.",
          ],
        },
        {
          type: "callout",
          kind: "advarsel",
          text: "Koble slangene riktig. Er de byttet om, går sylinderen motsatt vei av det du forventer.",
        },
        {
          type: "callout",
          kind: "viktig",
          text: "Ikke bruk damp eller høytrykksspyler nær koplingene og elektronikken. Ved over 69 bar: hold minst 20 cm avstand.",
        },
      ],
      sources: ["scv-connect", "scv-levers"],
    },
    {
      id: "koble-fra",
      title: "Koble fra og slippe ut trykk",
      verification: "verifisert",
      blocks: [
        {
          type: "steps",
          items: [
            "Senk redskapet til bakken.",
            "Stopp motoren og legg inn parkeringslåsen.",
            "Flytt SCV-spakene flere ganger til ut og inn (tenningen må være på bare for elektriske ventiler). Det slipper ut trykket.",
            "Lås spakene i nøytral.",
            "Trekk slangene rett ut — ikke rykk eller vri.",
            "Sett på støvhettene.",
          ],
        },
        {
          type: "p",
          text:
            "Manualen beskriver også å slippe ut trykk ved å sette spaken i flytstilling noen sekunder med motoren i gang (før du stopper motoren). Det gjelder særlig hvis slangene er vanskelige å få ut.",
        },
        {
          type: "callout",
          kind: "fare",
          title: "Olje under høyt trykk",
          text:
            "Olje som spruter ut under trykk kan trenge inn i huden og gi alvorlig skade. Slipp ut trykket før du løsner noe. Let aldri etter lekkasjer med hendene — bruk en bit papp. Kommer olje inn i huden: oppsøk lege umiddelbart. Den må fjernes kirurgisk i løpet av få timer.",
        },
      ],
      sources: ["scv-disconnect", "scv-levers", "high-pressure"],
    },
    {
      id: "frontlift",
      title: "Economy frontlift (hvis montert)",
      verification: "avhenger",
      blocks: [
        {
          type: "p",
          text: "Economy frontlift er et trepunktsløft foran. Det løftes og senkes med SCV I-spaken. En stengeventil foran bestemmer om oljen går til frontløftet.",
        },
        {
          type: "table",
          caption: "Stengeventilens stillinger",
          head: ["Stilling", "Betydning", "Versjon 1", "Versjon 2"],
          rows: [
            ["A", "Transport — oljen er stengt, ingen løft eller senk", "Ja", "Ja"],
            ["B", "Enkeltvirkende: løft med trykk, senk uten trykk", "Ja", "—"],
            ["C", "Dobbeltvirkende: løft og senk med trykk", "Ja", "Ja"],
          ],
        },
        {
          type: "list",
          items: [
            "Senkeregulering (drop restrictor): fabrikkinnstilt til ca. 5–6 sekunder (fire omdreininger åpen). Kan stilles fra helt åpen til helt stengt (maks 10 omdreininger).",
            "Løftekraft (OECD) ved koplingspunktene: maks 4000 kg, kontinuerlig 3300 kg. Kategori 3N.",
            "Når frontløftet ikke brukes: fell opp løftearmene (transportstilling) og lås dem.",
          ],
        },
        {
          type: "callout",
          kind: "advarsel",
          text:
            "Bruk SCV I til frontløftet bare når stengeventilen er åpen og ingenting annet er koblet til SCV I. Bruk SCV I bak bare med stengeventilen stengt. SCV I og II må aldri brukes til to ting samtidig.",
        },
        {
          type: "callout",
          kind: "advarsel",
          text:
            "Et frontredskap endrer kjøreegenskapene og gjør traktoren lengre foran. Senk alltid frontredskapet når du forlater traktoren. Lys og blinklys kan bli dekket — bruk da ekstra lys.",
        },
      ],
      sources: ["front-hitch-economy", "front-hitch-economy-controls", "scv-levers", "spec-hitch"],
    },
    {
      id: "frontkoplinger",
      title: "Frontkoplinger (hvis montert)",
      verification: "avhenger",
      blocks: [
        {
          type: "p",
          text:
            "Med Economy frontlift finnes hurtigkoplinger foran som får olje fra SCV II. Venstre kopling = ut, høyre kopling = inn. Koplingene kan bare kobles når det ikke er trykk.",
        },
        {
          type: "steps",
          title: "Koble til foran",
          items: [
            "Senk frontredskapet til bakken. Stopp motoren og legg inn parkeringslåsen.",
            "Lås SCV-spakene og multifunksjonsspaken.",
            "Lås stengeventilen på frontløftet.",
            "Rengjør støvhetter og plugger, og åpne dem.",
            "Skyv slangene godt inn: venstre = ut, høyre = inn.",
          ],
        },
        {
          type: "steps",
          title: "Koble fra foran",
          items: [
            "Legg inn parkeringslåsen og senk redskapet.",
            "Sett SCV-ene i flytstilling noen sekunder med motoren i gang.",
            "Stopp motoren. Lås spakene og stengeventilen.",
            "Trekk slangene rett ut og lukk støvhettene.",
          ],
        },
        {
          type: "callout",
          kind: "advarsel",
          text: "Når et frontredskap er koblet til frontkoplingene, skal ingenting annet være koblet til SCV II.",
        },
        {
          type: "p",
          text:
            "Foran finnes også en 7-polet stikkontakt (lys), ISOBUS-kontakt og 3-polet strømuttak (maks 25 A) for frontredskap. Maks trykk i systemet foran er oppgitt til 200 bar.",
        },
      ],
      sources: ["scv-front-hitch-hoses", "front-hitch-economy", "scv-levers"],
    },
    {
      id: "multifunksjonsspak",
      title: "Uttak for frontlaster og multifunksjonsspaken",
      verification: "avhenger",
      blocks: [
        {
          type: "p",
          text:
            "Hydraulikkuttak foran og/eller under høyre trinn styres med multifunksjonsspaken (joystick). Den kan styre to funksjoner samtidig — typisk løft/senk og tipp på en frontlaster.",
        },
        {
          type: "table",
          caption: "Spakens grunnfunksjoner med frontlaster",
          head: ["Bevegelse", "Funksjon"],
          rows: [
            ["Drei låseringen mot høyre / venstre", "Lås / lås opp"],
            ["Spaken bakover", "Løft frontlaster"],
            ["Spaken forover til motstand", "Senk frontlaster"],
            ["Spaken forover forbi motstand", "Flytstilling"],
            ["Spaken til venstre", "Tilbaketipp (skuffen opp)"],
            ["Spaken til høyre", "Tømme (skuffen ned)"],
          ],
        },
        {
          type: "list",
          items: [
            "Vippebryteren på spaken styrer en tredje funksjon.",
            "Knappene for omkoblingsventil 1 og 2 styrer ekstra funksjoner på frontredskap.",
            "Frontlasterdemping slås på med en egen knapp (LED lyser). Den er alltid av etter motorstart.",
            "Girknappene på spaken skifter gir.",
          ],
        },
        { type: "callout", kind: "fare", text: "Lås alltid multifunksjonsspaken når frontlasteren ikke brukes. Ellers kan den utløses ved et uhell under kjøring." },
        { type: "callout", kind: "merk", text: "Se frontlasterens egen manual for bruk og ballast. Bruk aldri iTEC™ sammen med frontlaster." },
      ],
      sources: ["mfl-front-loader", "mfl-dampening-controls", "scv-front-hitch-hoses", "starting", "itec-controls"],
    },
    {
      id: "frontpto",
      title: "Frontkraftuttak er ikke hydraulikk",
      verification: "avhenger",
      blocks: [
        {
          type: "p",
          text:
            "Et frontkraftuttak er en roterende aksel som driver redskap mekanisk, på samme måte som det bakre kraftuttaket. Det har egen bryter og egen olje. Det er ekstrautstyr og ikke oppgitt for denne traktoren.",
        },
        {
          type: "list",
          items: [
            "Roterer mot klokka, 1000 o/min (motor 1969 o/min), 6-rillet aksel.",
            "Redskap foran må ikke kreve mer enn 80 kW.",
          ],
        },
      ],
      sources: ["front-pto", "pto-options", "spec-engine"],
    },
    {
      id: "oljeuttak",
      title: "Hvor mye olje kan redskapet ta?",
      verification: "verifisert",
      blocks: [
        {
          type: "p",
          text:
            "Store sylindre (for eksempel tippvogner) tar olje fra girkassen. Største tillatte uttak er 15 liter (27 liter med ekstra oljetank, bare stillestående). Det forutsetter maks oljenivå med motoren av, at traktoren ikke heller mer enn 3°, varm olje, og fart under 3 km/t.",
        },
        {
          type: "callout",
          kind: "viktig",
          text:
            "Kjør aldri tungt (slep, PTO, høy fart) hvis oljenivået i seglasset faller under minimumsmerket. Står nivået over maks, kjør ikke transport over 40 km/t.",
        },
        { type: "p", text: "Bruker du hydraulikk til eksternt utstyr, skal girkasse-/hydraulikkoljen sjekkes hver dag." },
      ],
      sources: ["scv-oil-withdrawal", "prestart"],
    },
    {
      id: "lekkasjer",
      title: "Lekkasjer og slanger",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Kontroller slangene minst én gang i året for lekkasje, knekk, kutt, sprekker, gnag, bobler, korrosjon og synlig armering.",
            "Bytt slitte eller skadde slanger med en gang (fra forhandler).",
            "Se etter oljeflekker under traktoren og fuktige koplinger.",
            "Hold koplinger og støvhetter rene.",
          ],
        },
        { type: "callout", kind: "fare", text: "Let aldri etter lekkasjer med hendene. Bruk en bit papp. Løsne aldri en kopling som står under trykk." },
        {
          type: "p",
          text:
            "Bytte av slanger, innstilling av utløsningstrykk og arbeid på akkumulatorer bør overlates til verksted. Akkumulatorer kan ikke repareres, og trykket skal aldri slippes ut ved å løsne en kopling.",
        },
      ],
      sources: ["hoses-inspect", "high-pressure", "accumulator-safely", "general-condition"],
    },
    {
      id: "virker-ikke",
      title: "Når en hydraulikkfunksjon ikke reagerer",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Er spaken låst (transportlås eller SCV-låseknapp)?",
            "Er slangene riktig og helt koblet inn?",
            "Er det nok olje i girkassen (seglasset)?",
            "Er stengeventilen på frontløftet i riktig stilling?",
            "Gått sikring? Sjekk sikringene.",
            "Lyser varsel for tett filter? Filteret må byttes.",
          ],
        },
        { type: "p", text: "Se Feilsøking for flere symptomer, og kontakt forhandler hvis feilen ikke er en av disse." },
      ],
      sources: ["ts-hydraulic", "ts-scv"],
    },
  ],
  related: ["redskap", "forerhus", "feilsoking"],
};
