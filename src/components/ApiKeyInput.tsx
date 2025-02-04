import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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
    <Card>
      <CardHeader>
        <CardTitle>OpenAI API Key Required</CardTitle>
        <CardDescription>
          To generate personalized vision plans, we need your OpenAI API key. 
          This will only be stored in your browser for this session.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter your OpenAI API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Button type="submit">Save API Key</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;