"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AmbientParticlesProps {
  scrollProgress: number;
}

export default function AmbientParticles({ scrollProgress }: AmbientParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const particleCount = isMobile ? 80 : 200;

  // Generate random starting positions — biased to right side of screen
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // X: biased right (0 to 6, so right half of view)
      pos[i * 3] = Math.random() * 8 - 1;
      // Y: spread vertically
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      // Z: slight depth variation
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [particleCount]);

  // Random speeds for each particle
  const speeds = useMemo(() => {
    const s = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      s[i] = 0.2 + Math.random() * 0.8;
    }
    return s;
  }, [particleCount]);

  // Random sizes
  const sizes = useMemo(() => {
    const s = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      s[i] = 0.3 + Math.random() * 1.0;
    }
    return s;
  }, [particleCount]);

  const shaderData = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uColor1: { value: new THREE.Color("#ff4d00") },
        uColor2: { value: new THREE.Color("#ff8c42") },
        uColor3: { value: new THREE.Color("#0066ff") },
      },
      vertexShader: `
        attribute float aSpeed;
        attribute float aSize;
        uniform float uTime;
        uniform float uScroll;
        varying float vAlpha;
        varying float vColorMix;

        void main() {
          vec3 pos = position;

          // Float upward slowly, each particle at its own speed
          float drift = mod(uTime * aSpeed * 0.3 + position.y, 14.0) - 7.0;
          pos.y = drift;

          // Gentle horizontal sway
          pos.x += sin(uTime * 0.5 + position.x * 0.5) * 0.3;
          pos.x += sin(uTime * 0.2 + position.y * 0.3) * 0.5;

          // Slight z drift
          pos.z += sin(uTime * 0.3 + position.z) * 0.2;

          // Fade based on scroll — more visible in dark sections
          float darkSectionFade = 1.0 - smoothstep(0.1, 0.3, uScroll) * 0.6;
          // Bring back in dark sections at bottom
          darkSectionFade += smoothstep(0.6, 0.8, uScroll) * 0.4;

          vAlpha = (0.15 + aSize * 0.2) * darkSectionFade;
          vColorMix = sin(position.x * 0.5 + uTime * 0.3) * 0.5 + 0.5;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying float vAlpha;
        varying float vColorMix;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          // Soft glow falloff
          float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;

          // Mix between orange tones and occasional blue
          vec3 warmColor = mix(uColor1, uColor2, vColorMix);
          vec3 color = mix(warmColor, uColor3, step(0.85, vColorMix) * 0.6);

          gl_FragColor = vec4(color, alpha);
        }
      `,
    }),
    []
  );

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, speeds, sizes]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uScroll.value = scrollProgress;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        {...shaderData}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
