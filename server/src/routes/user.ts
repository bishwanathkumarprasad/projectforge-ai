import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import { DEMO_PROJECTS } from '../services/demoData.js';

const router = Router();

// GET /api/user/saved
router.get('/saved', (req: Request, res: Response) => {
  const savedProjects = db.getSavedProjects();
  return res.status(200).json({
    success: true,
    projects: savedProjects,
  });
});

// POST /api/user/saved/:id
router.post('/saved/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const project = db.getProject(id) || DEMO_PROJECTS.find(p => p.id === id);

  if (!project) {
    return res.status(404).json({
      error: `Project with ID "${id}" was not found.`,
    });
  }

  // Ensure project is stored
  db.setProject(project);
  db.saveProject(id);

  return res.status(200).json({
    success: true,
    message: 'Project saved successfully.',
    isSaved: true,
  });
});

// DELETE /api/user/saved/:id
router.delete('/saved/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  db.removeSavedProject(id);

  return res.status(200).json({
    success: true,
    message: 'Project removed from saved list.',
    isSaved: false,
  });
});

// GET /api/user/progress/:projectId
router.get('/progress/:projectId', (req: Request, res: Response) => {
  const { projectId } = req.params;
  const completedTaskIds = db.getRoadmapProgress(projectId);

  return res.status(200).json({
    success: true,
    completedTaskIds,
  });
});

// POST /api/user/progress/:projectId
router.post('/progress/:projectId', (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { completedTaskIds } = req.body;

  if (!Array.isArray(completedTaskIds)) {
    return res.status(400).json({
      error: 'completedTaskIds must be an array of strings.',
    });
  }

  const record = db.updateRoadmapProgress(projectId, completedTaskIds);

  return res.status(200).json({
    success: true,
    record,
  });
});

// GET /api/user/dashboard
router.get('/dashboard', (req: Request, res: Response) => {
  const allProjects = db.getAllProjects();
  const savedProjects = db.getSavedProjects();

  // Calculate total roadmap progress statistics
  let totalTasks = 0;
  let completedTasks = 0;

  for (const project of allProjects) {
    const pTasks = project.roadmap.reduce((acc, phase) => acc + phase.tasks.length, 0);
    totalTasks += pTasks;
    const pDone = db.getRoadmapProgress(project.id).length;
    completedTasks += pDone;
  }

  const overallRoadmapCompletionPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return res.status(200).json({
    success: true,
    stats: {
      totalGenerated: allProjects.length,
      savedCount: savedProjects.length,
      activeRoadmapsCount: allProjects.filter(p => db.getRoadmapProgress(p.id).length > 0).length,
      overallRoadmapCompletionPercent,
    },
    recentProjects: allProjects.slice(0, 6),
    savedProjects: savedProjects.slice(0, 6),
  });
});

export default router;
