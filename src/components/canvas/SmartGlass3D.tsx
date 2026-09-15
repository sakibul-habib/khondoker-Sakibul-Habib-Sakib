import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Radio, Volume2, Cpu, Rotate3d, ZoomIn, ZoomOut } from 'lucide-react';

interface SensorCallout {
  id: string;
  name: string;
  detail: string;
  specs: string;
  icon: any;
}

export const SmartGlass3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedSensor, setSelectedSensor] = useState<string>('ultrasonic');
  const [radarActive, setRadarActive] = useState(true);

  const sensors: Record<string, SensorCallout> = {
    ultrasonic: {
      id: 'ultrasonic',
      name: 'Twin Ultrasonic Radar Array',
      detail: 'Frontal dual ultrasonic transducer modules providing high-frequency 40kHz sonar ranging for rapid obstacle detection.',
      specs: 'Range: 2cm - 400cm | Angle: 15° Field of View | Response: < 15ms',
      icon: Radio,
    },
    camera: {
      id: 'camera',
      name: 'Optical Vision & Object Recognition Unit',
      detail: 'Centrally mounted miniature optical lens capturing environmental vectors and overhead hazard clearances.',
      specs: 'Resolution: Wide FOV Micro-Sensor | Real-time Edge Processing',
      icon: Eye,
    },
    audio: {
      id: 'audio',
      name: 'Bone-Conduction Audio & Haptics',
      detail: 'Bypasses eardrums to safely transmit acoustic directional warnings without blocking ambient natural sounds.',
      specs: 'Dynamic Frequency Modulation (Higher pitch = closer obstacle)',
      icon: Volume2,
    },
    mcu: {
      id: 'mcu',
      name: 'Embedded Microcontroller & Power Unit',
      detail: 'Low-power real-time computing core executing Kalman filtering algorithms for noise-free distance calculations.',
      specs: 'Operating Voltage: 3.7V Li-ion | Latency: Real-time deterministic',
      icon: Cpu,
    },
  };

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 400;
    const height = currentMount.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 2, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Root model group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Materials
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.25,
      metalness: 0.85,
    });

    const lensMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      metalness: 0.7,
      roughness: 0.3,
    });

    const sensorMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.9,
      roughness: 0.2,
    });

    // 1. Left Rim & Right Rim (Torus / Rounded Boxes)
    const rimGeo = new THREE.TorusGeometry(1.6, 0.16, 16, 48);
    const leftRim = new THREE.Mesh(rimGeo, frameMaterial);
    leftRim.position.x = -2.1;
    modelGroup.add(leftRim);

    const rightRim = new THREE.Mesh(rimGeo, frameMaterial);
    rightRim.position.x = 2.1;
    modelGroup.add(rightRim);

    // 2. Lenses (Thin cylinders)
    const lensGeo = new THREE.CylinderGeometry(1.55, 1.55, 0.05, 32);
    lensGeo.rotateX(Math.PI / 2);

    const leftLens = new THREE.Mesh(lensGeo, lensMaterial);
    leftLens.position.x = -2.1;
    modelGroup.add(leftLens);

    const rightLens = new THREE.Mesh(lensGeo, lensMaterial);
    rightLens.position.x = 2.1;
    modelGroup.add(rightLens);

    // 3. Nose Bridge
    const bridgeGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 16);
    bridgeGeo.rotateZ(Math.PI / 2);
    const bridge = new THREE.Mesh(bridgeGeo, frameMaterial);
    bridge.position.set(0, 0.4, 0);
    modelGroup.add(bridge);

    // 4. Temple Arms (Sides)
    const armGeo = new THREE.BoxGeometry(0.18, 0.25, 4.8);
    const leftArm = new THREE.Mesh(armGeo, frameMaterial);
    leftArm.position.set(-3.7, 0.4, -2.3);
    modelGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, frameMaterial);
    rightArm.position.set(3.7, 0.4, -2.3);
    modelGroup.add(rightArm);

    // 5. Ultrasonic Sensor Barrels (Front of rims)
    const ultrasonicGroup = new THREE.Group();
    const barrelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.4, 16);
    barrelGeo.rotateX(Math.PI / 2);

    const u1 = new THREE.Mesh(barrelGeo, sensorMetalMaterial);
    u1.position.set(-3.2, 0.8, 0.4);
    ultrasonicGroup.add(u1);

    const u2 = new THREE.Mesh(barrelGeo, sensorMetalMaterial);
    u2.position.set(3.2, 0.8, 0.4);
    ultrasonicGroup.add(u2);
    modelGroup.add(ultrasonicGroup);

    // 6. Camera Lens Pod (Center Above Bridge)
    const cameraPodGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.3, 16);
    cameraPodGeo.rotateX(Math.PI / 2);
    const cameraPod = new THREE.Mesh(cameraPodGeo, accentMaterial);
    cameraPod.position.set(0, 1.1, 0.25);
    modelGroup.add(cameraPod);

    // 7. Bone conduction transducer (Left Arm Tip)
    const audioPodGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const audioPod = new THREE.Mesh(audioPodGeo, accentMaterial);
    audioPod.position.set(-3.7, 0.3, -4.6);
    modelGroup.add(audioPod);

    // 8. Microcontroller / Battery Housing (Right Arm)
    const mcuPodGeo = new THREE.BoxGeometry(0.4, 0.5, 1.6);
    const mcuPod = new THREE.Mesh(mcuPodGeo, accentMaterial);
    mcuPod.position.set(3.7, 0.3, -2.0);
    modelGroup.add(mcuPod);

    // 9. Radar Waves / Sonar Arc (Conical translucent wave)
    const radarArcs: THREE.Mesh[] = [];
    const radarCount = 3;
    for (let i = 0; i < radarCount; i++) {
      const arcGeo = new THREE.TorusGeometry(2 + i * 1.5, 0.04, 8, 32, Math.PI / 2);
      arcGeo.rotateX(Math.PI / 2);
      arcGeo.rotateZ(Math.PI * 0.75);
      const arcMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.7 - i * 0.2,
      });
      const arcMesh = new THREE.Mesh(arcGeo, arcMat);
      arcMesh.position.set(0, 0, 1.5 + i * 1.4);
      modelGroup.add(arcMesh);
      radarArcs.push(arcMesh);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2);
    dirLight1.position.set(5, 10, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0284c7, 1.5);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    // Initial slight angle
    modelGroup.rotation.y = -0.3;
    modelGroup.rotation.x = 0.15;

    // Interaction Dragging
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouse.x;
      const deltaY = e.clientY - prevMouse.y;
      modelGroup.rotation.y += deltaX * 0.012;
      modelGroup.rotation.x += deltaY * 0.012;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch events for mobile
    let touchPrev = { x: 0, y: 0 };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        touchPrev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - touchPrev.x;
      const deltaY = e.touches[0].clientY - touchPrev.y;
      modelGroup.rotation.y += deltaX * 0.012;
      modelGroup.rotation.x += deltaY * 0.012;
      touchPrev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
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
        modelGroup.rotation.y += 0.005;
        modelGroup.position.y = Math.sin(elapsed * 1.5) * 0.15;
      }

      // Radar pulses
      if (radarActive) {
        radarArcs.forEach((arc, i) => {
          const t = (elapsed * 1.8 + i * 0.6) % 3;
          arc.position.z = 1.0 + t * 2.0;
          arc.scale.set(1 + t * 0.4, 1 + t * 0.4, 1);
          (arc.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.8 - t * 0.3);
        });
      }

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
    };
  }, [radarActive]);

  const activeSensorData = sensors[selectedSensor];
  const SensorIcon = activeSensorData.icon;

  return (
    <div id="smart-glass-3d-interactive-card" className="bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-cyan-500/30 rounded-2xl p-4 md:p-6 shadow-xl dark:shadow-2xl backdrop-blur-md relative overflow-hidden">
      {/* Header telemetry badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-semibold tracking-wider text-cyan-700 dark:text-cyan-400 uppercase">
            3D Assistive Prototype: Virtual CAD R&D
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            id="toggle-radar-btn"
            onClick={() => setRadarActive(!radarActive)}
            className={`text-xs px-2.5 py-1 rounded-md border font-mono transition-all ${
              radarActive
                ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/50'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
            }`}
          >
            Radar: {radarActive ? 'ACTIVE' : 'MUTED'}
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        ref={mountRef}
        className="w-full h-72 sm:h-80 md:h-96 relative cursor-grab active:cursor-grabbing select-none"
      />

      {/* Interactive Sensor Selector Tabs */}
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.values(sensors).map((s) => {
          const Icon = s.icon;
          const isSelected = selectedSensor === s.id;
          return (
            <button
              key={s.id}
              type="button"
              id={`sensor-tab-${s.id}`}
              onClick={() => setSelectedSensor(s.id)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                isSelected
                  ? 'bg-cyan-100 dark:bg-cyan-950/60 border-cyan-500 dark:border-cyan-400 text-cyan-900 dark:text-cyan-200 shadow-md shadow-cyan-500/10 dark:shadow-cyan-950/50'
                  : 'bg-slate-100/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                <span className="text-xs font-semibold truncate">{s.name.split(' ')[0]}</span>
              </div>
              <span className="text-[10px] opacity-75 font-mono">Inspect node</span>
            </button>
          );
        })}
      </div>

      {/* Sensor Detail Inspection Card */}
      <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 mt-0.5">
          <SensorIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">{activeSensorData.name}</h4>
            <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 shrink-0">Subsystem Verified</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{activeSensorData.detail}</p>
          <div className="mt-2 text-[11px] font-mono text-cyan-800 dark:text-cyan-300/80 bg-cyan-100/70 dark:bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-300 dark:border-cyan-900/40">
            {activeSensorData.specs}
          </div>
        </div>
      </div>
    </div>
  );
};
