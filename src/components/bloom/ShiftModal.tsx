import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { getShiftResponse } from "@/utils/bloomAI";
import { SHIFT_STEPS } from "@/utils/bloomTypes";
import { type SmartGoal } from "@/utils/coreValues";

interface ShiftModalProps {
  open: boolean;
  onClose: () => void;
  personalityTrait: string;
  smartGoal: SmartGoal;
  coreValues: string[];
}

interface StepEntry {
  step: string;
  label: string;
  answer: string;
  coaching: string;
}

const ShiftModal = ({ open, onClose, personalityTrait, smartGoal, coreValues }: ShiftModalProps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [coaching, setCoaching] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState<StepEntry[]>([]);
  const [done, setDone] = useState(false);

  const currentStep = SHIFT_STEPS[stepIndex];

  const handleSubmit = async () => {
    if (!answer.trim() || loading) return;
    setLoading(true);
    try {
      const previousAnswers = completed.map((e) => ({
        step: e.step,
        label: e.label,
        answer: e.answer,
      }));
      const response = await getShiftResponse({
        step: currentStep.key,
        stepLabel: currentStep.label,
        userAnswer: answer,
        previousAnswers,
        personalityTrait,
        smartGoal,
        coreValues,
      });
      setCoaching(response);
    } catch {
      setCoaching("Take a breath. Whatever you just wrote matters. Keep going.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCompleted((prev) => [
      ...prev,
      { step: currentStep.key, label: currentStep.label, answer, coaching },
    ]);
    if (stepIndex < SHIFT_STEPS.length - 1) {
      setStepIndex((i) => i + 1);
      setAnswer("");
      setCoaching("");
    } else {
      setDone(true);
    }
  };

  const handleClose = () => {
    setStepIndex(0);
    setAnswer("");
    setCoaching("");
    setCompleted([]);
    setDone(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">SHIFT — Mindset Reset</DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="space-y-4 py-2">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="font-semibold text-green-800 text-lg mb-1">SHIFT complete.</p>
              <p className="text-green-700 text-sm">
                You've moved through all five steps. The block has been seen, named, and reframed. Now take the action you identified.
              </p>
            </div>
            <div className="space-y-3">
              {completed.map((entry) => (
                <div key={entry.step} className="border rounded-lg p-3 text-sm">
                  <span className="font-semibold text-primary">{entry.step} — {entry.label}</span>
                  <p className="text-gray-700 mt-1">{entry.answer}</p>
                </div>
              ))}
            </div>
            <Button className="w-full" onClick={handleClose}>Close & Continue</Button>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="flex gap-1">
              {SHIFT_STEPS.map((s, i) => (
                <div
                  key={s.key}
                  className={`flex-1 h-1.5 rounded-full transition-colors ${
                    i < stepIndex ? "bg-primary" : i === stepIndex ? "bg-primary/60" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge
                  className="text-base font-bold px-3 py-0.5"
                  style={{ backgroundColor: "#988183", color: "#FAF8F8" }}
                >
                  {currentStep.key}
                </Badge>
                <span className="font-semibold text-primary">{currentStep.label}</span>
              </div>
              <p className="text-gray-600 text-sm">{currentStep.prompt}</p>
            </div>

            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={4}
              className="resize-none"
            />

            {!coaching && (
              <Button onClick={handleSubmit} disabled={!answer.trim() || loading} className="w-full">
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Submit"}
              </Button>
            )}

            {coaching && (
              <div className="space-y-3">
                <div className="bg-accent rounded-lg p-4 text-sm text-gray-700 italic border-l-4 border-primary">
                  {coaching}
                </div>
                <Button onClick={handleNext} className="w-full">
                  {stepIndex < SHIFT_STEPS.length - 1 ? `Next: ${SHIFT_STEPS[stepIndex + 1].key} — ${SHIFT_STEPS[stepIndex + 1].label}` : "Complete SHIFT"}
                </Button>
              </div>
            )}

            <p className="text-xs text-center text-muted-foreground">
              Step {stepIndex + 1} of {SHIFT_STEPS.length}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShiftModal;
