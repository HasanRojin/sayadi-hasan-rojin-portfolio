"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Youtube, Sparkles, Code2, Cpu, Boxes } from "lucide-react";
import { SOCIALS } from "@/lib/portfolio-data";
import Typewriter from "@/components/portfolio/Typewriter";

/* 3D must be client-only (WebGL) */
const VoxelBuilder = dynamic(
  () => import("@/components/portfolio/VoxelBuilder"),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-full rounded-3xl voxel-stage border border-purple-500/15 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl border border-purple-500/40 bg-purple-500/10 animate-pulse" />
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-purple-300/70">
            Loading builder…
          </p>
        </div>
      </div>
    ),
  }
);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 px-5 sm:px-6 min-h-screen flex items-center z-10 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-10">
        {/* ---------- Left: intro ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full lg:w-[46%] z-20 lg:pr-6"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-[10px] sm:text-xs font-semibold tracking-wide text-purple-300 mb-6 uppercase border border-purple-500/30"
          >
            <Sparkles size={13} className="text-fuchsia-400" />
            Welcome to my creative universe
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] mb-6 tracking-tight"
          >
            Hi, I&apos;m <br />
            <span className="text-gradient">Sayadi Hasan Rojin</span>
          </motion.h1>

          {/* Dynamic roles — infinite-loop typewriter */}
          <motion.div variants={item} className="mb-5">
            <Typewriter />
          </motion.div>

          {/* Static subtitle */}
          <motion.p
            variants={item}
            className="mb-4 max-w-xl text-base sm:text-lg text-slate-300/90 leading-relaxed flex items-stretch gap-3"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 mb-0.5 w-[3px] shrink-0 rounded-full bg-gradient-to-b from-purple-400 to-fuchsia-500"
            />
            <span>
              Bridging the gap between digital code and physical hardware.
            </span>
          </motion.p>

          <motion.p
            variants={item}
            className="text-sm sm:text-base text-slate-500 mb-9 max-w-xl leading-relaxed"
          >
            I bring imagination to life through immersive virtual worlds,
            custom code, and interactive experiences — from G-code and PCBs to
            playable 3D worlds.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap gap-3 sm:gap-4 items-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-[0_0_24px_rgba(147,51,234,0.45)] hover:shadow-[0_0_34px_rgba(147,51,234,0.6)] active:scale-95"
            >
              <Code2 size={17} />
              Hire Me
            </a>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-card text-white font-bold text-sm active:scale-95"
              >
                <Youtube size={18} className="text-red-500" />
                {s.label}
              </a>
            ))}
          </motion.div>

          {/* Quick facts */}
          <motion.div
            variants={item}
            className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg"
          >
            {[
              { icon: Boxes, value: "12", label: "3D Models" },
              { icon: Code2, value: "4", label: "Roblox Games" },
              { icon: Cpu, value: "5", label: "Skill Domains" },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="glass-panel rounded-xl px-3 py-3 sm:px-4 flex flex-col gap-1"
              >
                <Icon size={16} className="text-purple-400" />
                <span className="text-xl sm:text-2xl font-extrabold text-white">
                  {value}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------- Right: Voxel Builder mini-game ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-[54%] relative flex justify-center"
        >
          <div className="w-full h-[400px] sm:h-[460px] lg:h-[540px]">
            <VoxelBuilder />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
