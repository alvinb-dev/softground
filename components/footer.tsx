import Image from "next/image";
import Link from "next/link";
import { linkedInUrl } from "@/lib/inquiry";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] items-center justify-items-center gap-4 px-6 py-8 text-center sm:grid-cols-2 sm:justify-items-start sm:text-left md:px-12 lg:grid-cols-4 lg:px-20 lg:py-10">
        <Link href="/" aria-label="Softground" className="justify-self-center sm:justify-self-start">
          <Image
            src="/images/logo.svg"
            alt="Softground"
            width={125}
            height={24}
            unoptimized
          />
        </Link>
        <p className="text-xs text-ink/80 lg:text-center">Terms and conditions</p>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-ink/80 underline-offset-2 hover:underline lg:text-center"
        >
          LinkedIn
        </a>
        <p className="text-xs text-ink/80 lg:text-right">© Softground 2026</p>
      </div>
    </footer>
  );
}
