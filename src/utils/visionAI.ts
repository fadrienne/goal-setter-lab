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
    
    // Fetch the OpenAI API key from Supabase secrets
    const { data, error } = await supabase.functions.invoke('get-secret', {
      body: { secretName: 'OPENAI_API_KEY' }
    });

    if (error || !data?.secret) {
      console.error('Error fetching OpenAI API key:', error);
      throw new Error('Failed to fetch OpenAI API key. Please ensure it is properly set in Supabase secrets.');
    }

    console.log('Successfully retrieved OpenAI API key');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.secret}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a professional career and personal development coach. Create personalized development plans based on personality traits, chosen areas of focus, core values, and personal dreams.`
          },
          {
            role: 'user',
            content: `Generate a personalized vision plan with these inputs:
              - Personality Trait: ${input.personalityTrait}
              - Focus Areas: ${input.selectedAreas.join(', ')}
              - Core Values: ${input.coreValues.join(', ')}
              - Personal Dreams: ${input.personalDreams}
              
              Provide:
              1. A SMART goal that integrates all components
              2. A compelling 5-year vision statement
              3. Year-by-year milestones for each focus area
              
              Format the response as a JSON object with these keys:
              - smartGoal (object with specific, measurable, achievable, relevant, timeBound)
              - fiveYearVision (string)
              - yearlyMilestones (array of objects with year and goals array)`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error('Failed to generate vision plan. Please try again later.');
    }

    const data2 = await response.json();
    console.log('Successfully generated vision plan:', data2);
    return JSON.parse(data2.choices[0].message.content);
  } catch (error) {
    console.error('Error generating AI vision:', error);
    throw error;
  }
};