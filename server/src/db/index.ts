import fs from 'fs';
import path from 'path';
import { ProjectIdea, MentorStructuredResponse } from '../types/index.js';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

export interface StoredData {
  projects: Record<string, ProjectIdea>;
  savedProjectIds: string[];
  roadmapProgress: Record<string, { completedTaskIds: string[]; updatedAt: string }>;
  mentorConversations: Record<string, Array<{
    id: string;
    question: string;
    answer: MentorStructuredResponse;
    timestamp: string;
  }>>;
}

const defaultData: StoredData = {
  projects: {},
  savedProjectIds: [],
  roadmapProgress: {},
  mentorConversations: {},
};

class Store {
  private data: StoredData = defaultData;

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(STORE_FILE)) {
        const raw = fs.readFileSync(STORE_FILE, 'utf-8');
        this.data = { ...defaultData, ...JSON.parse(raw) };
      } else {
        this.persist();
      }
    } catch (err) {
      console.warn('Failed to read database file, initializing empty store:', err);
      this.data = defaultData;
    }
  }

  private persist() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const tmpFile = `${STORE_FILE}.tmp`;
      fs.writeFileSync(tmpFile, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tmpFile, STORE_FILE);
    } catch (err) {
      console.error('Failed to persist database to disk:', err);
    }
  }

  // Projects
  public setProject(project: ProjectIdea) {
    this.data.projects[project.id] = project;
    this.persist();
  }

  public setProjects(projects: ProjectIdea[]) {
    for (const p of projects) {
      this.data.projects[p.id] = p;
    }
    this.persist();
  }

  public getProject(id: string): ProjectIdea | undefined {
    return this.data.projects[id];
  }

  public getAllProjects(): ProjectIdea[] {
    return Object.values(this.data.projects);
  }

  // Saved Projects
  public saveProject(id: string): boolean {
    if (!this.data.savedProjectIds.includes(id)) {
      this.data.savedProjectIds.push(id);
      this.persist();
    }
    return true;
  }

  public removeSavedProject(id: string): boolean {
    this.data.savedProjectIds = this.data.savedProjectIds.filter(pid => pid !== id);
    this.persist();
    return true;
  }

  public getSavedProjects(): ProjectIdea[] {
    return this.data.savedProjectIds
      .map(id => this.data.projects[id])
      .filter((p): p is ProjectIdea => Boolean(p));
  }

  public isProjectSaved(id: string): boolean {
    return this.data.savedProjectIds.includes(id);
  }

  // Roadmap Progress
  public updateRoadmapProgress(projectId: string, completedTaskIds: string[]) {
    this.data.roadmapProgress[projectId] = {
      completedTaskIds,
      updatedAt: new Date().toISOString(),
    };
    this.persist();
    return this.data.roadmapProgress[projectId];
  }

  public getRoadmapProgress(projectId: string): string[] {
    return this.data.roadmapProgress[projectId]?.completedTaskIds || [];
  }

  // Mentor Conversations
  public addMentorMessage(
    projectId: string,
    question: string,
    answer: MentorStructuredResponse
  ) {
    if (!this.data.mentorConversations[projectId]) {
      this.data.mentorConversations[projectId] = [];
    }
    const item = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      question,
      answer,
      timestamp: new Date().toISOString(),
    };
    this.data.mentorConversations[projectId].push(item);
    this.persist();
    return item;
  }

  public getMentorHistory(projectId: string) {
    return this.data.mentorConversations[projectId] || [];
  }
}

export const db = new Store();
