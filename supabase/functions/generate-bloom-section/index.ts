import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const traitVoice: Record<string, string> = {
  extraversion: "energizing, action-oriented, social, and outward-focused — use verbs like mobilize, inspire, lead, amplify, connect",
  agreeableness: "warm, relational, empathetic, and collaborative — use language like nurture, co-create, strengthen bonds, support, harmonize",
  conscientiousness: "precise, structured, and achievement-focused — use language like execute, track, optimize, systemize, master, deliver",
  neuroticism: "grounding, empowering, and resilience-building — use language like stabilize, regulate, reclaim, transform, strengthen",
  openness: "expansive, curious, and possibility-oriented — use language like explore, pioneer, imagine, prototype, synthesize, create",
};

const sectionDescriptions: Record<string, string> = {
  "bold-vision": "B — Bold Vision (purpose-driven, transformative, anchored in personal meaning)",
  "legacy": "L — Legacy Building (lasting impact, generational value, enduring contribution)",
  "organic-growth": "O — Organic Growth (sustainable momentum, development cycles, skills and support)",
  "ownership": "O — Ownership (actionable milestones, monthly focus, weekly discipline, metrics)",
  "multiply-impact": "M — Multiply Impact (inspirational reach, collaboration, amplified positive outcomes)",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const input = await req.json();
    const { section, answers, personalityTrait, smartGoal, coreValues, fiveYearVision } = input;

    if (!openAIApiKey) throw new Error("OpenAI API key not configured");

    const voice = traitVoice[personalityTrait] ?? "authentic and empowering";
    const smartGoalText = smartGoal
      ? `Specific: ${smartGoal.specific}. Measurable: ${smartGoal.measurable}. Achievable: ${smartGoal.achievable}. Relevant: ${smartGoal.relevant}. Time-bound: ${smartGoal.timeBound}.`
      : "";

    let systemPrompt = "";
    let userMessage = "";

    if (section === "bold-vision-initial") {
      systemPrompt = `You are a world-class life coach and vision architect. Your writing voice is ${voice}. Always write in first person ("I").`;
      userMessage = `Synthesise a single bold, audacious vision statement of 3-5 sentences from this person's SMART goal and 5-year vision. It should feel transformative, deeply personal, and anchored in their WHY. Write it in first person.

SMART Goal: ${smartGoalText}
5-Year Vision: ${fiveYearVision}
Core Values: ${coreValues?.join(", ")}
Dominant Personality Trait: ${personalityTrait}

The statement must:
- Start with "I"
- Feel emotionally resonant and audacious (not corporate-generic)
- Be 3-5 sentences
- Reference at least one core value
- Reflect the tone fitting a ${personalityTrait} personality (${voice})

Return JSON: { "content": "the vision statement" }`;

    } else if (section === "shift") {
      const { step, stepLabel, userAnswer, previousAnswers } = input;
      systemPrompt = `You are a compassionate mindset coach specialising in belief-shift work. Your tone is ${voice}. Keep your response to 2-3 sentences maximum. Be warm, perceptive, and forward-moving.`;
      userMessage = `The person is on Step ${step} — "${stepLabel}" — of the SHIFT mindset framework.

Their answer: "${userAnswer}"
Previous SHIFT steps: ${JSON.stringify(previousAnswers || [])}
Their SMART Goal: ${smartGoalText}

Respond with a brief, personalised observation about their answer and a prompt that helps them move into the next step. Acknowledge something specific from what they wrote.

Return JSON: { "response": "your coaching response (2-3 sentences)" }`;

    } else {
      const sectionDesc = sectionDescriptions[section] || section;
      const answersText = answers
        ?.map((a: { question: string; answer: string }) => `Q: ${a.question}\nA: ${a.answer}`)
        .join("\n\n") ?? "";

      systemPrompt = `You are a world-class life coach and vision architect. Your writing voice is ${voice} to match this person's dominant personality trait of "${personalityTrait}". Write in second person ("you"). Be specific, personalised, and inspiring — reference their actual answers.`;
      userMessage = `Synthesise the following answers into rich, structured content for the ${sectionDesc} zone of a BLOOM Map. The content must be deeply personalised to this person's responses, personality, and goal.

SMART Goal: ${smartGoalText}
Core Values: ${coreValues?.join(", ")}
Dominant Personality Trait: ${personalityTrait}

User's answers:
${answersText}

Structure your synthesis as follows:
1. A powerful 2-sentence opening that captures their unique ${section.replace("-", " ")} theme
2. Three to five specific, actionable insights drawn directly from their answers (reference what they said)
3. A closing paragraph that connects back to their bold vision and the larger why

Be specific. Be bold. Avoid generic coaching clichés.

Return JSON: { "content": "the full synthesised section content" }`;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.85,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${err}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const result = JSON.parse(content);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-bloom-section:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
