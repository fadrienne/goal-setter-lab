
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { type VisionPlan } from "@/utils/coreValues";
import { generateAIVision } from "@/utils/visionAI";
import VisionPlanDisplay from "./vision/VisionPlanDisplay";
import VisionInputSection from "./vision/VisionInputSection";
import { type SelfReflectionFormData } from "./vision/SelfReflectionForm";

interface VisionPlannerProps {
  selectedAreas: string[];
  selectedValues: string[];
  dominantTrait: {
    trait: string;
    score: number;
  };
  selfReflectionData: SelfReflectionFormData | null;
}

const MAX_DREAMS_LENGTH = 2000;

const VisionPlanner = ({ selectedAreas, selectedValues, dominantTrait, selfReflectionData }: VisionPlannerProps) => {
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
      personalDreams,
      selfReflectionData
    });

    try {
      const aiVision = await generateAIVision({
        personalityTrait: dominantTrait.trait,
        selectedAreas,
        coreValues: selectedValues,
        personalDreams,
        selfReflectionAnswers: selfReflectionData
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
    <VisionInputSection
      personalDreams={personalDreams}
      onChange={handleDreamsChange}
      onGenerate={generatePlan}
      isGenerating={isGenerating}
      maxLength={MAX_DREAMS_LENGTH}
      developmentArea={selectedAreas[0]}
    />
  );
};

export default VisionPlanner;
