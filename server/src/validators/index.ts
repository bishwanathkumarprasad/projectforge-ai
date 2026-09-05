import { z } from 'zod';

export const studentProfileSchema = z.object({
  name: z.string().max(80).optional(),
  academicBranch: z.string().min(2, 'Academic branch is required').max(100),
  currentSemester: z.string().min(1, 'Current semester is required').max(30),
  projectType: z.enum(['individual', 'team']),
  teamSize: z.number().int().min(1).max(10).default(1),
  interests: z.array(z.string().min(1).max(50)).min(1, 'Select at least one interest').max(15, 'Maximum 15 interests allowed'),
  skills: z.object({
    programming: z.array(z.string().max(50)).max(20).default([]),
    frameworks: z.array(z.string().max(50)).max(20).default([]),
    ai: z.array(z.string().max(50)).max(20).default([]),
    databases: z.array(z.string().max(50)).max(20).default([]),
    cloud: z.array(z.string().max(50)).max(20).default([]),
  }),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  duration: z.enum(['1-3 months', '3-6 months', '6+ months']),
  budget: z.enum(['Zero ($0)', 'Low (<$50)', 'Moderate ($50-$200)']),
  hardware: z.enum([
    'Software only',
    'Raspberry Pi / Arduino / Sensors',
    'GPU workstation',
    'Mobile device',
  ]),
  projectOrientation: z.enum(['innovative', 'practical', 'research', 'placement']),
  careerGoal: z.string().max(200).optional(),
});

export const featureTierItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  description: z.string().min(5),
  complexity: z.enum(['low', 'medium', 'high']),
  estimatedHours: z.number().min(1).max(200),
  addedByImprovement: z.boolean().optional(),
});

export const technologyItemSchema = z.object({
  name: z.string().min(1),
  category: z.enum([
    'frontend',
    'backend',
    'database',
    'ai_ml',
    'cloud',
    'auth',
    'apis',
    'deployment',
    'cache',
  ]),
  reason: z.string().min(5),
  versionOrPackage: z.string().optional(),
});

export const architectureNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  role: z.string(),
  technology: z.string(),
  category: z.enum(['client', 'gateway', 'app', 'ai', 'database', 'cache', 'external']),
});

export const architectureEdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  label: z.string(),
  protocol: z.string(),
});

export const architectureSpecSchema = z.object({
  summary: z.string(),
  pattern: z.string(),
  nodes: z.array(architectureNodeSchema),
  edges: z.array(architectureEdgeSchema),
});

export const databaseEntitySchema = z.object({
  name: z.string(),
  description: z.string(),
  fields: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      constraints: z.string().optional(),
    })
  ),
});

export const apiEndpointSchema = z.object({
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  path: z.string(),
  description: z.string(),
  requestBody: z.string().optional(),
  responseSample: z.string(),
});

export const roadmapTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  estimatedDays: z.number().min(1),
  dependencies: z.array(z.string()).optional(),
  deliverables: z.array(z.string()),
  completed: z.boolean().optional(),
});

export const roadmapPhaseSchema = z.object({
  phaseNumber: z.number().int().min(1).max(12),
  phaseName: z.string(),
  objective: z.string(),
  estimatedDuration: z.string(),
  tasks: z.array(roadmapTaskSchema),
});

export const projectIdeaSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  tagline: z.string().min(5),
  problemStatement: z.string().min(20),
  solutionOverview: z.string().min(20),
  domain: z.string(),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  estimatedDuration: z.string(),
  teamSize: z.string(),
  innovationScore: z.number().min(0).max(100),
  practicalityScore: z.number().min(0).max(100),
  placementRelevance: z.number().min(0).max(100),
  recommendedTechnologies: z.array(technologyItemSchema),
  coreFeatures: z.array(featureTierItemSchema),
  intermediateFeatures: z.array(featureTierItemSchema),
  advancedFeatures: z.array(featureTierItemSchema),
  aiFeatures: z.array(featureTierItemSchema),
  expectedUsers: z.array(z.string()),
  requiredResources: z.array(z.string()),
  risks: z.array(z.object({ risk: z.string(), mitigation: z.string() })),
  futureScope: z.array(z.string()),
  architecture: architectureSpecSchema,
  databaseDesign: z.array(databaseEntitySchema),
  apiDesign: z.array(apiEndpointSchema),
  roadmap: z.array(roadmapPhaseSchema),
  isDemo: z.boolean().optional(),
  createdAt: z.string(),
});

export const projectIdeaListSchema = z.array(projectIdeaSchema);

export const mentorQuerySchema = z.object({
  projectId: z.string(),
  question: z.string().min(3).max(500),
});

export const mentorStructuredResponseSchema = z.object({
  recommendation: z.string().min(5),
  reason: z.string().min(5),
  steps: z.array(z.string()).min(1),
  exampleCode: z.string().optional(),
  commonMistakes: z.array(z.string()).min(1),
});

export const improveQuerySchema = z.object({
  projectId: z.string(),
  focusAreas: z.array(z.string()).optional(),
});

export const improvementItemSchema = z.object({
  id: z.string(),
  category: z.enum(['MVP', 'Innovation', 'Technical', 'AI', 'Security', 'Scalability', 'Future Scope']),
  title: z.string(),
  rationale: z.string(),
  implementationDetail: z.string(),
  impact: z.enum(['High', 'Medium', 'Breakthrough']),
  targetFeatureTier: z.enum(['core', 'intermediate', 'advanced', 'ai']).optional(),
});

export const improvementListSchema = z.array(improvementItemSchema);

export const comparisonQuerySchema = z.object({
  projectIds: z.array(z.string()).min(2).max(3),
  studentProfile: studentProfileSchema.optional(),
});
