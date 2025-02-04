interface PersonalityGoal {
  trait: string;
  title: string;
  description: string;
  shortTermGoals: string[];
  longTermStrategies: string[];
  developmentAreas: string[];
}

export const personalityGoals: PersonalityGoal[] = [
  {
    trait: "extraversion",
    title: "Social Impact & Leadership Development",
    description: "Leverage your natural social energy to build connections and lead others.",
    shortTermGoals: [
      "Join or lead a professional networking group",
      "Take on speaking opportunities",
      "Mentor junior colleagues"
    ],
    longTermStrategies: [
      "Build a strong professional network",
      "Develop leadership presence",
      "Create collaborative initiatives"
    ],
    developmentAreas: [
      "Active listening skills",
      "One-on-one relationship building",
      "Strategic influence"
    ]
  },
  {
    trait: "agreeableness",
    title: "Collaborative Growth & Team Harmony",
    description: "Use your empathy and cooperation skills to build strong relationships and foster team success.",
    shortTermGoals: [
      "Facilitate team building activities",
      "Mediate conflicts constructively",
      "Create inclusive team environments"
    ],
    longTermStrategies: [
      "Develop conflict resolution expertise",
      "Build consensus-driven leadership skills",
      "Foster psychological safety in teams"
    ],
    developmentAreas: [
      "Assertiveness in communication",
      "Setting healthy boundaries",
      "Decision-making confidence"
    ]
  },
  {
    trait: "conscientiousness",
    title: "Strategic Excellence & Process Optimization",
    description: "Channel your detail-oriented nature into achieving high-quality results and improving systems.",
    shortTermGoals: [
      "Implement personal productivity systems",
      "Create detailed action plans",
      "Establish quality control measures"
    ],
    longTermStrategies: [
      "Develop project management expertise",
      "Build systems thinking capabilities",
      "Master time management"
    ],
    developmentAreas: [
      "Flexibility in approaches",
      "Delegating effectively",
      "Managing perfectionism"
    ]
  },
  {
    trait: "neuroticism",
    title: "Emotional Intelligence & Resilience Building",
    description: "Transform emotional sensitivity into emotional intelligence and build stress management skills.",
    shortTermGoals: [
      "Practice daily mindfulness",
      "Develop stress management techniques",
      "Build emotional awareness"
    ],
    longTermStrategies: [
      "Master emotional regulation",
      "Develop resilience practices",
      "Build strong support systems"
    ],
    developmentAreas: [
      "Stress tolerance",
      "Positive self-talk",
      "Work-life balance"
    ]
  },
  {
    trait: "openness",
    title: "Innovation & Creative Leadership",
    description: "Harness your creativity and curiosity to drive innovation and explore new possibilities.",
    shortTermGoals: [
      "Explore new methodologies",
      "Lead innovation initiatives",
      "Develop creative problem-solving skills"
    ],
    longTermStrategies: [
      "Build innovation frameworks",
      "Develop thought leadership",
      "Create learning cultures"
    ],
    developmentAreas: [
      "Implementation focus",
      "Practical application",
      "Structure and routine"
    ]
  }
];