import React, { useState } from 'react';
import { ProjectIdea, RoadmapPhase } from '../../types';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Circle,
  Clock,
  Calendar,
  Layers,
  Sparkles,
  Trophy,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface RoadmapTabProps {
  project: ProjectIdea;
  completedTaskIds: string[];
  onToggleTask: (taskId: string) => void;
}

export const RoadmapTab: React.FC<RoadmapTabProps> = ({
  project,
  completedTaskIds,
  onToggleTask,
}) => {
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1, 2, 3]);

  // Calculate total tasks and completion percentage
  const allTasks = project.roadmap.flatMap(phase => phase.tasks);
  const totalTasksCount = allTasks.length;
  const completedCount = allTasks.filter(t => completedTaskIds.includes(t.id)).length;
  const progressPercent =
    totalTasksCount > 0 ? Math.round((completedCount / totalTasksCount) * 100) : 0;

  const togglePhase = (phaseNumber: number) => {
    setExpandedPhases(prev =>
      prev.includes(phaseNumber)
        ? prev.filter(p => p !== phaseNumber)
        : [...prev, phaseNumber]
    );
  };

  const handleTaskClick = (taskId: string) => {
    const isNowCompleting = !completedTaskIds.includes(taskId);
    onToggleTask(taskId);

    // If reaching 100% completion with this task, fire celebration confetti!
    if (isNowCompleting && completedCount + 1 === totalTasksCount) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Interactive Progress Meter Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-forge-400">
              Interactive Semester Milestone Tracker
            </span>
            <h4 className="text-xl font-extrabold text-white mt-0.5 flex items-center gap-2">
              <span>Overall Development Progress</span>
              {progressPercent === 100 && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-bold">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  Capstone Complete!
                </span>
              )}
            </h4>
          </div>

          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-black text-white">
              {progressPercent}%
            </span>
            <span className="text-xs text-slate-400 block">
              {completedCount} of {totalTasksCount} tasks completed
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-forge-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 8-Phase Chronological Timeline */}
      <div className="space-y-4">
        {project.roadmap.map(phase => {
          const isExpanded = expandedPhases.includes(phase.phaseNumber);
          const phaseTasks = phase.tasks;
          const phaseDoneCount = phaseTasks.filter(t => completedTaskIds.includes(t.id)).length;
          const isPhaseFullyDone = phaseDoneCount === phaseTasks.length && phaseTasks.length > 0;

          return (
            <div
              key={phase.phaseNumber}
              className={`rounded-2xl border transition-all ${
                isPhaseFullyDone
                  ? 'bg-slate-900/40 border-emerald-500/30'
                  : 'bg-slate-900/70 border-slate-800'
              }`}
            >
              {/* Phase Header Accordion */}
              <button
                onClick={() => togglePhase(phase.phaseNumber)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-forge-500 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isPhaseFullyDone
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {isPhaseFullyDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      `P${phase.phaseNumber}`
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm sm:text-base font-extrabold text-white">
                        Phase {phase.phaseNumber}: {phase.phaseName}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {phase.objective}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{phase.estimatedDuration}</span>
                  </div>

                  <span className="text-xs font-semibold text-slate-400">
                    {phaseDoneCount}/{phaseTasks.length}
                  </span>

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Task Checklist Items */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 space-y-2.5 border-t border-slate-800/60">
                  {phaseTasks.map(task => {
                    const isDone = completedTaskIds.includes(task.id);
                    return (
                      <div
                        key={task.id}
                        onClick={() => handleTaskClick(task.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isDone
                            ? 'bg-emerald-950/20 border-emerald-500/30 opacity-90'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                        }`}
                        role="checkbox"
                        aria-checked={isDone}
                        tabIndex={0}
                        onKeyDown={e => e.key === ' ' && handleTaskClick(task.id)}
                      >
                        <button
                          type="button"
                          className="mt-0.5 focus:outline-none"
                          aria-label={isDone ? 'Mark task incomplete' : 'Mark task complete'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-500 shrink-0 hover:text-forge-400" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-xs sm:text-sm font-bold leading-tight ${
                                isDone ? 'text-slate-400 line-through' : 'text-white'
                              }`}
                            >
                              {task.title}
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0">
                              ~{task.estimatedDays} days
                            </span>
                          </div>

                          <p className="text-xs text-slate-400 mt-1">
                            {task.description}
                          </p>

                          {/* Deliverables */}
                          {task.deliverables && task.deliverables.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                              <span className="text-[10px] uppercase font-bold text-slate-500">
                                Deliverable:
                              </span>
                              {task.deliverables.map((del, dIdx) => (
                                <span
                                  key={dIdx}
                                  className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono"
                                >
                                  {del}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
