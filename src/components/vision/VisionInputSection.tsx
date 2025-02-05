import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import DreamsInput from "./DreamsInput";

interface VisionInputSectionProps {
  personalDreams: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  maxLength: number;
  developmentArea: string;
}

const VisionInputSection = ({
  personalDreams,
  onChange,
  onGenerate,
  isGenerating,
  maxLength,
  developmentArea
}: VisionInputSectionProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <DreamsInput
        value={personalDreams}
        onChange={onChange}
        maxLength={maxLength}
        developmentArea={developmentArea}
      />

      <div className="mt-8 text-center">
        <Button
          onClick={onGenerate}
          disabled={!personalDreams.trim() || isGenerating}
          className="bg-primary hover:bg-primary/90"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Your Vision Plan...
            </>
          ) : (
            'Generate Your Vision Plan'
          )}
        </Button>
      </div>
    </div>
  );
};

export default VisionInputSection;