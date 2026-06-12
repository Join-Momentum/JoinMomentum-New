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
import { useGalleryPhotos, type Photo } from "@/hooks/useGalleryPhotos";

const capabilityLabels: Record<string, string> = {
  "strategic-comms": "Strategic Comms",
  "cyber-security": "Cyber Security",
  "military-intel": "Military Intelligence",
  "emerging-tech": "Emerging Tech",
};

const engagementLabels: Record<string, string> = {
  advisory: "Advisory",
  training: "Training",
  exercise: "Exercise",
  deployment: "Deployment",
};

const segmentLabels: Record<string, string> = {
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

const GalleryImage = ({ item, sizes = "800px" }: { item: Photo; sizes?: string }) => (
  <img
    src={item.imageUrl}
    alt={item.caption}
    className="w-full h-full object-cover"
    loading="lazy"
    sizes={sizes}
  />
);

const PhotoSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[4/3] bg-secondary/40 border border-border" />
    <div className="pt-2.5 space-y-1.5">
      <div className="h-3 bg-secondary/40 rounded w-3/4" />
      <div className="h-2.5 bg-secondary/25 rounded w-1/2" />
    </div>
  </div>
);

const GalleryPhotos = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const [capFilter, setCapFilter] = useState("all");
  const [engFilter, setEngFilter] = useState("all");
  const [segFilter, setSegFilter] = useState("all");
  const [lightboxItem, setLightboxItem] = useState<Photo | null>(null);

  const { status, photos } = useGalleryPhotos();

  const filtered = useMemo(
    () =>
      photos.filter(
        (p) =>
          (capFilter === "all" || p.capability === capFilter) &&
          (engFilter === "all" || p.engagementType === engFilter) &&
          (segFilter === "all" || p.segment === segFilter)
      ),
    [photos, capFilter, engFilter, segFilter]
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
            {Object.keys(capabilityLabels).map((k) => (
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
            {Object.keys(engagementLabels).map((k) => (
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

          {/* Loading */}
          {status === "loading" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PhotoSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="py-24 text-center">
              <Camera className="w-8 h-8 text-border mx-auto mb-4" />
              <p className="font-mono-accent text-sm text-muted-foreground">
                Failed to load gallery. Please try again later.
              </p>
            </div>
          )}

          {/* Loaded */}
          {status === "idle" && (
            <>
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
                        <div className="relative aspect-[4/3] overflow-hidden border border-border group-hover:border-accent transition-colors duration-300">
                          <GalleryImage item={item} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                          {item.engagementType && (
                            <div className="absolute top-3 left-3">
                              <span className="font-mono-accent text-[9px] uppercase tracking-wider px-2 py-0.5 bg-background/90 text-accent border border-accent/30">
                                {engagementLabels[item.engagementType] ?? item.engagementType}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="pt-2.5">
                          <p className="font-body text-xs text-muted-foreground leading-snug line-clamp-2">
                            {item.caption}
                          </p>
                          <p className="font-mono-accent text-[10px] text-muted-foreground/50 mt-1">
                            {[item.region, item.window].filter(Boolean).join(" · ")}
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
            </>
          )}
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
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <GalleryImage item={lightboxItem} sizes="768px" />
              </div>
              <div className="px-6 py-5 border-t border-border">
                <p className="font-body text-sm text-foreground leading-relaxed mb-1">
                  {lightboxItem.caption}
                </p>
                <div className="flex flex-wrap gap-3 mt-3">
                  {lightboxItem.engagementType && (
                    <span className="font-mono-accent text-[10px] uppercase tracking-wider text-accent border border-accent/30 px-2 py-0.5">
                      {engagementLabels[lightboxItem.engagementType] ?? lightboxItem.engagementType}
                    </span>
                  )}
                  {lightboxItem.capability && (
                    <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5">
                      {capabilityLabels[lightboxItem.capability] ?? lightboxItem.capability}
                    </span>
                  )}
                  {lightboxItem.segment && (
                    <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5">
                      {segmentLabels[lightboxItem.segment] ?? lightboxItem.segment}
                    </span>
                  )}
                  {(lightboxItem.region || lightboxItem.window) && (
                    <span className="font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5">
                      {[lightboxItem.region, lightboxItem.window].filter(Boolean).join(" · ")}
                    </span>
                  )}
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
