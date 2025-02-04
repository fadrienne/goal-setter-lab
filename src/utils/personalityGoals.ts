interface GoalFramework {
  trait: string;
  title: string;
  description: string;
  shortTermGoals: string[];
  longTermStrategies: string[];
  developmentAreas: string[];
}

export const personalityGoals: GoalFramework[] = [
  {
    trait: "extraversion",
    title: "Social Impact & Leadership Path",
    description: "Leverage your natural social energy and leadership potential to create meaningful connections and influence positive change.",
    shortTermGoals: [
      "Join or start a community group in your area of interest",
      "Practice public speaking through local events or clubs",
      "Initiate conversations with new people daily"
    ],
    longTermStrategies: [
      "Develop leadership skills through mentorship programs",
      "Build a network in your professional field",
      "Create platforms for social interaction and community building"
    ],
    developmentAreas: [
      "Active listening skills",
      "One-on-one relationship building",
      "Balancing social energy with quiet reflection"
    ]
  },
  {
    trait: "agreeableness",
    title: "Community Building & Support Framework",
    description: "Channel your natural empathy and cooperation skills to foster harmony and support in your community.",
    shortTermGoals: [
      "Volunteer for local charitable organizations",
      "Mediate conflicts in your personal or professional life",
      "Practice setting healthy boundaries while maintaining relationships"
    ],
    longTermStrategies: [
      "Develop counseling or mentoring skills",
      "Create support systems in your community",
      "Build collaborative projects that benefit others"
    ],
    developmentAreas: [
      "Assertiveness in challenging situations",
      "Self-advocacy skills",
      "Balance between helping others and self-care"
    ]
  },
  {
    trait: "conscientiousness",
    title: "Achievement & Organization Blueprint",
    description: "Utilize your natural planning and detail-oriented abilities to create structured paths to success.",
    shortTermGoals: [
      "Create detailed action plans for your projects",
      "Implement productivity systems",
      "Set and track measurable goals weekly"
    ],
    longTermStrategies: [
      "Develop project management expertise",
      "Create systems for continuous improvement",
      "Build a reputation for reliability and excellence"
    ],
    developmentAreas: [
      "Flexibility in unexpected situations",
      "Delegating tasks to others",
      "Balancing perfectionism with efficiency"
    ]
  },
  {
    trait: "neuroticism",
    title: "Emotional Intelligence & Resilience Path",
    description: "Transform your emotional sensitivity into emotional intelligence and develop strong coping mechanisms.",
    shortTermGoals: [
      "Practice daily mindfulness or meditation",
      "Keep an emotion journal",
      "Learn stress management techniques"
    ],
    longTermStrategies: [
      "Develop emotional awareness and regulation skills",
      "Build resilience through gradual exposure to challenges",
      "Create support systems for emotional well-being"
    ],
    developmentAreas: [
      "Stress management",
      "Positive self-talk",
      "Building emotional resilience"
    ]
  },
  {
    trait: "openness",
    title: "Innovation & Creative Expression Framework",
    description: "Harness your natural curiosity and creativity to explore new possibilities and generate innovative solutions.",
    shortTermGoals: [
      "Learn a new skill or hobby monthly",
      "Explore different cultural perspectives",
      "Start a creative project"
    ],
    longTermStrategies: [
      "Develop expertise in multiple domains",
      "Create innovative solutions to complex problems",
      "Build bridges between different fields or communities"
    ],
    developmentAreas: [
      "Following through on projects",
      "Practical application of ideas",
      "Balancing exploration with focus"
    ]
  }
];