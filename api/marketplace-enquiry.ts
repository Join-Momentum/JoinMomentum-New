import { Resend } from "resend";

interface Res {
  status(code: number): Res;
  json(data: unknown): void;
}

interface EnquiryBody {
  fullName?: string;
  organisation?: string;
  orgType?: string;
  role?: string;
  region?: string;
  requestType?: string;
  deliveryPreference?: string;
  participantNumbers?: string;
  preferredTiming?: string;
  workEmail?: string;
  phone?: string;
  message?: string;
  listing?: string;
  _honeypot?: string;
}

const orgTypeLabels: Record<string, string> = {
  organisation: "Organisation",
  agency: "Agency",
  government_department: "Government Department",
  other: "Other",
};

const requestTypeLabels: Record<string, string> = {
  detailed_information_pricing: "Detailed Information & Pricing",
  ask_to_be_contacted: "Ask to Be Contacted",
  request_scoping_call: "Request a Scoping Call",
};

const deliveryLabels: Record<string, string> = {
  online: "Online",
  in_person: "In-person",
  location_specific: "Location-specific",
};

const timingLabels: Record<string, string> = {
  this_quarter: "This quarter",
  next_quarter: "Next quarter",
  exploratory: "Exploratory",
};

function notificationHtml(b: EnquiryBody): string {
  const rows = [
    ["Full Name", b.fullName],
    ["Organisation", b.organisation],
    ["Organisation Type", orgTypeLabels[b.orgType ?? ""] ?? b.orgType],
    ["Role", b.role],
    ["Region", b.region],
    ["Work Email", b.workEmail],
    ["Phone", b.phone || "—"],
    ["Request Type", requestTypeLabels[b.requestType ?? ""] ?? b.requestType],
    ["Delivery Preference", deliveryLabels[b.deliveryPreference ?? ""] || "—"],
    ["Indicative Participants", b.participantNumbers || "—"],
    ["Preferred Timing", timingLabels[b.preferredTiming ?? ""] || "—"],
    ["Listing", b.listing],
  ]
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 16px 8px 0;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#888;white-space:nowrap;vertical-align:top">${label}</td>
          <td style="padding:8px 0;font-family:sans-serif;font-size:14px;color:#111;vertical-align:top">${value}</td>
        </tr>`
    )
    .join("");

  const messageSection = b.message?.trim()
    ? `<div style="margin-top:24px;padding-top:24px;border-top:1px solid #e4e4e4">
        <p style="margin:0 0 8px;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#888">Message</p>
        <p style="margin:0;font-family:sans-serif;font-size:14px;color:#111;line-height:1.6;white-space:pre-wrap">${b.message}</p>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e4e4e4;max-width:600px;width:100%">
        <tr>
          <td style="background:#0a0a0a;padding:24px 32px">
            <p style="margin:0;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#e11414">Join Momentum · Marketplace</p>
            <p style="margin:6px 0 0;font-family:sans-serif;font-size:20px;font-weight:700;color:#fff">New Marketplace Enquiry</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px">
            <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
            ${messageSection}
          </td>
        </tr>
        <tr>
          <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #e4e4e4">
            <p style="margin:0;font-family:monospace;font-size:11px;color:#aaa">Submitted via joinmomentum.com · ${new Date().toUTCString()}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function autoReplyHtml(fullName: string, requestType: string, listing: string): string {
  const requestLabel = requestTypeLabels[requestType] ?? requestType;
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e4e4e4;max-width:600px;width:100%">
        <tr>
          <td style="background:#0a0a0a;padding:24px 32px">
            <p style="margin:0;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#e11414">Join Momentum · Marketplace</p>
            <p style="margin:6px 0 0;font-family:sans-serif;font-size:20px;font-weight:700;color:#fff">Enquiry Received</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px">
            <p style="margin:0 0 16px;font-family:sans-serif;font-size:15px;color:#111">Dear ${fullName},</p>
            <p style="margin:0 0 16px;font-family:sans-serif;font-size:14px;color:#444;line-height:1.7">
              Thank you for your enquiry regarding <strong>${listing}</strong>. We have received your request for <strong>${requestLabel}</strong> and a member of the Join Momentum team will respond through a confidential channel.
            </p>
            <p style="margin:0 0 16px;font-family:sans-serif;font-size:14px;color:#444;line-height:1.7">
              For urgent queries, you can reach us at
              <a href="mailto:sales@joinmomentum.io" style="color:#e11414">sales@joinmomentum.io</a>.
            </p>
            <p style="margin:24px 0 0;font-family:sans-serif;font-size:14px;color:#111">The Join Momentum Team</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #e4e4e4">
            <p style="margin:0;font-family:monospace;font-size:11px;color:#aaa">Enquiries are handled through structured, confidential channels in accordance with our Privacy Policy.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default async function handler(req: { method?: string; body?: EnquiryBody }, res: Res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_MARKETPLACE } = process.env;
  if (!RESEND_API_KEY) return res.status(500).json({ error: "Resend not configured" });

  const from = RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const toTeam = RESEND_TO_MARKETPLACE || "sales@joinmomentum.io";

  const body = req.body ?? {};

  // Honeypot — discard silently
  if (body._honeypot) return res.status(200).json({ ok: true });

  const { fullName, organisation, workEmail, requestType } = body;
  if (!fullName?.trim() || !organisation?.trim() || !workEmail?.trim() || !requestType) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const resend = new Resend(RESEND_API_KEY);
  const listing = body.listing ?? "Join Momentum Marketplace";

  try {
    await Promise.all([
      resend.emails.send({
        from,
        to: [toTeam],
        subject: `Marketplace Enquiry — ${fullName} (${organisation}) · ${requestTypeLabels[requestType] ?? requestType}`,
        html: notificationHtml(body),
        replyTo: workEmail,
      }),
      resend.emails.send({
        from,
        to: [workEmail],
        subject: `Your enquiry to Join Momentum — ${listing}`,
        html: autoReplyHtml(fullName, requestType, listing),
      }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[api/marketplace-enquiry] Resend error:", err);
    return res.status(502).json({ error: "Failed to send email" });
  }
}
