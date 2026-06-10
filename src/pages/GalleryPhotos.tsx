import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Camera, Video } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type GalleryItem = {
  id: string;
  caption: string;
  imageUrl: string;
  capability: "strategic-comms" | "cyber-security" | "military-intel" | "emerging-tech";
  engagementType: "advisory" | "training" | "exercise" | "deployment";
  segment: "government" | "intelligence" | "cni" | "international";
  region: string;
  window: string;
};

const photos: GalleryItem[] = [
  {
    id: "ph-001",
    caption: "Cyber simulation — critical infrastructure cohort, Q1 2026",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80",
    capability: "cyber-security",
    engagementType: "exercise",
    segment: "cni",
    region: "West Africa",
    window: "Q1 2026",
  },
  {
    id: "ph-002",
    caption: "Strategic communications workshop — government cohort, Q4 2025",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop&q=80",
    capability: "strategic-comms",
    engagementType: "training",
    segment: "government",
    region: "East Africa",
    window: "Q4 2025",
  },
  {
    id: "ph-003",
    caption: "Intelligence operations capacity development — Q3 2025",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
    capability: "military-intel",
    engagementType: "training",
    segment: "intelligence",
    region: "Southern Africa",
    window: "Q3 2025",
  },
  {
    id: "ph-004",
    caption: "Operational advisory engagement — planning cycle support, Q2 2025",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80",
    capability: "military-intel",
    engagementType: "advisory",
    segment: "government",
    region: "West Africa",
    window: "Q2 2025",
  },
  {
    id: "ph-005",
    caption: "Emerging technology integration workshop — AI governance, Q1 2025",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80",
    capability: "emerging-tech",
    engagementType: "training",
    segment: "international",
    region: "North Africa",
    window: "Q1 2025",
  },
  {
    id: "ph-006",
    caption: "Tabletop exercise — cross-functional crisis simulation, Q4 2024",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&q=80",
    capability: "cyber-security",
    engagementType: "exercise",
    segment: "government",
    region: "West Africa",
    window: "Q4 2024",
  },
  {
    id: "ph-007",
    caption: "Capability assessment — CNI operator, Q3 2024",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80",
    capability: "cyber-security",
    engagementType: "advisory",
    segment: "cni",
    region: "East Africa",
    window: "Q3 2024",
  },
  {
    id: "ph-008",
    caption: "Service deployment — security programme stand-up, Q2 2024",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80",
    capability: "strategic-comms",
    engagementType: "deployment",
    segment: "international",
    region: "Central Africa",
    window: "Q2 2024",
  },
];

const capabilityLabels: Record<GalleryItem["capability"], string> = {
  "strategic-comms": "Strategic Comms",
  "cyber-security": "Cyber Security",
  "military-intel": "Military Intelligence",
  "emerging-tech": "Emerging Tech",
};

const engagementLabels: Record<GalleryItem["engagementType"], string> = {
  advisory: "Advisory",
  training: "Training",
  exercise: "Exercise",
  deployment: "Deployment",
};

const segmentLabels: Record<GalleryItem["segment"], string> = {
  government: "Government & Defence",
  intelligence: "Intelligence",
  cni: "Critical Infrastructure",
  international: "International",
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

const GalleryImage = ({ item, sizes = "800px" }: { item: GalleryItem; sizes?: string }) => (
  <img
    src={item.imageUrl}
    alt={item.caption}
    className="w-full h-full object-cover"
    loading="lazy"
    sizes={sizes}
  />
);

const GalleryPhotos = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const [capFilter, setCapFilter] = useState<GalleryItem["capability"] | "all">("all");
  const [engFilter, setEngFilter] = useState<GalleryItem["engagementType"] | "all">("all");
  const [segFilter, setSegFilter] = useState<GalleryItem["segment"] | "all">("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () =>
      photos.filter(
        (p) =>
          (capFilter === "all" || p.capability === capFilter) &&
          (engFilter === "all" || p.engagementType === engFilter) &&
          (segFilter === "all" || p.segment === segFilter)
      ),
    [capFilter, engFilter, segFilter]
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
              to="/gallery/videos"
              className="font-mono-accent text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors duration-200 flex items-center gap-1.5"
            >
              <Video className="w-3 h-3" />
              Videos
            </Link>
          </div>

          <motion.h1
            className="text-3xl md:text-5xl font-heading font-bold mb-5 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Gallery — Photos
          </motion.h1>

          <motion.p
            className="text-muted-foreground font-body max-w-xl mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Selected anonymised imagery from Join Momentum delivery, shown under strict
            confidentiality controls. Captions describe context only. No client identifiers or
            sensitive detail are published.
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
            {(Object.keys(capabilityLabels) as GalleryItem["capability"][]).map((k) => (
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
            {(Object.keys(engagementLabels) as GalleryItem["engagementType"][]).map((k) => (
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
          {/* Result count */}
          <p className="font-mono-accent text-xs text-muted-foreground mb-8 uppercase tracking-wider">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </p>

          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                layout
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    className="group cursor-pointer"
                    onClick={() => setLightboxItem(item)}
                  >
                    {/* Image area */}
                    <div className="relative aspect-[4/3] overflow-hidden border border-border group-hover:border-accent transition-colors duration-300">
                      <GalleryImage item={item} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      {/* Engagement type badge */}
                      <div className="absolute top-3 left-3">
                        <span className="font-mono-accent text-[9px] uppercase tracking-wider px-2 py-0.5 bg-background/90 text-accent border border-accent/30">
                          {engagementLabels[item.engagementType]}
                        </span>
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="pt-2.5">
                      <p className="font-body text-xs text-muted-foreground leading-snug line-clamp-2">
                        {item.caption}
                      </p>
                      <p className="font-mono-accent text-[10px] text-muted-foreground/50 mt-1">
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
                <Camera className="w-8 h-8 text-border mx-auto mb-4" />
                <p className="font-mono-accent text-sm text-muted-foreground">
                  No items match the selected filters.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!lightboxItem} onOpenChange={(open) => !open && setLightboxItem(null)}>
        <DialogContent className="max-w-3xl bg-background border-border p-0 gap-0">
          <DialogTitle className="sr-only">
            {lightboxItem?.caption ?? "Gallery image"}
          </DialogTitle>
          {lightboxItem && (
            <>
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <GalleryImage item={lightboxItem} sizes="768px" />
              </div>
              {/* Caption bar */}
              <div className="px-6 py-5 border-t border-border">
                <p className="font-body text-sm text-foreground leading-relaxed mb-1">
                  {lightboxItem.caption}
                </p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="font-mono-accent text-[10px] uppercase tracking-wider text-accent border border-accent/30 px-2 py-0.5">
                    {engagementLabels[lightboxItem.engagementType]}
                  </span>
                  <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5">
                    {capabilityLabels[lightboxItem.capability]}
                  </span>
                  <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5">
                    {segmentLabels[lightboxItem.segment]}
                  </span>
                  <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5">
                    {lightboxItem.region} · {lightboxItem.window}
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
            All images are published following a two-person review process verifying content,
            confidentiality, and consent. No client identifying information, participant names,
            or sensitive operational detail is published. EXIF data is stripped on publication.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default GalleryPhotos;
