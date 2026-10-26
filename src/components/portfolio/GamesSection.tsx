"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Gamepad2 } from "lucide-react";
import { GAMES } from "@/lib/portfolio-data";

export default function GamesSection() {
  return (
    <section
      id="games"
      className="relative py-24 z-10 bg-black/20 border-y border-purple-500/10 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-[10px] sm:text-xs font-semibold tracking-wide text-purple-300 uppercase border border-purple-500/30 mb-5">
            <Gamepad2 size={13} className="text-fuchsia-400" />
            Roblox Studio
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Roblox{" "}
            <span className="text-gradient">Creations</span>
          </h2>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            A glimpse into the immersive virtual worlds I&apos;ve built in
            Roblox Studio — every world is live and playable right now.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {GAMES.map((game, i) => (
            <motion.a
              key={game.name}
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-2xl overflow-hidden group relative block"
            >
              {/* Cover */}
              <div className="relative aspect-square overflow-hidden border-b border-purple-500/15">
                <Image
                  src={game.image}
                  alt={`${game.name} cover art`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* hover sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05030a]/80 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                {/* index badge */}
                <span className="absolute left-3 top-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold tracking-widest text-purple-300 border border-purple-500/25">
                  {game.index}
                </span>
                {/* play flag */}
                <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-600/85 backdrop-blur-md text-[10px] font-bold text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_16px_rgba(147,51,234,0.5)]">
                  <ExternalLink size={11} />
                  PLAY NOW
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1.5 leading-snug group-hover:text-purple-200 transition-colors">
                  {game.name}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-5">
                  {game.tagline}
                </p>
                <span className="inline-flex w-full items-center justify-center gap-1.5 py-2.5 rounded-lg bg-purple-500/15 group-hover:bg-purple-500/35 text-purple-200 font-semibold text-xs transition-colors border border-purple-500/25 group-hover:border-purple-400/50">
                  Play on Roblox
                  <ExternalLink size={12} className="opacity-70" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
