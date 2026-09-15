import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BackgroundCanvasProps {
  wireframeMode?: boolean;
  theme?: 'dark' | 'light';
}

/**
 * Professional Executive Background Canvas
 * Designed for high-end enterprise IT & academic leadership portfolios.
 * Features:
 * - Fluid Parametric Horizon Lattice with real-time harmonic wave dynamics
 * - Interactive Cursor Wave Perturbation (subtle magnetic fluid response)
 * - Volumetric Ambient Caustic Orbs (soft, luxurious blurred light fields)
 * - Laminar Micro-Data Particle Streams with gentle twinkling
 * - Horizon Fog Falloff for seamless, borderless integration into light & dark themes
 */
export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({
  wireframeMode = false,
  theme = 'dark',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene, Camera & WebGL Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      54,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 78);

    // Fog: Smoothly dissolves distant geometry into the background theme color
    const fogColor = isDark ? 0x020617 : 0xf8fafc;
    scene.fog = new THREE.FogExp2(fogColor, 0.0075);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 2. Soft Ambient Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x0f172a : 0xf1f5f9,
      isDark ? 1.5 : 2.0
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(
      isDark ? 0x38bdf8 : 0x0284c7,
      isDark ? 1.8 : 1.2
    );
    keyLight.position.set(40, 60, 50);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(
      isDark ? 0x6366f1 : 0x0369a1,
      isDark ? 1.2 : 0.8
    );
    rimLight.position.set(-50, -30, 40);
    scene.add(rimLight);

    // --- 3. Soft Volumetric Bokeh Light Orbs ---
    // Creates an ultra-luxurious, blurred, deep atmospheric glow field without polygon clutter
    const createOrbTexture = (colorStop: string, coreAlpha: number): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        gradient.addColorStop(0, colorStop);
        gradient.addColorStop(0.4, colorStop.replace(/[\d.]+\)$/g, `${coreAlpha * 0.5})`));
        gradient.addColorStop(0.8, colorStop.replace(/[\d.]+\)$/g, `${coreAlpha * 0.15})`));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const cyanTexture = createOrbTexture(
      isDark ? 'rgba(6, 182, 212, 0.45)' : 'rgba(2, 132, 199, 0.22)',
      isDark ? 0.45 : 0.22
    );
    const indigoTexture = createOrbTexture(
      isDark ? 'rgba(99, 102, 241, 0.35)' : 'rgba(59, 130, 246, 0.18)',
      isDark ? 0.35 : 0.18
    );
    const emeraldTexture = createOrbTexture(
      isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(14, 165, 233, 0.15)',
      isDark ? 0.25 : 0.15
    );

    const orbGeo = new THREE.PlaneGeometry(110, 110);

    const orb1Mat = new THREE.MeshBasicMaterial({
      map: cyanTexture,
      transparent: true,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const orb1 = new THREE.Mesh(orbGeo, orb1Mat);
    orb1.position.set(-35, 18, -35);
    scene.add(orb1);

    const orb2Mat = new THREE.MeshBasicMaterial({
      map: indigoTexture,
      transparent: true,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const orb2 = new THREE.Mesh(orbGeo, orb2Mat);
    orb2.position.set(45, -12, -45);
    scene.add(orb2);

    const orb3Mat = new THREE.MeshBasicMaterial({
      map: emeraldTexture,
      transparent: true,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });
    const orb3 = new THREE.Mesh(orbGeo, orb3Mat);
    orb3.position.set(5, -28, -25);
    scene.add(orb3);

    // --- 4. The Executive Digital Horizon Lattice (Smooth Parametric Surface) ---
    const gridCols = 54;
    const gridRows = 54;
    const gridWidth = 280;
    const gridHeight = 280;
    const terrainGeo = new THREE.PlaneGeometry(gridWidth, gridHeight, gridCols, gridRows);
    terrainGeo.rotateX(-Math.PI / 2.38);
    terrainGeo.translate(0, -32, -18);

    const terrainMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0284c7 : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: wireframeMode ? (isDark ? 0.42 : 0.32) : (isDark ? 0.16 : 0.08),
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    scene.add(terrainMesh);

    // Subtle nodal junction lights at vertex intersections
    const terrainPointsMat = new THREE.PointsMaterial({
      size: isDark ? 1.4 : 1.2,
      color: isDark ? 0x38bdf8 : 0x0369a1,
      transparent: true,
      opacity: wireframeMode ? (isDark ? 0.55 : 0.4) : (isDark ? 0.28 : 0.15),
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const terrainPoints = new THREE.Points(terrainGeo, terrainPointsMat);
    scene.add(terrainPoints);

    // Cache baseline coordinates for harmonic sine animation
    const posAttr = terrainGeo.attributes.position;
    const basePositionsY = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      basePositionsY[i] = posAttr.getY(i);
    }

    // --- 5. Laminar Micro-Data Particle Streams (High-Precision Stardust) ---
    const streamParticleCount = 280;
    const streamGeo = new THREE.BufferGeometry();
    const streamPositions = new Float32Array(streamParticleCount * 3);
    const streamColors = new Float32Array(streamParticleCount * 3);
    const streamSpeeds: number[] = [];

    const colCyan = new THREE.Color(0x06b6d4);
    const colBlue = new THREE.Color(0x3b82f6);
    const colSlate = new THREE.Color(0x94a3b8);
    const colEmerald = new THREE.Color(0x10b981);

    for (let i = 0; i < streamParticleCount; i++) {
      streamPositions[i * 3] = (Math.random() - 0.5) * 200;
      streamPositions[i * 3 + 1] = (Math.random() - 0.5) * 140;
      streamPositions[i * 3 + 2] = (Math.random() - 0.5) * 100 - 15;

      const pick = Math.random();
      const col = pick < 0.45 ? colCyan : pick < 0.75 ? colBlue : pick < 0.9 ? colSlate : colEmerald;
      streamColors[i * 3] = col.r;
      streamColors[i * 3 + 1] = col.g;
      streamColors[i * 3 + 2] = col.b;

      // Laminar horizontal drift speed
      streamSpeeds.push(0.04 + Math.random() * 0.08);
    }

    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));
    streamGeo.setAttribute('color', new THREE.BufferAttribute(streamColors, 3));

    const streamMat = new THREE.PointsMaterial({
      size: isDark ? 1.4 : 1.2,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.6 : 0.35,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const streamParticles = new THREE.Points(streamGeo, streamMat);
    scene.add(streamParticles);

    // --- 6. Smooth Mouse Parallax & Cursor Magnetic Tracking ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Projected mouse coordinate for fluid ripple
    let worldMouseX = 0;
    let worldMouseZ = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseX = normX * 12;
      mouseY = normY * 12;

      worldMouseX = normX * 60;
      worldMouseZ = normY * 40;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll interpolation
    let scrollY = 0;
    let targetScrollY = 0;
    const handleScroll = () => {
      targetScrollY = window.scrollY * 0.022;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Window resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- 7. Master Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Fluid inertial camera tracking
      targetX += (mouseX - targetX) * 0.035;
      targetY += (mouseY - targetY) * 0.035;
      scrollY += (targetScrollY - scrollY) * 0.05;

      camera.position.x = targetX * 0.8;
      camera.position.y = -targetY * 0.6 - scrollY * 0.18;
      camera.lookAt(targetX * 0.15, -scrollY * 0.18, 0);

      // 1. Fluid harmonic wave animation on the horizon lattice
      const pAttr = terrainMesh.geometry.attributes.position;
      for (let i = 0; i < pAttr.count; i++) {
        const vx = pAttr.getX(i);
        const vz = pAttr.getZ(i);

        // Smooth composite harmonic wave (calm, meditative, enterprise fluid dynamics)
        const wave =
          Math.sin(vx * 0.032 + elapsed * 0.4) * Math.cos(vz * 0.032 + elapsed * 0.3) * 4.2 +
          Math.sin((vx + vz) * 0.02 + elapsed * 0.22) * 2.2;

        // Interactive cursor ripple: subtle tactile perturbation under the cursor
        const dx = vx - worldMouseX;
        const dz = vz - worldMouseZ;
        const distSq = dx * dx + dz * dz;
        const cursorInfluence = Math.exp(-distSq / 700) * 3.5;

        pAttr.setY(i, basePositionsY[i] + wave + cursorInfluence);
      }
      pAttr.needsUpdate = true;

      // 2. Slow breathing and drifting of Volumetric Ambient Orbs
      orb1.position.x = -35 + Math.sin(elapsed * 0.3) * 6;
      orb1.position.y = 18 + Math.cos(elapsed * 0.25) * 4;
      orb1.scale.setScalar(1.0 + Math.sin(elapsed * 0.4) * 0.08);

      orb2.position.x = 45 + Math.cos(elapsed * 0.28) * 6;
      orb2.position.y = -12 + Math.sin(elapsed * 0.32) * 5;
      orb2.scale.setScalar(1.0 + Math.cos(elapsed * 0.35) * 0.08);

      orb3.position.x = 5 + Math.sin(elapsed * 0.2) * 8;
      orb3.position.y = -28 + Math.cos(elapsed * 0.22) * 4;

      // 3. Laminar horizontal drift of micro-data particle streams
      const sPositions = streamParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < streamParticleCount; i++) {
        const idx = i * 3;
        sPositions[idx] += streamSpeeds[i];
        // Wrap gracefully across boundary
        if (sPositions[idx] > 100) {
          sPositions[idx] = -100;
        }
        // Subtle vertical buoyancy
        sPositions[idx + 1] += Math.sin(elapsed + i) * 0.015;
      }
      streamParticles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources on unmount or theme switch
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      terrainPointsMat.dispose();
      orbGeo.dispose();
      orb1Mat.dispose();
      orb2Mat.dispose();
      orb3Mat.dispose();
      cyanTexture.dispose();
      indigoTexture.dispose();
      emeraldTexture.dispose();
      streamGeo.dispose();
      streamMat.dispose();
    };
  }, [wireframeMode, theme]);

  return (
    <div
      ref={containerRef}
      id="three-background-canvas"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-95 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
