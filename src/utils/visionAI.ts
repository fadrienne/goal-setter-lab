import { supabase } from '@/integrations/supabase/client';

interface VisionInput {
  personalityTrait: string;
  selectedAreas: string[];
  coreValues: string[];
  personalDreams: string;
}

export const generateAIVision = async (input: VisionInput) => {
  try {
    console.log('Input to Edge Function:', input);
    
    const { data, error } = await supabase.functions.invoke('generate-vision', {
      body: input
    });

    if (error) {
      console.error('Edge Function Error:', error);
      throw new Error(`Edge Function error: ${error.message}`);
    }

    if (!data) {
      console.error('No data received from Edge Function');
      throw new Error('No data received from the Edge Function');
    }

    console.log('Edge Function Response:', data);
    return data;
  } catch (error) {
    console.error('Error in generateAIVision:', error);
    throw error;
  }
};