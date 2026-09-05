# ProjectForge AI — AI-Powered Final-Year Project Idea Generator & Development Mentor

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.0%20Flash-orange.svg)](https://aistudio.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **"Turn Your Skills Into Your Final-Year Project"**
> Generate personalized project ideas, plan your architecture, choose the right technologies, and build your project with AI guidance.

---

## 1. Problem Statement

Final-year engineering and computer science students universally face three critical hurdles when approaching their capstone requirement:
1. **The Idea Paralysis Trap**: Students struggle to translate abstract interests into feasible, innovative projects that balance faculty approval criteria with their actual current skill level.
2. **Architectural & Feasibility Ambiguity**: Generic chatbot prompts yield high-level, vague summaries without concrete system designs, schema specifications, or budget constraints.
3. **The Execution Gap**: Once an idea is chosen, students lack a structured week-by-week development roadmap, leading to rushed integrations days before viva defense examinations.

**ProjectForge AI** solves this challenge end-to-end. It functions as an automated Chief Systems Architect and Academic Project Mentor that constructs production-quality capstone blueprints, generates interactive system diagrams, tracks 8-phase milestone progress, and provides grounded Socratic advice.

---

## 2. Core Capabilities & Product Features

| Feature | Description |
| :--- | :--- |
| **5-Step Guided Skill Profiler** | Multi-step wizard capturing branch, current semester, team size, technical skills (languages, frameworks, AI/ML, databases, cloud), difficulty, duration, and project orientation (Placement, Practical, Innovative, Research). |
| **Grounded AI Generation Engine** | Powered by Google Gemini 2.0 with JSON schema enforcement. Evaluates feasibility, novelty, and zero-cost cloud constraints to synthesize 5–6 unique project ideas. |
| **Interactive Blueprint Dashboard** | In-depth project view with tabs for Overview, Tiered Features (MVP, Intermediate, Advanced, AI), Tech Stack Rationale, Architecture, Database Design, and API Spec. |
| **Interactive SVG Architecture Diagrams** | Visual SVG/HTML data flow topologies rendering Client &rarr; Reverse Proxy &rarr; Backend Core &rarr; AI Service &rarr; Database with protocol specs and node inspector. |
| **Entity-Relationship Database Schemas** | Normalized database table cards with field types, foreign keys, and 1-click `CREATE TABLE` SQL generation. |
| **REST API Specification** | Formatted endpoint cards with HTTP method pills, request body schemas, and sample JSON responses. |
| **8-Phase Development Roadmap** | Chronological sprint roadmap from Requirement Analysis to Deployment, featuring interactive task checkboxes and celebratory confetti upon 100% completion. |
| **Grounded Socratic AI Mentor** | Contextual Q&A locked to your specific project stack. Provides direct recommendations, architectural reasons, step-by-step guides, code snippets, and common student mistakes. |
| **Idea Improvement Engine** | Analyzes projects across 7 pillars (MVP, Innovation, Scalability, AI, Security, UX, Future Scope) with a 1-click "Add to Blueprint" action. |
| **3-Way Project Comparison Matrix** | Side-by-side comparison table evaluating candidate ideas with an AI Recommendation declaring the optimal choice for the student's constraints. |
| **Academic Synopsis Export** | Generates a printable, faculty-ready Academic Project Synopsis formatted for university project coordinator approval (`@media print` and Markdown copy). |
| **Student Journey Dashboard** | Tracks active project roadmaps, saved blueprints, total ideas generated, and overall milestone completion metrics. |

---

## 3. Technology Stack & Architecture

### Frontend Layer
- **Framework**: React 19 + TypeScript (Strict mode)
- **Tooling**: Vite with Hot Module Replacement (HMR) and optimized Rollup production bundling (< 500 kB total gzip)
- **Styling**: Tailwind CSS with custom glassmorphism design tokens, glowing shadows, and print stylesheets
- **Icons**: Lucide React
- **Visuals**: Native interactive SVG architecture rendering, HTML canvas confetti

### Backend Layer
- **Runtime**: Node.js 20+ / 24+ with TypeScript
- **Web Framework**: Express 4 with modular routers (`/api/projects`, `/api/mentor`, `/api/compare`, `/api/user`)
- **Validation**: Strict Zod schemas validating student inputs, prompt injection defenses, and AI output payloads
- **Security**: Helmet security headers, CORS origin restriction, and `express-rate-limit` for quota protection
- **Persistence**: Atomic local file-based database store (`server/data/store.json`) with safe temp-file swap semantics

### AI & Google Services Integration
- **SDK**: Official `@google/generative-ai` SDK
- **Model**: Configurable via `GEMINI_MODEL` (default: `gemini-2.0-flash`)
- **Server-Side Isolation**: The Google Gemini API key is strictly maintained in server environment variables. Zero credentials are ever transmitted to or exposed in client bundles.
- **Dual-Mode AI Engine & Demo Mode**:
  - If `GEMINI_API_KEY` is present: Queries live Google Gemini models using structured JSON schemas.
  - If `GEMINI_API_KEY` is not configured or network fails: Seamlessly and transparently activates **Demo Mode**, displaying authentic, deeply structured blueprints across HealthTech, FinTech, EdTech, Smart Cities, and Computer Vision.

---

## 4. Project Directory Structure

```
projectforge-ai/
├── client/                     # Vite + React + TypeScript Frontend
│   ├── index.html              # SEO metadata and Google Fonts
│   ├── vite.config.ts          # Vite configuration with /api reverse proxy
│   ├── tailwind.config.js      # Custom theme colors and glow utilities
│   ├── src/
│   │   ├── main.tsx            # Application entrypoint
│   │   ├── App.tsx             # Main view coordinator and routing
│   │   ├── index.css           # Glassmorphism utilities & print stylesheet
│   │   ├── types/              # Domain interfaces (Project, Blueprint, Roadmap, Mentor)
│   │   ├── data/               # Taxonomy of academic branches, skills & interests
│   │   ├── services/           # Typed client API service (api.ts)
│   │   └── components/
│   │       ├── common/         # Navbar, Footer, ToastContainer
│   │       ├── landing/        # Hero, HowItWorks, Capabilities, SampleShowcase, FAQ
│   │       ├── generator/      # 5-step guided wizard (Profile, Interests, Skills, Preferences, Review)
│   │       ├── cards/          # ProjectCard, FilterSortBar, ComparisonBar
│   │       ├── blueprint/      # 9 tabs (Overview, Features, Tech, Architecture SVG, DB, API, Roadmap, Mentor, Improve)
│   │       ├── comparison/     # Side-by-side comparison modal with AI recommendation
│   │       ├── dashboard/      # Journey metrics, saved bookmarks, active roadmaps
│   │       └── export/         # Printable academic synopsis modal & Markdown exporter
├── server/                     # Express + TypeScript Backend
│   ├── tsconfig.json           # NodeNext compilation settings
│   ├── src/
│   │   ├── index.ts            # Express server initialization, Helmet, CORS & route mounts
│   │   ├── config.ts           # Environment variables & Gemini configuration
│   │   ├── db/                 # Atomic persistent storage repository (store.ts)
│   │   ├── routes/             # API routes (projects.ts, mentor.ts, compare.ts, user.ts)
│   │   ├── services/           # Gemini AI service abstraction & Demo data engine
│   │   ├── validators/         # Zod schemas for input/output verification
│   │   ├── prompts/            # Anti-injection sanitized prompt templates
│   │   └── middleware/         # Rate limiting and sanitized error handling
│   └── tests/                  # Vitest test suite for validators, sanitizers & demo logic
├── scripts/
│   └── dev.js                  # Concurrent dev orchestrator
├── .env.example                # Environment template
├── .gitignore                  # Excludes node_modules, build outputs, and secrets
└── package.json                # Root package coordinator
```

---

## 5. Getting Started & Installation

### Prerequisites
- **Node.js**: `v18.0.0` or higher (`v20+` or `v24+` recommended)
- **npm**: `v9.0.0` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/projectforge-ai.git
cd projectforge-ai
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and configure your settings:
```env
# Optional: Add your Google Gemini API Key from https://aistudio.google.com/
# If omitted, ProjectForge AI operates in realistic Demo Mode automatically!
GEMINI_API_KEY=your_gemini_api_key_here

# Preferred Model
GEMINI_MODEL=gemini-2.0-flash

# Ports & URLs
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 3. Install Dependencies
Install dependencies for both client and server:
```bash
# In client:
cd client && npm install

# In server:
cd ../server && npm install
```

### 4. Run in Development Mode
To start both the client and server concurrently:
```bash
npm run dev
```
- **Frontend App**: Open [http://localhost:5173](http://localhost:5173)
- **Backend API**: Running at [http://localhost:5000](http://localhost:5000)
- **API Health Probe**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 6. Verification & Automated Testing

ProjectForge AI includes comprehensive automated Vitest test suites verifying schema validation, prompt sanitization, and grounded demo data logic.

Run backend tests:
```bash
cd server
npm test
```

Expected output:
```
✓ tests/validators.test.ts (9 tests)
Test Files  1 passed (1)
Tests       9 passed (9)
```

Run production builds:
```bash
# Build client
npm --prefix client run build

# Build server
npm --prefix server run build
```

---

## 7. Security Best Practices

- **Zero Client Credential Leakage**: `GEMINI_API_KEY` is loaded strictly on the Node.js server via `dotenv`. The client never has access to the secret key.
- **Strict Input Sanitization**: All freeform user inputs are sanitized against SQL keywords and LLM jailbreak triggers (`system prompt`, `ignore previous instructions`).
- **Prompt Injection Defense**: Inputs are regex-filtered and enclosed in deterministic delimiters before template injection.
- **Strict Rate Limiting**: `express-rate-limit` caps generation endpoints to 15 requests per minute per IP.
- **Output Schema Validation**: Every AI response is validated with Zod before presentation. If malformed, the system recovers gracefully rather than crashing.
- **Safe HTML Rendering**: No unescaped `dangerouslySetInnerHTML` is used. Architecture diagrams use native SVG elements.
- **No Stack Trace Leakage**: Server errors return sanitized error messages in production.

---

## 8. Accessibility (WCAG 2.1 AA)

- **Keyboard Navigable**: Full tab navigation across all 5 wizard steps, tabs, cards, and modal dialogs.
- **Visible Focus Rings**: Distinct `focus:ring-2 focus:ring-forge-500` rings on all interactive buttons and inputs.
- **Semantic HTML**: Proper `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` landmarks.
- **Color Independence**: Statuses combine color with distinct icons and explicit textual labels.
- **Responsive Typography**: Scales smoothly from 320px mobile screens to 4K displays.

---

## 9. Academic Project Submission & Defense Guide

When presenting your ProjectForge AI blueprint to project guides or external examiners:
1. **Open the Project Blueprint** and switch to the **Architecture Diagram** tab to walk examiners through client, gateway, backend, and data tiers.
2. **Review the Database Design** tab to prove your relational data modeling and foreign key integrity.
3. **Show the 8-Phase Roadmap** to illustrate semester planning and realistic milestone delivery.
4. **Click "Export Academic Synopsis"** to print or copy the formal project proposal for your university dossier.

---

## 10. License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
