import React, { useState, useEffect } from 'react';
import { ProjectIdea, ProjectComparisonResponse, StudentProfile } from '../../types';
import { api } from '../../services/api';
import {
  X,
  Layers,
  Sparkles,
  Trophy,
  Loader2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface ComparisonModalProps {
  projects: ProjectIdea[];
  studentProfile?: StudentProfile;
  onClose: () => void;
  onSelectProject: (project: ProjectIdea) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  projects,
  studentProfile,
  onClose,
  onSelectProject,
}) => {
  const [comparisonData, setComparisonData] = useState<ProjectComparisonResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    api.compareProjects(projects.map(p => p.id), studentProfile)
      .then(res => {
        if (isMounted && res.success) {
          setComparisonData(res.comparison);
        }
      })
      .catch(err => {
        if (isMounted) {
          setErrorMsg(err.message || 'Failed to compare projects.');
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [projects, studentProfile]);

  if (projects.length < 2) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-5xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-violet/20 text-brand-violet">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Project Comparison Matrix
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Evaluating {projects.length} candidate final-year project blueprints.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Close comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoading && (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-brand-violet animate-spin mx-auto" />
            <h4 className="text-base font-bold text-white">Synthesizing Comparative Analysis</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Benchmarking difficulty curve, estimated MVP delivery timelines, resource costs, and recruiter appeal...
            </p>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        {!isLoading && comparisonData && (
          <div className="space-y-6">
            {/* Project Header Columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="hidden md:block p-4 font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center">
                Criteria
              </div>
              {projects.map((p, idx) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forge-400">
                    Candidate #{idx + 1}
                  </span>
                  <h4 className="text-sm font-extrabold text-white leading-tight">
                    {p.title.split(':')[0]}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span>{p.domain.split('/')[0]}</span>
                    <span>•</span>
                    <span>{p.difficulty}</span>
                  </div>
                  <button
                    onClick={() => {
                      onSelectProject(p);
                      onClose();
                    }}
                    className="w-full mt-2 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-forge-600 text-slate-200 hover:text-white transition-all"
                  >
                    Open Blueprint
                  </button>
                </div>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <tbody className="divide-y divide-slate-800/80">
                  {comparisonData.comparisonTable.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-800/30">
                      <td className="p-4 font-bold text-slate-300 bg-slate-950/40 w-1/4">
                        {row.criteria}
                      </td>
                      <td className="p-4 text-slate-200 border-l border-slate-800/60">
                        {row.projectA}
                      </td>
                      <td className="p-4 text-slate-200 border-l border-slate-800/60">
                        {row.projectB}
                      </td>
                      {projects.length > 2 && (
                        <td className="p-4 text-slate-200 border-l border-slate-800/60">
                          {row.projectC || '—'}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* AI Recommendation Banner */}
            {comparisonData.recommendation && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-violet/15 via-slate-950 to-forge-950/40 border border-brand-violet/40 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>AI Advisory Recommendation</span>
                </div>

                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  {comparisonData.recommendation.summaryTitle}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {comparisonData.recommendation.detailedReason}
                </p>

                {comparisonData.recommendation.fitFactors && (
                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Key Decision Fit Factors:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {comparisonData.recommendation.fitFactors.map((factor, fIdx) => (
                        <div
                          key={fIdx}
                          className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
