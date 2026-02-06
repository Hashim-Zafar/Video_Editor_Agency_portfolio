export default function CoverHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#07080C] text-[#E7E9FF]">
      {/* Top-left label */}
      <div className="absolute left-8 top-8 text-[14px] font-semibold tracking-widest ">
        F — S
      </div>

      {/* Top-right dot */}
      <div className="absolute right-8 top-8 h-3 w-3 rounded-full bg-gradient-to-br from-[#8B7CFF] to-[#4D6BFF] shadow-[0_0_12px_#6C7CFF]" />

      {/* Center huge title */}
      <div className="grid min-h-screen place-items-center px-6">
        <h1
          className="text-center font-extrabold uppercase leading-[0.82] tracking-[-0.06em]   bg-gradient-to-b
            from-[#FFFFFF]
            via-[#C9CCFF]
            to-[#8B7CFF]
            bg-clip-text
            text-transparent"
          style={{ fontSize: "clamp(72px, 18vw, 260px)" }}
        >
          <span className="block">FLOK</span>
          <span className="block">STUDIO</span>
        </h1>
      </div>

      {/* Bottom-right email */}
      <a
        href="mailto:hello@flokstudio.com"
        className="absolute bottom-8 right-8 text-[12px] font-semibold tracking-widest text-[#C9CCFF] hover:text-white transition-colors"
      >
        EMAIL ME
      </a>

      {/* Bottom-center scroll arrow */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#AEB4FF]">
        {/* Arrow */}
        <svg
          className="h-6 w-6 animate-bounce drop-shadow-[0_0_6px_#6C7CFF]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 5v14m0 0l-6-6m6 6l6-6"
          />
        </svg>

        {/* Tiny label */}
        <span className="mt-2 text-[10px] font-semibold uppercase tracking-widest opacity-60">
          Scroll
        </span>
      </div>
    </section>
  );
}
