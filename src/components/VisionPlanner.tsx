import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { type VisionPlan } from "@/utils/coreValues";
import { generateAIVision } from "@/utils/visionAI";
import { Loader2 } from "lucide-react";
import CoreValuesSelector from "./vision/CoreValuesSelector";
import DreamsInput from "./vision/DreamsInput";
import VisionPlanDisplay from "./vision/VisionPlanDisplay";

interface VisionPlannerProps {
  selectedAreas: string[];
  dominantTrait: {
    trait: string;
    score: number;
  };
}

const MAX_DREAMS_LENGTH = 2000;

const VisionPlanner = ({ selectedAreas, dominantTrait }: VisionPlannerProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [personalDreams, setPersonalDreams] = useState("");
  const [visionPlan, setVisionPlan] = useState<VisionPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

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

  const handleDreamsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_DREAMS_LENGTH) {
      setPersonalDreams(text);
    } else {
      toast({
        variant: "destructive",
        title: "Text too long",
        description: `Please limit your input to ${MAX_DREAMS_LENGTH} characters.`
      });
    }
  };

  const generatePlan = async () => {
    if (personalDreams.length > MAX_DREAMS_LENGTH) {
      toast({
        variant: "destructive",
        title: "Text too long",
        description: `Please limit your input to ${MAX_DREAMS_LENGTH} characters.`
      });
      return;
    }

    setIsGenerating(true);
    try {
      const aiVision = await generateAIVision({
        personalityTrait: dominantTrait.trait,
        selectedAreas,
        coreValues: selectedValues,
        personalDreams
      });
      
      setVisionPlan(aiVision);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error generating vision plan",
        description: "Please try again or contact support if the problem persists."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (visionPlan) {
    return (
      <VisionPlanDisplay 
        visionPlan={visionPlan} 
        onStartOver={() => setVisionPlan(null)} 
      />
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <DreamsInput
        value={personalDreams}
        onChange={handleDreamsChange}
        maxLength={MAX_DREAMS_LENGTH}
      />
      
      <CoreValuesSelector
        selectedValues={selectedValues}
        onValueSelection={handleValueSelection}
      />

      <div className="mt-8 text-center">
        <Button
          onClick={generatePlan}
          disabled={selectedValues.length !== 3 || !personalDreams.trim() || isGenerating}
          className="bg-primary hover:bg-primary/90"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Your Vision Plan...
            </>
          ) : (
            'Generate Your Vision Plan'
          )}
        </Button>
      </div>
    </div>
  );
};

export default VisionPlanner;