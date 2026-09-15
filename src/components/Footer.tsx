import React from 'react';
import { ArrowUp, Boxes, ShieldCheck, Heart, Github, Linkedin, Globe, Mail, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/90 dark:bg-slate-950 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          {/* Brand & Declaration */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Boxes className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading font-bold text-slate-900 dark:text-white text-base tracking-tight block">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 block">
                  {PERSONAL_INFO.title}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              House-11, Road-6, Badda Link Road, Gulshan-1, Dhaka-1212, Bangladesh.
            </p>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-400 italic shadow-sm">
              &ldquo;{PERSONAL_INFO.declaration}&rdquo;
            </div>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-mono font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <div className="text-[11px] text-slate-500 pt-1">
                Plannet Group • UCASM • City Tech IT
              </div>
            </div>
          </div>

          {/* Social Profiles & Back to top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div>
              <h4 className="text-xs font-mono font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                Digital Presence
              </h4>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all shadow-sm"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all shadow-sm"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all shadow-sm"
                  title="Portfolio Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              type="button"
              id="back-to-top-btn"
              onClick={scrollToTop}
              className="mt-6 md:mt-0 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Khondoker Sakibul Habib. All rights reserved.
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>WebGL • Three.js 3D Animated Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
