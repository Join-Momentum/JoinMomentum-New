// Shared Mux logic for /api/gallery-videos (Vercel function + Vite dev middleware).
// Files prefixed with "_" in /api are not exposed as Vercel routes.

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

type MuxAsset = {
  id: string;
  status: string;
  duration?: number;
  created_at?: string;
  passthrough?: string;
  playback_ids?: { id: string; policy: "public" | "signed" | "drm" }[];
  meta?: { title?: string; external_id?: string; creator_id?: string };
};

export class MuxError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function formatDuration(seconds: number): string {
  const total = Math.round(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// Gallery metadata lives in the asset's `passthrough` field. Accepted formats:
//   JSON:       {"caption":"…","capability":"cyber-security","engagement_type":"training",…}
//   Key/value:  caption: … ; capability: cyber-security ; engagement_type: training
//               (separated by newlines, ";" or "|", optionally wrapped in --- fences)
function parseMeta(passthrough: string | undefined): Record<string, string> {
  const raw = (passthrough ?? "").trim();
  if (!raw) return {};

  if (raw.startsWith("{")) {
    try {
      const obj = JSON.parse(raw) as Record<string, unknown>;
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, v == null ? "" : String(v).trim()])
      );
    } catch {
      // fall through to key/value parsing
    }
  }

  const kv: Record<string, string> = {};
  for (const part of raw.replace(/^---\s*|\s*---$/g, "").split(/\n|;|\|/)) {
    const colon = part.indexOf(":");
    if (colon === -1) continue;
    const key = part.slice(0, colon).trim();
    const value = part.slice(colon + 1).trim();
    if (key && value) kv[key] = value;
  }
  return kv;
}

// Turns upload file names like "instructor_insights__emerging_tech_&_ai_v1 (1080p)"
// into "Instructor Insights Emerging Tech & AI".
function cleanTitle(raw: string): string {
  return raw
    .replace(/\s*\(\d{3,4}p\)\s*$/i, "")   // trailing "(1080p)"
    .replace(/[_\s-]*v\d+\s*$/i, "")         // trailing "_v1"
    .replace(/_+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b([a-z])([a-z]*)/gi, (_, first: string, rest: string) =>
      rest.length <= 1 && /^(ai|vr|ar|ui|ux|uk|us|eu)$/i.test(first + rest)
        ? (first + rest).toUpperCase()
        : first.toUpperCase() + rest.toLowerCase()
    );
}

async function fetchAllAssets(tokenId: string, tokenSecret: string): Promise<MuxAsset[]> {
  const auth = Buffer.from(`${tokenId}:${tokenSecret}`).toString("base64");
  const assets: MuxAsset[] = [];
  const limit = 100;

  for (let page = 1; page <= 10; page++) {
    let r: Response;
    try {
      r = await fetch(`https://api.mux.com/video/v1/assets?limit=${limit}&page=${page}`, {
        headers: { Authorization: `Basic ${auth}` },
      });
    } catch (err) {
      console.error("[gallery-videos] Mux fetch failed:", err);
      throw new MuxError("Failed to reach Mux", 502);
    }
    if (!r.ok) {
      console.error("[gallery-videos] Mux error:", r.status, await r.text());
      throw new MuxError(`Mux API error ${r.status}`, 502);
    }
    const { data = [] } = (await r.json()) as { data?: MuxAsset[] };
    assets.push(...data);
    if (data.length < limit) break;
  }
  return assets;
}

export async function getGalleryVideos(env: {
  MUX_TOKEN_ID?: string;
  MUX_TOKEN_SECRET?: string;
}): Promise<GalleryVideo[]> {
  const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = env;
  if (!MUX_TOKEN_ID || !MUX_TOKEN_SECRET) {
    console.error("[gallery-videos] MUX_TOKEN_ID or MUX_TOKEN_SECRET not set");
    throw new MuxError("Mux credentials not configured", 500);
  }

  const assets = await fetchAllAssets(MUX_TOKEN_ID, MUX_TOKEN_SECRET);

  const videos: GalleryVideo[] = [];
  for (const a of assets) {
    if (a.status !== "ready") continue;
    // Signed/DRM playback would need server-minted tokens; only public assets are listed.
    const playbackId = a.playback_ids?.find((p) => p.policy === "public")?.id;
    if (!playbackId) continue;

    const meta = parseMeta(a.passthrough);
    videos.push({
      id: a.id,
      title: meta.title || cleanTitle(a.meta?.title ?? ""),
      caption: meta.caption ?? "",
      duration: formatDuration(a.duration ?? 0),
      thumbnailUrl: `https://image.mux.com/${playbackId}/thumbnail.webp?width=1280&fit_mode=smartcrop&time=1`,
      videoUrl: `https://player.mux.com/${playbackId}?autoplay=true&accent-color=%23e11414`,
      capability: meta.capability ?? "",
      engagementType: meta.engagement_type ?? meta.engagementType ?? "",
      segment: meta.segment ?? "",
      region: meta.region ?? "",
      window: meta.window ?? "",
    });
  }
  return videos;
}
