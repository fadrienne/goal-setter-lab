import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
  "Finances",
  "Personal Growth & Learning",
  "Community Impact",
  "Creative Expression",
  "Life",
  "Innovation & Enterprise"
];

const DevelopmentAreasSelector = ({ 
  selectedAreas, 
  onAreaSelection, 
  onContinue 
}: DevelopmentAreasSelectorProps) => {
  return (
    <Card className="mt-8 p-8 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-6">Select Your Primary Focus Area</h2>
      <p className="text-center text-secondary mb-8">
        Choose the main area where you'd like to focus your vision and goals.
      </p>
      
      <RadioGroup
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        value={selectedAreas[0]}
        onValueChange={(value) => {
          onAreaSelection(value);
        }}
      >
        {developmentAreas.map((area) => (
          <div key={area} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent transition-colors">
            <RadioGroupItem value={area} id={area} />
            <Label htmlFor={area} className="text-sm font-medium leading-none cursor-pointer">
              {area}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-8 text-center">
        <Button
          onClick={onContinue}
          disabled={selectedAreas.length !== 1}
          className="bg-primary hover:bg-primary/90"
        >
          Continue with {selectedAreas[0] || "Selected Area"}
        </Button>
      </div>
    </Card>
  );
};

export default DevelopmentAreasSelector;