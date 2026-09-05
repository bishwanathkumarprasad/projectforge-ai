export interface StudentProfile {
  name?: string;
  academicBranch: string;
  currentSemester: string;
  projectType: 'individual' | 'team';
  teamSize: number;
  interests: string[];
  skills: {
    programming: string[];
    frameworks: string[];
    ai: string[];
    databases: string[];
    cloud: string[];
  };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: '1-3 months' | '3-6 months' | '6+ months';
  budget: 'Zero ($0)' | 'Low (<$50)' | 'Moderate ($50-$200)';
  hardware: 'Software only' | 'Raspberry Pi / Arduino / Sensors' | 'GPU workstation' | 'Mobile device';
  projectOrientation: 'innovative' | 'practical' | 'research' | 'placement';
  careerGoal?: string;
}

export interface TechnologyItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'ai_ml' | 'cloud' | 'auth' | 'apis' | 'deployment' | 'cache';
  reason: string;
  versionOrPackage?: string;
}

export interface FeatureTierItem {
  id?: string;
  title: string;
  description: string;
  complexity: 'low' | 'medium' | 'high';
  estimatedHours: number;
  addedByImprovement?: boolean;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  role: string;
  technology: string;
  category: 'client' | 'gateway' | 'app' | 'ai' | 'database' | 'cache' | 'external';
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label: string;
  protocol: string;
}

export interface ArchitectureSpec {
  summary: string;
  pattern: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface DatabaseEntity {
  name: string;
  description: string;
  fields: { name: string; type: string; constraints?: string }[];
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  requestBody?: string;
  responseSample: string;
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  estimatedDays: number;
  dependencies?: string[];
  deliverables: string[];
  completed?: boolean;
}

export interface RoadmapPhase {
  phaseNumber: number;
  phaseName: string;
  objective: string;
  estimatedDuration: string;
  tasks: RoadmapTask[];
}

export interface ProjectIdea {
  id: string;
  title: string;
  tagline: string;
  problemStatement: string;
  solutionOverview: string;
  domain: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: string;
  teamSize: string;
  innovationScore: number;
  practicalityScore: number;
  placementRelevance: number;
  recommendedTechnologies: TechnologyItem[];
  coreFeatures: FeatureTierItem[];
  intermediateFeatures: FeatureTierItem[];
  advancedFeatures: FeatureTierItem[];
  aiFeatures: FeatureTierItem[];
  expectedUsers: string[];
  requiredResources: string[];
  risks: { risk: string; mitigation: string }[];
  futureScope: string[];
  architecture: ArchitectureSpec;
  databaseDesign: DatabaseEntity[];
  apiDesign: ApiEndpoint[];
  roadmap: RoadmapPhase[];
  isDemo?: boolean;
  createdAt: string;
}

export interface MentorStructuredResponse {
  recommendation: string;
  reason: string;
  steps: string[];
  exampleCode?: string;
  commonMistakes: string[];
}

export interface MentorChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text?: string;
  structuredAnswer?: MentorStructuredResponse;
  timestamp: string;
}

export interface ImprovementItem {
  id: string;
  category: 'MVP' | 'Innovation' | 'Technical' | 'AI' | 'Security' | 'Scalability' | 'Future Scope';
  title: string;
  rationale: string;
  implementationDetail: string;
  impact: 'High' | 'Medium' | 'Breakthrough';
  targetFeatureTier?: 'core' | 'intermediate' | 'advanced' | 'ai';
}

export interface ProjectComparisonResponse {
  comparisonTable: {
    criteria: string;
    projectA: string;
    projectB: string;
    projectC?: string;
  }[];
  recommendation: {
    recommendedProjectId: string;
    summaryTitle: string;
    detailedReason: string;
    fitFactors: string[];
  };
}

export interface DashboardStats {
  totalGenerated: number;
  savedCount: number;
  activeRoadmapsCount: number;
  overallRoadmapCompletionPercent: number;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  durationMs?: number;
}
