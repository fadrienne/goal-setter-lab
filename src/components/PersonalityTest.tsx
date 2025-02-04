import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import ResultsDisplay from "./ResultsDisplay";
import { allQuestions } from "@/utils/questions";

const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [questions, setQuestions] = useState<typeof allQuestions>([]);

  useEffect(() => {
    // Select 3 random questions for each trait
    const selectedQuestions = ["extraversion", "agreeableness", "conscientiousness", "neuroticism", "openness"].flatMap(
      (trait) => {
        const traitQuestions = allQuestions.filter((q) => q.trait === trait);
        return traitQuestions
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
      }
    );
    setQuestions(selectedQuestions);
  }, []);

  const calculateTraitScore = (trait: string) => {
    const traitQuestions = questions.filter(q => q.trait === trait);
    let score = 0;
    let count = 0;
    
    traitQuestions.forEach(question => {
      const answer = answers[question.id];
      if (typeof answer === 'number') {
        score += question.reversed ? (6 - answer) : answer;
        count++;
      }
    });
    
    return count > 0 ? Math.round((score / count) * 10) / 10 : 0;
  };

  const getDominantTrait = () => {
    const traits = ["extraversion", "agreeableness", "conscientiousness", "neuroticism", "openness"];
    const scores = traits.map(trait => ({
      trait,
      score: calculateTraitScore(trait)
    }));
    
    return scores.reduce((highest, current) => 
      current.score > highest.score ? current : highest
    , scores[0]);
  };

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
      score: calculateTraitScore(trait)
    }));
    
    return (
      <div className="container mx-auto px-4 py-8">
        <ResultsDisplay 
          traitScores={traitScores} 
          dominantTrait={getDominantTrait()} 
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