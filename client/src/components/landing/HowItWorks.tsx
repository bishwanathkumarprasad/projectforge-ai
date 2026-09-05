import React from 'react';
import { UserCheck, Sparkles, Layers, Bot, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Define Profile & Skills',
      description: 'Enter your branch, programming languages, databases, team size, and available timeframe (1-3 mos or full semester).',
      icon: UserCheck,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      step: '02',
      title: 'AI Generates Tailored Ideas',
      description: 'The engine evaluates feasibility, placement value, and novelty to construct 5–6 unique capstone concepts.',
      icon: Sparkles,
      color: 'from-cyan-500 to-forge-500',
    },
    {
      step: '03',
      title: 'Explore Deep Blueprints',
      description: 'Review tiered MVP features, why each tech was chosen, interactive SVG architecture diagrams, and database schemas.',
      icon: Layers,
      color: 'from-forge-500 to-brand-violet',
    },
    {
      step: '04',
      title: 'Build with AI Project Mentor',
      description: 'Follow the 8-phase actionable development roadmap and ask grounded follow-up questions to bypass blockers.',
      icon: Bot,
      color: 'from-brand-violet to-purple-400',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 border-t border-slate-800/60 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-forge-400 bg-forge-500/10 px-3 py-1 rounded-full border border-forge-500/20">
            End-to-End Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            How ProjectForge AI Works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            From an uncertain concept to a fully planned, faculty-ready engineering capstone in four guided steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-forge-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-600 group-hover:text-forge-400 transition-colors">
                      {item.step}
                    </span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-forge-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
