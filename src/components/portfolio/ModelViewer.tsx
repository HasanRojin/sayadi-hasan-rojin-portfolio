"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Lightformer,
  useGLTF,
} from "@react-three/drei";

/** Every model is normalized to fit inside this cube, centered at origin. */
const TARGET_SIZE = 2.6;

/* ------------------------------------------------------------------ */
/* Model — loads a GLB, clones it, normalizes scale + center           */
/* ------------------------------------------------------------------ */

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  const normalized = useMemo(() => {
    const copy = scene.clone(true);

    // Material sanity pass: never let materials break canvas transparency
    copy.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        const mats = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        for (const m of mats) {
          const mat = m as THREE.MeshStandardMaterial;
          if (mat.transparent && mat.opacity === 0) mat.opacity = 1;
        }
      }
    });

    // Deterministic auto-fit: scale so max dimension = TARGET_SIZE,
    // then translate so the bounding-box center sits at the origin.
    const group = new THREE.Group();
    group.add(copy);

    const box = new THREE.Box3().setFromObject(group);
    if (!box.isEmpty()) {
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const scale = TARGET_SIZE / maxDim;
      group.scale.setScalar(scale);
      group.position.copy(center).multiplyScalar(-scale);
    }

    return group;
  }, [scene]);

  return <primitive object={normalized} dispose={null} />;
}

/* ------------------------------------------------------------------ */
/* Viewer — transparent canvas, no floor, no horizon, no background    */
/* ------------------------------------------------------------------ */

export default function ModelViewer({ url }: { url: string }) {
  return (
    <Canvas
      className="viewer-canvas"
      dpr={[1, 2]}
      camera={{ position: [0, 0.7, 4.4], fov: 38, near: 0.05, far: 120 }}
      gl={{
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
    >
      {/* Strictly transparent background — nothing attached to scene.background */}

      {/* Lighting: key + fill + purple/pink rims, NO floor, NO contact shadows */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 9, 6]} intensity={1.6} color="#ffffff" />
      <directionalLight
        position={[-7, 3, -5]}
        intensity={0.5}
        color="#c084fc"
      />
      <pointLight
        position={[-5, -2, 4]}
        intensity={14}
        distance={20}
        decay={2}
        color="#f472b6"
      />

      {/* Offline procedural environment — reflections without any visible
          background, floor or horizon line. */}
      <Environment resolution={128} frames={1} background={false}>
        <Lightformer
          form="rect"
          intensity={2}
          position={[0, 6, 4]}
          scale={[10, 6, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          position={[-6, 2, 2]}
          rotation-y={Math.PI / 3}
          scale={[8, 4, 1]}
          color="#c084fc"
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          position={[6, 1, -2]}
          rotation-y={-Math.PI / 3}
          scale={[8, 4, 1]}
          color="#f472b6"
        />
        <Lightformer
          form="rect"
          intensity={0.8}
          position={[0, -5, 0]}
          rotation-x={Math.PI / 2}
          scale={[10, 10, 1]}
          color="#3b0764"
        />
      </Environment>

      {/* Model — swap keyed by url; normalization guarantees framing */}
      <Model key={url} url={url} />

      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={1}
        maxDistance={12}
        enableDamping
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={1.4}
      />
    </Canvas>
  );
}
