import { Router, Request, Response, NextFunction } from 'express';
import { comparisonQuerySchema } from '../validators/index.js';
import { geminiService } from '../services/gemini.js';
import { db } from '../db/index.js';
import { DEMO_PROJECTS } from '../services/demoData.js';
import { aiGenerationLimiter } from '../middleware/rateLimiter.js';
import { ProjectIdea } from '../types/index.js';

const router = Router();

// POST /api/compare
router.post(
  '/',
  aiGenerationLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectIds, studentProfile } = comparisonQuerySchema.parse(req.body);

      const projects: ProjectIdea[] = [];
      for (const id of projectIds) {
        const p = db.getProject(id) || DEMO_PROJECTS.find(item => item.id === id);
        if (p) {
          projects.push(p);
        }
      }

      if (projects.length < 2) {
        return res.status(400).json({
          error: {
            code: 'BAD_REQUEST',
            message: 'Please select at least 2 valid projects to compare.',
          },
        });
      }

      const result = await geminiService.compareProjects(projects, studentProfile);

      return res.status(200).json({
        success: true,
        isDemo: result.isDemo,
        comparison: result.comparison,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
