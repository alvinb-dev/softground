import Image from "next/image";
import { linkedInUrl } from "@/lib/inquiry";

const projects = [
  {
    eyebrow: "Paywalls & one-off purchases",
    title: "Premium content paywall",
    body: "The mobile paywall pushed one-off element purchases ahead of the subscription. I made Pro the main path, added a free download-with-watermark option and moved one-off purchases into an overflow menu. Recovered most of the active users lost in an earlier test and lifted trial starts.",
    image: null,
  },
  {
    eyebrow: "Plan selection",
    title: "Mobile plan picker",
    body: "Made choosing a plan clearer and more accessible on small screens, through a shared component. Lifted paid conversion and generated millions in recurring revenue.",
    image: "plans" as const,
  },
  {
    eyebrow: "Retention & win-back",
    title: "Personalised win-back dialogs",
    body: "Reminded lapsed subscribers of the Pro features they used most. Increased mobile re-subscriptions, rolled out globally and was reused in lifecycle emails.",
    image: null,
  },
];

export function SelectedWork() {
  return (
    <section id="work" className="px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 lg:gap-12">
        <div className="flex max-w-[760px] flex-col items-center gap-4 text-center">
          <h2 className="text-[32px] leading-[1.15] font-normal text-ink md:text-[40px] lg:text-[48px]">
            Selected work
          </h2>
          <p className="text-base leading-7 text-[#5f5f5f]">
            Projects from my time at Canva across paywalls, plan selection and
            win-back. Results are shared without exact figures.
          </p>
        </div>

        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="flex flex-col gap-4">
              <div className="relative h-[220px] overflow-hidden rounded-2xl bg-[#f4f4f4] sm:h-[260px]">
                {project.image === "plans" ? (
                  <div className="absolute top-10 left-1/2 flex -translate-x-1/2 gap-4 sm:gap-6">
                    <Image
                      src="/images/plan-left.png"
                      alt="Mobile plan picker showing monthly and yearly options"
                      width={99}
                      height={214}
                      className="h-[220px] w-[100px] rounded-[9px] border-2 border-ink object-cover object-top sm:h-[240px] sm:w-[110px]"
                    />
                    <Image
                      src="/images/plan-right.png"
                      alt="Mobile plan picker with a yearly plan selected"
                      width={99}
                      height={214}
                      className="h-[220px] w-[100px] rounded-[9px] border-2 border-ink object-cover object-top sm:h-[240px] sm:w-[110px]"
                    />
                  </div>
                ) : null}
              </div>
              <p className="font-mono text-[13px] font-medium text-[#5f5f5f] uppercase">
                {project.eyebrow}
              </p>
              <h3 className="text-2xl leading-[1.25] font-normal text-ink">
                {project.title}
              </h3>
              <p className="text-base leading-6 text-[#5f5f5f]">{project.body}</p>
            </article>
          ))}
        </div>

        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-medium text-ink underline underline-offset-2 hover:opacity-70"
        >
          See more of my work →
        </a>
      </div>
    </section>
  );
}
