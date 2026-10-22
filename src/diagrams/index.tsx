import type { DiagramId } from "@/content/types";
import type { ReactNode } from "react";

// Original, simplified diagrams drawn for this guide. They explain principles
// and approximate layouts; they are not reproductions of manual figures.

const G = "#367c2b";
const G_DARK = "#1d4524";
const Y = "#ffde00";
const INK = "#1b1f1c";
const MUTED = "#5b635d";
const LINE = "#c9cfc6";

function Frame({ label, viewBox, children }: { label: string; viewBox: string; children: ReactNode }) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className="h-auto w-full" style={{ fontFamily: "inherit" }}>
      <title>{label}</title>
      {children}
    </svg>
  );
}

function GearStructure() {
  const groups = ["A", "B", "C", "D", "E", "F"];
  return (
    <Frame label="Girkassens oppbygging: seks grupper A til F, hver med gir 1 til 4" viewBox="0 0 640 250">
      {groups.map((g, i) => {
        const x = 20 + i * 102;
        return (
          <g key={g}>
            <rect x={x} y={40} width={88} height={150} rx={10} fill={i < 3 ? "#f3f8f0" : "#e6f0e1"} stroke={G} strokeWidth={1.5} />
            <text x={x + 44} y={30} textAnchor="middle" fontSize={16} fontWeight={700} fill={G_DARK}>Gruppe {g}</text>
            {[4, 3, 2, 1].map((n, j) => (
              <g key={n}>
                <rect x={x + 14} y={52 + j * 33} width={60} height={26} rx={6} fill="#fff" stroke={LINE} />
                <text x={x + 44} y={70 + j * 33} textAnchor="middle" fontSize={13} fill={INK}>gir {n}</text>
              </g>
            ))}
          </g>
        );
      })}
      <path d="M30 212 H610" stroke={MUTED} strokeWidth={1.5} markerEnd="url(#arr)" />
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10z" fill={MUTED} />
        </marker>
      </defs>
      <text x={30} y={235} fontSize={13} fill={MUTED}>Lav fart, mye trekkraft</text>
      <text x={610} y={235} fontSize={13} fill={MUTED} textAnchor="end">Høy fart (transport)</text>
      <rect x={232} y={198} width={176} height={26} rx={13} fill={Y} />
      <text x={320} y={216} textAnchor="middle" fontSize={12} fontWeight={600} fill={INK}>Gruppe: spak + clutch · Gir: knapper</text>
    </Frame>
  );
}

const SPEEDS: [string, number[]][] = [
  ["A", [1.4, 1.7, 2.0, 2.5]],
  ["B", [3.4, 4.1, 5.0, 6.1]],
  ["C", [5.6, 6.7, 8.1, 9.9]],
  ["D", [9.2, 11.1, 13.3, 16.2]],
  ["E", [14.9, 18.0, 21.6, 26.4]],
  ["F", [21.4, 25.8, 30.9, 37.9]],
];

function SpeedChart() {
  const x = (v: number) => 70 + (v / 40) * 540;
  return (
    <Frame label="Fart i hver gruppe fra gir 1 til gir 4, SRI 750 mm ved 2100 o/min" viewBox="0 0 640 260">
      {[0, 10, 20, 30, 40].map((v) => (
        <g key={v}>
          <line x1={x(v)} x2={x(v)} y1={18} y2={222} stroke="#eceee9" />
          <text x={x(v)} y={240} textAnchor="middle" fontSize={12} fill={MUTED}>{v} km/t</text>
        </g>
      ))}
      {SPEEDS.map(([g, s], i) => {
        const y = 24 + i * 33;
        return (
          <g key={g}>
            <text x={50} y={y + 15} textAnchor="end" fontSize={14} fontWeight={700} fill={G_DARK}>{g}</text>
            <rect x={x(s[0])} y={y + 2} width={x(s[3]) - x(s[0])} height={20} rx={4} fill={G} opacity={0.85} />
            {s.map((v, j) => (
              <circle key={j} cx={x(v)} cy={y + 12} r={3.5} fill="#fff" stroke={G_DARK} strokeWidth={1.5} />
            ))}
            <text x={x(s[3]) + 8} y={y + 16} fontSize={12} fill={INK}>{s[0].toString().replace(".", ",")}–{s[3].toString().replace(".", ",")}</text>
          </g>
        );
      })}
    </Frame>
  );
}

function ShiftControls() {
  return (
    <Frame label="Gruppespaken med girknapper, Automatic-knapp og håndclutch-knapp (forenklet)" viewBox="0 0 520 300">
      <rect x={30} y={250} width={460} height={34} rx={8} fill="#eceee9" />
      <text x={260} y={272} textAnchor="middle" fontSize={12} fill={MUTED}>Høyre konsoll — spaken flyttes langs sporet for å velge gruppe</text>
      <path d="M240 250 L250 140" stroke={MUTED} strokeWidth={14} strokeLinecap="round" />
      <ellipse cx={258} cy={110} rx={70} ry={58} fill="#f3f4f1" stroke={INK} strokeWidth={2} />
      <circle cx={228} cy={86} r={13} fill={G_DARK} />
      <circle cx={222} cy={122} r={11} fill={G} />
      <circle cx={244} cy={140} r={11} fill={G} />
      <circle cx={298} cy={120} r={13} fill={Y} stroke={INK} />
      <text x={298} y={124} textAnchor="middle" fontSize={9} fontWeight={700}>A</text>
      <g fontSize={13} fill={INK}>
        <line x1={215} y1={86} x2={110} y2={60} stroke={MUTED} />
        <text x={20} y={50}>Håndclutch-knapp</text>
        <line x1={215} y1={130} x2={110} y2={150} stroke={MUTED} />
        <text x={20} y={160}>Girknapper (opp/ned)</text>
        <line x1={311} y1={120} x2={380} y2={90} stroke={MUTED} />
        <text x={384} y={86}>Automatic-knapp</text>
        <line x1={300} y1={160} x2={380} y2={190} stroke={MUTED} />
        <text x={384} y={196}>Gruppespak</text>
        <text x={384} y={212} fontSize={11} fill={MUTED}>(med parkeringslås)</text>
      </g>
    </Frame>
  );
}

function Dial({ cx, label, ticks }: { cx: number; label: string; ticks: string[] }) {
  return (
    <g>
      <circle cx={cx} cy={150} r={86} fill="#20251f" stroke="#3a4139" strokeWidth={4} />
      {ticks.map((t, i) => {
        const a = (-220 + (260 / (ticks.length - 1)) * i) * (Math.PI / 180);
        return (
          <text key={t} x={cx + Math.cos(a) * 64} y={154 + Math.sin(a) * 64} textAnchor="middle" fontSize={12} fill="#e9ece6">{t}</text>
        );
      })}
      <line x1={cx} y1={150} x2={cx - 50} y2={170} stroke={Y} strokeWidth={3} strokeLinecap="round" />
      <circle cx={cx} cy={150} r={7} fill="#e9ece6" />
      <text x={cx} y={214} textAnchor="middle" fontSize={11} fill="#c9d0c6">{label}</text>
    </g>
  );
}

function Lamp({ x, y, color, label }: { x: number; y: number; color: string; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={9} fill={color} stroke="#000" strokeOpacity={0.2} />
      <text x={x} y={y + 22} textAnchor="middle" fontSize={9} fill="#dfe5dc">{label}</text>
    </g>
  );
}

function InstrumentCluster() {
  return (
    <Frame label="Instrumentpanel: turteller til venstre, digitalt display i midten, speedometer til høyre, varsellamper øverst og til venstre, betjeningsknapper til høyre" viewBox="0 0 720 300">
      <rect x={4} y={4} width={712} height={292} rx={22} fill="#2b312a" />
      <Lamp x={34} y={140} color="#3b82f6" label="INFO" />
      <Lamp x={34} y={190} color={Y} label="CAUTION" />
      <Lamp x={34} y={240} color="#ef4444" label="STOP" />
      <Dial cx={170} label="Turteller ×1000 o/min" ticks={["0", "0,5", "1", "1,5", "2", "2,5"]} />
      <Dial cx={540} label="Speedometer km/t" ticks={["0", "10", "20", "30", "40", "50"]} />
      <rect x={290} y={70} width={140} height={150} rx={8} fill="#cfe3c7" />
      <text x={360} y={96} textAnchor="middle" fontSize={22} fontWeight={700} fill={G_DARK}>1 2 3 4</text>
      <text x={360} y={116} textAnchor="middle" fontSize={11} fill={G_DARK}>girindikator · AUTO</text>
      <text x={360} y={150} textAnchor="middle" fontSize={12} fill={G_DARK}>digitalt display</text>
      <text x={312} y={205} fontSize={10} fill={G_DARK}>temp</text>
      <text x={348} y={205} fontSize={10} fill={G_DARK}>diesel</text>
      <text x={392} y={205} fontSize={10} fill={G_DARK}>AdBlue</text>
      {[
        [90, "◀"],
        [130, "N"],
        [170, "fram/bak"],
        [215, "4WD"],
        [255, "diff"],
        [470, "fjernlys"],
        [510, "PTO"],
        [550, "gløding"],
        [600, "▶"],
      ].map(([x, l]) => (
        <Lamp key={l as string} x={x as number} y={36} color="#7c8a78" label={l as string} />
      ))}
      {["Bekreft", "▲", "▼", "Meny"].map((l, i) => (
        <g key={l}>
          <circle cx={680} cy={95 + i * 48} r={16} fill="#465045" stroke="#7a8577" />
          <text x={680} y={99 + i * 48} textAnchor="middle" fontSize={10} fill="#f1f3ef">{l}</text>
        </g>
      ))}
    </Frame>
  );
}

function Box({ x, y, w, h, title, sub, fill = "#fff" }: { x: number; y: number; w: number; h: number; title: string; sub?: string; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={G} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 5)} textAnchor="middle" fontSize={14} fontWeight={700} fill={G_DARK}>{title}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{sub}</text>}
    </g>
  );
}

function HydraulicFlow() {
  return (
    <Frame label="Hydraulikk: olje fra girkassen går via pumpe og ventil til koplingene og sylinderen, og tilbake" viewBox="0 0 720 230">
      <defs>
        <marker id="harr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0 0 L10 5 L0 10z" fill={G} />
        </marker>
      </defs>
      <Box x={10} y={70} w={120} h={70} title="Girkasse" sub="felles olje" fill="#f3f8f0" />
      <Box x={170} y={70} w={110} h={70} title="Pumpe" sub="drives av motor" />
      <Box x={320} y={70} w={130} h={70} title="Ventil (SCV)" sub="styres med spak" fill={"#fff6c2"} />
      <Box x={490} y={30} w={90} h={50} title="Ut" sub="kopling" />
      <Box x={490} y={130} w={90} h={50} title="Inn" sub="kopling" />
      <rect x={610} y={60} width={100} height={90} rx={10} fill="#fff" stroke={INK} strokeWidth={1.5} />
      <rect x={622} y={88} width={56} height={34} fill="#e6f0e1" stroke={G} />
      <line x1={678} y1={105} x2={704} y2={105} stroke={INK} strokeWidth={4} />
      <text x={660} y={80} textAnchor="middle" fontSize={12} fontWeight={700} fill={G_DARK}>Sylinder</text>
      <text x={660} y={142} textAnchor="middle" fontSize={10} fill={MUTED}>på redskapet</text>
      <g stroke={G} strokeWidth={2.5} fill="none" markerEnd="url(#harr)">
        <path d="M130 105 H168" />
        <path d="M280 105 H318" />
        <path d="M450 95 C470 70, 470 55, 488 55" />
        <path d="M580 55 C600 55, 600 80, 610 88" />
        <path d="M610 130 C600 150, 600 155, 582 155" />
        <path d="M488 155 C470 155, 465 130, 452 118" strokeDasharray="5 4" />
      </g>
      <path d="M385 140 V200 H70 V142" stroke={MUTED} strokeWidth={2} fill="none" strokeDasharray="5 4" markerEnd="url(#harr)" />
      <text x={230} y={218} textAnchor="middle" fontSize={12} fill={MUTED}>retur til girkassen</text>
    </Frame>
  );
}

function FrontHydraulics() {
  return (
    <Frame label="Systemer foran og bak: frontløft, frontkoplinger, frontlaster-uttak og frontkraftuttak foran; hydraulikkuttak, bakløft og kraftuttak bak" viewBox="0 0 760 300">
      <path d="M150 190 H560 L600 120 H520 V60 H330 V120 H210 L150 150 Z" fill="#e6f0e1" stroke={G} strokeWidth={2} />
      <circle cx={230} cy={205} r={52} fill="#2f342e" />
      <circle cx={230} cy={205} r={24} fill={Y} />
      <circle cx={520} cy={195} r={68} fill="#2f342e" />
      <circle cx={520} cy={195} r={30} fill={Y} />
      <rect x={110} y={150} width={42} height={30} fill={MUTED} />
      <rect x={600} y={140} width={46} height={26} fill={MUTED} />
      <g fontSize={12} fill={INK}>
        <line x1={120} y1={152} x2={70} y2={70} stroke={MUTED} />
        <text x={10} y={50} fontWeight={700} fill={G_DARK}>Frontløft</text>
        <text x={10} y={64}>SCV I + stengeventil</text>
        <line x1={130} y1={168} x2={60} y2={120} stroke={MUTED} />
        <text x={10} y={108} fontWeight={700} fill={G_DARK}>Frontkoplinger</text>
        <text x={10} y={122}>SCV II</text>
        <line x1={112} y1={176} x2={60} y2={250} stroke={MUTED} />
        <text x={10} y={262} fontWeight={700} fill={G_DARK}>Front-PTO</text>
        <text x={10} y={276}>roterende aksel (ikke hydraulikk)</text>
        <line x1={330} y1={190} x2={330} y2={260} stroke={MUTED} />
        <text x={250} y={278} fontWeight={700} fill={G_DARK}>Frontlaster-uttak</text>
        <text x={250} y={292}>under høyre trinn · joystick</text>
        <line x1={640} y1={142} x2={690} y2={80} stroke={MUTED} />
        <text x={600} y={60} fontWeight={700} fill={G_DARK}>Hydraulikkuttak bak</text>
        <text x={600} y={74}>SCV I–III</text>
        <line x1={646} y1={160} x2={690} y2={210} stroke={MUTED} />
        <text x={640} y={226} fontWeight={700} fill={G_DARK}>Bakløft + PTO</text>
      </g>
      <text x={380} y={40} textAnchor="middle" fontSize={12} fill={MUTED}>Forenklet sidebilde — foran til venstre</text>
    </Frame>
  );
}

function ScvPositions() {
  const pos: [number, string, string][] = [
    [-60, "Ut", "sylinder går ut"],
    [-20, "Nøytral", "holder"],
    [20, "Inn", "sylinder går inn"],
    [55, "Flyt", "følger bakken"],
  ];
  return (
    <Frame label="SCV-spakens fire stillinger: ut, nøytral, inn og flyt" viewBox="0 0 520 260">
      <path d="M140 210 A150 150 0 0 1 380 210" fill="none" stroke={LINE} strokeWidth={10} strokeLinecap="round" />
      {pos.map(([deg, name, sub], i) => {
        const a = ((deg - 90) * Math.PI) / 180;
        const x = 260 + Math.cos(a) * 170;
        const y = 240 + Math.sin(a) * 170;
        return (
          <g key={name}>
            <line x1={260} y1={240} x2={260 + Math.cos(a) * 150} y2={240 + Math.sin(a) * 150} stroke={i === 1 ? G : LINE} strokeWidth={i === 1 ? 8 : 3} strokeLinecap="round" />
            <text x={x} y={y - 8} textAnchor="middle" fontSize={15} fontWeight={700} fill={i === 3 ? "#8a5a00" : G_DARK}>{name}</text>
            <text x={x} y={y + 8} textAnchor="middle" fontSize={11} fill={MUTED}>{sub}</text>
          </g>
        );
      })}
      <circle cx={260} cy={240} r={12} fill={INK} />
      <text x={260} y={258} textAnchor="middle" fontSize={11} fill={MUTED}>forover ← spaken → bakover (illustrasjon)</text>
    </Frame>
  );
}

function LightSwitch() {
  const labels = ["1 AV", "2 Parkeringslys", "3 Hovedlys", "4 + arbeidslys"];
  return (
    <Frame label="Lysbryteren har fire stillinger: av, parkeringslys, hovedlys, hovedlys med arbeidslys" viewBox="0 0 520 220">
      <circle cx={130} cy={130} r={62} fill="#2f342e" />
      <rect x={124} y={78} width={12} height={46} rx={4} fill="#f4f4f1" transform="rotate(-50 130 130)" />
      {labels.map((l, i) => {
        const a = ((-140 + i * 32) * Math.PI) / 180;
        return (
          <g key={l}>
            <circle cx={130 + Math.cos(a) * 82} cy={130 + Math.sin(a) * 82} r={5} fill={i === 3 ? Y : G} />
            <text x={250} y={70 + i * 34} fontSize={15} fill={INK}><tspan fontWeight={700} fill={G_DARK}>{l.split(" ")[0]}</tspan> {l.split(" ").slice(1).join(" ")}</text>
          </g>
        );
      })}
      <text x={250} y={210} fontSize={12} fill={MUTED}>Arbeidslys kan bare slås på i stilling 4.</text>
    </Frame>
  );
}

function LightsFront() {
  const tag = (x: number, y: number, t: string, opt = false) => (
    <g key={t + x}>
      <circle cx={x} cy={y} r={11} fill={opt ? "#fff" : Y} stroke={INK} strokeWidth={1.2} strokeDasharray={opt ? "3 2" : undefined} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={700}>{t}</text>
    </g>
  );
  return (
    <Frame label="Lykter foran: nærlys, fjernlys, arbeidslys i hjørnene, ekstra frontlys, blinklys og arbeidslys på taket, roterende varsellys" viewBox="0 0 520 330">
      <rect x={130} y={40} width={260} height={150} rx={14} fill="#e6f0e1" stroke={G} strokeWidth={2} />
      <rect x={110} y={30} width={300} height={22} rx={8} fill="#cfdcc9" stroke={G} />
      <rect x={190} y={170} width={140} height={110} rx={10} fill="#d7e5d1" stroke={G} strokeWidth={2} />
      <rect x={60} y={230} width={70} height={90} rx={14} fill="#2f342e" />
      <rect x={390} y={230} width={70} height={90} rx={14} fill="#2f342e" />
      {tag(215, 270, "A")}{tag(305, 270, "A")}
      {tag(225, 195, "B")}{tag(295, 195, "B")}
      {tag(200, 214, "C", true)}{tag(320, 214, "C", true)}
      {tag(118, 150, "D", true)}{tag(402, 150, "D", true)}
      {tag(122, 40, "E")}{tag(398, 40, "E")}
      {tag(160, 40, "F", true)}{tag(360, 40, "F", true)}
      {tag(205, 40, "G", true)}{tag(315, 40, "G", true)}
      {tag(430, 14, "H", true)}
      <g fontSize={11} fill={MUTED}>
        <circle cx={20} cy={14} r={7} fill={Y} stroke={INK} /><text x={32} y={18}>standard</text>
        <circle cx={100} cy={14} r={7} fill="#fff" stroke={INK} strokeDasharray="3 2" /><text x={112} y={18}>ekstrautstyr</text>
      </g>
    </Frame>
  );
}

function LightsRear() {
  const tag = (x: number, y: number, t: string, opt = false) => (
    <g key={t + x}>
      <circle cx={x} cy={y} r={11} fill={opt ? "#fff" : Y} stroke={INK} strokeWidth={1.2} strokeDasharray={opt ? "3 2" : undefined} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={700}>{t}</text>
    </g>
  );
  return (
    <Frame label="Lykter bak: baklys og blinklys på skjermene, arbeidslys på skjerm og tak, blinklys på taket, 7-polet kontakt" viewBox="0 0 520 300">
      <rect x={140} y={30} width={240} height={160} rx={12} fill="#e6f0e1" stroke={G} strokeWidth={2} />
      <rect x={120} y={22} width={280} height={20} rx={8} fill="#cfdcc9" stroke={G} />
      <rect x={40} y={170} width={120} height={120} rx={18} fill="#2f342e" />
      <rect x={360} y={170} width={120} height={120} rx={18} fill="#2f342e" />
      <rect x={30} y={160} width={140} height={20} rx={6} fill="#d7e5d1" stroke={G} />
      <rect x={350} y={160} width={140} height={20} rx={6} fill="#d7e5d1" stroke={G} />
      {tag(45, 170, "I")}{tag(475, 170, "I")}
      {tag(100, 170, "J", true)}{tag(420, 170, "J", true)}
      {tag(132, 32, "K")}{tag(388, 32, "K")}
      {tag(205, 32, "L", true)}{tag(315, 32, "L", true)}
      {tag(260, 220, "M")}
      <text x={260} y={248} textAnchor="middle" fontSize={11} fill={MUTED}>7-polet kontakt</text>
    </Frame>
  );
}

function Suspension() {
  return (
    <Frame label="Fjæret foraksel foran og førerhusfjæring under førerhuset (forenklet sidebilde)" viewBox="0 0 640 300">
      <path d="M110 200 H470 L520 140 H450 V50 H290 V140 H170 L110 170 Z" fill="#eef4ea" stroke={G} strokeWidth={2} />
      <circle cx={190} cy={215} r={55} fill="#2f342e" /><circle cx={190} cy={215} r={22} fill={Y} />
      <circle cx={450} cy={205} r={72} fill="#2f342e" /><circle cx={450} cy={205} r={30} fill={Y} />
      <g stroke="#b45309" strokeWidth={4} fill="none">
        <path d="M200 160 v-8 l8 -5 l-16 -6 l16 -6 l-16 -6 l8 -5 v-8" />
        <path d="M300 150 v-6 l6 -4 l-12 -5 l12 -5 l-6 -4 v-6" />
        <path d="M440 150 v-6 l6 -4 l-12 -5 l12 -5 l-6 -4 v-6" />
      </g>
      <g fontSize={13} fill={INK}>
        <line x1={200} y1={140} x2={120} y2={70} stroke={MUTED} />
        <text x={20} y={50} fontWeight={700} fill={G_DARK}>Fjæret foraksel (TLS)</text>
        <text x={20} y={66}>hydraulisk · automatisk over 1,5 km/t</text>
        <line x1={440} y1={128} x2={560} y2={70} stroke={MUTED} />
        <text x={470} y={50} fontWeight={700} fill={G_DARK}>Førerhusfjæring</text>
        <text x={470} y={66}>mekanisk eller hydraulisk</text>
      </g>
      <text x={320} y={292} textAnchor="middle" fontSize={11} fill={MUTED}>Plasseringene er illustrative</text>
    </Frame>
  );
}

function RpmLoad() {
  return (
    <Frame label="Riktig gir: turtallet skal falle 150 til 250 omdreininger når lasten kommer på" viewBox="0 0 600 240">
      <line x1={60} y1={200} x2={560} y2={200} stroke={MUTED} />
      <line x1={60} y1={20} x2={60} y2={200} stroke={MUTED} />
      <text x={70} y={18} fontSize={11} fill={MUTED}>motorturtall</text>
      <text x={560} y={220} textAnchor="end" fontSize={11} fill={MUTED}>tid → last kommer på</text>
      <path d="M60 60 H260 C300 60, 300 100, 340 100 H560" stroke={G} strokeWidth={3} fill="none" />
      <path d="M260 60 C300 60, 300 160, 340 165 H560" stroke="#b42318" strokeWidth={2} strokeDasharray="6 4" fill="none" />
      <line x1={420} y1={60} x2={420} y2={100} stroke={INK} strokeWidth={1.5} />
      <text x={428} y={85} fontSize={13} fill={INK}>150–250 o/min — passe gir</text>
      <text x={428} y={160} fontSize={13} fill="#b42318">stort fall — for høyt gir</text>
      <text x={70} y={52} fontSize={12} fill={MUTED}>ubelastet turtall</text>
    </Frame>
  );
}

function CabLayout() {
  return (
    <Frame label="Førerhusets hovedområder sett fra førersetet" viewBox="0 0 520 260">
      <rect x={10} y={10} width={500} height={240} rx={16} fill="#f3f4f1" stroke={LINE} />
      <rect x={150} y={30} width={220} height={70} rx={10} fill="#2f342e" />
      <text x={260} y={70} textAnchor="middle" fontSize={13} fill="#fff">Instrumentpanel</text>
      <circle cx={260} cy={130} r={46} fill="none" stroke={INK} strokeWidth={8} />
      <text x={260} y={134} textAnchor="middle" fontSize={11}>Ratt</text>
      <rect x={390} y={90} width={110} height={150} rx={10} fill="#e6f0e1" stroke={G} />
      <text x={445} y={170} textAnchor="middle" fontSize={12} fill={G_DARK}>Høyre konsoll</text>
      <rect x={150} y={200} width={220} height={40} rx={8} fill="#eceee9" />
      <text x={260} y={225} textAnchor="middle" fontSize={12} fill={MUTED}>Pedaler</text>
    </Frame>
  );
}

const DIAGRAMS: Record<DiagramId, () => ReactNode> = {
  "gear-structure": GearStructure,
  "speed-chart": SpeedChart,
  "shift-controls": ShiftControls,
  "instrument-cluster": InstrumentCluster,
  "cab-layout": CabLayout,
  "hydraulic-flow": HydraulicFlow,
  "front-hydraulics": FrontHydraulics,
  "scv-positions": ScvPositions,
  "light-switch": LightSwitch,
  "lights-front": LightsFront,
  "lights-rear": LightsRear,
  suspension: Suspension,
  "rpm-load": RpmLoad,
};

export function Diagram({ id, caption }: { id: DiagramId; caption?: string }) {
  const C = DIAGRAMS[id];
  return (
    <figure className="card overflow-hidden p-3 sm:p-4">
      <div className="mx-auto max-w-3xl">{C ? <C /> : null}</div>
      {caption && <figcaption className="mt-2 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}
