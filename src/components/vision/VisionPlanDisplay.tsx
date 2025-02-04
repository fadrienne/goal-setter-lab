import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VisionPlan } from "@/utils/coreValues";

interface VisionPlanDisplayProps {
  visionPlan: VisionPlan;
  onStartOver: () => void;
}

const VisionPlanDisplay = ({ visionPlan, onStartOver }: VisionPlanDisplayProps) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your SMART Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Specific</h4>
              <p>{visionPlan.smartGoal.specific}</p>
            </div>
            <div>
              <h4 className="font-semibold">Measurable</h4>
              <p>{visionPlan.smartGoal.measurable}</p>
            </div>
            <div>
              <h4 className="font-semibold">Achievable</h4>
              <p>{visionPlan.smartGoal.achievable}</p>
            </div>
            <div>
              <h4 className="font-semibold">Relevant</h4>
              <p>{visionPlan.smartGoal.relevant}</p>
            </div>
            <div>
              <h4 className="font-semibold">Time-Bound</h4>
              <p>{visionPlan.smartGoal.timeBound}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your 5-Year Vision</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-8">{visionPlan.fiveYearVision}</p>
          
          <div className="space-y-6">
            {visionPlan.yearlyMilestones.map((milestone) => (
              <div key={milestone.year} className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold mb-2">Year {milestone.year}</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {milestone.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={onStartOver}
          className="bg-secondary hover:bg-secondary/90"
        >
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default VisionPlanDisplay;