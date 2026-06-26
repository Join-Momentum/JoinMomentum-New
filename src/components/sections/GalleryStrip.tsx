import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Camera } from "lucide-react";
import { useGalleryPhotos } from "@/hooks/useGalleryPhotos";

const engagementLabels: Record<string, string> = {
  advisory: "Advisory",
  training: "Training",
  exercise: "Exercise",
  deployment: "Deployment",
};

const PhotoSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[4/3] bg-secondary/40 border border-border" />
    <div className="pt-3 space-y-1.5">
      <div className="h-3 bg-secondary/40 rounded w-3/4" />
      <div className="h-2.5 bg-secondary/25 rounded w-1/2" />
    </div>
  </div>
);

const GalleryStrip = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { status, photos } = useGalleryPhotos();

  const preview = photos.slice(0, 3);

  return (
    <section className="relative py-20 md:py-28 bg-background border-t border-border">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-6 mb-4">
              <motion.div
                className="h-[1px] bg-accent"
                initial={{ width: 0 }}
                animate={isVisible ? { width: 60 } : {}}
                transition={{ duration: 0.6 }}
              />
              <motion.span
                className="font-mono-accent text-xs uppercase tracking-[0.2em] text-accent"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Gallery
              </motion.span>
            </div>

            <motion.h2
              className="text-xl md:text-2xl font-heading font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Selected delivery imagery
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              to="/gallery/photos"
              className="group inline-flex items-center gap-2 text-accent font-heading font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300"
            >
              View gallery
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Strip grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {status === "loading" &&
            Array.from({ length: 3 }).map((_, i) => <PhotoSkeleton key={i} />)}

          {status === "error" &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-card border border-border flex items-center justify-center">
                <Camera className="w-8 h-8 text-border" />
              </div>
            ))}

          {status === "idle" &&
            preview.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              >
                <Link to="/gallery/photos" className="group block relative overflow-hidden">
                  <div className="relative aspect-[4/3] bg-card border border-border overflow-hidden group-hover:border-accent transition-colors duration-300">
                    <img
                      src={item.imageUrl}
                      alt={item.caption || "Gallery image"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    {item.engagementType && (
                      <div className="absolute top-3 left-3">
                        <span className="font-mono-accent text-[9px] uppercase tracking-wider px-2 py-0.5 bg-background/90 text-accent border border-accent/30">
                          {engagementLabels[item.engagementType] ?? item.engagementType}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3">
                    <p className="font-body text-xs text-muted-foreground leading-snug line-clamp-2 flex-1">
                      {item.caption}
                    </p>
                    {item.region && (
                      <span className="flex-shrink-0 font-mono-accent text-[10px] uppercase tracking-wider text-muted-foreground/60">
                        {item.region}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryStrip;
