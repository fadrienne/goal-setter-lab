import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ChevronRight } from "lucide-react";
import { generateBloomSection } from "@/utils/bloomAI";
import {
  BLOOM_QUESTIONS,
  BLOOM_SECTION_META,
  type BloomSectionKey,
  type BloomSectionData,
  type BloomSectionAnswer,
} from "@/utils/bloomTypes";
import { type SmartGoal } from "@/utils/coreValues";

interface BloomSectionProps {
  sectionKey: BloomSectionKey;
  sectionIndex: number;
  existing: BloomSectionData;
  personalityTrait: string;
  smartGoal: SmartGoal;
  coreValues: string[];
  onConfirm: (data: BloomSectionData) => void;
  onBack: () => void;
}

type Phase = "answering" | "generating" | "reviewing";

const BloomSection = ({
  sectionKey,
  sectionIndex,
  existing,
  personalityTrait,
  smartGoal,
  coreValues,
  onConfirm,
  onBack,
}: BloomSectionProps) => {
  const meta = BLOOM_SECTION_META[sectionIndex];
  const questions = BLOOM_QUESTIONS[sectionKey];

  const [phase, setPhase] = useState<Phase>(() =>
    existing.isConfirmed ? "reviewing" : existing.generatedContent ? "reviewing" : "answering"
  );
  const [currentQ, setCurrentQ] = useState(() =>
    existing.answers.length > 0 ? Math.min(existing.answers.length, questions.length - 1) : 0
  );
  const [answers, setAnswers] = useState<BloomSectionAnswer[]>(
    existing.answers.length > 0 ? existing.answers : []
  );
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [generated, setGenerated] = useState(existing.generatedContent);
  const [confirmed, setConfirmed] = useState(existing.confirmedContent || existing.generatedContent);
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing.answers.length > 0 && currentAnswer === "") {
      const already = existing.answers[currentQ]?.answer ?? "";
      setCurrentAnswer(already);
    }
  }, [currentQ]);

  const handleAnswerSubmit = () => {
    if (!currentAnswer.trim()) return;
    const updated = [...answers];
    updated[currentQ] = { question: questions[currentQ], answer: currentAnswer.trim() };
    setAnswers(updated);

    if (currentQ < questions.length - 1) {
      const nextQ = currentQ + 1;
      setCurrentQ(nextQ);
      setCurrentAnswer(updated[nextQ]?.answer ?? "");
    } else {
      setCurrentQ(questions.length - 1);
      generate(updated);
    }
  };

  const generate = async (finalAnswers: BloomSectionAnswer[]) => {
    setPhase("generating");
    setError("");
    try {
      const content = await generateBloomSection({
        sectionKey,
        answers: finalAnswers,
        personalityTrait,
        smartGoal,
        coreValues,
      });
      setGenerated(content);
      setConfirmed(content);
      setPhase("reviewing");
    } catch {
      setError("Something went wrong generating your content. You can try again or continue with your answers.");
      setPhase("answering");
    }
  };

  const handleConfirm = () => {
    onConfirm({
      answers,
      generatedContent: generated,
      confirmedContent: confirmed.trim() || generated,
      isConfirmed: true,
    });
  };

  const handleRegenerate = () => {
    generate(answers);
  };

  const handleBack = () => {
    if (phase === "reviewing") {
      setPhase("answering");
      setCurrentQ(questions.length - 1);
      setCurrentAnswer(answers[questions.length - 1]?.answer ?? "");
    } else if (currentQ > 0) {
      const prev = currentQ - 1;
      setCurrentQ(prev);
      setCurrentAnswer(answers[prev]?.answer ?? "");
    } else {
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
          style={{ backgroundColor: meta.color, color: meta.textColor }}
        >
          {meta.letter}
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary">{meta.fullLabel}</h2>
          <p className="text-sm text-muted-foreground">
            {phase === "answering"
              ? `Question ${currentQ + 1} of ${questions.length}`
              : phase === "generating"
              ? "Generating your personalised content..."
              : "Review and confirm your section"}
          </p>
        </div>
      </div>

      {phase === "answering" && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <p className="text-base font-medium text-gray-800">{questions[currentQ]}</p>
            <Textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={5}
              className="resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAnswerSubmit();
              }}
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
              <Button onClick={handleAnswerSubmit} disabled={!currentAnswer.trim()} className="flex-1">
                {currentQ < questions.length - 1 ? (
                  <>Next <ChevronRight className="ml-1 h-4 w-4" /></>
                ) : (
                  "Generate My Content"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {phase === "generating" && (
        <Card>
          <CardContent className="pt-10 pb-10 flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-gray-600 text-center">
              Crafting your personalised {meta.label} content...
            </p>
          </CardContent>
        </Card>
      )}

      {phase === "reviewing" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Your {meta.label} Content</CardTitle>
            <p className="text-sm text-muted-foreground">
              Read through your personalised content below. Edit anything that doesn't feel right, then confirm.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={confirmed}
              onChange={(e) => setConfirmed(e.target.value)}
              rows={10}
              className="resize-none text-sm leading-relaxed"
            />
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back to Questions
              </Button>
              <Button variant="outline" onClick={handleRegenerate} className="flex-1">
                Regenerate
              </Button>
              <Button onClick={handleConfirm} className="flex-1">
                Confirm & Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BloomSection;
