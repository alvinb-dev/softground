export const serviceOptions = [
  { value: "conversion-audit", label: "Conversion Audit" },
  { value: "growth-design-monthly", label: "Growth Design Monthly" },
  { value: "embedded-design-partner", label: "Embedded Design Partner" },
  { value: "something-else", label: "Something else, such as a website project" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const sourceOptions = [
  "Referral or word of mouth",
  "LinkedIn",
  "Google or another search engine",
  "AI assistant, such as ChatGPT or Claude",
  "Other",
] as const;

export const linkedInUrl = "https://www.linkedin.com/in/alvin-balemesa-8510a476/";

const defaultCalBookingUrl = "https://cal.com/alvin-softground/intro";

export const calBookingUrl = normalizeCalUrl(process.env.NEXT_PUBLIC_CAL_URL);

export function calEmbedPath(url: string) {
  try {
    const path = new URL(url).pathname.replace(/^\/+|\/+$/g, "");
    if (path) return path;
  } catch {
    const path = url.replace(/^\/+|\/+$/g, "");
    if (path) return path;
  }

  return "alvin-softground/intro";
}

function normalizeCalUrl(value: string | undefined) {
  const raw = value?.trim();
  if (!raw) return defaultCalBookingUrl;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `https://cal.com/${raw.replace(/^\/+/, "")}`;
}

export type ServiceValue = (typeof serviceOptions)[number]["value"];
export type SourceValue = (typeof sourceOptions)[number];
export type ContactTab = "book" | "message";

export type FieldName =
  | "name"
  | "email"
  | "business"
  | "website"
  | "help"
  | "service"
  | "files"
  | "source";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<FieldName, string>>;
};

export function isServiceValue(value: string): value is ServiceValue {
  return serviceOptions.some((option) => option.value === value);
}

export function isSourceValue(value: string): value is SourceValue {
  return sourceOptions.some((option) => option === value);
}

export function isContactTab(value: string): value is ContactTab {
  return value === "book" || value === "message";
}

export function serviceLabel(value: ServiceValue) {
  return serviceOptions.find((option) => option.value === value)?.label ?? value;
}
