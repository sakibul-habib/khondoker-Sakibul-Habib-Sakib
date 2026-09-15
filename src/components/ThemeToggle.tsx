import React, { useState } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  variant?: 'pill' | 'compact';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  variant = 'pill',
}) => {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();
  const [hoveredOption, setHoveredOption] = useState<'dark' | 'light' | null>(null);

  if (variant === 'compact') {
    return (
      <button
        type="button"
        id="theme-toggle-compact-btn"
        onClick={toggleTheme}
        className={`relative group p-2 rounded-xl border transition-all duration-300 flex items-center justify-center overflow-hidden ${
          isDark
            ? 'bg-slate-900/90 text-amber-300 border-slate-800 hover:border-amber-400/50 hover:bg-slate-800 shadow-md shadow-black/20'
            : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-500/50 hover:bg-slate-50 shadow-md shadow-slate-200/50'
        } ${className}`}
        title={`Current: ${isDark ? 'Dark Mode' : 'Light Mode'} (Click to switch)`}
        aria-label="Toggle theme mode"
      >
        {/* Hover luminous backdrop aura */}
        <span className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

        {isDark ? (
          <Moon className="w-4 h-4 text-amber-300 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110" />
        )}
      </button>
    );
  }

  return (
    <div
      id="theme-toggle-container"
      className={`relative inline-flex items-center p-1 rounded-2xl border transition-all duration-300 ${
        isDark
          ? 'bg-slate-900/90 border-slate-800/90 shadow-inner shadow-black/40'
          : 'bg-slate-100/90 border-slate-200 shadow-inner shadow-slate-300/30'
      } ${className}`}
      role="group"
      aria-label="Theme mode selection"
    >
      {/* Sliding Active Pill Indicator */}
      <div
        className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm pointer-events-none"
        style={{
          left: isDark ? 'calc(50% + 2px)' : '4px',
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          boxShadow: isDark
            ? '0 0 12px rgba(6, 182, 212, 0.25), inset 0 0 0 1px rgba(6, 182, 212, 0.4)'
            : '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(226, 232, 240, 1)',
        }}
      />

      {/* Light Mode Option */}
      <button
        type="button"
        id="theme-btn-light"
        onClick={() => setTheme('light')}
        onMouseEnter={() => setHoveredOption('light')}
        onMouseLeave={() => setHoveredOption(null)}
        className={`relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono font-medium transition-all duration-300 group ${
          !isDark
            ? 'text-cyan-600 font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-pressed={!isDark}
      >
        <span className="relative flex items-center justify-center">
          <Sun
            className={`w-3.5 h-3.5 transition-transform duration-500 ${
              !isDark
                ? 'text-amber-500 scale-105'
                : 'text-slate-400 group-hover:rotate-45 group-hover:text-amber-400 group-hover:scale-110'
            }`}
          />
        </span>
        <span className="text-[11px] tracking-tight">Light</span>

        {/* Hover preview indicator */}
        {hoveredOption === 'light' && isDark && (
          <span className="absolute inset-0 rounded-xl bg-cyan-500/10 border border-cyan-500/20 pointer-events-none animate-in fade-in duration-200" />
        )}
      </button>

      {/* Dark Mode Option */}
      <button
        type="button"
        id="theme-btn-dark"
        onClick={() => setTheme('dark')}
        onMouseEnter={() => setHoveredOption('dark')}
        onMouseLeave={() => setHoveredOption(null)}
        className={`relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono font-medium transition-all duration-300 group ${
          isDark
            ? 'text-cyan-300 font-bold'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        aria-pressed={isDark}
      >
        <span className="relative flex items-center justify-center">
          <Moon
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              isDark
                ? 'text-cyan-400 scale-105'
                : 'text-slate-500 group-hover:-rotate-12 group-hover:text-cyan-600 group-hover:scale-110'
            }`}
          />
        </span>
        <span className="text-[11px] tracking-tight">Dark</span>

        {/* Hover preview indicator */}
        {hoveredOption === 'dark' && !isDark && (
          <span className="absolute inset-0 rounded-xl bg-slate-800/10 border border-slate-700/20 pointer-events-none animate-in fade-in duration-200" />
        )}
      </button>
    </div>
  );
};
