import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useToast } from "@/hooks/use-toast";
import VisionPlanPDF from "./VisionPlanPDF";
import { type VisionPlan } from "@/utils/coreValues";
import { useState } from "react";
import { Loader2, Flower2 } from "lucide-react";

interface VisionPlanDisplayProps {
  visionPlan: VisionPlan;
  developmentArea: string;
  onStartOver: () => void;
  onEdit: () => void;
  onBuildBloomMap: () => void;
  traitScores: {
    trait: string;
    score: number;
  }[];
  dominantTrait: {
    trait: string;
    score: number;
  };
}

const VisionPlanDisplay = ({
  visionPlan,
  developmentArea,
  onStartOver,
  onEdit,
  onBuildBloomMap,
  traitScores,
  dominantTrait
}: VisionPlanDisplayProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const pdfFileName = `${developmentArea.toLowerCase().replace(/\s+/g, '-')}-vision-plan.pdf`;

  const handlePdfGeneration = (loading: boolean, error: Error | null) => {
    if (error) {
      console.error('PDF Generation Error:', error);
      setPdfError(error.message);
      toast({
        title: "Error",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
      return;
    }

    if (loading && !isGenerating) {
      setIsGenerating(true);
      setPdfError(null);
      toast({
        title: "Generating PDF",
        description: "Your PDF is being generated...",
      });
    } else if (!loading && isGenerating) {
      setIsGenerating(false);
      toast({
        title: "PDF Ready",
        description: "Your PDF has been generated and is ready to download.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <Button onClick={onStartOver} variant="outline">
          Back to Core Values
        </Button>
        <Button onClick={onEdit} variant="outline">
          Edit Vision
        </Button>
        <PDFDownloadLink
          document={
            <VisionPlanPDF
              visionPlan={visionPlan}
              developmentArea={developmentArea}
              traitScores={traitScores}
              dominantTrait={dominantTrait}
            />
          }
          fileName={pdfFileName}
          className="inline-block"
        >
          {({ loading, error }) => {
            handlePdfGeneration(loading, error);
            return (
              <Button disabled={loading || !!pdfError}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : pdfError ? (
                  "Error - Try Again"
                ) : (
                  "Download PDF"
                )}
              </Button>
            );
          }}
        </PDFDownloadLink>
      </div>

      {/* BLOOM Map CTA */}
      <div
        className="rounded-xl p-6 text-center space-y-3 border-2"
        style={{ backgroundColor: "#FAF8F8", borderColor: "#988183" }}
      >
        <Flower2 className="mx-auto h-8 w-8" style={{ color: "#988183" }} />
        <h3 className="text-lg font-bold" style={{ color: "#4D4A56" }}>
          Ready to turn your vision into a BLOOM Map?
        </h3>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          The BLOOM Map Builder takes your vision deeper — five guided sections that generate a personalised, downloadable lotus-flower action map.
        </p>
        <Button
          onClick={onBuildBloomMap}
          size="lg"
          className="font-semibold"
          style={{ backgroundColor: "#988183" }}
        >
          Build Your BLOOM Map
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Your {developmentArea} SMART Goal</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Specific</h3>
            <p className="text-gray-600">{visionPlan.smartGoal.specific}</p>
          </div>
          <div>
            <h3 className="font-semibold">Measurable</h3>
            <p className="text-gray-600">{visionPlan.smartGoal.measurable}</p>
          </div>
          <div>
            <h3 className="font-semibold">Achievable</h3>
            <p className="text-gray-600">{visionPlan.smartGoal.achievable}</p>
          </div>
          <div>
            <h3 className="font-semibold">Relevant</h3>
            <p className="text-gray-600">{visionPlan.smartGoal.relevant}</p>
          </div>
          <div>
            <h3 className="font-semibold">Time-Bound</h3>
            <p className="text-gray-600">{visionPlan.smartGoal.timeBound}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Your {developmentArea} 5-Year Vision</h2>
        <p className="text-gray-600 mb-8">{visionPlan.fiveYearVision}</p>

        <h3 className="text-xl font-bold mb-4">Yearly Milestones</h3>
        <div className="space-y-6">
          {visionPlan.yearlyMilestones.map((milestone) => (
            <div key={milestone.year}>
              <h4 className="font-semibold mb-2">Year {milestone.year}</h4>
              <ul className="list-disc list-inside space-y-2">
                {milestone.goals.map((goal, index) => (
                  <li key={index} className="text-gray-600">{goal}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default VisionPlanDisplay;
