import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Edit2 } from "lucide-react";
import { BLOOM_SECTION_META, type BloomMapData, type BloomSectionKey } from "@/utils/bloomTypes";

interface BloomMapReviewProps {
  bloomData: BloomMapData;
  boldVisionStatement: string;
  onEditSection: (key: BloomSectionKey) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const BloomMapReview = ({
  bloomData,
  boldVisionStatement,
  onEditSection,
  onGenerate,
  isGenerating,
}: BloomMapReviewProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-primary">Your BLOOM Map is Ready</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Review all five sections below. Edit any section before generating your final BLOOM Map PDF.
        </p>
      </div>

      <div className="bg-accent/40 rounded-xl p-5 border border-primary/20">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Bold Vision Statement</p>
        <p className="text-sm text-gray-800 italic leading-relaxed">{boldVisionStatement}</p>
      </div>

      <div className="space-y-4">
        {BLOOM_SECTION_META.map((meta, i) => {
          const section = bloomData[meta.key];
          const sectionNumber = i + 1;
          return (
            <Card key={meta.key} className="overflow-hidden">
              <div className="h-1.5" style={{ backgroundColor: meta.color }} />
              <CardHeader className="pb-2 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: meta.color, color: meta.textColor }}
                    >
                      {meta.letter}
                    </div>
                    <CardTitle className="text-base text-primary">{meta.fullLabel}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600 font-medium">Section {sectionNumber} of 5 complete</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs"
                      onClick={() => onEditSection(meta.key)}
                    >
                      <Edit2 className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {section.confirmedContent || section.generatedContent || "No content yet."}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="pt-4 text-center">
        <Button
          size="lg"
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-10 py-6 text-base font-semibold"
          style={{ backgroundColor: "#988183" }}
        >
          {isGenerating ? "Generating your BLOOM Map..." : "Generate My BLOOM Map"}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          This will generate a downloadable PDF of your complete BLOOM Map.
        </p>
      </div>
    </div>
  );
};

export default BloomMapReview;
