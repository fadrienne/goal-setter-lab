import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface VisionInput {
  personalityTrait: string;
  selectedAreas: string[];
  coreValues: string[];
  personalDreams: string;
}

export const generateAIVision = async (input: VisionInput) => {
  try {
    // Fetch the OpenAI API key from Supabase secrets
    const { data, error } = await supabase.functions.invoke('get-secret', {
      body: { secretName: 'OPENAI_API_KEY' }
    });

    if (error || !data?.secret) {
      console.error('Error fetching OpenAI API key:', error);
      throw new Error('Failed to fetch OpenAI API key');
    }

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
      throw new Error('Failed to generate vision plan');
    }

    const data2 = await response.json();
    return JSON.parse(data2.choices[0].message.content);
  } catch (error) {
    console.error('Error generating AI vision:', error);
    throw new Error('Failed to generate vision plan');
  }
};