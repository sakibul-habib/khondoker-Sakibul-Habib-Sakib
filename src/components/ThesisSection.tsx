import React from 'react';
import {
  Eye,
  Cpu,
  Sparkles,
  Radio,
  CheckCircle,
  Zap,
  Activity,
  Award
} from 'lucide-react';
import { SmartGlass3D } from './canvas/SmartGlass3D';
import { Card3D } from './ui/Card3D';
import { THESIS_DETAILS } from '../data/portfolioData';

export const ThesisSection: React.FC = () => {
  return (
    <section id="thesis" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400 text-xs font-mono mb-3">
            <Eye className="w-3.5 h-3.5" />
            <span>FEATURED ACADEMIC RESEARCH & 3D CAD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Thesis Spotlight: {THESIS_DETAILS.title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-2">
            Engineered during B.Sc in Computer Science & Engineering (IUBAT). An assistive sensory wearable designed to empower visually impaired individuals with spatial awareness and independence.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        {/* Main Grid: 3D Interactive Canvas + Research Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Interactive Smart Glass Canvas */}
          <div className="lg:col-span-7">
            <SmartGlass3D />
          </div>

          {/* Right Column: Research Specs, Hardware Architecture, Impact */}
          <div className="lg:col-span-5 space-y-5">
            {/* Thesis Overview Card */}
            <Card3D intensity={10} glowColor="cyan" className="p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                  {THESIS_DETAILS.status}
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>IUBAT Thesis Defense</span>
                </span>
              </div>

              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
                Assistive IoT Sensory Wearable
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {THESIS_DETAILS.summary}
              </p>

              {/* Impact Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                {THESIS_DETAILS.impactMetrics.map((metric, mIdx) => (
                  <div key={mIdx} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block uppercase">
                      {metric.label}
                    </span>
                    <span className="text-base font-bold font-mono text-cyan-600 dark:text-cyan-400">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card3D>

            {/* Architecture Highlights */}
            <Card3D intensity={8} glowColor="blue" className="p-6">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-heading font-semibold text-sm mb-3">
                <Cpu className="w-4 h-4" />
                <span>Embedded Hardware Architecture</span>
              </div>

              <div className="space-y-3">
                {THESIS_DETAILS.solutionFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs">
                    <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-medium">{feat.title}</strong>
                      <span className="text-slate-500 dark:text-slate-400 leading-relaxed">{feat.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
};
