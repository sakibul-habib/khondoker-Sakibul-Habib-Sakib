import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Compass } from 'lucide-react';

interface HeroOrb3DProps {
  colorScheme?: 'cyan' | 'emerald' | 'amber';
}

export const HeroOrb3D: React.FC<HeroOrb3DProps> = ({ colorScheme = 'cyan' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activePalette, setActivePalette] = useState<'cyan' | 'emerald' | 'amber'>(colorScheme);
  const [autoRotate, setAutoRotate] = useState(true);

  const colors = {
    cyan: { primary: 0x06b6d4, secondary: 0x3b82f6, core: 0x67e8f9 },
    emerald: { primary: 0x10b981, secondary: 0x14b8a6, core: 0x6ee7b7 },
    amber: { primary: 0xf59e0b, secondary: 0xef4444, core: 0xfde047 }
  }[activePalette];

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 360;
    const height = currentMount.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Group for the entire 3D object
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Inner pulsing crystal sphere
    const coreGeo = new THREE.DodecahedronGeometry(3.6, 1);
    const coreMat = new THREE.MeshPhongMaterial({
      color: colors.core,
      emissive: colors.primary,
      emissiveIntensity: 0.6,
      shininess: 90,
      flatShading: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. Outer Icosahedron Wireframe Cage
    const cageGeo = new THREE.IcosahedronGeometry(5.8, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: colors.primary,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    mainGroup.add(cageMesh);

    // 3. Dual Gimbal Orbit Rings
    const ringGeo1 = new THREE.TorusGeometry(7.2, 0.08, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: colors.secondary,
      transparent: true,
      opacity: 0.7,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(8.2, 0.08, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: colors.primary,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    mainGroup.add(ringMesh2);

    // 4. Orbital Satellites / Quantum nodes
    const satelliteGroup = new THREE.Group();
    const satGeo = new THREE.SphereGeometry(0.3, 12, 12);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const satCount = 6;
    for (let i = 0; i < satCount; i++) {
      const angle = (i / satCount) * Math.PI * 2;
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.position.set(Math.cos(angle) * 7.2, Math.sin(angle) * 7.2, 0);
      satelliteGroup.add(sat);
    }
    ringMesh1.add(satelliteGroup);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(colors.primary, 3, 50);
    pointLight.position.set(10, 15, 15);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(colors.secondary, 2, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Interactive Dragging / Rotation State
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0.005, y: 0.01 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      mainGroup.rotation.y += deltaX * 0.01;
      mainGroup.rotation.x += deltaY * 0.01;

      rotationVelocity = {
        x: deltaY * 0.002,
        y: deltaX * 0.002,
      };

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    let touchStart = { x: 0, y: 0 };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - touchStart.x;
      const deltaY = e.touches[0].clientY - touchStart.y;
      mainGroup.rotation.y += deltaX * 0.01;
      mainGroup.rotation.x += deltaY * 0.01;
      touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging && autoRotate) {
        const speedMultiplier = isHovered ? 2.0 : 1.0;
        mainGroup.rotation.y += (rotationVelocity.y + 0.008) * speedMultiplier;
        mainGroup.rotation.x += (rotationVelocity.x + 0.004) * speedMultiplier;
        
        // Dampen manual throw velocity
        rotationVelocity.x *= 0.95;
        rotationVelocity.y *= 0.95;
      }

      // Individual sub-element spin
      cageMesh.rotation.y = -elapsed * 0.4;
      ringMesh1.rotation.z = elapsed * 0.5;
      ringMesh2.rotation.x = -elapsed * 0.3;

      // Pulse core scale
      const scale = 1 + Math.sin(elapsed * 2.5) * 0.06;
      coreMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      satMat.dispose();
    };
  }, [activePalette, isHovered, autoRotate]);

  return (
    <div
      id="hero-3d-interactive-container"
      className="relative w-full h-80 sm:h-96 md:h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating 3D Control Badges */}
      <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-xs shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-slate-300 font-mono text-[11px]">3D Interactive Core</span>
      </div>

      <div className="absolute bottom-2 inset-x-2 sm:inset-x-auto sm:right-2 flex items-center justify-between sm:justify-end gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs shadow-xl">
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Drag to rotate 360°</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            id="toggle-rotation-btn"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              autoRotate ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
            }`}
            title="Toggle Auto Spin"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-700 mx-0.5" />

          {/* Palette selector */}
          <button
            type="button"
            onClick={() => setActivePalette('cyan')}
            className={`w-4 h-4 rounded-full bg-cyan-400 ring-2 transition-all ${
              activePalette === 'cyan' ? 'ring-white scale-110' : 'ring-transparent opacity-60'
            }`}
            title="Cyan Mode"
          />
          <button
            type="button"
            onClick={() => setActivePalette('emerald')}
            className={`w-4 h-4 rounded-full bg-emerald-400 ring-2 transition-all ${
              activePalette === 'emerald' ? 'ring-white scale-110' : 'ring-transparent opacity-60'
            }`}
            title="Emerald Mode"
          />
          <button
            type="button"
            onClick={() => setActivePalette('amber')}
            className={`w-4 h-4 rounded-full bg-amber-400 ring-2 transition-all ${
              activePalette === 'amber' ? 'ring-white scale-110' : 'ring-transparent opacity-60'
            }`}
            title="Amber Mode"
          />
        </div>
      </div>
    </div>
  );
};
