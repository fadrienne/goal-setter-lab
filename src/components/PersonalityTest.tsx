import { useState } from "react";
import { useQuestions } from "@/hooks/useQuestions";
import PersonalityTestSection from "./test/PersonalityTestSection";
import ResultsSection from "./results/ResultsSection";
import VisionPlanner from "./VisionPlanner";
import { calculateDominantTrait } from "@/utils/scoreCalculations";

const PersonalityTest = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showVisionPlanner, setShowVisionPlanner] = useState(false);
  const questions = useQuestions();

  const handleTestComplete = (testAnswers: Record<number, number>) => {
    setAnswers(testAnswers);
    setIsComplete(true);
  };

  const handleValueSelection = (value: string) => {
    setSelectedValues(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      }
      if (prev.length < 3) {
        return [...prev, value];
      }
      return prev;
    });
  };

  const handleCoreValuesComplete = () => {
    if (selectedValues.length === 3) {
      setShowVisionPlanner(true);
    }
  };

  if (showVisionPlanner) {
    const dominantTrait = calculateDominantTrait(questions, answers);
    return (
      <VisionPlanner 
        selectedAreas={["Career Growth", "Personal Development"]} 
        selectedValues={selectedValues}
        dominantTrait={dominantTrait}
      />
    );
  }

  if (isComplete) {
    return (
      <ResultsSection
        answers={answers}
        questions={questions}
        selectedValues={selectedValues}
        onValueSelection={handleValueSelection}
        onComplete={handleCoreValuesComplete}
      />
    );
  }

  return <PersonalityTestSection onComplete={handleTestComplete} />;
};

export default PersonalityTest;