import { forwardRef } from "react";

const MainHero = forwardRef<HTMLDivElement>(function MainHero(_, ref) {
  return (
    <div ref={ref} className="relative h-full w-full">
      <section className="relative h-full w-full overflow-hidden bg-black">
        <div className="relative h-full w-full">
          {/* Background image */}
          <img
            src="/images/main-hero.avif"
            alt="Hero background"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlays */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/45 via-transparent to-transparent" />
          </div>

          {/* Content container */}
          <div className="relative z-10 h-full w-full p-6 md:p-10 lg:p-12">
            {/* Top-left brand */}
            <div className="text-white/90 text-[18px] md:text-[20px] font-medium tracking-tight">
              Flok® Studio
            </div>

            {/* Layout wrapper */}
            <div className="absolute inset-x-6 bottom-6 md:inset-x-10 md:bottom-10 lg:inset-x-12 lg:bottom-12">
              <div className="grid items-end gap-8 lg:grid-cols-12">
                {/* Headline */}
                <h1
                  className="
    mh-title
    lg:col-span-7
    text-white
    font-semibold tracking-tight
    leading-[0.95]
    text-[44px]
    md:text-[56px]
    lg:text-[88px]
  "
                >
                  We Create Brands <br />
                  That Sticks
                </h1>
                {/* Right copy + button */}
                <div className="lg:col-span-5 lg:justify-self-end lg:max-w-[420px]">
                  <p className="mh-copy text-white/85 text-[14px] md:text-[15px] leading-relaxed">
                    We help founders grow through bold design, sharp strategy,
                    and smart marketing that drives recognition, engagement, and
                    long-term brand loyalty.
                  </p>

                  <button
                    className="
    mh-cta
    mt-6 inline-flex items-center gap-3
    rounded-full border border-white/35
    bg-white/0 px-5 py-3
    text-white text-[12px] md:text-[13px] font-semibold tracking-wider
    backdrop-blur
    hover:bg-white/10
    transition
  "
                  >
                    <span>GET IN TOUCH</span>

                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-white/5">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-90"
                      >
                        <path
                          d="M7 17L17 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9 7H17V15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default MainHero;
