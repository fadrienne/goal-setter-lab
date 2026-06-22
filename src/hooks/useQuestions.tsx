import { useState, useEffect } from "react";
import { allQuestions } from "@/utils/questions";
import { type Question } from "@/utils/questions/types";

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const selectedQuestions = ["extraversion", "agreeableness", "conscientiousness", "neuroticism", "openness"].flatMap(
      (trait) => {
        const traitQuestions = allQuestions.filter((q) => q.trait === trait);
        return [...traitQuestions]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
      }
    );
    setQuestions(selectedQuestions);
    setIsReady(true);
  }, []);

  return { questions, isReady };
};
