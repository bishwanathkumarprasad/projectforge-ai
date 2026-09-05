import React from 'react';
import { ProjectIdea } from '../../types';
import {
  Bookmark,
  Layers,
  Sparkles,
  Bot,
  ArrowRight,
  Clock,
  Gauge,
  Check,
  Zap,
} from 'lucide-react';

interface ProjectCardProps {
  project: ProjectIdea;
  onViewBlueprint: (project: ProjectIdea) => void;
  onSaveToggle: (project: ProjectIdea) => void;
  isSaved: boolean;
  onCompareToggle: (project: ProjectIdea) => void;
  isCompared: boolean;
  onOpenMentor: (project: ProjectIdea) => void;
  onOpenImprove: (project: ProjectIdea) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewBlueprint,
  onSaveToggle,
  isSaved,
  onCompareToggle,
  isCompared,
  onOpenMentor,
  onOpenImprove,
}) => {
  const difficultyColors = {
    Beginner: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    Intermediate: 'bg-forge-500/15 text-forge-300 border-forge-500/30',
    Advanced: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between relative group">
      {/* Top Header: Domain & Action Icons */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {project.domain}
            </span>
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                difficultyColors[project.difficulty] || difficultyColors.Intermediate
              }`}
            >
              {project.difficulty}
            </span>
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              {project.estimatedDuration}
            </span>
          </div>

          {/* Quick Bookmark & Compare Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onCompareToggle(project)}
              className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1 ${
                isCompared
                  ? 'bg-brand-violet text-white border-brand-violet shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
              title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
              aria-label={`Compare ${project.title}`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold hidden sm:inline">
                {isCompared ? 'Comparing' : 'Compare'}
              </span>
            </button>

            <button
              onClick={() => onSaveToggle(project)}
              className={`p-2 rounded-lg border transition-all ${
                isSaved
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-rose-300 hover:border-slate-700'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save this project'}
              aria-label={isSaved ? `Unsave ${project.title}` : `Save ${project.title}`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title and Tagline */}
        <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug group-hover:text-forge-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-cyan-300/90 font-medium mt-1 line-clamp-2">
          {project.tagline}
        </p>

        {/* Problem Statement Snippet */}
        <p className="text-xs text-slate-400 leading-relaxed mt-3 line-clamp-3">
          {project.problemStatement}
        </p>

        {/* Technologies Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.recommendedTechnologies.slice(0, 5).map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 border border-slate-800"
            >
              {tech.name}
            </span>
          ))}
          {project.recommendedTechnologies.length > 5 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
              +{project.recommendedTechnologies.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Section: Scores & Actions */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-4">
        {/* Metric Badges */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Innovation
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-forge-400">
              {project.innovationScore}%
            </span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Practical
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-400">
              {project.practicalityScore}%
            </span>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Placement
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-brand-violet">
              {project.placementRelevance}%
            </span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewBlueprint(project)}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-forge-600 hover:bg-forge-500 text-white shadow-glow transition-all flex items-center justify-center gap-1.5"
          >
            <span>View Blueprint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenImprove(project)}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 transition-colors"
            title="Improve this idea with AI suggestions"
            aria-label="Improve this idea"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenMentor(project)}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-brand-violet border border-slate-800 transition-colors"
            title="Ask AI Mentor about this project"
            aria-label="Ask AI Mentor"
          >
            <Bot className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
