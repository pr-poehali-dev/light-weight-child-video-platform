import Navigation from "@/components/Navigation";
import SafetyBanner from "@/components/SafetyBanner";
import GameCanvas from "@/components/GameCanvas";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-minecraft-grass to-minecraft-emerald">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <SafetyBanner />

        <div className="grid grid-cols-1 gap-6 mb-8">
          <GameCanvas />
        </div>
      </div>
    </div>
  );
};

export default Index;
