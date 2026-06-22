
import { supabase } from "@/integrations/supabase/client";
import { VisionPlan } from "./coreValues";
import { type SelfReflectionFormData } from "@/components/vision/SelfReflectionForm";

interface VisionInput {
  personalityTrait: string;
  selectedAreas: string[];
  coreValues: string[];
  personalDreams: string;
  selfReflectionAnswers: SelfReflectionFormData | null;
}

export const generateAIVision = async (input: VisionInput): Promise<VisionPlan> => {
  const { data, error } = await supabase.functions.invoke('generate-vision', {
    body: input
  });

  if (error) {
    // Extract message from FunctionsHttpError body if present
    const context = (error as { context?: Response }).context;
    if (context) {
      try {
        const body = await context.json();
        throw new Error(body.error ?? error.message);
      } catch {
        throw new Error(error.message);
      }
    }
    throw new Error(error.message);
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data as VisionPlan;
};
