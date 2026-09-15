import React from 'react';
import { GraduationCap, Calendar, MapPin, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';
import { Card3D } from './ui/Card3D';
import { EDUCATION_TIMELINE } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400 text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION & DEGREES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Academic Background
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-2">
            Continuous scholarly development from secondary foundations to advanced post-graduate computer science studies.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        {/* 3D Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION_TIMELINE.map((edu, idx) => {
            const isOngoing = edu.status === 'Ongoing';
            return (
              <Card3D
                key={idx}
                id={`education-card-${idx}`}
                intensity={10}
                glowColor={isOngoing ? 'cyan' : 'blue'}
                className="p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.year}</span>
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ${
                      isOngoing
                        ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 animate-pulse'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}>
                      {edu.status === 'Ongoing' ? 'Ongoing Degree' : 'Graduated / Completed'}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white mb-2 leading-snug">
                    {edu.degree}
                  </h3>

                  <div className="text-sm text-cyan-700 dark:text-cyan-300 font-medium mb-1">
                    {edu.institution}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-4">
                    {edu.boardOrNote}
                  </div>

                  {edu.highlights && (
                    <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800/80">
                      {edu.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Academic Record Verified</span>
                  <BookOpen className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
