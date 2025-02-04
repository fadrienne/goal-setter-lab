import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { type VisionPlan } from "@/utils/coreValues";
import { generateAIVision } from "@/utils/visionAI";
import { Loader2 } from "lucide-react";
import DreamsInput from "./vision/DreamsInput";
import VisionPlanDisplay from "./vision/VisionPlanDisplay";

interface VisionPlannerProps {
  selectedAreas: string[];
  selectedValues: string[];
  dominantTrait: {
    trait: string;
    score: number;
  };
}

const MAX_DREAMS_LENGTH = 2000;

const VisionPlanner = ({ selectedAreas, selectedValues, dominantTrait }: VisionPlannerProps) => {
  const [personalDreams, setPersonalDreams] = useState("");
  const [visionPlan, setVisionPlan] = useState<VisionPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

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
    console.log("Starting vision plan generation with:", {
      personalityTrait: dominantTrait.trait,
      selectedAreas,
      selectedValues,
      personalDreams
    });

    try {
      const aiVision = await generateAIVision({
        personalityTrait: dominantTrait.trait,
        selectedAreas,
        coreValues: selectedValues,
        personalDreams
      });
      
      console.log("Received vision plan:", aiVision);
      setVisionPlan(aiVision);
      toast({
        title: "Vision Plan Generated",
        description: "Your personalized vision plan has been created successfully!"
      });
    } catch (error) {
      console.error("Error generating vision plan:", error);
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

      <div className="mt-8 text-center">
        <Button
          onClick={generatePlan}
          disabled={!personalDreams.trim() || isGenerating}
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