
import { useState } from "react";
import { useQuestions } from "@/hooks/useQuestions";
import PersonalityTestSection from "./test/PersonalityTestSection";
import ResultsSection from "./results/ResultsSection";
import VisionPlanner from "./VisionPlanner";
import DevelopmentAreasSelector from "./vision/DevelopmentAreasSelector";
import { calculateDominantTrait } from "@/utils/scoreCalculations";
import { Button } from "./ui/button";
import SelfReflectionForm, { type SelfReflectionFormData } from "./vision/SelfReflectionForm";

const PersonalityTest = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showSelfReflection, setShowSelfReflection] = useState(false);
  const [selfReflectionData, setSelfReflectionData] = useState<SelfReflectionFormData | null>(null);
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
      setShowSelfReflection(true);
    }
  };

  const handleSelfReflectionComplete = (data: SelfReflectionFormData) => {
    setSelfReflectionData(data);
    setShowDevelopmentAreas(true);
  };

  const handleAreaSelection = (area: string) => {
    setSelectedAreas([area]);
  };

  const handleDevelopmentAreasComplete = () => {
    setShowVisionPlanner(true);
  };

  const handleBack = () => {
    if (showVisionPlanner) {
      setShowVisionPlanner(false);
    } else if (showDevelopmentAreas) {
      setShowDevelopmentAreas(false);
      setShowSelfReflection(true);
    } else if (showSelfReflection) {
      setShowSelfReflection(false);
      setSelfReflectionData(null);
    } else if (isComplete) {
      setIsComplete(false);
      setSelectedValues([]);
    }
  };

  const renderNavigationButtons = () => (
    <div className="flex justify-center gap-4 mt-6">
      {(isComplete || showSelfReflection || showDevelopmentAreas || showVisionPlanner) && (
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
      )}
    </div>
  );

  if (showVisionPlanner) {
    const dominantTrait = calculateDominantTrait(questions, answers);
    return (
      <>
        <VisionPlanner 
          selectedAreas={selectedAreas}
          selectedValues={selectedValues}
          dominantTrait={dominantTrait}
          selfReflectionData={selfReflectionData}
        />
        {renderNavigationButtons()}
      </>
    );
  }

  if (showDevelopmentAreas) {
    return (
      <>
        <DevelopmentAreasSelector
          selectedAreas={selectedAreas}
          onAreaSelection={handleAreaSelection}
          onContinue={handleDevelopmentAreasComplete}
        />
        {renderNavigationButtons()}
      </>
    );
  }

  if (showSelfReflection) {
    return (
      <>
        <SelfReflectionForm onSubmit={handleSelfReflectionComplete} />
        {renderNavigationButtons()}
      </>
    );
  }

  if (isComplete) {
    return (
      <>
        <ResultsSection
          answers={answers}
          questions={questions}
          selectedValues={selectedValues}
          onValueSelection={handleValueSelection}
          onComplete={handleCoreValuesComplete}
        />
        {renderNavigationButtons()}
      </>
    );
  }

  return <PersonalityTestSection onComplete={handleTestComplete} />;
};

export default PersonalityTest;
