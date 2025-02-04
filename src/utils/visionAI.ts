import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;
try {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
  console.error('Error creating Supabase client:', error);
  supabase = {
    functions: {
      invoke: async () => {
        throw new Error('Supabase is not properly configured');
      }
    }
  };
}

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