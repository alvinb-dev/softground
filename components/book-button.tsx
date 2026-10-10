const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

type BookButtonProps = {
  className?: string;
  full?: boolean;
  size?: "md" | "lg";
};

export function BookButton({
  className = "",
  full = false,
  size = "md",
}: BookButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-xl bg-lime px-6 text-base font-medium text-ink transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
    size === "lg" ? "h-[52px]" : "h-12",
    full ? "w-full" : "",
    className,
  ].join(" ");

  if (!bookingUrl) {
    return (
      <button type="button" className={classes}>
        Book a discovery call
      </button>
    );
  }

  return (
    <a
      href={bookingUrl}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
    >
      Book a discovery call
    </a>
  );
}
