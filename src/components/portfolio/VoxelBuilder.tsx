"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import {
  OrbitControls,
  Grid,
  Environment,
  Lightformer,
  Edges,
} from "@react-three/drei";
import { Brush, Eraser, Undo2, Trash2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Constants & shared GPU resources                                    */
/* ------------------------------------------------------------------ */

const PALETTE = [
  "#a855f7", // violet
  "#d946ef", // fuchsia
  "#f472b6", // pink
  "#22d3ee", // cyan
  "#34d399", // emerald
  "#fbbf24", // amber
  "#f87171", // red
  "#f8fafc", // white
];

const GRID_SIZE = 20;
const HALF = GRID_SIZE / 2;
const MAX_BLOCKS = 400;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const materialCache = new Map<string, THREE.MeshPhysicalMaterial>();
function getBlockMaterial(color: string): THREE.MeshPhysicalMaterial {
  let mat = materialCache.get(color);
  if (!mat) {
    mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      roughness: 0.08,
      metalness: 0.2,
      transparent: true,
      opacity: 0.82,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.55,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      reflectivity: 0.6,
      iridescence: 0.35,
      iridescenceIOR: 1.3,
    });
    materialCache.set(color, mat);
  }
  return mat;
}

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface Block {
  id: number;
  gx: number;
  gy: number;
  gz: number;
  color: string;
}

type Mode = "build" | "erase";

interface GhostState {
  gx: number;
  gy: number;
  gz: number;
  kind: "build" | "erase";
}

const keyOf = (x: number, y: number, z: number) => `${x},${y},${z}`;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function VoxelBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [mode, setMode] = useState<Mode>("build");
  const [ghost, setGhost] = useState<GhostState | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const idCounter = useRef(1);
  const isTap = useRef(true);
  const downPos = useRef<{ x: number; y: number } | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ----- derived ----- */
  const occupied = useMemo(
    () => new Set(blocks.map((b) => keyOf(b.gx, b.gy, b.gz))),
    [blocks]
  );

  /* ----- auto-rotate management ----- */
  const pauseRotation = () => {
    setAutoRotate(false);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setAutoRotate(true), 25000);
  };

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  /* ----- tap vs drag discrimination (so orbiting never places blocks) ----- */
  const handlePointerDownCapture = (e: React.PointerEvent<HTMLDivElement>) => {
    downPos.current = { x: e.clientX, y: e.clientY };
    isTap.current = true;
    pauseRotation();
  };

  const handlePointerMoveCapture = (e: React.PointerEvent<HTMLDivElement>) => {
    if (downPos.current) {
      const dist = Math.hypot(
        e.clientX - downPos.current.x,
        e.clientY - downPos.current.y
      );
      if (dist > 8) isTap.current = false;
    }
  };

  const handlePointerUpCapture = () => {
    downPos.current = null;
  };

  /* ----- block operations ----- */
  const addBlock = (gx: number, gy: number, gz: number) => {
    if (gx < -HALF || gx >= HALF || gz < -HALF || gz >= HALF) return;
    if (gy < 0 || gy > 24) return;
    setBlocks((prev) => {
      if (prev.length >= MAX_BLOCKS) return prev;
      if (prev.some((b) => b.gx === gx && b.gy === gy && b.gz === gz))
        return prev;
      return [
        ...prev,
        { id: idCounter.current++, gx, gy, gz, color: selectedColor },
      ];
    });
  };

  const removeBlock = (id: number) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    setGhost(null);
  };

  const undo = () => setBlocks((prev) => prev.slice(0, -1));
  const clearAll = () => {
    setBlocks([]);
    setGhost(null);
  };

  /* ----- 3D event handlers ----- */
  const handleGroundUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!isTap.current || mode !== "build") return;
    addBlock(Math.floor(e.point.x), 0, Math.floor(e.point.z));
  };

  const handleGroundMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (mode !== "build") {
      setGhost(null);
      return;
    }
    setGhost({
      gx: Math.floor(e.point.x),
      gy: 0,
      gz: Math.floor(e.point.z),
      kind: "build",
    });
  };

  const handleBlockUp = (e: ThreeEvent<PointerEvent>, b: Block) => {
    e.stopPropagation();
    if (!isTap.current) return;
    const shift = (e.nativeEvent as PointerEvent).shiftKey;
    if (shift || mode === "erase") {
      removeBlock(b.id);
      return;
    }
    const n = e.face?.normal;
    if (!n) return;
    addBlock(
      b.gx + Math.round(n.x),
      b.gy + Math.round(n.y),
      b.gz + Math.round(n.z)
    );
  };

  const handleBlockMove = (e: ThreeEvent<PointerEvent>, b: Block) => {
    e.stopPropagation();
    const shift = (e.nativeEvent as PointerEvent).shiftKey;
    if (mode === "erase" || shift) {
      setGhost({ gx: b.gx, gy: b.gy, gz: b.gz, kind: "erase" });
      return;
    }
    const n = e.face?.normal;
    if (!n) return;
    setGhost({
      gx: b.gx + Math.round(n.x),
      gy: b.gy + Math.round(n.y),
      gz: b.gz + Math.round(n.z),
      kind: "build",
    });
  };

  /* ----- ghost visibility ----- */
  const ghostVisible =
    ghost !== null &&
    (ghost.kind === "erase" ||
      !occupied.has(keyOf(ghost.gx, ghost.gy, ghost.gz)));

  return (
    <div
      className="relative w-full h-full rounded-3xl overflow-hidden voxel-stage border border-purple-500/15 ring-glow"
      onPointerDownCapture={handlePointerDownCapture}
      onPointerMoveCapture={handlePointerMoveCapture}
      onPointerUpCapture={handlePointerUpCapture}
      onPointerLeave={() => setGhost(null)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* ============ 3D CANVAS ============ */}
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [15, 13, 15], fov: 42, near: 0.5, far: 200 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onPointerMissed={() => setGhost(null)}
        style={{ background: "transparent", cursor: "crosshair" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[12, 22, 8]} intensity={1.6} />
        <pointLight
          position={[-14, 9, -10]}
          intensity={110}
          distance={55}
          decay={2}
          color="#a855f7"
        />
        <pointLight
          position={[13, 7, 12]}
          intensity={80}
          distance={55}
          decay={2}
          color="#f472b6"
        />

        {/* Offline environment map for premium reflections */}
        <Environment resolution={64} frames={1}>
          <Lightformer
            form="rect"
            intensity={1.4}
            position={[0, 9, 0]}
            rotation-x={Math.PI / 2}
            scale={[12, 12, 1]}
            color="#e9d5ff"
          />
          <Lightformer
            form="rect"
            intensity={2.2}
            position={[-10, 4, -6]}
            rotation-y={Math.PI / 4}
            scale={[8, 4, 1]}
            color="#a855f7"
          />
          <Lightformer
            form="rect"
            intensity={2.2}
            position={[10, 3, 6]}
            rotation-y={-Math.PI / 4}
            scale={[8, 4, 1]}
            color="#f472b6"
          />
        </Environment>

        {/* Visual grid */}
        <Grid
          position={[0, 0.002, 0]}
          args={[GRID_SIZE, GRID_SIZE]}
          cellSize={1}
          cellThickness={0.6}
          cellColor="#7e22ce"
          sectionSize={5}
          sectionThickness={1.2}
          sectionColor="#c084fc"
          fadeDistance={46}
          fadeStrength={1.1}
          infiniteGrid={false}
        />

        {/* Invisible raycast ground */}
        <mesh
          rotation-x={-Math.PI / 2}
          position={[0, 0, 0]}
          onPointerUp={handleGroundUp}
          onPointerMove={handleGroundMove}
        >
          <planeGeometry args={[GRID_SIZE, GRID_SIZE]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* Placed blocks */}
        {blocks.map((b) => (
          <mesh
            key={b.id}
            geometry={boxGeometry}
            material={getBlockMaterial(b.color)}
            position={[b.gx + 0.5, b.gy + 0.5, b.gz + 0.5]}
            onPointerUp={(e) => handleBlockUp(e, b)}
            onPointerMove={(e) => handleBlockMove(e, b)}
          />
        ))}

        {/* Ghost preview — no event handlers, so it is never raycast */}
        {ghostVisible && ghost && (
          <mesh position={[ghost.gx + 0.5, ghost.gy + 0.5, ghost.gz + 0.5]}>
            <boxGeometry args={[1.04, 1.04, 1.04]} />
            <meshBasicMaterial
              color={ghost.kind === "erase" ? "#f87171" : selectedColor}
              transparent
              opacity={0.3}
              depthWrite={false}
            />
            <Edges
              color={ghost.kind === "erase" ? "#fca5a5" : "#ffffff"}
              threshold={15}
            />
          </mesh>
        )}

        {/* Camera controls */}
        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={9}
          maxDistance={40}
          maxPolarAngle={Math.PI / 2.15}
          target={[0, 1.5, 0]}
          enableDamping
          dampingFactor={0.08}
          autoRotate={autoRotate}
          autoRotateSpeed={0.9}
        />
      </Canvas>

      {/* ============ UI OVERLAYS (never overlap: single columns, corners) ============ */}

      {/* Top-left: title, hint, counter — one vertical stack */}
      <div className="absolute left-3 top-3 sm:left-5 sm:top-5 z-20 flex flex-col items-start gap-2 max-w-[62%] pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-purple-500/30 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-purple-300 whitespace-nowrap">
          Voxel Builder
        </span>
        <span className="px-3 py-1.5 rounded-lg bg-black/55 backdrop-blur-md border border-purple-500/20 text-[10px] sm:text-xs text-slate-300 leading-relaxed">
          <b className="text-white">Click</b> to place ·{" "}
          <b className="text-white">Shift + Click</b> to remove
        </span>
        <span className="px-3 py-1 rounded-lg bg-black/55 backdrop-blur-md border border-purple-500/20 text-[10px] sm:text-xs font-bold tracking-widest text-fuchsia-300 tabular-nums whitespace-nowrap">
          BUILDER {String(blocks.length).padStart(2, "0")}
        </span>
      </div>

      {/* Top-right: color palette */}
      <div className="absolute right-3 top-3 sm:right-5 sm:top-5 z-20 flex flex-col items-end gap-2">
        <span className="px-2.5 py-1 rounded-md bg-black/45 backdrop-blur-md text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-300/80 pointer-events-none">
          Colors
        </span>
        <div className="flex flex-wrap justify-end gap-1.5 max-w-[92px] sm:max-w-[140px]">
          {PALETTE.map((c) => (
            <button
              key={c}
              aria-label={`Select color ${c}`}
              onClick={() => {
                setSelectedColor(c);
                setMode("build");
              }}
              className={`pointer-events-auto w-6 h-6 sm:w-8 sm:h-8 rounded-lg border transition-all duration-200 hover:scale-110 active:scale-95 ${
                selectedColor === c
                  ? "border-white/80 scale-110 shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                  : "border-white/15"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Bottom-left: mode toggle + undo + clear */}
      <div className="absolute left-3 bottom-3 sm:left-5 sm:bottom-5 z-20 flex items-center gap-2 flex-wrap max-w-[calc(100%-96px)] sm:max-w-none">
        <button
          onClick={() => setMode((m) => (m === "build" ? "erase" : "build"))}
          aria-pressed={mode === "erase"}
          className={`pointer-events-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-lg backdrop-blur-md border text-xs font-semibold transition-all active:scale-95 ${
            mode === "erase"
              ? "bg-red-500/25 border-red-400/50 text-red-200"
              : "bg-black/55 border-purple-500/25 text-slate-200 hover:border-purple-400/60 hover:text-white"
          }`}
        >
          {mode === "erase" ? (
            <Eraser size={14} />
          ) : (
            <Brush size={14} />
          )}
          <span className="hidden xs:inline sm:inline">
            {mode === "erase" ? "Erase" : "Build"}
          </span>
        </button>

        <button
          onClick={undo}
          disabled={blocks.length === 0}
          aria-label="Undo last block"
          className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/55 backdrop-blur-md border border-purple-500/25 text-slate-200 text-xs font-semibold transition-all hover:border-purple-400/60 hover:text-white active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
        >
          <Undo2 size={14} />
          <span className="hidden xs:inline sm:inline">Undo</span>
        </button>

        <button
          onClick={clearAll}
          disabled={blocks.length === 0}
          aria-label="Clear all blocks"
          className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/55 backdrop-blur-md border border-purple-500/25 text-slate-200 text-xs font-semibold transition-all hover:border-purple-400/60 hover:text-white active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
        >
          <Trash2 size={14} />
          <span className="hidden xs:inline sm:inline">Clear</span>
        </button>
      </div>

      {/* Bottom-right: orbit hint */}
      <span className="absolute right-3 bottom-3 sm:right-5 sm:bottom-5 z-20 pointer-events-none text-[9px] sm:text-[10px] text-slate-500 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
        Drag to orbit
      </span>
    </div>
  );
}
