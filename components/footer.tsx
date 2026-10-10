import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] items-center gap-4 px-6 py-8 md:px-12 lg:grid-cols-3 lg:px-20 lg:py-10">
        <a href="#top" aria-label="Softground" className="justify-self-start">
          <Image
            src="/images/logo.svg"
            alt="Softground"
            width={125}
            height={24}
            unoptimized
          />
        </a>
        <p className="text-xs text-ink/80 lg:text-center">Terms and conditions</p>
        <p className="text-xs text-ink/80 lg:text-right">© Softground 2026</p>
      </div>
    </footer>
  );
}
