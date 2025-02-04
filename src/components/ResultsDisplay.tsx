import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import GoalFramework from "./GoalFramework";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import VisionPlanner from "./VisionPlanner";
import ApiKeyInput from "./ApiKeyInput";

interface ResultsDisplayProps {
  traitScores: {
    trait: string;
    score: number;
  }[];
  dominantTrait: {
    trait: string;
    score: number;
  };
}

const ResultsDisplay = ({ traitScores, dominantTrait }: ResultsDisplayProps) => {
  const [showGoalSelection, setShowGoalSelection] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [showVisionPlanner, setShowVisionPlanner] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(() => !!localStorage.getItem('OPENAI_API_KEY'));

  const developmentAreas = [
    "Career Growth",
    "Personal Development",
    "Relationships",
    "Health & Wellness",
    "Financial Goals",
    "Learning & Education",
    "Community Impact",
    "Creative Expression"
  ];

  const handleAreaSelection = (area: string) => {
    setSelectedAreas(prev => {
      if (prev.includes(area)) {
        return prev.filter(a => a !== area);
      }
      return [...prev, area];
    });
  };

  const handleContinue = () => {
    setShowVisionPlanner(true);
  };

  const handleApiKeySaved = () => {
    setHasApiKey(true);
  };

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
              {traitScores.map((score) => (
                <div key={score.trait} className="p-4 bg-accent rounded-lg">
                  <h3 className="font-semibold mb-2 capitalize">
                    {score.trait}: {score.score}/5
                  </h3>
                  <Progress value={score.score * 20} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Your Personal Development Framework</h2>
        <GoalFramework trait={dominantTrait.trait} />
        
        <div className="mt-12 text-center">
          <Button 
            onClick={() => setShowGoalSelection(true)}
            className="bg-primary hover:bg-primary/90"
          >
            Create Your Personal Vision
          </Button>
        </div>
      </div>

      {showGoalSelection && !showVisionPlanner && (
        <Card className="mt-8 p-8 animate-fade-in">
          <h2 className="text-2xl font-semibold text-center mb-6">Select Areas for Goal Setting</h2>
          <p className="text-center text-secondary mb-8">
            Choose the areas where you'd like to create specific goals and develop your personal vision.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {developmentAreas.map((area) => (
              <div key={area} className="flex items-center space-x-3 p-4 border rounded-lg">
                <Checkbox
                  id={area}
                  checked={selectedAreas.includes(area)}
                  onCheckedChange={() => handleAreaSelection(area)}
                />
                <label
                  htmlFor={area}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {area}
                </label>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={handleContinue}
              disabled={selectedAreas.length === 0}
              className="bg-primary hover:bg-primary/90"
            >
              Continue with Selected Areas ({selectedAreas.length})
            </Button>
          </div>
        </Card>
      )}

      {showVisionPlanner && (
        <>
          {!hasApiKey && <ApiKeyInput onApiKeySaved={handleApiKeySaved} />}
          {hasApiKey && (
            <VisionPlanner
              selectedAreas={selectedAreas}
              dominantTrait={dominantTrait}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ResultsDisplay;