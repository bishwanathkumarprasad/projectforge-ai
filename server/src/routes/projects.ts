import { Router, Request, Response, NextFunction } from 'express';
import { studentProfileSchema, improveQuerySchema } from '../validators/index.js';
import { geminiService } from '../services/gemini.js';
import { db } from '../db/index.js';
import { DEMO_PROJECTS } from '../services/demoData.js';
import { aiGenerationLimiter } from '../middleware/rateLimiter.js';
import { FeatureTierItem } from '../types/index.js';

const router = Router();

// Seed initial demo projects in store so lookups always succeed
for (const p of DEMO_PROJECTS) {
  if (!db.getProject(p.id)) {
    db.setProject(p);
  }
}

// POST /api/projects/generate
router.post(
  '/generate',
  aiGenerationLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedProfile = studentProfileSchema.parse(req.body);
      const result = await geminiService.generateProjects(validatedProfile);

      // Persist generated projects into local db
      db.setProjects(result.projects);

      return res.status(200).json({
        success: true,
        isDemo: result.isDemo,
        projects: result.projects,
      });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/projects/demo
router.get('/demo', (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    isDemo: true,
    projects: DEMO_PROJECTS,
  });
});

// GET /api/projects/:id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const project = db.getProject(id) || DEMO_PROJECTS.find(p => p.id === id);

  if (!project) {
    return res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: `Project with ID "${id}" was not found.`,
      },
    });
  }

  const isSaved = db.isProjectSaved(id);
  const completedTaskIds = db.getRoadmapProgress(id);

  return res.status(200).json({
    success: true,
    project,
    isSaved,
    completedTaskIds,
  });
});

// POST /api/projects/:id/improve
router.post(
  '/:id/improve',
  aiGenerationLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const project = db.getProject(id) || DEMO_PROJECTS.find(p => p.id === id);

      if (!project) {
        return res.status(404).json({
          error: {
            code: 'NOT_FOUND',
            message: `Project with ID "${id}" was not found.`,
          },
        });
      }

      const focusAreas = Array.isArray(req.body.focusAreas) ? req.body.focusAreas : undefined;
      const result = await geminiService.improveProject(project, focusAreas);

      return res.status(200).json({
        success: true,
        isDemo: result.isDemo,
        improvements: result.improvements,
      });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/projects/:id/add-improvement
router.post('/:id/add-improvement', (req: Request, res: Response) => {
  const { id } = req.params;
  const project = db.getProject(id) || DEMO_PROJECTS.find(p => p.id === id);

  if (!project) {
    return res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: `Project with ID "${id}" was not found.`,
      },
    });
  }

  const { title, rationale, category, targetFeatureTier } = req.body;
  if (!title) {
    return res.status(400).json({
      error: {
        code: 'BAD_REQUEST',
        message: 'Improvement title is required',
      },
    });
  }

  const newFeature: FeatureTierItem = {
    id: `feat_${Date.now()}`,
    title,
    description: rationale || 'Enhancement suggested by AI Improvement Engine',
    complexity: category === 'MVP' ? 'medium' : 'high',
    estimatedHours: category === 'MVP' ? 16 : 24,
    addedByImprovement: true,
  };

  const tier = targetFeatureTier || 'intermediate';
  if (tier === 'core') {
    project.coreFeatures.push(newFeature);
  } else if (tier === 'advanced') {
    project.advancedFeatures.push(newFeature);
  } else if (tier === 'ai') {
    project.aiFeatures.push(newFeature);
  } else {
    project.intermediateFeatures.push(newFeature);
  }

  db.setProject(project);

  return res.status(200).json({
    success: true,
    message: `Added "${title}" to project ${tier} features.`,
    project,
  });
});

export default router;
