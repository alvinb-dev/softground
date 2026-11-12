import Link from "next/link";
import type { ContactTab, ServiceValue } from "@/lib/inquiry";

type BookButtonProps = {
  className?: string;
  full?: boolean;
  size?: "md" | "lg";
  variant?: "primary" | "outline" | "white";
  service?: ServiceValue;
  tab?: ContactTab;
  label?: string;
};

const variants = {
  primary: "bg-lime text-ink hover:brightness-95",
  outline: "border border-white bg-transparent text-white hover:bg-white/10",
  white: "border border-white bg-white text-ink hover:bg-white/90",
};

export function BookButton({
  className = "",
  full = false,
  size = "md",
  variant = "primary",
  service,
  tab,
  label = "Book a call",
}: BookButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-2xl px-6 text-base font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
    variants[variant],
    size === "lg" ? "h-[52px]" : "h-12",
    full ? "w-full" : "",
    className,
  ].join(" ");

  const params = new URLSearchParams();
  if (service) params.set("service", service);
  if (tab) params.set("tab", tab);
  const query = params.toString();
  const href = query ? `/contact?${query}` : "/contact";

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
