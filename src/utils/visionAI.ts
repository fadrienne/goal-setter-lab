import { createClient } from '@supabase/supabase-js'

// Make sure we have the required environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

let supabase;
try {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Supabase client created successfully');
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
    console.log('Attempting to generate AI vision with input:', input);
    
    const { data, error } = await supabase.functions.invoke('generate-vision', {
      body: input
    });

    if (error) {
      console.error('Error generating vision:', error);
      if (error.message?.includes('Function not found')) {
        throw new Error(
          'The generate-vision Edge Function is not deployed. Please deploy the Edge Function in your Supabase dashboard and ensure the OPENAI_API_KEY secret is set.'
        );
      }
      throw error;
    }

    if (!data) {
      throw new Error('No data received from the Edge Function. Please check your Edge Function implementation.');
    }

    console.log('Successfully generated vision plan:', data);
    return data;
  } catch (error) {
    console.error('Error generating AI vision:', error);
    throw error;
  }
};