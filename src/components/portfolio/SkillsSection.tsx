"use client";

import { motion } from "framer-motion";
import {
  DraftingCompass,
  Cpu,
  Gamepad2,
  Box,
  Clapperboard,
  type LucideIcon,
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/lib/portfolio-data";

const ICONS: Record<string, LucideIcon> = {
  cad: DraftingCompass,
  electronics: Cpu,
  game: Gamepad2,
  modeling: Box,
  video: Clapperboard,
};

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-24 z-10 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Core <span className="text-purple-400">Expertise</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The tools I use to take ideas from CAD drawings and circuit boards
            to shipped, playable worlds.
          </p>
        </motion.div>

        {/* First row: 3 cards · Second row: 2 balanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => {
            const Icon = ICONS[cat.icon] ?? Box;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className={`glass-card rounded-2xl p-6 relative overflow-hidden group ${
                  i < 3 ? "lg:col-span-2" : "lg:col-span-3"
                }`}
              >
                {/* hover gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-transparent to-pink-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/25 transition-colors duration-300">
                      <Icon size={22} className="text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-white leading-tight">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {cat.blurb}
                      </p>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-start gap-2 text-[13px] text-slate-300 leading-relaxed"
                      >
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
