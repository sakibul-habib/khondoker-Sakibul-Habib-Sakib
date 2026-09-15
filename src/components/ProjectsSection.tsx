import React, { useState } from 'react';
import {
  Layers,
  Search,
  ExternalLink,
  Github,
  CheckCircle2,
  ArrowUpRight,
  Filter,
  Code
} from 'lucide-react';
import { Card3D } from './ui/Card3D';
import { ProjectModal } from './ProjectModal';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = [
    'All',
    'Enterprise ERP & POS',
    'Web Applications',
    'Academic & Utility',
    'APIs & Marketing'
  ];

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory = activeCategory === 'All' || proj.category === activeCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>PORTFOLIO & SYSTEM BUILDS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Featured Projects & Solutions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-2">
            Engineered across retail, financial, institutional, and marketing domains. Hover over cards for 3D perspective response.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                id={`project-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="project-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech or project..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Projects 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card3D
              key={project.id}
              id={`project-card-${project.id}`}
              intensity={14}
              glowColor="cyan"
              className="flex flex-col justify-between p-6 cursor-pointer group"
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-900/50">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 truncate max-w-[140px]">
                    {project.roleOrigin.split('/')[0]}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2.5 flex items-start justify-between gap-2">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Key feature previews */}
                <div className="space-y-1.5 mb-5">
                  {project.features.slice(0, 2).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Tech stack and Modal Trigger */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-[10px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-500 text-[10px] font-mono border border-slate-200 dark:border-slate-800">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>View Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl || 'https://github.com/khsakib-creator'}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        {/* Modal for Project details */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
