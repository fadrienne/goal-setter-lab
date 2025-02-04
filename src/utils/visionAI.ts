import { supabase } from "@/integrations/supabase/client";
import { VisionPlan } from "./coreValues";

interface VisionInput {
  personalityTrait: string;
  selectedAreas: string[];
  coreValues: string[];
  personalDreams: string;
}

export const generateAIVision = async (input: VisionInput): Promise<VisionPlan> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-vision', {
      body: input
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error generating vision plan:', error);
    throw error;
  }
};