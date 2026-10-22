import type { Spec } from "./types";

// Values for the 6120M from Section 145. Where the manual gives one value for
// 6110M–6130M it applies to the 6120M. Values that depend on equipment are
// marked "avhenger".

export const SPECS: Spec[] = [
  // Engine
  { group: "Motor", label: "Motortype", value: "John Deere 4045HL (4,5 l, 4 sylindre), to-trinns turbo, ladeluftkjøler og kjølt EGR", note: "Versjon 4045HL500/503/505 (Stage IV) eller 4045HL555 (Stage V) avhengig av produksjon.", verification: "avhenger", source: "spec-engine" },
  { group: "Motor", label: "Effekt ved 2100 o/min (ECE-R120)", value: "88 kW (120 hk)", verification: "verifisert", source: "spec-engine" },
  { group: "Motor", label: "Maks effekt ved 1900 o/min", value: "93 kW (126 hk)", verification: "verifisert", source: "spec-engine" },
  { group: "Motor", label: "Største dreiemoment", value: "542 Nm ved 1500 o/min", verification: "verifisert", source: "spec-engine" },
  { group: "Motor", label: "Tomgang / merketurtall / høy tomgang", value: "850 / 2100 / 2250 o/min", verification: "verifisert", source: "spec-engine" },
  { group: "Motor", label: "Konstant effekt-område", value: "1600–2100 o/min", verification: "verifisert", source: "spec-engine" },

  // Transmission
  { group: "Girkasse", label: "AutoQuad™ PLUS", value: "24 forover / 24 bakover, 1,4–40 km/t", note: "Delvis powershift med planetgir, hydraulisk betjent. Retningsskifte elektrisk under last.", verification: "avhenger", source: "spec-transmission" },
  { group: "Girkasse", label: "Krypegir (ekstrautstyr)", value: "12 forover / 12 bakover, 0,14–1,08 km/t", verification: "avhenger", source: "spec-transmission" },

  // PTO
  { group: "Kraftuttak", label: "Maks effekt på bakre kraftuttak ved merketurtall", value: "71 kW (96 hk)", note: "Målt med AutoQuad™ PLUS, 45 cm³-pumpe, uten frontkraftuttak.", verification: "verifisert", source: "spec-pto" },
  { group: "Kraftuttak", label: "Maks effekt ved PTO-merketurtall", value: "74 kW (101 hk)", verification: "verifisert", source: "spec-pto" },
  { group: "Kraftuttak", label: "Bakre kraftuttak, versjoner", value: "540, 540/1000 eller 540/540E/1000 o/min", verification: "avhenger", source: "pto-options" },
  { group: "Kraftuttak", label: "Frontkraftuttak (ekstrautstyr)", value: "1000 o/min mot klokka, maks 80 kW", verification: "avhenger", source: "front-pto" },

  // Hydraulics
  { group: "Hydraulikk", label: "PFC-system (45 cm³ aksialstempelpumpe)", value: "114 l/min ved merketurtall", verification: "avhenger", source: "spec-hydraulics" },
  { group: "Hydraulikk", label: "LS-system (35 cm³ tannhjulspumpe)", value: "80 l/min ved merketurtall", verification: "avhenger", source: "spec-hydraulics" },
  { group: "Hydraulikk", label: "Systemtrykk (PFC)", value: "41 bar standby, maks 205 bar", verification: "avhenger", source: "spec-hydraulics" },
  { group: "Hydraulikk", label: "Maks oljeuttak", value: "15 l (27 l med ekstra tank, stillestående)", verification: "verifisert", source: "scv-oil-withdrawal" },

  // Hitch
  { group: "Løft", label: "Bakløft, kategori", value: "CAT 2 og 3N", verification: "verifisert", source: "spec-hitch" },
  { group: "Løft", label: "Bakløft, maks løftekraft ved koplingspunkt", value: "3964 kg (65 mm sylinder) / 5278 kg (75 mm sylinder)", verification: "avhenger", source: "spec-hitch" },
  { group: "Løft", label: "Frontløft (ekstrautstyr), maks / kontinuerlig", value: "4000 kg / 3300 kg, CAT 3N", verification: "avhenger", source: "spec-hitch" },

  // Capacities
  { group: "Volumer", label: "Drivstofftank", value: "195 l", verification: "verifisert", source: "spec-capacities" },
  { group: "Volumer", label: "AdBlue-tank (DEF)", value: "13 l", verification: "verifisert", source: "spec-capacities" },
  { group: "Volumer", label: "Kjølesystem (motor og kabinvarme)", value: "22 l", verification: "verifisert", source: "spec-capacities" },
  { group: "Volumer", label: "Motorolje", value: "16 l", verification: "verifisert", source: "spec-capacities" },
  { group: "Volumer", label: "Girkasse/hydraulikk ved oljeskift", value: "52 l (+1 l med krypegir)", verification: "verifisert", source: "spec-capacities" },
  { group: "Volumer", label: "Akselhus, fjæret foraksel", value: "6,4 l", note: "Gjelder todelt foraksel (type 730/733/735). Andre aksler har andre volumer.", verification: "avhenger", source: "spec-capacities" },
  { group: "Volumer", label: "Navgir foraksel per side", value: "0,8 l uten brems / 1,4 l med brems", verification: "avhenger", source: "spec-capacities" },
  { group: "Volumer", label: "Frontkraftuttak (ekstrautstyr)", value: "2,6 l", verification: "avhenger", source: "spec-capacities" },
  { group: "Volumer", label: "Kuldemedium klimaanlegg (R134a)", value: "1225–1275 g", verification: "verifisert", source: "spec-capacities" },

  // Fluids
  { group: "Væsker", label: "Motorolje", value: "John Deere Plus-50™ II anbefalt. Alternativt API CK-4, CJ-4, ACEA E9 eller E6", note: "Viskositet etter forventet temperatur (se manualens tabell).", verification: "verifisert", source: "engine-oil-spec" },
  { group: "Væsker", label: "Girkasse-/hydraulikkolje", value: "John Deere Hy-Gard™ eller Low Viscosity Hy-Gard™. Alternativt JDM J20C eller J20D", verification: "verifisert", source: "trans-oil-spec" },
  { group: "Væsker", label: "Kjølevæske", value: "John Deere COOL-GARD™ II (ferdigblandet). Konsentrat: 40–60 %", verification: "verifisert", source: "coolant-spec" },
  { group: "Væsker", label: "Diesel", value: "Lavsvovel diesel, maks 15 mg/kg (15 ppm)", verification: "verifisert", source: "engine-oil-spec" },
  { group: "Væsker", label: "AdBlue (DEF)", value: "ISO 22241-1 (AUS 32), API- eller AdBlue®-sertifisert", verification: "verifisert", source: "def-spec" },

  // Weights & dimensions
  { group: "Vekt og mål", label: "Egenvekt (eksempel­utrustning)", value: "5660 kg", note: "Med PowrQuad 24/24, fjæret foraksel, ikke fjæret førerhus, uten drivstoff. Annet utstyr gir annen vekt.", verification: "avhenger", source: "spec-weights" },
  { group: "Vekt og mål", label: "Maks tillatt totalvekt (med firehjulsaksel)", value: "9150 kg", verification: "verifisert", source: "spec-weights" },
  { group: "Vekt og mål", label: "Maks tillatt aksellast foran (normal drift opptil 40 km/t)", value: "4380 kg", verification: "verifisert", source: "spec-weights" },
  { group: "Vekt og mål", label: "Maks tillatt aksellast bak", value: "7070 kg", verification: "verifisert", source: "spec-weights" },
  { group: "Vekt og mål", label: "Akselavstand", value: "2580 mm", verification: "verifisert", source: "spec-dimensions" },
  { group: "Vekt og mål", label: "Største bredde for veikjøring", value: "2550 mm", verification: "verifisert", source: "spec-dimensions" },
  { group: "Vekt og mål", label: "Høyde til førerhustak", value: "2678–2928 mm avhengig av bakdekk (SRI 625–875)", verification: "avhenger", source: "spec-dimensions" },

  // Electrical
  { group: "Elektrisk", label: "Batteri", value: "12 V, 154 Ah (ekstra: 174 Ah)", verification: "avhenger", source: "spec-electrical" },
  { group: "Elektrisk", label: "Dynamo", value: "14 V, 120 A (ekstra: 200 A)", verification: "avhenger", source: "spec-electrical" },
  { group: "Elektrisk", label: "Starter", value: "12 V, 3,0 kW", verification: "verifisert", source: "spec-electrical" },
];
