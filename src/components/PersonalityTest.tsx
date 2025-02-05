import { useState } from "react";
import { useQuestions } from "@/hooks/useQuestions";
import PersonalityTestSection from "./test/PersonalityTestSection";
import ResultsSection from "./results/ResultsSection";
import VisionPlanner from "./VisionPlanner";
import DevelopmentAreasSelector from "./vision/DevelopmentAreasSelector";
import { calculateDominantTrait } from "@/utils/scoreCalculations";

const PersonalityTest = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showDevelopmentAreas, setShowDevelopmentAreas] = useState(false);
  const [showVisionPlanner, setShowVisionPlanner] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
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
      setShowDevelopmentAreas(true);
    }
  };

  const handleAreaSelection = (area: string) => {
    setSelectedAreas(prev => {
      if (prev.includes(area)) {
        return prev.filter(a => a !== area);
      }
      return [...prev, area];
    });
  };

  const handleDevelopmentAreasComplete = () => {
    setShowVisionPlanner(true);
  };

  if (showVisionPlanner) {
    const dominantTrait = calculateDominantTrait(questions, answers);
    return (
      <VisionPlanner 
        selectedAreas={selectedAreas}
        selectedValues={selectedValues}
        dominantTrait={dominantTrait}
      />
    );
  }

  if (showDevelopmentAreas) {
    return (
      <DevelopmentAreasSelector
        selectedAreas={selectedAreas}
        onAreaSelection={handleAreaSelection}
        onContinue={handleDevelopmentAreasComplete}
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