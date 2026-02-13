import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Services() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  useLayoutEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion) return;

    const split = new SplitText(el, { type: "words" });

    // IMPORTANT: set initial styles on the words (not on the h2)
    gsap.set(split.words, {
      opacity: 0,
      y: 10,
      filter: "blur(12px)",
    });

    const tween = gsap.to(split.words, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.6,
      stagger: 0.015,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, []);

  useThumbMarquee(trackRef);

  return (
    <section className="bg-[#F3F1ED]  py-40">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section header */}
        <div className="mb-10 text-center lg:mb-16">
          {/* small label */}
          <p className="text-[12px] font-semibold tracking-[0.28em] text-[#1B1B5A]/70">
            SERVICES
          </p>

          {/* big heading */}
          <h2
            ref={headingRef}
            className="
      mt-4
      font-extrabold
      leading-[1.05]
      tracking-[-0.02em]
      text-[#1B1B5A]
      text-[32px]          
      sm:text-[40px]
      md:text-[52px]
      lg:text-[67.2px]   
      
    "
          >
            Covering Every
            <br />
            Part To Make You <span className="text-blue-500">Go Viral</span>
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <CardOne />
          <CardTwo />
          <CardThree trackRef={trackRef} />
          <CardFour />
        </div>
      </div>
    </section>
  );
}

function useFadeInOnView(ref: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion) return;

    gsap.set(el, { opacity: 0, y: 40 });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%", // 🔥 when top enters viewport
        toggleActions: "play none none reverse", // optional reverse on scroll up
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref]);
}

/* ----------------------------- GSAP (Card 3) ----------------------------- */

function useThumbMarquee(trackRef: React.RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion) return;

    let tween: gsap.core.Tween | null = null;

    const build = () => {
      tween?.kill();
      gsap.set(track, { x: 0 });

      const items = Array.from(track.children) as HTMLElement[];
      if (items.length < 4) return;

      // measure width of first pair (item0 -> item1)
      const a0 = items[0].getBoundingClientRect();
      const a1 = items[1].getBoundingClientRect();
      const pairWidth = a1.right - a0.left;

      if (!pairWidth || pairWidth < 10) return;

      tween = gsap.to(track, {
        x: -pairWidth,
        duration: 12,
        ease: "none",
        repeat: -1,
      });
    };

    build();

    const onResize = () => build();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tween?.kill();
    };
  }, []);
}

/* --------------------------------- Cards --------------------------------- */

function CardOne() {
  const ref = useRef<HTMLDivElement | null>(null);
  useFadeInOnView(ref);
  return (
    <div
      ref={ref}
      className="relative h-[320px] overflow-hidden rounded-2xl lg:col-span-7"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#F2F3FF] via-[#E8E9FF] to-[#D9DBFF]" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_100%,rgba(70,90,255,0.22)_0%,rgba(70,90,255,0)_60%)]" />
      </div>

      <div className="relative z-10 flex h-full flex-col px-6 pt-7 lg:px-10 lg:pt-8">
        <div className="text-center">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-[#1B1B5A]/75">
            YOUTUBE AND PODCASTS
          </p>
          <h3 className="mt-2 text-[38px] font-extrabold leading-[0.95] tracking-[-0.02em] text-[#1B1B5A] sm:text-[46px]">
            Long-Form Editing
          </h3>
        </div>

        <div className="absolute bottom-0 left-1/2 h-[60%] w-[92%] -translate-x-1/2">
          <img
            className="h-full w-full rounded-t-2xl object-cover"
            src="/images/services_image_1.avif"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

function CardTwo() {
  const ref = useRef<HTMLDivElement | null>(null);
  useFadeInOnView(ref);
  return (
    <div
      ref={ref}
      className="relative h-[320px] overflow-hidden rounded-2xl lg:col-span-5"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#3F4CE0] to-[#2B3196]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_20%_100%,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0)_55%)]" />

      <div className="relative z-10 flex h-full flex-col gap-4 px-6 py-6 lg:px-8">
        {/* Text */}
        <div className="lg:pr-[170px]">
          <h3 className="text-[34px] font-extrabold leading-[1.05] tracking-[-0.02em] text-white">
            Short-Form
            <br />
            Editing
          </h3>

          <p className="mt-4 max-w-[28ch] text-[14px] leading-relaxed text-white/80">
            Edits that keep attention and increase watch time on TikTok, Reels,
            and YouTube Shorts.
          </p>
        </div>

        {/* Image (mobile: in flow | lg+: absolute on right) */}
        <div className="relative mt-auto h-[170px] w-full lg:absolute lg:right-5 lg:top-5 lg:mt-0 lg:h-[360px] lg:w-[220px]">
          <img
            src="/images/mobile_skeleton.png"
            alt="Short-form example"
            className="h-full w-full object-contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

function CardThree({
  trackRef,
}: {
  trackRef: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useFadeInOnView(ref);
  return (
    <div
      ref={ref}
      className="relative h-[260px] overflow-hidden rounded-2xl lg:col-span-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#3F4CE0] to-[#2B3196]" />

      <div className="relative z-10 px-6 pt-6 text-center lg:px-10">
        <p className="text-[10px] font-semibold tracking-[0.28em] text-white/85">
          BOOST CTR
        </p>
        <h3 className="mt-2 text-[32px] font-extrabold leading-[0.95] tracking-[-0.02em] text-white sm:text-[38px]">
          Thumbnails
        </h3>
      </div>

      <div className="relative z-10 mt-auto px-4 pb-4 lg:px-6 md:mt-4 max-sm:mt-4">
        <div className="relative h-[155px] overflow-hidden rounded-2xl">
          <div ref={trackRef} className="flex h-full w-max gap-7">
            <ThumbPanel src="/images/services_image_2.avif" />
            <ThumbPanel src="/images/services_image_3.avif" />
            {/* duplicate set for seamless loop */}
            <ThumbPanel src="/images/services_image_2.avif" />
            <ThumbPanel src="/images/services_image_3.avif" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardFour() {
  const ref = useRef<HTMLDivElement | null>(null);
  useFadeInOnView(ref);
  return (
    <div
      ref={ref}
      className="relative h-[260px] overflow-hidden rounded-2xl bg-[#EEF0FF] lg:col-span-4"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#1B1B5A]/10" />

      <div className="flex h-full flex-col items-center px-6 py-6 text-center">
        <h3 className="text-[32px] font-extrabold leading-none tracking-[-0.02em] text-[#1B1B5A]">
          Animations
        </h3>

        <div className="mt-6 grid flex-1 place-items-center">
          <AnimationsIcon />
        </div>

        <p className="max-w-[26ch] text-[16px] leading-relaxed text-[#1B1B5A]/60">
          Premium long-form video editing tailored for YouTube and podcasts.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ Small pieces ------------------------------ */

function ThumbPanel({ src }: { src: string }) {
  return (
    <div
      className="relative h-full w-[360px] shrink-0 overflow-hidden rounded-2xl bg-white/10 shadow-[0_22px_70px_rgba(0,0,0,0.38)]"
      style={{
        transform: "rotateZ(-7deg) scale(1.02)",
        transformOrigin: "center",
      }}
    >
      <img src={src} alt="" className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
    </div>
  );
}

function AnimationsIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#1B1B5A]"
    >
      <rect
        x="18"
        y="26"
        width="28"
        height="12"
        rx="6"
        transform="rotate(-25 18 26)"
        fill="currentColor"
      />
      <path
        d="M14 22c-4 0-6-3-6-6s3-6 7-6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M50 42c4 0 6 3 6 6s-3 6-7 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
