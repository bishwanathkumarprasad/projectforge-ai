import {
  StudentProfile,
  ProjectIdea,
  MentorStructuredResponse,
  ImprovementItem,
  ProjectComparisonResponse,
  DashboardStats,
} from '../types';

const API_BASE = '/api';

class ApiError extends Error {
  status?: number;
  details?: any;

  constructor(message: string, status?: number, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errMsg =
        data?.error?.message ||
        (typeof data?.error === 'string' ? data.error : null) ||
        `Request failed with status ${response.status}`;
      throw new ApiError(errMsg, response.status, data?.error?.details || data?.details);
    }

    return data as T;
  } catch (err: any) {
    if (err instanceof ApiError) throw err;
    console.error(`[API Network Error] ${endpoint}:`, err);
    throw new ApiError('Unable to connect to ProjectForge AI server. Please check your connection or server status.');
  }
}

export const api = {
  // Health
  checkHealth: async () => {
    return request<{
      status: string;
    }>('/health');
  },

  getAiStatus: async () => {
    return request<{
      mode: 'gemini' | 'demo';
      model: string;
    }>('/ai/status');
  },

  // Project Generation
  generateProjects: async (profile: StudentProfile) => {
    return request<{
      success: boolean;
      isDemo: boolean;
      projects: ProjectIdea[];
    }>('/projects/generate', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  },

  getDemoProjects: async () => {
    return request<{
      success: boolean;
      isDemo: boolean;
      projects: ProjectIdea[];
    }>('/projects/demo');
  },

  getProject: async (id: string) => {
    return request<{
      success: boolean;
      project: ProjectIdea;
      isSaved: boolean;
      completedTaskIds: string[];
    }>(`/projects/${id}`);
  },

  improveProject: async (id: string, focusAreas?: string[]) => {
    return request<{
      success: boolean;
      isDemo: boolean;
      improvements: ImprovementItem[];
    }>(`/projects/${id}/improve`, {
      method: 'POST',
      body: JSON.stringify({ focusAreas }),
    });
  },

  addImprovementToBlueprint: async (id: string, improvement: ImprovementItem) => {
    return request<{
      success: boolean;
      message: string;
      project: ProjectIdea;
    }>(`/projects/${id}/add-improvement`, {
      method: 'POST',
      body: JSON.stringify(improvement),
    });
  },

  // AI Mentor
  askMentor: async (projectId: string, question: string) => {
    return request<{
      success: boolean;
      isDemo: boolean;
      messageId: string;
      answer: MentorStructuredResponse;
    }>('/mentor/ask', {
      method: 'POST',
      body: JSON.stringify({ projectId, question }),
    });
  },

  getMentorHistory: async (projectId: string) => {
    return request<{
      success: boolean;
      history: Array<{
        id: string;
        question: string;
        answer: MentorStructuredResponse;
        timestamp: string;
      }>;
    }>(`/mentor/${projectId}/history`);
  },

  // Comparison
  compareProjects: async (projectIds: string[], studentProfile?: StudentProfile) => {
    return request<{
      success: boolean;
      isDemo: boolean;
      comparison: ProjectComparisonResponse;
    }>('/compare', {
      method: 'POST',
      body: JSON.stringify({ projectIds, studentProfile }),
    });
  },

  // User & Bookmarks
  getSavedProjects: async () => {
    return request<{
      success: boolean;
      projects: ProjectIdea[];
    }>('/user/saved');
  },

  saveProject: async (id: string) => {
    return request<{
      success: boolean;
      isSaved: boolean;
    }>(`/user/saved/${id}`, {
      method: 'POST',
    });
  },

  removeSavedProject: async (id: string) => {
    return request<{
      success: boolean;
      isSaved: boolean;
    }>(`/user/saved/${id}`, {
      method: 'DELETE',
    });
  },

  // Roadmap Progress
  getRoadmapProgress: async (projectId: string) => {
    return request<{
      success: boolean;
      completedTaskIds: string[];
    }>(`/user/progress/${projectId}`);
  },

  updateRoadmapProgress: async (projectId: string, completedTaskIds: string[]) => {
    return request<{
      success: boolean;
      record: { completedTaskIds: string[]; updatedAt: string };
    }>(`/user/progress/${projectId}`, {
      method: 'POST',
      body: JSON.stringify({ completedTaskIds }),
    });
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    return request<{
      success: boolean;
      stats: DashboardStats;
      recentProjects: ProjectIdea[];
      savedProjects: ProjectIdea[];
    }>('/user/dashboard');
  },
};
