import React from 'react';
import { ProjectIdea, TechnologyItem } from '../../types';
import {
  Globe,
  Server,
  Database,
  Bot,
  Cloud,
  Lock,
  Boxes,
  Zap,
  HardDrive,
  CheckCircle2,
} from 'lucide-react';

export const TechStackTab: React.FC<{ project: ProjectIdea }> = ({ project }) => {
  const categoryIcons: Record<string, any> = {
    frontend: Globe,
    backend: Server,
    database: Database,
    ai_ml: Bot,
    cloud: Cloud,
    auth: Lock,
    apis: Boxes,
    deployment: Zap,
    cache: HardDrive,
  };

  const categoryLabels: Record<string, string> = {
    frontend: 'Frontend Presentation Layer',
    backend: 'Backend API & Business Logic',
    database: 'Database & Relational Storage',
    ai_ml: 'AI / Machine Learning Engine',
    cloud: 'Cloud Infrastructure & Hosting',
    auth: 'Authentication & Access Security',
    apis: 'APIs & Protocols',
    deployment: 'DevOps, CI/CD & Deployment',
    cache: 'In-Memory Cache & Messaging',
  };

  // Group technologies by category
  const grouped = project.recommendedTechnologies.reduce<Record<string, TechnologyItem[]>>(
    (acc, tech) => {
      const cat = tech.category || 'backend';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(tech);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-forge-500/10 border border-forge-500/20 text-xs sm:text-sm text-forge-300 flex items-center gap-2">
        <Zap className="w-4 h-4 text-forge-400 shrink-0" />
        <span>
          Every technology below was selected specifically to optimize student feasibility, zero-cost development tiers, and academic defense impact.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Object.entries(grouped).map(([category, items]) => {
          const Icon = categoryIcons[category] || Boxes;
          const label = categoryLabels[category] || category;

          return (
            <div
              key={category}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Icon className="w-4 h-4 text-forge-400" />
                <span>{label}</span>
              </div>

              <div className="space-y-2.5">
                {items.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-white">
                        {tech.name}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Recommended
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60">
                      <span className="font-semibold text-forge-300 block mb-0.5">
                        Why this is recommended:
                      </span>
                      {tech.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
