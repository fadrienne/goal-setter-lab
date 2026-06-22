import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { type VisionPlan } from "@/utils/coreValues";
import { generateAIVision } from "@/utils/visionAI";
import VisionPlanDisplay from "./vision/VisionPlanDisplay";
import VisionInputSection from "./vision/VisionInputSection";
import BloomMapBuilder from "./bloom/BloomMapBuilder";
import AuthForm from "./auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { type SelfReflectionFormData } from "./vision/SelfReflectionForm";

interface VisionPlannerProps {
  selectedAreas: string[];
  selectedValues: string[];
  dominantTrait: {
    trait: string;
    score: number;
  };
  traitScores: {
    trait: string;
    score: number;
  }[];
  selfReflectionData: SelfReflectionFormData | null;
  onBackToCoreValues: () => void;
}

const MAX_DREAMS_LENGTH = 2000;

const VisionPlanner = ({
  selectedAreas,
  selectedValues,
  dominantTrait,
  traitScores,
  selfReflectionData,
  onBackToCoreValues,
}: VisionPlannerProps) => {
  const { user } = useAuth();
  const [personalDreams, setPersonalDreams] = useState("");
  const [visionPlan, setVisionPlan] = useState<VisionPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showBloomBuilder, setShowBloomBuilder] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const { toast } = useToast();

  const handleBuildBloomMap = () => {
    if (user) {
      setShowBloomBuilder(true);
    } else {
      setShowAuthGate(true);
    }
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
        personalDreams,
        selfReflectionAnswers: selfReflectionData
      });
      setVisionPlan(aiVision);
      setIsEditing(false);
      toast({
        title: "Vision Plan Generated",
        description: "Your personalized vision plan has been created successfully!"
      });
    } catch (error) {
      console.error("Error generating vision plan:", error);
      const message = error instanceof Error ? error.message : "Please try again or contact support if the problem persists.";
      toast({
        variant: "destructive",
        title: "Error generating vision plan",
        description: message,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (showAuthGate && visionPlan) {
    return (
      <AuthForm
        onSuccess={() => { setShowAuthGate(false); setShowBloomBuilder(true); }}
        onSkip={() => { setShowAuthGate(false); setShowBloomBuilder(true); }}
      />
    );
  }

  if (showBloomBuilder && visionPlan) {
    return (
      <BloomMapBuilder
        visionPlan={visionPlan}
        dominantTrait={dominantTrait.trait}
        coreValues={selectedValues}
        developmentArea={selectedAreas[0]}
        onBack={() => setShowBloomBuilder(false)}
      />
    );
  }

  if (visionPlan && !isEditing) {
    return (
      <VisionPlanDisplay
        visionPlan={visionPlan}
        onStartOver={onBackToCoreValues}
        onEdit={() => setIsEditing(true)}
        onBuildBloomMap={handleBuildBloomMap}
        developmentArea={selectedAreas[0]}
        traitScores={traitScores}
        dominantTrait={dominantTrait}
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
      isEditing={isEditing}
    />
  );
};

export default VisionPlanner;
