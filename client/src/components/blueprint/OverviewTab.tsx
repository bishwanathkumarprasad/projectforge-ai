import React from 'react';
import { ProjectIdea } from '../../types';
import {
  AlertTriangle,
  CheckCircle2,
  Users,
  HardDrive,
  Target,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

export const OverviewTab: React.FC<{ project: ProjectIdea }> = ({ project }) => {
  return (
    <div className="space-y-8">
      {/* Problem & Solution Double Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Target className="w-4 h-4" />
            <span>Problem Statement</span>
          </div>
          <h4 className="text-base font-bold text-white mb-2">The Core Challenge</h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.problemStatement}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Proposed Solution</span>
          </div>
          <h4 className="text-base font-bold text-white mb-2">Technical Approach</h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.solutionOverview}
          </p>
        </div>
      </div>

      {/* Target Users & Beneficiaries */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
        <div className="flex items-center gap-2 text-forge-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Users className="w-4 h-4" />
          <span>Expected Target Users & Stakeholders</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {project.expectedUsers.map((user, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-200 flex items-center gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-forge-400 shrink-0" />
              <span>{user}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Required Resources & Hardware Setup */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <HardDrive className="w-4 h-4" />
          <span>Required Infrastructure & Development Setup</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {project.requiredResources.map((res, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              <span>{res}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Risks & Mitigation Strategies */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
          <ShieldAlert className="w-4 h-4" />
          <span>Identified Technical Risks & Mitigations (Critical for Viva Defense)</span>
        </div>
        <div className="space-y-3">
          {project.risks.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <div>
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                  Risk #{idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">{item.risk}</p>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-slate-800 pt-2 md:pt-0 md:pl-4">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Recommended Mitigation
                </span>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">{item.mitigation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Scope */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Future Academic & Commercial Scope</span>
        </div>
        <ul className="space-y-2">
          {project.futureScope.map((scope, idx) => (
            <li
              key={idx}
              className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5"
            >
              <span className="text-cyan-400 font-bold">•</span>
              <span>{scope}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
