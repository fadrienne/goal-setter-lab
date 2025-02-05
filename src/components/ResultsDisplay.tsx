import { Card } from "@/components/ui/card";
import GoalFramework from "./GoalFramework";

interface TraitScore {
  trait: string;
  score: number;
}

interface ResultsDisplayProps {
  traitScores: TraitScore[];
  dominantTrait: TraitScore;
}

const ResultsDisplay = ({ traitScores, dominantTrait }: ResultsDisplayProps) => {
  const getTraitDescription = (trait: string) => {
    const descriptions: Record<string, string> = {
    extraversion: "A preference for social engagement, excitement, and external stimulation.",
    agreeableness: "A disposition toward kindness, empathy, and cooperation in relationships.",
    conscientiousness: "A strong sense of responsibility, organization, and goal-oriented behavior.",
    neuroticism: "A tendency toward emotional sensitivity, stress, and mood fluctuations.",
    openness: "A curiosity for new experiences, creativity, and a broad range of interests.",
    };
    return descriptions[trait] || trait;
  };

  return (
    <div className="space-y-8 text-center">
      <Card className="p-6 bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-primary mb-4">Your Personality Profile</h2>
        <p className="text-lg mb-6">
          Your dominant trait is{" "}
          <span className="font-bold text-primary">
            {dominantTrait.trait.charAt(0).toUpperCase() + dominantTrait.trait.slice(1)}
          </span>{" "}
          with a score of {dominantTrait.score}
        </p>
        
        <div className="space-y-4">
          {traitScores.map((traitScore) => (
            <div key={traitScore.trait} className="text-center">
              <h3 className="font-semibold text-lg capitalize">
                {traitScore.trait}
              </h3>
              <p className="text-gray-600 mb-2">
                {getTraitDescription(traitScore.trait)}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(traitScore.score / 5) * 100}%` }}
                ></div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Score: {traitScore.score}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <GoalFramework trait={dominantTrait.trait} />
    </div>
  );
};

export default ResultsDisplay;
