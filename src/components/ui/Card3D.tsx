import React, { useRef, useState } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  id?: string;
  glowColor?: 'cyan' | 'blue' | 'emerald' | 'purple';
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  intensity = 15,
  id,
  glowColor = 'cyan',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const glowBorder = {
    cyan: 'hover:border-cyan-500/60 hover:shadow-cyan-500/15 dark:hover:border-cyan-500/50 dark:hover:shadow-cyan-500/10',
    blue: 'hover:border-blue-500/60 hover:shadow-blue-500/15 dark:hover:border-blue-500/50 dark:hover:shadow-blue-500/10',
    emerald: 'hover:border-emerald-500/60 hover:shadow-emerald-500/15 dark:hover:border-emerald-500/50 dark:hover:shadow-emerald-500/10',
    purple: 'hover:border-purple-500/60 hover:shadow-purple-500/15 dark:hover:border-purple-500/50 dark:hover:shadow-purple-500/10',
  }[glowColor];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -intensity;
    const rotY = ((x - centerX) / centerX) * intensity;

    setRotateX(rotX);
    setRotateY(rotY);
    setShinePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
      }}
      className={`relative rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 transition-all duration-300 shadow-lg shadow-slate-200/40 dark:shadow-xl dark:shadow-black/40 overflow-hidden ${glowBorder} ${className}`}
    >
      {/* Dynamic 3D specular shine reflection */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-35 mix-blend-screen transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${shinePos.x}% ${shinePos.y}%, rgba(56, 189, 248, 0.45), transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};
