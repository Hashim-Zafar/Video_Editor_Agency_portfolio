import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect } from "react";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  let split: SplitText | null = null; // Declare split in outer scope for cleanup
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const img1Ref = useRef<HTMLDivElement | null>(null);
  const img2Ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const button = buttonRef.current;

    if (!section || !heading || !paragraph || !button) return;

    const ctx = gsap.context(() => {
      const spans = heading.querySelectorAll("span");
      gsap.set(section, { opacity: 1 });

      split = new SplitText(paragraph, { type: "words" });
      const tl = gsap.timeline();

      tl.from(spans, {
        autoAlpha: 0,
        duration: 0.8,
        filter: "blur(12px)",
        stagger: 0.06,
        ease: "power2.out",
      })

        // PARAGRAPH
        .from(
          split.words,
          {
            autoAlpha: 0,
            y: 10,
            filter: "blur(12px)",
            duration: 0.6,
            stagger: 0.015,
            ease: "power2.out",
          },
          "-=0.4",
        )

        .addLabel("pStart", "<") // this means adding a bookmark so i can start other animations at this exact time

        // BUTTON starts when paragraph animation is running
        .fromTo(
          button,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,

            duration: 0.6,
            ease: "power2.out",
          },
          "pStart+=0.15",
        )

        // IMAGES start with button
        .from(
          [img1Ref.current, img2Ref.current],
          {
            autoAlpha: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.08,
          },
          "pStart+=0.15",
        );
    }, section);

    return () => {
      ctx.revert();
      split?.revert(); // Clean up SplitText to prevent memory leaks
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className=" opacity-0 relative overflow-hidden bg-[#F3F1ED]"
    >
      {/* subtle paper/noise look */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')] bg-repeat" />

      <div className="relative mx-auto max-w-6xl  pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
          {/* LEFT: copy */}
          <div className=" max-sm:px-6 md:col-span-7 w-full min-w-0 flex flex-col">
            <h1
              ref={headingRef}
              className="text-[#0B3A2E] font-extrabold uppercase leading-[0.92] tracking-[-0.06em] text-[clamp(44px,7vw,78px)]"
            >
              <span>BRINGING YOUR</span>
              <br />
              <span>VISION TO LIFE .</span>
            </h1>

            <p
              ref={paragraphRef}
              className="mt-5 text-[#0B3A2E] font-semibold leading-relaxed text-[15px] md:text-[16px] max-w-[34ch] md:max-w-[58ch]"
            >
              Where imagination, strategy, and storytelling collide to build
              unforgettable brand experiences that move people and grow
              businesses.
            </p>

            <button
              ref={buttonRef}
              className="cursor-pointer group relative w-fit mt-8 inline-flex items-center justify-center
             rounded-full border border-[#0B3A2E]/25 bg-[#F4D21D]
             px-8 py-4 text-[18px] font-extrabold text-[#0B3A2E]
             shadow-[0_10px_25px_rgba(0,0,0,0.12)]
             overflow-hidden"
            >
              {/* sliding text wrapper */}
              <span className="relative block h-[1.2em] overflow-hidden">
                {/* original text */}
                <span
                  className="block transition-transform duration-300 ease-out
                 group-hover:-translate-y-full"
                >
                  Let’s Collab!
                </span>

                {/* duplicate text coming from bottom */}
                <span
                  className="absolute inset-0 translate-y-full
                 transition-transform duration-300 ease-out
                 group-hover:translate-y-0"
                >
                  Let’s Collab!
                </span>
              </span>
            </button>
          </div>

          {/* RIGHT: collage */}
          <div className="relative md:col-span-5">
            <div className="relative mx-auto mt-2 h-[440px] w-full max-w-[560px] md:mt-0 md:h-[430px]">
              {/* Top small image-card */}
              <div
                ref={img1Ref}
                className="w-[220px] md:w-[260px] right-6 md:right-8 absolute top-0 rotate-[8deg]"
              >
                <div className="rounded-[12px] border border-gray-300 border p-[6px]">
                  <img
                    src="/images/hero-1.avif"
                    alt="hero-image-1"
                    className="w-full h-full rounded-[inherit]"
                    draggable={false}
                  />
                </div>
              </div>

              {/* Main big image-card */}
              <div
                ref={img2Ref}
                className="absolute left-3 top-[170px] w-[92%] rotate-[-6deg] select-none md:left-0 md:top-[165px] md:w-[420px]"
              >
                <div className="rounded-[12px] border border-gray-300 p-[6px]">
                  <img
                    src="/images/hero-2.avif"
                    alt="hero image 2"
                    className="w-full h-full rounded-[inherit]"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
