import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Svg,
  Circle,
  Path,
  Rect,
  Line,
  G,
} from "@react-pdf/renderer";
import { type BloomMapData } from "@/utils/bloomTypes";
import { supabase } from "@/integrations/supabase/client";

// Register Montserrat from Supabase storage (same as VisionPlanPDF)
const getFontUrl = async (name: string) => {
  const { data } = await supabase.storage.from("fonts").getPublicUrl(name);
  return data.publicUrl;
};
(async () => {
  try {
    const [reg, med, bold] = await Promise.all([
      getFontUrl("Montserrat-Regular.ttf"),
      getFontUrl("Montserrat-Medium.ttf"),
      getFontUrl("Montserrat-Bold.ttf"),
    ]);
    Font.register({
      family: "Montserrat",
      fonts: [{ src: reg }, { src: med, fontWeight: 500 }, { src: bold, fontWeight: 700 }],
    });
  } catch { /* fonts fall back to default */ }
})();

// Brand colours
const C = {
  pearl:    "#FAF8F8",
  orchid:   "#DED2CD",
  lavender: "#988183",
  moss:     "#AAA488",
  noir:     "#4D4A56",
  legacy:   "#E8A898",
  ownership:"#C8C4BC",
  sidebar:  "#F0ECEC",
  border:   "#D4CECE",
};

const trunc = (s: string, n: number) =>
  s && s.length > n ? s.slice(0, n).trimEnd() + "…" : (s || "");

// A4 landscape: 841 × 595
const W = 841;
const H = 595;
const SB = 130; // sidebar width
const CX = W / 2;       // lotus centre x = 420
const CY = H / 2;       // lotus centre y = 297
const PR = 75;           // centre circle radius
const PD = 95;           // petal centre distance from lotus centre
const DX = Math.round(PD * Math.cos(Math.PI / 4)); // 67

// Petal centres
const TL = { x: CX - DX, y: CY - DX }; // top-left (Organic Growth)
const TR = { x: CX + DX, y: CY - DX }; // top-right (Legacy)
const BR = { x: CX + DX, y: CY + DX }; // bottom-right (Ownership)
const BL = { x: CX - DX, y: CY + DX }; // bottom-left (Multiply)

// Petal path: vertical lens shape centred at origin, rx=80, ry=38
const PETAL = "M 0,-82 C 39,-44 39,44 0,82 C -39,44 -39,-44 0,-82 Z";

const s = StyleSheet.create({
  page:   { fontFamily: "Montserrat", backgroundColor: C.pearl },
  sb:     { position: "absolute", top: 0, width: SB, height: H, backgroundColor: C.sidebar },
  sbR:    { position: "absolute", top: 0, left: W - SB, width: SB, height: H, backgroundColor: C.sidebar },
  sbContent: { padding: 10 },
  sbTitle:   { fontSize: 7, fontWeight: 700, color: C.lavender, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 },
  sbItem:    { marginBottom: 5 },
  sbKey:     { fontSize: 6, fontWeight: 700, color: C.noir, marginBottom: 1 },
  sbVal:     { fontSize: 5.5, color: C.noir, lineHeight: 1.4, opacity: 0.85 },
  divider:   { borderBottom: `0.5px solid ${C.border}`, marginVertical: 6 },
  // Petal text labels (absolute positioned Views on top of SVG)
  petalLabel: { position: "absolute", textAlign: "center" },
  pLetter:  { fontSize: 13, fontWeight: 700 },
  pTitle:   { fontSize: 6.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4, marginTop: 1 },
  pContent: { fontSize: 5, lineHeight: 1.35, marginTop: 2, opacity: 0.9 },
  // Centre
  centre:   { position: "absolute", textAlign: "center" },
  cTitle:   { fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: C.noir },
  cVision:  { fontSize: 5.5, lineHeight: 1.4, color: C.noir, marginTop: 3, fontStyle: "italic" },
  // Colour legend
  legendRow: { flexDirection: "row", alignItems: "center", marginBottom: 3 },
  legendDot: { width: 7, height: 7, borderRadius: 4, marginRight: 4 },
  legendTxt: { fontSize: 5.5, color: C.noir },
});

interface BloomMapPDFProps {
  bloomData: BloomMapData;
  boldVisionStatement: string;
  dominantTrait: string;
  coreValues: string[];
}

const BloomMapPDF = ({ bloomData, boldVisionStatement, dominantTrait, coreValues }: BloomMapPDFProps) => {
  const bvContent = trunc(bloomData.boldVision.confirmedContent, 120);
  const legContent = trunc(bloomData.legacy.confirmedContent, 130);
  const ogContent  = trunc(bloomData.organicGrowth.confirmedContent, 130);
  const owContent  = trunc(bloomData.ownership.confirmedContent, 130);
  const miContent  = trunc(bloomData.multiplyImpact.confirmedContent, 130);
  const bvStatement = trunc(boldVisionStatement, 140);

  return (
    <Document title="My BLOOM Map">
      <Page size="A4" orientation="landscape" style={s.page}>

        {/* ── SVG layer: all shapes ── */}
        <View style={{ position: "absolute", top: 0, left: 0 }}>
          <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
            {/* Sidebar backgrounds */}
            <Rect x={0} y={0} width={SB} height={H} fill={C.sidebar} />
            <Rect x={W - SB} y={0} width={SB} height={H} fill={C.sidebar} />

            {/* Outer decorative ring */}
            <Circle cx={CX} cy={CY} r={190} fill="none" stroke={C.orchid} strokeWidth={1} />
            <Circle cx={CX} cy={CY} r={160} fill="none" stroke={C.orchid} strokeWidth={0.5} opacity={0.4} />

            {/* Petals — drawn behind centre circle */}
            {/* Top-left: Organic Growth (Moss) */}
            <G transform={`translate(${TL.x} ${TL.y}) rotate(45)`}>
              <Path d={PETAL} fill={C.moss} opacity={0.88} />
            </G>
            {/* Top-right: Legacy (Salmon) */}
            <G transform={`translate(${TR.x} ${TR.y}) rotate(-45)`}>
              <Path d={PETAL} fill={C.legacy} opacity={0.88} />
            </G>
            {/* Bottom-right: Ownership (Light) */}
            <G transform={`translate(${BR.x} ${BR.y}) rotate(45)`}>
              <Path d={PETAL} fill={C.ownership} opacity={0.88} />
            </G>
            {/* Bottom-left: Multiply Impact (Lavender) */}
            <G transform={`translate(${BL.x} ${BL.y}) rotate(-45)`}>
              <Path d={PETAL} fill={C.lavender} opacity={0.88} />
            </G>

            {/* Centre circle */}
            <Circle cx={CX} cy={CY} r={PR} fill={C.orchid} />
            <Circle cx={CX} cy={CY} r={PR - 3} fill="none" stroke={C.lavender} strokeWidth={1.5} />

            {/* Compass rose (simplified) */}
            <Path d={`M ${CX},${CY - 14} L ${CX - 4},${CY - 4} L ${CX},${CY - 8} L ${CX + 4},${CY - 4} Z`} fill={C.noir} opacity={0.5} />
            <Path d={`M ${CX},${CY + 14} L ${CX - 4},${CY + 4} L ${CX},${CY + 8} L ${CX + 4},${CY + 4} Z`} fill={C.noir} opacity={0.5} />
            <Path d={`M ${CX - 14},${CY} L ${CX - 4},${CY - 4} L ${CX - 8},${CY} L ${CX - 4},${CY + 4} Z`} fill={C.noir} opacity={0.5} />
            <Path d={`M ${CX + 14},${CY} L ${CX + 4},${CY - 4} L ${CX + 8},${CY} L ${CX + 4},${CY + 4} Z`} fill={C.noir} opacity={0.5} />
            <Circle cx={CX} cy={CY} r={2.5} fill={C.lavender} />

            {/* Sidebar dividers */}
            <Line x1={SB} y1={20} x2={SB} y2={H - 20} stroke={C.border} strokeWidth={0.5} />
            <Line x1={W - SB} y1={20} x2={W - SB} y2={H - 20} stroke={C.border} strokeWidth={0.5} />
          </Svg>
        </View>

        {/* ── Left sidebar content ── */}
        <View style={[s.sb, s.sbContent]}>
          <Text style={s.sbTitle}>BLOOM Method</Text>
          {[
            ["B", "Bold Vision", "Transformative, purpose-driven goal anchored in your why."],
            ["L", "Legacy", "Lasting impact you choose to leave — across years and generations."],
            ["O", "Organic Growth", "Sustainable momentum through natural phases of development."],
            ["O", "Ownership", "Actionable milestones, weekly discipline, and measurable progress."],
            ["M", "Multiply", "Amplifying your impact — inspiring others, scaling outcomes."],
          ].map(([letter, name, desc]) => (
            <View key={letter + name} style={s.sbItem}>
              <Text style={s.sbKey}><Text style={{ color: C.lavender }}>{letter}</Text> — {name}</Text>
              <Text style={s.sbVal}>{desc}</Text>
            </View>
          ))}

          <View style={s.divider} />
          <Text style={s.sbTitle}>Logical Levels of Change</Text>
          {[
            ["Spirit / Purpose", "Why — your deepest reason"],
            ["Identity",         "Who you are becoming"],
            ["Beliefs & Values", "What you believe and hold dear"],
            ["Capabilities",     "How — your skills and strategies"],
            ["Behaviour",        "What you do day to day"],
            ["Environment",      "Where and when you act"],
          ].map(([level, sub]) => (
            <View key={level} style={s.sbItem}>
              <Text style={s.sbKey}>{level}</Text>
              <Text style={s.sbVal}>{sub}</Text>
            </View>
          ))}

          <View style={s.divider} />
          <Text style={s.sbVal}>Dominant Trait: <Text style={{ fontWeight: 700 }}>{dominantTrait}</Text></Text>
          <Text style={[s.sbVal, { marginTop: 3 }]}>Core Values:</Text>
          <Text style={s.sbVal}>{coreValues.join(" · ")}</Text>
        </View>

        {/* ── Right sidebar content ── */}
        <View style={[s.sbR, s.sbContent]}>
          <Text style={s.sbTitle}>SHIFT Framework</Text>
          {[
            ["S", "Spot the Block",        "Identify the limiting belief holding you back."],
            ["H", "Highlight the Impact",  "See how the block affects your life and goal."],
            ["I", "Investigate the Truth", "Question whether the belief is actually true."],
            ["F", "Flip the Script",       "Replace it with an empowering belief."],
            ["T", "Take Aligned Action",   "One small step that proves the new belief."],
          ].map(([letter, name, desc]) => (
            <View key={letter} style={s.sbItem}>
              <Text style={s.sbKey}><Text style={{ color: C.lavender }}>{letter}</Text> — {name}</Text>
              <Text style={s.sbVal}>{desc}</Text>
            </View>
          ))}

          <View style={s.divider} />
          <Text style={s.sbTitle}>Colour Legend</Text>
          {[
            [C.moss,      "Organic Growth"],
            [C.legacy,    "Legacy Building"],
            [C.ownership, "Ownership"],
            [C.lavender,  "Multiply Impact"],
            [C.orchid,    "Bold Vision"],
          ].map(([color, label]) => (
            <View key={label} style={s.legendRow}>
              <View style={[s.legendDot, { backgroundColor: color }]} />
              <Text style={s.legendTxt}>{label}</Text>
            </View>
          ))}
        </View>

        {/* ── Centre circle text ── */}
        <View
          style={[
            s.centre,
            { top: CY - PR + 10, left: CX - PR + 12, width: (PR - 12) * 2 },
          ]}
        >
          <Text style={s.cTitle}>Bold Vision</Text>
          <Text style={s.cVision}>{bvStatement}</Text>
        </View>

        {/* ── Top-left petal text: Organic Growth ── */}
        <View
          style={[
            s.petalLabel,
            { top: TL.y - 80, left: TL.x - 72, width: 144 },
          ]}
        >
          <Text style={[s.pLetter, { color: C.pearl }]}>O</Text>
          <Text style={[s.pTitle, { color: C.pearl }]}>Organic Growth</Text>
          <Text style={[s.pContent, { color: C.pearl }]}>{ogContent}</Text>
        </View>

        {/* ── Top-right petal text: Legacy ── */}
        <View
          style={[
            s.petalLabel,
            { top: TR.y - 80, left: TR.x - 72, width: 144 },
          ]}
        >
          <Text style={[s.pLetter, { color: C.noir }]}>L</Text>
          <Text style={[s.pTitle, { color: C.noir }]}>Legacy</Text>
          <Text style={[s.pContent, { color: C.noir }]}>{legContent}</Text>
        </View>

        {/* ── Bottom-right petal text: Ownership ── */}
        <View
          style={[
            s.petalLabel,
            { top: BR.y - 10, left: BR.x - 72, width: 144 },
          ]}
        >
          <Text style={[s.pLetter, { color: C.noir }]}>O</Text>
          <Text style={[s.pTitle, { color: C.noir }]}>Ownership</Text>
          <Text style={[s.pContent, { color: C.noir }]}>{owContent}</Text>
        </View>

        {/* ── Bottom-left petal text: Multiply Impact ── */}
        <View
          style={[
            s.petalLabel,
            { top: BL.y - 10, left: BL.x - 72, width: 144 },
          ]}
        >
          <Text style={[s.pLetter, { color: C.pearl }]}>M</Text>
          <Text style={[s.pTitle, { color: C.pearl }]}>Multiply Impact</Text>
          <Text style={[s.pContent, { color: C.pearl }]}>{miContent}</Text>
        </View>

        {/* ── Section content page 2 ── */}
      </Page>

      {/* Page 2: Full section content */}
      <Page size="A4" orientation="landscape" style={[s.page, { padding: 30 }]}>
        <Text style={{ fontSize: 16, fontWeight: 700, color: C.lavender, marginBottom: 4 }}>
          BLOOM Map — Full Section Content
        </Text>
        <Text style={{ fontSize: 8, color: C.noir, marginBottom: 18, opacity: 0.7 }}>
          Bold Vision: {trunc(boldVisionStatement, 200)}
        </Text>

        {([
          ["B — Bold Vision",    bvContent,  C.orchid],
          ["L — Legacy",        legContent, C.legacy],
          ["O — Organic Growth", ogContent, C.moss],
          ["O — Ownership",     owContent,  C.ownership],
          ["M — Multiply Impact",miContent, C.lavender],
        ] as [string, string, string][]).map(([title, content, color]) => (
          <View key={title} style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 3 }}>
              <View style={{ width: 4, height: 16, backgroundColor: color, marginRight: 6, borderRadius: 2 }} />
              <Text style={{ fontSize: 9, fontWeight: 700, color: C.noir }}>{title}</Text>
            </View>
            <Text style={{ fontSize: 7.5, color: C.noir, lineHeight: 1.5, paddingLeft: 10, opacity: 0.85 }}>
              {content || "—"}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default BloomMapPDF;
