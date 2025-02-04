import { Card } from "@/components/ui/card";

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
      extraversion: "Tendency to seek stimulation in the company of others",
      agreeableness: "Tendency to be compassionate and cooperative",
      conscientiousness: "Tendency to show self-discipline and aim for achievement",
      neuroticism: "Tendency to experience unpleasant emotions easily",
      openness: "Tendency to be open to experiencing a variety of activities",
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
    </div>
  );
};

export default ResultsDisplay;