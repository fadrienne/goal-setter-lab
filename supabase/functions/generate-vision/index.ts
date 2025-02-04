import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting vision plan generation');
    const input = await req.json();
    console.log('Received input:', input);

    if (!openAIApiKey) {
      console.error('OpenAI API key not found in environment variables');
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = 
      "You are a professional life coach and vision planning expert. Create a personalized 5-year vision plan based on the following information:\n\n" +
      "- Personality trait: " + input.personalityTrait + "\n" +
      "- Focus areas: " + input.selectedAreas.join(', ') + "\n" +
      "- Core values: " + input.coreValues.join(', ') + "\n" +
      "- Personal dreams: " + input.personalDreams + "\n\n" +
      "Provide the response in the following JSON structure:\n" +
      "{\n" +
      '  "smartGoal": {\n' +
      '    "specific": "string",\n' +
      '    "measurable": "string",\n' +
      '    "achievable": "string",\n' +
      '    "relevant": "string",\n' +
      '    "timeBound": "string"\n' +
      "  },\n" +
      '  "fiveYearVision": "string",\n' +
      '  "yearlyMilestones": [\n' +
      "    {\n" +
      '      "year": 1,\n' +
      '      "goals": ["string"]\n' +
      "    }\n" +
      "  ]\n" +
      "}";

    console.log('Making request to OpenAI API');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: 'Generate a structured vision plan based on the provided information.'
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API Error Response:', errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('OpenAI response received:', data);

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid response format from OpenAI:', data);
      throw new Error('Invalid response from OpenAI');
    }

    const content = data.choices[0].message.content;
    console.log('Raw content from OpenAI:', content);

    try {
      const visionPlan = JSON.parse(content);
      console.log('Vision plan parsed successfully:', visionPlan);
      return new Response(JSON.stringify(visionPlan), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      console.error('Raw response content:', content);
      throw new Error('Failed to parse OpenAI response as JSON');
    }
  } catch (error) {
    console.error('Error in generate-vision function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});