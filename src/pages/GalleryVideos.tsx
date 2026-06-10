import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Play, Video, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type VideoItem = {
  id: string;
  title: string;
  caption: string;
  duration: string;
  capability: "strategic-comms" | "cyber-security" | "military-intel" | "emerging-tech";
  engagementType: "advisory" | "training" | "exercise" | "deployment";
  segment: "government" | "intelligence" | "cni" | "international";
  region: string;
  window: string;
};

const videos: VideoItem[] = [
  {
    id: "vid-001",
    title: "Cyber Simulation Exercise Overview",
    caption:
      "Overview footage from a cross-functional cyber exercise — critical infrastructure cohort. Screens and sensitive content obscured.",
    duration: "4:12",
    capability: "cyber-security",
    engagementType: "exercise",
    segment: "cni",
    region: "West Africa",
    window: "Q1 2026",
  },
  {
    id: "vid-002",
    title: "Capacity Development Programme — Briefing",
    caption:
      "Briefing-style summary from a strategic communications capacity development programme. No participant identifiers included.",
    duration: "6:48",
    capability: "strategic-comms",
    engagementType: "training",
    segment: "government",
    region: "East Africa",
    window: "Q3 2025",
  },
  {
    id: "vid-003",
    title: "Intelligence Operations — Workshop Highlights",
    caption:
      "Selected workshop content from an intelligence operations capacity development engagement.",
    duration: "3:30",
    capability: "military-intel",
    engagementType: "training",
    segment: "intelligence",
    region: "Southern Africa",
    window: "Q4 2024",
  },
];

const capabilityLabels: Record<VideoItem["capability"], string> = {
  "strategic-comms": "Strategic Comms",
  "cyber-security": "Cyber Security",
  "military-intel": "Military Intelligence",
  "emerging-tech": "Emerging Tech",
};

const engagementLabels: Record<VideoItem["engagementType"], string> = {
  advisory: "Advisory",
  training: "Training",
  exercise: "Exercise",
  deployment: "Deployment",
};

const FilterPill = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`font-mono-accent text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-all duration-200 ${
      active
        ? "border-accent bg-accent/10 text-accent"
        : "border-border bg-secondary/50 text-muted-foreground hover:border-accent/50 hover:text-foreground"
    }`}
  >
    {label}
  </button>
);

const PlaceholderThumbnail = ({ item }: { item: VideoItem }) => (
  <div className="relative w-full h-full bg-card">
    <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-background/70 to-secondary/60" />
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <div className="w-14 h-14 rounded-full border border-accent/40 bg-accent/5 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent transition-all duration-300">
        <Play className="w-6 h-6 text-accent fill-accent" />
      </div>
      <span className="font-mono-accent text-[9px] uppercase tracking-wider text-border/50">
        {item.id}
      </span>
    </div>
    {/* Duration badge */}
    <div className="absolute bottom-3 right-3">
      <span className="font-mono-accent text-[10px] bg-background/90 text-muted-foreground border border-border px-2 py-0.5">
        {item.duration}
      </span>
    </div>
  </div>
);

const GalleryVideos = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const [capFilter, setCapFilter] = useState<VideoItem["capability"] | "all">("all");
  const [engFilter, setEngFilter] = useState<VideoItem["engagementType"] | "all">("all");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const filtered = useMemo(
    () =>
      videos.filter(
        (v) =>
          (capFilter === "all" || v.capability === capFilter) &&
          (engFilter === "all" || v.engagementType === engFilter)
      ),
    [capFilter, engFilter]
  );

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <motion.span
              className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent"
              initial={{ opacity: 0 }}
              animate={heroVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Gallery
            </motion.span>
            <span className="text-border">·</span>
            <Link
              to="/gallery/photos"
              className="font-mono-accent text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors duration-200 flex items-center gap-1.5"
            >
              <Camera className="w-3 h-3" />
              Photos
            </Link>
          </div>

          <motion.h1
            className="text-3xl md:text-5xl font-heading font-bold mb-5 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Gallery — Videos
          </motion.h1>

          <motion.p
            className="text-muted-foreground font-body max-w-xl mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Selected anonymised video from Join Momentum delivery and briefings. Captions and
            transcripts describe context only. Screens and identifying content are obscured.
          </motion.p>

          <motion.div
            className="w-16 h-px bg-accent"
            initial={{ scaleX: 0 }}
            animate={heroVisible ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border px-6 md:px-12 py-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground mr-1 hidden sm:inline">
              Capability:
            </span>
            <FilterPill label="All" active={capFilter === "all"} onClick={() => setCapFilter("all")} />
            {(Object.keys(capabilityLabels) as VideoItem["capability"][]).map((k) => (
              <FilterPill
                key={k}
                label={capabilityLabels[k]}
                active={capFilter === k}
                onClick={() => setCapFilter(k)}
              />
            ))}

            <span className="w-px h-4 bg-border mx-1 hidden sm:inline-block" />

            <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground mr-1 hidden sm:inline">
              Type:
            </span>
            <FilterPill label="All" active={engFilter === "all"} onClick={() => setEngFilter("all")} />
            {(Object.keys(engagementLabels) as VideoItem["engagementType"][]).map((k) => (
              <FilterPill
                key={k}
                label={engagementLabels[k]}
                active={engFilter === k}
                onClick={() => setEngFilter(k)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-mono-accent text-xs text-muted-foreground mb-8 uppercase tracking-wider">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </p>

          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                layout
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="group cursor-pointer"
                    onClick={() => setActiveVideo(item)}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden border border-border group-hover:border-accent transition-colors duration-300">
                      <PlaceholderThumbnail item={item} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      {/* Type badge */}
                      <div className="absolute top-3 left-3">
                        <span className="font-mono-accent text-[9px] uppercase tracking-wider px-2 py-0.5 bg-background/90 text-accent border border-accent/30">
                          {engagementLabels[item.engagementType]}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="pt-3">
                      <h3 className="font-heading font-semibold text-sm mb-1 group-hover:text-accent transition-colors duration-300 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground leading-snug line-clamp-2">
                        {item.caption}
                      </p>
                      <p className="font-mono-accent text-[10px] text-muted-foreground/50 mt-1.5">
                        {item.region} · {item.window}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 text-center"
              >
                <Video className="w-8 h-8 text-border mx-auto mb-4" />
                <p className="font-mono-accent text-sm text-muted-foreground">
                  No items match the selected filters.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Video modal */}
      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-w-3xl bg-background border-border p-0 gap-0">
          <DialogTitle className="sr-only">
            {activeVideo?.title ?? "Video"}
          </DialogTitle>
          {activeVideo && (
            <>
              {/* Player placeholder */}
              <div className="relative aspect-video w-full bg-card border-b border-border">
                <PlaceholderThumbnail item={activeVideo} />
              </div>
              {/* Info */}
              <div className="px-6 py-5">
                <h2 className="font-heading font-bold text-lg mb-1">{activeVideo.title}</h2>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                  {activeVideo.caption}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="font-mono-accent text-[10px] uppercase tracking-wider text-accent border border-accent/30 px-2 py-0.5">
                    {engagementLabels[activeVideo.engagementType]}
                  </span>
                  <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5">
                    {capabilityLabels[activeVideo.capability]}
                  </span>
                  <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5">
                    {activeVideo.region} · {activeVideo.window}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Confidentiality note */}
      <section className="pb-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto border border-border p-6">
          <p className="font-mono-accent text-[11px] uppercase tracking-wider text-muted-foreground/60 leading-relaxed">
            All video content is published following a two-person review verifying content,
            confidentiality, and consent. No client identifying information, participant names,
            or operational detail is included. Captions and subtitles are provided for all
            briefing-style content.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default GalleryVideos;
