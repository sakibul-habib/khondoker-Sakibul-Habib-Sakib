import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  FileText,
  Eye,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2,
  CheckCircle2,
  Layers,
  GraduationCap,
  Award
} from 'lucide-react';
import {
  PERSONAL_INFO,
  EXPERIENCES,
  PLANNET_PROJECTS,
  OFFICE_LOCATIONS,
  NSDA_CERTIFICATIONS,
  OTHER_CERTIFICATIONS,
  EDUCATION_TIMELINE,
  THESIS_DETAILS
} from '../data/portfolioData';

interface PrintResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintResumeModal: React.FC<PrintResumeModalProps> = ({ isOpen, onClose }) => {
  const [activePage, setActivePage] = useState<'all' | '1' | '2' | '3'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'pdf' | 'dark'>('pdf');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(130, Math.max(75, prev + delta)));
  };

  const headOfItExp = EXPERIENCES.find((e) => e.id === 'head-of-it-city-tech');
  const lecturerExp = EXPERIENCES.find((e) => e.id === 'lecturer-cse-ucasm');
  const coordinatorExp = EXPERIENCES.find((e) => e.id === 'asset-project-coordinator-ucast');
  const turnagoExp = EXPERIENCES.find((e) => e.id === 'turnago-group');
  const uctitExp = EXPERIENCES.find((e) => e.id === 'uctit');

  return (
    <div
      id="print-resume-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-slate-900 border border-cyan-500/40 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col max-h-[96vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar (hidden when printing) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/90 shrink-0 print:hidden">
          {/* Document Title & Status */}
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold font-heading text-white">
                  Official CV • KHONDOKER SAKIBUL HABIB SAKIB
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                  PDF 3-Page Format
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Verified Document • Updated September 2026
              </span>
            </div>
          </div>

          {/* Controls: Page selector, Zoom, Mode, Print */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs">
              <button
                type="button"
                id="cv-view-pdf-mode"
                onClick={() => setViewMode('pdf')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  viewMode === 'pdf'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Official PDF
              </button>
              <button
                type="button"
                id="cv-view-dark-mode"
                onClick={() => setViewMode('dark')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  viewMode === 'dark'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Dark Theme
              </button>
            </div>

            {/* Page Jump Pills */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActivePage('all')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  activePage === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActivePage('1')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  activePage === '1'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                P1
              </button>
              <button
                type="button"
                onClick={() => setActivePage('2')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  activePage === '2'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                P2
              </button>
              <button
                type="button"
                onClick={() => setActivePage('3')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  activePage === '3'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                P3
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="hidden md:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1 text-xs text-slate-300">
              <button
                type="button"
                onClick={() => handleZoom(-10)}
                className="p-0.5 hover:text-cyan-400 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] w-9 text-center">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => handleZoom(10)}
                className="p-0.5 hover:text-cyan-400 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Print / PDF Button */}
            <button
              type="button"
              id="print-cv-btn"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              id="close-cv-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable Canvas with Multi-Page PDF Simulation */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-slate-950/60 flex flex-col items-center">
          <div
            className="w-full max-w-[850px] space-y-10 transition-transform origin-top"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            {/* ========================================================================= */}
            {/* PAGE 1: PROFILE, OBJECTIVE, CORE SKILLS, & PLANNET GROUP (HEAD OF IT, LECTURER, ASSET COORDINATOR) */}
            {/* ========================================================================= */}
            {(activePage === 'all' || activePage === '1') && (
              <div
                id="cv-pdf-page-1"
                className={`w-full rounded-xl shadow-2xl p-6 sm:p-10 border transition-colors relative print:shadow-none print:border-none print:m-0 print:p-8 print:w-full print:break-after-page ${
                  viewMode === 'pdf'
                    ? 'bg-white text-slate-900 border-slate-200'
                    : 'bg-slate-900 text-slate-100 border-slate-800'
                }`}
              >
                {/* Page Watermark / Badge (hidden in print) */}
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200 dark:border-slate-800 print:hidden text-[11px] font-mono opacity-70">
                  <span>OFFICIAL CURRICULUM VITAE</span>
                  <span className="font-semibold">PAGE 1 OF 3</span>
                </div>

                {/* Top Header: Passport Photo (Left) + Candidate Contact & Links (Right) */}
                <div className="flex flex-col sm:flex-row items-start gap-5 pb-6 border-b-2 border-slate-800 dark:border-slate-700">
                  {/* Sakib's Passport Photo */}
                  <div className="shrink-0 flex flex-col items-center sm:items-start">
                    <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-lg overflow-hidden border-2 border-slate-800 dark:border-slate-600 shadow-md bg-slate-100 dark:bg-slate-800">
                      <img
                        src="/my-passport-photo.png"
                        alt="Khondoker Sakibul Habib Sakib - Passport Photo"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          // Fallback if image path fails
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <span className="mt-1 text-[9px] font-mono text-slate-500 uppercase tracking-wider print:hidden">
                      Passport Photo
                    </span>
                  </div>

                  {/* Name, Contact, Address & Socials */}
                  <div className="flex-1 space-y-1.5 text-xs leading-relaxed">
                    <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-950 dark:text-white uppercase tracking-tight leading-none mb-1">
                      {PERSONAL_INFO.name}
                    </h1>
                    <div className="text-slate-700 dark:text-slate-300 font-medium">
                      {PERSONAL_INFO.address}
                    </div>
                    <div className="text-slate-800 dark:text-slate-200 font-mono text-[11px]">
                      <strong>Mobile:</strong> {PERSONAL_INFO.phone} | <strong>E-mail:</strong> {PERSONAL_INFO.email}
                    </div>
                    <div className="text-slate-800 dark:text-slate-200 font-mono text-[11px]">
                      <strong>Contact:</strong> {PERSONAL_INFO.phone} | <strong>Alt:</strong> {PERSONAL_INFO.secondaryEmail}
                    </div>
                    <div className="pt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-mono text-cyan-700 dark:text-cyan-400">
                      <a
                        href={PERSONAL_INFO.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        <Linkedin className="w-3 h-3" />
                        <span>linkedin.com/in/khondoker-sakibul-habib-004b20198</span>
                      </a>
                      <a
                        href={PERSONAL_INFO.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        <Github className="w-3 h-3" />
                        <span>github.com/khsakib-creator</span>
                      </a>
                      <a
                        href={PERSONAL_INFO.website}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        <Globe className="w-3 h-3" />
                        <span>khsakib-creator.github.io/sakibulhabib/</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Career Objective */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-1 mb-1.5">
                    CAREER OBJECTIVE
                  </h2>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                    {PERSONAL_INFO.objective}
                  </p>
                </div>

                {/* Profile */}
                <div className="mt-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-1 mb-1.5">
                    PROFILE
                  </h2>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                    {PERSONAL_INFO.profileSummary}
                  </p>
                </div>

                {/* Core Skills (Exact Two-Column Layout from CV Document) */}
                <div className="mt-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-1 mb-2">
                    CORE SKILLS
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                    <ul className="space-y-1">
                      <li className="flex items-start gap-1.5">
                        <span className="text-slate-400 mt-1 font-bold">•</span>
                        <span>
                          <strong>Website development:</strong> HTML, Bootstrap, CSS, PHP, MySQL, Django
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-slate-400 mt-1 font-bold">•</span>
                        <span>
                          <strong>Software development:</strong> Laravel Framework & Architecture
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-slate-400 mt-1 font-bold">•</span>
                        <span>
                          <strong>Logo Design:</strong> Vector corporate branding & identities
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-slate-400 mt-1 font-bold">•</span>
                        <span>
                          <strong>Data Management:</strong> Database schemas, querying, indexing
                        </span>
                      </li>
                    </ul>

                    <ul className="space-y-1">
                      <li className="flex items-start gap-1.5">
                        <span className="text-slate-400 mt-1 font-bold">•</span>
                        <span>
                          <strong>Product Management:</strong> Agile SDLC, inbound workflows, QA
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-slate-400 mt-1 font-bold">•</span>
                        <span>
                          <strong>Programming:</strong> C, C++, Java, Python, C# (.NET)
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-slate-400 mt-1 font-bold">•</span>
                        <span>
                          <strong>Digital Marketing & SEO:</strong> Pixel tracking, Meta CAPI, GTM
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-slate-400 mt-1 font-bold">•</span>
                        <span>
                          <strong>WordPress & Mobile:</strong> Themes, plugins & Flutter (Dart)
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* EXPERIENCE SECTION: PLANNET GROUP (HEAD OF IT, LECTURER, ASSET COORDINATOR) */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-slate-700 pb-1 mb-3">
                    EXPERIENCE
                  </h2>

                  <div className="space-y-4 text-xs">
                    {/* Role 1: Head of IT — City Tech IT, Plannet Group */}
                    {headOfItExp && (
                      <div className="border-l-2 border-slate-800 dark:border-cyan-500 pl-3 space-y-1.5">
                        <div className="flex flex-wrap items-baseline justify-between gap-1">
                          <h3 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white">
                            1. {headOfItExp.role} — <span className="font-semibold text-slate-800 dark:text-cyan-300">{headOfItExp.company}</span>
                          </h3>
                          <span className="font-mono text-[11px] font-semibold text-slate-600 dark:text-cyan-400">
                            15 July 2025 – Present | Uttara, Dhaka, Bangladesh
                          </span>
                        </div>
                        <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-outside pl-3.5 text-justify">
                          {headOfItExp.description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Role 2: Lecturer — Department of CSE, UCASM, Plannet Group */}
                    {lecturerExp && (
                      <div className="border-l-2 border-slate-800 dark:border-cyan-500 pl-3 space-y-1.5 pt-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-1">
                          <h3 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white">
                            2. {lecturerExp.role} — <span className="font-semibold text-slate-800 dark:text-cyan-300">{lecturerExp.company}</span>
                          </h3>
                          <span className="font-mono text-[11px] font-semibold text-slate-600 dark:text-cyan-400">
                            15 July 2025 – Present | Uttara, Dhaka, Bangladesh
                          </span>
                        </div>
                        <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-outside pl-3.5 text-justify">
                          {lecturerExp.description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Role 3: Asset Project Coordinator — UCAST, Plannet Group */}
                    {coordinatorExp && (
                      <div className="border-l-2 border-slate-800 dark:border-cyan-500 pl-3 space-y-1.5 pt-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-1">
                          <h3 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white">
                            3. {coordinatorExp.role} — <span className="font-semibold text-slate-800 dark:text-cyan-300">{coordinatorExp.company}</span>
                          </h3>
                          <span className="font-mono text-[11px] font-semibold text-slate-600 dark:text-cyan-400">
                            15 July 2025 – Present | Uttara, Dhaka, Bangladesh
                          </span>
                        </div>
                        <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-outside pl-3.5 text-justify">
                          {coordinatorExp.description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Plannet Group Projects Delivered */}
                    <div className="bg-slate-50 dark:bg-slate-950/80 p-3 rounded-lg border border-slate-200 dark:border-slate-800 mt-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1.5">
                        PROJECTS (Plannet Group / City Tech IT / UCASM / UCAST):
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-700 dark:text-slate-300">
                        {PLANNET_PROJECTS.map((proj, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 shrink-0" />
                            <span>{proj}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Plannet Group Office Locations */}
                    <div className="bg-slate-50 dark:bg-slate-950/80 p-3 rounded-lg border border-slate-200 dark:border-slate-800 mt-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1.5">
                        OFFICE LOCATIONS:
                      </h4>
                      <div className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                        {OFFICE_LOCATIONS.map((loc) => (
                          <div key={loc.id} className="leading-snug">
                            <strong>{loc.name}:</strong> {loc.address}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Page 1 Footer */}
                <div className="mt-8 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Khondoker Sakibul Habib Sakib</span>
                  <span>Curriculum Vitae • Page 1 of 3</span>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* PAGE 2: TURNAGO GROUP, UCTIT, & THESIS */}
            {/* ========================================================================= */}
            {(activePage === 'all' || activePage === '2') && (
              <div
                id="cv-pdf-page-2"
                className={`w-full rounded-xl shadow-2xl p-6 sm:p-10 border transition-colors relative print:shadow-none print:border-none print:m-0 print:p-8 print:w-full print:break-after-page ${
                  viewMode === 'pdf'
                    ? 'bg-white text-slate-900 border-slate-200'
                    : 'bg-slate-900 text-slate-100 border-slate-800'
                }`}
              >
                {/* Page Watermark / Badge (hidden in print) */}
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200 dark:border-slate-800 print:hidden text-[11px] font-mono opacity-70">
                  <span>EXPERIENCE (CONTINUED) & ACADEMIC THESIS</span>
                  <span className="font-semibold">PAGE 2 OF 3</span>
                </div>

                <div className="space-y-6 text-xs">
                  {/* Role 4: Manager – IT — Turnago Group */}
                  {turnagoExp && (
                    <div className="space-y-2">
                      <div className="border-b border-slate-300 dark:border-slate-700 pb-1.5 flex flex-wrap items-baseline justify-between gap-1">
                        <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                          4. {turnagoExp.role} — <span className="font-semibold text-slate-800 dark:text-cyan-300">{turnagoExp.company}</span>
                        </h3>
                        <span className="font-mono text-[11px] font-semibold text-slate-600 dark:text-cyan-400">
                          {turnagoExp.period}
                        </span>
                      </div>
                      <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-outside pl-4 text-justify">
                        {turnagoExp.description.map((desc, dIdx) => (
                          <li key={dIdx}>{desc}</li>
                        ))}
                      </ul>
                      <div className="text-[11px] text-slate-700 dark:text-slate-300">
                        <strong>OFFICE ADDRESS:</strong> {turnagoExp.locations[0]}
                      </div>
                      <div className="text-[11px] text-slate-700 dark:text-slate-300">
                        <strong>PROJECTS:</strong> {turnagoExp.projects.join(', ')}
                      </div>
                    </div>
                  )}

                  {/* Role 5: Manager – Project — Uttara Computer Training & IT Firm (UCTIT) */}
                  {uctitExp && (
                    <div className="space-y-2 pt-2">
                      <div className="border-b border-slate-300 dark:border-slate-700 pb-1.5 flex flex-wrap items-baseline justify-between gap-1">
                        <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                          5. {uctitExp.role} — <span className="font-semibold text-slate-800 dark:text-cyan-300">{uctitExp.company}</span>
                        </h3>
                        <span className="font-mono text-[11px] font-semibold text-slate-600 dark:text-cyan-400">
                          {uctitExp.period}
                        </span>
                      </div>
                      <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-outside pl-4 text-justify">
                        {uctitExp.description.map((desc, dIdx) => (
                          <li key={dIdx}>{desc}</li>
                        ))}
                      </ul>
                      <div className="text-[11px] text-slate-700 dark:text-slate-300">
                        <strong>OFFICE ADDRESS:</strong> {uctitExp.locations[0]}
                      </div>
                      <div className="text-[11px] text-slate-700 dark:text-slate-300">
                        <strong>PROJECTS:</strong> {uctitExp.projects.join(', ')}
                      </div>
                    </div>
                  )}

                  {/* THESIS SECTION */}
                  <div className="pt-4 border-t-2 border-slate-900 dark:border-slate-700">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-300 dark:border-slate-700 pb-1 mb-3">
                      THESIS
                    </h2>
                    <div className="space-y-2 text-slate-700 dark:text-slate-300">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                          {THESIS_DETAILS.title}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-cyan-400 border border-slate-300 dark:border-slate-700">
                          Completed Thesis Project
                        </span>
                      </div>
                      <p className="italic text-slate-800 dark:text-slate-200">
                        &ldquo;I am already done smart glass for blind people thesis that thesis increase the dependency and mobility of blind people.&rdquo;
                      </p>
                      <p className="text-justify leading-relaxed">
                        {THESIS_DETAILS.summary}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {THESIS_DETAILS.solutionFeatures.map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="p-2.5 rounded bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-[11px]"
                          >
                            <div className="font-bold text-slate-900 dark:text-white mb-0.5">
                              • {feat.title}
                            </div>
                            <div className="text-slate-600 dark:text-slate-400">
                              {feat.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Page 2 Footer */}
                <div className="mt-12 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Khondoker Sakibul Habib Sakib</span>
                  <span>Curriculum Vitae • Page 2 of 3</span>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* PAGE 3: EDUCATION, NSDA CERTIFICATION TABLE, OTHER CERTS, LANGUAGES, DECLARATION */}
            {/* ========================================================================= */}
            {(activePage === 'all' || activePage === '3') && (
              <div
                id="cv-pdf-page-3"
                className={`w-full rounded-xl shadow-2xl p-6 sm:p-10 border transition-colors relative print:shadow-none print:border-none print:m-0 print:p-8 print:w-full print:break-after-page ${
                  viewMode === 'pdf'
                    ? 'bg-white text-slate-900 border-slate-200'
                    : 'bg-slate-900 text-slate-100 border-slate-800'
                }`}
              >
                {/* Page Watermark / Badge (hidden in print) */}
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200 dark:border-slate-800 print:hidden text-[11px] font-mono opacity-70">
                  <span>EDUCATION, CERTIFICATIONS & DECLARATION</span>
                  <span className="font-semibold">PAGE 3 OF 3</span>
                </div>

                <div className="space-y-5 text-xs">
                  {/* EDUCATION SECTION */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-slate-700 pb-1 mb-2">
                      EDUCATION
                    </h2>
                    <div className="space-y-2 text-slate-700 dark:text-slate-300">
                      {EDUCATION_TIMELINE.map((edu, eIdx) => (
                        <div key={eIdx} className="flex items-start gap-2 leading-snug">
                          <span className="font-bold text-slate-950 dark:text-white font-mono w-12 shrink-0">
                            {edu.year}:
                          </span>
                          <div>
                            <strong>{edu.degree}</strong> — {edu.institution} ({edu.boardOrNote})
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* NSDA CERTIFICATION (Exact Table Format from Original CV Document) */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-slate-700 pb-1 mb-2">
                      NSDA CERTIFICATION (Govt. of Bangladesh)
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-slate-300 dark:border-slate-700 text-[11px]">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
                            <th className="border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-center w-12">
                              SL
                            </th>
                            <th className="border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-left">
                              Occupation
                            </th>
                            <th className="border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-center w-24">
                              Level
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {NSDA_CERTIFICATIONS.map((cert) => (
                            <tr
                              key={cert.id}
                              className="hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200"
                            >
                              <td className="border border-slate-300 dark:border-slate-700 px-3 py-1 text-center font-mono">
                                {cert.sl}
                              </td>
                              <td className="border border-slate-300 dark:border-slate-700 px-3 py-1 font-medium">
                                {cert.occupation}
                              </td>
                              <td className="border border-slate-300 dark:border-slate-700 px-3 py-1 text-center font-bold text-cyan-700 dark:text-cyan-400">
                                Level {cert.level}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* OTHER CERTIFICATIONS */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-slate-700 pb-1 mb-2">
                      OTHER CERTIFICATIONS
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                      {OTHER_CERTIFICATIONS.map((cert, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-1">
                          <span className="text-slate-400 font-bold">•</span>
                          <span>
                            <strong>{cert.title}</strong> — {cert.issuer}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* LANGUAGES */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-slate-700 pb-1 mb-2">
                      LANGUAGES
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                      <div>
                        <strong>English:</strong> Native
                      </div>
                      <div>
                        <strong>Bangla:</strong> Native
                      </div>
                      <div>
                        <strong>Hindi:</strong> Conversation
                      </div>
                      <div>
                        <strong>Urdu:</strong> Conversation
                      </div>
                    </div>
                  </div>

                  {/* IT LITERACY */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-slate-700 pb-1 mb-2">
                      IT LITERACY
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                      <div>• Programming: C, C++, Java, Python, C#, PHP, Dart</div>
                      <div>• Algorithms & Data Structures: Problem-Solving</div>
                      <div>• SDLC & Agile Methodologies: Scrum, Sprint QA</div>
                      <div>• Database Systems: MySQL, Relational Design</div>
                      <div>• Web Engineering: HTML, CSS, Laravel, Django, WordPress</div>
                      <div>• Operating Systems: Windows, Linux / Unix Servers</div>
                      <div>• Software Testing, Debugging & Performance Profiling</div>
                      <div>• Cloud Computing, VPS, Git & Deployment Automation</div>
                      <div>• Security Principles, Sanitization & Data Safety</div>
                      <div>• Project Management & Technical Mentorship</div>
                    </div>
                  </div>

                  {/* DECLARATION & SIGNATURE */}
                  <div className="pt-3 border-t-2 border-slate-900 dark:border-slate-700">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1">
                      DECLARATION
                    </h2>
                    <p className="italic text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                      &ldquo;{PERSONAL_INFO.declaration}&rdquo;
                    </p>
                    <div className="mt-6 flex flex-col items-start">
                      <div className="w-48 border-b border-slate-400 dark:border-slate-600 mb-1" />
                      <div className="font-bold text-xs text-slate-950 dark:text-white">
                        {PERSONAL_INFO.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Head of IT • Plannet Group
                      </div>
                    </div>
                  </div>
                </div>

                {/* Page 3 Footer */}
                <div className="mt-8 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Khondoker Sakibul Habib Sakib</span>
                  <span>Curriculum Vitae • Page 3 of 3</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
