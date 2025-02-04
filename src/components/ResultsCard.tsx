import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Trait {
  name: string;
  score: number;
  description: string;
}

interface ResultsCardProps {
  trait: Trait;
}

const ResultsCard = ({ trait }: ResultsCardProps) => {
  return (
    <Card className="p-6 animate-slide-in">
      <h3 className="text-xl font-semibold mb-2">{trait.name}</h3>
      <Progress value={trait.score} className="mb-4" />
      <p className="text-gray-600">{trait.description}</p>
    </Card>
  );
};

export default ResultsCard;