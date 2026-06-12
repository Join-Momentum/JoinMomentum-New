import { useState, useEffect } from "react";

export type GalleryVideo = {
  id: string;
  title: string;
  caption: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  capability: string;
  engagementType: string;
  segment: string;
  region: string;
  window: string;
};

type State =
  | { status: "idle"; videos: GalleryVideo[] }
  | { status: "loading"; videos: GalleryVideo[] }
  | { status: "error"; videos: GalleryVideo[]; error: string };

export function useGalleryVideos(): State {
  const [state, setState] = useState<State>({ status: "loading", videos: [] });

  useEffect(() => {
    fetch("/api/gallery-videos")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<{ videos: GalleryVideo[] }>;
      })
      .then((data) => setState({ status: "idle", videos: data.videos ?? [] }))
      .catch((err: Error) =>
        setState({ status: "error", videos: [], error: err.message })
      );
  }, []);

  return state;
}
