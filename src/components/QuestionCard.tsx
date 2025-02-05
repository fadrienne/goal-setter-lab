import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuestionCardProps {
  questionText: string;
  currentAnswer?: number;
  onAnswer: (value: number) => void;
  progress: number;
}

const QuestionCard = ({ questionText, currentAnswer, onAnswer, progress }: QuestionCardProps) => {
  return (
    <Card className="max-w-4xl mx-auto p-8 animate-fade-in">
      <p className="text-lg text-secondary text-center mb-8">
        Take our Big Five personality assessment to understand yourself better
        and start the process of creating a personalized vision for your future.
      </p>
      
      <Progress value={progress} className="mb-8" />
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          {questionText}
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <Button
                key={value}
                variant={currentAnswer === value ? "default" : "outline"}
                onClick={() => onAnswer(value)}
                className="w-full py-6"
              >
                {value}
              </Button>
            ))}
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 px-2">
            <span>Strongly Disagree</span>
            <span>Strongly Agree</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;