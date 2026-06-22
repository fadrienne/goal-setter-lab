import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Loader2, Zap } from "lucide-react";
import BoldVisionSection from "./BoldVisionSection";
import BloomSection from "./BloomSection";
import BloomMapReview from "./BloomMapReview";
import BloomMapPDF from "./BloomMapPDF";
import ShiftModal from "./ShiftModal";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useBloomMap } from "@/hooks/useBloomMap";
import {
  BLOOM_SECTION_META,
  emptySection,
  type BloomMapData,
  type BloomSectionKey,
} from "@/utils/bloomTypes";
import { type VisionPlan } from "@/utils/coreValues";

interface BloomMapBuilderProps {
  visionPlan: VisionPlan;
  dominantTrait: string;
  coreValues: string[];
  developmentArea: string;
  onBack: () => void;
}

type FlowStage =
  | { type: "auth" }
  | { type: "section"; index: number }
  | { type: "review" }
  | { type: "pdf" };

const SECTION_KEYS: BloomSectionKey[] = [
  "boldVision",
  "legacy",
  "organicGrowth",
  "ownership",
  "multiplyImpact",
];

const BloomMapBuilder = ({
  visionPlan,
  dominantTrait,
  coreValues,
  developmentArea,
  onBack,
}: BloomMapBuilderProps) => {
  const { user } = useAuth();

  const [stage, setStage] = useState<FlowStage>(
    user ? { type: "section", index: 0 } : { type: "auth" }
  );
  const [bloomData, setBloomData] = useState<BloomMapData>({
    boldVision:    emptySection(),
    legacy:        emptySection(),
    organicGrowth: emptySection(),
    ownership:     emptySection(),
    multiplyImpact:emptySection(),
  });
  const [boldVisionStatement, setBoldVisionStatement] = useState("");
  const [completedSections, setCompletedSections] = useState<BloomSectionKey[]>([]);
  const [showShift, setShowShift] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const { saveSection } = useBloomMap({
    userId: user?.id ?? null,
    dominantTrait,
    coreValues,
    smartGoal: visionPlan.smartGoal,
    fiveYearVision: visionPlan.fiveYearVision,
    developmentArea,
  });

  const handleAuthSuccess = () => setStage({ type: "section", index: 0 });
  const handleSkipAuth  = () => setStage({ type: "section", index: 0 });

  const handleBoldVisionConfirm = (data: typeof bloomData["boldVision"], statement: string) => {
    const updated: BloomMapData = { ...bloomData, boldVision: data };
    setBloomData(updated);
    setBoldVisionStatement(statement);
    const newCompleted = [...completedSections.filter((k) => k !== "boldVision"), "boldVision"] as BloomSectionKey[];
    setCompletedSections(newCompleted);
    saveSection("boldVision", data, newCompleted);
    setStage({ type: "section", index: 1 });
  };

  const handleSectionConfirm = (sectionKey: BloomSectionKey, data: typeof bloomData[BloomSectionKey]) => {
    const updated: BloomMapData = { ...bloomData, [sectionKey]: data };
    setBloomData(updated);
    const newCompleted = [...completedSections.filter((k) => k !== sectionKey), sectionKey] as BloomSectionKey[];
    setCompletedSections(newCompleted);
    saveSection(sectionKey, data, newCompleted);
    const currentIndex = SECTION_KEYS.indexOf(sectionKey);
    if (currentIndex < SECTION_KEYS.length - 1) {
      setStage({ type: "section", index: currentIndex + 1 });
    } else {
      setStage({ type: "review" });
    }
  };

  const handleSectionBack = (index: number) => {
    if (index === 0) {
      onBack();
    } else {
      setStage({ type: "section", index: index - 1 });
    }
  };

  const handleEditSection = (key: BloomSectionKey) => {
    const idx = SECTION_KEYS.indexOf(key);
    setStage({ type: "section", index: idx });
  };

  const handleGeneratePDF = () => {
    setIsGeneratingPDF(true);
    setStage({ type: "pdf" });
  };

  const currentSectionIndex = stage.type === "section" ? stage.index : -1;
  const totalSections = SECTION_KEYS.length;
  const sectionProgress = completedSections.length;

  const pdfFileName = `bloom-map-${dominantTrait}.pdf`;

  return (
    <div className="relative space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">BLOOM Map Builder</h1>
          {stage.type !== "auth" && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {stage.type === "review" || stage.type === "pdf"
                ? `All ${totalSections} sections complete`
                : `Section ${Math.min(sectionProgress + 1, totalSections)} of ${totalSections}`}
            </p>
          )}
        </div>
        {stage.type !== "auth" && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-primary/40 text-primary hover:bg-primary/5"
            onClick={() => setShowShift(true)}
          >
            <Zap className="h-3.5 w-3.5" />
            SHIFT
          </Button>
        )}
      </div>

      {/* Progress bar */}
      {stage.type !== "auth" && (
        <div className="flex gap-1">
          {BLOOM_SECTION_META.map((meta, i) => (
            <div
              key={meta.key}
              className="flex-1 h-2 rounded-full transition-colors cursor-default"
              style={{
                backgroundColor: completedSections.includes(meta.key)
                  ? meta.color
                  : currentSectionIndex === i
                  ? `${meta.color}80`
                  : "#E5E7EB",
              }}
              title={`${meta.fullLabel}${completedSections.includes(meta.key) ? " ✓" : ""}`}
            />
          ))}
        </div>
      )}

      {/* Completed badges */}
      {stage.type !== "auth" && completedSections.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {completedSections.map((key) => {
            const meta = BLOOM_SECTION_META.find((m) => m.key === key)!;
            return (
              <Badge
                key={key}
                variant="outline"
                className="text-xs"
                style={{ borderColor: meta.color, color: meta.textColor === "#FAF8F8" ? "#4D4A56" : meta.textColor }}
              >
                {meta.letter} — {meta.label} ✓
              </Badge>
            );
          })}
        </div>
      )}

      {/* Stages */}
      {stage.type === "auth" && (
        <AuthForm onSuccess={handleAuthSuccess} onSkip={handleSkipAuth} />
      )}

      {stage.type === "section" && stage.index === 0 && (
        <BoldVisionSection
          existing={bloomData.boldVision}
          existingBoldVisionStatement={boldVisionStatement}
          personalityTrait={dominantTrait}
          smartGoal={visionPlan.smartGoal}
          coreValues={coreValues}
          fiveYearVision={visionPlan.fiveYearVision}
          onConfirm={handleBoldVisionConfirm}
          onBack={onBack}
        />
      )}

      {stage.type === "section" && stage.index > 0 && (
        <BloomSection
          key={SECTION_KEYS[stage.index]}
          sectionKey={SECTION_KEYS[stage.index]}
          sectionIndex={stage.index}
          existing={bloomData[SECTION_KEYS[stage.index]]}
          personalityTrait={dominantTrait}
          smartGoal={visionPlan.smartGoal}
          coreValues={coreValues}
          onConfirm={(data) => handleSectionConfirm(SECTION_KEYS[stage.index], data)}
          onBack={() => handleSectionBack(stage.index)}
        />
      )}

      {stage.type === "review" && (
        <BloomMapReview
          bloomData={bloomData}
          boldVisionStatement={boldVisionStatement}
          onEditSection={handleEditSection}
          onGenerate={handleGeneratePDF}
          isGenerating={isGeneratingPDF}
        />
      )}

      {stage.type === "pdf" && (
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-primary">Your BLOOM Map is ready!</h2>
            <p className="text-gray-600">
              Click below to download your personalised BLOOM Map PDF.
            </p>
          </div>

          <PDFDownloadLink
            document={
              <BloomMapPDF
                bloomData={bloomData}
                boldVisionStatement={boldVisionStatement}
                dominantTrait={dominantTrait}
                coreValues={coreValues}
              />
            }
            fileName={pdfFileName}
          >
            {({ loading, error }) => (
              <Button
                size="lg"
                disabled={loading}
                className="px-10 py-6 text-base font-semibold"
                style={{ backgroundColor: "#988183" }}
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Preparing PDF...</>
                ) : error ? (
                  "Error — Try Again"
                ) : (
                  "Download My BLOOM Map PDF"
                )}
              </Button>
            )}
          </PDFDownloadLink>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStage({ type: "review" })}>
              Back to Review
            </Button>
            <Button variant="outline" onClick={onBack}>
              Back to Vision Plan
            </Button>
          </div>
        </div>
      )}

      {/* SHIFT Modal */}
      <ShiftModal
        open={showShift}
        onClose={() => setShowShift(false)}
        personalityTrait={dominantTrait}
        smartGoal={visionPlan.smartGoal}
        coreValues={coreValues}
      />
    </div>
  );
};

export default BloomMapBuilder;
