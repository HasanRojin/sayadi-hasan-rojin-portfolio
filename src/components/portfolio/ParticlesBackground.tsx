"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorIdx: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

/* Neon palette — exact accent colors from the design system */
const PALETTE = [
  { hex: "#a855f7", rgb: [168, 85, 247] }, // neon purple
  { hex: "#f472b6", rgb: [244, 114, 182] }, // neon pink
  { hex: "#c084fc", rgb: [192, 132, 252] }, // light violet
];

/**
 * Lightweight canvas-based particle constellation.
 * - Fixed full-screen backdrop behind all content (-z-10)
 * - Neon purple/pink dots (#a855f7 / #f472b6) with connecting lines
 * - Slow drifting motion + subtle twinkle + cursor "grab" links
 * - Respects prefers-reduced-motion and pauses when the tab is hidden
 * - Visibility: panels above it use translucent glass + backdrop-blur,
 *   so particles float visibly BEHIND glassmorphism cards.
 */
export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let particles: Particle[] = [];

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(110, Math.max(42, Math.floor((width * height) / 22000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32, // slow drift
        vy: (Math.random() - 0.5) * 0.32,
        radius: Math.random() * 1.9 + 1.2,
        colorIdx: Math.floor(Math.random() * PALETTE.length),
        baseAlpha: 0.38 + Math.random() * 0.32,
        twinkleSpeed: 0.4 + Math.random() * 1.1,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };

    const LINK_DISTANCE = 160;
    const MOUSE_DISTANCE = 200;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      // Connection lines — colored by each pair (purple↔pink mix)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pc = PALETTE[p.colorIdx].rgb;
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.22;
            // use the color of the LEFT particle — yields a mix of
            // purple and pink lines across the field
            ctx.strokeStyle = `rgba(${pc[0]},${pc[1]},${pc[2]},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        // Cursor link — always neon pink for the "alive" feel
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < MOUSE_DISTANCE) {
          const alpha = (1 - mdist / MOUSE_DISTANCE) * 0.45;
          ctx.strokeStyle = `rgba(244, 114, 182, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Dots with twinkle + soft halo
      for (const p of particles) {
        const c = PALETTE[p.colorIdx];
        const tw = reduced
          ? 1
          : 0.72 + 0.28 * Math.sin(t * 0.001 * p.twinkleSpeed + p.twinklePhase);
        const alpha = p.baseAlpha * tw;

        // soft halo (cheap: one larger translucent circle, no shadowBlur)
        ctx.globalAlpha = alpha * 0.22;
        ctx.fillStyle = c.hex;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.6, 0, Math.PI * 2);
        ctx.fill();

        // core dot
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const step = (t: number) => {
      if (!running) return;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }
      draw(t);
      raf = requestAnimationFrame(step);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    build();
    if (reduced) {
      draw(0); // static constellation for reduced-motion users
    } else {
      raf = requestAnimationFrame(step);
    }

    const onResize = () => {
      build();
      draw(0);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
