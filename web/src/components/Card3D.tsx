"use client";
/* Three.js is imperative by design: the canvas element and the scene graph are mutated every frame. */
/* eslint-disable react-hooks/immutability */

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const W = 3.37;
const H = 2.125;
const R = 0.16;

function roundedShape() {
  const s = new THREE.Shape();
  const x = -W / 2;
  const y = -H / 2;
  s.moveTo(x + R, y);
  s.lineTo(x + W - R, y);
  s.quadraticCurveTo(x + W, y, x + W, y + R);
  s.lineTo(x + W, y + H - R);
  s.quadraticCurveTo(x + W, y + H, x + W - R, y + H);
  s.lineTo(x + R, y + H);
  s.quadraticCurveTo(x, y + H, x, y + H - R);
  s.lineTo(x, y + R);
  s.quadraticCurveTo(x, y, x + R, y);
  return s;
}

/** Card faces are painted on a 2D canvas: the design is ours (concept), not a reproduction of a real DBBL card. */
function paintFront() {
  const c = document.createElement("canvas");
  c.width = 1348;
  c.height = 850;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, c.width, c.height);
  grad.addColorStop(0, "#3a40a8");
  grad.addColorStop(0.55, "#252a86");
  grad.addColorStop(1, "#0e1150");
  g.fillStyle = grad;
  g.fillRect(0, 0, c.width, c.height);
  // concentric rings: the network
  g.strokeStyle = "rgba(255,255,255,0.09)";
  g.lineWidth = 26;
  for (const r of [260, 420, 580]) {
    g.beginPath();
    g.arc(1180, 120, r, 0, Math.PI * 2);
    g.stroke();
  }
  g.fillStyle = "#c8f169";
  g.beginPath();
  g.arc(1180, 120, 46, 0, Math.PI * 2);
  g.fill();
  // chip
  const chip = g.createLinearGradient(110, 300, 290, 440);
  chip.addColorStop(0, "#f3dc8a");
  chip.addColorStop(1, "#c9a443");
  g.fillStyle = chip;
  g.beginPath();
  g.roundRect(110, 310, 170, 128, 22);
  g.fill();
  g.strokeStyle = "rgba(90,70,20,0.45)";
  g.lineWidth = 4;
  g.beginPath();
  g.moveTo(195, 310);
  g.lineTo(195, 438);
  g.moveTo(110, 374);
  g.lineTo(280, 374);
  g.stroke();
  // contactless
  g.strokeStyle = "rgba(255,255,255,0.8)";
  g.lineWidth = 9;
  g.lineCap = "round";
  for (const r of [26, 46, 66]) {
    g.beginPath();
    g.arc(320, 374, r, -0.75, 0.75);
    g.stroke();
  }
  g.fillStyle = "#ffffff";
  g.font = "700 64px 'Bricolage Grotesque', system-ui, sans-serif";
  g.fillText("Dutch-Bangla Bank", 110, 150);
  g.font = "600 40px 'Hanken Grotesk', system-ui, sans-serif";
  g.fillStyle = "rgba(255,255,255,0.7)";
  g.fillText("NEXUS DEBIT", 110, 210);
  g.font = "600 66px 'Hanken Grotesk', ui-monospace, monospace";
  g.fillStyle = "#ffffff";
  g.fillText("5412  ••••  ••••  7730", 110, 620);
  g.font = "600 34px 'Hanken Grotesk', system-ui, sans-serif";
  g.fillStyle = "rgba(255,255,255,0.75)";
  g.fillText("CONCEPT CARD", 110, 740);
  // brand dot cluster
  g.fillStyle = "#00904a";
  g.beginPath();
  g.arc(1150, 720, 54, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#e31b23";
  g.globalAlpha = 0.95;
  g.beginPath();
  g.arc(1220, 720, 54, 0, Math.PI * 2);
  g.fill();
  g.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function paintBack() {
  const c = document.createElement("canvas");
  c.width = 1348;
  c.height = 850;
  const g = c.getContext("2d")!;
  g.fillStyle = "#161a63";
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = "#090b3a";
  g.fillRect(0, 90, c.width, 150);
  g.fillStyle = "#e7e8f7";
  g.fillRect(90, 320, 820, 110);
  g.fillStyle = "#0e1150";
  g.font = "italic 600 44px 'Hanken Grotesk', system-ui, sans-serif";
  g.fillText("•••", 940, 395);
  g.fillStyle = "rgba(255,255,255,0.7)";
  g.font = "500 34px 'Hanken Grotesk', system-ui, sans-serif";
  g.fillText("24/7 Call Centre 16216  ·  +8809666716216", 90, 560);
  g.fillText("EMV chip secured", 90, 620);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function CardMesh({ reduce }: { reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const drag = useRef({ active: false, x: 0, y: 0, vx: 0, vy: 0, rotY: -0.45, rotX: 0.12 });
  const { gl } = useThree();

  const { body, front, back, frontMat, backMat } = useMemo(() => {
    const shape = roundedShape();
    const body = new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.012, bevelSegments: 3, curveSegments: 16 });
    body.translate(0, 0, -0.015);
    const face = new THREE.ShapeGeometry(shape, 16);
    // remap UVs from shape units to 0..1
    const uv = face.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / W + 0.5, uv.getY(i) / H + 0.5);
    const front = face;
    const back = face.clone();
    const frontMat = new THREE.MeshPhysicalMaterial({ map: paintFront(), roughness: 0.38, metalness: 0.15, clearcoat: 1, clearcoatRoughness: 0.25 });
    const backMat = new THREE.MeshPhysicalMaterial({ map: paintBack(), roughness: 0.5, metalness: 0.1, clearcoat: 0.6 });
    return { body, front, back, frontMat, backMat };
  }, []);

  useEffect(() => {
    const el = gl.domElement;
    const s = drag.current;
    const down = (e: PointerEvent) => {
      s.active = true;
      s.x = e.clientX;
      s.y = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!s.active) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      s.x = e.clientX;
      s.y = e.clientY;
      s.vy = dx * 0.012;
      s.vx = dy * 0.006;
      s.rotY += s.vy;
      s.rotX = THREE.MathUtils.clamp(s.rotX + s.vx, -0.6, 0.6);
    };
    const up = (e: PointerEvent) => {
      s.active = false;
      el.style.cursor = "grab";
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };
    el.style.cursor = "grab";
    el.style.touchAction = "pan-y";
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useFrame((state, dt) => {
    const g = group.current;
    const s = drag.current;
    if (!g) return;
    if (!s.active) {
      // inertia, then ease back toward a gentle idle sway
      s.rotY += s.vy;
      s.vy *= 0.94;
      s.vx *= 0.9;
      const t = state.clock.elapsedTime;
      const idleY = reduce ? -0.45 : -0.45 + Math.sin(t * 0.6) * 0.18;
      const nearestTurn = Math.round((s.rotY - idleY) / (Math.PI * 2)) * Math.PI * 2 + idleY;
      if (Math.abs(s.vy) < 0.002) s.rotY = THREE.MathUtils.damp(s.rotY, nearestTurn, 2.2, dt);
      s.rotX = THREE.MathUtils.damp(s.rotX, reduce ? 0.12 : 0.12 + Math.sin(t * 0.8) * 0.05, 2.5, dt);
    }
    g.rotation.y = s.rotY;
    g.rotation.x = s.rotX;
    if (!reduce) g.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.05;
  });

  return (
    <group ref={group}>
      <mesh geometry={body}>
        <meshStandardMaterial color="#0e1150" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh geometry={front} material={frontMat} position={[0, 0, 0.0265]} />
      <mesh geometry={back} material={backMat} position={[0, 0, -0.0265]} rotation={[0, Math.PI, 0]} scale={[1, 1, 1]} />
    </group>
  );
}

export default function Card3D({ reduce }: { reduce: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="always"
      aria-hidden
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <directionalLight position={[-4, -2, 3]} intensity={0.8} color="#c8f169" />
      <pointLight position={[0, 0, 3]} intensity={6} distance={8} color="#ffffff" />
      <CardMesh reduce={reduce} />
    </Canvas>
  );
}
