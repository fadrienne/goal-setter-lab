import { useState } from "react";
import GoalFramework from "./GoalFramework";
import CoreValuesSelector from "./vision/CoreValuesSelector";
import VisionPlanner from "./VisionPlanner";
import PersonalityProfile from "./profile/PersonalityProfile";
import DevelopmentAreasSelector from "./vision/DevelopmentAreasSelector";
import { Button } from "./ui/button";

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
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showPersonalVision, setShowPersonalVision] = useState(false);
  const [showVisionPlanner, setShowVisionPlanner] = useState(false);

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

  const handleValueSelection = (value: string) => {
    setSelectedValues(prev => {
      if (prev.includes(value)) {
        return prev.filter(v => v !== value);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, value];
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <PersonalityProfile 
        dominantTrait={dominantTrait} 
        traitScores={traitScores} 
      />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Your Personal Development Framework</h2>
        <GoalFramework trait={dominantTrait.trait} />
        
        <div className="mt-12">
          <CoreValuesSelector
            selectedValues={selectedValues}
            onValueSelection={handleValueSelection}
          />
          
          <div className="mt-8 text-center">
            <Button 
              onClick={() => setShowPersonalVision(true)}
              className="bg-primary hover:bg-primary/90"
              disabled={selectedValues.length !== 3}
            >
              Choose Visioning Areas
            </Button>
          </div>
        </div>
      </div>

      {showPersonalVision && (
        <DevelopmentAreasSelector
          selectedAreas={selectedAreas}
          onAreaSelection={handleAreaSelection}
          onContinue={handleContinue}
        />
      )}

      {showVisionPlanner && (
        <VisionPlanner
          selectedAreas={selectedAreas}
          dominantTrait={dominantTrait}
          selectedValues={selectedValues}
        />
      )}
    </div>
  );
};

export default ResultsDisplay;