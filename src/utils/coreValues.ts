export const coreValues = [
  "Achievement",
  "Balance",
  "Creativity",
  "Growth",
  "Impact",
  "Innovation",
  "Integrity",
  "Leadership",
  "Learning",
  "Purpose",
  "Resilience",
  "Service",
  "Teamwork",
  "Wellness",
  "Wisdom"
];

export interface SmartGoal {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}

export interface YearlyMilestone {
  year: number;
  goals: string[];
}

export interface VisionPlan {
  coreValues: string[];
  smartGoal: SmartGoal;
  fiveYearVision: string;
  yearlyMilestones: YearlyMilestone[];
}