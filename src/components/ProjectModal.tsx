import React from 'react';
import { X, CheckCircle2, Github, ExternalLink, Cpu, Layers, Tag, Building2 } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      id="project-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Origin */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            {project.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            {project.roleOrigin}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-4 pr-8 leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Key Architectural Features */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>Key Engineering Highlights</span>
          </h4>
          <ul className="space-y-2.5">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Performance / Operational Metrics */}
        {project.metrics && (
          <div className="mb-6 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-900/50 text-xs text-cyan-200">
            <strong className="text-cyan-400 block font-heading mb-1">Production Impact:</strong>
            {project.metrics}
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-8">
          <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technologies & Frameworks</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links / Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
          <a
            href={project.githubUrl || "https://github.com/khsakib-creator"}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
