"use server";

import {
  isServiceValue,
  isSourceValue,
  serviceLabel,
  type ContactState,
  type FieldName,
} from "@/lib/inquiry";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
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

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          business,
          website,
          help,
          service: isServiceValue(service) ? serviceLabel(service) : "",
          files,
          source,
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        return {
          status: "error",
          message: "We couldn’t send your message. Please try again.",
        };
      }
    } catch {
      return {
        status: "error",
        message: "We couldn’t send your message. Please try again.",
      };
    }
  }

  return { status: "success" };
}
