export interface BloomSectionAnswer {
  question: string;
  answer: string;
}

export interface BloomSectionData {
  answers: BloomSectionAnswer[];
  generatedContent: string;
  confirmedContent: string;
  isConfirmed: boolean;
}

export const emptySection = (): BloomSectionData => ({
  answers: [],
  generatedContent: "",
  confirmedContent: "",
  isConfirmed: false,
});

export interface BloomMapData {
  boldVision: BloomSectionData;
  legacy: BloomSectionData;
  organicGrowth: BloomSectionData;
  ownership: BloomSectionData;
  multiplyImpact: BloomSectionData;
}

export type BloomSectionKey = keyof BloomMapData;

export const BLOOM_SECTION_META: {
  key: BloomSectionKey;
  label: string;
  fullLabel: string;
  letter: string;
  color: string;
  textColor: string;
}[] = [
  { key: "boldVision",    label: "Bold Vision",    fullLabel: "B — Bold Vision",    letter: "B", color: "#DED2CD", textColor: "#4D4A56" },
  { key: "legacy",        label: "Legacy",          fullLabel: "L — Legacy Building", letter: "L", color: "#E8A898", textColor: "#4D4A56" },
  { key: "organicGrowth", label: "Organic Growth",  fullLabel: "O — Organic Growth",  letter: "O", color: "#AAA488", textColor: "#FAF8F8" },
  { key: "ownership",     label: "Ownership",       fullLabel: "O — Ownership",       letter: "O", color: "#C8C4BC", textColor: "#4D4A56" },
  { key: "multiplyImpact",label: "Multiply Impact", fullLabel: "M — Multiply Impact", letter: "M", color: "#988183", textColor: "#FAF8F8" },
];

export const BLOOM_QUESTIONS: Record<BloomSectionKey, string[]> = {
  boldVision: [
    "Why does this goal matter to you? What is the deeper meaning behind it?",
    "How does this goal align with your three core values?",
    "Describe your current state. Now describe the bold transformation — where does this goal take you?",
    "What bigger personal impact could achieving this goal create?",
    "What professional impact could this create?",
    "What social or environmental impact could this create?",
    "How can you push beyond the initial scope of this goal?",
    "Where does your current comfort zone end? How does this goal challenge it?",
    "What scares you about this goal?",
    "What excites you about this goal?",
  ],
  legacy: [
    "How does this goal contribute to long-term impact? What do you expect within the first year?",
    "What impact do you expect within 5 years?",
    "What impact do you envision in 10 or more years?",
    "What lasting change or benefit will endure as a result of this goal?",
    "What generational value do you want to create? What legacy do you want to leave?",
  ],
  organicGrowth: [
    "What is the natural development cycle for this goal? What is your focus in Year 1–2 (Seed & Sprout phase)?",
    "What are your goals for Year 2–3 (Grow phase)?",
    "How will growth peak in Year 3–4 (Flourish phase)?",
    "How will you multiply impact in Year 4–5 (Multiply phase)?",
    "What learning objectives do you want to build into each phase?",
    "What skills do you need to develop?",
    "What knowledge resources and tools do you need?",
    "Who or what support do you need to sustain progress?",
  ],
  ownership: [
    "What are your 3 major milestones for this goal?",
    "What will you focus on Month by Month from Month 1 through Month 12? Describe your monthly focus areas.",
    "What will your weekly actions look like Monday through Friday?",
    "What key metrics will you track to measure progress?",
    "What is your weekly review day and accountability commitment to yourself?",
  ],
  multiplyImpact: [
    "What success stories do you want to share as you progress?",
    "What key learnings will you communicate to others?",
    "How can this goal inspire others?",
    "What collaborative opportunities exist?",
    "Who are your potential partners and what could they contribute?",
    "What financial, human, or technical resources do you need?",
    "How will you multiply the positive outcomes of this goal?",
    "Write your enhanced goal statement that reflects the full amplified impact of this journey.",
  ],
};

export const SHIFT_STEPS = [
  { key: "S", label: "Spot the Block",       prompt: "What limiting belief or block is holding you back right now?" },
  { key: "H", label: "Highlight the Impact", prompt: "How is this block affecting your life and this goal?" },
  { key: "I", label: "Investigate the Truth",prompt: "Is this belief actually true? What evidence contradicts it?" },
  { key: "F", label: "Flip the Script",      prompt: "Replace this belief with an empowering one. Write it here." },
  { key: "T", label: "Take Aligned Action",  prompt: "What one small action will you take right now to prove the new belief?" },
];
