import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  FileText,
  Send,
  Boxes,
  Briefcase,
  Layers,
  Sparkles,
  GraduationCap,
  Award,
  Radio,
  Eye,
  Camera
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenResumeModal: () => void;
  wireframeMode: boolean;
  onToggleWireframe: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResumeModal,
  wireframeMode,
  onToggleWireframe,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', icon: Sparkles },
    { label: 'Experience', href: '#experience', icon: Briefcase },
    { label: 'Projects', href: '#projects', icon: Layers },
    { label: 'Memories', href: '#gallery', icon: Camera },
    { label: 'Thesis (3D)', href: '#thesis', icon: Eye },
    { label: 'Skills', href: '#skills', icon: Boxes },
    { label: 'Certifications', href: '#certifications', icon: Award },
    { label: 'Education', href: '#education', icon: GraduationCap },
    { label: 'Contact', href: '#contact', icon: Send },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/90 dark:border-slate-800/90 shadow-lg shadow-slate-200/50 dark:shadow-black/50 py-4 sm:py-4.5 min-h-[76px] sm:min-h-[82px] flex items-center'
          : 'bg-white/40 dark:bg-slate-950/40 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/40 py-5 sm:py-6 min-h-[86px] sm:min-h-[92px] flex items-center'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          {/* Logo / Brand with Sakib Avatar */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group"
            id="navbar-brand-link"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-cyan-400 shadow-md shadow-cyan-500/25 group-hover:scale-105 transition-transform bg-slate-800 shrink-0">
              <img
                src="./my-passport-photo.png"
                alt="Khondoker Sakibul Habib Sakib"
                className="w-full h-full object-cover object-[50%_14%]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true';
                    target.src = '/my-passport-photo.png';
                  }
                }}
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" title="Active Head of IT & UCASM Faculty" />
            </div>
            <div>
              <span className="font-heading font-bold text-xs sm:text-sm md:text-base tracking-tight text-slate-900 dark:text-white block leading-tight">
                KHONDOKER SAKIBUL HABIB SAKIB
              </span>
              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 block tracking-tight">
                Head of IT • Lecturer (UCASM) • Program Coordination, Academic Faculty
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Dark Mode and Light Mode Toggle with Hover Transition */}
            <ThemeToggle />

            {/* 3D Wireframe Canvas Boost Toggle */}
            <button
              type="button"
              id="wireframe-toggle-btn"
              onClick={onToggleWireframe}
              className={`p-2 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 ${
                wireframeMode
                  ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                  : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
              title="Toggle 3D Wireframe Density"
            >
              <Radio className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-[11px]">{wireframeMode ? '3D Grid: High' : '3D Grid'}</span>
            </button>

            {/* Resume Printable CV Modal Button */}
            <button
              type="button"
              id="view-cv-modal-btn"
              onClick={onOpenResumeModal}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Full CV</span>
            </button>

            {/* Direct Contact Button */}
            <a
              href="#contact"
              id="nav-hire-me-btn"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </a>
          </div>

          {/* Mobile menu right side: compact theme toggle + CV icon + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle variant="compact" />
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 text-xs shadow-sm"
              title="View CV"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-cyan-500 shadow-sm"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="lg:hidden bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl mt-2 shadow-2xl animate-in slide-in-from-top duration-200"
        >
          {/* Theme selector in mobile drawer */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Theme Mode:</span>
            <ThemeToggle />
          </div>

          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-300 flex items-center gap-2"
                >
                  <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                onToggleWireframe();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2"
            >
              <Radio className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Toggle 3D Grid Effects ({wireframeMode ? 'Dense' : 'Normal'})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenResumeModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <FileText className="w-4 h-4" />
              <span>Open Complete CV Document</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
