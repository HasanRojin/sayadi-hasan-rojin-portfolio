# Sayadi Hasan Rojin — Portfolio

> Mechatronics Engineer · Roblox Game Developer · Hardware & CNC Enthusiast · 3D Artist · Video Editor

**Live site:** https://rojin-portfolio.vercel.app

An interactive, dark-themed portfolio built with Next.js 16, React 19, Tailwind CSS 4, Framer Motion, and React Three Fiber — with real 3D models rendered live in the browser.

## Highlights

- **Hero** — infinite typewriter cycling through five roles, plus an interactive voxel builder mini-game (place/erase blocks, orbit, undo, 8-color palette)
- **3D Showcase** — 22 hand-made GLB models rendered live (drag to rotate, scroll to zoom), auto-fitted via bounding-box normalization with a persistent WebGL canvas
- **Roblox Games** — playable experiences with live links
- **Skills** — CAD/CAM & CNC, electronics & PCB design, game development, 3D modeling & texturing, video editing
- **Contact** — email + YouTube channels

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, glass-morphism UI |
| Animation | Framer Motion |
| 3D | three.js, @react-three/fiber, @react-three/drei |
| Hosting | Vercel |

## Run Locally

```bash
npm install     # or: bun install
npm run dev     # http://localhost:3000
```

## 3D Models

All 22 models live in `public/models/` (≈ 22 MB total). Each was optimized with
[gltf-transform](https://gltf-transform.dev) — textures resized to 1024px, converted to WebP,
deduplicated, and pruned — cutting ~550 MB of raw Blender exports down to 22 MB with no visible
quality loss.
