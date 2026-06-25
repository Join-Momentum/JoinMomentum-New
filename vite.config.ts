import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { Plugin } from "vite";
import type { IncomingMessage, ServerResponse } from "node:http";
import { Resend } from "resend";

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

function parseVimeoMeta(description: string): {
  caption: string; capability: string; engagementType: string;
  segment: string; region: string; window: string;
} {
  const empty = { caption: "", capability: "", engagementType: "", segment: "", region: "", window: "" };
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
    "?fields=uri,name,description,duration,pictures.sizes,created_time&per_page=50";

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
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ videos }));
  } catch (err) {
    console.error("[gallery-api] Vimeo fetch failed:", err);
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to reach Vimeo" }));
  }
}

// ── Form POST helpers ─────────────────────────────────────────────────────────

async function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
      catch { resolve({}); }
    });
    req.on("error", () => resolve({}));
  });
}

const orgTypeLabels: Record<string, string> = {
  organisation: "Organisation", agency: "Agency",
  government_department: "Government Department", other: "Other",
};
const requestTypeLabels: Record<string, string> = {
  detailed_information_pricing: "Detailed Information & Pricing",
  ask_to_be_contacted: "Ask to Be Contacted",
  request_scoping_call: "Request a Scoping Call",
};

async function handleContact(res: ServerResponse, env: Record<string, string>, body: Record<string, unknown>) {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_CONTACT } = env;
  if (!RESEND_API_KEY) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "RESEND_API_KEY missing from .env.local" }));
    return;
  }
  if (body._honeypot) { res.writeHead(200, { "Content-Type": "application/json" }); res.end(JSON.stringify({ ok: true })); return; }

  const name = (body.name as string)?.trim();
  const organisation = (body.organisation as string)?.trim();
  const email = (body.email as string)?.trim();
  const message = (body.message as string)?.trim();
  if (!name || !organisation || !email || !message) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing required fields" }));
    return;
  }

  const from = RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const toTeam = RESEND_TO_CONTACT || "hello@joinmomentum.io";
  const resend = new Resend(RESEND_API_KEY);
  const fields = [
    ["Name", name], ["Organisation", organisation], ["Email", email],
    ["Role", (body.role as string) || "—"], ["Region", (body.region as string) || "—"],
    ["Area of Interest", (body.areaOfInterest as string) || "—"],
  ];
  const rows = fields.map(([l, v]) => `<tr><td style="padding:6px 16px 6px 0;font-family:monospace;font-size:11px;text-transform:uppercase;color:#888;white-space:nowrap;vertical-align:top">${l}</td><td style="padding:6px 0;font-family:sans-serif;font-size:14px;color:#111">${v}</td></tr>`).join("");
  const notifHtml = `<!DOCTYPE html><html><body style="background:#f4f4f4;padding:32px 16px;font-family:sans-serif"><table width="600" style="background:#fff;border:1px solid #e4e4e4;margin:0 auto"><tr><td style="background:#0a0a0a;padding:24px 32px"><p style="margin:0;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:.15em;color:#e11414">Join Momentum</p><p style="margin:6px 0 0;font-size:20px;font-weight:700;color:#fff">New Capability Discussion Request</p></td></tr><tr><td style="padding:32px"><table>${rows}</table><div style="margin-top:24px;padding-top:24px;border-top:1px solid #e4e4e4"><p style="margin:0 0 8px;font-family:monospace;font-size:11px;text-transform:uppercase;color:#888">Message</p><p style="margin:0;font-size:14px;color:#111;line-height:1.6;white-space:pre-wrap">${message}</p></div></td></tr></table></body></html>`;
  const replyHtml = `<!DOCTYPE html><html><body style="background:#f4f4f4;padding:32px 16px;font-family:sans-serif"><table width="600" style="background:#fff;border:1px solid #e4e4e4;margin:0 auto"><tr><td style="background:#0a0a0a;padding:24px 32px"><p style="margin:0;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:.15em;color:#e11414">Join Momentum</p><p style="margin:6px 0 0;font-size:20px;font-weight:700;color:#fff">Enquiry Received</p></td></tr><tr><td style="padding:32px"><p style="margin:0 0 16px;font-size:15px;color:#111">Dear ${name},</p><p style="margin:0 0 16px;font-size:14px;color:#444;line-height:1.7">Thank you for reaching out to Join Momentum. We have received your capability discussion request and a member of our team will respond within <strong>24–48 business hours</strong> through a confidential channel.</p><p style="margin:0;font-size:14px;color:#444;line-height:1.7">For follow-up, contact us at <a href="mailto:hello@joinmomentum.io" style="color:#e11414">hello@joinmomentum.io</a>.</p></td></tr></table></body></html>`;

  try {
    await Promise.all([
      resend.emails.send({ from, to: [toTeam], subject: `Capability Discussion Request — ${name} (${organisation})`, html: notifHtml, replyTo: email }),
      resend.emails.send({ from, to: [email], subject: "Your enquiry to Join Momentum", html: replyHtml }),
    ]);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
  } catch (err) {
    console.error("[api/contact] Resend error:", err);
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to send email" }));
  }
}

async function handleMarketplaceEnquiry(res: ServerResponse, env: Record<string, string>, body: Record<string, unknown>) {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_MARKETPLACE } = env;
  if (!RESEND_API_KEY) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "RESEND_API_KEY missing from .env.local" }));
    return;
  }
  if (body._honeypot) { res.writeHead(200, { "Content-Type": "application/json" }); res.end(JSON.stringify({ ok: true })); return; }

  const fullName = (body.fullName as string)?.trim();
  const organisation = (body.organisation as string)?.trim();
  const workEmail = (body.workEmail as string)?.trim();
  const requestType = body.requestType as string;
  if (!fullName || !organisation || !workEmail || !requestType) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing required fields" }));
    return;
  }

  const from = RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const toTeam = RESEND_TO_MARKETPLACE || "sales@joinmomentum.io";
  const listing = (body.listing as string) || "Join Momentum Marketplace";
  const resend = new Resend(RESEND_API_KEY);
  const reqLabel = requestTypeLabels[requestType] ?? requestType;
  const fields = [
    ["Full Name", fullName], ["Organisation", organisation],
    ["Org Type", (orgTypeLabels[body.orgType as string] ?? (body.orgType as string)) || "—"],
    ["Role", (body.role as string) || "—"], ["Region", (body.region as string) || "—"],
    ["Work Email", workEmail], ["Phone", (body.phone as string) || "—"],
    ["Request Type", reqLabel],
    ["Delivery", (body.deliveryPreference as string) || "—"],
    ["Participants", (body.participantNumbers as string) || "—"],
    ["Timing", (body.preferredTiming as string) || "—"],
    ["Listing", listing],
  ];
  const rows = fields.map(([l, v]) => `<tr><td style="padding:6px 16px 6px 0;font-family:monospace;font-size:11px;text-transform:uppercase;color:#888;white-space:nowrap;vertical-align:top">${l}</td><td style="padding:6px 0;font-family:sans-serif;font-size:14px;color:#111">${v}</td></tr>`).join("");
  const msg = (body.message as string)?.trim();
  const msgSection = msg ? `<div style="margin-top:24px;padding-top:24px;border-top:1px solid #e4e4e4"><p style="margin:0 0 8px;font-family:monospace;font-size:11px;text-transform:uppercase;color:#888">Message</p><p style="margin:0;font-size:14px;color:#111;line-height:1.6;white-space:pre-wrap">${msg}</p></div>` : "";
  const notifHtml = `<!DOCTYPE html><html><body style="background:#f4f4f4;padding:32px 16px;font-family:sans-serif"><table width="600" style="background:#fff;border:1px solid #e4e4e4;margin:0 auto"><tr><td style="background:#0a0a0a;padding:24px 32px"><p style="margin:0;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:.15em;color:#e11414">Join Momentum · Marketplace</p><p style="margin:6px 0 0;font-size:20px;font-weight:700;color:#fff">New Marketplace Enquiry</p></td></tr><tr><td style="padding:32px"><table>${rows}</table>${msgSection}</td></tr></table></body></html>`;
  const replyHtml = `<!DOCTYPE html><html><body style="background:#f4f4f4;padding:32px 16px;font-family:sans-serif"><table width="600" style="background:#fff;border:1px solid #e4e4e4;margin:0 auto"><tr><td style="background:#0a0a0a;padding:24px 32px"><p style="margin:0;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:.15em;color:#e11414">Join Momentum · Marketplace</p><p style="margin:6px 0 0;font-size:20px;font-weight:700;color:#fff">Enquiry Received</p></td></tr><tr><td style="padding:32px"><p style="margin:0 0 16px;font-size:15px;color:#111">Dear ${fullName},</p><p style="margin:0 0 16px;font-size:14px;color:#444;line-height:1.7">Thank you for your enquiry regarding <strong>${listing}</strong>. We have received your request for <strong>${reqLabel}</strong> and a member of the Join Momentum team will be in touch through a confidential channel.</p><p style="margin:0;font-size:14px;color:#444;line-height:1.7">For urgent queries contact <a href="mailto:sales@joinmomentum.io" style="color:#e11414">sales@joinmomentum.io</a>.</p></td></tr></table></body></html>`;

  try {
    await Promise.all([
      resend.emails.send({ from, to: [toTeam], subject: `Marketplace Enquiry — ${fullName} (${organisation}) · ${reqLabel}`, html: notifHtml, replyTo: workEmail }),
      resend.emails.send({ from, to: [workEmail], subject: `Your enquiry to Join Momentum — ${listing}`, html: replyHtml }),
    ]);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
  } catch (err) {
    console.error("[api/marketplace-enquiry] Resend error:", err);
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to send email" }));
  }
}

// ─────────────────────────────────────────────────────────────────────────────

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
        } else if (req.url === "/api/contact" && req.method === "POST") {
          readBody(req).then((body) => handleContact(res, env, body)).catch(next);
        } else if (req.url === "/api/marketplace-enquiry" && req.method === "POST") {
          readBody(req).then((body) => handleMarketplaceEnquiry(res, env, body)).catch(next);
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
