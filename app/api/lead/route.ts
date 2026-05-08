import { NextResponse } from "next/server";
import { LeadSchema } from "@/lib/schemas";
import { getResend } from "@/lib/resend";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter ?? 60) } }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const parsed = LeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid form data", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { name, email, company, message, website } = parsed.data;

  // Honeypot — return ok silently if filled
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true, redirectUrl: null });
  }

  const to = process.env.LEAD_TO_EMAIL;
  const calendlyUrl = process.env.CALENDLY_URL || null;
  const resend = getResend();

  if (!resend || !to) {
    console.warn(
      "[lead] Resend or LEAD_TO_EMAIL not configured — skipping email send"
    );
    return NextResponse.json({
      ok: true,
      redirectUrl: calendlyUrl,
      delivered: false,
    });
  }

  try {
    await resend.emails.send({
      from: "Netbiz AI <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `New lead — ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (err) {
    console.error("[lead] Resend send failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not send right now. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    redirectUrl: calendlyUrl,
    delivered: true,
  });
}
