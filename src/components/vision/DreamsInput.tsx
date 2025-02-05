import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface DreamsInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength: number;
  developmentArea?: string;
}

const DreamsInput = ({ value, onChange, maxLength, developmentArea = "Personal" }: DreamsInputProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your {developmentArea} Dreams</CardTitle>
        <CardDescription>
          Tell us about your aspirations, dreams, and what you envision for your future{developmentArea && ` in ${developmentArea.toLowerCase()}`}.
          Maximum {maxLength} characters.
          ({maxLength - value.length} characters remaining)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder={`Describe your dreams and aspirations${developmentArea ? ` for ${developmentArea.toLowerCase()}` : ''}...`}
          value={value}
          onChange={onChange}
          className="min-h-[200px]"
          maxLength={maxLength}
        />
      </CardContent>
    </Card>
  );
};

export default DreamsInput;