import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import GoalFramework from "./GoalFramework";

const allQuestions = [
  // Extraversion questions
  {
    id: 1,
    text: "I am the life of the party",
    trait: "extraversion",
  },
  {
    id: 2,
    text: "I don't talk a lot",
    trait: "extraversion",
    reversed: true,
  },
  {
    id: 3,
    text: "I feel comfortable around people",
    trait: "extraversion",
  },
  {
    id: 4,
    text: "I keep in the background",
    trait: "extraversion",
    reversed: true,
  },
  {
    id: 5,
    text: "I start conversations",
    trait: "extraversion",
  },
  // Agreeableness questions
  {
    id: 6,
    text: "I feel little concern for others",
    trait: "agreeableness",
    reversed: true,
  },
  {
    id: 7,
    text: "I am interested in people",
    trait: "agreeableness",
  },
  {
    id: 8,
    text: "I insult people",
    trait: "agreeableness",
    reversed: true,
  },
  {
    id: 9,
    text: "I sympathize with others' feelings",
    trait: "agreeableness",
  },
  {
    id: 10,
    text: "I am interested in other people's problems",
    trait: "agreeableness",
  },
  // Conscientiousness questions
  {
    id: 11,
    text: "I am always prepared",
    trait: "conscientiousness",
  },
  {
    id: 12,
    text: "I leave my belongings around",
    trait: "conscientiousness",
    reversed: true,
  },
  {
    id: 13,
    text: "I pay attention to details",
    trait: "conscientiousness",
  },
  {
    id: 14,
    text: "I make a mess of things",
    trait: "conscientiousness",
    reversed: true,
  },
  {
    id: 15,
    text: "I follow a schedule",
    trait: "conscientiousness",
  },
  // Neuroticism questions
  {
    id: 16,
    text: "I get stressed out easily",
    trait: "neuroticism",
  },
  {
    id: 17,
    text: "I am relaxed most of the time",
    trait: "neuroticism",
    reversed: true,
  },
  {
    id: 18,
    text: "I worry about things",
    trait: "neuroticism",
  },
  {
    id: 19,
    text: "I seldom feel blue",
    trait: "neuroticism",
    reversed: true,
  },
  {
    id: 20,
    text: "I am easily disturbed",
    trait: "neuroticism",
  },
  // Openness questions
  {
    id: 21,
    text: "I have a rich vocabulary",
    trait: "openness",
  },
  {
    id: 22,
    text: "I have difficulty understanding abstract ideas",
    trait: "openness",
    reversed: true,
  },
  {
    id: 23,
    text: "I have a vivid imagination",
    trait: "openness",
  },
  {
    id: 24,
    text: "I am not interested in abstract ideas",
    trait: "openness",
    reversed: true,
  },
  {
    id: 25,
    text: "I have excellent ideas",
    trait: "openness",
  },
];

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

  const getDominantTrait = () => {
    const traits = ["extraversion", "agreeableness", "conscientiousness", "neuroticism", "openness"];
    const scores = traits.map(trait => ({
      trait,
      score: calculateTraitScore(trait)
    }));
    
    return scores.reduce((highest, current) => 
      current.score > highest.score ? current : highest
    );
  };

  if (isComplete) {
    const dominantTrait = getDominantTrait();
    
    return (
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <Card className="animate-fade-in">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Your Personality Profile</h2>
            <div className="space-y-4">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">Your Dominant Trait</h3>
                <p className="text-lg text-primary capitalize">{dominantTrait.trait}</p>
              </div>
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
          </div>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Your Personal Development Framework</h2>
          <GoalFramework trait={dominantTrait.trait} />
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
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
