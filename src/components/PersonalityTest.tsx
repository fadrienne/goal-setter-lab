import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    id: 1,
    text: "I am the life of the party",
    trait: "extraversion",
  },
  {
    id: 2,
    text: "I feel little concern for others",
    trait: "agreeableness",
    reversed: true,
  },
  {
    id: 3,
    text: "I am always prepared",
    trait: "conscientiousness",
  },
  // Add more questions here
];

const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const progress = (currentQuestion / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-accent">
      <Card className="max-w-2xl mx-auto p-8 animate-fade-in">
        <Progress value={progress} className="mb-8" />
        
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">
            {questions[currentQuestion].text}
          </h2>
          
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <Button
                key={value}
                variant={answers[questions[currentQuestion].id] === value ? "default" : "outline"}
                onClick={() => handleAnswer(value)}
                className="w-full py-6"
              >
                {value}
              </Button>
            ))}
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <span>Strongly Disagree</span>
            <span className="float-right">Strongly Agree</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PersonalityTest;