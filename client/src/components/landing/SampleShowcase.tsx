import React, { useState } from 'react';
import { ProjectIdea } from '../../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Clock,
  Gauge,
  TrendingUp,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface SampleShowcaseProps {
  demoProjects: ProjectIdea[];
  onSelectProject: (project: ProjectIdea) => void;
}

export const SampleShowcase: React.FC<SampleShowcaseProps> = ({
  demoProjects,
  onSelectProject,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!demoProjects || demoProjects.length === 0) return null;

  const currentProject = demoProjects[selectedIndex] || demoProjects[0];

  return (
    <section className="py-20 border-t border-slate-800/60 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Interactive Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Explore Example Project Journeys
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Click across real engineering project blueprints to inspect system design, core MVP features, and development roadmaps.
          </p>
        </div>

        {/* Project Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {demoProjects.slice(0, 4).map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedIndex(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                selectedIndex === idx
                  ? 'bg-forge-600 text-white border-forge-500 shadow-glow'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{p.domain.split('/')[0]}</span>
              <span className="text-[11px] opacity-75 font-normal hidden sm:inline">
                • {p.title.split(':')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Highlighted Blueprint Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-900/70 border border-slate-800/90 overflow-hidden shadow-2xl p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            {/* Left Overview Column */}
            <div className="flex-1 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-forge-500/20 text-forge-300 border border-forge-500/30">
                  {currentProject.domain}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {currentProject.difficulty} Difficulty
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {currentProject.estimatedDuration}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {currentProject.title}
                </h3>
                <p className="text-sm text-cyan-300 font-medium mt-1">
                  {currentProject.tagline}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Problem & Solution Summary
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentProject.problemStatement}
                </p>
              </div>

              {/* Technologies Pill Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Recommended Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.recommendedTechnologies.slice(0, 6).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/90 text-slate-200 border border-slate-700/80"
                      title={tech.reason}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectProject(currentProject)}
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-forge-600 to-brand-violet text-white shadow-glow hover:brightness-110 transition-all flex items-center gap-2 group"
                >
                  <span>Open Full Project Blueprint</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Metric & Roadmap Preview Column */}
            <div className="w-full lg:w-80 shrink-0 space-y-4">
              {/* Score Radar Box */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-forge-400" />
                  <span>Evaluation Metrics</span>
                </h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Innovation Score</span>
                      <span className="text-forge-400 font-bold">{currentProject.innovationScore}/100</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-forge-500 to-cyan-400 rounded-full"
                        style={{ width: `${currentProject.innovationScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Practicality Score</span>
                      <span className="text-emerald-400 font-bold">{currentProject.practicalityScore}/100</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                        style={{ width: `${currentProject.practicalityScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Placement Relevance</span>
                      <span className="text-purple-400 font-bold">{currentProject.placementRelevance}/100</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-brand-violet rounded-full"
                        style={{ width: `${currentProject.placementRelevance}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Roadmap Phases Snapshot */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Roadmap Phases Preview
                </h4>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {currentProject.roadmap.slice(0, 4).map(phase => (
                    <div key={phase.phaseNumber} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forge-400 shrink-0" />
                      <span className="truncate">Phase {phase.phaseNumber}: {phase.phaseName}</span>
                    </div>
                  ))}
                  <div className="text-[11px] text-slate-500 pl-5">+ 4 more development phases</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
