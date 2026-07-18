"use client";

import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type Strand = {
  id: string;
  start: [number, number, number];
  mid: [number, number, number];
  end: [number, number, number];
  chaosPosition: [number, number, number];
  chaosRotation: [number, number, number];
  delay: number;
  glossy: boolean;
  thickness: number;
};

const strands: Strand[] = Array.from({ length: 22 }, (_, index) => {
  const side = index < 8 ? -1 : index < 16 ? 1 : 0;
  const row = index % 8;
  const noise = ((index * 37) % 11) / 10;

  if (side) {
    return {
      id: `wing-${index}`,
      start: [side * (1.15 + row * 0.055), 1.55 + row * 0.16, (noise - 0.5) * 0.45],
      mid: [side * (0.38 + noise * 0.15), -0.05 + noise * 0.3, 0.16 + noise * 0.23],
      end: [0, -1.92, (noise - 0.5) * 0.18],
      chaosPosition: [side * (2.25 + noise * 1.4), -0.5 + row * 0.38, 1.35 + noise * 1.8],
      chaosRotation: [noise * Math.PI, (row * 0.42) % Math.PI, side * (0.55 + noise) * Math.PI],
      delay: index * 0.055,
      glossy: index % 4 === 0,
      thickness: 0.018 + (index % 3) * 0.006,
    };
  }

  const binding = index - 16;
  return {
    id: `binding-${index}`,
    start: [-1.0 + binding * 0.06, -0.62 + binding * 0.31, -0.28],
    mid: [0, -0.54 + binding * 0.29, -0.58 - (binding % 2) * 0.08],
    end: [1.0 - binding * 0.06, -0.6 + binding * 0.31, -0.28],
    chaosPosition: [-1.6 + binding * 0.72, 2.2 - binding * 0.58, 1.7 + (binding % 3) * 0.65],
    chaosRotation: [binding * 0.52, binding * 0.75, -binding * 0.42],
    delay: 0.38 + binding * 0.07,
    glossy: binding % 3 === 0,
    thickness: 0.016 + (binding % 2) * 0.006,
  };
});

function StrandMesh({ strand, index, dark }: { strand: Strand; index: number; dark: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const chaosPosition = useMemo(() => new THREE.Vector3(...strand.chaosPosition), [strand]);
  const origin = useMemo(() => new THREE.Vector3(), []);
  const geometry = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...strand.start),
      new THREE.Vector3(...strand.mid),
      new THREE.Vector3(...strand.end),
    );
    return new THREE.TubeGeometry(curve, 44, strand.thickness, 5, false);
  }, [strand]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    const object = mesh.current;
    if (!object) return;
    const time = clock.getElapsedTime();
    const progress = THREE.MathUtils.clamp((time - 0.36 - strand.delay) / 2.15, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    object.position.lerpVectors(chaosPosition, origin, eased);
    object.rotation.set(
      THREE.MathUtils.lerp(strand.chaosRotation[0], 0, eased),
      THREE.MathUtils.lerp(strand.chaosRotation[1], 0, eased),
      THREE.MathUtils.lerp(strand.chaosRotation[2], 0, eased),
    );
    if (progress === 1) object.position.y += Math.sin(time * 0.38 + index * 0.7) * 0.008;
  });

  const color = dark ? (strand.glossy ? "#a8afb7" : "#16191b") : strand.glossy ? "#6d7479" : "#a8adae";
  return (
    <mesh ref={mesh} geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial
        color={color}
        roughness={strand.glossy ? (dark ? 0.24 : 0.34) : dark ? 0.74 : 0.62}
        metalness={strand.glossy ? 0.86 : 0.32}
        clearcoat={strand.glossy ? 0.78 : 0.08}
        clearcoatRoughness={0.16}
      />
    </mesh>
  );
}

function Formation({ dark }: { dark: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.position.y = -0.1 + Math.sin(time * 0.23) * 0.018;
  });

  return <group ref={group}>{strands.map((strand, index) => <StrandMesh key={strand.id} strand={strand} index={index} dark={dark} />)}</group>;
}

function LightRig({ dark }: { dark: boolean }) {
  const keyLight = useRef<THREE.SpotLight>(null);

  useFrame(({ clock, mouse, camera }) => {
    const time = clock.getElapsedTime();
    const arrival = THREE.MathUtils.smoothstep(time, 0.35, 1.8);
    if (keyLight.current) {
      keyLight.current.intensity = arrival * (dark ? 22 : 12);
      keyLight.current.position.x = THREE.MathUtils.lerp(keyLight.current.position.x, mouse.x * 1.6, 0.035);
      keyLight.current.position.y = THREE.MathUtils.lerp(keyLight.current.position.y, mouse.y * 1.35 + 4.6, 0.035);
    }
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.12, 0.018);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.1, 0.018);
    camera.lookAt(0, -0.05, 0);
  });

  return (
    <>
      <spotLight ref={keyLight} position={[0, 4.6, 4]} angle={0.38} penumbra={0.9} color={dark ? "#f2f4f4" : "#ffffff"} castShadow />
      <spotLight position={[-4.8, 1.5, -3.2]} angle={0.58} penumbra={1} intensity={dark ? 9 : 4.5} color={dark ? "#89a1af" : "#a7b4ba"} />
      <spotLight position={[4.6, -1.8, -2.8]} angle={0.62} penumbra={1} intensity={dark ? 5.5 : 3.2} color={dark ? "#575e66" : "#758087"} />
      <ambientLight intensity={dark ? 0.025 : 0.34} />
      <Environment preset="studio" environmentIntensity={dark ? 0.26 : 0.42} />
      <ContactShadows position={[0, -2.3, 0]} opacity={dark ? 0.68 : 0.24} scale={7.2} blur={2.7} far={4} color={dark ? "#000000" : "#5d6467"} />
    </>
  );
}

export function CinematicHero() {
  const reducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";

  return (
    <section className={`cinematic-hero cinematic-hero--${dark ? "dark" : "light"}`} id="top" data-chapter>
      <div className="cinematic-hero__canvas" aria-hidden="true">
        <Canvas
          key={dark ? "dark" : "light"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 8.2], fov: 34 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => { gl.setClearColor(new THREE.Color(dark ? "#080909" : "#eef0ed"), 1); }}
        >
          <LightRig dark={dark} />
          <Formation dark={dark} />
        </Canvas>
      </div>
      <div className="cinematic-hero__vignette" aria-hidden="true" />
      <motion.div
        className="cinematic-hero__identity"
        initial={reducedMotion ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: reducedMotion ? 0 : 1.05, delay: reducedMotion ? 0 : 2.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <p>VLYR</p>
        <span>Digital Growth Studio</span>
        <small>We find the friction.<br />Then we remove it.</small>
      </motion.div>
      <motion.span
        className="cinematic-hero__scroll"
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: reducedMotion ? 0 : 3.35, ease: [0.16, 1, 0.3, 1] }}
      >
        Scroll to inspect
      </motion.span>
    </section>
  );
}
