import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { type VisionPlan } from '@/utils/coreValues';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#2563eb',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2563eb',
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 1.5,
  },
  smartSection: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f3f4f6',
  },
  milestone: {
    marginBottom: 15,
  },
});

interface VisionPlanPDFProps {
  visionPlan: VisionPlan;
}

const VisionPlanPDF = ({ visionPlan }: VisionPlanPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Your SMART Goal</Text>
        <View style={styles.smartSection}>
          <Text style={styles.text}>Specific: {visionPlan.smartGoal.specific}</Text>
          <Text style={styles.text}>Measurable: {visionPlan.smartGoal.measurable}</Text>
          <Text style={styles.text}>Achievable: {visionPlan.smartGoal.achievable}</Text>
          <Text style={styles.text}>Relevant: {visionPlan.smartGoal.relevant}</Text>
          <Text style={styles.text}>Time-Bound: {visionPlan.smartGoal.timeBound}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Your 5-Year Vision</Text>
        <Text style={styles.text}>{visionPlan.fiveYearVision}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Yearly Milestones</Text>
        {visionPlan.yearlyMilestones.map((milestone) => (
          <View key={milestone.year} style={styles.milestone}>
            <Text style={styles.text}>Year {milestone.year}:</Text>
            {milestone.goals.map((goal, index) => (
              <Text key={index} style={styles.text}>• {goal}</Text>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default VisionPlanPDF;