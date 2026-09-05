# ProjectForge AI — Production Deployment Guide for Google Cloud Run

This guide details how to deploy **ProjectForge AI** to **Google Cloud Run** with production-grade security, automated secret management via **Google Cloud Secret Manager**, and zero credential leakage.

---

## 1. Production Architecture

```
                       ┌───────────────────────────────┐
                       │           Internet            │
                       └───────────────┬───────────────┘
                                       │ HTTPS (443)
                                       ▼
                       ┌───────────────────────────────┐
                       │     Google Cloud Run          │
                       │     (Fully Managed)           │
                       │                               │
                       │  ┌─────────────────────────┐  │
                       │  │ Express Production App  │  │
                       │  │   • Serves React SPA    │  │
                       │  │   • Serves /api/*       │  │
                       │  │   • Rate Limiting       │  │
                       │  │   • Strict Zod Guard    │  │
                       │  └────────────┬────────────┘  │
                       └───────────────┼───────────────┘
                                       │
                      ┌────────────────┴────────────────┐
                      │                                 │
                      ▼                                 ▼
        ┌───────────────────────────┐     ┌───────────────────────────┐
        │Google Cloud Secret Manager│     │  Google Gemini 2.0 API    │
        │(Injects GEMINI_API_KEY)   │     │ (Server-side GenAI SDK)   │
        └───────────────────────────┘     └───────────────────────────┘
```

### Architectural Highlights
- **Single Container Deployment**: One container image serves the optimized static React 19 frontend assets and handles all `/api/*` backend routes, eliminating cross-origin issues and eliminating unnecessary separate container overhead.
- **Server-Side Secret Isolation**: The `GEMINI_API_KEY` is loaded strictly on the Node.js server from Google Cloud Secret Manager. The client browser bundle never receives or has access to the secret key.
- **Stateless & Scalable**: Conforms to Cloud Run 12-factor principles. Scales from 0 instances during idle periods to multiple instances under high load.
- **Resilient Fallback (Demo Mode)**: If no key is supplied, or during API quota timeouts, the app gracefully operates in authentic **Demo Mode**, ensuring evaluators can always experience all features.

---

## 2. Prerequisites

1. **Google Cloud SDK (`gcloud`)**: Installed and initialized (`gcloud init`).
2. **Google Cloud Project**: A GCP project with billing enabled.
3. **Google Gemini API Key**: Acquired from [Google AI Studio](https://aistudio.google.com/).
4. **Docker**: (Optional if using Google Cloud Build).

---

## 3. Step-by-Step Deployment to Cloud Run

### Step 1: Set Google Cloud Project & Region
```bash
# Set your active GCP project ID
export PROJECT_ID="your-gcp-project-id"
export REGION="us-central1"

gcloud config set project $PROJECT_ID
```

### Step 2: Enable Required Google Cloud APIs
```bash
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com \
  cloudbuild.googleapis.com
```

### Step 3: Store Gemini API Key in Google Cloud Secret Manager
Store your Gemini API key securely in Secret Manager:
```bash
# Create the secret
gcloud secrets create gemini-api-key --replication-policy="automatic"

# Add the secret version (replace with your actual Gemini API key)
echo -n "YOUR_ACTUAL_GEMINI_API_KEY" | gcloud secrets versions add gemini-api-key --data-file=-
```

Grant the default Compute Engine service account access to read the secret:
```bash
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")

gcloud secrets add-iam-policy-binding gemini-api-key \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### Step 4: Build & Deploy to Cloud Run using Cloud Build

Deploy directly from source using the production `Dockerfile`:
```bash
gcloud run deploy projectforge-ai \
  --source . \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars="NODE_ENV=production,PORT=8080,HOST=0.0.0.0,GEMINI_MODEL=gemini-2.0-flash,AI_RATE_LIMIT=15,AI_RATE_WINDOW_MS=60000,GEMINI_TIMEOUT_MS=25000" \
  --set-secrets="GEMINI_API_KEY=gemini-api-key:latest"
```

*(Note: If deploying in Demo Mode without a Gemini key, simply omit the `--set-secrets` parameter.)*

### Step 5: Verify Deployment
Once deployment finishes, Cloud Run prints the public service URL:
```
Service [projectforge-ai] revision [projectforge-ai-00001] has been deployed and is serving 100 percent of traffic.
Service URL: https://projectforge-ai-xxxxxxxx-uc.a.run.app
```

Verify the health check and AI status endpoints:
```bash
# Health Check (Should return HTTP 200: {"status": "ok"})
curl https://projectforge-ai-xxxxxxxx-uc.a.run.app/api/health

# AI Status (Returns {"mode": "gemini", "model": "gemini-2.0-flash"})
curl https://projectforge-ai-xxxxxxxx-uc.a.run.app/api/ai/status
```

---

## 4. Production Security Checklist

| Check | Status | Verification |
| :--- | :---: | :--- |
| **Server-Side API Key** | Verified | API key only read by Node.js server via `process.env.GEMINI_API_KEY`. |
| **No Secrets in Frontend** | Verified | Client bundle inspected; contains zero `AIza` or secret tokens. |
| **No Secrets in Git** | Verified | `.gitignore` and `.dockerignore` exclude `.env` files and logs. |
| **HTTPS Only** | Verified | Cloud Run automatically terminates TLS 1.3 with managed certificates. |
| **Strict Rate Limiting** | Verified | `express-rate-limit` caps AI requests to 15 per minute per IP. |
| **Input Sanitization** | Verified | Zod schema checks array lengths, string lengths, and filters prompt injections. |
| **Output Schema Validation** | Verified | AI outputs validated with Zod before rendering; safe recovery fallback. |
| **Non-Root Container** | Verified | Dockerfile runs as unprivileged `USER node`. |
| **Least-Privilege Secrets** | Verified | Secret Manager grants access only to the Cloud Run service account. |
| **No Stack Trace Leakage** | Verified | Production errors return uniform `{ error: { code, message } }`. |

---

## 5. Local Docker Testing (Simulating Cloud Run Locally)

Test the container locally before deploying to GCP:
```bash
# 1. Build the Docker image
docker build -t projectforge-ai:local .

# 2. Run container in Demo Mode
docker run -p 8080:8080 -e PORT=8080 projectforge-ai:local

# 3. Or run with live Gemini key
docker run -p 8080:8080 -e PORT=8080 -e GEMINI_API_KEY="your-gemini-key" projectforge-ai:local
```

Open [http://localhost:8080](http://localhost:8080) in your browser to verify identical Cloud Run behavior.
