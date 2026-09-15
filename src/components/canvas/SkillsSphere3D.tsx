import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Code2, Layers, Cpu } from 'lucide-react';

interface SkillNode {
  name: string;
  category: string;
  level: number;
  tags: string;
}

const SKILLS_LIST: SkillNode[] = [
  { name: "Laravel", category: "Backend", level: 95, tags: "MVC, REST, Eloquent" },
  { name: "Django", category: "Backend", level: 90, tags: "Python, ORM, REST API" },
  { name: "Python", category: "Language", level: 92, tags: "OOP, Scripts, Web" },
  { name: "PHP", category: "Language", level: 95, tags: "PHP 8, Architecture" },
  { name: "MySQL", category: "Database", level: 92, tags: "Indexing, SQL, Relational" },
  { name: "Flutter", category: "Mobile", level: 85, tags: "Dart, Cross-platform" },
  { name: "C & C++", category: "Language", level: 88, tags: "Algorithms, Systems" },
  { name: "Java", category: "Language", level: 85, tags: "OOP, Enterprise" },
  { name: "C# (.NET)", category: "Language", level: 82, tags: "Desktop, Logic" },
  { name: "WordPress", category: "CMS", level: 88, tags: "Theme & Plugin Dev" },
  { name: "Digital Marketing", category: "Growth", level: 92, tags: "Pixel Setup, CAPI, GTM" },
  { name: "SEO", category: "Growth", level: 90, tags: "Technical SEO, Schema" },
  { name: "SDLC & Agile", category: "Management", level: 94, tags: "Scrum, Leadership" },
  { name: "Data Mgmt", category: "Database", level: 90, tags: "Backups, Integrity" },
  { name: "POS & Inventory", category: "Enterprise", level: 95, tags: "Retail, Barcodes" },
  { name: "HR Systems", category: "Enterprise", level: 95, tags: "Payroll, Attendance" }
];

export const SkillsSphere3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<SkillNode>(SKILLS_LIST[0]);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 360;
    const height = currentMount.clientHeight || 340;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 26;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Wireframe boundary sphere
    const wireGeo = new THREE.SphereGeometry(9.2, 16, 16);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    sphereGroup.add(wireSphere);

    // Inner glowing core
    const coreGeo = new THREE.IcosahedronGeometry(3.5, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sphereGroup.add(coreMesh);

    // Create Canvas Text Sprites distributed evenly on a Fibonacci sphere
    const count = SKILLS_LIST.length;
    const spriteObjects: { sprite: THREE.Sprite; skill: SkillNode; initialPos: THREE.Vector3 }[] = [];

    const createTextTexture = (text: string, category: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 80;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Pill background
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        const r = 24;
        ctx.roundRect(6, 6, 244, 68, r);
        ctx.fill();
        ctx.stroke();

        // Skill text
        ctx.font = 'bold 26px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 128, 40);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    const radius = 9.8;

    SKILLS_LIST.forEach((skill, i) => {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const texture = createTextTexture(skill.name, skill.category);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(x * radius, y * radius, z * radius);
      sprite.scale.set(4.2, 1.3, 1);

      sphereGroup.add(sprite);
      spriteObjects.push({
        sprite,
        skill,
        initialPos: new THREE.Vector3(x * radius, y * radius, z * radius),
      });
    });

    // Ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    // Mouse drag interaction
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotSpeed = { x: 0.003, y: 0.005 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouse.x;
      const deltaY = e.clientY - prevMouse.y;
      sphereGroup.rotation.y += deltaX * 0.008;
      sphereGroup.rotation.x += deltaY * 0.008;
      rotSpeed = { x: deltaY * 0.002, y: deltaX * 0.002 };
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
      const deltaX = e.touches[0].clientX - prevTouch.x;
      const deltaY = e.touches[0].clientY - prevTouch.y;
      sphereGroup.rotation.y += deltaX * 0.008;
      sphereGroup.rotation.x += deltaY * 0.008;
      prevTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Raycasting to select skill node
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleNodeClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(spriteObjects.map(s => s.sprite));

      if (intersects.length > 0) {
        const found = spriteObjects.find(s => s.sprite === intersects[0].object);
        if (found) {
          setActiveSkill(found.skill);
        }
      }
    };

    dom.addEventListener('click', handleNodeClick);

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

    // Animation
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging && isRotating) {
        sphereGroup.rotation.y += rotSpeed.y;
        sphereGroup.rotation.x += rotSpeed.x;
        rotSpeed.x *= 0.98;
        rotSpeed.y = rotSpeed.y * 0.98 + 0.004 * 0.02;
      }

      coreMesh.rotation.x = elapsed * 0.3;
      coreMesh.rotation.y = elapsed * 0.5;

      // Adjust opacity based on z-depth to give true 3D perspective
      spriteObjects.forEach(({ sprite }) => {
        const worldPos = new THREE.Vector3();
        sprite.getWorldPosition(worldPos);
        const zDist = (worldPos.z + 10) / 20; // 0 (back) to 1 (front)
        const opacity = Math.max(0.25, Math.min(1.0, 0.3 + zDist * 0.7));
        sprite.material.opacity = opacity;
        const scale = 3.6 + zDist * 1.0;
        sprite.scale.set(scale, scale * 0.32, 1);
      });

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
      dom.removeEventListener('click', handleNodeClick);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      spriteObjects.forEach(s => {
        s.sprite.material.map?.dispose();
        s.sprite.material.dispose();
      });
    };
  }, [isRotating]);

  return (
    <div id="skills-3d-sphere-widget" className="relative flex flex-col items-center">
      {/* 3D Viewport */}
      <div
        ref={mountRef}
        className="w-full h-80 sm:h-96 md:h-[420px] cursor-grab active:cursor-grabbing select-none"
      />

      {/* Floating 3D Interaction bar */}
      <div className="w-full max-w-md mt-2 p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-xl">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400">
              <Code2 className="w-4 h-4" />
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">{activeSkill.name}</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-transparent">
              {activeSkill.category}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">{activeSkill.level}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${activeSkill.level}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 mt-2">
          <span>{activeSkill.tags}</span>
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-mono underline"
          >
            {isRotating ? 'Pause Spin' : 'Resume Spin'}
          </button>
        </div>
      </div>
    </div>
  );
};
