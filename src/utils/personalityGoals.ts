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
    title: "Amplify Your Impact Through People and Presence",
    description: "You gain energy from connection and shine in collaborative environments. Your superpower is rallying others — use it to lead, inspire, and create ripple effects at scale.",
    shortTermGoals: [
      "Volunteer for a public-facing project or speaking slot in the next 30 days",
      "Build a deliberate follow-up habit after networking events to turn contacts into relationships",
      "Identify two people in your circle to actively sponsor or champion this quarter"
    ],
    longTermStrategies: [
      "Develop a signature talk or workshop that positions you as a recognized thought leader in your field",
      "Build a personal board of advisors who complement your social strengths with analytical depth",
      "Create a recurring community event or mastermind group that you convene and lead"
    ],
    developmentAreas: [
      "Active listening — aim for 70% listening in conversations for one week and notice what shifts",
      "Solo reflection — carve out weekly quiet time to convert outward energy into inward direction",
      "Reading the room — practice recognizing when individual rapport outperforms group energy"
    ]
  },
  {
    trait: "agreeableness",
    title: "Lead Through Empathy and Deepen What Matters",
    description: "Your warmth and attunement to others make you a natural connector and trusted confidant. Your next level is channeling that care into bold advocacy — for others and for yourself.",
    shortTermGoals: [
      "Have one courageous conversation you've been avoiding — state your need or perspective clearly",
      "Offer structured, specific feedback to a colleague instead of only encouragement",
      "Map the three relationships most central to your goals and schedule intentional time with each"
    ],
    longTermStrategies: [
      "Develop facilitation skills to guide groups through conflict and reach consensus with authority",
      "Build a mentorship ecosystem — both mentoring others and seeking mentors for your own growth gaps",
      "Pursue a role where empathetic leadership is the core value-add, not a nice-to-have"
    ],
    developmentAreas: [
      "Assertiveness — practice stating preferences or limits directly without over-explaining or apologizing",
      "Strategic boundary-setting — identify which yeses are quietly depleting your most important priorities",
      "Decision confidence — make three small decisions per week without seeking consensus first"
    ]
  },
  {
    trait: "conscientiousness",
    title: "Execute with Precision and Build Systems That Last",
    description: "You are defined by follow-through, high standards, and the discipline to do what others won't. Your edge is making complex things reliable — now leverage that for impact beyond yourself.",
    shortTermGoals: [
      "Design a weekly review ritual that tracks your top three priorities against measurable outcomes",
      "Document one informal process in your work or life into a replicable, teachable system",
      "Block protected time for a single high-leverage project for 30 consecutive days"
    ],
    longTermStrategies: [
      "Build a reputation as the person who ships — deliver one high-visibility project end-to-end with distinction",
      "Develop mastery in one domain through deliberate practice and pursue external recognition or credentials",
      "Learn to hand off a defined system to others, then iterate based on the results they produce"
    ],
    developmentAreas: [
      "Flexibility — practice adjusting a plan mid-course without treating the revision as failure",
      "Perfectionism management — define 'done' explicitly before you start, then stop when you reach it",
      "Delegation — identify one recurring task to hand off completely this month and resist taking it back"
    ]
  },
  {
    trait: "neuroticism",
    title: "Transform Sensitivity Into Strength and Build Unshakeable Resilience",
    description: "Your emotional attunement is a form of intelligence — it lets you sense what others miss. The work is regulating your nervous system so that depth becomes a superpower, not a liability.",
    shortTermGoals: [
      "Establish a daily ten-minute grounding practice (breathwork, journaling, or movement) and maintain it for 21 days",
      "Name your three most common stress triggers and write a pre-planned response to each",
      "Build one relationship where you can process emotions openly, without fear of judgment"
    ],
    longTermStrategies: [
      "Develop deep emotional literacy — learn to distinguish anxiety from excitement, frustration from signal",
      "Build a robust support infrastructure (therapist, coach, or peer circle) before you need it under pressure",
      "Turn emotional data into insight: journal patterns monthly and extract one actionable lesson per entry"
    ],
    developmentAreas: [
      "Distress tolerance — build a menu of go-to practices for acute stress so you have them ready before crisis",
      "Cognitive reframing — practice questioning catastrophic self-talk with specific evidence and alternative explanations",
      "Recovery routines — design a post-difficulty ritual that helps you reset rather than ruminate"
    ]
  },
  {
    trait: "openness",
    title: "Pioneer New Ideas and Build a Life That Reflects Your Full Range",
    description: "You are energized by possibility, the collision of ideas, and the edges of what's known. Your challenge — and your growth — is directing that expansive curiosity toward outcomes that actually endure.",
    shortTermGoals: [
      "Pick one unexplored domain and commit to a 30-day learning sprint: a course, a book, a hands-on project",
      "Generate ten wild ideas for a challenge you're facing, then filter ruthlessly to the top two and test one",
      "Start a creative project with no requirement for perfection — ship something small and study what you learn"
    ],
    longTermStrategies: [
      "Build a personal innovation framework: a repeatable path from raw idea to tested prototype to delivered result",
      "Develop a habit of synthesizing across fields — read widely, write regularly, and connect what others keep separate",
      "Find one domain where your cross-disciplinary thinking gives you genuine edge, then invest deeply in it"
    ],
    developmentAreas: [
      "Follow-through — commit to finishing one idea per quarter before launching the next one",
      "Prioritization — with unlimited curiosity and finite time, practice saying no to good ideas so the great ones can land",
      "Implementation discipline — pair your creative vision with a concrete planning method that gets things actually built"
    ]
  }
];
