import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VisionInput {
  personalityTrait: string;
  selectedAreas: string[];
  coreValues: string[];
  personalDreams: string;
}

interface YearlyMilestone {
  year: number;
  goals: string[];
}

interface SmartGoal {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}

interface VisionPlan {
  smartGoal: SmartGoal;
  fiveYearVision: string;
  yearlyMilestones: YearlyMilestone[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const input: VisionInput = await req.json();
    console.log('Received input:', input);

    const systemPrompt = `You are a professional life coach and vision planning expert. Your task is to create a personalized 5-year vision plan based on the following information:
    - Dominant personality trait: ${input.personalityTrait}
    - Focus areas: ${input.selectedAreas.join(', ')}
    - Core values: ${input.coreValues.join(', ')}
    - Personal dreams and aspirations: ${input.personalDreams}

    Create a structured response that includes:
    1. A SMART goal
    2. A compelling 5-year vision statement
    3. Yearly milestones (specific goals for each year)

    Make the plan ambitious yet achievable, and ensure it aligns with their personality trait and core values.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Please generate a structured vision plan in JSON format with the following structure: { smartGoal: { specific, measurable, achievable, relevant, timeBound }, fiveYearVision: string, yearlyMilestones: Array<{ year: number, goals: string[] }> }' }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    const visionPlan: VisionPlan = JSON.parse(data.choices[0].message.content);
    console.log('Parsed vision plan:', visionPlan);

    return new Response(JSON.stringify(visionPlan), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-vision function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});