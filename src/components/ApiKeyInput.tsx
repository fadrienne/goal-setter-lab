import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { KeyRound } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeySaved: () => void;
}

const ApiKeyInput = ({ onApiKeySaved }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        variant: "destructive",
        title: "API Key Required",
        description: "Please enter your OpenAI API key to continue."
      });
      return;
    }
    localStorage.setItem('OPENAI_API_KEY', apiKey);
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved for this session."
    });
    onApiKeySaved();
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
          <KeyRound className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl mb-2">OpenAI API Key Required</CardTitle>
        <CardDescription className="text-base">
          To generate personalized vision plans, we need your OpenAI API key. 
          This will only be stored in your browser for this session.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter your OpenAI API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="text-center"
            />
            <p className="text-sm text-muted-foreground text-center">
              Your API key will be stored securely in your browser's local storage
            </p>
          </div>
          <Button type="submit" className="w-full">
            Save API Key & Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;