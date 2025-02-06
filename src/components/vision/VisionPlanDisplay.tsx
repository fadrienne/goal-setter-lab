import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useToast } from "@/hooks/use-toast";
import VisionPlanPDF from "./VisionPlanPDF";
import { type VisionPlan } from "@/utils/coreValues";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface VisionPlanDisplayProps {
  visionPlan: VisionPlan;
  developmentArea: string;
  onStartOver: () => void;
  onEdit: () => void;
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
  traitScores,
  dominantTrait 
}: VisionPlanDisplayProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfFileName = `${developmentArea.toLowerCase().replace(/\s+/g, '-')}-vision-plan.pdf`;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
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
        >
          {({ loading, error }) => {
            if (loading && !isGenerating) {
              setIsGenerating(true);
              toast({
                title: "Generating PDF",
                description: "Your PDF is being generated...",
              });
            }
            
            if (!loading && isGenerating) {
              setIsGenerating(false);
              toast({
                title: "PDF Ready",
                description: "Your PDF has been generated and is ready to download.",
              });
            }

            if (error) {
              toast({
                title: "Error",
                description: "There was an error generating your PDF. Please try again.",
                variant: "destructive",
              });
            }

            return (
              <Button disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  "Download PDF"
                )}
              </Button>
            );
          }}
        </PDFDownloadLink>
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