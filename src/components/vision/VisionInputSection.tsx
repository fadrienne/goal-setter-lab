import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import DreamsInput from "./DreamsInput";

interface VisionInputSectionProps {
  personalDreams: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  maxLength: number;
}

const VisionInputSection = ({
  personalDreams,
  onChange,
  onGenerate,
  isGenerating,
  maxLength
}: VisionInputSectionProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <DreamsInput
        value={personalDreams}
        onChange={onChange}
        maxLength={maxLength}
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