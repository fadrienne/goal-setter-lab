import { useState } from "react";
import QuestionCard from "./QuestionCard";
import ResultsDisplay from "./ResultsDisplay";
import { useQuestions } from "@/hooks/useQuestions";
import { calculateTraitScore, calculateDominantTrait } from "@/utils/scoreCalculations";

const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);
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

  if (questions.length === 0) {
    return <div className="text-center p-4">Loading questions...</div>;
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