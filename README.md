# John Deere 6120M – interaktiv førerguide

En nettbasert opplæringsressurs på norsk bokmål for en John Deere 6120M. Guiden har en 3D-modell, en førerhusutforsker, veiledninger, sjekklister, feilsøking og vedlikeholdsoversikt. Alt innhold har henvisning til operatørmanualen **OMAL219620 (utgave 19)**:
<http://manuals.deere.com/omview/OMAL219620_19/toc.html>

> Guiden er uavhengig og er ikke tilknyttet eller godkjent av Deere & Company. Den erstatter ikke den offisielle manualen, obligatorisk opplæring eller fagkyndig service. Manualteksten er © Deere & Company og er ikke gjengitt her. Guiden har egne formuleringer, egne skisser og lenker til de aktuelle manualsidene.

## Konfigurasjon guiden er skrevet for

Eieren har bekreftet utstyret nedenfor. Det vises med merket «Bekreftet av eier» i appen.

| Utstyr | Status |
|---|---|
| 6120M, modellår 2023 | Bekreftet. Serienummer (PIN) kommer senere. |
| AutoQuad 24/24, 40 km/t | Bekreftet. Heter **AutoQuad™ PLUS** i manualen. |
| Fronthydraulikk | Bekreftet. Hvilken av manualens tre varianter det er, er ikke kartlagt. |
| Fjæret foraksel | Bekreftet |
| Førerhus med fjæring | Bekreftet. Om fjæringen er mekanisk eller hydraulisk, er ikke kartlagt. |
| LED-lys | Bekreftet. Hvilke lykter som sitter på, er ikke kartlagt. |
| Snøutstyr | Tokvam VT 280 City (vikeplog foran) og 240 THS (snøfreser bak). Bekreftet. Siden bygger på Tokvams bruksanvisninger. |
| Bremser | Ikke oppgitt (én eller to pedaler) |

**Merk:** Traktoren er en 2023-modell, mens manualen guiden bygger på (utgave 19) er fra 2020. Spør forhandleren om det finnes en nyere utgave.

Hele listen med hva som må sjekkes, ligger på siden **/kilder** i appen og i `src/content/config.ts`.

## Teknologi

- **Vite 8**, **React 19**, **TypeScript 6**
- **Tailwind CSS v4**, med fargetokener i `src/index.css`
- **react-router 8**, en ren klientside-app (SPA)
- **three.js**, **@react-three/fiber** og **@react-three/drei** for 3D. 3D-delen lastes først når man åpner `/3d`, i en egen fil.
- **lucide-react** for ikoner, og **oxlint** for linting
- **playwright-core** for nettlesertester

Appen har ingen backend, database eller miljøvariabler, og trenger derfor ingen `.env`. Avkryssinger i sjekklister og «nylig sett» lagres i nettleseren (`localStorage`).

## Kom i gang

```bash
npm install
npm run dev          # utviklingsserver på http://localhost:5173
npm run build        # typesjekk + produksjonsbygg til dist/
npm run preview      # server dist/ på http://localhost:4173
npm run lint         # oxlint
npm run typecheck    # tsc -b
```

### Nettlesertester

```bash
npm run build
npm run preview &          # må kjøre på port 4173
npm run test:e2e           # tests/e2e.mjs
```

Testene bruker Chrome via `CHROME_PATH`. Er den ikke satt, brukes Chrome i `/Applications` på macOS. Uten Chrome kan du installere Chromium med `npx playwright-core install chromium`. Skjermbilder lagres i `tests/screenshots/`, som ikke sjekkes inn. En annen adresse kan testes med `BASE=https://… npm run test:e2e`.

Testene sjekker blant annet dette:
- Alle ruter vises med overskrift og uten konsollfeil.
- Sidemeny, brødsmulesti, søk og Ctrl+K fungerer.
- Førerhusutforskeren: klikk på skissen og filtrering på område.
- Sjekklisten husker avkrysninger etter ny innlasting, og kan nullstilles.
- 3D: modellen vises, kameravinklene og valg av del (både fra listen og ved klikk i modellen) fungerer, og man kan rotere og zoome.
- Reserveløsninger: når 3D-filen ikke kan lastes, og når WebGL er slått av.
- Mobil (390 px): menyen fungerer, og ingen side kan rulles sidelengs.
- Lenken «Hopp til innhold».

## Publisering (Netlify)

`netlify.toml` er ferdig satt opp med byggekommando `npm run build`, publiseringsmappe `dist` og sikkerhetshoder. `public/_redirects` sørger for at alle adresser åpner appen.

1. Legg repoet på GitHub.
2. I Netlify: **Add new project → Import an existing project → GitHub**, og velg repoet.
3. Innstillingene leses fra `netlify.toml`, så du trykker bare **Deploy**.

Alle statiske verter fungerer, f.eks. Vercel, Cloudflare Pages eller GitHub Pages, så lenge ukjente adresser sendes til `index.html`.

## Struktur

```
src/
  content/            ← ALT innhold ligger her, som typede data
    types.ts          Innholdsmodell (Page → Section → Block, Control, Problem …)
    sources.ts        Register over kilder: manualsider i OMAL219620 og Tokvams bruksanvisninger (url)
    config.ts         Traktorens konfigurasjon, verifiseringsstatus og hva som må sjekkes
    controls.ts       Betjeningsorganer i førerhuset, med plassering på skissen
    parts.ts          Deler i 3D-modellen
    problems.ts       Feilsøking
    checklists.ts     Daglig kontroll, sikt og veitransport
    maintenance.ts    Serviceintervaller og oppgaver
    specs.ts          Spesifikasjoner
    glossary.ts       Ordliste
    pages/*.ts        Veiledningssidene (girkasse, hydraulikk, fjæring, lys …)
    index.ts          Sideliste, meny og søkeindeks
  components/         Layout, PageView (viser innholdsblokker), CabExplorer, Checklist …
  diagrams/           Egne SVG-skisser (laget for guiden, ikke kopiert fra manualen)
  three/              3D-scenen (prosedyrisk modell) og WebGL-sjekk
  pages/              Rutekomponenter
tests/e2e.mjs         Nettlesertester
```

### Slik endrer du innhold

Alt innhold ligger som data i `src/content/`. Komponentene viser det uten egen tekst for hvert tema.

- **Hvert faktum skal ha en kilde.** Blokker og seksjoner har `sources: ["nøkkel"]`, og nøklene må finnes i `sources.ts`. TypeScript gir feil hvis en nøkkel mangler.
- **Verifiseringsstatus**:
  - `bekreftet` – eieren har bekreftet at traktoren har dette (brukes i `config.ts`).
  - `verifisert` – står i manualen.
  - `avhenger` – avhenger av utstyr eller utførelse.
  - `uverifisert` – ikke funnet i manualen. Sett aldri `verifisert` uten at det faktisk står i manualen.
- Nye sider legges i `pages/` og registreres i `PAGES` og `NAV` i `index.ts`. Siden kommer da automatisk med i søket.
- Tekst som ikke kommer fra manualen, for eksempel generelle råd eller juridiske regler, skal stå tydelig merket i en `callout`.

## Begrensninger

- **3D-modellen er en forenklet illustrasjon** bygget av enkle former. Den har ikke riktige mål og er ikke en CAD-modell av en 6120M. Den viser bare *hvor* hovedsystemene sitter. Vil du bytte den ut med en ekte modell (glTF), legger du den inn i `src/three/TractorScene.tsx` og beholder del-id-ene fra `parts.ts`.
- **Førerhusskissen** bygger på manualens oversiktsbilder for PowrQuad™ PLUS/AutoQuad™ PLUS. Organer uten nummer har ikke verifisert plassering.
- **Juridiske krav til veikjøring** (fartsgrenser, førerkort, bredde, lys, merking) gjengis ikke. Guiden lenker til Lovdata og Statens vegvesen. At girkassen er laget for 40 km/t, betyr ikke at 40 km/t er lovlig.
- **Serviceintervaller**: noen oppgaver i manualens serviceoversikt kunne ikke knyttes sikkert til et intervall, for eksempel ventiljustering og bytte av akkumulator. De er merket «se serviceoversikt» i stedet for å oppgi et tall.
- Manualen sier ulike ting om tauing. Dette er vist i guiden i stedet for at én versjon er valgt.
- Manualen er fra 2020 (MY19), mens traktoren er en 2023-modell. Detaljer som motorversjon, display og programvare kan ha endret seg.

## Må verifiseres på selve traktoren

1. PIN/serienummer (kommer senere). Sjekk med forhandleren om det finnes en nyere manual for 2023-modellen enn OMAL219620 utgave 19.
2. Hva fronthydraulikken består av: frontløft med stengeventil, bare koplinger foran, eller joystick/frontlaster. Sjekk også om det finnes frontkraftuttak.
3. Om førerhusfjæringen er mekanisk eller hydraulisk.
4. Hvilke LED- og arbeidslys som faktisk sitter på.
5. Om det er én eller to bremsepedaler, og om det finnes en pedallås.
6. Hvor bryterne for firehjulstrekk, differensialsperre og krypegir sitter. De har ikke nummer på skissen.
7. Speilinnstilling. Den er ikke beskrevet i manualen.
8. Snøfreserens CE-nummer (to versjoner av 240 THS). Avklar også med forhandler: feste og uttak for plogen foran, strøm til plogens ventiler, og om traktorens oljetrykk (opptil 205 bar) er greit for freserens tutsving (maks 175 bar).
