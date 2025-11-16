import { Hero } from "@/components/Hero";
import { EmbeddingSpaceMap } from "@/components/EmbeddingSpaceMap";
import { DistancePlayground } from "@/components/DistancePlayground";
import { HowPythiaWorks } from "@/components/HowPythiaWorks";

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <Hero />
      <EmbeddingSpaceMap />
      <DistancePlayground />
      <HowPythiaWorks />
    </div>
  );
};

export default Index;
