import React from 'react';
import { ProjectIdea, FeatureTierItem } from '../../types';
import { Zap, Sparkles, CheckCircle2, Clock, PlusCircle } from 'lucide-react';

export const FeaturesTab: React.FC<{ project: ProjectIdea }> = ({ project }) => {
  const renderTier = (
    title: string,
    badgeColor: string,
    features: FeatureTierItem[],
    tagline: string
  ) => {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${badgeColor}`} />
              <span>{title}</span>
              <span className="text-xs text-slate-400 font-normal">
                ({features.length} {features.length === 1 ? 'Feature' : 'Features'})
              </span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">{tagline}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feat, idx) => (
            <div
              key={feat.id || idx}
              className={`p-4 rounded-xl border transition-all ${
                feat.addedByImprovement
                  ? 'bg-brand-violet/10 border-brand-violet/50 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h5 className="text-sm font-bold text-white leading-snug">
                  {feat.title}
                </h5>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      feat.complexity === 'low'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : feat.complexity === 'medium'
                        ? 'bg-forge-500/20 text-forge-300'
                        : 'bg-purple-500/20 text-purple-300'
                    }`}
                  >
                    {feat.complexity}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    {feat.estimatedHours}h
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {feat.description}
              </p>

              {feat.addedByImprovement && (
                <div className="mt-2.5 pt-2 border-t border-brand-violet/30 flex items-center gap-1 text-[11px] font-semibold text-purple-300">
                  <Sparkles className="w-3 h-3 text-brand-violet" />
                  <span>Added via AI Improvement Engine</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* MVP Section */}
      {renderTier(
        'Core Features (MVP — Minimum Viable Product)',
        'bg-emerald-400',
        project.coreFeatures,
        'Essential functionality required to validate the core user journey for initial viva evaluation.'
      )}

      {/* Intermediate Section */}
      {renderTier(
        'Intermediate Capabilities',
        'bg-forge-400',
        project.intermediateFeatures,
        'Secondary workflows, reporting, export utilities, and multi-user access controls.'
      )}

      {/* Advanced Section */}
      {renderTier(
        'Advanced & Scalability Features',
        'bg-brand-violet',
        project.advancedFeatures,
        'Enterprise hardening, real-time WebSockets, streaming analytics, or edge offline synchronization.'
      )}

      {/* AI Features */}
      {renderTier(
        'Dedicated AI / Machine Learning Features',
        'bg-brand-cyan',
        project.aiFeatures,
        'Core algorithmic models, inference pipelines, explainability (SHAP / Grad-CAM), or LLM integrations.'
      )}
    </div>
  );
};
