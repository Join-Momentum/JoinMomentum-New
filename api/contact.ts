import { Resend } from "resend";

interface Res {
  status(code: number): Res;
  json(data: unknown): void;
}

interface ContactBody {
  name?: string;
  organisation?: string;
  email?: string;
  role?: string;
  region?: string;
  areaOfInterest?: string;
  message?: string;
  _honeypot?: string;
}

function notificationHtml(data: Required<Omit<ContactBody, "_honeypot">>): string {
  const rows = [
    ["Name", data.name],
    ["Organisation", data.organisation],
    ["Email", data.email],
    ["Role", data.role || "—"],
    ["Region", data.region || "—"],
    ["Area of Interest", data.areaOfInterest || "—"],
  ]
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 16px 8px 0;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#888;white-space:nowrap;vertical-align:top">${label}</td>
          <td style="padding:8px 0;font-family:sans-serif;font-size:14px;color:#111;vertical-align:top">${value}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e4e4e4;max-width:600px;width:100%">
        <!-- Header -->
        <tr>
          <td style="background:#0a0a0a;padding:24px 32px">
            <p style="margin:0;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#e11414">Join Momentum</p>
            <p style="margin:6px 0 0;font-family:sans-serif;font-size:20px;font-weight:700;color:#fff">New Capability Discussion Request</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
            <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e4e4e4">
              <p style="margin:0 0 8px;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#888">Message</p>
              <p style="margin:0;font-family:sans-serif;font-size:14px;color:#111;line-height:1.6;white-space:pre-wrap">${data.message}</p>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #e4e4e4">
            <p style="margin:0;font-family:monospace;font-size:11px;color:#aaa">Submitted via joinmomentum.com/contact · ${new Date().toUTCString()}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function autoReplyHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e4e4e4;max-width:600px;width:100%">
        <tr>
          <td style="background:#0a0a0a;padding:24px 32px">
            <p style="margin:0;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#e11414">Join Momentum</p>
            <p style="margin:6px 0 0;font-family:sans-serif;font-size:20px;font-weight:700;color:#fff">Enquiry Received</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px">
            <p style="margin:0 0 16px;font-family:sans-serif;font-size:15px;color:#111">Dear ${name},</p>
            <p style="margin:0 0 16px;font-family:sans-serif;font-size:14px;color:#444;line-height:1.7">
              Thank you for reaching out to Join Momentum. We have received your capability discussion request and a member of our team will respond within <strong>24–48 business hours</strong> through a confidential channel.
            </p>
            <p style="margin:0 0 16px;font-family:sans-serif;font-size:14px;color:#444;line-height:1.7">
              If you need to follow up directly, you can reach us at
              <a href="mailto:hello@joinmomentum.io" style="color:#e11414">hello@joinmomentum.io</a>.
            </p>
            <p style="margin:24px 0 0;font-family:sans-serif;font-size:14px;color:#111">The Join Momentum Team</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #e4e4e4">
            <p style="margin:0;font-family:monospace;font-size:11px;color:#aaa">Please do not reply to this email directly. All communications are handled with appropriate confidentiality.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default async function handler(req: { method?: string; body?: ContactBody }, res: Res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_CONTACT } = process.env;
  if (!RESEND_API_KEY) return res.status(500).json({ error: "Resend not configured" });

  const from = RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const toTeam = RESEND_TO_CONTACT || "hello@joinmomentum.io";

  const body = req.body ?? {};

  // Honeypot — discard silently
  if (body._honeypot) return res.status(200).json({ ok: true });

  // Minimal server-side validation
  const { name, organisation, email, message } = body;
  if (!name?.trim() || !organisation?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const resend = new Resend(RESEND_API_KEY);

  const data = {
    name: name.trim(),
    organisation: organisation.trim(),
    email: email.trim(),
    role: body.role?.trim() ?? "",
    region: body.region?.trim() ?? "",
    areaOfInterest: body.areaOfInterest?.trim() ?? "",
    message: message.trim(),
  };

  try {
    await Promise.all([
      // Notification to team
      resend.emails.send({
        from,
        to: [toTeam],
        subject: `Capability Discussion Request — ${data.name} (${data.organisation})`,
        html: notificationHtml(data),
        replyTo: data.email,
      }),
      // Auto-reply to submitter
      resend.emails.send({
        from,
        to: [data.email],
        subject: "Your enquiry to Join Momentum",
        html: autoReplyHtml(data.name),
      }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[api/contact] Resend error:", err);
    return res.status(502).json({ error: "Failed to send email" });
  }
}
