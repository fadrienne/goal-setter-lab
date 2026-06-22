import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ChevronRight } from "lucide-react";
import { generateBoldVisionInitial, generateBloomSection } from "@/utils/bloomAI";
import {
  BLOOM_QUESTIONS,
  type BloomSectionData,
  type BloomSectionAnswer,
} from "@/utils/bloomTypes";
import { type SmartGoal } from "@/utils/coreValues";

interface BoldVisionSectionProps {
  existing: BloomSectionData;
  existingBoldVisionStatement: string;
  personalityTrait: string;
  smartGoal: SmartGoal;
  coreValues: string[];
  fiveYearVision: string;
  onConfirm: (data: BloomSectionData, boldVisionStatement: string) => void;
  onBack: () => void;
}

type Phase =
  | "generating-initial"
  | "reviewing-initial"
  | "answering"
  | "generating-synthesis"
  | "reviewing-synthesis";

const BoldVisionSection = ({
  existing,
  existingBoldVisionStatement,
  personalityTrait,
  smartGoal,
  coreValues,
  fiveYearVision,
  onConfirm,
  onBack,
}: BoldVisionSectionProps) => {
  const questions = BLOOM_QUESTIONS.boldVision;

  const [phase, setPhase] = useState<Phase>(() => {
    if (existing.isConfirmed) return "reviewing-synthesis";
    if (existing.generatedContent) return existing.answers.length > 0 ? "reviewing-synthesis" : "reviewing-initial";
    if (existingBoldVisionStatement) return "answering";
    return "generating-initial";
  });

  const [boldVisionStatement, setBoldVisionStatement] = useState(existingBoldVisionStatement || "");
  const [currentQ, setCurrentQ] = useState(() =>
    existing.answers.length > 0 ? Math.min(existing.answers.length, questions.length - 1) : 0
  );
  const [answers, setAnswers] = useState<BloomSectionAnswer[]>(existing.answers);
  const [currentAnswer, setCurrentAnswer] = useState(existing.answers[0]?.answer ?? "");
  const [synthesis, setSynthesis] = useState(existing.generatedContent);
  const [confirmedSynthesis, setConfirmedSynthesis] = useState(existing.confirmedContent || existing.generatedContent);

  useEffect(() => {
    if (phase === "generating-initial") {
      generateBoldVisionInitial({ personalityTrait, smartGoal, coreValues, fiveYearVision })
        .then((content) => {
          setBoldVisionStatement(content);
          setPhase("reviewing-initial");
        })
        .catch(() => {
          setBoldVisionStatement(
            `I am on a bold journey to ${smartGoal.specific}. Every step I take is rooted in my deepest values and my commitment to lasting change. This is my moment to transform vision into reality.`
          );
          setPhase("reviewing-initial");
        });
    }
  }, []);

  const handleConfirmBoldVision = () => {
    setPhase("answering");
    setCurrentAnswer(answers[0]?.answer ?? "");
  };

  const handleAnswerSubmit = () => {
    if (!currentAnswer.trim()) return;
    const updated = [...answers];
    updated[currentQ] = { question: questions[currentQ], answer: currentAnswer.trim() };
    setAnswers(updated);

    if (currentQ < questions.length - 1) {
      const next = currentQ + 1;
      setCurrentQ(next);
      setCurrentAnswer(updated[next]?.answer ?? "");
    } else {
      generateSynthesis(updated);
    }
  };

  const generateSynthesis = async (finalAnswers: BloomSectionAnswer[]) => {
    setPhase("generating-synthesis");
    try {
      const content = await generateBloomSection({
        sectionKey: "boldVision",
        answers: finalAnswers,
        personalityTrait,
        smartGoal,
        coreValues,
      });
      setSynthesis(content);
      setConfirmedSynthesis(content);
      setPhase("reviewing-synthesis");
    } catch {
      setSynthesis("Your bold vision and purpose have been captured. Review and edit as needed.");
      setConfirmedSynthesis("Your bold vision and purpose have been captured.");
      setPhase("reviewing-synthesis");
    }
  };

  const handleBack = () => {
    if (phase === "answering") {
      if (currentQ > 0) {
        const prev = currentQ - 1;
        setCurrentQ(prev);
        setCurrentAnswer(answers[prev]?.answer ?? "");
      } else {
        setPhase("reviewing-initial");
      }
    } else if (phase === "reviewing-synthesis") {
      setPhase("answering");
      setCurrentQ(questions.length - 1);
      setCurrentAnswer(answers[questions.length - 1]?.answer ?? "");
    } else {
      onBack();
    }
  };

  const handleConfirm = () => {
    onConfirm(
      {
        answers,
        generatedContent: synthesis,
        confirmedContent: confirmedSynthesis.trim() || synthesis,
        isConfirmed: true,
      },
      boldVisionStatement
    );
  };

  if (phase === "generating-initial") {
    return (
      <Card>
        <CardContent className="pt-10 pb-10 flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-gray-600 text-center font-medium">
            Crafting your Bold Vision from your 5-year plan...
          </p>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            This will take a few seconds. We're synthesising your SMART goal and vision into a powerful first-person statement.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (phase === "reviewing-initial") {
    return (
      <div className="space-y-4">
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="text-primary text-xl">Your Bold Vision</CardTitle>
            <CardDescription>
              We have crafted your Bold Vision from your 5-year plan. Read it, make it yours, then confirm to begin building your BLOOM Map.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={boldVisionStatement}
              onChange={(e) => setBoldVisionStatement(e.target.value)}
              rows={6}
              className="resize-none text-base leading-relaxed font-medium text-gray-800 bg-accent/40"
            />
            <p className="text-xs text-muted-foreground">
              This statement will anchor the centre circle of your BLOOM Map.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
              <Button onClick={handleConfirmBoldVision} disabled={!boldVisionStatement.trim()} className="flex-1">
                This Is My Vision — Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === "answering") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-3 h-3 rounded-full bg-primary/60" />
          <span>Your Bold Vision is confirmed. Now let's explore its deeper meaning.</span>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Question {currentQ + 1} of {questions.length}
            </p>
            <p className="text-base font-medium text-gray-800">{questions[currentQ]}</p>
            {currentQ === 1 && coreValues.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {coreValues.map((v) => (
                  <span key={v} className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {v}
                  </span>
                ))}
              </div>
            )}
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
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1">Back</Button>
              <Button onClick={handleAnswerSubmit} disabled={!currentAnswer.trim()} className="flex-1">
                {currentQ < questions.length - 1 ? (
                  <>Next <ChevronRight className="ml-1 h-4 w-4" /></>
                ) : (
                  "Generate My Bold Vision Content"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === "generating-synthesis") {
    return (
      <Card>
        <CardContent className="pt-10 pb-10 flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-gray-600 text-center">Synthesising your Bold Vision content...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-accent/60 rounded-lg p-4 border-l-4 border-primary">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Your Bold Vision Statement</p>
        <p className="text-sm text-gray-700 italic">{boldVisionStatement}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Your Bold Vision Content</CardTitle>
          <CardDescription>
            Review your personalised synthesis below. Edit anything that doesn't feel right, then confirm to move forward.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={confirmedSynthesis}
            onChange={(e) => setConfirmedSynthesis(e.target.value)}
            rows={10}
            className="resize-none text-sm leading-relaxed"
          />
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleBack} className="flex-1">Back to Questions</Button>
            <Button onClick={handleConfirm} className="flex-1">Confirm & Continue to Legacy</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoldVisionSection;
