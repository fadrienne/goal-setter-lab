import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface DevelopmentAreasSelectorProps {
  selectedAreas: string[];
  onAreaSelection: (area: string) => void;
  onContinue: () => void;
}

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

const DevelopmentAreasSelector = ({ 
  selectedAreas, 
  onAreaSelection, 
  onContinue 
}: DevelopmentAreasSelectorProps) => {
  return (
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
              onCheckedChange={() => onAreaSelection(area)}
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
          onClick={onContinue}
          disabled={selectedAreas.length === 0}
          className="bg-primary hover:bg-primary/90"
        >
          Continue with Selected Areas ({selectedAreas.length})
        </Button>
      </div>
    </Card>
  );
};

export default DevelopmentAreasSelector;