import { StudentProfile, ProjectIdea } from '../types/index.js';

// Sanitize user inputs to mitigate prompt injection attempts
export function sanitizeInput(text: string): string {
  if (!text) return '';
  return text
    .replace(/[<>{}]/g, '')
    .replace(/\b(system prompt|ignore previous instructions|disregard guidelines|drop table)\b/gi, '[filtered]')
    .trim();
}

export function buildProjectGenerationPrompt(profile: StudentProfile): string {
  const safeBranch = sanitizeInput(profile.academicBranch);
  const safeInterests = profile.interests.map(sanitizeInput).join(', ');
  const safeProg = profile.skills.programming.map(sanitizeInput).join(', ');
  const safeFrameworks = profile.skills.frameworks.map(sanitizeInput).join(', ');
  const safeAI = profile.skills.ai.map(sanitizeInput).join(', ');
  const safeDB = profile.skills.databases.map(sanitizeInput).join(', ');
  const safeCloud = profile.skills.cloud.map(sanitizeInput).join(', ');

  return `
You are the Chief Academic Evaluator & Principal Software Architect at ProjectForge AI.
Generate 5 to 6 unique, highly tailored, feasible, and rigorous Final-Year Capstone Project Ideas for the following student profile:

STUDENT PROFILE:
- Academic Branch: ${safeBranch} (Semester: ${profile.currentSemester})
- Project Mode: ${profile.projectType} (${profile.teamSize} member(s))
- Target Difficulty: ${profile.difficulty}
- Available Duration: ${profile.duration}
- Target Budget: ${profile.budget}
- Hardware Availability: ${profile.hardware}
- Orientation Goal: ${profile.projectOrientation} (Placement, Practical, Innovation, or Research)
- Interests & Domains: ${safeInterests}
- Technical Skills:
  * Languages: ${safeProg || 'Standard College Curriculum'}
  * Frameworks: ${safeFrameworks || 'General Web/Application Stack'}
  * AI/ML: ${safeAI || 'Fundamental ML or Rule-based logic'}
  * Databases: ${safeDB || 'SQL/Relational'}
  * Cloud/Tools: ${safeCloud || 'Local host / Free cloud tier'}

CRITICAL GENERATION RULES:
1. PRACTICALITY & ACCESSIBILITY: The ideas must be genuinely executable within ${profile.duration} by student(s) with ${profile.difficulty} experience. No corporate enterprise-scale fluff requiring millions in GPUs.
2. RIGOROUS BLUEPRINT: Each project MUST include:
   - Specific problem statement and concrete solution overview.
   - Distinct features partitioned into: coreFeatures (MVP), intermediateFeatures, advancedFeatures, and aiFeatures (each with title, description, complexity: 'low'|'medium'|'high', estimatedHours: number).
   - recommendedTechnologies: categorized list (frontend, backend, database, ai_ml, cloud, auth, apis, deployment) each with a clear, specific "reason" explaining why it fits this particular project.
   - architecture: summary, pattern name (e.g., "Event-Driven Edge AI Pipeline", "Client-Server Micro-Services", "Layered Modular Monolith"), array of nodes (id, label, role, technology, category: 'client'|'gateway'|'app'|'ai'|'database'|'cache'|'external'), and edges (from, to, label, protocol).
   - databaseDesign: array of tables/entities with name, description, and fields [{ name, type, constraints }].
   - apiDesign: 4-6 key REST endpoints [{ method, path, description, requestBody, responseSample }].
   - roadmap: 8 standard phases (Phase 1: Requirement Analysis & Feasibility, Phase 2: System & UI/UX Design, Phase 3: Database & Auth Setup, Phase 4: Core Backend Development, Phase 5: Primary Feature Engineering, Phase 6: AI/ML Integration & Pipelines, Phase 7: Rigorous Testing & Security Review, Phase 8: Cloud Deployment & Presentation) with 2-3 specific actionable tasks per phase.
   - risks: array of { risk, mitigation }.
   - futureScope: array of 3-4 future enhancements.
   - scores: innovationScore (0-100), practicalityScore (0-100), placementRelevance (0-100).
3. FORMAT: Return valid, pure JSON without any markdown ticks or surrounding commentary.
`;
}

export function buildMentorPrompt(project: ProjectIdea, question: string): string {
  const safeQ = sanitizeInput(question);
  const techNames = project.recommendedTechnologies.map(t => `${t.name} (${t.category})`).join(', ');

  return `
You are the Senior Technical Project Mentor for this specific student final-year project.

PROJECT CONTEXT:
- Title: "${project.title}"
- Domain: ${project.domain} (${project.difficulty} difficulty, ${project.estimatedDuration})
- Problem: ${project.problemStatement}
- Solution: ${project.solutionOverview}
- Architecture Pattern: ${project.architecture.pattern}
- Technologies: ${techNames}
- Core Features: ${project.coreFeatures.map(f => f.title).join(', ')}
- AI Features: ${project.aiFeatures.map(f => f.title).join(', ')}

STUDENT'S SPECIFIC QUESTION:
"${safeQ}"

TASK:
Provide an expert, actionable, project-grounded answer tailored specifically to "${project.title}".
Do NOT give generic textbook advice. Reference their actual tech stack, database entities, or features.

FORMAT YOUR RESPONSE IN PURE JSON with this exact schema:
{
  "recommendation": "Direct, crisp answer and executive guidance (2-3 sentences)",
  "reason": "Strategic architectural or academic reason why this is the best path for this project",
  "steps": [
    "Step 1: Specific action with exact libraries/tools",
    "Step 2: Concrete implementation task",
    "Step 3: Verification or test step"
  ],
  "exampleCode": "// Real, illustrative code, config, or CLI command (optional but recommended if technical)",
  "commonMistakes": [
    "Common student mistake 1 and how to avoid it",
    "Common student mistake 2 and how to avoid it"
  ]
}
`;
}

export function buildImprovementPrompt(project: ProjectIdea, focusAreas?: string[]): string {
  const focus = focusAreas && focusAreas.length > 0 ? focusAreas.join(', ') : 'All categories';

  return `
You are an Academic Project Innovator & Lead Systems Architect at ProjectForge AI.
Analyze the following capstone project and suggest high-value, practical improvements across these categories:
- MVP Refinement
- Innovation (Novelty & Edge)
- Technical Scalability
- AI Capabilities
- Security Hardening
- UX & Accessibility
- Future Academic Scope

PROJECT:
- Title: "${project.title}"
- Problem: ${project.problemStatement}
- Solution: ${project.solutionOverview}
- Tech Stack: ${project.recommendedTechnologies.map(t => t.name).join(', ')}
- Focus Requested: ${focus}

Generate 6 to 8 prioritized, actionable improvement proposals.
OUTPUT FORMAT: PURE JSON ARRAY of objects:
[
  {
    "id": "imp_1",
    "category": "MVP" | "Innovation" | "Technical" | "AI" | "Security" | "Scalability" | "Future Scope",
    "title": "Concise, punchy improvement title",
    "rationale": "Why this elevates the project from an ordinary college project to an exceptional one",
    "implementationDetail": "Step-by-step guidance on how the student can implement this in 1-2 weeks",
    "impact": "High" | "Medium" | "Breakthrough",
    "targetFeatureTier": "core" | "intermediate" | "advanced" | "ai"
  }
]
`;
}

export function buildComparisonPrompt(projects: ProjectIdea[], profile?: StudentProfile): string {
  const summaries = projects.map((p, idx) => `
PROJECT ${idx + 1} (ID: ${p.id}):
- Title: "${p.title}"
- Domain: ${p.domain}
- Difficulty: ${p.difficulty}
- Duration: ${p.estimatedDuration}
- Tech: ${p.recommendedTechnologies.map(t => t.name).slice(0, 6).join(', ')}
- Innovation Score: ${p.innovationScore}/100
- Practicality Score: ${p.practicalityScore}/100
- Placement Relevance: ${p.placementRelevance}/100
- Problem Summary: ${p.problemStatement.slice(0, 150)}...
`).join('\n');

  return `
You are an Academic Advisory Dean. Compare these ${projects.length} student final-year project ideas:

${summaries}

${profile ? `STUDENT CONTEXT: Branch: ${profile.academicBranch}, Difficulty desired: ${profile.difficulty}, Duration: ${profile.duration}, Goal: ${profile.projectOrientation}` : ''}

Provide a comparative evaluation table and declare a definitive recommendation.
OUTPUT FORMAT: PURE JSON:
{
  "comparisonTable": [
    { "criteria": "Difficulty & Learning Curve", "projectA": "...", "projectB": "..." ${projects.length > 2 ? ', "projectC": "..."' : ''} },
    { "criteria": "Estimated Time to MVP", "projectA": "...", "projectB": "..." ${projects.length > 2 ? ', "projectC": "..."' : ''} },
    { "criteria": "Innovation & Novelty", "projectA": "...", "projectB": "..." ${projects.length > 2 ? ', "projectC": "..."' : ''} },
    { "criteria": "Industry & Placement Value", "projectA": "...", "projectB": "..." ${projects.length > 2 ? ', "projectC": "..."' : ''} },
    { "criteria": "Hardware & Cloud Resource Cost", "projectA": "...", "projectB": "..." ${projects.length > 2 ? ', "projectC": "..."' : ''} },
    { "criteria": "Technical Risk & Complexity", "projectA": "...", "projectB": "..." ${projects.length > 2 ? ', "projectC": "..."' : ''} }
  ],
  "recommendation": {
    "recommendedProjectId": "${projects[0].id}",
    "summaryTitle": "Winning Project Summary Title",
    "detailedReason": "Comprehensive explanation of why this project is the optimal choice for the student's constraints and goals",
    "fitFactors": [
      "Key factor 1",
      "Key factor 2",
      "Key factor 3"
    ]
  }
}
`;
}
