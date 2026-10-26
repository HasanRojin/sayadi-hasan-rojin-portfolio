"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "games", label: "Roblox Games" },
  { id: "showcase", label: "3D Showcase" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/**
 * Left-side scroll indicator / dot navigation.
 * - Vertical gradient rail running through the dots, filling with scroll
 * - One dot per section; active dot glows and scales up; past dots stay lit
 * - Click a dot → smooth scroll to that section (deferred — synchronous
 *   scrolls issued during click dispatch are blocked by the browser)
 * - Tooltips with the section name on hover
 * - Desktop only (xl+); hidden on tablets/phones where it would crowd content
 */
export default function ScrollDots() {
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;

        // --- scroll progress (0 → 1) ---
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);

        // --- active section: the one holding the viewport centre ---
        const probe = window.scrollY + window.innerHeight * 0.45;
        let current = SECTIONS[0].id;
        for (const s of SECTIONS) {
          const el = document.getElementById(s.id);
          if (el && el.offsetTop <= probe) current = s.id;
        }
        // bottom of page always maps to the last section
        if (max > 0 && window.scrollY >= max - 4) {
          current = SECTIONS[SECTIONS.length - 1].id;
        }
        setActive(current);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (id: string) => {
    // Deferred: synchronous scrollIntoView during click dispatch is
    // blocked/aborted by the browser (same fix as the mobile menu).
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 90);
  };

  const activeIndex = SECTIONS.findIndex((s) => s.id === active);

  return (
    <motion.nav
      aria-label="Section navigation"
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center"
    >
      {/* track behind the dots */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] rounded-full bg-white/10"
        style={{ height: `${SECTIONS.length * 56 - 28}px` }}
      >
        {/* gradient progress fill */}
        <div
          className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-purple-400 to-fuchsia-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
          style={{ height: `${Math.max(6, progress * 100)}%` }}
        />
      </div>

      {/* dots */}
      <div className="relative flex flex-col items-center gap-14">
        {SECTIONS.map((s, i) => {
          const isActive = s.id === active;
          const isPast = i < activeIndex;
          return (
            <button
              key={s.id}
              onClick={() => goTo(s.id)}
              aria-label={`Go to ${s.label} section`}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex items-center justify-center p-1.5 cursor-pointer"
            >
              {/* tooltip */}
              <span
                className={`pointer-events-none absolute right-full mr-3.5 whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide transition-all duration-300 bg-[#0a0514]/95 border border-purple-500/25 backdrop-blur-sm shadow-[0_0_18px_rgba(147,51,234,0.25)] ${
                  isActive
                    ? "text-white opacity-100 translate-x-0"
                    : "text-purple-200/90 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {s.label}
              </span>

              {/* glow halo for the active dot */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-fuchsia-500/45 blur-[7px]"
                />
              )}

              {/* the dot */}
              <span
                className={`relative block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-3 h-3 bg-gradient-to-br from-purple-400 to-fuchsia-500 shadow-[0_0_14px_rgba(217,70,239,0.85)] ring-2 ring-fuchsia-400/40"
                    : isPast
                      ? "w-2 h-2 bg-purple-400/70 group-hover:bg-fuchsia-400"
                      : "w-2 h-2 bg-white/25 group-hover:bg-purple-300"
                }`}
              />
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
