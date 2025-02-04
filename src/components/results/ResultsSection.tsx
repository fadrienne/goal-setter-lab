import ResultsDisplay from "../ResultsDisplay";
import CoreValuesSelector from "../vision/CoreValuesSelector";
import { Button } from "../ui/button";
import { calculateTraitScore, calculateDominantTrait } from "@/utils/scoreCalculations";

interface ResultsSectionProps {
  answers: Record<number, number>;
  questions: any[];
  selectedValues: string[];
  onValueSelection: (value: string) => void;
  onComplete: () => void;
}

const ResultsSection = ({ 
  answers, 
  questions, 
  selectedValues, 
  onValueSelection, 
  onComplete 
}: ResultsSectionProps) => {
  const traitScores = ["extraversion", "agreeableness", "conscientiousness", "neuroticism", "openness"].map(trait => ({
    trait,
    score: calculateTraitScore(questions, answers, trait)
  }));

  return (
    <div className="space-y-8">
      <ResultsDisplay 
        traitScores={traitScores} 
        dominantTrait={calculateDominantTrait(questions, answers)} 
      />
      <div className="mt-8">
        <CoreValuesSelector
          selectedValues={selectedValues}
          onValueSelection={onValueSelection}
        />
        <div className="mt-4 text-center">
          <Button
            onClick={onComplete}
            disabled={selectedValues.length !== 3}
            variant="default"
          >
            Continue to Vision Planning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;