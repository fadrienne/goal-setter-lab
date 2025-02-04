export const calculateTraitScore = (questions: any[], answers: Record<number, number>, trait: string) => {
  const traitQuestions = questions.filter(q => q.trait === trait);
  let score = 0;
  let count = 0;
  
  traitQuestions.forEach(question => {
    const answer = answers[question.id];
    if (typeof answer === 'number') {
      score += question.reversed ? (6 - answer) : answer;
      count++;
    }
  });
  
  return count > 0 ? Math.round((score / count) * 10) / 10 : 0;
};

export const calculateDominantTrait = (questions: any[], answers: Record<number, number>) => {
  const traits = ["extraversion", "agreeableness", "conscientiousness", "neuroticism", "openness"];
  const scores = traits.map(trait => ({
    trait,
    score: calculateTraitScore(questions, answers, trait)
  }));
  
  return scores.reduce((highest, current) => 
    current.score > highest.score ? current : highest
  , scores[0]);
};