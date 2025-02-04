import { useState, useEffect } from "react";
import { allQuestions } from "@/utils/questions";

export const useQuestions = () => {
  const [questions, setQuestions] = useState<typeof allQuestions>([]);

  useEffect(() => {
    if (questions.length === 0) {
      const selectedQuestions = ["extraversion", "agreeableness", "conscientiousness", "neuroticism", "openness"].flatMap(
        (trait) => {
          const traitQuestions = allQuestions.filter((q) => q.trait === trait);
          return traitQuestions
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        }
      );
      setQuestions(selectedQuestions);
    }
  }, [questions.length]);

  return questions;
};