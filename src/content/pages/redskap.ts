import type { Page } from "../types";

export const redskap: Page = {
  slug: "redskap",
  title: "Redskap: løft, kraftuttak og tilkopling",
  nav: "Redskap",
  group: "Betjening",
  icon: "link",
  intro:
    "Hvordan du kobler til og bruker redskap i trepunktsløftet og på kraftuttaket. At et redskap kan festes, betyr ikke at det passer traktoren — sjekk alltid redskapets manual.",
  sections: [
    {
      id: "kompatibilitet",
      title: "Passer redskapet traktoren?",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Les redskapets manual og dekaler før bruk. Det er førerens ansvar.",
            "Kategori i trepunktet: bakløftet er CAT 2 og 3N (6110M–6130M). Frontløftet (hvis montert) er CAT 3N.",
            "Kraftuttak bak: 540, 540/1000 eller 540/540E/1000 o/min (avhengig av versjon). Redskap på 540 o/min må ikke trenge mer enn 70 kW.",
            "Vekt: aksellast, dekkenes bæreevne og tillatt totalvekt må ikke overskrides. Ballaster riktig.",
            "Hydraulikk: koplinger må være ISO-standard. Redskap med lastfølende (LS) hydraulikk kobles til Power Beyond.",
            "Gjør en prøvemontering: kontroller at redskapet ikke treffer førerhuset eller andre deler i noen stilling (høyeste løftehøyde, skarpe svinger).",
          ],
        },
        {
          type: "table",
          caption: "Løftekraft bak (OECD), 6110M og 6120M",
          head: ["Løftesylinder", "Maks ved koplingspunkt", "Kontinuerlig 610 mm bak"],
          rows: [
            ["65 mm", "3964 kg", "2532 kg"],
            ["75 mm", "5278 kg", "3371 kg"],
          ],
        },
        { type: "callout", kind: "merk", text: "Hvilken løftesylinder traktoren har, må sjekkes. Lovens grenser for aksellast og dekk kan gjøre at du ikke kan bruke full løftekraft." },
      ],
      sources: ["attach-implements", "spec-hitch", "pto-options", "safe-operation"],
    },
    {
      id: "bakloft",
      title: "Bakre trepunktsløft",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Dybdekontroll (skala 0–9): trekk mot 0 = løft, skyv mot 9 = senk.",
            "Vippebryter: løft til høydebegrensningen / senk til innstilt dybde — for vendeteig.",
            "Hold senk-bryteren inne for raskere inntrengning på vendeteigen (bare mens traktoren kjører).",
            "Fjernstyring på skjermen: løft/senk fra utsiden, i redusert hastighet.",
          ],
        },
        {
          type: "table",
          caption: "Trekkraft- og posisjonsregulering",
          head: ["Innstilling", "Hva skjer"],
          rows: [
            ["0", "Posisjonsregulering: redskapet holdes i valgt høyde"],
            ["Mellom 0 og 5", "Blandet regulering"],
            ["5", "Maks trekkraftregulering: redskapet løftes når motstanden øker"],
          ],
        },
        {
          type: "table",
          caption: "Anbefalt trekkraftinnstilling",
          head: ["Redskap", "Innstilling"],
          rows: [
            ["Bærbar harv/kultivator", "4–5"],
            ["Bærbar plog", "3–5"],
            ["Halvbåren plog", "2–4"],
            ["Bærbar grubber", "2–4"],
            ["Undergrunnsløsner", "1–3"],
          ],
        },
        {
          type: "list",
          items: [
            "Flytstilling (redskap med støttehjul): drei trekkraftknappen mot klokka forbi 1 til stopp, og skyv dybdekontrollen helt frem.",
            "Senkehastighet: still slik at full senking tar minst 2 sekunder.",
            "Løftehastighet: stilles i displayet. Full løfting bør ta minst 5 sekunder.",
          ],
        },
        {
          type: "callout",
          kind: "fare",
          title: "Transportlås og demping",
          text:
            "Sett alltid transportlås/demping før du kjører med løftet redskap: med motoren i gang, skyv dybdekontrollen til 0 og så videre forbi 0 til stopp (hengelås-symbolet). Fjernstyring og motorstopp slår av dempingen.",
        },
        { type: "callout", kind: "advarsel", text: "Ingen skal være ved eller under redskapet når du løfter eller senker. Stå aldri mellom traktor og redskap uten at parkeringslåsen er på." },
      ],
      sources: ["rear-hitch-op", "rear-hitch-damping", "rear-hitch-drop", "rear-hitch-raise", "draft-depth", "attach-implements"],
    },
    {
      id: "koble-til",
      title: "Koble til et redskap i trepunktet",
      verification: "verifisert",
      blocks: [
        {
          type: "steps",
          items: [
            "Sett trekkraftreguleringen på 0 (posisjonsregulering), så løftet ikke beveger seg uventet.",
            "Rygg forsiktig inntil redskapet. Ingen skal stå mellom traktor og redskap.",
            "Legg inn parkeringslåsen og stopp motoren før du går ut.",
            "Fest underarmene. Med teleskop-underarmer: trekk dem ut bakover, fest redskapet og rygg til låsene smekker inn. Kjør litt frem for å kontrollere.",
            "Fest toppstaget og still lengden. Juster høyre løftestag for sidehelling.",
            "Sikre koplingskrokene mot å åpne seg (særlig ved skjev last, høy vegetasjon og skog).",
            "Lås stabilisatorstagene når underarmene er løftet.",
            "Gjør en prøveløfting og kontroller avstanden til førerhus og dekk.",
          ],
        },
      ],
      sources: ["attach-implements", "draft-depth", "rear-hitch-op"],
    },
    {
      id: "kraftuttak",
      title: "Kraftuttak (PTO)",
      verification: "avhenger",
      blocks: [
        {
          type: "table",
          caption: "Motorturtall for standard PTO-hastighet (6120M)",
          head: ["Kraftuttak", "PTO-turtall", "Motorturtall"],
          rows: [
            ["Bak 540/1000", "1000", "1962 o/min"],
            ["Bak 540/1000", "540", "1967 o/min"],
            ["Bak 540/540E/1000", "540E", "1496 o/min"],
            ["Bak 540 (kun 540)", "540", "1938 o/min"],
            ["Foran (ekstrautstyr)", "1000", "1969 o/min"],
          ],
        },
        {
          type: "steps",
          title: "Bruke bakre kraftuttak",
          items: [
            "Kontroller at PTO-hastigheten passer redskapet. Velg hastighet med spaken mens kraftuttaket er AV.",
            "Kontroller at alle vern er på plass.",
            "Slå av SoftShift (girkasseinnstilling) under PTO-arbeid.",
            "Pass på at ingen er i fareområdet.",
            "Slå på: trykk bryteren ned og deretter fremover. Slå av: trekk bryteren tilbake.",
          ],
        },
        {
          type: "list",
          items: [
            "Etter omstart går ikke kraftuttaket igjen av seg selv — slå det av og på igjen.",
            "Slå av kraftuttaket før du løfter redskapet.",
            "Fjernstyring på skjermen: kort trykk (under 4 sek) = prøvekjøring, langt trykk (ca. 4 sek) = kontinuerlig drift. Nødblink og lydsignal varsler.",
          ],
        },
        {
          type: "callout",
          kind: "fare",
          title: "Roterende aksler",
          text:
            "Å bli dratt inn i en roterende aksel kan gi alvorlig skade eller død. Hold alle vern på plass, bruk tettsittende klær, og stopp motoren før du kobler til, justerer eller rengjør. Redskapet kan fortsette å rotere etter at kraftuttaket er slått av — gå ikke nær før alt har stoppet.",
        },
        {
          type: "callout",
          kind: "advarsel",
          text: "Bruk aldri en adapter som lar et 1000-uttak drive et 540-redskap fortere enn 540 o/min.",
        },
      ],
      sources: ["rear-pto-engage", "rear-pto-speed", "spec-engine", "pto-options", "rotating-drivelines"],
    },
    {
      id: "trekk",
      title: "Trekkstang og slep",
      verification: "verifisert",
      blocks: [
        {
          type: "list",
          items: [
            "Koble tauet last bare til godkjente koplinger — ellers kan traktoren velte bakover.",
            "Maks slepevekt for redskap med eget understell (CAT II, 6095–6130M): 10 000 kg. Lavere verdier i spesifikasjonene gjelder foran.",
            "Bruk sikkerhetskjetting med styrke minst lik redskapets totalvekt. Kjettingen er for transport, ikke for slep.",
            "Kontroller tilhengerens bremser før kjøring.",
          ],
        },
        {
          type: "table",
          caption: "Maks statisk vertikallast på trekkstang (6120M)",
          head: ["Trekkstang", "Utrekk", "Vei (≤ 40 km/t)", "Felt"],
          rows: [
            ["Standard", "250 mm", "2000 kg", "2000 kg"],
            ["Standard", "350 mm", "—", "1400 kg"],
            ["Standard", "400 mm", "—", "1200 kg"],
            ["Kraftig (heavy-duty)", "250 mm", "3000 kg", "3000 kg"],
            ["Kraftig (heavy-duty)", "350 mm", "—", "1800 kg"],
            ["Kraftig (heavy-duty)", "400 mm", "—", "1600 kg"],
          ],
        },
      ],
      sources: ["safe-operation", "rear-hitch-load", "safety-chain", "spec-weights"],
    },
    {
      id: "frontredskap",
      title: "Frontredskap",
      verification: "avhenger",
      blocks: [
        {
          type: "p",
          text: "Frontløft, frontkoplinger og frontlasteruttak er forklart på Hydraulikk-siden. Frontkraftuttak (1000 o/min, mot klokka, maks 80 kW) er ekstrautstyr.",
        },
        {
          type: "list",
          items: [
            "Traktoren blir lengre foran. Vær ekstra forsiktig i kryss og ved utkjøring. Be om hjelp hvis du er i tvil.",
            "Lys og blinklys kan bli dekket. Bruk da ekstra lys.",
            "Senk frontredskapet når du forlater traktoren.",
            "Fell opp og lås løftearmene på frontløftet når det ikke brukes.",
          ],
        },
      ],
      sources: ["front-hitch-economy", "front-pto"],
    },
  ],
  related: ["snoutstyr", "hydraulikk", "veitransport", "spesifikasjoner"],
};
