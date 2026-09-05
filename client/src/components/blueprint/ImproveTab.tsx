import React, { useState } from 'react';
import { ProjectIdea, ImprovementItem } from '../../types';
import { api } from '../../services/api';
import {
  Sparkles,
  Plus,
  Check,
  Loader2,
  Shield,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface ImproveTabProps {
  project: ProjectIdea;
  onProjectUpdated: (updated: ProjectIdea) => void;
  onToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ImproveTab: React.FC<ImproveTabProps> = ({
  project,
  onProjectUpdated,
  onToast,
}) => {
  const [improvements, setImprovements] = useState<ImprovementItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'MVP',
    'Innovation',
    'Technical',
    'AI',
    'Security',
    'Scalability',
    'Future Scope',
  ];

  const handleFetchImprovements = async () => {
    setIsLoading(true);
    try {
      const res = await api.improveProject(project.id);
      if (res.success) {
        setImprovements(res.improvements);
        setHasLoaded(true);
      }
    } catch (err: any) {
      onToast(err.message || 'Failed to generate improvements.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToBlueprint = async (item: ImprovementItem) => {
    setAddingId(item.id);
    try {
      const res = await api.addImprovementToBlueprint(project.id, item);
      if (res.success) {
        setAddedIds(prev => [...prev, item.id]);
        onProjectUpdated(res.project);
        onToast(`Added "${item.title}" to project features!`, 'success');
      }
    } catch (err: any) {
      onToast(err.message || 'Failed to add improvement to blueprint.', 'error');
    } finally {
      setAddingId(null);
    }
  };

  const filtered =
    selectedCategory === 'all'
      ? improvements
      : improvements.filter(i => i.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>AI Idea Improvement Engine</span>
          </div>
          <h4 className="text-base font-extrabold text-white mt-1">
            Elevate &ldquo;{project.title.split(':')[0]}&rdquo; to Research or Startup Standard
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Discover overlooked edge cases, explainability features, security safeguards, and scalability opportunities.
          </p>
        </div>

        <button
          onClick={handleFetchImprovements}
          disabled={isLoading}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-glow transition-all flex items-center gap-2 shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Architecture...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{hasLoaded ? 'Regenerate Suggestions' : 'Scan & Improve Idea'}</span>
            </>
          )}
        </button>
      </div>

      {!hasLoaded && !isLoading && (
        <div className="text-center py-12 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <Zap className="w-8 h-8 text-amber-400 mx-auto" />
          <h4 className="text-base font-bold text-white">Ready to inspect this blueprint</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Click &ldquo;Scan & Improve Idea&rdquo; to prompt our systems architect model for missing MVP capabilities, security hardening, and academic innovation angles.
          </p>
          <button
            onClick={handleFetchImprovements}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
          >
            Start Scan
          </button>
        </div>
      )}

      {hasLoaded && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Category:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Proposals' : cat}
              </button>
            ))}
          </div>

          {/* Suggestions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(item => {
              const isAdded = addedIds.includes(item.id);
              const isAdding = addingId === item.id;

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {item.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          item.impact === 'Breakthrough'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-forge-500/20 text-forge-300 border border-forge-500/30'
                        }`}
                      >
                        {item.impact} Impact
                      </span>
                    </div>

                    <h5 className="text-sm font-extrabold text-white leading-snug">
                      {item.title}
                    </h5>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.rationale}
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                      <span className="font-semibold text-slate-300 block mb-0.5">
                        Implementation Blueprint:
                      </span>
                      {item.implementationDetail}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Target: {item.targetFeatureTier || 'intermediate'} features
                    </span>

                    <button
                      onClick={() => handleAddToBlueprint(item)}
                      disabled={isAdded || isAdding}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isAdded
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                          : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-amber-400'
                      }`}
                    >
                      {isAdding ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : isAdded ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Added to Blueprint</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Add to Blueprint</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
