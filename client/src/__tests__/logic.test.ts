import { describe, it, expect } from 'vitest';
import {
  ACADEMIC_BRANCHES,
  ACADEMIC_SEMESTERS,
  INTEREST_CATEGORIES,
  SKILL_TAXONOMY,
  DIFFICULTY_OPTIONS,
  DURATION_OPTIONS,
} from '../data/taxonomy';

describe('Frontend Taxonomy & Catalog', () => {
  it('contains comprehensive academic engineering branches', () => {
    expect(ACADEMIC_BRANCHES.length).toBeGreaterThanOrEqual(8);
    expect(ACADEMIC_BRANCHES.some(b => b.includes('Computer Science'))).toBe(true);
    expect(ACADEMIC_BRANCHES.some(b => b.includes('Artificial Intelligence'))).toBe(true);
  });

  it('contains full spectrum of technical skills', () => {
    expect(SKILL_TAXONOMY.programming.length).toBeGreaterThanOrEqual(8);
    expect(SKILL_TAXONOMY.frameworks.length).toBeGreaterThanOrEqual(8);
    expect(SKILL_TAXONOMY.ai.length).toBeGreaterThanOrEqual(6);
    expect(SKILL_TAXONOMY.databases.length).toBeGreaterThanOrEqual(6);
    expect(SKILL_TAXONOMY.cloud.length).toBeGreaterThanOrEqual(6);
  });

  it('contains valid difficulty and duration options', () => {
    const diffValues = DIFFICULTY_OPTIONS.map(d => d.value);
    expect(diffValues).toContain('Beginner');
    expect(diffValues).toContain('Intermediate');
    expect(diffValues).toContain('Advanced');

    const durationValues = DURATION_OPTIONS.map(d => d.value);
    expect(durationValues).toContain('1-3 months');
    expect(durationValues).toContain('3-6 months');
    expect(durationValues).toContain('6+ months');
  });
});

describe('Roadmap Progress Calculation Logic', () => {
  const dummyRoadmap = [
    {
      phaseNumber: 1,
      phaseName: 'Phase 1',
      objective: 'Obj 1',
      estimatedDuration: '1w',
      tasks: [
        { id: 't1', title: 'Task 1', description: 'Desc', estimatedDays: 2, deliverables: [] },
        { id: 't2', title: 'Task 2', description: 'Desc', estimatedDays: 3, deliverables: [] },
      ],
    },
    {
      phaseNumber: 2,
      phaseName: 'Phase 2',
      objective: 'Obj 2',
      estimatedDuration: '2w',
      tasks: [
        { id: 't3', title: 'Task 3', description: 'Desc', estimatedDays: 5, deliverables: [] },
        { id: 't4', title: 'Task 4', description: 'Desc', estimatedDays: 5, deliverables: [] },
      ],
    },
  ];

  it('calculates 0% when no tasks are completed', () => {
    const allTasks = dummyRoadmap.flatMap(p => p.tasks);
    const completedTaskIds: string[] = [];
    const completedCount = allTasks.filter(t => completedTaskIds.includes(t.id)).length;
    const percent = Math.round((completedCount / allTasks.length) * 100);
    expect(percent).toBe(0);
  });

  it('calculates 50% when half the tasks are completed', () => {
    const allTasks = dummyRoadmap.flatMap(p => p.tasks);
    const completedTaskIds = ['t1', 't2'];
    const completedCount = allTasks.filter(t => completedTaskIds.includes(t.id)).length;
    const percent = Math.round((completedCount / allTasks.length) * 100);
    expect(percent).toBe(50);
  });

  it('calculates 100% when all tasks are completed', () => {
    const allTasks = dummyRoadmap.flatMap(p => p.tasks);
    const completedTaskIds = ['t1', 't2', 't3', 't4'];
    const completedCount = allTasks.filter(t => completedTaskIds.includes(t.id)).length;
    const percent = Math.round((completedCount / allTasks.length) * 100);
    expect(percent).toBe(100);
  });
});
