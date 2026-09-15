import React from 'react';
import {
  Briefcase,
  Users,
  Code,
  Award,
  Download,
  Send,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Github,
  ChevronDown,
  Sparkles,
  Terminal,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { HeroOrb3D } from './canvas/HeroOrb3D';
import { Card3D } from './ui/Card3D';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 sm:pt-36 pb-16 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text, Badges, Metrics & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Top Available status pill with 3D glow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 text-xs font-mono w-fit mb-4 shadow-sm dark:shadow-lg dark:shadow-cyan-950/40">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
              <span className="font-semibold tracking-tight">HEAD OF IT • LECTURER OF UCASM • PROGRAM COORDINATION, ACADEMIC FACULTY</span>
            </div>

            {/* Main Name Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight leading-[1.1] mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-400">
                KHONDOKER
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-500 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-500">
                SAKIBUL HABIB SAKIB
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-6">
              <strong className="text-slate-900 dark:text-white">Head of IT</strong> at City Tech IT (Plannet Group) directing enterprise software architecture, POS/ERP ecosystems, and technology pipelines, alongside academic leadership as <strong className="text-slate-900 dark:text-white">Lecturer in Computer Science & Engineering</strong> and <strong className="text-cyan-600 dark:text-cyan-400">Program Coordination, Academic Faculty</strong> at United College of Aviation Science & Management (UCASM) & UCAST.
            </p>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300 mb-8 font-mono">
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/60 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/60 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Gulshan-1 / Uttara, Dhaka</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-heading text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore 3D Work</span>
              </a>

              <button
                type="button"
                id="hero-open-resume-btn"
                onClick={onOpenResumeModal}
                className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-medium text-sm border border-slate-300 dark:border-slate-700 hover:border-cyan-500 transition-all flex items-center gap-2 shadow-sm transform hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>View / Print CV</span>
              </button>

              <div className="flex items-center gap-2 pl-2">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 hover:text-cyan-600 dark:hover:border-cyan-400 dark:hover:text-cyan-400 text-slate-500 dark:text-slate-400 transition-all shadow-sm"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 hover:text-cyan-600 dark:hover:border-cyan-400 dark:hover:text-cyan-400 text-slate-500 dark:text-slate-400 transition-all shadow-sm"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 text-slate-400 transition-all"
                  title="Official Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick 3D Stat Bento Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Card3D intensity={8} glowColor="cyan" className="p-3.5">
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-xl font-mono font-bold">{PERSONAL_INFO.stats.leadershipRoles}</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  Enterprise Leadership Roles
                </div>
              </Card3D>

              <Card3D intensity={8} glowColor="blue" className="p-3.5">
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-xl font-mono font-bold">{PERSONAL_INFO.stats.professionalsTrained}</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  Engineers & Staff Mentored
                </div>
              </Card3D>

              <Card3D intensity={8} glowColor="emerald" className="p-3.5">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <Code className="w-4 h-4" />
                  <span className="text-xl font-mono font-bold">{PERSONAL_INFO.stats.projectsCompleted}</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  POS, ERP & Web Apps
                </div>
              </Card3D>

              <Card3D intensity={8} glowColor="purple" className="p-3.5">
                <div className="flex items-center gap-2 text-purple-400 mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm font-mono font-bold">UCASM Faculty</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  Program Coordination, Academic Faculty
                </div>
              </Card3D>
            </div>
          </div>

          {/* Right Column: Sakib's Header Photo Card + 3D Hologram Interactive Canvas */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center gap-4">
            {/* Sakib's Executive Portrait Header Card */}
            <div className="w-full max-w-lg bg-slate-900/90 dark:bg-slate-950/80 border border-slate-700/80 dark:border-slate-800 rounded-3xl p-4 sm:p-5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-4 relative z-10">
                {/* Official Passport Photo Frame with Optimal Face Centering */}
                <div className="relative shrink-0">
                  <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-xl shadow-cyan-500/30 bg-slate-800 group">
                    <img
                      src="./my-passport-photo.png"
                      alt="Khondoker Sakibul Habib Sakib"
                      className="w-full h-full object-cover object-[50%_14%] group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = 'true';
                          target.src = '/my-passport-photo.png';
                        }
                      }}
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                    ACTIVE
                  </span>
                </div>

                {/* Identity & Current Leadership Roles */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                    <span>EXECUTIVE FACULTY</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-white truncate">
                    {PERSONAL_INFO.name}
                  </h3>
                  <div className="text-xs text-cyan-400 font-semibold leading-tight">
                    Head of IT — City Tech IT
                  </div>
                  <div className="text-xs text-blue-400 font-medium leading-tight">
                    Lecturer, Dept. of CSE — UCASM
                  </div>
                  <div className="inline-block text-[11px] px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 mt-0.5">
                    Program Coordination, Academic Faculty
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Hologram Interactive Canvas & Telemetry */}
            <div className="relative w-full max-w-lg">
              {/* Outer decorative ambient blur rings */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-transparent rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative bg-slate-950/70 border border-slate-800 rounded-3xl p-3 sm:p-4 backdrop-blur-xl shadow-2xl">
                {/* 3D Canvas component */}
                <HeroOrb3D colorScheme="cyan" />

                {/* Telemetry Info strip */}
                <div className="mt-3 p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-[11px] text-slate-300">
                      JU PMSCS (Ongoing) & IUBAT B.Sc
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    3D Engine: Three.js
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs font-mono">
        <span>Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
      </div>
    </section>
  );
};
