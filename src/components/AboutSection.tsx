import React, { useState } from 'react';
import {
  User,
  Target,
  Compass,
  Cpu,
  ShieldCheck,
  Terminal,
  FileCheck,
  Building,
  GraduationCap
} from 'lucide-react';
import { Card3D } from './ui/Card3D';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'objective' | 'leadership'>('profile');

  return (
    <section id="about" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400 text-xs font-mono mb-3">
            <User className="w-3.5 h-3.5" />
            <span>EXECUTIVE PROFILE & PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            About KHONDOKER SAKIBUL HABIB SAKIB
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Profile Portrait & Interactive 3D Terminal System Card */}
          <div className="lg:col-span-6 space-y-6">
            {/* Executive Portrait Card */}
            <Card3D intensity={10} glowColor="cyan" className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative shrink-0">
                  <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-xl overflow-hidden border-2 border-cyan-500/60 shadow-lg shadow-cyan-950/50 bg-slate-900">
                    <img
                      src="./my-passport-photo.png"
                      alt="Khondoker Sakibul Habib Sakib"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] flex items-center gap-1 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                    VERIFIED
                  </span>
                </div>

                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 text-[10px] font-mono">
                    LEADERSHIP APPOINTMENTS
                  </div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    {PERSONAL_INFO.name}
                  </h3>
                  <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-mono">
                    <div className="text-cyan-600 dark:text-cyan-400 font-semibold">• Head of IT — City Tech IT</div>
                    <div className="text-blue-600 dark:text-blue-400 font-semibold">• Lecturer (CSE) — UCASM</div>
                    <div className="text-purple-600 dark:text-purple-400 font-semibold">• Asset Coordinator — UCAST</div>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                    Plannet Group • Uttara & Gulshan-1, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </Card3D>

            {/* Terminal Window Chrome */}
            <Card3D intensity={12} glowColor="cyan" className="p-5 sm:p-7">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">sakib@system-core ~ $ info</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">STATUS: ACTIVE</span>
              </div>

              {/* Code-like Data View */}
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80">
                  <span className="text-purple-600 dark:text-purple-400">const</span>{' '}
                  <span className="text-amber-600 dark:text-yellow-300">professionalProfile</span> = &#123;
                  <div className="pl-4 space-y-1 text-slate-700 dark:text-slate-300 text-xs">
                    <div>
                      <span className="text-cyan-600 dark:text-cyan-400">name:</span> &quot;{PERSONAL_INFO.name}&quot;,
                    </div>
                    <div>
                      <span className="text-cyan-600 dark:text-cyan-400">currentRoles:</span> [
                        &quot;Head of IT&quot;,
                        &quot;CSE Lecturer&quot;,
                        &quot;Asset Project Coordinator&quot;
                      ],
                    </div>
                    <div>
                      <span className="text-cyan-600 dark:text-cyan-400">organization:</span> &quot;Plannet Group (City Tech IT, UCASM, UCAST)&quot;,
                    </div>
                    <div>
                      <span className="text-cyan-600 dark:text-cyan-400">location:</span> &quot;{PERSONAL_INFO.address}&quot;,
                    </div>
                    <div>
                      <span className="text-cyan-600 dark:text-cyan-400">education:</span> &quot;PMSCS (JU) | B.Sc CSE (IUBAT)&quot;,
                    </div>
                    <div>
                      <span className="text-cyan-600 dark:text-cyan-400">engineersTrained:</span> &gt; 46,
                    </div>
                    <div>
                      <span className="text-cyan-600 dark:text-cyan-400">specialization:</span> [&quot;Laravel&quot;, &quot;Django&quot;, &quot;IoT Wearables&quot;, &quot;ERP/POS&quot;]
                    </div>
                  </div>
                  &#125;;
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/40 text-xs leading-relaxed text-cyan-900 dark:text-cyan-200">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold mb-1 font-heading">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Official Declaration</span>
                  </div>
                  <p className="italic text-[11px] text-slate-600 dark:text-slate-300">
                    &ldquo;{PERSONAL_INFO.declaration}&rdquo;
                  </p>
                  <div className="text-right text-[10px] text-cyan-600 dark:text-cyan-400 font-mono mt-1">
                    — KHONDOKER SAKIBUL HABIB SAKIB
                  </div>
                </div>
              </div>
            </Card3D>
          </div>

          {/* Right Column: Dynamic Profile Statement & Tabbed Insight */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800">
              <button
                type="button"
                id="about-tab-profile"
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold font-heading transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'profile'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Profile</span>
              </button>
              <button
                type="button"
                id="about-tab-objective"
                onClick={() => setActiveTab('objective')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold font-heading transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'objective'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Career Objective</span>
              </button>
              <button
                type="button"
                id="about-tab-leadership"
                onClick={() => setActiveTab('leadership')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold font-heading transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'leadership'
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Leadership</span>
              </button>
            </div>

            {/* Tab Content Cards */}
            {activeTab === 'profile' && (
              <Card3D intensity={8} glowColor="blue" className="p-6">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-heading font-semibold text-lg mb-3">
                  <Cpu className="w-5 h-5" />
                  <h3>Professional Identity</h3>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-4">
                  {PERSONAL_INFO.profileSummary}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  With a solid background spanning three distinct IT institutions and groups in Bangladesh, 
                  I bridge executive technical management with hands-on software development. I have successfully 
                  led technical teams, managed daily software operations, engineered inbound workflows, and mentored 
                  over 46 developers and technical personnel.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 block">Current Focus</span>
                    <span className="text-slate-900 dark:text-white font-medium">Enterprise SaaS & Education</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Academic Research</span>
                    <span className="text-slate-900 dark:text-white font-medium">Assistive IoT & Embedded Tech</span>
                  </div>
                </div>
              </Card3D>
            )}

            {activeTab === 'objective' && (
              <Card3D intensity={8} glowColor="cyan" className="p-6">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-heading font-semibold text-lg mb-3">
                  <Target className="w-5 h-5" />
                  <h3>Career Objective</h3>
                </div>
                <blockquote className="text-sm text-cyan-900 dark:text-cyan-100 bg-cyan-50 dark:bg-cyan-950/30 p-4 rounded-xl border-l-4 border-cyan-500 leading-relaxed mb-4">
                  &ldquo;{PERSONAL_INFO.objective}&rdquo;
                </blockquote>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Committed to delivering impactful software systems, reducing operational overhead, 
                  and empowering cross-functional engineering units through agile workflows, continuous learning, 
                  and rigorous architectural standards.
                </p>
              </Card3D>
            )}

            {activeTab === 'leadership' && (
              <Card3D intensity={8} glowColor="emerald" className="p-6">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-heading font-semibold text-lg mb-3">
                  <Building className="w-5 h-5" />
                  <h3>Leadership & Mentorship Track Record</h3>
                </div>
                <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-medium">Asset Project Coordinator (Plannet Group):</strong>
                      Led and coordinated the Asset Project covering more than 10 technical & academic subjects, training 8 core team members.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-medium">Manager - IT (Turnago Group):</strong>
                      Oversaw inbound system pipelines, leading cross-functional teams and training 18+ staff.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-medium">Manager - Project (UCTIT):</strong>
                      Managed inbound IT operations and trained 20+ professionals in programming and web engineering.
                    </div>
                  </div>
                </div>
              </Card3D>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
