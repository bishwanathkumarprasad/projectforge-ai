import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import {
  ACADEMIC_BRANCHES,
  ACADEMIC_SEMESTERS,
  INTEREST_CATEGORIES,
  SKILL_TAXONOMY,
  DIFFICULTY_OPTIONS,
  DURATION_OPTIONS,
  ORIENTATION_OPTIONS,
} from '../../data/taxonomy';
import {
  User,
  Sparkles,
  Code2,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  Loader2,
  Users,
  Calendar,
  Layers,
} from 'lucide-react';

interface GeneratorWizardProps {
  onGenerate: (profile: StudentProfile) => Promise<void>;
  isLoading: boolean;
  onCancel?: () => void;
}

export const GeneratorWizard: React.FC<GeneratorWizardProps> = ({
  onGenerate,
  isLoading,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [customInterestInput, setCustomInterestInput] = useState('');

  const [profile, setProfile] = useState<StudentProfile>({
    name: '',
    academicBranch: ACADEMIC_BRANCHES[0],
    currentSemester: ACADEMIC_SEMESTERS[0],
    projectType: 'team',
    teamSize: 3,
    interests: ['AI & Machine Learning', 'Web Development'],
    skills: {
      programming: ['Python', 'TypeScript'],
      frameworks: ['React', 'FastAPI'],
      ai: ['Deep Learning (PyTorch)'],
      databases: ['PostgreSQL'],
      cloud: ['Docker & Containerization'],
    },
    difficulty: 'Intermediate',
    duration: '3-6 months',
    budget: 'Zero ($0)',
    hardware: 'Software only',
    projectOrientation: 'placement',
    careerGoal: '',
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const steps = [
    { num: 1, title: 'Student Profile', icon: User },
    { num: 2, title: 'Interests', icon: Sparkles },
    { num: 3, title: 'Technical Skills', icon: Code2 },
    { num: 4, title: 'Preferences', icon: Sliders },
    { num: 5, title: 'Review & Launch', icon: CheckCircle2 },
  ];

  // Helper toggle functions
  const toggleInterest = (interestName: string) => {
    setProfile(prev => {
      const exists = prev.interests.includes(interestName);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter(i => i !== interestName)
          : [...prev.interests, interestName],
      };
    });
  };

  const addCustomInterest = () => {
    const trimmed = customInterestInput.trim();
    if (trimmed && !profile.interests.includes(trimmed)) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, trimmed],
      }));
      setCustomInterestInput('');
    }
  };

  const toggleSkill = (category: keyof StudentProfile['skills'], skill: string) => {
    setProfile(prev => {
      const list = prev.skills[category];
      const exists = list.includes(skill);
      return {
        ...prev,
        skills: {
          ...prev.skills,
          [category]: exists ? list.filter(s => s !== skill) : [...list, skill],
        },
      };
    });
  };

  const handleNext = () => {
    setErrorMsg(null);
    if (currentStep === 1) {
      if (!profile.academicBranch) {
        setErrorMsg('Please select your academic branch.');
        return;
      }
    } else if (currentStep === 2) {
      if (profile.interests.length === 0) {
        setErrorMsg('Please select or enter at least one area of interest.');
        return;
      }
    }
    setCurrentStep(prev => Math.min(5, prev + 1));
  };

  const handlePrev = () => {
    setErrorMsg(null);
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setErrorMsg(null);
    try {
      await onGenerate(profile);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to generate project ideas. Please retry.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Wizard Header Stepper */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-forge-400">
            Step {currentStep} of 5
          </span>
          <span className="text-xs text-slate-400">
            {steps[currentStep - 1].title}
          </span>
        </div>

        {/* Visual Progress Bar & Step Chips */}
        <div className="grid grid-cols-5 gap-2">
          {steps.map(step => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            const Icon = step.icon;
            return (
              <button
                key={step.num}
                onClick={() => currentStep > step.num && setCurrentStep(step.num)}
                disabled={currentStep < step.num}
                className={`py-2 px-1 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                  isCurrent
                    ? 'bg-forge-600 text-white border-forge-500 shadow-glow'
                    : isCompleted
                    ? 'bg-slate-900 text-emerald-400 border-emerald-500/30 cursor-pointer hover:bg-slate-800'
                    : 'bg-slate-950/50 text-slate-500 border-slate-800 cursor-not-allowed'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline truncate">{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Alert if any */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Card Container for Form Steps */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl min-h-[420px] flex flex-col justify-between">
        {/* STEP 1: Student Profile */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white">Student Profile</h2>
              <p className="text-slate-400 text-sm mt-1">
                Tell us about your academic standing and team requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Name / Team Leader Alias (Optional)
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-forge-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Academic Branch *
                </label>
                <select
                  value={profile.academicBranch}
                  onChange={e => setProfile({ ...profile, academicBranch: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-forge-500"
                >
                  {ACADEMIC_BRANCHES.map(branch => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Current Semester *
                </label>
                <select
                  value={profile.currentSemester}
                  onChange={e => setProfile({ ...profile, currentSemester: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-forge-500"
                >
                  {ACADEMIC_SEMESTERS.map(sem => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Project Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setProfile({ ...profile, projectType: 'individual', teamSize: 1 })}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                      profile.projectType === 'individual'
                        ? 'bg-forge-600 text-white border-forge-500'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    Individual (1 Member)
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfile({ ...profile, projectType: 'team', teamSize: 3 })}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                      profile.projectType === 'team'
                        ? 'bg-forge-600 text-white border-forge-500'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    Team Project
                  </button>
                </div>
              </div>

              {profile.projectType === 'team' && (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Team Size: {profile.teamSize} Students
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={6}
                    value={profile.teamSize}
                    onChange={e => setProfile({ ...profile, teamSize: parseInt(e.target.value, 10) })}
                    className="w-full accent-forge-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>2 Members</span>
                    <span>3 Members</span>
                    <span>4 Members</span>
                    <span>5 Members</span>
                    <span>6 Members</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Interests */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white">Domains & Areas of Interest</h2>
              <p className="text-slate-400 text-sm mt-1">
                Select areas you are eager to explore. Ideas will intersect these themes.
              </p>
            </div>

            {/* Interest Badges Grid */}
            <div className="flex flex-wrap gap-2.5 max-h-64 overflow-y-auto pr-2">
              {INTEREST_CATEGORIES.map(cat => {
                const isSelected = profile.interests.includes(cat.name);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleInterest(cat.name)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 ${
                      isSelected
                        ? 'bg-forge-500/25 text-white border-forge-400 shadow-sm'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{cat.name}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-forge-400" />}
                  </button>
                );
              })}
            </div>

            {/* Custom Interest Input */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Add Custom Interest or Specialized Niche
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customInterestInput}
                  onChange={e => setCustomInterestInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustomInterest())}
                  placeholder="e.g. Brain-Computer Interfaces, Autonomous Drones, Micro-Grids..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-forge-500"
                />
                <button
                  type="button"
                  onClick={addCustomInterest}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              {profile.interests.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                  <span className="text-xs text-slate-500 mr-1">Active:</span>
                  {profile.interests.map(item => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-forge-950/80 text-forge-300 border border-forge-800/80 flex items-center gap-1.5"
                    >
                      <span>{item}</span>
                      <button
                        onClick={() => toggleInterest(item)}
                        className="hover:text-rose-400 focus:outline-none"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Skills */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white">Technical Skills & Familiarity</h2>
              <p className="text-slate-400 text-sm mt-1">
                Select the tools, languages, and frameworks you or your team already know or wish to learn.
              </p>
            </div>

            <div className="space-y-5 max-h-80 overflow-y-auto pr-2">
              {/* Languages */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-forge-400 mb-2">
                  Programming Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILL_TAXONOMY.programming.map(lang => {
                    const isSelected = profile.skills.programming.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleSkill('programming', lang)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-forge-600 text-white border-forge-500'
                            : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Frameworks */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                  Frameworks & Libraries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILL_TAXONOMY.frameworks.map(fw => {
                    const isSelected = profile.skills.frameworks.includes(fw);
                    return (
                      <button
                        key={fw}
                        type="button"
                        onClick={() => toggleSkill('frameworks', fw)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-cyan-600 text-white border-cyan-500'
                            : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {fw}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI/ML */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-violet mb-2">
                  AI, Machine Learning & Algorithms
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILL_TAXONOMY.ai.map(tool => {
                    const isSelected = profile.skills.ai.includes(tool);
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleSkill('ai', tool)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-brand-violet text-white border-purple-500'
                            : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Databases */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  Databases & Storage
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILL_TAXONOMY.databases.map(db => {
                    const isSelected = profile.skills.databases.includes(db);
                    return (
                      <button
                        key={db}
                        type="button"
                        onClick={() => toggleSkill('databases', db)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {db}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cloud & DevOps */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Cloud, Containers & DevOps
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILL_TAXONOMY.cloud.map(c => {
                    const isSelected = profile.skills.cloud.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleSkill('cloud', c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-amber-600 text-white border-amber-500'
                            : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Preferences & Constraints */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white">Project Constraints & Goals</h2>
              <p className="text-slate-400 text-sm mt-1">
                Align the generation engine with your timeline, budget, and academic objectives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Difficulty */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Difficulty Level
                </label>
                <div className="space-y-2">
                  {DIFFICULTY_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setProfile({ ...profile, difficulty: opt.value as any })}
                      className={`w-full p-3 rounded-xl text-left border transition-all ${
                        profile.difficulty === opt.value
                          ? 'bg-forge-500/20 border-forge-500 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-bold text-xs">{opt.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Orientation */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Primary Orientation
                </label>
                <div className="space-y-2">
                  {ORIENTATION_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setProfile({ ...profile, projectOrientation: opt.value as any })}
                      className={`w-full p-3 rounded-xl text-left border transition-all ${
                        profile.projectOrientation === opt.value
                          ? 'bg-brand-violet/20 border-brand-violet text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-bold text-xs">{opt.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Available Development Time
                </label>
                <select
                  value={profile.duration}
                  onChange={e => setProfile({ ...profile, duration: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-forge-500"
                >
                  {DURATION_OPTIONS.map(d => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hardware Requirements */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Hardware Availability
                </label>
                <select
                  value={profile.hardware}
                  onChange={e => setProfile({ ...profile, hardware: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-forge-500"
                >
                  <option value="Software only">Pure Software / Web / Cloud only</option>
                  <option value="Raspberry Pi / Arduino / Sensors">IoT / Microcontrollers / Breadboard Sensors</option>
                  <option value="GPU workstation">Dedicated High-End GPU Workstation</option>
                  <option value="Mobile device">Smartphone Sensors (Camera, Gyroscope, GPS)</option>
                </select>
              </div>

              {/* Budget */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Target Cloud / Hardware Budget
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Zero ($0)', 'Low (<$50)', 'Moderate ($50-$200)'] as const).map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setProfile({ ...profile, budget: b })}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        profile.budget === b
                          ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Review & Generate */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white">Review Profile Summary</h2>
              <p className="text-slate-400 text-sm mt-1">
                Verify your parameters. Click any section below if you wish to adjust it before generating.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Academic Focus
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">{profile.academicBranch}</p>
                <p className="text-xs text-slate-400">{profile.currentSemester} • {profile.projectType === 'team' ? `${profile.teamSize} Member Team` : 'Individual'}</p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Target Horizon & Difficulty
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">{profile.difficulty} Level</p>
                <p className="text-xs text-slate-400">{profile.duration} • Budget: {profile.budget}</p>
              </div>

              <div className="sm:col-span-2 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Target Interests
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {profile.interests.map(i => (
                    <span key={i} className="px-2 py-0.5 rounded text-xs bg-forge-950 text-forge-300 border border-forge-800">
                      {i}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Core Skills Selected ({Object.values(profile.skills).flat().length} tools)
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {Object.values(profile.skills).flat().map(tool => (
                    <span key={tool} className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {isLoading && (
              <div className="p-6 rounded-2xl bg-forge-950/60 border border-forge-800/80 text-center space-y-3">
                <Loader2 className="w-8 h-8 text-forge-400 animate-spin mx-auto" />
                <h4 className="text-base font-bold text-white">Synthesizing Capstone Blueprints</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Architecting multi-tier features, generating 8-phase roadmaps, and evaluating placement relevance...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="pt-8 border-t border-slate-800/80 flex items-center justify-between mt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : (
            <div>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              )}
            </div>
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-forge-600 text-white shadow-glow hover:bg-forge-500 transition-all flex items-center gap-2"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-forge-600 via-forge-500 to-brand-violet text-white shadow-glow hover:brightness-110 active:scale-98 transition-all flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Blueprints...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate My Project Ideas</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
