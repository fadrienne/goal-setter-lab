import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VisionPlan } from "@/utils/coreValues";
import { PDFDownloadLink } from '@react-pdf/renderer';
import VisionPlanPDF from './VisionPlanPDF';
import { Download, ArrowLeft } from 'lucide-react';

interface VisionPlanDisplayProps {
  visionPlan: VisionPlan;
  onStartOver: () => void;
  onEdit: () => void;
  developmentArea: string;
}

const VisionPlanDisplay = ({ visionPlan, onStartOver, onEdit, developmentArea }: VisionPlanDisplayProps) => {
  const pdfFileName = `${developmentArea.replace(/\s+/g, '-').toLowerCase()}-goals-and-vision.pdf`;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between mb-4">
        <Button 
          variant="outline"
          className="flex items-center gap-2"
          onClick={onStartOver}
        >
          <ArrowLeft className="w-4 h-4" />
          Choose another Development Area
        </Button>
        <PDFDownloadLink
          document={<VisionPlanPDF visionPlan={visionPlan} />}
          fileName={pdfFileName}
        >
          {({ loading }: { loading: boolean }) => (
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              disabled={loading}
            >
              <Download className="w-4 h-4" />
              {loading ? 'Preparing PDF...' : 'Export to PDF'}
            </Button>
          )}
        </PDFDownloadLink>
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader className="border-b bg-accent/50">
          <CardTitle className="text-2xl text-primary">Your SMART Goal</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="p-4 bg-accent rounded-lg">
              <h4 className="font-semibold text-lg text-primary mb-2">Specific</h4>
              <p className="text-gray-700">{visionPlan.smartGoal.specific}</p>
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <h4 className="font-semibold text-lg text-primary mb-2">Measurable</h4>
              <p className="text-gray-700">{visionPlan.smartGoal.measurable}</p>
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <h4 className="font-semibold text-lg text-primary mb-2">Achievable</h4>
              <p className="text-gray-700">{visionPlan.smartGoal.achievable}</p>
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <h4 className="font-semibold text-lg text-primary mb-2">Relevant</h4>
              <p className="text-gray-700">{visionPlan.smartGoal.relevant}</p>
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <h4 className="font-semibold text-lg text-primary mb-2">Time-Bound</h4>
              <p className="text-gray-700">{visionPlan.smartGoal.timeBound}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardHeader className="border-b bg-accent/50">
          <CardTitle className="text-2xl text-primary">Your 5-Year Vision</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {visionPlan.fiveYearVision}
          </p>
          
          <div className="space-y-8">
            {visionPlan.yearlyMilestones.map((milestone) => (
              <div 
                key={milestone.year} 
                className="border-l-4 border-primary pl-6 py-4"
              >
                <h4 className="font-semibold text-lg text-primary mb-4">
                  Year {milestone.year}
                </h4>
                <ul className="space-y-3">
                  {milestone.goals.map((goal, index) => (
                    <li 
                      key={index} 
                      className="text-gray-700 leading-relaxed flex items-start"
                    >
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center pt-4">
        <Button
          onClick={onStartOver}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-2"
        >
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default VisionPlanDisplay;