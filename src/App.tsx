import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CoverHero from "./components/coverHero";
import MainHero from "./components/mainHero";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null); // forwarded ref

  useLayoutEffect(() => {
    const container = containerRef.current;
    const hero = heroRef.current;
    const content = heroContentRef.current;
    if (!container || !hero || !content) return;

    const ctx = gsap.context(() => {
      // start mask hidden
      gsap.set(hero, {
        WebkitMaskSize: "100% 0%",
        maskSize: "100% 0%",
      });

      // query INSIDE MainHero only
      const title = content.querySelector(".mh-title");
      const copy = content.querySelector(".mh-copy");
      const cta = content.querySelector(".mh-cta");

      gsap.set([title, copy, cta], { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // mask reveal
      tl.to(hero, {
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        ease: "none",
        duration: 1,
      });

      // text reveal AFTER mask progress
      if (title) tl.to(title, { opacity: 1, y: 0 }, 0.6);
      if (copy) tl.to(copy, { opacity: 1, y: 0 }, 0.7);
      if (cta) tl.to(cta, { opacity: 1, y: 0 }, 0.8);
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="hero-wrap h-screen w-screen relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <CoverHero />
        </div>
        <div ref={heroRef} className="main-hero">
          <MainHero ref={heroContentRef} />
        </div>
      </div>
    </>
  );
}
