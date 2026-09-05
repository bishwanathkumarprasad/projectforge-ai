import { Router, Request, Response, NextFunction } from 'express';
import { mentorQuerySchema } from '../validators/index.js';
import { geminiService } from '../services/gemini.js';
import { db } from '../db/index.js';
import { DEMO_PROJECTS } from '../services/demoData.js';
import { aiGenerationLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// POST /api/mentor/ask
router.post(
  '/ask',
  aiGenerationLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId, question } = mentorQuerySchema.parse(req.body);
      const project = db.getProject(projectId) || DEMO_PROJECTS.find(p => p.id === projectId);

      if (!project) {
        return res.status(404).json({
          error: {
            code: 'NOT_FOUND',
            message: `Project with ID "${projectId}" was not found. Please select a valid project.`,
          },
        });
      }

      const result = await geminiService.askMentor(project, question);

      // Persist to conversation log
      const messageRecord = db.addMentorMessage(projectId, question, result.response);

      return res.status(200).json({
        success: true,
        isDemo: result.isDemo,
        messageId: messageRecord.id,
        answer: result.response,
      });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/mentor/:projectId/history
router.get('/:projectId/history', (req: Request, res: Response) => {
  const { projectId } = req.params;
  const history = db.getMentorHistory(projectId);

  return res.status(200).json({
    success: true,
    history,
  });
});

export default router;
