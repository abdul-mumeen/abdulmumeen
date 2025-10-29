import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  subject: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10).max(2000),
});

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

type ContactPayload = z.infer<typeof contactSchema>;

type RateLimiterStore = Map<string, number[]>;

const globalForContact = globalThis as typeof globalThis & {
  __contactRateLimiter?: RateLimiterStore;
};

if (!globalForContact.__contactRateLimiter) {
  globalForContact.__contactRateLimiter = new Map();
}

const rateLimiter = globalForContact.__contactRateLimiter;

const getClientIp = (request: NextRequest) => {
  if (request.ip) return request.ip;
  const header = request.headers.get("x-forwarded-for");
  if (!header) return "unknown";
  return header.split(",")[0]?.trim() || "unknown";
};

const isRateLimited = (identifier: string) => {
  if (!identifier) return false;
  const now = Date.now();
  const timestamps = rateLimiter.get(identifier) ?? [];
  const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimiter.set(identifier, recent);
    return true;
  }

  recent.push(now);
  rateLimiter.set(identifier, recent);
  return false;
};

const allowedOrigins = process.env.CONTACT_ALLOWED_ORIGINS?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOriginsSet = allowedOrigins ? new Set(allowedOrigins) : null;

const gmailUser = process.env.CONTACT_GMAIL_USER;
const gmailAppPassword = process.env.CONTACT_GMAIL_APP_PASSWORD;
const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || gmailUser;

if (!gmailUser || !gmailAppPassword) {
  console.warn(
    "[contact] Missing CONTACT_GMAIL_USER or CONTACT_GMAIL_APP_PASSWORD environment variables."
  );
}

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUser,
    pass: gmailAppPassword,
  },
});

const sanitizeForHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: NextRequest) {
  if (allowedOriginsSet && allowedOriginsSet.size > 0) {
    const originHeader =
      request.headers.get("origin") || request.headers.get("referer");
    let origin: string | null = null;
    if (originHeader) {
      try {
        origin = new URL(originHeader).origin;
      } catch (error) {
        origin = null;
      }
    }

    if (!origin || !allowedOriginsSet.has(origin)) {
      return NextResponse.json(
        { message: "Origin not allowed." },
        { status: 403 }
      );
    }
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { message: "Unsupported content type." },
      { status: 415 }
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 10_000) {
    return NextResponse.json(
      { message: "Payload too large." },
      { status: 413 }
    );
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Validation failed.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  if (!mailTransporter || !recipientEmail) {
    console.error("[contact] Mail transporter or recipient not configured.");
    return NextResponse.json(
      { message: "Contact service misconfigured." },
      { status: 500 }
    );
  }

  const data: ContactPayload = parsed.data;

  const subjectLine =
    data.subject && data.subject.length > 0
      ? data.subject
      : `New contact from ${data.name}`;

  const htmlBody = `
    <div style="font-family: Inter, sans-serif; line-height: 1.6;">
      <h2 style="margin-bottom: 16px;">New portfolio enquiry</h2>
      <p><strong>Name:</strong> ${sanitizeForHtml(data.name)}</p>
      <p><strong>Email:</strong> ${sanitizeForHtml(data.email)}</p>
      ${
        data.subject
          ? `<p><strong>Subject:</strong> ${sanitizeForHtml(data.subject)}</p>`
          : ""
      }
      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line;">${sanitizeForHtml(data.message)}</p>
    </div>
  `;

  const textBody = `New portfolio enquiry\n\nName: ${data.name}\nEmail: ${
    data.email
  }\n${data.subject ? `Subject: ${data.subject}\n` : ""}\nMessage:\n${
    data.message
  }`;

  try {
    await mailTransporter.sendMail({
      from: `Portfolio Contact via ${data.name} <${gmailUser}>`,
      to: recipientEmail,
      replyTo: data.email,
      subject: subjectLine,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[contact] Failed to send email", error);
    return NextResponse.json(
      { message: "Failed to send message. Please try again later." },
      { status: 502 }
    );
  }
}
