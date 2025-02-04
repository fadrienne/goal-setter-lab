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

export const generateVisionPlan = (
  selectedAreas: string[],
  personalityTrait: string,
  strategies: string[],
  developmentAreas: string[],
  selectedValues: string[]
): VisionPlan => {
  // This is a simplified example of dynamic goal generation
  // In a real implementation, you might want to use more sophisticated logic or AI
  const smartGoal: SmartGoal = {
    specific: `Develop expertise in ${selectedAreas[0]} while incorporating ${selectedValues[0]}`,
    measurable: `Achieve 3 major milestones in ${selectedAreas[0]} annually`,
    achievable: `Leverage ${personalityTrait} strengths to overcome challenges`,
    relevant: `Align with core values of ${selectedValues.join(", ")}`,
    timeBound: "Complete within 5 years with annual checkpoints"
  };

  const vision = `Building on your ${personalityTrait} nature and core values of ${selectedValues.join(", ")}, 
    you will become a recognized leader in ${selectedAreas[0]}, while maintaining balance in ${selectedAreas[1]} 
    and contributing to ${selectedAreas[2]}.`;

  const milestones = Array.from({ length: 5 }, (_, i) => ({
    year: i + 1,
    goals: [
      `Year ${i + 1}: ${strategies[i % strategies.length]}`,
      `Year ${i + 1}: Focus on ${developmentAreas[i % developmentAreas.length]}`,
      `Year ${i + 1}: Advance in ${selectedAreas[i % selectedAreas.length]}`
    ]
  }));

  return {
    coreValues: selectedValues,
    smartGoal,
    fiveYearVision: vision,
    yearlyMilestones: milestones
  };
};