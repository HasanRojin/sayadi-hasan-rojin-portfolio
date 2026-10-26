"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/* ------------------------------------------------------------------ */
/* Infinite-loop typewriter for the hero roles.                        */
/* Custom implementation (no external dep): type → hold → delete →     */
/* next title, with natural key-press jitter and a blinking gradient  */
/* cursor. Accessible: static role list for SEO/screen readers,       */
/* prefers-reduced-motion users get a static, non-animated fallback.  */
/* ------------------------------------------------------------------ */

const TITLES = [
  "Mechatronics Engineer",
  "Roblox Game Developer",
  "Hardware & CNC Enthusiast",
  "3D Artist",
  "Video Editor",
] as const;

const TYPE_MS = 75; // base delay while typing
const TYPE_JITTER_MS = 45; // random extra delay — natural key-press rhythm
const HOLD_FULL_MS = 2100; // pause once the word is fully typed
const DELETE_MS = 38; // delay while deleting (feels faster, like backspace)
const HOLD_EMPTY_MS = 480; // breathe before the next title starts

/* Fixed min-heights so typing/deleting never shifts the layout below.
   Mobile reserves two lines ("Hardware & CNC Enthusiast" can wrap),
   larger screens reserve a single line. */
const HEIGHT_CLASSES =
  "min-h-[60px] sm:min-h-[38px] xl:min-h-[46px] flex items-center";

/* Respect prefers-reduced-motion (canonical subscription pattern — no
   setState-in-effect, hydration-safe server snapshot) */
const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(callback: () => void) {
  const mq = window.matchMedia(motionQuery);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getMotionSnapshot() {
  return window.matchMedia(motionQuery).matches;
}

function getServerMotionSnapshot() {
  return false;
}

export default function Typewriter() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    getMotionSnapshot,
    getServerMotionSnapshot
  );

  const title = TITLES[titleIndex];

  /* State machine: one timeout per step, cleaned up on every change. */
  useEffect(() => {
    if (reducedMotion) return;

    let delay: number;
    if (!deleting && chars === title.length) {
      delay = HOLD_FULL_MS; // word complete → hold
    } else if (!deleting) {
      delay = TYPE_MS + Math.random() * TYPE_JITTER_MS; // typing
    } else if (chars === 0) {
      delay = HOLD_EMPTY_MS; // fully deleted → breathe
    } else {
      delay = DELETE_MS; // deleting
    }

    const t = window.setTimeout(() => {
      if (!deleting) {
        if (chars < title.length) {
          setChars(chars + 1);
        } else {
          setDeleting(true);
        }
      } else if (chars > 0) {
        setChars(chars - 1);
      } else {
        setDeleting(false);
        setTitleIndex((i) => (i + 1) % TITLES.length);
      }
    }, delay);

    return () => window.clearTimeout(t);
  }, [chars, deleting, titleIndex, title.length, reducedMotion]);

  /* ---------- Reduced motion: static, non-animated fallback ---------- */
  if (reducedMotion) {
    return (
      <div className={HEIGHT_CLASSES}>
        <span className="sr-only">
          Mechatronics Engineer, Roblox Game Developer, Hardware &amp; CNC
          Enthusiast, 3D Artist, and Video Editor.
        </span>
        <p
          aria-hidden="true"
          className="text-lg sm:text-xl font-semibold text-gradient leading-relaxed"
        >
          {TITLES.join(" · ")}
        </p>
      </div>
    );
  }

  /* ---------- Animated typewriter ---------- */
  return (
    <div className={HEIGHT_CLASSES}>
      {/* Static text for SEO + screen readers (animation is decorative) */}
      <span className="sr-only">
        Mechatronics Engineer, Roblox Game Developer, Hardware &amp; CNC
        Enthusiast, 3D Artist, and Video Editor.
      </span>

      <p
        aria-hidden="true"
        className="text-2xl sm:text-3xl xl:text-4xl font-bold text-gradient leading-tight tracking-tight"
      >
        {title.slice(0, chars)}
        <span
          aria-hidden="true"
          className="typewriter-cursor ml-1 sm:ml-1.5 inline-block w-[3px] sm:w-[4px] h-[0.82em] translate-y-[0.09em] rounded-[1px] bg-gradient-to-b from-purple-400 to-fuchsia-500"
        />
      </p>
    </div>
  );
}
