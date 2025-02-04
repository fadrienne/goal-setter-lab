import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { coreValues, generateVisionPlan, type VisionPlan } from "@/utils/coreValues";
import { personalityGoals } from "@/utils/personalityGoals";

interface VisionPlannerProps {
  selectedAreas: string[];
  dominantTrait: {
    trait: string;
    score: number;
  };
}

const VisionPlanner = ({ selectedAreas, dominantTrait }: VisionPlannerProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [visionPlan, setVisionPlan] = useState<VisionPlan | null>(null);

  const handleValueSelection = (value: string) => {
    setSelectedValues(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, value];
    });
  };

  const generatePlan = () => {
    const framework = personalityGoals.find(g => g.trait === dominantTrait.trait);
    if (!framework) return;

    const plan = generateVisionPlan(
      selectedAreas,
      dominantTrait.trait,
      framework.longTermStrategies,
      framework.developmentAreas,
      selectedValues
    );
    setVisionPlan(plan);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {!visionPlan ? (
        <Card>
          <CardHeader>
            <CardTitle>Select Your Core Values</CardTitle>
            <CardDescription>
              Choose 3 values that resonate most with your personal and professional aspirations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coreValues.map((value) => (
                <div key={value} className="flex items-center space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id={value}
                    checked={selectedValues.includes(value)}
                    onCheckedChange={() => handleValueSelection(value)}
                    disabled={selectedValues.length >= 3 && !selectedValues.includes(value)}
                  />
                  <label
                    htmlFor={value}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {value}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button
                onClick={generatePlan}
                disabled={selectedValues.length !== 3}
                className="bg-primary hover:bg-primary/90"
              >
                Generate Your Vision Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
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
              onClick={() => setVisionPlan(null)}
              className="bg-secondary hover:bg-secondary/90"
            >
              Start Over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisionPlanner;