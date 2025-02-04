import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import GoalFramework from "./GoalFramework";

interface ResultsDisplayProps {
  traitScores: {
    trait: string;
    score: number;
  }[];
  dominantTrait: {
    trait: string;
    score: number;
  };
}

const ResultsDisplay = ({ traitScores, dominantTrait }: ResultsDisplayProps) => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <Card className="animate-fade-in">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Your Personality Profile</h2>
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Your Dominant Trait</h3>
              <p className="text-lg text-primary capitalize">{dominantTrait.trait}</p>
            </div>
            <div className="grid gap-4">
              {traitScores.map((score) => (
                <div key={score.trait} className="p-4 bg-accent rounded-lg">
                  <h3 className="font-semibold mb-2 capitalize">
                    {score.trait}: {score.score}/5
                  </h3>
                  <Progress value={score.score * 20} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Your Personal Development Framework</h2>
        <GoalFramework trait={dominantTrait.trait} />
      </div>
    </div>
  );
};

export default ResultsDisplay;