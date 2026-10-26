"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { Box, Layers, Paintbrush, HardDrive, RotateCw } from "lucide-react";
import { MODELS } from "@/lib/portfolio-data";

const ModelViewer = dynamic(
  () => import("@/components/portfolio/ModelViewer"),
  { ssr: false }
);

export default function ShowcaseSection() {
  const [activeId, setActiveId] = useState(MODELS[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "400px" });

  const active = MODELS.find((m) => m.id === activeId) ?? MODELS[0];

  const stats = [
    { icon: Box, label: "Vertices", value: active.verts.toLocaleString() },
    { icon: Layers, label: "Materials", value: String(active.materials) },
    { icon: Paintbrush, label: "Textures", value: String(active.textures) },
    { icon: HardDrive, label: "File size", value: active.size },
  ];

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative py-24 z-10 scroll-mt-24"
    >
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/4 h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(168,85,247,0.08), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            3D <span className="text-gradient">Showcase</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            My original models — rendered live in your browser. Drag to rotate,
            scroll to zoom, and click through the collection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* ---------- Viewer ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 order-1"
          >
            <div className="relative rounded-3xl h-[380px] sm:h-[460px] lg:h-[540px] overflow-hidden glass-panel ring-glow">
              {/* Mount the WebGL canvas only when the section is near the viewport.
                  One persistent canvas — models swap inside without remounting. */}
              {inView ? (
                <div className="absolute inset-0">
                  <ModelViewer url={active.file} />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Box
                    size={40}
                    className="text-purple-500/40 animate-pulse"
                  />
                </div>
              )}

              {/* Model name overlay */}
              <div className="absolute left-4 top-4 z-10 pointer-events-none max-w-[70%]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-1.5"
                  >
                    <span className="px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-purple-500/30 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-purple-300">
                      {active.tag}
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-black/55 backdrop-blur-md border border-purple-500/20 text-sm sm:text-base font-bold text-white">
                      {active.name}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Drag hint */}
              <span className="absolute right-4 bottom-4 z-10 pointer-events-none inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] text-slate-500 bg-black/45 px-2.5 py-1.5 rounded-md backdrop-blur-sm">
                <RotateCw size={11} />
                Drag to rotate · Scroll to zoom
              </span>
            </div>

            {/* Active model stats + description */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="glass-panel rounded-xl px-4 py-3 flex items-center gap-3"
                >
                  <Icon size={16} className="text-purple-400 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">
                      {label}
                    </span>
                    <span className="text-sm font-bold text-white tabular-nums truncate">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-2xl">
              {active.description}
            </p>
          </motion.div>

          {/* ---------- Model selector ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="order-2"
          >
            <div className="glass-panel rounded-3xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-purple-300">
                  Collection
                </h3>
                <span className="text-[10px] font-semibold text-slate-500 tabular-nums">
                  {MODELS.length} models
                </span>
              </div>

              <div className="max-h-[440px] lg:max-h-[520px] overflow-y-auto nice-scrollbar pr-1.5 flex flex-col gap-2">
                {MODELS.map((m, i) => {
                  const isActive = m.id === activeId;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setActiveId(m.id)}
                      className={`group relative text-left rounded-xl px-4 py-3.5 border transition-all duration-300 ${
                        isActive
                          ? "bg-purple-500/15 border-purple-500/50 shadow-[0_0_22px_-6px_rgba(168,85,247,0.5)]"
                          : "bg-white/[0.02] border-white/5 hover:bg-purple-500/8 hover:border-purple-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`text-[10px] font-bold tabular-nums ${
                              isActive ? "text-purple-300" : "text-slate-600"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-sm font-bold truncate ${
                              isActive ? "text-white" : "text-slate-300"
                            }`}
                          >
                            {m.name}
                          </span>
                        </div>
                        <span
                          className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                            isActive
                              ? "bg-purple-500/25 text-purple-200"
                              : "bg-white/5 text-slate-500"
                          }`}
                        >
                          {m.tag}
                        </span>
                      </div>
                      <span
                        className={`block mt-1 text-[11px] tabular-nums transition-colors ${
                          isActive ? "text-purple-300/70" : "text-slate-600"
                        }`}
                      >
                        {m.verts.toLocaleString()} verts · {m.textures}{" "}
                        textures
                      </span>

                      {/* Active indicator bar */}
                      <span
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full bg-gradient-to-b from-purple-400 to-pink-500 transition-all duration-300 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
