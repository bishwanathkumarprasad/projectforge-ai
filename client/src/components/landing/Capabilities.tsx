import React from 'react';
import {
  Code2,
  Workflow,
  CheckSquare,
  Bot,
  Scale,
  FileDown,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

export const Capabilities: React.FC = () => {
  const capabilities = [
    {
      icon: Code2,
      title: 'Personalized to Your Stack',
      description: 'Never suggests impossible enterprise requirements. Blueprints are tailored to the exact languages, frameworks, and databases you already know.',
      badge: 'Feasibility First',
      color: 'text-forge-400',
    },
    {
      icon: Workflow,
      title: 'Interactive Architecture Blueprint',
      description: 'Visual data flow diagrams showing client apps, API gateways, ML microservices, caching, and database entities with protocol specifications.',
      badge: 'Visual System Design',
      color: 'text-cyan-400',
    },
    {
      icon: CheckSquare,
      title: '8-Phase Development Roadmap',
      description: 'Deconstructs your semester into actionable phases with concrete deliverables, dependency tracking, and interactive milestone checkboxes.',
      badge: 'Sprint Planning',
      color: 'text-emerald-400',
    },
    {
      icon: Bot,
      title: 'Grounded AI Project Mentor',
      description: 'An AI mentor that actually understands your exact project stack. Ask how to divide team tasks, choose databases, or fix architectural bottlenecks.',
      badge: 'Socratic Guidance',
      color: 'text-brand-violet',
    },
    {
      icon: Scale,
      title: 'Multi-Project Comparison Matrix',
      description: 'Compare up to 3 candidate project ideas side-by-side on difficulty, learning curve, cloud costs, and placement relevance with AI recommendations.',
      badge: 'Decision Support',
      color: 'text-amber-400',
    },
    {
      icon: FileDown,
      title: 'Export Academic Synopsis',
      description: 'One-click generate an academic-standard project proposal synopsis formatted for university faculty approvals and thesis submissions.',
      badge: 'Faculty Ready',
      color: 'text-rose-400',
    },
  ];

  return (
    <section className="py-20 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-violet bg-brand-violet/10 px-3 py-1 rounded-full border border-brand-violet/20">
            Why ProjectForge AI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Engineered for Student Success
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            More than just an idea generator — ProjectForge AI delivers a complete, defensible engineering roadmap from inception to viva defense.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${cap.color}`} />
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {cap.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{cap.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
