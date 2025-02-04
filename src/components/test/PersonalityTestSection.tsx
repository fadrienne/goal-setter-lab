import { useState } from "react";
import QuestionCard from "../QuestionCard";
import { useQuestions } from "@/hooks/useQuestions";

interface PersonalityTestSectionProps {
  onComplete: (answers: Record<number, number>) => void;
}

const PersonalityTestSection = ({ onComplete }: PersonalityTestSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const questions = useQuestions();

  const handleAnswer = (value: number) => {
    if (currentQuestion >= questions.length) return;
    
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: value,
    };
    
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  if (questions.length === 0) {
    return <div className="text-center p-4">Loading questions...</div>;
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

export default PersonalityTestSection;