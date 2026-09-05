import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config.js';
import {
  StudentProfile,
  ProjectIdea,
  MentorStructuredResponse,
  ImprovementItem,
  ProjectComparisonResponse,
} from '../types/index.js';
import {
  projectIdeaListSchema,
  mentorStructuredResponseSchema,
  improvementListSchema,
} from '../validators/index.js';
import {
  buildProjectGenerationPrompt,
  buildMentorPrompt,
  buildImprovementPrompt,
  buildComparisonPrompt,
} from '../prompts/index.js';
import {
  getDemoProjectsForProfile,
  getDemoMentorResponse,
  getDemoImprovements,
  getDemoComparison,
  DEMO_PROJECTS,
} from './demoData.js';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;

  constructor() {
    if (config.geminiApiKey) {
      try {
        this.genAI = new GoogleGenerativeAI(config.geminiApiKey);
        console.log(`[GeminiService] Initialized with model: ${config.geminiModel}`);
      } catch (err) {
        console.warn('[GeminiService] Failed to initialize Google Generative AI:', err);
        this.genAI = null;
      }
    } else {
      console.log('[GeminiService] No GEMINI_API_KEY detected. Running in authentic Demo Mode.');
    }
  }

  public isAvailable(): boolean {
    return Boolean(this.genAI && config.geminiApiKey);
  }

  // Safe timeout wrapper for AI calls
  private withTimeout<T>(promise: Promise<T>, timeoutMs: number, opName: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`[Timeout] ${opName} exceeded deadline of ${timeoutMs}ms`));
      }, timeoutMs);

      promise
        .then(res => {
          clearTimeout(timer);
          resolve(res);
        })
        .catch(err => {
          clearTimeout(timer);
          reject(err);
        });
    });
  }

  // Safe JSON extraction helper that handles code blocks or partial wrappers
  private cleanAndParseJSON<T>(rawText: string): T {
    let cleaned = rawText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    return JSON.parse(cleaned);
  }

  // 1. Generate Multiple Tailored Projects
  public async generateProjects(profile: StudentProfile): Promise<{ projects: ProjectIdea[]; isDemo: boolean }> {
    if (!this.isAvailable()) {
      return {
        projects: getDemoProjectsForProfile(profile),
        isDemo: true,
      };
    }

    try {
      const model = this.genAI!.getGenerativeModel({
        model: config.geminiModel,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const prompt = buildProjectGenerationPrompt(profile);
      const result = await this.withTimeout(
        model.generateContent(prompt),
        config.geminiTimeoutMs,
        'Project Generation'
      );
      const responseText = result.response.text();

      const parsed = this.cleanAndParseJSON<any>(responseText);
      const rawList = Array.isArray(parsed) ? parsed : (parsed.projects || parsed.ideas || []);

      // Validate each item or assign fallback identifiers
      const validatedProjects: ProjectIdea[] = rawList.map((item: any, idx: number) => {
        const id = item.id || `proj_${Date.now()}_${idx + 1}`;
        return {
          ...item,
          id,
          innovationScore: Math.min(100, Math.max(10, Number(item.innovationScore) || 85)),
          practicalityScore: Math.min(100, Math.max(10, Number(item.practicalityScore) || 88)),
          placementRelevance: Math.min(100, Math.max(10, Number(item.placementRelevance) || 90)),
          isDemo: false,
          createdAt: new Date().toISOString(),
        };
      });

      const validated = projectIdeaListSchema.safeParse(validatedProjects);
      if (!validated.success) {
        console.warn('[GeminiService] Validation issues in AI output, falling back to enriched demo data:', validated.error);
        return {
          projects: getDemoProjectsForProfile(profile),
          isDemo: true,
        };
      }

      return {
        projects: validated.data,
        isDemo: false,
      };
    } catch (err) {
      console.error('[GeminiService] Error during project generation, falling back to Demo Mode:', err);
      return {
        projects: getDemoProjectsForProfile(profile),
        isDemo: true,
      };
    }
  }

  // 2. Ask Grounded AI Mentor
  public async askMentor(
    project: ProjectIdea,
    question: string
  ): Promise<{ response: MentorStructuredResponse; isDemo: boolean }> {
    if (!this.isAvailable()) {
      return {
        response: getDemoMentorResponse(project, question),
        isDemo: true,
      };
    }

    try {
      const model = this.genAI!.getGenerativeModel({
        model: config.geminiModel,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      });

      const prompt = buildMentorPrompt(project, question);
      const result = await this.withTimeout(
        model.generateContent(prompt),
        config.geminiTimeoutMs,
        'Mentor Advice'
      );
      const parsed = this.cleanAndParseJSON<any>(result.response.text());

      const validated = mentorStructuredResponseSchema.safeParse(parsed);
      if (!validated.success) {
        console.warn('[GeminiService] Mentor response schema deviation, using demo response:', validated.error);
        return {
          response: getDemoMentorResponse(project, question),
          isDemo: true,
        };
      }

      return {
        response: validated.data,
        isDemo: false,
      };
    } catch (err) {
      console.error('[GeminiService] Error asking mentor, using demo fallback:', err);
      return {
        response: getDemoMentorResponse(project, question),
        isDemo: true,
      };
    }
  }

  // 3. Improve Project Idea
  public async improveProject(
    project: ProjectIdea,
    focusAreas?: string[]
  ): Promise<{ improvements: ImprovementItem[]; isDemo: boolean }> {
    if (!this.isAvailable()) {
      return {
        improvements: getDemoImprovements(project),
        isDemo: true,
      };
    }

    try {
      const model = this.genAI!.getGenerativeModel({
        model: config.geminiModel,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const prompt = buildImprovementPrompt(project, focusAreas);
      const result = await this.withTimeout(
        model.generateContent(prompt),
        config.geminiTimeoutMs,
        'Project Improvement'
      );
      const parsed = this.cleanAndParseJSON<any>(result.response.text());
      const rawList = Array.isArray(parsed) ? parsed : (parsed.improvements || []);

      const mappedList = rawList.map((item: any, idx: number) => ({
        id: item.id || `imp_${idx + 1}`,
        category: item.category || 'Innovation',
        title: item.title || 'Enhanced Capability',
        rationale: item.rationale || 'Expands real-world applicability.',
        implementationDetail: item.implementationDetail || 'Follow modular integration steps.',
        impact: item.impact || 'High',
        targetFeatureTier: item.targetFeatureTier || 'intermediate',
      }));

      const validated = improvementListSchema.safeParse(mappedList);
      if (!validated.success) {
        return {
          improvements: getDemoImprovements(project),
          isDemo: true,
        };
      }

      return {
        improvements: validated.data,
        isDemo: false,
      };
    } catch (err) {
      console.error('[GeminiService] Error improving project, using demo fallback:', err);
      return {
        improvements: getDemoImprovements(project),
        isDemo: true,
      };
    }
  }

  // 4. Compare Multiple Projects
  public async compareProjects(
    projects: ProjectIdea[],
    profile?: StudentProfile
  ): Promise<{ comparison: ProjectComparisonResponse; isDemo: boolean }> {
    if (!this.isAvailable()) {
      return {
        comparison: getDemoComparison(projects),
        isDemo: true,
      };
    }

    try {
      const model = this.genAI!.getGenerativeModel({
        model: config.geminiModel,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.5,
        },
      });

      const prompt = buildComparisonPrompt(projects, profile);
      const result = await this.withTimeout(
        model.generateContent(prompt),
        config.geminiTimeoutMs,
        'Project Comparison'
      );
      const parsed = this.cleanAndParseJSON<ProjectComparisonResponse>(result.response.text());

      if (!parsed.comparisonTable || !parsed.recommendation) {
        throw new Error('Malformed comparison output');
      }

      return {
        comparison: parsed,
        isDemo: false,
      };
    } catch (err) {
      console.error('[GeminiService] Error comparing projects, using demo fallback:', err);
      return {
        comparison: getDemoComparison(projects),
        isDemo: true,
      };
    }
  }
}

export const geminiService = new GeminiService();
