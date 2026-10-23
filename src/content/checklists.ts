import type { Checklist } from "./types";

export const CHECKLISTS: Record<string, Checklist> = {
  daglig: {
    id: "daglig",
    title: "Daglig kontroll (hver dag / hver 10. time)",
    intro:
      "Gjør kontrollen før første start for dagen. Punktene er hentet fra manualens «Service / Daily or Every 10 Hours» og «Prestarting Checks».",
    groups: [
      {
        title: "Gå rundt traktoren",
        condition: "Motoren AV, parkeringslås PÅ, traktoren står vannrett. Redskaper senket.",
        items: [
          { text: "Dekk og hjul: synlige skader, lavt dekktrykk, løse hjulbolter.", source: "general-condition" },
          { text: "Lekkasjer: se under traktoren og ved motor, girkasse og aksler. Ingen oljeflekker eller dryppende koplinger.", source: "general-condition" },
          { text: "Hydraulikkslanger og koplinger: knekk, gnag, sprekker, bobler, fuktige koplinger. Bruk papp — aldri hendene.", source: "high-pressure" },
          { text: "Vern og skjermer er på plass. Advarselsdekaler er lesbare.", source: "general-condition" },
          { text: "Ikke brennbart materiale (halm, støv, fett) ved motor og eksos.", source: "general-condition" },
          { text: "Redskap og tilkoplinger: låst, sikret, ingen løse deler.", source: "attach-implements" },
        ],
      },
      {
        title: "Væsker",
        condition: "Motoren AV og KALD (eller AV i ca. 40 minutter etter kjøring). Traktoren vannrett.",
        items: [
          { text: "Motorolje: innenfor det skraverte feltet på peilestaven. Start IKKE motoren hvis nivået er under nedre merke.", source: "daily-engine-oil" },
          { text: "Kjølevæske: nær MAX, aldri under MIN (kald motor). Åpne aldri lokket på varm motor.", source: "daily-coolant" },
          { text: "Girkasse-/hydraulikkolje: mellom merkene i seglasset. Kald olje, løft og frontredskap senket.", source: "daily-trans-oil" },
          { text: "Drivstofffilter: tapp ut vann og bunnfall hvis det er synlig (skru ut tappeskruen 3/4 omdreining).", source: "daily-fuel-filter" },
          { text: "Lekkoljebeholdere (hvis montert): tøm ved behov.", source: "all-service-tasks" },
          { text: "Drivstoff og AdBlue (DEF): fyll ved behov. Aldri AdBlue på dieseltanken, eller diesel på AdBlue-tanken.", source: "def-fill" },
        ],
      },
      {
        title: "Kjøling og renhold",
        condition: "Motoren AV og avkjølt.",
        items: [
          { text: "Rengjør radiator, kondensator, girkasseoljekjøler og området rundt motoren. Fjern rusk fra skjermene.", source: "daily-radiator" },
          { text: "Se etter skitt på bimetallfjæren til viskovifta (bruk speil).", source: "daily-radiator" },
        ],
      },
      {
        title: "Fra førersetet",
        condition: "Sitt i førersetet. Trå bremsene før du starter.",
        items: [
          { text: "Bremser: trå ned pedalen(e) før start. De skal ikke gå helt i bunn, selv med stor kraft. Vent 30 sek før ny prøve. Går de i bunn: kontakt forhandler.", source: "daily-brakes" },
          { text: "Etter start: lampetest — lampene for montert utstyr lyser kort. Ingen STOP- eller CAUTION-lys etterpå.", source: "instrument-panel" },
          { text: "Lys: kontroller at alle lys virker, særlig før offentlig vei.", source: "daily-lights" },
          { text: "Styring: kjenn etter at rattet oppfører seg normalt med motoren i gang. (Ikke et eget punkt i manualens daglige kontroll — generell sjekk. Unormal styring: kontakt forhandler.)" },
          { text: "Setebelte: helt og virker.", source: "seat-belt" },
        ],
      },
      {
        title: "Ved vått og gjørmete arbeid",
        condition: "Motoren AV, parkeringslås PÅ, løft og frontlaster senket.",
        items: [
          { text: "Smør alle smørepunktene (front- og bakløft, foraksel og universalledd, fjæringssylinder, førerhusfjæring, svingbare skjermer).", source: "lubrication-points" },
        ],
      },
    ],
  },
  manedlig: {
    id: "manedlig",
    title: "Månedlig kontroll (guidens forslag)",
    intro:
      "Manualen regner intervaller i driftstimer, ikke måneder. Denne listen samler punkter som manualen ber deg gjøre «jevnlig», minst én gang i året eller oftere ved tøffe forhold, slik at de blir gjort én gang i måneden. Den erstatter ikke daglig kontroll eller 500-timersservicen.",
    groups: [
      {
        title: "Smøring",
        condition: "Motoren AV, parkeringslås PÅ. Front- og bakløft senket helt, frontlaster senket (hvis montert).",
        items: [
          { text: "Rengjør smøreniplene før du setter på fettpressen. Bytt nipler som er skadet. (Generelt råd. Manualen sier dette uttrykkelig bare for en annen forakseltype.)" },
          { text: "Bakløft: smør smørepunktene på løftet, løftearmsblokken og stabilisatorene (se figurene i manualen). Press inn fett til gammelt fett, skitt eller vann kommer ut.", source: "greasing" },
          { text: "Bakakselens lagre: bare 6–8 slag med fettpressen per lager. Ikke press til fett kommer ut.", source: "rear-axle-bearings" },
          { text: "Fjæret foraksel: smør kardangleddene og hydraulikksylinderen.", source: "lubrication-points" },
          { text: "Kardangaksel mellom motor og girkasse (hvis montert).", source: "lubrication-points" },
          { text: "Hydraulisk førerhusfjæring: smør sylinderen. Gjelder ikke mekanisk førerhusfjæring.", source: "lubrication-points" },
          { text: "Trekkfeste, pick-up hitch og frontløft: smør det som er montert.", source: "lubrication-points" },
          { text: "Tørk bort overflødig fett, og kast det etter lokale regler.", source: "greasing" },
        ],
      },
      {
        title: "Dekk og hjul",
        condition: "Kalde dekk, traktoren står på fast underlag.",
        items: [
          { text: "Mål dekktrykket med en nøyaktig måler (inndeling 0,1 bar). Har dekkene væskeballast, bruk en egen luft/vann-måler med ventilen nederst.", source: "tire-pressure-guidelines" },
          { text: "Sammenlign med trykket du har fått fra forhandler eller dekkprodusent. Største tillatte trykk står på dekksiden. Trykk under 0,8 bar må sjekkes ofte.", source: "tire-pressures" },
          { text: "Dekkene er i god stand: se etter kutt, sprekker og unormal slitasje.", source: "general-condition" },
        ],
      },
      {
        title: "Grundig rundgang",
        condition: "Motoren AV og avkjølt. Bruk lommelykt.",
        items: [
          { text: "Hydraulikkslanger: se nøye etter lekkasje, knekk, kutt, gnag, bobler, rust og synlig vev. Skadde slanger byttes straks. Bruk papp, aldri hendene.", source: "hoses-inspect" },
          { text: "Elektriske ledninger og jordforbindelser er i god stand.", source: "general-condition" },
          { text: "Advarselsdekaler er på plass og lesbare. Vern og skjermer sitter som de skal.", source: "general-condition" },
          { text: "Trekkstang og bolter: se etter synlig slitasje. Måling mot slitasjegrensene hører til 500-timersservicen.", source: "drawbar-wear" },
        ],
      },
      {
        title: "Førerhus",
        condition: "Motoren på tomgang for klimaanlegget, ellers AV.",
        items: [
          { text: "Kjør klimaanlegget noen minutter. Manualen ber om dette én gang i måneden, for å blande kuldemedium og olje og forebygge feil.", source: "aircon" },
          { text: "Setebelte: se etter løse fester, kutt, frynser, uvanlig slitasje, misfarging eller blank overflate på beltet. Sjekk også låsen og opprullingen. Ved skade byttes hele beltet hos forhandler.", source: "seat-belt-inspect" },
        ],
      },
      {
        title: "Timer og logg",
        condition: "Tenning PÅ.",
        items: [
          { text: "Les av timetelleren, og se på vedlikeholdssiden hva som forfaller snart. Ved hver 500. time gir traktoren et lydsignal ved de fem neste startene.", source: "service-intervals" },
          { text: "Skriv ned dato, timer og hva som ble gjort i vedlikeholdsloggen.", source: "observe-intervals" },
        ],
      },
    ],
  },
  snoutstyr: {
    id: "snoutstyr",
    title: "Før snørydding",
    intro: "Punktene er hentet fra Tokvams bruksanvisninger for VT City og THS og fra John Deere-manualen. Hopp over redskapet du ikke bruker i dag.",
    groups: [
      {
        title: "Vikeplog VT 280 City",
        condition: "Plogen står på bakken. Motoren AV, parkeringslås PÅ.",
        items: [
          { text: "Hydraulikkslanger: ingen lekkasjer eller brudd.", source: "vt-safety" },
          { text: "Sliteskjær: ikke slitt for langt.", source: "vt-safety" },
          { text: "Ingen skader på konstruksjonen, særlig ved skjærholderen og rundt kingbolten.", source: "vt-safety" },
          { text: "Sikkerhetsutstyret er på plass.", source: "vt-safety" },
          { text: "Koblingsboltene er låst. Strøm og hydraulikk er koblet til.", source: "vt-connect" },
          { text: "Med motoren i gang: kjør alle bevegelser noen ganger. Ingen står ved plogen.", source: "vt-connect" },
        ],
      },
      {
        title: "Snøfreser 240 THS",
        condition: "Motoren AV og nøkkelen ute.",
        items: [
          { text: "Boltene i underarmer og toppstag sitter godt.", source: "ths-connect" },
          { text: "Slangene til tutsvingen er tette og hele.", source: "ths-connect" },
          { text: "Kraftoverføringsakselen: vernet er helt, og kjettingene er festet i begge ender. Akselen går rundt for hånd uten å ta borti noe.", source: "ths-connect" },
          { text: "Alle deksler er på: tutvern, kjededeksler og dekselet over brytebolten (nede).", source: "ths-safety" },
          { text: "Freseren står vannrett, og vekten ligger på skiene bak.", source: "ths-use" },
          { text: "Kjeder og knutekryss er smurt (hver 10. time).", source: "ths-service" },
          { text: "Reservebrytebolter (M8×45, 8.8, med låsemutter) og en spade eller stake ligger i traktoren.", source: "ths-shear" },
        ],
      },
      {
        title: "Traktoren",
        condition: "Før du kjører ut.",
        items: [
          { text: "Daglig kontroll er gjort.", source: "prestart" },
          { text: "540 o/min er valgt på PTO-spaken (kraftuttaket AV). SoftShift er av.", source: "rear-pto-engage" },
          { text: "Ballast og aksellaster er riktige for redskapene som sitter på.", source: "ballast-selection" },
          { text: "Lys og blinklys er ikke dekket av plog eller freser.", source: "drive-roads" },
        ],
      },
    ],
  },
  sikt: {
    id: "sikt",
    title: "Lys og sikt",
    groups: [
      {
        title: "Lys",
        condition: "Tenning PÅ (motoren kan gå). Gå rundt traktoren, eller få hjelp.",
        items: [
          { text: "Parkeringslys foran og bak (lysbryter stilling 2).", source: "light-switch-cab" },
          { text: "Nærlys og fjernlys (stilling 3 + bryter B). Blå lampe ved fjernlys.", source: "light-switch-cab" },
          { text: "Blinklys venstre og høyre, foran og bak. Normal blinkfrekvens.", source: "turn-horn-cab" },
          { text: "Nødblink.", source: "hazard-lights" },
          { text: "Bremselys (få noen til å se mens du bremser).", source: "lights-overview" },
          { text: "Tilhengerlys via 7-polet kontakt, hvis tilhenger.", source: "trailer-socket" },
          { text: "Noter hvilke arbeidslys traktoren har (hjørner, tak foran/bak, skjermer, frontlaster).", source: "worklight-switches-cab" },
        ],
      },
      {
        title: "Sikt",
        condition: "Traktoren står stille.",
        items: [
          { text: "Rene vinduer, ingen dugg (bruk avfukting ved behov).", source: "aircon" },
          { text: "Speil rene og justert.", source: "drive-roads" },
          { text: "Viskere og spylervæske virker (frostvæske om vinteren).", source: "wiper" },
          { text: "Lykter og refleks rene. Ingen redskap dekker lysene — ellers ekstra lys.", source: "drive-roads" },
        ],
      },
    ],
  },
  veitransport: {
    id: "veitransport",
    title: "Før offentlig vei",
    groups: [
      {
        title: "Traktoren",
        condition: "Før du kjører ut på veien.",
        items: [
          { text: "Bremsepedalene koblet sammen med pedallåsen.", source: "service-brakes" },
          { text: "Tråkk lett på bremsen for å sikre at differensialsperren ikke står inne.", source: "drive-roads" },
          { text: "Firehjulstrekk koblet ut ved transport (bremseassistanse ved bremsing er automatisk).", source: "drive-roads" },
          { text: "Dekk og skjermer fri for gjørme.", source: "drive-roads" },
          { text: "Lys, blinklys og baklys kontrollert. Nødblink på.", source: "drive-roads" },
          { text: "Arbeidslys AV.", source: "worklight-switches-cab" },
          { text: "Speil justert, vinduer rene.", source: "drive-roads" },
          { text: "Setebeltet på.", source: "drive-roads" },
          { text: "Bruk gasspedal, ikke håndgass.", source: "drive-roads" },
          { text: "Riktig ballast.", source: "drive-roads" },
        ],
      },
      {
        title: "Hydraulikk og redskap",
        condition: "Før du kjører ut på veien.",
        items: [
          { text: "SCV-spakene i nøytral og låst (transportlås).", source: "scv-transport-lock" },
          { text: "Multifunksjonsspak/joystick låst.", source: "drive-roads" },
          { text: "Bakløft i transportlås/demping (dybdekontroll forbi 0 til hengelås).", source: "rear-hitch-load" },
          { text: "Frontløft: stengeventil i transportstilling (A). Løftearmer felt opp hvis ikke i bruk.", source: "front-hitch-economy" },
          { text: "Redskap løftet høyt nok over veien — men underarmer ikke høyere enn vannrett.", source: "rear-hitch-load" },
          { text: "Koplingskroker sikret mot å åpne seg.", source: "rear-hitch-load" },
          { text: "Sikkerhetskjetting på tauet redskap. Tilhengerbremser kontrollert.", source: "safety-chain" },
          { text: "Redskapets største transporthastighet kjent.", source: "tow-speeds" },
          { text: "Kraftuttak AV.", source: "safe-operation" },
        ],
      },
      {
        title: "Lovkrav (sjekk selv)",
        condition: "Norsk regelverk og vognkort.",
        items: [
          { text: "Største tillatte hastighet for kombinasjonen ifølge vognkort og regelverk." },
          { text: "Lys- og merkekrav for traktor og redskap (bredde, lengde, varsellys)." },
          { text: "Aksellast, totalvekt og tilhengervekt innenfor det tillatte." },
        ],
      },
    ],
  },
};
