import React, { useState, useEffect } from 'react';
import { ProjectIdea, DashboardStats } from '../../types';
import { api } from '../../services/api';
import {
  Sparkles,
  Bookmark,
  CheckSquare,
  Clock,
  ArrowRight,
  Trophy,
  Layers,
  Compass,
  Zap,
} from 'lucide-react';

interface StudentDashboardProps {
  onOpenProject: (project: ProjectIdea, tab?: string) => void;
  onLaunchGenerator: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onOpenProject,
  onLaunchGenerator,
}) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalGenerated: 0,
    savedCount: 0,
    activeRoadmapsCount: 0,
    overallRoadmapCompletionPercent: 0,
  });
  const [recentProjects, setRecentProjects] = useState<ProjectIdea[]>([]);
  const [savedProjects, setSavedProjects] = useState<ProjectIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.getDashboardStats().then(res => {
      if (isMounted && res.success) {
        setStats(res.stats);
        setRecentProjects(res.recentProjects);
        setSavedProjects(res.savedProjects);
      }
    }).catch(err => {
      console.warn('Could not fetch dashboard stats:', err);
    }).finally(() => {
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const activeProject = savedProjects[0] || recentProjects[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-forge-900/60 via-slate-900 to-purple-950/40 border border-slate-800 shadow-2xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forge-400 mb-2">
            <Compass className="w-4 h-4" />
            <span>Capstone Command Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Your Project Journey
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-xl">
            Track your milestone completions, consult your grounded AI mentor, and prepare for technical viva examinations.
          </p>
        </div>

        <button
          onClick={onLaunchGenerator}
          className="self-start md:self-auto px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-forge-600 to-brand-violet text-white shadow-glow hover:brightness-110 transition-all flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Project Idea</span>
        </button>
      </div>

      {/* 4 Statistics Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Ideas Generated</span>
            <Sparkles className="w-4 h-4 text-forge-400" />
          </div>
          <span className="text-3xl font-black text-white">{stats.totalGenerated}</span>
          <span className="text-[11px] text-slate-500 block mt-1">Available in catalog</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Saved Projects</span>
            <Bookmark className="w-4 h-4 text-rose-400" />
          </div>
          <span className="text-3xl font-black text-white">{stats.savedCount}</span>
          <span className="text-[11px] text-slate-500 block mt-1">Bookmarked for defense</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Roadmaps</span>
            <CheckSquare className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-3xl font-black text-white">{stats.activeRoadmapsCount}</span>
          <span className="text-[11px] text-slate-500 block mt-1">With logged progress</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Roadmap Progress</span>
            <Trophy className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-3xl font-black text-emerald-400">
            {stats.overallRoadmapCompletionPercent}%
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">Milestones completed</span>
        </div>
      </div>

      {/* Continue Active Project Banner (if any) */}
      {activeProject && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Recommended Next Step: Continue Your Primary Project</span>
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              {activeProject.title}
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl line-clamp-1">
              {activeProject.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenProject(activeProject, 'roadmap')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-forge-600 hover:bg-forge-500 text-white shadow-glow transition-all flex items-center gap-2"
            >
              <span>Continue Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenProject(activeProject, 'mentor')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              Ask Mentor
            </button>
          </div>
        </div>
      )}

      {/* Saved Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-rose-400" />
            <span>Saved Project Blueprints ({savedProjects.length})</span>
          </h3>
        </div>

        {savedProjects.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-slate-400 text-xs">
            No saved projects yet. Click the bookmark icon on any project card to pin it here.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedProjects.map(p => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-bold text-forge-400">{p.domain.split('/')[0]}</span>
                    <span>{p.difficulty}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-white leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {p.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-400">
                    {p.practicalityScore}% Feasibility
                  </span>
                  <button
                    onClick={() => onOpenProject(p)}
                    className="text-xs font-bold text-forge-400 hover:text-forge-300 flex items-center gap-1"
                  >
                    <span>Open Blueprint</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Projects Catalog */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-forge-400" />
          <span>Recently Synthesized Ideas</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentProjects.slice(0, 6).map(p => (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {p.domain}
                </span>
                <h4 className="text-sm font-bold text-white mt-1 leading-snug">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {p.problemStatement}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {p.estimatedDuration}
                </span>
                <button
                  onClick={() => onOpenProject(p)}
                  className="text-xs font-bold text-forge-400 hover:text-forge-300 flex items-center gap-1"
                >
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
