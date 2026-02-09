import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import WhoWeAre from "@/components/sections/WhoWeAre";
import CapabilitiesSection from "@/components/sections/Capabilities";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import WhyJoinMomentum from "@/components/sections/WhyJoinMomentum";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <WhoWeAre />
      <CapabilitiesSection />
      <ProcessTimeline />
      <WhyJoinMomentum />
      <Footer />
    </main>
  );
};

export default Index;
