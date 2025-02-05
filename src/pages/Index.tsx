import PersonalityTest from "@/components/PersonalityTest";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/ca181cd7-05d0-4d3b-a8c8-0d74821bea15.png"
            alt="Thrive Hub Logo"
            className="mx-auto mb-8 w-48 h-auto"
          />
          <h1 className="text-4xl font-bold text-primary mb-4">
            Discover Your Personality-Based Goal Setting Style
          </h1>
        </div>
        <PersonalityTest />
      </div>
    </div>
  );
};

export default Index;