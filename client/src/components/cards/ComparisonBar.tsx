import React from 'react';
import { ProjectIdea } from '../../types';
import { Layers, X, ArrowRight } from 'lucide-react';

interface ComparisonBarProps {
  comparedProjects: ProjectIdea[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onOpenCompare: () => void;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({
  comparedProjects,
  onRemove,
  onClear,
  onOpenCompare,
}) => {
  if (comparedProjects.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 pointer-events-none">
      <div className="pointer-events-auto p-4 rounded-2xl bg-slate-900/95 border border-brand-violet/40 shadow-2xl backdrop-blur-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-violet shrink-0">
            <Layers className="w-4 h-4" />
            <span>Comparing ({comparedProjects.length}/3):</span>
          </div>

          <div className="flex items-center gap-2">
            {comparedProjects.map(p => (
              <div
                key={p.id}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-xs font-medium text-slate-200 border border-slate-700 shrink-0"
              >
                <span className="truncate max-w-[120px]">{p.title.split(':')[0]}</span>
                <button
                  onClick={() => onRemove(p.id)}
                  className="text-slate-400 hover:text-rose-400 focus:outline-none"
                  aria-label={`Remove ${p.title} from comparison`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClear}
            className="text-xs text-slate-400 hover:text-white px-2 py-1"
          >
            Clear
          </button>

          <button
            onClick={onOpenCompare}
            disabled={comparedProjects.length < 2}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              comparedProjects.length >= 2
                ? 'bg-gradient-to-r from-forge-600 to-brand-violet text-white shadow-glow hover:brightness-110'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Compare Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
