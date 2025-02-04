import { useState } from "react";
import QuestionCard from "./QuestionCard";
import ResultsDisplay from "./ResultsDisplay";
import { useQuestions } from "@/hooks/useQuestions";
import { calculateTraitScore, calculateDominantTrait } from "@/utils/scoreCalculations";
import CoreValuesSelector from "./vision/CoreValuesSelector";
import VisionPlanner from "./VisionPlanner";

const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showVisionPlanner, setShowVisionPlanner] = useState(false);
  const questions = useQuestions();

  const handleAnswer = (value: number) => {
    if (currentQuestion >= questions.length) return;
    
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
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

  if (questions.length === 0) {
    return <div className="text-center p-4">Loading questions...</div>;
  }

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
            onValueSelection={handleValueSelection}
          />
          <div className="mt-4 text-center">
            <button
              onClick={handleCoreValuesComplete}
              disabled={selectedValues.length !== 3}
              className="px-6 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Vision Planning
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = (currentQuestion / questions.length) * 100;

  return (
    <div className="min-h-screen p-6 bg-accent">
      <QuestionCard
        questionText={questions[currentQuestion].text}
        currentAnswer={answers[questions[currentQuestion].id]}
        onAnswer={handleAnswer}
        progress={progress}
      />
    </div>
  );
};

export default PersonalityTest;