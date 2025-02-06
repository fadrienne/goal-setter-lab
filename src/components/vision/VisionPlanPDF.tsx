import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { type VisionPlan } from '@/utils/coreValues';
import { personalityGoals } from '@/utils/personalityGoals';

// Register Montserrat font for PDF
Font.register({
  family: 'Montserrat',
  src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXp-p7K4KLg.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Montserrat',
    backgroundColor: '#F0F4F8', // matches accent color
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#6B4E71', // matches primary color
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#6B4E71', // matches primary color
    fontWeight: 'medium',
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 1.5,
    color: '#1A1A1A', // matches accent-foreground
  },
  smartSection: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F0F4F8', // matches accent color
    borderRadius: 4,
  },
  milestone: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F0F4F8', // matches accent color
    borderRadius: 4,
  },
  traitScore: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#F0F4F8', // matches accent color
    borderRadius: 4,
  },
  coreValues: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F0F4F8', // matches accent color
    borderRadius: 4,
  },
  goalSection: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F0F4F8', // matches accent color
    borderRadius: 4,
  },
  bullet: {
    color: '#6B4E71', // matches primary color
    marginRight: 5,
  },
});

interface VisionPlanPDFProps {
  visionPlan: VisionPlan;
  developmentArea: string;
  traitScores: {
    trait: string;
    score: number;
  }[];
  dominantTrait: {
    trait: string;
    score: number;
  };
}

const VisionPlanPDF = ({ visionPlan, developmentArea, traitScores = [], dominantTrait }: VisionPlanPDFProps) => {
  const personalityGoalFramework = personalityGoals.find(g => g.trait === dominantTrait.trait);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Your Personality Profile</Text>
          <Text style={styles.text}>
            Your dominant trait is {dominantTrait?.trait?.charAt(0).toUpperCase() + dominantTrait?.trait?.slice(1)} with a score of {dominantTrait?.score}
          </Text>
          {traitScores?.map((score) => (
            <View key={score.trait} style={styles.traitScore}>
              <Text style={styles.text}>
                {score.trait.charAt(0).toUpperCase() + score.trait.slice(1)}: {score.score}/5
              </Text>
            </View>
          ))}
        </View>

        {personalityGoalFramework && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>{personalityGoalFramework.title}</Text>
            <Text style={styles.text}>{personalityGoalFramework.description}</Text>
            
            <View style={styles.goalSection}>
              <Text style={styles.text}>Short-Term Goals:</Text>
              {personalityGoalFramework.shortTermGoals.map((goal, index) => (
                <Text key={index} style={styles.text}><Text style={styles.bullet}>•</Text> {goal}</Text>
              ))}
            </View>
            
            <View style={styles.goalSection}>
              <Text style={styles.text}>Long-Term Strategies:</Text>
              {personalityGoalFramework.longTermStrategies.map((strategy, index) => (
                <Text key={index} style={styles.text}><Text style={styles.bullet}>•</Text> {strategy}</Text>
              ))}
            </View>
            
            <View style={styles.goalSection}>
              <Text style={styles.text}>Areas for Development:</Text>
              {personalityGoalFramework.developmentAreas.map((area, index) => (
                <Text key={index} style={styles.text}><Text style={styles.bullet}>•</Text> {area}</Text>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.title}>Your Core Values</Text>
          <View style={styles.coreValues}>
            {visionPlan.coreValues?.map((value, index) => (
              <Text key={index} style={styles.text}><Text style={styles.bullet}>•</Text> {value}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Your {developmentArea} SMART Goal</Text>
          <View style={styles.smartSection}>
            <Text style={styles.text}>Specific: {visionPlan.smartGoal.specific}</Text>
            <Text style={styles.text}>Measurable: {visionPlan.smartGoal.measurable}</Text>
            <Text style={styles.text}>Achievable: {visionPlan.smartGoal.achievable}</Text>
            <Text style={styles.text}>Relevant: {visionPlan.smartGoal.relevant}</Text>
            <Text style={styles.text}>Time-Bound: {visionPlan.smartGoal.timeBound}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Your {developmentArea} 5-Year Vision</Text>
          <Text style={styles.text}>{visionPlan.fiveYearVision}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Yearly Milestones</Text>
          {visionPlan.yearlyMilestones.map((milestone) => (
            <View key={milestone.year} style={styles.milestone}>
              <Text style={styles.text}>Year {milestone.year}:</Text>
              {milestone.goals.map((goal, index) => (
                <Text key={index} style={styles.text}><Text style={styles.bullet}>•</Text> {goal}</Text>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default VisionPlanPDF;