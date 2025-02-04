import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface DreamsInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength: number;
}

const DreamsInput = ({ value, onChange, maxLength }: DreamsInputProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Dreams</CardTitle>
        <CardDescription>
          Tell us about your aspirations, dreams, and what you envision for your future.
          Maximum {maxLength} characters.
          ({maxLength - value.length} characters remaining)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Describe your dreams and aspirations..."
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