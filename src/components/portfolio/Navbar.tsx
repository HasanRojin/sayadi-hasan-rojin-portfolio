"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#games", label: "Roblox Games" },
  { href: "#showcase", label: "3D Showcase" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#05030a]/80 backdrop-blur-xl border-b border-purple-500/10 py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex justify-between items-center">
        <a
          href="#home"
          className="text-xl sm:text-2xl font-extrabold tracking-wider text-white"
          aria-label="Back to top"
        >
          ROJIN<span className="text-purple-500">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative py-1 hover:text-purple-400 transition-colors"
              >
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="ml-2 px-4 py-2 rounded-lg bg-purple-600/90 hover:bg-purple-500 text-white text-xs font-bold tracking-wide transition-all shadow-[0_0_18px_rgba(147,51,234,0.4)]"
            >
              HIRE ME
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2.5 rounded-lg glass-panel text-purple-200"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#05030a]/95 backdrop-blur-xl border-b border-purple-500/10"
          >
            <ul className="px-6 py-4 flex flex-col gap-1 text-sm font-semibold text-slate-200">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      // Explicit deferred scroll: synchronous scrolls issued
                      // during click dispatch are blocked/aborted by the
                      // browser (menu unmount + fragment default action).
                      setOpen(false);
                      e.preventDefault();
                      const id = l.href.replace("#", "");
                      window.setTimeout(() => {
                        document
                          .getElementById(id)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 90);
                    }}
                    className="block px-3 py-3 rounded-lg hover:bg-purple-500/10 hover:text-purple-300 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
