import React, { useState } from 'react';
import {
  Sparkles,
  Bookmark,
  Layers,
  LayoutDashboard,
  Compass,
  Menu,
  X,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  savedCount: number;
  compareCount: number;
  onOpenCompare: () => void;
  isDemoMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  savedCount,
  compareCount,
  onOpenCompare,
  isDemoMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Compass },
    { id: 'generator', label: 'Idea Generator', icon: Sparkles, highlight: true },
    { id: 'dashboard', label: 'My Journey', icon: LayoutDashboard },
    { id: 'saved', label: 'Saved', icon: Bookmark, badge: savedCount },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-forge-500 rounded-lg p-1 group text-left"
            aria-label="ProjectForge AI Homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forge-500 to-brand-violet flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-forge-300 bg-clip-text text-transparent">
                  ProjectForge
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-forge-500/20 text-forge-400 border border-forge-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Final-Year Capstone Architect
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-forge-500/15 text-forge-400 border border-forge-500/30 shadow-sm'
                      : item.highlight
                      ? 'bg-forge-600 text-white hover:bg-forge-500 shadow-glow font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-forge-500/30 text-forge-300 border border-forge-500/40">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Compare Drawer Trigger */}
            <button
              onClick={onOpenCompare}
              disabled={compareCount < 2}
              className={`ml-1 px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                compareCount >= 2
                  ? 'bg-brand-violet/20 text-brand-violet border border-brand-violet/40 hover:bg-brand-violet/30 cursor-pointer'
                  : 'text-slate-500 hover:text-slate-400 cursor-not-allowed opacity-60'
              }`}
              title={compareCount < 2 ? 'Select at least 2 projects to compare' : 'Compare selected projects'}
            >
              <Layers className="w-4 h-4" />
              <span>Compare</span>
              {compareCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-brand-violet/30 text-purple-200">
                  {compareCount}/3
                </span>
              )}
            </button>
          </nav>

          {/* Engine Status Badge & Direct CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                !isDemoMode
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
              title={
                !isDemoMode
                  ? 'Google Gemini AI engine connected'
                  : 'Operating in authentic Demo Mode with pre-computed realistic blueprints'
              }
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    !isDemoMode ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    !isDemoMode ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
              </span>
              <span>{!isDemoMode ? 'Gemini 2.0 AI' : 'Demo Mode'}</span>
            </div>

            {activeView !== 'generator' && (
              <button
                onClick={() => setActiveView('generator')}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-forge-600 to-brand-violet text-white hover:brightness-110 shadow-glow transition-all"
              >
                Launch Generator
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-forge-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-3 pb-5 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-forge-500/20 text-forge-300 border border-forge-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-forge-500/30 text-forge-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <button
            onClick={() => {
              onOpenCompare();
              setMobileMenuOpen(false);
            }}
            disabled={compareCount < 2}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900"
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-brand-violet" />
              <span>Compare Projects</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-brand-violet/30 text-purple-200">
              {compareCount}/3
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
