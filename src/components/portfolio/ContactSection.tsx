"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Youtube, ArrowUpRight } from "lucide-react";
import { EMAIL, SOCIALS } from "@/lib/portfolio-data";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — mailto link is still available
      setCopied(false);
    }
  };

  return (
    <footer
      id="contact"
      className="relative z-10 border-t border-purple-500/10 bg-[#05030a]/80 backdrop-blur-md scroll-mt-24 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ---------- CTA ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              Let&apos;s build something{" "}
              <span className="text-gradient">amazing</span> together.
            </h2>
            <p className="text-slate-400 mb-8 max-w-md leading-relaxed">
              Have a game to ship, a model to craft, or a machine to bring to
              life? My inbox is always open.
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-[0_0_24px_rgba(147,51,234,0.45)] hover:shadow-[0_0_34px_rgba(147,51,234,0.6)] active:scale-95"
              >
                <Mail size={17} />
                {EMAIL}
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className={`inline-flex items-center gap-2 px-4 py-3.5 rounded-xl glass-card font-semibold text-sm active:scale-95 ${
                  copied ? "text-emerald-300 border-emerald-400/40" : "text-slate-200"
                }`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </motion.div>

          {/* ---------- Channels ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-5 group flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center group-hover:bg-red-500/25 transition-colors">
                    <Youtube size={21} className="text-red-500" />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-600 group-hover:text-purple-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors">
                    {s.label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{s.handle}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="mt-16 pt-8 border-t border-purple-500/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="text-2xl font-extrabold tracking-wider text-white">
              ROJIN<span className="text-purple-500">.</span>
            </span>
            <p className="text-purple-400/60 text-xs mt-1 font-medium">
              Code × Hardware × Worlds
            </p>
          </div>
          <p className="text-[11px] text-slate-600">
            &copy; 2026 Sayadi Hasan Rojin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
