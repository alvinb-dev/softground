"use server";

import { createHash } from "node:crypto";
import { Resend } from "resend";
import {
  isServiceValue,
  isSourceValue,
  serviceLabel,
  type ContactState,
  type FieldName,
} from "@/lib/inquiry";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inbox = process.env.CONTACT_INBOX ?? "hello@softground.digital";
const fromAddress =
  process.env.CONTACT_FROM ?? "Softground <inquiries@send.softground.digital>";
const sendFailure: ContactState = {
  status: "error",
  message: "We couldn’t send your message. Please try again.",
};

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

type Inquiry = {
  name: string;
  email: string;
  business: string;
  website: string;
  help: string;
  service: string;
  files: string;
  source: string;
};

function inquiryContent(inquiry: Inquiry) {
  const rows: [string, string][] = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Business", inquiry.business],
    ["Website", inquiry.website],
    ["Interested in", inquiry.service],
    ["Files", inquiry.files],
    ["Heard about you", inquiry.source],
  ];
  const filled = rows.filter(([, value]) => value);
  const text = [...filled.map(([label, value]) => `${label}: ${value}`), "", inquiry.help].join(
    "\n",
  );
  const details = filled
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value)}</p>`,
    )
    .join("");
  const html = `<!DOCTYPE html><html lang="en"><body><h1>New inquiry</h1>${details}<h2>What they need</h2><p style="white-space:pre-wrap">${escapeHtml(inquiry.help)}</p></body></html>`;

  return { text, html };
}

function canRetry(name: string, statusCode: number | null) {
  return (
    name === "rate_limit_exceeded" ||
    name === "internal_server_error" ||
    name === "application_error" ||
    name === "concurrent_idempotent_requests" ||
    statusCode === 429 ||
    statusCode === 500
  );
}

async function deliverInquiry(inquiry: Inquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form email is not configured.");
    return false;
  }

  const resend = new Resend(apiKey);
  const { text, html } = inquiryContent(inquiry);
  const idempotencyKey = `inquiry/${createHash("sha256")
    .update(JSON.stringify(inquiry))
    .digest("hex")
    .slice(0, 40)}`;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const { error } = await resend.emails.send(
      {
        from: fromAddress,
        to: [inbox],
        replyTo: inquiry.email,
        subject: oneLine(`Inquiry from ${inquiry.name} — ${inquiry.business}`).slice(0, 200),
        html,
        text,
        tags: [{ name: "email_type", value: "inquiry" }],
      },
      { idempotencyKey },
    );

    if (!error) return true;

    console.error("Contact form email failed.", error.name, error.statusCode);
    if (!canRetry(error.name, error.statusCode) || attempt === 1) return false;

    await new Promise((resolve) => setTimeout(resolve, 400 * 2 ** attempt));
  }

  return false;
}

export async function sendMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (readText(formData, "company_url")) {
    return { status: "success" };
  }

  const name = readText(formData, "name");
  const email = readText(formData, "email");
  const business = readText(formData, "business");
  const website = readText(formData, "website");
  const help = readText(formData, "help");
  const service = readText(formData, "service");
  const files = readText(formData, "files");
  const source = readText(formData, "source");

  const fieldErrors: Partial<Record<FieldName, string>> = {};

  if (!name) fieldErrors.name = "Enter your name.";
  else if (name.length > 120) fieldErrors.name = "Use 120 characters or fewer.";

  if (!email || !emailPattern.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  } else if (email.length > 200) {
    fieldErrors.email = "Use 200 characters or fewer.";
  }

  if (!business) fieldErrors.business = "Enter your business name.";
  else if (business.length > 200) fieldErrors.business = "Use 200 characters or fewer.";

  if (website.length > 500) fieldErrors.website = "Use 500 characters or fewer.";

  if (!help) fieldErrors.help = "Tell me what you’d like help with.";
  else if (help.length > 4000) fieldErrors.help = "Use 4000 characters or fewer.";

  if (service && !isServiceValue(service)) fieldErrors.service = "Select an option.";

  if (files.length > 500) fieldErrors.files = "Use 500 characters or fewer.";

  if (source && !isSourceValue(source)) fieldErrors.source = "Select an option.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  const delivered = await deliverInquiry({
    name,
    email,
    business,
    website,
    help,
    service: isServiceValue(service) ? serviceLabel(service) : "",
    files,
    source,
  });

  if (!delivered) return sendFailure;

  return { status: "success" };
}
