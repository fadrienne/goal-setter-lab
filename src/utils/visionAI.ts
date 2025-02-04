interface VisionInput {
  personalityTrait: string;
  selectedAreas: string[];
  coreValues: string[];
  personalDreams: string;
}

export const generateAIVision = async (input: VisionInput) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('OPENAI_API_KEY')}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
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

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Error generating AI vision:', error);
    throw new Error('Failed to generate vision plan');
  }
};