import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { coreValues } from "@/utils/coreValues";

interface CoreValuesSelectorProps {
  selectedValues: string[];
  onValueSelection: (value: string) => void;
}

const CoreValuesSelector = ({ selectedValues, onValueSelection }: CoreValuesSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Core Values</CardTitle>
        <CardDescription>
          Choose 3 values that resonate most with your personal and professional aspirations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coreValues.map((value) => (
            <div key={value} className="flex items-center space-x-3 p-4 border rounded-lg">
              <Checkbox
                id={value}
                checked={selectedValues.includes(value)}
                onCheckedChange={() => onValueSelection(value)}
                disabled={selectedValues.length >= 3 && !selectedValues.includes(value)}
              />
              <label
                htmlFor={value}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {value}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoreValuesSelector;