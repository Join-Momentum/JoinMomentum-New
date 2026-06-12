import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { Plugin } from "vite";
import type { ServerResponse } from "node:http";

// ── Gallery API dev plugin ────────────────────────────────────────────────────
// Serves /api/gallery-photos and /api/gallery-videos during `npm run dev`.
// Uses loadEnv so credentials from .env.local are available in this Node context
// (process.env does NOT automatically contain .env.local values in Vite).

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

async function servePhotos(res: ServerResponse, env: Record<string, string>) {
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;

  if (!apiKey || !apiSecret) {
    console.error("[gallery-api] CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET missing from .env.local");
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Cloudinary credentials not configured" }));
    return;
  }

  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  // Build URL manually — URLSearchParams encodes '/' as '%2F' which Cloudinary rejects
  const apiUrl =
    "https://api.cloudinary.com/v1_1/dkhawygrr/resources/by_asset_folder" +
    "?asset_folder=joinmomentum/website/images&resource_type=image&max_results=50&context=true";

  console.log("[gallery-api] Fetching Cloudinary photos…");
  try {
    const r = await fetch(apiUrl, { headers: { Authorization: `Basic ${credentials}` } });
    if (!r.ok) {
      const text = await r.text();
      console.error("[gallery-api] Cloudinary error:", r.status, text);
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: `Cloudinary API error ${r.status}` }));
      return;
    }
    const data = await r.json() as { resources?: Record<string, unknown>[] };
    console.log(`[gallery-api] Cloudinary returned ${data.resources?.length ?? 0} resources`);

    const photos = (data.resources ?? []).map((asset) => {
      const ctx = (asset.context as { custom?: Record<string, string> } | undefined)?.custom ?? {};
      return {
        id: (asset.asset_id ?? asset.public_id) as string,
        caption: ctx.caption ?? "",
        imageUrl: (asset.secure_url as string) ?? "",
        capability: ctx.capability ?? "",
        engagementType: ctx.engagement_type ?? "",
        segment: ctx.segment ?? "",
        region: ctx.region ?? "",
        window: ctx.window ?? "",
      };
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ photos }));
  } catch (err) {
    console.error("[gallery-api] Cloudinary fetch failed:", err);
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to reach Cloudinary" }));
  }
}

async function serveVideos(res: ServerResponse, env: Record<string, string>) {
  const token = env.VIMEO_ACCESS_TOKEN;

  if (!token) {
    console.error("[gallery-api] VIMEO_ACCESS_TOKEN missing from .env.local");
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Vimeo credentials not configured" }));
    return;
  }

  const apiUrl =
    "https://api.vimeo.com/me/projects/29555979/videos" +
    "?fields=uri,name,duration,pictures.sizes,created_time&per_page=50";

  console.log("[gallery-api] Fetching Vimeo videos…");
  try {
    const r = await fetch(apiUrl, { headers: { Authorization: `bearer ${token}` } });
    if (!r.ok) {
      const text = await r.text();
      console.error("[gallery-api] Vimeo error:", r.status, text);
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: `Vimeo API error ${r.status}` }));
      return;
    }
    const data = await r.json() as { data?: Record<string, unknown>[] };
    console.log(`[gallery-api] Vimeo returned ${data.data?.length ?? 0} videos`);

    const videos = (data.data ?? []).map((v) => {
      const videoId = (v.uri as string).replace("/videos/", "");
      const sizes = (v.pictures as { sizes?: { width: number; link: string }[] } | undefined)?.sizes ?? [];
      const thumb = sizes.find((s) => s.width >= 1280)?.link ?? sizes[sizes.length - 1]?.link ?? "";
      return {
        id: videoId,
        title: (v.name as string) ?? "",
        caption: "",
        duration: formatDuration((v.duration as number) ?? 0),
        thumbnailUrl: thumb,
        videoUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1&badge=0&autopause=0`,
        capability: "",
        engagementType: "",
        segment: "",
        region: "",
        window: "",
      };
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ videos }));
  } catch (err) {
    console.error("[gallery-api] Vimeo fetch failed:", err);
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to reach Vimeo" }));
  }
}

function galleryApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: "gallery-api-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/api/gallery-photos") {
          servePhotos(res, env).catch(next);
        } else if (req.url === "/api/gallery-videos") {
          serveVideos(res, env).catch(next);
        } else {
          next();
        }
      });
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────

export default defineConfig(({ mode }) => {
  // Load ALL vars from .env.local (empty-string prefix = no VITE_ filter)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      galleryApiPlugin(env),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
