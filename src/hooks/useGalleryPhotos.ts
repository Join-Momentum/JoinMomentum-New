import { useState, useEffect } from "react";

export type Photo = {
  id: string;
  caption: string;
  imageUrl: string;
  capability: string;
  engagementType: string;
  segment: string;
  region: string;
  window: string;
};

type State =
  | { status: "idle"; photos: Photo[] }
  | { status: "loading"; photos: Photo[] }
  | { status: "error"; photos: Photo[]; error: string };

export function useGalleryPhotos(): State {
  const [state, setState] = useState<State>({ status: "loading", photos: [] });

  useEffect(() => {
    fetch("/api/gallery-photos")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<{ photos: Photo[] }>;
      })
      .then((data) => setState({ status: "idle", photos: data.photos ?? [] }))
      .catch((err: Error) =>
        setState({ status: "error", photos: [], error: err.message })
      );
  }, []);

  return state;
}
