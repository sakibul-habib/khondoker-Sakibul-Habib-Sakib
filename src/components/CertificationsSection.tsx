import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Sparkles,
  BookOpen,
  Code,
  Globe
} from 'lucide-react';
import { Card3D } from './ui/Card3D';
import { NSDA_CERTIFICATIONS, OTHER_CERTIFICATIONS } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nsda' | 'other'>('nsda');

  return (
    <section id="certifications" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>GOVERNMENT & PROFESSIONAL ACCREDITATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Certifications & Technical Credentials
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-2">
            Officially verified National Skills Development Authority (NSDA) levels and specialized certifications from Microsoft MLH, a2i, British Council, and Udemy.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800">
            <button
              type="button"
              id="tab-nsda-certifications"
              onClick={() => setActiveTab('nsda')}
              className={`px-5 py-2 rounded-xl text-xs font-semibold font-heading transition-all flex items-center gap-2 ${
                activeTab === 'nsda'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>NSDA National Certifications (7)</span>
            </button>
            <button
              type="button"
              id="tab-other-certifications"
              onClick={() => setActiveTab('other')}
              className={`px-5 py-2 rounded-xl text-xs font-semibold font-heading transition-all flex items-center gap-2 ${
                activeTab === 'other'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Industry & Global Credentials (8)</span>
            </button>
          </div>
        </div>

        {/* NSDA TAB */}
        {activeTab === 'nsda' && (
          <div>
            <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-white block font-medium">National Skills Development Authority (NSDA)</strong>
                  <span className="text-slate-600 dark:text-slate-400">Prime Minister&apos;s Office, Government of the People&apos;s Republic of Bangladesh</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-md bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 font-mono text-[11px] self-start sm:self-auto">
                Official Standards Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {NSDA_CERTIFICATIONS.map((cert) => (
                <Card3D
                  key={cert.id}
                  id={`nsda-cert-card-${cert.id}`}
                  intensity={12}
                  glowColor="cyan"
                  className="p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">SL: {cert.sl.toString().padStart(2, '0')}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                        cert.level === 4
                          ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40'
                          : cert.level === 3
                          ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40'
                          : 'bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-500/40'
                      }`}>
                        Level {cert.level}
                      </span>
                    </div>

                    <h4 className="text-base font-bold font-heading text-slate-900 dark:text-white mb-2 leading-snug">
                      {cert.occupation}
                    </h4>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 mt-4 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <span>{cert.authority.split('(')[0]}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                </Card3D>
              ))}
            </div>
          </div>
        )}

        {/* OTHER CERTIFICATIONS TAB */}
        {activeTab === 'other' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {OTHER_CERTIFICATIONS.map((cert, index) => (
              <Card3D
                key={index}
                intensity={12}
                glowColor="blue"
                className="p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-cyan-700 dark:text-cyan-400 border border-slate-200 dark:border-slate-800 text-[10px] font-mono">
                      {cert.type}
                    </span>
                    <Award className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  </div>

                  <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white mb-2 leading-snug">
                    {cert.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 mt-4 text-[11px] font-medium text-cyan-700 dark:text-cyan-300 flex items-center justify-between">
                  <span className="truncate">{cert.issuer}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 ml-1" />
                </div>
              </Card3D>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
