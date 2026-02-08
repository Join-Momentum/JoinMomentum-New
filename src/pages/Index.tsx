import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/sections/HeroSection";
import WhoWeAre from "@/components/sections/WhoWeAre";
import Capabilities from "@/components/sections/Capabilities";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import ContactFooter from "@/components/sections/ContactFooter";

const Index = () => {
  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <HeroSection />
      <WhoWeAre />
      <Capabilities />
      <ProcessTimeline />
      <ContactFooter />
    </main>
  );
};

export default Index;
