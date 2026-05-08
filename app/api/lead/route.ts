import { NextResponse } from "next/server";
import { LeadSchema, BUDGET_OPTIONS } from "@/lib/schemas";
import { getResend } from "@/lib/resend";
import { getSupabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const budgetLabel = (value: string) =>
  BUDGET_OPTIONS.find((o) => o.value === value)?.label ?? value;

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

  const { name, email, company, companyWebsite, painPoints, budget, message, _hp } =
    parsed.data;

  // Honeypot — return ok silently if filled
  if (_hp && _hp.length > 0) {
    return NextResponse.json({ ok: true, redirectUrl: null });
  }

  const to = process.env.LEAD_TO_EMAIL;
  const calendlyUrl = process.env.CALENDLY_URL || null;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
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
      from: `Netbiz AI <${fromEmail}>`,
      to: [to],
      replyTo: email,
      subject: `New lead — ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        companyWebsite ? `Website: ${companyWebsite}` : null,
        `Challenges: ${painPoints.join(", ")}`,
        `Budget: ${budgetLabel(budget)}`,
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

  // Persist lead + send auto-reply in parallel (both non-fatal)
  await Promise.allSettled([
    (async () => {
      const supabase = getSupabase();
      if (!supabase) return;
      const { error } = await supabase.from("leads").insert({
        name,
        email,
        company: company ?? null,
        company_website: companyWebsite ?? null,
        pain_points: painPoints,
        budget,
        message,
        ip,
      });
      if (error) console.error("[lead] Supabase insert failed", error);
    })(),
    (async () => {
      if (!process.env.RESEND_FROM_EMAIL) return;
      try {
        await resend.emails.send({
          from: `Netbiz AI <${fromEmail}>`,
          to: [email],
          subject: `Thanks for reaching out, ${name}`,
          text: [
            `Hi ${name},`,
            "",
            "Thanks for getting in touch — we've received your message and will get back to you within 24 hours.",
            "",
            "In the meantime, feel free to reply to this email if you have anything to add.",
            "",
            "— The Netbiz AI team",
          ].join("\n"),
        });
      } catch (err) {
        console.error("[lead] Auto-reply failed", err);
      }
    })(),
  ]);

  return NextResponse.json({
    ok: true,
    redirectUrl: calendlyUrl,
    delivered: true,
  });
}
