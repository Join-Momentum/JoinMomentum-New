import { getGalleryVideos, MuxError } from "./_mux.js";

interface Res {
  status(code: number): Res;
  json(data: unknown): void;
  setHeader(name: string, value: string): void;
}

export default async function handler(_req: unknown, res: Res) {
  try {
    const videos = await getGalleryVideos(process.env);
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    return res.json({ videos });
  } catch (err) {
    const status = err instanceof MuxError ? err.status : 500;
    const message = err instanceof Error ? err.message : "Unexpected error";
    return res.status(status).json({ error: message });
  }
}
