import { useState, useEffect } from "react";
import PersonalityTest from "@/components/PersonalityTest";
import ApiKeyInput from "@/components/ApiKeyInput";

const Index = () => {
  const [hasApiKey, setHasApiKey] = useState(false);
  
  useEffect(() => {
    // Check for API key on component mount
    const apiKey = localStorage.getItem('OPENAI_API_KEY');
    setHasApiKey(!!apiKey);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <img 
            src="/lovable-uploads/ca181cd7-05d0-4d3b-a8c8-0d74821bea15.png"
            alt="Thrive Hub Logo"
            className="mx-auto mb-8 w-48 h-auto"
          />
          <h1 className="text-4xl font-bold text-primary mb-4 font-sans">
            Discover Your Personality Profile
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto font-sans mb-8">
            Take our comprehensive Big Five personality assessment to understand yourself better
            and create a personalized vision for your future.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6">
            {!hasApiKey ? (
              <ApiKeyInput onApiKeySaved={() => setHasApiKey(true)} />
            ) : (
              <PersonalityTest />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;