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
  {
    id: 4,
    text: "I get stressed out easily",
    trait: "neuroticism",
  },
  {
    id: 5,
    text: "I have a rich vocabulary",
    trait: "openness",
  },
  {
    id: 6,
    text: "I don't talk a lot",
    trait: "extraversion",
    reversed: true,
  },
  {
    id: 7,
    text: "I am interested in people",
    trait: "agreeableness",
  },
  {
    id: 8,
    text: "I leave my belongings around",
    trait: "conscientiousness",
    reversed: true,
  },
  {
    id: 9,
    text: "I am relaxed most of the time",
    trait: "neuroticism",
    reversed: true,
  },
  {
    id: 10,
    text: "I have difficulty understanding abstract ideas",
    trait: "openness",
    reversed: true,
  }
];

const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);

  const progress = (currentQuestion / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const calculateTraitScore = (trait: string) => {
    const traitQuestions = questions.filter(q => q.trait === trait);
    let score = 0;
    let count = 0;
    
    traitQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        score += question.reversed ? (6 - answer) : answer;
        count++;
      }
    });
    
    return count > 0 ? Math.round((score / count) * 10) / 10 : 0;
  };

  if (isComplete) {
    return (
      <Card className="max-w-2xl mx-auto p-8 animate-fade-in">
        <h2 className="text-2xl font-semibold text-center mb-6">Your Personality Profile</h2>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="p-4 bg-accent rounded-lg">
              <h3 className="font-semibold mb-2">Extraversion: {calculateTraitScore("extraversion")}/5</h3>
              <Progress value={calculateTraitScore("extraversion") * 20} className="h-2" />
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <h3 className="font-semibold mb-2">Agreeableness: {calculateTraitScore("agreeableness")}/5</h3>
              <Progress value={calculateTraitScore("agreeableness") * 20} className="h-2" />
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <h3 className="font-semibold mb-2">Conscientiousness: {calculateTraitScore("conscientiousness")}/5</h3>
              <Progress value={calculateTraitScore("conscientiousness") * 20} className="h-2" />
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <h3 className="font-semibold mb-2">Neuroticism: {calculateTraitScore("neuroticism")}/5</h3>
              <Progress value={calculateTraitScore("neuroticism") * 20} className="h-2" />
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <h3 className="font-semibold mb-2">Openness: {calculateTraitScore("openness")}/5</h3>
              <Progress value={calculateTraitScore("openness") * 20} className="h-2" />
            </div>
          </div>
        </div>
      </Card>
    );
  }

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