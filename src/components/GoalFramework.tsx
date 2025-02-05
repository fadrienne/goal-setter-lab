import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { personalityGoals } from "@/utils/personalityGoals";

interface GoalFrameworkProps {
  trait: string;
}

const GoalFramework = ({ trait }: GoalFrameworkProps) => {
  const framework = personalityGoals.find(g => g.trait === trait);

  if (!framework) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>{framework.title}</CardTitle>
          <CardDescription>{framework.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Short-Term Goals</h3>
              <ul className="pl-5 space-y-2">
                {framework.shortTermGoals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Long-Term Strategies</h3>
              <ul className="pl-5 space-y-2">
                {framework.longTermStrategies.map((strategy, index) => (
                  <li key={index}>{strategy}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Areas for Development</h3>
              <ul className="pl-5 space-y-2">
                {framework.developmentAreas.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalFramework;