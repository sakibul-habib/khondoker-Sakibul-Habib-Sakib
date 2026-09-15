import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MapPin, Navigation } from 'lucide-react';

export const EarthLocator3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 320;
    const height = currentMount.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Globe sphere with wireframe & latitude/longitude lines
    const radius = 6.8;
    const globeGeo = new THREE.SphereGeometry(radius, 28, 28);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Inner dark sphere to occlude back side slightly
    const innerGeo = new THREE.SphereGeometry(radius * 0.98, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x030712,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerMesh);

    // Equatorial & Orbital Rings
    const ringGeo = new THREE.TorusGeometry(radius * 1.25, 0.04, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    globeGroup.add(ring);

    // Convert Dhaka Lat/Long (23.8° N, 90.4° E) to 3D Cartesian coordinates
    const lat = 23.8103 * (Math.PI / 180);
    const lon = -90.4125 * (Math.PI / 180); // Adjust orientation for globe alignment

    const pinX = radius * Math.cos(lat) * Math.sin(lon);
    const pinY = radius * Math.sin(lat);
    const pinZ = radius * Math.cos(lat) * Math.cos(lon);

    // Marker Pin Node
    const pinGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const pinMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const pinMesh = new THREE.Mesh(pinGeo, pinMat);
    pinMesh.position.set(pinX, pinY, pinZ);
    globeGroup.add(pinMesh);

    // Pulsing radar rings on marker
    const pulseGeo = new THREE.RingGeometry(0.3, 0.9, 24);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    pulseMesh.position.set(pinX * 1.02, pinY * 1.02, pinZ * 1.02);
    pulseMesh.lookAt(pinX * 2, pinY * 2, pinZ * 2);
    globeGroup.add(pulseMesh);

    // Set initial orientation toward Dhaka
    globeGroup.rotation.y = 1.6;
    globeGroup.rotation.x = 0.2;

    // Drag to rotate
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      globeGroup.rotation.y += dx * 0.008;
      globeGroup.rotation.x += dy * 0.008;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
    let prevTouch = { x: 0, y: 0 };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevTouch.x;
      const dy = e.touches[0].clientY - prevTouch.y;
      globeGroup.rotation.y += dx * 0.008;
      globeGroup.rotation.x += dy * 0.008;
      prevTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        globeGroup.rotation.y += 0.003;
      }

      // Radar pulse ring expansion
      const pulseT = (elapsed * 2) % 1;
      pulseMesh.scale.set(1 + pulseT * 2, 1 + pulseT * 2, 1);
      pulseMat.opacity = Math.max(0, 0.9 - pulseT * 0.9);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      pinGeo.dispose();
      pinMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
    };
  }, []);

  return (
    <div id="earth-3d-locator-widget" className="relative flex flex-col items-center">
      <div
        ref={mountRef}
        className="w-full h-64 sm:h-72 cursor-grab active:cursor-grabbing select-none"
      />

      <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
        <span className="font-mono text-[11px]">23.8103° N, 90.4125° E (Dhaka, Bangladesh)</span>
      </div>
    </div>
  );
};
