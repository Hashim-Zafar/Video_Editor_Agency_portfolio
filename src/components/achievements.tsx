import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    // Find the actual scrolling container (works for window OR overflow:auto parents)
    const getScrollParent = (el: HTMLElement | null) => {
      let node: HTMLElement | null = el;
      while (node && node !== document.body) {
        const style = window.getComputedStyle(node);
        const overflowY = style.overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          node.scrollHeight > node.clientHeight
        ) {
          return node;
        }
        node = node.parentElement;
      }
      return null; // null => viewport (window)
    };

    const scroller = getScrollParent(section);

    const ctx = gsap.context((): void => {
      // ----- Numbers: animate when EACH DIGIT enters view -----
      const numberEls = Array.from(
        section.querySelectorAll<HTMLElement>("[data-count]"),
      );

      numberEls.forEach((el) => {
        const end = Number(el.dataset.end || "0");
        const start = Number(el.dataset.start || "0");
        el.textContent = String(start);

        if (reduceMotion) {
          el.textContent = String(end);
          return;
        }

        const obj = { v: start };
        let played = false;

        const io = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting || played) return;
            played = true;
            io.disconnect();

            gsap.to(obj, {
              v: end,
              duration: 1.1,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = String(Math.round(obj.v));
              },
            });
          },
          {
            root: scroller, // null => viewport
            threshold: 0.35,
            rootMargin: "0px 0px -10% 0px",
          },
        );

        io.observe(el);
      });

      // ----- Arrows: flow toward CTA when EACH arrow row enters view -----
      const leftWrap = section.querySelector<HTMLElement>(
        "[data-arrows='left']",
      );
      const rightWrap = section.querySelector<HTMLElement>(
        "[data-arrows='right']",
      );

      const flow = (wrap: HTMLElement, dir: "left" | "right") => {
        const arrows = Array.from(
          wrap.querySelectorAll<HTMLElement>("[data-arrow]"),
        );
        if (!arrows.length) return;

        // Stronger motion so it's obvious
        const towardCTA = dir === "left" ? 34 : -34;

        // Reset once
        gsap.set(arrows, { x: 0, opacity: 0.18 });

        const tl = gsap.timeline({
          repeat: -1,
          defaults: { ease: "power2.inOut" },
        });

        // “Conveyor belt” feel: staggered pushes toward CTA
        tl.to(arrows, {
          x: towardCTA,
          opacity: 0.55,
          duration: 0.6,
          stagger: 0.12,
        }).to(
          arrows,
          {
            x: 0,
            opacity: 0.18,
            duration: 0.6,
            stagger: 0.12,
          },
          0.2,
        );

        return tl;
      };

      const observeAndStart = (
        wrap: HTMLElement | null,
        dir: "left" | "right",
      ) => {
        if (!wrap || reduceMotion) return;

        let started = false;

        const io = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting || started) return;
            started = true;
            io.disconnect();
            flow(wrap, dir);
          },
          { root: scroller, threshold: 0.15 },
        );

        io.observe(wrap);
      };

      observeAndStart(leftWrap, "left");
      observeAndStart(rightWrap, "right");

      // Optional: small CTA “bump” so you can visually confirm GSAP is alive
      if (!reduceMotion && ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { scale: 1 },
          {
            scale: 1.02,
            duration: 0.18,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
          },
        );
      }

      return;
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F7F3EE] text-[#14110F]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-start gap-6">
            <div className="hidden items-center gap-3 sm:flex">
              <span className="h-2 w-2 rounded-full bg-[#14110F]/80" />
              <span className="text-xs tracking-[0.35em] text-[#14110F]/55">
                ACHIEVEMENTS
              </span>
            </div>
          </div>
        </div>

        {/* Mobile section label */}
        <div className="mt-5 flex items-center gap-3 sm:hidden">
          <span className="h-2 w-2 rounded-full bg-[#14110F]/80" />
          <span className="text-xs tracking-[0.35em] text-[#14110F]/55">
            ACHIEVEMENTS
          </span>
        </div>

        {/* Heading */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div className="hidden lg:block" />
          <h2 className="max-w-3xl text-4xl font-[350] leading-[1.05] tracking-[-0.02em] text-[#14110F]/80 sm:text-5xl lg:text-6xl">
            As a data driven team, we let the numbers speak for us
          </h2>
        </div>

        {/* Stats */}
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          <StatCard
            prefix="$"
            end={500}
            suffix="M"
            title="Raised by our clients"
            desc="Helping Startups and business to get funding and grow"
          />
          <StatCard
            end={50}
            suffix="+"
            title="Websites and apps"
            desc="We support founders everywhere to make their mark"
          />
          <StatCard
            end={12}
            suffix="+"
            title="Years of experience"
            desc="We're a knit-packed team of trusted marketers & designers"
          />
        </div>

        {/* Bottom arrows + CTA */}
        <div className="mt-12 flex items-center justify-between gap-6">
          {/* left arrows */}
          <ArrowRow dataArrows="left" className="hidden sm:flex" />

          {/* CTA */}
          <button
            ref={ctaRef}
            className="mx-auto flex items-center gap-3 rounded-full border border-[#14110F]/20 bg-[#F7F3EE] px-6 py-3 text-xs font-semibold tracking-[0.22em] hover:border-[#14110F]/35"
          >
            GET IN TOUCH
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#14110F] text-[#F7F3EE]">
              ↗
            </span>
          </button>

          {/* right arrows */}
          <ArrowRow dataArrows="right" className="hidden sm:flex" reverse />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  start = 0,
  end,
  prefix = "",
  suffix = "",
  title,
  desc,
}: {
  start?: number;
  end: number;
  prefix?: string;
  suffix?: string;
  title: string;
  desc: string;
}) {
  return (
    <div data-stat-card>
      <div className="text-6xl font-[500] tracking-[-0.04em] sm:text-7xl tabular-nums">
        {prefix}
        <span data-count data-start={start} data-end={end}>
          {start}
        </span>
        {suffix}
      </div>
      <div className="mt-6 h-px w-full bg-[#14110F]/15" />
      <div className="mt-6 text-lg font-semibold">{title}</div>
      <p className="mt-3 max-w-sm text-sm leading-6 text-[#14110F]/60">
        {desc}
      </p>
    </div>
  );
}

function ArrowRow({
  className = "",
  reverse = false,
  dataArrows,
}: {
  className?: string;
  reverse?: boolean;
  dataArrows: "left" | "right";
}) {
  const arrows = new Array(6).fill(0);

  return (
    <div
      data-arrows={dataArrows}
      className={[
        "flex items-center gap-5",
        reverse ? "justify-end" : "justify-start",
        className,
      ].join(" ")}
    >
      {arrows.map((_, i) => (
        <span
          key={i}
          data-arrow
          className={[
            "inline-block will-change-transform text-6xl font-[300] leading-none",
            i % 3 === 1 ? "text-[#14110F]" : "text-[#14110F]",
          ].join(" ")}
        >
          {reverse ? "‹" : "›"}
        </span>
      ))}
    </div>
  );
}
