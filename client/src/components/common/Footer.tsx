import React from 'react';
import { Sparkles, ShieldCheck, Cpu, Terminal, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60 mt-20 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forge-500 to-brand-violet flex items-center justify-center shadow-glow">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                ProjectForge AI
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-forge-500/20 text-forge-400 border border-forge-500/30">
                v1.0
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Empowering computer science and engineering students worldwide to transform raw technical skills into defensible, high-impact final-year capstones with production-grade architecture blueprints.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-forge-400" /> Google Gemini 2.0
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Zod Validated Schemas
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-brand-violet" /> 8-Phase Roadmap
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Platform Features
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-forge-400 transition-colors">Multi-Step Skill Profiler</li>
              <li className="hover:text-forge-400 transition-colors">Visual Architecture Diagrams</li>
              <li className="hover:text-forge-400 transition-colors">Database ER Schema Design</li>
              <li className="hover:text-forge-400 transition-colors">Grounded AI Project Mentor</li>
              <li className="hover:text-forge-400 transition-colors">Interactive 8-Phase Roadmap</li>
            </ul>
          </div>

          {/* Academic Viva Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Academic Support
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-forge-400 transition-colors">Academic Synopsis Export</li>
              <li className="hover:text-forge-400 transition-colors">Multi-Project Comparison</li>
              <li className="hover:text-forge-400 transition-colors">Risk & Mitigation Planning</li>
              <li className="hover:text-forge-400 transition-colors">Socratic Code Hints</li>
              <li className="hover:text-forge-400 transition-colors">Zero-Cost Cloud Guidance</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ProjectForge AI. Designed for engineering students, project guides, and capstone evaluators.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">WCAG 2.1 AA Compliant</span>
            <span>•</span>
            <span className="text-slate-400">Production TypeScript Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
