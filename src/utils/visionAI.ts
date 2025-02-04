import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ykxcvvfvqxjvvjwqvvxm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlreGN2dmZ2cXhqdnZqd3F2dnhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5NzI2NzAsImV4cCI6MjAyMjU0ODY3MH0.qwpEAXEXD_YZHDZPVbI4v8h6KLhZEQsZQQf_vGZVVtY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      body: {
        personalityTrait: input.personalityTrait,
        selectedAreas: input.selectedAreas,
        coreValues: input.coreValues,
        personalDreams: input.personalDreams
      }
    });

    if (error) {
      console.error('Edge Function Error:', error);
      console.error('Error Status:', error.status);
      console.error('Error Message:', error.message);
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