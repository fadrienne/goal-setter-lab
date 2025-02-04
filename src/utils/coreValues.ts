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

const generateSmartGoal = (
  selectedAreas: string[],
  personalityTrait: string,
  selectedValues: string[],
  strategies: string[]
): SmartGoal => {
  const primaryArea = selectedAreas[0];
  const primaryValue = selectedValues[0];
  const strategy = strategies[0];

  return {
    specific: `Develop expertise in ${primaryArea} by implementing ${strategy.toLowerCase()} while embodying ${primaryValue}`,
    measurable: `Track progress through quarterly assessments and milestone achievements in ${primaryArea}, with specific metrics defined for each development phase`,
    achievable: `Leverage your ${personalityTrait} strengths to systematically work through challenges and build competency in ${primaryArea}`,
    relevant: `Align personal growth in ${primaryArea} with core values of ${selectedValues.join(", ")}, creating meaningful impact`,
    timeBound: "Establish clear milestones for each year, with major achievements planned for years 1, 3, and 5"
  };
};

const generateAreaSpecificGoal = (
  area: string,
  year: number,
  personalityTrait: string,
  values: string[]
): string => {
  const goalsByArea: { [key: string]: string[] } = {
    "Career Growth": [
      "Develop foundational skills and establish professional network",
      "Take on leadership responsibilities and mentor others",
      "Expand influence within industry and contribute to thought leadership",
      "Build cross-functional expertise and lead major initiatives",
      "Achieve senior position and create industry impact"
    ],
    "Personal Development": [
      "Establish daily personal growth routines and habits",
      "Master key soft skills and emotional intelligence",
      "Develop mentorship capabilities and share knowledge",
      "Create personal development frameworks for others",
      "Become a recognized authority in personal growth"
    ],
    "Relationships": [
      "Build meaningful connections in professional and personal spheres",
      "Strengthen existing relationships and expand network",
      "Develop leadership presence and influence",
      "Create lasting impact through relationship building",
      "Establish legacy through mentorship and guidance"
    ],
    "Health & Wellness": [
      "Establish consistent health and wellness routines",
      "Achieve specific fitness and wellness goals",
      "Maintain work-life balance and stress management",
      "Share wellness journey and inspire others",
      "Create sustainable long-term health practices"
    ],
    "Financial Goals": [
      "Create solid financial foundation and planning",
      "Achieve key investment and savings milestones",
      "Expand financial portfolio and opportunities",
      "Build wealth and create passive income streams",
      "Achieve financial independence and security"
    ],
    "Learning & Education": [
      "Master fundamental skills and knowledge base",
      "Obtain advanced certifications or education",
      "Develop expertise in specialized areas",
      "Share knowledge through teaching or publishing",
      "Become recognized expert in chosen field"
    ],
    "Community Impact": [
      "Identify community needs and engagement opportunities",
      "Lead community initiatives and projects",
      "Create sustainable community programs",
      "Expand impact to broader communities",
      "Establish lasting community legacy"
    ],
    "Creative Expression": [
      "Develop creative skills and establish style",
      "Create portfolio of creative works",
      "Share creativity through collaborations",
      "Mentor others in creative pursuits",
      "Achieve recognition for creative contributions"
    ]
  };

  return goalsByArea[area]?.[year - 1] || 
    `Advance in ${area} through focused development and application of ${values[0]}`;
};

export const generateVisionPlan = (
  selectedAreas: string[],
  personalityTrait: string,
  strategies: string[],
  developmentAreas: string[],
  selectedValues: string[]
): VisionPlan => {
  const smartGoal = generateSmartGoal(selectedAreas, personalityTrait, selectedValues, strategies);

  const vision = `As a ${personalityTrait}-oriented individual guided by ${selectedValues.join(", ")}, 
    your journey will focus on mastering ${selectedAreas[0]}, while developing expertise in 
    ${selectedAreas.slice(1).join(" and ")}. Through strategic application of your strengths 
    and continuous growth, you'll create lasting impact in these areas while staying true to your values.`;

  const milestones: YearlyMilestone[] = Array.from({ length: 5 }, (_, i) => ({
    year: i + 1,
    goals: selectedAreas.map(area => 
      generateAreaSpecificGoal(area, i + 1, personalityTrait, selectedValues)
    )
  }));

  return {
    coreValues: selectedValues,
    smartGoal,
    fiveYearVision: vision,
    yearlyMilestones: milestones
  };
};