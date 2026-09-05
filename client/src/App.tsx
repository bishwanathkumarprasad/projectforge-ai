import React, { useState, useEffect } from 'react';
import {
  ProjectIdea,
  StudentProfile,
  ToastNotification,
} from './types';
import { api } from './services/api';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { HeroSection } from './components/landing/HeroSection';
import { HowItWorks } from './components/landing/HowItWorks';
import { Capabilities } from './components/landing/Capabilities';
import { SampleShowcase } from './components/landing/SampleShowcase';
import { FaqSection } from './components/landing/FaqSection';
import { GeneratorWizard } from './components/generator/GeneratorWizard';
import { ProjectCard } from './components/cards/ProjectCard';
import { FilterSortBar } from './components/cards/FilterSortBar';
import { ComparisonBar } from './components/cards/ComparisonBar';
import { ProjectBlueprintModal } from './components/blueprint/ProjectBlueprintModal';
import { ComparisonModal } from './components/comparison/ComparisonModal';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { SynopsisExportModal } from './components/export/SynopsisExportModal';
import { Sparkles, Compass, AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation & View State
  const [activeView, setActiveView] = useState<'landing' | 'generator' | 'feed' | 'blueprint' | 'dashboard' | 'saved'>('landing');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  // Project state
  const [projects, setProjects] = useState<ProjectIdea[]>([]);
  const [activeProject, setActiveProject] = useState<ProjectIdea | null>(null);
  const [initialBlueprintTab, setInitialBlueprintTab] = useState<string>('overview');

  // Comparison & Saved & Progress states with LocalStorage resilience
  const [savedProjectIds, setSavedProjectIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('projectforge_saved_ids');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [comparedProjectIds, setComparedProjectIds] = useState<string[]>([]);
  const [completedTasksByProject, setCompletedTasksByProject] = useState<Record<string, string[]>>(() => {
    try {
      const raw = localStorage.getItem('projectforge_roadmap_tasks');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [exportProject, setExportProject] = useState<ProjectIdea | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('projectforge_saved_ids', JSON.stringify(savedProjectIds));
    } catch {}
  }, [savedProjectIds]);

  useEffect(() => {
    try {
      localStorage.setItem('projectforge_roadmap_tasks', JSON.stringify(completedTasksByProject));
    } catch {}
  }, [completedTasksByProject]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  // Generator & UI Loading states
  const [isGenerating, setIsGenerating] = useState(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: ToastNotification['type'] = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Initial load: Check AI status and pre-load demo catalog
  useEffect(() => {
    api.getAiStatus()
      .then(status => {
        setIsDemoMode(status.mode === 'demo');
      })
      .catch(err => {
        console.warn('Backend AI status check error, running in demo mode:', err);
        setIsDemoMode(true);
      });

    // Fetch initial projects
    api.getDemoProjects()
      .then(res => {
        if (res.success && res.projects) {
          setProjects(res.projects);
        }
      })
      .catch(err => console.warn('Could not fetch demo catalog:', err));

    // Fetch user saved projects
    api.getSavedProjects()
      .then(res => {
        if (res.success && res.projects) {
          setSavedProjectIds(res.projects.map(p => p.id));
        }
      })
      .catch(err => console.warn('Could not fetch saved projects:', err));
  }, []);

  // Handle Project Generation
  const handleGenerateProjects = async (profile: StudentProfile) => {
    if (isGenerating) return;
    setIsGenerating(true);
    try {
      const res = await api.generateProjects(profile);
      if (res.success && res.projects && res.projects.length > 0) {
        setProjects(res.projects);
        setActiveView('feed');
        showToast(
          `Synthesized ${res.projects.length} personalized capstone project blueprints!`,
          'success'
        );
      } else {
        throw new Error('No project blueprints were generated. Please try again.');
      }
    } catch (err: any) {
      showToast(err.message || 'Error generating projects', 'error');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  // Saved toggle
  const handleToggleSave = async (project: ProjectIdea) => {
    const isSaved = savedProjectIds.includes(project.id);
    try {
      if (isSaved) {
        await api.removeSavedProject(project.id);
        setSavedProjectIds(prev => prev.filter(id => id !== project.id));
        showToast(`Removed "${project.title.split(':')[0]}" from saved projects.`, 'info');
      } else {
        await api.saveProject(project.id);
        setSavedProjectIds(prev => [...prev, project.id]);
        showToast(`Saved "${project.title.split(':')[0]}" to your dashboard!`, 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update saved status', 'error');
    }
  };

  // Compare toggle
  const handleToggleCompare = (project: ProjectIdea) => {
    setComparedProjectIds(prev => {
      if (prev.includes(project.id)) {
        return prev.filter(id => id !== project.id);
      }
      if (prev.length >= 3) {
        showToast('You can compare a maximum of 3 projects simultaneously.', 'warning');
        return prev;
      }
      showToast(`Added "${project.title.split(':')[0]}" to compare matrix.`, 'info');
      return [...prev, project.id];
    });
  };

  // Roadmap task completion toggle
  const handleToggleTask = async (taskId: string) => {
    if (!activeProject) return;

    const projectId = activeProject.id;
    const currentCompleted = completedTasksByProject[projectId] || [];
    const isCurrentlyDone = currentCompleted.includes(taskId);

    const updated = isCurrentlyDone
      ? currentCompleted.filter(id => id !== taskId)
      : [...currentCompleted, taskId];

    setCompletedTasksByProject(prev => ({
      ...prev,
      [projectId]: updated,
    }));

    try {
      await api.updateRoadmapProgress(projectId, updated);
    } catch (err) {
      console.warn('Could not sync roadmap progress to server:', err);
    }
  };

  // Open Blueprint
  const handleOpenBlueprint = (project: ProjectIdea, tab: string = 'overview') => {
    setActiveProject(project);
    setInitialBlueprintTab(tab);
    setActiveView('blueprint');

    // Fetch existing roadmap progress for this project if not loaded
    if (!completedTasksByProject[project.id]) {
      api.getRoadmapProgress(project.id).then(res => {
        if (res.success && res.completedTaskIds) {
          setCompletedTasksByProject(prev => ({
            ...prev,
            [project.id]: res.completedTaskIds,
          }));
        }
      }).catch(() => {});
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered & Sorted Projects computation
  const uniqueDomains = Array.from(new Set(projects.map(p => p.domain)));

  const filteredProjects = projects.filter(p => {
    // Saved filter view
    if (activeView === 'saved' && !savedProjectIds.includes(p.id)) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchTagline = p.tagline.toLowerCase().includes(q);
      const matchProblem = p.problemStatement.toLowerCase().includes(q);
      const matchDomain = p.domain.toLowerCase().includes(q);
      const matchTech = p.recommendedTechnologies.some(t => t.name.toLowerCase().includes(q));
      if (!matchTitle && !matchTagline && !matchProblem && !matchDomain && !matchTech) {
        return false;
      }
    }

    // Domain filter
    if (selectedDomain !== 'all' && p.domain !== selectedDomain) {
      return false;
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all' && p.difficulty !== selectedDifficulty) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'innovation') return b.innovationScore - a.innovationScore;
    if (sortBy === 'practicality') return b.practicalityScore - a.practicalityScore;
    if (sortBy === 'placement') return b.placementRelevance - a.placementRelevance;
    return 0;
  });

  const comparedProjectsList = projects.filter(p => comparedProjectIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-forge-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={view => {
          setActiveView(view as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedProjectIds.length}
        compareCount={comparedProjectIds.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        isDemoMode={isDemoMode}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* VIEW 1: LANDING PAGE */}
        {activeView === 'landing' && (
          <div>
            <HeroSection
              onStartGenerator={() => {
                setActiveView('generator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreDemo={() => {
                const target = document.getElementById('how-it-works');
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
              isDemoMode={isDemoMode}
            />

            <HowItWorks />

            <SampleShowcase
              demoProjects={projects}
              onSelectProject={p => handleOpenBlueprint(p, 'overview')}
            />

            <Capabilities />

            <FaqSection />
          </div>
        )}

        {/* VIEW 2: GENERATOR WIZARD */}
        {activeView === 'generator' && (
          <div className="py-6">
            <GeneratorWizard
              onGenerate={handleGenerateProjects}
              isLoading={isGenerating}
              onCancel={() => setActiveView('landing')}
            />
          </div>
        )}

        {/* VIEW 3: PROJECT IDEAS FEED OR SAVED VIEW */}
        {(activeView === 'feed' || activeView === 'saved') && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeView === 'saved' ? 'Saved Projects' : 'Synthesized Project Blueprints'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {activeView === 'saved'
                    ? 'Your pinned capstone ideas ready for thesis defense and roadmap continuation.'
                    : 'Tailored to your skills, timeframe, and academic difficulty constraints.'}
                </p>
              </div>

              {activeView === 'feed' && (
                <button
                  onClick={() => setActiveView('generator')}
                  className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-forge-400" />
                  <span>Adjust Form & Regenerate</span>
                </button>
              )}
            </div>

            {/* Filter & Sort Bar */}
            <FilterSortBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDomain={selectedDomain}
              setSelectedDomain={setSelectedDomain}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              sortBy={sortBy}
              setSortBy={setSortBy}
              domains={uniqueDomains}
              totalCount={activeView === 'saved' ? savedProjectIds.length : projects.length}
              filteredCount={filteredProjects.length}
              onReset={() => {
                setSearchQuery('');
                setSelectedDomain('all');
                setSelectedDifficulty('all');
                setSortBy('relevance');
              }}
            />

            {/* Cards Grid */}
            {filteredProjects.length === 0 ? (
              <div className="p-16 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No matching projects found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {activeView === 'saved'
                    ? 'You have not saved any projects yet. Browse the catalog and click the bookmark button.'
                    : 'Try clearing your search query or selecting a different domain filter.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onViewBlueprint={p => handleOpenBlueprint(p, 'overview')}
                    onSaveToggle={handleToggleSave}
                    isSaved={savedProjectIds.includes(project.id)}
                    onCompareToggle={handleToggleCompare}
                    isCompared={comparedProjectIds.includes(project.id)}
                    onOpenMentor={p => handleOpenBlueprint(p, 'mentor')}
                    onOpenImprove={p => handleOpenBlueprint(p, 'improve')}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: DETAILED PROJECT BLUEPRINT */}
        {activeView === 'blueprint' && activeProject && (
          <ProjectBlueprintModal
            project={activeProject}
            onBack={() => setActiveView('feed')}
            isSaved={savedProjectIds.includes(activeProject.id)}
            onToggleSave={handleToggleSave}
            isCompared={comparedProjectIds.includes(activeProject.id)}
            onToggleCompare={handleToggleCompare}
            completedTaskIds={completedTasksByProject[activeProject.id] || []}
            onToggleTask={handleToggleTask}
            onOpenExport={p => setExportProject(p)}
            onProjectUpdated={updated => {
              setActiveProject(updated);
              setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));
            }}
            onToast={showToast}
            initialTab={initialBlueprintTab}
          />
        )}

        {/* VIEW 5: STUDENT DASHBOARD */}
        {activeView === 'dashboard' && (
          <StudentDashboard
            onOpenProject={(project, tab) => handleOpenBlueprint(project, tab || 'overview')}
            onLaunchGenerator={() => {
              setActiveView('generator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Floating Comparison Dock */}
      <ComparisonBar
        comparedProjects={comparedProjectsList}
        onRemove={id => setComparedProjectIds(prev => prev.filter(item => item !== id))}
        onClear={() => setComparedProjectIds([])}
        onOpenCompare={() => setIsCompareModalOpen(true)}
      />

      {/* Multi-Project Comparison Modal */}
      {isCompareModalOpen && (
        <ComparisonModal
          projects={comparedProjectsList}
          onClose={() => setIsCompareModalOpen(false)}
          onSelectProject={p => {
            setIsCompareModalOpen(false);
            handleOpenBlueprint(p, 'overview');
          }}
        />
      )}

      {/* Academic Synopsis Export Modal */}
      {exportProject && (
        <SynopsisExportModal
          project={exportProject}
          onClose={() => setExportProject(null)}
          onToast={showToast}
        />
      )}

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
