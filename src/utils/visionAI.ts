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
    const { data, error } = await supabase.functions.invoke('generate-vision', {
      body: input
    });

    if (error) {
      console.error('Error from Edge Function:', error);
      throw error;
    }

    if (!data) {
      throw new Error('No data received from the Edge Function');
    }

    return data;
  } catch (error) {
    console.error('Error generating vision:', error);
    throw error;
  }
};