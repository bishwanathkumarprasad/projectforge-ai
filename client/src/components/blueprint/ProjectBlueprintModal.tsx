import React, { useState } from 'react';
import { ProjectIdea, ImprovementItem } from '../../types';
import { OverviewTab } from './OverviewTab';
import { FeaturesTab } from './FeaturesTab';
import { TechStackTab } from './TechStackTab';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { DatabaseDesignTab } from './DatabaseDesignTab';
import { ApiDesignTab } from './ApiDesignTab';
import { RoadmapTab } from './RoadmapTab';
import { MentorTab } from './MentorTab';
import { ImproveTab } from './ImproveTab';
import {
  ArrowLeft,
  Bookmark,
  FileDown,
  Layers,
  Sparkles,
  Bot,
  Workflow,
  Database,
  Terminal,
  CheckSquare,
  Clock,
  Gauge,
  Info,
} from 'lucide-react';

interface ProjectBlueprintModalProps {
  project: ProjectIdea;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: (project: ProjectIdea) => void;
  isCompared: boolean;
  onToggleCompare: (project: ProjectIdea) => void;
  completedTaskIds: string[];
  onToggleTask: (taskId: string) => void;
  onOpenExport: (project: ProjectIdea) => void;
  onProjectUpdated: (updated: ProjectIdea) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  initialTab?: string;
}

export const ProjectBlueprintModal: React.FC<ProjectBlueprintModalProps> = ({
  project,
  onBack,
  isSaved,
  onToggleSave,
  isCompared,
  onToggleCompare,
  completedTaskIds,
  onToggleTask,
  onOpenExport,
  onProjectUpdated,
  onToast,
  initialTab = 'overview',
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Calculate roadmap progress for tab badge
  const totalTasks = project.roadmap.flatMap(p => p.tasks).length;
  const completedTasks = project.roadmap
    .flatMap(p => p.tasks)
    .filter(t => completedTaskIds.includes(t.id)).length;
  const roadmapPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'features', label: 'Features', icon: Layers },
    { id: 'tech', label: 'Tech Stack', icon: Terminal },
    { id: 'architecture', label: 'Architecture Diagram', icon: Workflow },
    { id: 'database', label: 'Database Design', icon: Database },
    { id: 'api', label: 'API Design', icon: Terminal },
    {
      id: 'roadmap',
      label: 'Development Roadmap',
      icon: CheckSquare,
      badge: `${roadmapPercent}%`,
    },
    { id: 'mentor', label: 'AI Project Mentor', icon: Bot, highlight: true },
    { id: 'improve', label: 'Improve Idea', icon: Sparkles },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Navigation & Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <button
          onClick={onBack}
          className="self-start px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-all flex items-center gap-2 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Ideas</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {/* Compare Toggle */}
          <button
            onClick={() => onToggleCompare(project)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              isCompared
                ? 'bg-brand-violet text-white border-brand-violet shadow-sm'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isCompared ? 'In Compare Matrix' : 'Add to Compare'}</span>
          </button>

          {/* Bookmark Save */}
          <button
            onClick={() => onToggleSave(project)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              isSaved
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved Project' : 'Save Project'}</span>
          </button>

          {/* Export Synopsis */}
          <button
            onClick={() => onOpenExport(project)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-forge-600 to-brand-violet text-white shadow-glow hover:brightness-110 transition-all flex items-center gap-1.5"
          >
            <FileDown className="w-4 h-4" />
            <span>Export Academic Synopsis</span>
          </button>
        </div>
      </div>

      {/* Project Title Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-forge-500/20 text-forge-300 border border-forge-500/30">
            {project.domain}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {project.difficulty} Difficulty
          </span>
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            <Clock className="w-3 h-3 text-slate-400" />
            {project.estimatedDuration}
          </span>
          {project.isDemo && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Verified Blueprint
            </span>
          )}
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base text-cyan-300/90 font-medium mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Score Meters Bar */}
        <div className="grid grid-cols-3 gap-3 pt-3 max-w-xl">
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Innovation
            </span>
            <span className="text-base sm:text-lg font-black text-forge-400">
              {project.innovationScore}/100
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Practicality
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-400">
              {project.practicalityScore}/100
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Placement Fit
            </span>
            <span className="text-base sm:text-lg font-black text-brand-violet">
              {project.placementRelevance}/100
            </span>
          </div>
        </div>
      </div>

      {/* Blueprint Tabs Navigation */}
      <div className="border-b border-slate-800 overflow-x-auto">
        <nav className="flex space-x-1 pb-1" aria-label="Blueprint Tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 border-b-2 ${
                  isActive
                    ? 'border-forge-500 text-forge-400 bg-slate-900/60'
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/40'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-forge-500/30 text-forge-300">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active Tab Content */}
      <div className="pt-2">
        {activeTab === 'overview' && <OverviewTab project={project} />}
        {activeTab === 'features' && <FeaturesTab project={project} />}
        {activeTab === 'tech' && <TechStackTab project={project} />}
        {activeTab === 'architecture' && <ArchitectureDiagram project={project} />}
        {activeTab === 'database' && <DatabaseDesignTab project={project} />}
        {activeTab === 'api' && <ApiDesignTab project={project} />}
        {activeTab === 'roadmap' && (
          <RoadmapTab
            project={project}
            completedTaskIds={completedTaskIds}
            onToggleTask={onToggleTask}
          />
        )}
        {activeTab === 'mentor' && <MentorTab project={project} />}
        {activeTab === 'improve' && (
          <ImproveTab
            project={project}
            onProjectUpdated={onProjectUpdated}
            onToast={onToast}
          />
        )}
      </div>
    </div>
  );
};
