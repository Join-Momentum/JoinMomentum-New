import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Capabilities from "./pages/Capabilities";
import Solutions from "./pages/Solutions";
import WhoWeServe from "./pages/WhoWeServe";
import Insights from "./pages/Insights";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ResponsibleAI from "./pages/ResponsibleAI";
import SecurityPractices from "./pages/SecurityPractices";
import Marketplace from "./pages/Marketplace";
import GalleryPhotos from "./pages/GalleryPhotos";
import GalleryVideos from "./pages/GalleryVideos";
import CapabilityStatement from "./pages/CapabilityStatement";
import MarketplaceCTIPS from "./pages/MarketplaceCTIPS";
import CapabilityStrategicComms from "./pages/CapabilityStrategicComms";
import CapabilityCyberSecurity from "./pages/CapabilityCyberSecurity";
import CapabilityMilitaryIntelligence from "./pages/CapabilityMilitaryIntelligence";
import CapabilityEmergingTech from "./pages/CapabilityEmergingTech";
import SolutionCapabilityAssessment from "./pages/SolutionCapabilityAssessment";
import SolutionTrainingExercises from "./pages/SolutionTrainingExercises";
import SolutionOperationalAdvisory from "./pages/SolutionOperationalAdvisory";
import SolutionServiceDeployment from "./pages/SolutionServiceDeployment";
import InsightArticle from "./pages/InsightArticle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Core */}
          <Route path="/" element={<Index />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/who-we-serve" element={<WhoWeServe />} />
          <Route path="/about" element={<About />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightArticle />} />
          <Route path="/contact" element={<Contact />} />

          {/* Capability subpages */}
          <Route path="/capabilities/strategic-communications-information-operations" element={<CapabilityStrategicComms />} />
          <Route path="/capabilities/cyber-security-critical-infrastructure-defence" element={<CapabilityCyberSecurity />} />
          <Route path="/capabilities/military-intelligence-operational-advantage" element={<CapabilityMilitaryIntelligence />} />
          <Route path="/capabilities/emerging-technology-ai-in-defence" element={<CapabilityEmergingTech />} />

          {/* Solution subpages */}
          <Route path="/solutions/capability-assessment-roadmapping" element={<SolutionCapabilityAssessment />} />
          <Route path="/solutions/training-exercises-capacity-development" element={<SolutionTrainingExercises />} />
          <Route path="/solutions/operational-advisory-embedded-support" element={<SolutionOperationalAdvisory />} />
          <Route path="/solutions/service-deployment-programme-delivery" element={<SolutionServiceDeployment />} />

          {/* Marketplace */}
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/cyber-threat-intelligence-portfolio-simulation" element={<MarketplaceCTIPS />} />

          {/* Gallery */}
          <Route path="/gallery" element={<GalleryPhotos />} />
          <Route path="/gallery/photos" element={<GalleryPhotos />} />
          <Route path="/gallery/videos" element={<GalleryVideos />} />

          {/* Capability Statement */}
          <Route path="/capability-statement" element={<CapabilityStatement />} />

          {/* Trust / practice */}
          <Route path="/security-responsible-practice" element={<SecurityPractices />} />
          <Route path="/responsible-use-of-ai" element={<ResponsibleAI />} />
          <Route path="/responsible-ai" element={<ResponsibleAI />} />

          {/* Legal */}
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms-of-use" element={<Terms />} />
          <Route path="/legal/cookies" element={<NotFound />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
