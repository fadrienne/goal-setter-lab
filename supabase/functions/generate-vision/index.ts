import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received request:', req.method);
    const input = await req.json();
    console.log('Processing input:', input);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a professional life coach and vision planning expert. Create a personalized 5-year vision plan based on:
              - Personality trait: ${input.personalityTrait}
              - Focus areas: ${input.selectedAreas.join(', ')}
              - Core values: ${input.coreValues.join(', ')}
              - Personal dreams: ${input.personalDreams}
              
              Structure the response as a JSON object with:
              {
                "smartGoal": {
                  "specific": string,
                  "measurable": string,
                  "achievable": string,
                  "relevant": string,
                  "timeBound": string
                },
                "fiveYearVision": string,
                "yearlyMilestones": Array<{
                  "year": number,
                  "goals": string[]
                }>
              }`
          },
          {
            role: 'user',
            content: 'Generate a structured vision plan based on the provided information.'
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    const visionPlan = JSON.parse(data.choices[0].message.content);
    console.log('Vision plan parsed successfully');

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