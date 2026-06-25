interface Res {
  status(code: number): Res;
  json(data: unknown): void;
  setHeader(name: string, value: string): void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

type VideoMeta = {
  caption: string;
  capability: string;
  engagementType: string;
  segment: string;
  region: string;
  window: string;
};

function parseVimeoMeta(description: string): VideoMeta {
  const empty: VideoMeta = { caption: "", capability: "", engagementType: "", segment: "", region: "", window: "" };
  const match = description?.match(/---\s*\n([\s\S]*?)\n---/);
  if (!match) return empty;
  const kv: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    if (key && value) kv[key] = value;
  }
  return {
    caption: kv.caption ?? "",
    capability: kv.capability ?? "",
    engagementType: kv.engagement_type ?? "",
    segment: kv.segment ?? "",
    region: kv.region ?? "",
    window: kv.window ?? "",
  };
}

export default async function handler(_req: unknown, res: Res) {
  const { VIMEO_ACCESS_TOKEN } = process.env;

  if (!VIMEO_ACCESS_TOKEN) {
    return res.status(500).json({ error: "Vimeo credentials not configured" });
  }

  const url = new URL("https://api.vimeo.com/me/projects/29555979/videos");
  url.searchParams.set("fields", "uri,name,description,duration,pictures.sizes,created_time");
  url.searchParams.set("per_page", "50");

  let data: { data?: Record<string, unknown>[] };
  try {
    const r = await fetch(url.toString(), {
      headers: { Authorization: `bearer ${VIMEO_ACCESS_TOKEN}` },
    });
    if (!r.ok) {
      console.error("Vimeo error:", r.status, await r.text());
      return res.status(502).json({ error: "Vimeo API error" });
    }
    data = await r.json();
  } catch (err) {
    console.error("Vimeo fetch failed:", err);
    return res.status(502).json({ error: "Failed to reach Vimeo" });
  }

  const videos = (data.data ?? []).map((v) => {
    const videoId = (v.uri as string).replace("/videos/", "");
    const sizes = (v.pictures as { sizes?: { width: number; link: string }[] } | undefined)?.sizes ?? [];
    const thumb =
      sizes.find((s) => s.width >= 1280)?.link ??
      sizes[sizes.length - 1]?.link ??
      "";
    const meta = parseVimeoMeta((v.description as string) ?? "");

    return {
      id: videoId,
      title: (v.name as string) ?? "",
      duration: formatDuration((v.duration as number) ?? 0),
      thumbnailUrl: thumb,
      videoUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1&badge=0&autopause=0`,
      ...meta,
    };
  });

  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  return res.json({ videos });
}
