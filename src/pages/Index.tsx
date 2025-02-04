import PersonalityTest from "@/components/PersonalityTest";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Discover Your Personality Profile
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take our comprehensive Big Five personality assessment to understand yourself better
            and create a personalized vision for your future.
          </p>
        </div>
        
        <PersonalityTest />
      </div>
    </div>
  );
};

export default Index;