import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  FolderGit2,
  Layers,
  Building2,
  Phone
} from 'lucide-react';
import { Card3D } from './ui/Card3D';
import { EXPERIENCES, OFFICE_LOCATIONS } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<string>(EXPERIENCES[0].id);

  return (
    <section id="experience" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>LEADERSHIP & WORK HISTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Professional Experience
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-2">
            Proven track record of managing enterprise software operations, mentoring engineering teams, and coordinating inbound workflows.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        {/* 3D Timeline Grid */}
        <div className="space-y-8">
          {EXPERIENCES.map((exp, index) => {
            const isCurrent = exp.period.includes('Present');
            return (
              <Card3D
                key={exp.id}
                id={`experience-card-${exp.id}`}
                intensity={10}
                glowColor={isCurrent ? 'cyan' : 'blue'}
                className="p-6 sm:p-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Organization, Role, Period */}
                  <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-6">
                    <div>
                      {/* Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold ${
                          isCurrent
                            ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                        }`}>
                          {exp.highlightBadge}
                        </span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                          {exp.period}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white mb-2 leading-snug">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-medium text-sm mb-4">
                        <Building2 className="w-4 h-4 shrink-0" />
                        <span>{exp.company}</span>
                      </div>

                      {/* Mentorship Metric Pill */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 mb-4">
                        <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Trained & mentored <strong className="text-slate-900 dark:text-white">{exp.teamTrained}+ team members</strong></span>
                      </div>
                    </div>

                    {/* Office Locations */}
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="text-[11px] font-mono text-slate-500 uppercase block">Office Locations:</span>
                      {exp.locations.map((loc, lIdx) => (
                        <div key={lIdx} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                          <span className="leading-tight">{loc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Key Responsibilities & Projects Delivered */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-3">
                        Key Responsibilities & Operational Impact
                      </h4>
                      <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {exp.description.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Projects Completed in this Role */}
                      <div className="mb-6">
                        <h4 className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          <FolderGit2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                          <span>Delivered Projects During Tenure</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.projects.map((proj, pIdx) => (
                            <span
                              key={pIdx}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 hover:border-cyan-500/50 transition-colors"
                            >
                              {proj}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack used */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-mono text-slate-500 mr-1">Stack:</span>
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-900/60 font-mono text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Office Locations Grid */}
        <div className="mt-12">
          <Card3D intensity={6} glowColor="cyan" className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white">
                Official Plannet Group Operations & Office Locations
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {OFFICE_LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  className="p-4 rounded-xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
                >
                  <div className="mb-3">
                    <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold block mb-1">
                      {loc.name.includes('City') ? 'IT OPERATIONS HUB' : 'ACADEMIC CAMPUS'}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                      {loc.name}
                    </h4>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                    <span className="leading-snug">{loc.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card3D>
        </div>
      </div>
    </section>
  );
};
