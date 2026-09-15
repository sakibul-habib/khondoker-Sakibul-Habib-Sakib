import React, { useState } from 'react';
import {
  Boxes,
  Code2,
  Cpu,
  Palette,
  Terminal,
  Server,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SkillsSphere3D } from './canvas/SkillsSphere3D';
import { Card3D } from './ui/Card3D';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);

  const itLiteracyTags = [
    "Programming Languages",
    "Algorithms & Data Structures",
    "SDLC & Agile Workflows",
    "IDEs & DevTools",
    "Database Systems",
    "Web Engineering",
    "Operating Systems (Linux/Win)",
    "Software QA & Testing",
    "Cloud Deployments",
    "Security & Sanitization",
    "Problem-Solving & Debugging"
  ];

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400 text-xs font-mono mb-3">
            <Boxes className="w-3.5 h-3.5" />
            <span>CORE SKILLS & IT LITERACY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Technical Proficiency & Skill Matrix
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-2">
            Multi-paradigm mastery encompassing full-stack web architectures, mobile development, algorithmic systems, and digital marketing technologies.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        {/* 3D Skills Sphere and Categorized Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: 3D Spherical Tag Cloud */}
          <div className="lg:col-span-6">
            <Card3D intensity={8} glowColor="cyan" className="p-4 sm:p-6 flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono font-semibold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
                  3D Interactive Orbital Skill Sphere
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Click node or drag sphere</span>
              </div>
              <SkillsSphere3D />
            </Card3D>
          </div>

          {/* Right Column: Categorized Skill Meters */}
          <div className="lg:col-span-6 space-y-4">
            {/* Category tabs */}
            <div className="grid grid-cols-2 gap-2">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.title}
                  type="button"
                  id={`skill-cat-btn-${idx}`}
                  onClick={() => setSelectedCategoryIdx(idx)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedCategoryIdx === idx
                      ? 'bg-cyan-100 dark:bg-cyan-950/60 border-cyan-500 dark:border-cyan-400 text-cyan-900 dark:text-cyan-200 shadow-md shadow-cyan-500/10 dark:shadow-cyan-950/40'
                      : 'bg-slate-100/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <h4 className="text-xs font-bold font-heading truncate text-slate-900 dark:text-white">{cat.title}</h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{cat.skills.length} skills listed</span>
                </button>
              ))}
            </div>

            {/* Selected Category Detail Card */}
            <Card3D intensity={10} glowColor="blue" className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {SKILL_CATEGORIES[selectedCategoryIdx].title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {SKILL_CATEGORIES[selectedCategoryIdx].description}
                </p>
              </div>

              <div className="space-y-4">
                {SKILL_CATEGORIES[selectedCategoryIdx].skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                        {skill.tags && (
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                            {skill.tags}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">{skill.level}%</span>
                    </div>
                    {/* Visual meter */}
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-950 overflow-hidden border border-slate-300/80 dark:border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 rounded-full transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card3D>
          </div>
        </div>

        {/* IT Literacy & Theoretical Foundations Pill Grid */}
        <Card3D intensity={6} glowColor="purple" className="p-6">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-heading font-semibold text-sm mb-3">
            <Cpu className="w-4 h-4" />
            <span>Computer Science Foundations & IT Literacy</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Grounded in core computing curricula from B.Sc in CSE and ongoing Master of Science (PMSCS) studies at Jahangirnagar University.
          </p>
          <div className="flex flex-wrap gap-2">
            {itLiteracyTags.map((tag, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </Card3D>
      </div>
    </section>
  );
};
