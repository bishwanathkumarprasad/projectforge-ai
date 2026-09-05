import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  Cpu,
  Layers,
  Terminal,
  CheckCircle2,
} from 'lucide-react';

interface HeroSectionProps {
  onStartGenerator: () => void;
  onExploreDemo: () => void;
  isDemoMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartGenerator,
  onExploreDemo,
  isDemoMode,
}) => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-forge-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-brand-violet/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-inner mb-8">
          <Sparkles className="w-4 h-4 text-forge-400" />
          <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-forge-300 via-white to-purple-300 bg-clip-text text-transparent">
            AI-Powered Final-Year Project Idea Generator & Development Mentor
          </span>
        </div>

        {/* Primary Hero Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
          Turn Your Skills Into Your{' '}
          <span className="bg-gradient-to-r from-forge-400 via-cyan-300 to-brand-violet bg-clip-text text-transparent">
            Final-Year Project
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          Generate personalized project ideas, plan your architecture, choose the right technologies, and build your project with AI guidance.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartGenerator}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-forge-600 via-forge-500 to-brand-violet text-white shadow-glow hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-3 group"
          >
            <span>Generate Project Ideas</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-5 h-5 text-forge-400" />
            <span>Explore How It Works</span>
          </button>
        </div>

        {/* Proof & Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <div className="flex items-center gap-2 text-forge-400 mb-1">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Architecture</span>
            </div>
            <p className="text-xs text-slate-400">Interactive SVG data flow & modular diagrams</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <div className="flex items-center gap-2 text-brand-cyan mb-1">
              <Terminal className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">8-Phase Roadmap</span>
            </div>
            <p className="text-xs text-slate-400">Actionable tasks with interactive progress</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <div className="flex items-center gap-2 text-brand-violet mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Socratic Mentor</span>
            </div>
            <p className="text-xs text-slate-400">Grounded Q&A locked to your project stack</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Academic Ready</span>
            </div>
            <p className="text-xs text-slate-400">Formal synopsis export for faculty approval</p>
          </div>
        </div>
      </div>
    </section>
  );
};
