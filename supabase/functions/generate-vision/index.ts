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

    const traitCoachingStyles: Record<string, string> = {
      extraversion: "This person thrives on social energy, visibility, and leading others. Write goals that emphasize rallying people, creating shared momentum, and making an outward mark. Use action-oriented, energizing language (mobilize, inspire, connect, lead, amplify).",
      agreeableness: "This person is driven by empathy, harmony, and the wellbeing of others. Write goals that centre deepening relationships, collaborative impact, and advocating with warmth. Use relational, caring language (nurture, build trust, support, strengthen bonds, co-create).",
      conscientiousness: "This person values precision, reliability, and measurable achievement. Write goals that emphasize building systems, hitting clear targets, and delivering excellence. Use structured, outcome-focused language (execute, track, optimize, master, deliver, systemize).",
      neuroticism: "This person has deep emotional attunement and is on a journey of building resilience. Write goals that frame emotional sensitivity as intelligence and focus on grounding, regulation, and turning inner experience into wisdom. Use empowering, grounding language (stabilize, ground, strengthen, regulate, reclaim, transform).",
      openness: "This person is energized by curiosity, exploration, and connecting disparate ideas. Write goals that celebrate discovery, experimentation, and converting creative vision into lasting impact. Use expansive, possibility-oriented language (explore, pioneer, imagine, prototype, synthesize, create).",
    };
    const traitStyle = traitCoachingStyles[input.personalityTrait] ?? "Adapt the tone and goals to feel authentic to this individual's personality.";

    const systemPrompt =
      `You are a top tier life coach and goals and vision planning expert helping me define a vision that feels deeply aligned with my purpose. Create a focused 5-year vision plan based on the following information, concentrating ONLY on the specified focus area:\n\n` +
      `- Personality trait: ${input.personalityTrait}\n` +
      `- Coaching style for this personality: ${traitStyle}\n` +
      `- Focus area: ${input.selectedAreas[0]}\n` +
      `- Core values: ${input.coreValues.join(', ')}\n` +
      `- Personal dreams: ${input.personalDreams}\n\n` +
      `Self-reflection insights:\n` +
      `- Current situation: ${input.selfReflectionAnswers?.currentSituation || 'Not provided'}\n` +
      `- Challenges and opportunities: ${input.selfReflectionAnswers?.challengesOpportunities || 'Not provided'}\n` +
      `- Areas needing attention: ${input.selfReflectionAnswers?.attentionAreas || 'Not provided'}\n` +
      `- Ideal work-life integration: ${input.selfReflectionAnswers?.workLifeIntegration || 'Not provided'}\n` +
      `- Desired skills: ${input.selfReflectionAnswers?.desiredSkills || 'Not provided'}\n` +
      `- Habits to build/break: ${input.selfReflectionAnswers?.habits || 'Not provided'}\n` +
      `- Community impact goals: ${input.selfReflectionAnswers?.communityImpact || 'Not provided'}\n\n` +
      `IMPORTANT: Extract and focus ONLY on the aspects of the dreams and aspirations that relate to ${input.selectedAreas[0]}. Ignore other areas.\n\n` +
      `Provide the response in the following JSON structure:\n` +
      `{\n` +
      `  "smartGoal": {\n` +
      `    "specific": "string - related to ${input.selectedAreas[0]}",\n` +
      `    "measurable": "string",\n` +
      `    "achievable": "string",\n` +
      `    "relevant": "string",\n` +
      `    "timeBound": "string"\n` +
      `  },\n` +
      `  "fiveYearVision": "string - focused on ${input.selectedAreas[0]}",\n` +
      `  "yearlyMilestones": [\n` +
      `    {\n` +
      `      "year": 1,\n` +
      `      "goals": ["string - all goals must relate to ${input.selectedAreas[0]}"]\n` +
      `    }\n` +
      `  ]\n` +
      `}`;

    console.log('System Prompt being sent to OpenAI:', systemPrompt);
    console.log('Making request to OpenAI API');
    
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
            content: systemPrompt
          },
          {
            role: 'user',
            content: 'Generate a focused vision plan for the specified area only.'
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