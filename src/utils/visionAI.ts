import { createClient } from '@supabase/supabase-js'

// Make sure we have the required environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

let supabase;
try {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please connect your Supabase project in the settings.');
  }
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Supabase client created successfully');
} catch (error) {
  console.error('Error creating Supabase client:', error);
  // Create a dummy client that will show appropriate errors to users
  supabase = {
    functions: {
      invoke: async () => {
        throw new Error('Supabase is not properly configured. Please connect your Supabase project in the settings.');
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
    console.log('Attempting to generate AI vision with input:', input);
    
    const { data, error } = await supabase.functions.invoke('generate-vision', {
      body: input
    });

    if (error) {
      console.error('Error generating vision:', error);
      throw error;
    }

    console.log('Successfully generated vision plan:', data);
    return data;
  } catch (error) {
    console.error('Error generating AI vision:', error);
    throw error;
  }
};