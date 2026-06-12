interface Res {
  status(code: number): Res;
  json(data: unknown): void;
  setHeader(name: string, value: string): void;
}

export default async function handler(_req: unknown, res: Res) {
  const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return res.status(500).json({ error: "Cloudinary credentials not configured" });
  }

  const credentials = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString("base64");

  const url = new URL("https://api.cloudinary.com/v1_1/dkhawygrr/resources/by_asset_folder");
  url.searchParams.set("asset_folder", "joinmomentum/website/images");
  url.searchParams.set("resource_type", "image");
  url.searchParams.set("max_results", "50");
  url.searchParams.set("context", "true");

  let data: { resources?: Record<string, unknown>[] };
  try {
    const r = await fetch(url.toString(), {
      headers: { Authorization: `Basic ${credentials}` },
    });
    if (!r.ok) {
      console.error("Cloudinary error:", r.status, await r.text());
      return res.status(502).json({ error: "Cloudinary API error" });
    }
    data = await r.json();
  } catch (err) {
    console.error("Cloudinary fetch failed:", err);
    return res.status(502).json({ error: "Failed to reach Cloudinary" });
  }

  const photos = (data.resources ?? []).map((r) => {
    const ctx = (r.context as { custom?: Record<string, string> } | undefined)?.custom ?? {};
    return {
      id: (r.asset_id ?? r.public_id) as string,
      caption: ctx.caption ?? "",
      imageUrl: (r.secure_url as string) ?? "",
      capability: ctx.capability ?? "",
      engagementType: ctx.engagement_type ?? "",
      segment: ctx.segment ?? "",
      region: ctx.region ?? "",
      window: ctx.window ?? "",
    };
  });

  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  return res.json({ photos });
}
