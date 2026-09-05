import { ProjectIdea, StudentProfile, ImprovementItem, ProjectComparisonResponse, MentorStructuredResponse } from '../types/index.js';

export const DEMO_PROJECTS: ProjectIdea[] = [
  {
    id: 'demo_neuropulse_healthtech',
    title: 'NeuroPulse: Edge-AI Tremor Analysis & Early Parkinson Screening System',
    tagline: 'Non-invasive neuromuscular assessment platform leveraging smartphone gyroscopes and computer vision',
    problemStatement: 'Early-stage neurodegenerative disorders like Parkinson’s disease often remain undiagnosed for years due to subtle initial motor fluctuations and lack of continuous, accessible clinical monitoring in rural or underserved areas.',
    solutionOverview: 'A hybrid edge-AI mobile web application that captures micro-tremors and spiral-drawing motor telemetry via mobile sensors and camera feeds, processing them with an on-device lightweight convolutional neural network to produce an objective clinical stability index for neurologists.',
    domain: 'HealthTech / Edge AI',
    difficulty: 'Intermediate',
    estimatedDuration: '3-6 months',
    teamSize: '3-4 students',
    innovationScore: 92,
    practicalityScore: 88,
    placementRelevance: 95,
    recommendedTechnologies: [
      { name: 'React + TypeScript', category: 'frontend', reason: 'High-performance interactive telemetry charts and web-sensor APIs integration.' },
      { name: 'FastAPI (Python)', category: 'backend', reason: 'Asynchronous handling of high-frequency sensor streams and native Python ML inference.' },
      { name: 'TensorFlow Lite / ONNX', category: 'ai_ml', reason: 'Edge inference running directly in-browser or on lightweight server without expensive cloud GPUs.' },
      { name: 'PostgreSQL', category: 'database', reason: 'Robust relational integrity for patient telemetry sessions and longitudinal score tracking.' },
      { name: 'WebSockets', category: 'apis', reason: 'Real-time 60Hz kinetic sensor data transmission during active drawing tests.' },
      { name: 'Docker', category: 'deployment', reason: 'Reproducible microservice containerization for clinic demonstration and academic viva.' }
    ],
    coreFeatures: [
      { title: 'Interactive Archimedes Spiral Canvas Test', description: 'Web-based pressure and path divergence recorder comparing drawn spirals against ideal geometric paths.', complexity: 'medium', estimatedHours: 24 },
      { title: 'Kinetic Accelerometer Stream Capture', description: 'Browser DeviceMotion API listener measuring tremor frequency (3-7 Hz band).', complexity: 'low', estimatedHours: 16 },
      { title: 'Patient Profile & Longitudinal History', description: 'Patient demographic dashboard with chronological risk score progression charts.', complexity: 'low', estimatedHours: 18 }
    ],
    intermediateFeatures: [
      { title: 'Wavelet Transform Frequency Decomposition', description: 'Continuous Wavelet Transform (CWT) filtering intentional movement from involuntary tremors.', complexity: 'medium', estimatedHours: 32 },
      { title: 'Clinician PDF Diagnostic Report Generator', description: 'Automated export of motor stability metrics with UPDRS (Unified Parkinson’s Disease Rating Scale) cross-references.', complexity: 'low', estimatedHours: 14 }
    ],
    advancedFeatures: [
      { title: 'WebRTC Remote Tele-Consultation Stream', description: 'Live video feed with real-time facial landmark and hand tremor overlay for remote doctors.', complexity: 'high', estimatedHours: 40 },
      { title: 'Synthetic Privacy-Preserving Differential Data Masking', description: 'Ensures HIPAA/academic ethical compliance before saving any telemetry samples.', complexity: 'medium', estimatedHours: 20 }
    ],
    aiFeatures: [
      { title: '1D-CNN Tremor Frequency Classifier', description: 'Pre-trained convolutional network classifying tremor patterns into Essential, Parkinsonian, or Physiological tremors.', complexity: 'high', estimatedHours: 35 },
      { title: 'Spiral Deviation Spatial Autoencoder', description: 'Reconstruction error anomaly detector highlighting subtle motor control degradation.', complexity: 'high', estimatedHours: 30 }
    ],
    expectedUsers: ['Neurology clinics', 'Geriatric care researchers', 'Patients undergoing motor rehabilitation', 'Academic viva evaluators'],
    requiredResources: ['Standard smartphone or webcam', 'Node.js & Python 3.10 runtime', 'Free-tier PostgreSQL (Supabase/Neon or Local SQLite)'],
    risks: [
      { risk: 'Mobile browser sensor permission variations across iOS and Android', mitigation: 'Implement automated permission fallback with calibration wizard and synthetic test mode.' },
      { risk: 'Ethical and clinical validation boundaries', mitigation: 'Explicitly label system as an academic screening research aid, not a definitive medical diagnosis tool.' }
    ],
    futureScope: [
      'Smartwatch Apple Watch / WearOS background tremor daemon',
      'Integration with open-source clinical FHIR protocol',
      'Federated learning on decentralized hospital nodes'
    ],
    architecture: {
      summary: 'Tiered client-edge pipeline where sensor streams are normalized in the browser client and streamed over WebSockets to a FastAPI ML microservice backed by PostgreSQL.',
      pattern: 'Edge-Assisted Client-Server Architecture',
      nodes: [
        { id: 'client_pwa', label: 'Student / Patient Web App', role: 'Telemetry capture & spiral test UI', technology: 'React + TS', category: 'client' },
        { id: 'api_gateway', label: 'API & WebSocket Gateway', role: 'Authentication & stream routing', technology: 'FastAPI / Node', category: 'gateway' },
        { id: 'ml_service', label: 'Motor Signal ML Pipeline', role: 'CWT filtering & 1D-CNN inference', technology: 'ONNX / PyTorch', category: 'ai' },
        { id: 'db_relational', label: 'Primary Clinical DB', role: 'Patient profiles & test runs', technology: 'PostgreSQL / SQLite', category: 'database' }
      ],
      edges: [
        { from: 'client_pwa', to: 'api_gateway', label: 'REST / WSS 60Hz', protocol: 'HTTPS / WSS' },
        { from: 'api_gateway', to: 'ml_service', label: 'Inference Task', protocol: 'Internal IPC / gRPC' },
        { from: 'api_gateway', to: 'db_relational', label: 'Persist Sessions', protocol: 'SQL' }
      ]
    },
    databaseDesign: [
      {
        name: 'Patients',
        description: 'Anonymous patient identification and demographic baseline',
        fields: [
          { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
          { name: 'anonymous_code', type: 'VARCHAR(20)', constraints: 'UNIQUE, NOT NULL' },
          { name: 'age_group', type: 'VARCHAR(10)', constraints: 'NOT NULL' },
          { name: 'clinical_notes', type: 'TEXT' }
        ]
      },
      {
        name: 'AssessmentSessions',
        description: 'Individual tremor and motor screening test runs',
        fields: [
          { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
          { name: 'patient_id', type: 'UUID', constraints: 'FOREIGN KEY REFERENCES Patients(id)' },
          { name: 'test_type', type: 'VARCHAR(30)', constraints: 'SPIRAL | ACCEL_TREMOR | FINGER_TAP' },
          { name: 'raw_telemetry_json', type: 'JSONB', constraints: 'NOT NULL' },
          { name: 'tremor_frequency_hz', type: 'FLOAT' },
          { name: 'parkinsonian_risk_index', type: 'FLOAT', constraints: '0.0 - 1.0' },
          { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT NOW()' }
        ]
      }
    ],
    apiDesign: [
      { method: 'POST', path: '/api/v1/sessions/start', description: 'Initialize an assessment session and fetch calibration parameters', responseSample: '{"sessionId": "sess_8912", "calibrationToken": "token_abc"}' },
      { method: 'POST', path: '/api/v1/telemetry/evaluate', description: 'Submit raw spiral coordinates or frequency vectors for on-demand ML evaluation', requestBody: '{"sessionId": "sess_8912", "points": [{"x": 12, "y": 44, "t": 160}]}', responseSample: '{"riskScore": 0.28, "tremorPeakHz": 4.8, "recommendation": "Stable"}' },
      { method: 'GET', path: '/api/v1/patients/:id/history', description: 'Retrieve historical trend of tremor progression', responseSample: '{"patientId": "p_1", "assessments": [{"date": "2025-01-10", "score": 0.22}]}' }
    ],
    roadmap: [
      { phaseNumber: 1, phaseName: 'Requirement Analysis & Clinical Feasibility', objective: 'Define sensor sampling parameters (60Hz minimum) and ethical protocol guidelines', estimatedDuration: '2 Weeks', tasks: [
        { id: 't1_1', title: 'Literature review on Archimedes spiral diagnostic algorithms', description: 'Study UPDRS clinical motor scoring literature.', estimatedDays: 5, deliverables: ['Literature Review Document'] },
        { id: 't1_2', title: 'Sensor API feasibility prototype on Chrome/Safari', description: 'Verify DeviceMotionEvent access on Android and iOS devices.', estimatedDays: 4, deliverables: ['Sensor Test HTML/JS Prototype'] }
      ]},
      { phaseNumber: 2, phaseName: 'UI/UX Wireframing & Sensor Canvas Design', objective: 'Create responsive, intuitive test interface suitable for elderly users', estimatedDuration: '2 Weeks', tasks: [
        { id: 't2_1', title: 'High-contrast canvas test interface in Figma', description: 'Large touch targets, zero cognitive clutter.', estimatedDays: 4, deliverables: ['Figma Prototype'] },
        { id: 't2_2', title: 'Canvas drawing recording engine in React', description: 'Smooth 60 FPS coordinate recorder with timestamp precision.', estimatedDays: 6, deliverables: ['Interactive Canvas Component'] }
      ]},
      { phaseNumber: 3, phaseName: 'Database Schema & Microservice Setup', objective: 'Implement database entities and fast ingestion pipeline', estimatedDuration: '2 Weeks', tasks: [
        { id: 't3_1', title: 'PostgreSQL migration scripts and ORM models', description: 'Define tables for patient sessions and kinetic metrics.', estimatedDays: 4, deliverables: ['SQL Migration Files'] },
        { id: 't3_2', title: 'FastAPI async ingestion endpoints', description: 'Configure CORS, pydantic validation, and SQLite/PG connection.', estimatedDays: 5, deliverables: ['FastAPI Health & Telemetry Routes'] }
      ]},
      { phaseNumber: 4, phaseName: 'Signal Processing & Feature Extraction', objective: 'Extract frequency domain features from raw accelerometer streams', estimatedDuration: '3 Weeks', tasks: [
        { id: 't4_1', title: 'Butterworth bandpass filter (2-12 Hz)', description: 'Filter noise and baseline gravitational drift.', estimatedDays: 7, deliverables: ['Python Signal Processing Pipeline'] },
        { id: 't4_2', title: 'Fast Fourier Transform (FFT) peak frequency detector', description: 'Identify dominant tremor frequencies in real-time.', estimatedDays: 6, deliverables: ['FFT Analysis Module'] }
      ]},
      { phaseNumber: 5, phaseName: 'Machine Learning Model Training & ONNX Export', objective: 'Train classifier on open Parkinson tremor datasets (e.g. mPower)', estimatedDuration: '3 Weeks', tasks: [
        { id: 't5_1', title: '1D-CNN tremor classifier training in PyTorch', description: 'Achieve >88% validation accuracy on benchmark datasets.', estimatedDays: 9, deliverables: ['Trained Model Weights (.pt)'] },
        { id: 't5_2', title: 'Model quantization and ONNX conversion', description: 'Reduce model size below 4MB for fast CPU/edge inference.', estimatedDays: 4, deliverables: ['model.onnx Artifact'] }
      ]},
      { phaseNumber: 6, phaseName: 'AI Integration & Clinician Dashboard', objective: 'Connect model inference to frontend dashboard with charts', estimatedDuration: '2 Weeks', tasks: [
        { id: 't6_1', title: 'Telemetry visualizer with Chart.js / Recharts', description: 'Plot frequency spectrum and spiral deviation heatmaps.', estimatedDays: 6, deliverables: ['Analytics Dashboard'] },
        { id: 't6_2', title: 'Automated Diagnostic PDF Report Builder', description: 'Generate formatted clinical summaries with timestamps and risk scores.', estimatedDays: 4, deliverables: ['PDF Export Utility'] }
      ]},
      { phaseNumber: 7, phaseName: 'Rigorous Testing & Accuracy Validation', objective: 'Simulate tremor variations and benchmark end-to-end latency', estimatedDuration: '2 Weeks', tasks: [
        { id: 't7_1', title: 'Unit testing of signal transformation and API routes', description: 'Vitest and Pytest test suites.', estimatedDays: 5, deliverables: ['Test Coverage Report (>80%)'] },
        { id: 't7_2', title: 'Cross-device mobile latency benchmarking', description: 'Ensure pipeline processes 5-second sample in < 800ms.', estimatedDays: 4, deliverables: ['Latency Benchmark Doc'] }
      ]},
      { phaseNumber: 8, phaseName: 'Deployment & Final Presentation Prep', objective: 'Deploy web app on cloud free-tier and prepare thesis defense demo', estimatedDuration: '1-2 Weeks', tasks: [
        { id: 't8_1', title: 'Containerization and deployment on Render/Railway', description: 'Set up live public demo link for evaluation.', estimatedDays: 4, deliverables: ['Live Working URL'] },
        { id: 't8_2', title: 'Viva demonstration slide deck and demo script', description: 'Prepare live test with examiner participating.', estimatedDays: 3, deliverables: ['Presentation Slides (.pptx)'] }
      ]}
    ],
    isDemo: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'demo_trustledger_fintech',
    title: 'TrustLedger: Real-Time Fraud Guard & Explainable AML Transaction Monitor',
    tagline: 'High-throughput synthetic financial transaction monitoring engine with SHAP explainability and graph community anomaly detection',
    problemStatement: 'Modern financial institutions struggle with rigid rule-based anti-money laundering (AML) systems that produce 95%+ false positives, while modern complex fraud rings evade detection through multi-hop layering and synthetic identities.',
    solutionOverview: 'An event-driven financial intelligence dashboard combining graph relationship analysis (NetworkX / Neo4j) with an XGBoost anomaly detector. The platform explains every flagged alert using local SHAP feature attributions, allowing compliance analysts to review transactions with full transparency.',
    domain: 'FinTech / Cybersecurity',
    difficulty: 'Advanced',
    estimatedDuration: '3-6 months',
    teamSize: '3-4 students',
    innovationScore: 95,
    practicalityScore: 91,
    placementRelevance: 98,
    recommendedTechnologies: [
      { name: 'React + Tailwind CSS', category: 'frontend', reason: 'High-density banking dashboard with interactive network graphs and metric tables.' },
      { name: 'Node.js / Express', category: 'backend', reason: 'High-throughput asynchronous event ingestion and alerting WebSockets.' },
      { name: 'Python FastAPI (Worker)', category: 'ai_ml', reason: 'XGBoost fraud classification and SHAP value mathematical computations.' },
      { name: 'PostgreSQL', category: 'database', reason: 'ACID-compliant transactional record storage and audit logs.' },
      { name: 'Cytoscape.js / D3.js', category: 'frontend', reason: 'Visual interactive rendering of multi-hop money mule transaction networks.' },
      { name: 'Redis', category: 'cache', reason: 'In-memory sliding-window velocity checks (e.g., >5 transfers within 60 seconds).' }
    ],
    coreFeatures: [
      { title: 'Simulated High-Velocity Transaction Stream', description: 'Generator mimicking realistic transaction bursts with injected mule and structuring patterns.', complexity: 'medium', estimatedHours: 20 },
      { title: 'Sliding-Window Velocity Rule Engine', description: 'Instant flagging of rapid transfers exceeding configured volume or geographic velocity.', complexity: 'medium', estimatedHours: 22 },
      { title: 'Compliance Analyst Alert Inbox', description: 'Prioritized queue of suspicious activities with status management (Pending, Under Investigation, Dismissed).', complexity: 'low', estimatedHours: 15 }
    ],
    intermediateFeatures: [
      { title: 'Multi-Hop Money Mule Graph Visualizer', description: 'Interactive network graph tracing funds through layered intermediary accounts.', complexity: 'high', estimatedHours: 35 },
      { title: 'Explainable AI (XAI) SHAP Waterfall Cards', description: 'Decomposes why a transaction was flagged into human-readable percentage contributions.', complexity: 'medium', estimatedHours: 25 }
    ],
    advancedFeatures: [
      { title: 'Synthetic Identity Fraud Detector', description: 'Identifies clusters of accounts sharing anomalous combinations of SSN prefixes, phone numbers, or addresses.', complexity: 'high', estimatedHours: 38 },
      { title: 'Automated Regulatory SAR (Suspicious Activity Report) Drafting', description: 'Generates standardized regulatory audit reports with chronological transaction logs.', complexity: 'medium', estimatedHours: 22 }
    ],
    aiFeatures: [
      { title: 'XGBoost Supervised Fraud Classifier', description: 'Gradient boosting model trained on skewed financial datasets (e.g. IEEE-CIS Fraud Detection).', complexity: 'high', estimatedHours: 30 },
      { title: 'Graph Autoencoder Unsupervised Ring Detector', description: 'Detects previously unseen money laundering rings via anomalous sub-graph density.', complexity: 'high', estimatedHours: 40 }
    ],
    expectedUsers: ['FinTech fraud prevention teams', 'Bank compliance officers', 'Academic researchers in financial cybercrime', 'Recruiters hiring backend/security engineers'],
    requiredResources: ['Standard development laptop', 'Docker Desktop (optional for Redis/Postgres)', 'Free cloud tier for deployment'],
    risks: [
      { risk: 'Class imbalance in fraud training datasets (typically 0.1% fraud vs 99.9% legitimate)', mitigation: 'Employ SMOTE oversampling and focal loss, optimizing for Precision-Recall AUC rather than raw accuracy.' },
      { risk: 'Compute latency of SHAP explanations during live streaming', mitigation: 'Calculate TreeSHAP approximations asynchronously and cache baseline background data.' }
    ],
    futureScope: [
      'Zero-knowledge proof validation for cross-border privacy-preserving checks',
      'Integration with cryptocurrency blockchain ledger scanners',
      'Real-time automated payment hold webhook hooks'
    ],
    architecture: {
      summary: 'Event-driven ingestion pipeline where simulated transactions enter Node.js API, get evaluated against Redis velocity counters, and stream to a Python ML microservice for graph & XGBoost classification.',
      pattern: 'Event-Driven Microservices with Graph Analytics',
      nodes: [
        { id: 'bank_ui', label: 'Compliance Web Portal', role: 'Alert triage & network graph visualization', technology: 'React + Cytoscape', category: 'client' },
        { id: 'ingest_svc', label: 'Transaction Ingestion API', role: 'Event validation and velocity tracking', technology: 'Node.js / Express', category: 'gateway' },
        { id: 'redis_cache', label: 'Velocity Cache & PubSub', role: 'Real-time sliding window counters', technology: 'Redis', category: 'cache' },
        { id: 'ai_engine', label: 'Fraud & Explainability Service', role: 'XGBoost inference & SHAP attribution', technology: 'Python / FastAPI', category: 'ai' },
        { id: 'ledger_db', label: 'Financial Audit DB', role: 'Immutable transaction records and alerts', technology: 'PostgreSQL', category: 'database' }
      ],
      edges: [
        { from: 'bank_ui', to: 'ingest_svc', label: 'REST / WSS', protocol: 'HTTPS / WSS' },
        { from: 'ingest_svc', to: 'redis_cache', label: 'Atomic INCR / EXPIRE', protocol: 'TCP' },
        { from: 'ingest_svc', to: 'ai_engine', label: 'Evaluate Anomaly', protocol: 'HTTP REST' },
        { from: 'ingest_svc', to: 'ledger_db', label: 'Store Transactions', protocol: 'SQL' }
      ]
    },
    databaseDesign: [
      {
        name: 'Accounts',
        description: 'Customer financial account entities',
        fields: [
          { name: 'account_number', type: 'VARCHAR(34)', constraints: 'PRIMARY KEY' },
          { name: 'holder_name', type: 'VARCHAR(100)', constraints: 'NOT NULL' },
          { name: 'kyc_risk_tier', type: 'VARCHAR(10)', constraints: 'LOW | MEDIUM | HIGH' },
          { name: 'balance_usd', type: 'DECIMAL(14,2)', constraints: 'NOT NULL' }
        ]
      },
      {
        name: 'Transactions',
        description: 'Individual financial movement events',
        fields: [
          { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
          { name: 'source_account', type: 'VARCHAR(34)', constraints: 'FOREIGN KEY REFERENCES Accounts' },
          { name: 'target_account', type: 'VARCHAR(34)', constraints: 'FOREIGN KEY REFERENCES Accounts' },
          { name: 'amount', type: 'DECIMAL(12,2)', constraints: 'NOT NULL' },
          { name: 'currency', type: 'VARCHAR(3)', constraints: 'DEFAULT USD' },
          { name: 'fraud_score', type: 'FLOAT', constraints: '0.0 - 100.0' },
          { name: 'status', type: 'VARCHAR(20)', constraints: 'APPROVED | FLAGGED | BLOCKED' },
          { name: 'timestamp', type: 'TIMESTAMP', constraints: 'NOT NULL' }
        ]
      },
      {
        name: 'AlertInvestigations',
        description: 'Auditable compliance review cases',
        fields: [
          { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
          { name: 'transaction_id', type: 'UUID', constraints: 'FOREIGN KEY REFERENCES Transactions(id)' },
          { name: 'analyst_decision', type: 'VARCHAR(20)', constraints: 'PENDING | ESCALATED | CLEARED' },
          { name: 'shap_features_json', type: 'JSONB' },
          { name: 'review_notes', type: 'TEXT' }
        ]
      }
    ],
    apiDesign: [
      { method: 'POST', path: '/api/v1/transactions/ingest', description: 'Process an incoming transaction, evaluate risk score and return authorization decision', requestBody: '{"source": "ACC_1001", "target": "ACC_9921", "amount": 8900.00}', responseSample: '{"authorized": false, "riskScore": 89.4, "alertId": "alt_124"}' },
      { method: 'GET', path: '/api/v1/alerts/feed', description: 'Stream active suspicious transactions with real-time risk scores', responseSample: '{"alerts": [{"id": "alt_124", "amount": 8900, "reason": "Rapid Hop Velocity"}]}' },
      { method: 'GET', path: '/api/v1/graphs/mule-network/:accountId', description: 'Retrieve nodes and edges for money mule graph traversal', responseSample: '{"nodes": [{"id": "ACC_1001"}], "edges": [{"from": "ACC_1001", "to": "ACC_9921", "amount": 8900}]}' }
    ],
    roadmap: [
      { phaseNumber: 1, phaseName: 'System Architecture & Threat Modeling', objective: 'Define AML typology catalog (Structuring, Layering, Mule Networks)', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_aml_1', title: 'Catalog common money laundering schemes and regulatory metrics', description: 'Synthesize FATF guidance on transaction monitoring.', estimatedDays: 5, deliverables: ['AML Typology Spec'] },
        { id: 't_aml_2', title: 'Design low-latency streaming pipeline architecture', description: 'Benchmark Redis vs in-memory maps for sliding velocity counters.', estimatedDays: 4, deliverables: ['Architecture Blueprint'] }
      ]},
      { phaseNumber: 2, phaseName: 'High-Density Compliance UI Development', objective: 'Build modern fintech dark-mode interface with live metric tables', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_aml_3', title: 'React dashboard with live alert feeds', description: 'Implement tabular and card views with keyboard triage shortcuts.', estimatedDays: 6, deliverables: ['Compliance Dashboard UI'] },
        { id: 't_aml_4', title: 'Cytoscape.js money flow network visualization', description: 'Interactive graph layout rendering accounts and transfer arrows.', estimatedDays: 7, deliverables: ['Graph Visualization Component'] }
      ]},
      { phaseNumber: 3, phaseName: 'Transaction Ingestion & Database Design', objective: 'Set up resilient PostgreSQL schema and Express ingestion API', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_aml_5', title: 'Database schema migrations with indexes', description: 'Create tables and optimized indexes for fast account history queries.', estimatedDays: 5, deliverables: ['Postgres Schema Files'] },
        { id: 't_aml_6', title: 'Transaction generator microservice', description: 'Generates 50 tx/sec with configurable mule patterns.', estimatedDays: 6, deliverables: ['Simulation Script'] }
      ]},
      { phaseNumber: 4, phaseName: 'Sliding-Window Rule Engine & Velocity Checks', objective: 'Implement fast in-memory detection for obvious fraud signatures', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_aml_7', title: 'Sliding window velocity counter in Redis/Node', description: 'Flag accounts with > $10,000 across 3 hops in under 10 minutes.', estimatedDays: 7, deliverables: ['Rule Evaluator Engine'] },
        { id: 't_aml_8', title: 'Configurable rule management UI', description: 'Allow analysts to tune thresholds without restarting backend.', estimatedDays: 4, deliverables: ['Rule Settings Screen'] }
      ]},
      { phaseNumber: 5, phaseName: 'Machine Learning Model & SHAP Explainer', objective: 'Train XGBoost model and connect local explainability engine', estimatedDuration: '3 Weeks', tasks: [
        { id: 't_aml_9', title: 'Feature engineering on temporal transaction logs', description: 'Compute rolling averages, balance ratios, and target entropy.', estimatedDays: 8, deliverables: ['ML Training Pipeline'] },
        { id: 't_aml_10', title: 'FastAPI SHAP explanation microservice', description: 'Generate waterfall chart coordinates showing top 5 risk drivers.', estimatedDays: 7, deliverables: ['SHAP Explanation API'] }
      ]},
      { phaseNumber: 6, phaseName: 'Case Management & SAR Export', objective: 'Allow compliance analysts to triage cases and generate audit reports', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_aml_11', title: 'Investigation audit trail logging', description: 'Log all analyst decisions, timestamps, and dismissal rationales.', estimatedDays: 5, deliverables: ['Audit Logging Module'] },
        { id: 't_aml_12', title: 'Automated SAR PDF report export', description: 'Generate professional regulatory PDF ready for submission.', estimatedDays: 5, deliverables: ['PDF Report Generator'] }
      ]},
      { phaseNumber: 7, phaseName: 'Security Hardening & Load Testing', objective: 'Simulate high transaction loads and test injection resilience', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_aml_13', title: 'Artillery / k6 load test for 200 tx/sec', description: 'Measure p95 response times under burst scenarios.', estimatedDays: 5, deliverables: ['Load Test Report'] },
        { id: 't_aml_14', title: 'API authentication and role-based access control', description: 'Implement JWT tokens with Analyst and Admin permissions.', estimatedDays: 4, deliverables: ['Security Audit Checklist'] }
      ]},
      { phaseNumber: 8, phaseName: 'Final Presentation & Viva Demonstration', objective: 'Prepare live attack simulation for academic jury', estimatedDuration: '1-2 Weeks', tasks: [
        { id: 't_aml_15', title: 'Scripted live money mule attack demo', description: 'Run automated script that launches structuring attack and shows instant alert.', estimatedDays: 4, deliverables: ['Live Demo Script'] },
        { id: 't_aml_16', title: 'Final project documentation and thesis chapter', description: 'Complete 50-page formal project report.', estimatedDays: 5, deliverables: ['Final Project Thesis (.pdf)'] }
      ]}
    ],
    isDemo: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'demo_codementor_edtech',
    title: 'CodeMentor-X: Automated Multi-Language Student Code Reviewer & AST Vulnerability Checker',
    tagline: 'Interactive static analysis and GenAI pedagogical feedback platform for university programming labs',
    problemStatement: 'In university programming classes with hundreds of students, professors and TAs cannot provide timely, line-by-line feedback. Traditional auto-graders (like Kattis or LeetCode) only check pass/fail test cases without explaining memory leaks, bad time complexity, or security anti-patterns.',
    solutionOverview: 'A web-based programming workbench that combines Abstract Syntax Tree (AST) static analysis with structured LLM mentoring. When students write code in C++, Python, or Java, CodeMentor-X analyzes algorithm efficiency, detects memory/buffer bugs, and provides Socratic interactive hints rather than simply giving away the solution.',
    domain: 'EdTech / Developer Tools',
    difficulty: 'Intermediate',
    estimatedDuration: '1-3 months',
    teamSize: '2-3 students',
    innovationScore: 90,
    practicalityScore: 96,
    placementRelevance: 94,
    recommendedTechnologies: [
      { name: 'React + Monaco Editor', category: 'frontend', reason: 'Industry-standard VS Code editor experience with syntax highlighting and inline diagnostic markers.' },
      { name: 'Node.js / Express', category: 'backend', reason: 'Lightweight orchestration of AST parsers and secure execution sandbox workers.' },
      { name: 'Google Gemini API', category: 'ai_ml', reason: 'Structured pedagogical Socratic feedback explaining complex algorithmic bugs.' },
      { name: 'Docker / Isolate', category: 'deployment', reason: 'Isolated sandboxed execution preventing fork bombs and malicious code execution.' },
      { name: 'SQLite / PostgreSQL', category: 'database', reason: 'Storage for lab assignments, student submission diffs, and code review history.' }
    ],
    coreFeatures: [
      { title: 'In-Browser Monaco Code Editor with Language Support', description: 'Full-featured editor supporting C++, Python, and JavaScript with linting.', complexity: 'low', estimatedHours: 12 },
      { title: 'AST Static Anti-Pattern Scanner', description: 'Detects hardcoded secrets, infinite loops, unused variables, and excessive recursion depth.', complexity: 'medium', estimatedHours: 20 },
      { title: 'Socratic AI Hint Assistant', description: 'Generates step-by-step questions to guide the student toward self-correction.', complexity: 'medium', estimatedHours: 18 }
    ],
    intermediateFeatures: [
      { title: 'Big-O Algorithmic Complexity Estimator', description: 'Analyzes nested loop constructs to infer empirical and theoretical time complexity.', complexity: 'medium', estimatedHours: 24 },
      { title: 'Side-by-Side Clean Code Refactoring Diff', description: 'Interactive diff showing idiomatic styling improvements without altering logic.', complexity: 'low', estimatedHours: 14 }
    ],
    advancedFeatures: [
      { title: 'Sandboxed Test Runner with Memory Profiler', description: 'Executes student code against hidden unit tests with strict memory and CPU caps.', complexity: 'high', estimatedHours: 35 },
      { title: 'Instructor Classroom Analytics Matrix', description: 'Heatmap showing common syntax misconceptions across an entire batch of students.', complexity: 'medium', estimatedHours: 20 }
    ],
    aiFeatures: [
      { title: 'Pedagogical Socratic Prompt Engine', description: 'Restricts the LLM from providing direct answers; enforces teaching through hints.', complexity: 'medium', estimatedHours: 15 },
      { title: 'Automated Unit Test Generator', description: 'Analyzes student code and generates edge-case inputs (e.g. empty arrays, INT_MAX).', complexity: 'high', estimatedHours: 28 }
    ],
    expectedUsers: ['Computer Science undergraduates', 'Programming course teaching assistants', 'Coding bootcamps', 'Autonomous learners'],
    requiredResources: ['Standard laptop', 'Docker for isolated sandbox', 'Free Gemini API key or local AST engine'],
    risks: [
      { risk: 'Security risks of executing arbitrary student code', mitigation: 'Strict sandbox isolation with zero network access, seccomp filters, and hard CPU/RAM limits.' },
      { risk: 'LLM hallucinating non-existent language syntax', mitigation: 'Combine LLM output with compiler error message validation before display.' }
    ],
    futureScope: [
      'Visual execution stepper (animating pointer diagrams and stack frames)',
      'Integration with GitHub Classroom webhooks',
      'Plagiarism and AST similarity clustering across student cohort'
    ],
    architecture: {
      summary: 'Student writes code in Monaco Editor; frontend submits code to Express API; static AST analysis runs locally while LLM generates pedagogical reviews, and sandboxed Docker worker executes tests.',
      pattern: 'Sandboxed Microservice Architecture',
      nodes: [
        { id: 'editor_ui', label: 'Monaco Web IDE', role: 'Code editing and inline diagnostic markers', technology: 'React + Monaco', category: 'client' },
        { id: 'backend_api', label: 'Review Orchestration Server', role: 'AST parsing and prompt coordinator', technology: 'Node.js / Express', category: 'gateway' },
        { id: 'sandbox_runner', label: 'Isolated Code Sandbox', role: 'Safe compile and execution runner', technology: 'Docker / gVisor', category: 'external' },
        { id: 'gemini_service', label: 'Socratic Tutor Service', role: 'Pedagogical feedback and hint generation', technology: 'Google Gemini 2.0', category: 'ai' },
        { id: 'app_db', label: 'Submissions & Lab DB', role: 'Student code versions and review logs', technology: 'SQLite / Postgres', category: 'database' }
      ],
      edges: [
        { from: 'editor_ui', to: 'backend_api', label: 'Submit Code', protocol: 'HTTPS REST' },
        { from: 'backend_api', to: 'sandbox_runner', label: 'Execute Sandboxed', protocol: 'Unix Socket / HTTP' },
        { from: 'backend_api', to: 'gemini_service', label: 'Generate Feedback', protocol: 'HTTPS' },
        { from: 'backend_api', to: 'app_db', label: 'Save Submission', protocol: 'SQL' }
      ]
    },
    databaseDesign: [
      {
        name: 'Assignments',
        description: 'Programming problem statements and test suites',
        fields: [
          { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
          { name: 'title', type: 'VARCHAR(100)', constraints: 'NOT NULL' },
          { name: 'language', type: 'VARCHAR(20)', constraints: 'cpp | python | java' },
          { name: 'starter_code', type: 'TEXT' },
          { name: 'test_cases_json', type: 'JSONB' }
        ]
      },
      {
        name: 'Submissions',
        description: 'Student submitted code attempts and review outputs',
        fields: [
          { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
          { name: 'assignment_id', type: 'UUID', constraints: 'FOREIGN KEY REFERENCES Assignments(id)' },
          { name: 'code_content', type: 'TEXT', constraints: 'NOT NULL' },
          { name: 'ast_warnings_count', type: 'INT', constraints: 'DEFAULT 0' },
          { name: 'estimated_time_complexity', type: 'VARCHAR(20)' },
          { name: 'ai_feedback_summary', type: 'TEXT' },
          { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT NOW()' }
        ]
      }
    ],
    apiDesign: [
      { method: 'POST', path: '/api/v1/review/analyze', description: 'Perform AST parsing and generate pedagogical hint review', requestBody: '{"language": "python", "code": "def find_max(arr): ..."}', responseSample: '{"complexity": "O(N)", "hints": ["Check your loop termination"], "score": 85}' },
      { method: 'POST', path: '/api/v1/review/execute', description: 'Run code against test cases in isolated worker', requestBody: '{"code": "print(1)", "language": "python"}', responseSample: '{"passed": true, "stdout": "1\\n", "executionTimeMs": 42}' }
    ],
    roadmap: [
      { phaseNumber: 1, phaseName: 'Requirements & Static Analysis Design', objective: 'Specify language support and AST linting rules', estimatedDuration: '1 Week', tasks: [
        { id: 't_cm_1', title: 'Survey common student bugs in CS101 courses', description: 'Catalog off-by-one errors and pointer null dereferences.', estimatedDays: 3, deliverables: ['Bug Taxonomy Spec'] }
      ]},
      { phaseNumber: 2, phaseName: 'Monaco Editor & UI Layout', objective: 'Build dual-pane coding and feedback interface', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_cm_2', title: 'Embed Monaco Editor with multi-tab support', description: 'Configure theme, syntax highlighting, and keyboard bindings.', estimatedDays: 5, deliverables: ['Editor Component'] }
      ]},
      { phaseNumber: 3, phaseName: 'AST Parser Integration', objective: 'Implement static syntax tree analyzer for Python/C++', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_cm_3', title: 'Python AST analyzer script', description: 'Detect recursion without base cases and bare except clauses.', estimatedDays: 6, deliverables: ['AST Parser Module'] }
      ]},
      { phaseNumber: 4, phaseName: 'Gemini Socratic AI Prompt Engineering', objective: 'Build prompt pipeline that guides without revealing answers', estimatedDuration: '1-2 Weeks', tasks: [
        { id: 't_cm_4', title: 'Prompt engineering and schema enforcement', description: 'Enforce JSON response with hints, reasons, and self-test checks.', estimatedDays: 5, deliverables: ['AI Mentor Service'] }
      ]},
      { phaseNumber: 5, phaseName: 'Docker Sandboxed Execution Service', objective: 'Safely compile and execute student code in ephemeral container', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_cm_5', title: 'Docker runner with CPU/memory limits', description: 'Enforce 2-second timeout and 128MB RAM limit.', estimatedDays: 7, deliverables: ['Sandbox Worker Container'] }
      ]},
      { phaseNumber: 6, phaseName: 'Test Suite & Complexity Visualizer', objective: 'Visual rendering of time complexity and test pass/fail results', estimatedDuration: '1-2 Weeks', tasks: [
        { id: 't_cm_6', title: 'Test execution reporter UI', description: 'Visual green/red test matrix with input/output diffs.', estimatedDays: 5, deliverables: ['Test Runner UI'] }
      ]},
      { phaseNumber: 7, phaseName: 'Automated Testing & Security Audit', objective: 'Penetration test the code execution sandbox', estimatedDuration: '1 Week', tasks: [
        { id: 't_cm_7', title: 'Sandbox breakout and fork bomb testing', description: 'Verify kernel isolation against infinite resource consumption.', estimatedDays: 4, deliverables: ['Security Audit Doc'] }
      ]},
      { phaseNumber: 8, phaseName: 'Final Presentation & Viva Demo', objective: 'Demo system with professor submitting deliberate bug', estimatedDuration: '1 Week', tasks: [
        { id: 't_cm_8', title: 'Demonstration deck and sample test problems', description: 'Prepare 3 standard university problems for live evaluation.', estimatedDays: 3, deliverables: ['Viva Presentation'] }
      ]}
    ],
    isDemo: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'demo_aerogrid_iot_smartcities',
    title: 'AeroGrid: Hyperlocal Air Quality & Urban Heat Island Microclimate Predictor',
    tagline: 'IoT sensor mesh with spatio-temporal Graph Neural Networks for block-by-block environmental forecasting',
    problemStatement: 'Government meteorological stations are located kilometers apart, missing deadly hyperlocal pollution spikes (PM2.5 / NO2) and microclimate heat pockets caused by urban street canyons, construction, and traffic bottlenecks.',
    solutionOverview: 'A smart city environmental monitoring platform integrating low-cost ESP32 sensor telemetry with satellite open data. Uses a spatio-temporal Graph Convolutional Network (GCN) to predict block-by-block air quality 6 hours into the future, providing city planners with actionable green-corridor recommendations.',
    domain: 'Smart Cities / IoT / Environmental',
    difficulty: 'Intermediate',
    estimatedDuration: '3-6 months',
    teamSize: '3-4 students',
    innovationScore: 93,
    practicalityScore: 92,
    placementRelevance: 89,
    recommendedTechnologies: [
      { name: 'React + Mapbox / Leaflet', category: 'frontend', reason: 'Interactive GIS heatmap visualization with temporal scrubber slider.' },
      { name: 'Node.js / Express', category: 'backend', reason: 'MQTT broker subscriber and geospatial REST API server.' },
      { name: 'PostGIS / TimescaleDB', category: 'database', reason: 'Optimized time-series and geospatial polygon queries.' },
      { name: 'Python (PyTorch Geometric)', category: 'ai_ml', reason: 'Spatio-temporal graph convolutional modeling of wind and sensor adjacency.' },
      { name: 'MQTT / Mosquitto', category: 'apis', reason: 'Ultra-low bandwidth protocol for battery-operated ESP32 telemetry nodes.' },
      { name: 'ESP32 + PMS5003 Sensor', category: 'deployment', reason: 'Affordable hardware build (<$25 per node) for genuine physical student prototype.' }
    ],
    coreFeatures: [
      { title: 'Interactive Hyperlocal GIS Map with Heatmap Overlay', description: 'Leaflet-based live city map displaying real-time PM2.5, PM10, and Temperature.', complexity: 'medium', estimatedHours: 22 },
      { title: 'MQTT Telemetry Broker Ingestion Worker', description: 'Receives and validates sensor packets from distributed hardware nodes.', complexity: 'low', estimatedHours: 14 },
      { title: 'Public Air Quality Index (AQI) Citizen Warning Widget', description: 'Color-coded health advisory cards for schools, runners, and asthma patients.', complexity: 'low', estimatedHours: 12 }
    ],
    intermediateFeatures: [
      { title: '6-Hour Predictive Pollution Forecasting', description: 'Forecasts pollution drift based on local wind vectors and historical traffic patterns.', complexity: 'high', estimatedHours: 32 },
      { title: 'Urban Heat Island (UHI) Index Calculator', description: 'Calculates temperature variance between vegetated and concrete urban blocks.', complexity: 'medium', estimatedHours: 20 }
    ],
    advancedFeatures: [
      { title: 'Optimal Green Corridor Simulation', description: 'Simulates where planting 50 urban trees would maximize cooling and particulate filtration.', complexity: 'high', estimatedHours: 36 },
      { title: 'Sensor Drift Calibration Autoencoder', description: 'Automatically detects and re-calibrates aging or dirty optical dust sensors.', complexity: 'medium', estimatedHours: 25 }
    ],
    aiFeatures: [
      { title: 'Spatio-Temporal Graph Neural Network', description: 'Models physical proximity and wind diffusion vectors between sensor nodes.', complexity: 'high', estimatedHours: 35 },
      { title: 'Anomalous Pollution Source Triangulation', description: 'Traces sudden industrial or burn-off spikes back to probable source coordinates.', complexity: 'high', estimatedHours: 30 }
    ],
    expectedUsers: ['Municipal urban planning bodies', 'University campus sustainability offices', 'Asthma and respiratory patients', 'Environmental NGOs'],
    requiredResources: ['ESP32 microcontroller ($5) + PMS5003 sensor ($15) or synthetic data generator', 'Mapbox / OpenStreetMap free token', 'Standard node runtime'],
    risks: [
      { risk: 'Hardware sensor calibration drift due to humidity and rain', mitigation: 'Implement relative humidity polynomial compensation equation in firmware and API.' },
      { risk: 'Sparse sensor coverage in initial campus deployment', mitigation: 'Employ Kriging spatial interpolation to estimate values between deployed nodes.' }
    ],
    futureScope: [
      'LoRaWAN long-range low-power gateway integration',
      'Autonomous drone sampling for vertical altitude pollution profile',
      'Integration with smart city traffic light signaling systems'
    ],
    architecture: {
      summary: 'ESP32 field nodes transmit telemetry over MQTT; backend worker writes to TimescaleDB/PostGIS; ML model runs spatial inference and serves interactive Leaflet map.',
      pattern: 'IoT Edge-to-Cloud Telemetry Pipeline',
      nodes: [
        { id: 'iot_nodes', label: 'ESP32 Sensing Nodes', role: 'Hardware collection of PM2.5 and Temp', technology: 'ESP32 / C++', category: 'client' },
        { id: 'mqtt_broker', label: 'MQTT Broker', role: 'Lightweight publish/subscribe broker', technology: 'Mosquitto / HiveMQ', category: 'gateway' },
        { id: 'api_server', label: 'Geospatial API Server', role: 'Timeseries ingestion and query service', technology: 'Node.js / Express', category: 'app' },
        { id: 'timescale_db', label: 'Spatio-Temporal DB', role: 'TimescaleDB and PostGIS geospatial index', technology: 'PostgreSQL / PostGIS', category: 'database' },
        { id: 'gcn_model', label: 'Spatial Forecast Model', role: 'Graph convolution pollution forecasting', technology: 'PyTorch Geometric', category: 'ai' },
        { id: 'map_portal', label: 'Citizen & Planner Portal', role: 'Interactive map and analytics dashboard', technology: 'React + Leaflet', category: 'client' }
      ],
      edges: [
        { from: 'iot_nodes', to: 'mqtt_broker', label: 'MQTT Publish', protocol: 'MQTT / TCP' },
        { from: 'mqtt_broker', to: 'api_server', label: 'MQTT Subscribe', protocol: 'TCP' },
        { from: 'api_server', to: 'timescale_db', label: 'Insert Sensor Log', protocol: 'SQL' },
        { from: 'api_server', to: 'gcn_model', label: 'Fetch 6h Forecast', protocol: 'HTTP REST' },
        { from: 'map_portal', to: 'api_server', label: 'Query Heatmap GeoJSON', protocol: 'HTTPS REST' }
      ]
    },
    databaseDesign: [
      {
        name: 'SensorStations',
        description: 'Physical sensor metadata and GPS coordinates',
        fields: [
          { name: 'id', type: 'VARCHAR(30)', constraints: 'PRIMARY KEY' },
          { name: 'station_name', type: 'VARCHAR(80)', constraints: 'NOT NULL' },
          { name: 'latitude', type: 'DOUBLE PRECISION', constraints: 'NOT NULL' },
          { name: 'longitude', type: 'DOUBLE PRECISION', constraints: 'NOT NULL' },
          { name: 'installation_height_m', type: 'FLOAT' },
          { name: 'is_active', type: 'BOOLEAN', constraints: 'DEFAULT TRUE' }
        ]
      },
      {
        name: 'TelemetryReadings',
        description: 'High-frequency environmental readings',
        fields: [
          { name: 'id', type: 'BIGSERIAL', constraints: 'PRIMARY KEY' },
          { name: 'station_id', type: 'VARCHAR(30)', constraints: 'FOREIGN KEY REFERENCES SensorStations(id)' },
          { name: 'pm25', type: 'FLOAT', constraints: 'NOT NULL' },
          { name: 'pm10', type: 'FLOAT' },
          { name: 'temperature_c', type: 'FLOAT' },
          { name: 'humidity_percent', type: 'FLOAT' },
          { name: 'aqi_calculated', type: 'INT' },
          { name: 'recorded_at', type: 'TIMESTAMP', constraints: 'NOT NULL' }
        ]
      }
    ],
    apiDesign: [
      { method: 'GET', path: '/api/v1/sensors/live-geojson', description: 'Retrieve GeoJSON FeatureCollection of all active stations with current AQI', responseSample: '{"type": "FeatureCollection", "features": [{"type": "Feature", "geometry": {"coordinates": [77.59, 12.97]}, "properties": {"pm25": 42.1, "aqi": 117}}]}' },
      { method: 'POST', path: '/api/v1/telemetry/ingest', description: 'Sensor packet ingestion endpoint for hardware nodes', requestBody: '{"stationId": "NODE_CAMPUS_01", "pm25": 38.5, "temp": 29.2, "humidity": 65}', responseSample: '{"status": "recorded", "id": 9012}' }
    ],
    roadmap: [
      { phaseNumber: 1, phaseName: 'Requirements & Sensor Hardware Sourcing', objective: 'Acquire and test ESP32 and optical dust sensor modules', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_ag_1', title: 'Hardware breadboard prototyping and wiring', description: 'Connect PMS5003 UART pins to ESP32 micro-controller.', estimatedDays: 4, deliverables: ['Breadboard Prototype'] }
      ]},
      { phaseNumber: 2, phaseName: 'Firmware & Ingestion Pipeline', objective: 'Write Arduino/C++ firmware with WiFi auto-reconnect', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_ag_2', title: 'ESP32 MQTT publishing firmware', description: 'Transmit JSON packets every 30 seconds with sleep cycles.', estimatedDays: 6, deliverables: ['ESP32 Firmware Code (.ino)'] }
      ]},
      { phaseNumber: 3, phaseName: 'Geospatial Database & API Service', objective: 'Set up TimescaleDB with PostGIS extensions', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_ag_3', title: 'TimescaleDB hypertable setup for sensor logs', description: 'Configure 7-day chunk intervals and spatial indexes.', estimatedDays: 5, deliverables: ['Database Setup Script'] }
      ]},
      { phaseNumber: 4, phaseName: 'Interactive GIS Map Dashboard', objective: 'Build React Leaflet map with interpolation layer', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_ag_4', title: 'React Leaflet heatmap with color-coded pins', description: 'Green/Yellow/Red pins matching EPA AQI scale.', estimatedDays: 7, deliverables: ['GIS Map Component'] }
      ]},
      { phaseNumber: 5, phaseName: 'Graph Neural Network Forecasting', objective: 'Train spatial predictive model using PyTorch', estimatedDuration: '3 Weeks', tasks: [
        { id: 't_ag_5', title: 'Build spatial adjacency matrix between stations', description: 'Calculate inverse distance weights and wind bias.', estimatedDays: 8, deliverables: ['GCN Forecasting Model'] }
      ]},
      { phaseNumber: 6, phaseName: 'Citizen Alerts & Urban Planner Tools', objective: 'Add green corridor simulation and SMS/Email threshold alerts', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_ag_6', title: 'Urban greening impact calculator UI', description: 'User clicks a zone to simulate 100 new trees and see predicted AQI drop.', estimatedDays: 6, deliverables: ['Simulation Tool UI'] }
      ]},
      { phaseNumber: 7, phaseName: 'Deployment & Outdoor Field Testing', objective: 'Deploy 3 nodes across university campus for 72 hours', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_ag_7', title: 'Campus field trial and data gathering', description: 'Collect 10,000 real-world data points and compare with local reference station.', estimatedDays: 8, deliverables: ['Validation Report'] }
      ]},
      { phaseNumber: 8, phaseName: 'Final Presentation & Viva Demonstration', objective: 'Live hardware demonstration for project examiners', estimatedDuration: '1-2 Weeks', tasks: [
        { id: 't_ag_8', title: 'Prepare demonstration chamber with test incense smoke', description: 'Show live instantaneous spike on projector map.', estimatedDays: 4, deliverables: ['Live Viva Demo Kit'] }
      ]}
    ],
    isDemo: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'demo_agriscan_computervision',
    title: 'AgriScan AI: Multi-Spectral Drone & Smartphone Crop Pathology Diagnostic System',
    tagline: 'Deep learning leaf lesion segmentation and localized treatment planner for smallholder agriculture',
    problemStatement: 'Smallholder farmers lose 30-40% of their annual crop yields to fungal, bacterial, and pest blights because agricultural extension officers cannot visit remote fields before diseases become irreversible.',
    solutionOverview: 'A progressive web application utilizing YOLOv8 and EfficientNet to detect, segment, and diagnose 28 common crop diseases from simple smartphone photos or low-altitude drone imagery. Provides localized organic and chemical remedy steps with dosage calculators and offline support.',
    domain: 'Agriculture / Computer Vision',
    difficulty: 'Intermediate',
    estimatedDuration: '3-6 months',
    teamSize: '3-4 students',
    innovationScore: 91,
    practicalityScore: 97,
    placementRelevance: 93,
    recommendedTechnologies: [
      { name: 'React + PWA (Service Workers)', category: 'frontend', reason: 'Critical offline capability in rural fields without reliable mobile internet.' },
      { name: 'FastAPI (Python)', category: 'backend', reason: 'High-speed image processing and model inference backend.' },
      { name: 'PyTorch / YOLOv8', category: 'ai_ml', reason: 'State-of-the-art leaf object detection and disease bounding box segmentation.' },
      { name: 'ONNX Runtime Web', category: 'ai_ml', reason: 'Enables 100% offline in-browser inference on mobile Chrome.' },
      { name: 'SQLite / PostgreSQL', category: 'database', reason: 'Storage for crop lesion logs, weather forecasts, and chemical dosage tables.' }
    ],
    coreFeatures: [
      { title: 'Offline Camera Capture & Instant Diagnosis', description: 'Upload or snap leaf photo to get instant disease classification with confidence score.', complexity: 'medium', estimatedHours: 20 },
      { title: 'Disease Knowledgebase & Dosage Calculator', description: 'Treatment recommendations adjusted to farm acreage and severity stage.', complexity: 'low', estimatedHours: 14 },
      { title: 'Multilingual Audio & Visual Guidance', description: 'Voice output of remedy steps for farmers with limited literacy.', complexity: 'low', estimatedHours: 12 }
    ],
    intermediateFeatures: [
      { title: 'Grad-CAM Visual Saliency Explainability', description: 'Heatmap highlighting exactly which leaf discolored spots triggered the AI diagnosis.', complexity: 'medium', estimatedHours: 24 },
      { title: 'Field Infestation Geographic Mapping', description: 'Community outbreak tracker warning neighboring farms of airborne fungal spores.', complexity: 'medium', estimatedHours: 22 }
    ],
    advancedFeatures: [
      { title: 'Drone Orthomosaic Stitching & Canopy Stress Map', description: 'Processes drone aerial shots to calculate NDVI (Normalized Difference Vegetation Index).', complexity: 'high', estimatedHours: 42 },
      { title: 'Weather-Informed Spray Window Forecaster', description: 'Combines disease stage with 3-day rainfall forecast to prevent fungicide wash-off.', complexity: 'medium', estimatedHours: 18 }
    ],
    aiFeatures: [
      { title: 'YOLOv8 Leaf Lesion Detection & Count', description: 'Detects and counts individual blight spots to quantify infestation percentage.', complexity: 'high', estimatedHours: 35 },
      { title: 'Few-Shot Transfer Learning for Regional Crops', description: 'Adapts base model to local staple crops (cassava, millet, sugarcane) with 20 photos.', complexity: 'high', estimatedHours: 32 }
    ],
    expectedUsers: ['Agricultural cooperative farmers', 'Farm extension officers', 'Agronomy researchers', 'AgriTech startup founders'],
    requiredResources: ['Smartphone with camera', 'PlantVillage open dataset (54,000 images)', 'FastAPI server or on-device ONNX'],
    risks: [
      { risk: 'Variable field lighting and background clutter (soil, hands, sunlight glare)', mitigation: 'Train model with aggressive Albumentations augmentations (shadows, contrast, blur).' },
      { risk: 'Internet blackouts in rural farming zones', mitigation: 'Export quantized 8-bit model for 100% offline client-side ONNX Web execution.' }
    ],
    futureScope: [
      'Integration with automated tractor spray nozzles',
      'Satellite Sentinel-2 multispectral vegetation index polling',
      'Automated crop insurance claim damage verification'
    ],
    architecture: {
      summary: 'Farmer snaps photo in PWA; offline ONNX model attempts local inference; when online, image synchronizes to FastAPI backend for deep YOLOv8 segmentation and disease mapping.',
      pattern: 'Offline-First Progressive Web Architecture',
      nodes: [
        { id: 'farmer_pwa', label: 'Farmer Mobile PWA', role: 'Camera capture & offline ONNX inference', technology: 'React + ServiceWorker', category: 'client' },
        { id: 'fastapi_hub', label: 'Diagnosis & Sync Server', role: 'Batch processing and knowledgebase', technology: 'FastAPI / Python', category: 'app' },
        { id: 'yolo_service', label: 'YOLOv8 Segmentation Engine', role: 'Lesion bounding box detection & Grad-CAM', technology: 'PyTorch / YOLOv8', category: 'ai' },
        { id: 'farm_db', label: 'Field Logs & Remedies DB', role: 'Treatment plans and outbreak alerts', technology: 'PostgreSQL / SQLite', category: 'database' }
      ],
      edges: [
        { from: 'farmer_pwa', to: 'fastapi_hub', label: 'Sync Leaf Photos', protocol: 'HTTPS REST' },
        { from: 'fastapi_hub', to: 'yolo_service', label: 'Run High-Res YOLO', protocol: 'In-process / IPC' },
        { from: 'fastapi_hub', to: 'farm_db', label: 'Store Inspection Record', protocol: 'SQL' }
      ]
    },
    databaseDesign: [
      {
        name: 'Crops',
        description: 'Supported plant varieties and baseline properties',
        fields: [
          { name: 'id', type: 'VARCHAR(20)', constraints: 'PRIMARY KEY' },
          { name: 'common_name', type: 'VARCHAR(60)', constraints: 'NOT NULL' },
          { name: 'scientific_name', type: 'VARCHAR(80)' },
          { name: 'growing_season', type: 'VARCHAR(40)' }
        ]
      },
      {
        name: 'DiseaseDiagnoses',
        description: 'Logged leaf scan results and remedy outputs',
        fields: [
          { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY' },
          { name: 'crop_id', type: 'VARCHAR(20)', constraints: 'FOREIGN KEY REFERENCES Crops(id)' },
          { name: 'disease_label', type: 'VARCHAR(80)', constraints: 'NOT NULL' },
          { name: 'confidence_score', type: 'FLOAT', constraints: '0.0 - 1.0' },
          { name: 'lesion_coverage_percent', type: 'FLOAT' },
          { name: 'recommended_treatment', type: 'TEXT' },
          { name: 'gps_lat', type: 'DOUBLE PRECISION' },
          { name: 'gps_lng', type: 'DOUBLE PRECISION' },
          { name: 'scanned_at', type: 'TIMESTAMP', constraints: 'DEFAULT NOW()' }
        ]
      }
    ],
    apiDesign: [
      { method: 'POST', path: '/api/v1/diagnose/image', description: 'Upload leaf photo to run classification and return disease label with remedy', requestBody: 'Multipart Form Data: file: leaf.jpg', responseSample: '{"disease": "Tomato Early Blight", "confidence": 0.94, "fungicide": "Copper oxychloride 2g/L", "urgency": "High"}' },
      { method: 'GET', path: '/api/v1/outbreaks/regional', description: 'Get recent nearby crop disease outbreaks', responseSample: '{"outbreaks": [{"disease": "Late Blight", "radiusKm": 12, "reportedCount": 18}]}' }
    ],
    roadmap: [
      { phaseNumber: 1, phaseName: 'Dataset Curation & Pathology Catalog', objective: 'Download PlantVillage dataset and curate 15 high-priority regional crop diseases', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_as_1', title: 'Data cleaning and annotation with Roboflow', description: 'Annotate 1,000 leaf lesion bounding boxes.', estimatedDays: 7, deliverables: ['Annotated Dataset'] }
      ]},
      { phaseNumber: 2, phaseName: 'PWA & Offline Camera UI', objective: 'Build offline-first React PWA with camera viewfinder', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_as_2', title: 'Service Worker and offline cache setup', description: 'Allow app to open and diagnose without cellular signal.', estimatedDays: 6, deliverables: ['PWA Skeleton'] }
      ]},
      { phaseNumber: 3, phaseName: 'Model Training & Quantization', objective: 'Train YOLOv8-nano model for fast mobile inference', estimatedDuration: '3 Weeks', tasks: [
        { id: 't_as_3', title: 'Train YOLOv8 on crop dataset in Google Colab', description: 'Target mAP@50 > 91% on test split.', estimatedDays: 8, deliverables: ['Trained Model Weights (.pt)'] },
        { id: 't_as_4', title: 'Quantize model to ONNX INT8', description: 'Compress model to < 6MB for browser execution.', estimatedDays: 4, deliverables: ['model.onnx File'] }
      ]},
      { phaseNumber: 4, phaseName: 'FastAPI Backend & Remediation Engine', objective: 'Build agronomy dosage calculator and remedy database', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_as_5', title: 'Dosage conversion logic (acreage to grams)', description: 'Calculate exact chemical dilution ratios to avoid leaf scorch.', estimatedDays: 5, deliverables: ['Dosage Calculator Service'] }
      ]},
      { phaseNumber: 5, phaseName: 'Grad-CAM Explainability & Visual Saliency', objective: 'Render visual heatmap showing which spots caused prediction', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_as_6', title: 'PyTorch Grad-CAM overlay generator', description: 'Render transparent heatmap mask over user leaf image.', estimatedDays: 6, deliverables: ['Saliency Heatmap API'] }
      ]},
      { phaseNumber: 6, phaseName: 'Outbreak Map & Voice Assistance', objective: 'Add GPS outbreak warnings and Web Speech API audio output', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_as_7', title: 'Web Speech API synthesis for spoken remedies', description: 'Read remedy instructions aloud in simple language.', estimatedDays: 4, deliverables: ['Audio Output Module'] }
      ]},
      { phaseNumber: 7, phaseName: 'Field Testing & Robustness Benchmarking', objective: 'Test with real diseased leaves under harsh outdoor glare', estimatedDuration: '2 Weeks', tasks: [
        { id: 't_as_8', title: 'Outdoor field testing trial with 50 live leaves', description: 'Document real-world precision and false positive rate.', estimatedDays: 6, deliverables: ['Field Validation Document'] }
      ]},
      { phaseNumber: 8, phaseName: 'Final Presentation & Viva Demonstration', objective: 'Demonstrate live detection using physical potted plant', estimatedDuration: '1-2 Weeks', tasks: [
        { id: 't_as_9', title: 'Viva demonstration and examiner trial', description: 'Let examiner take photo of test leaf and observe 500ms diagnosis.', estimatedDays: 4, deliverables: ['Presentation Deck (.pptx)'] }
      ]}
    ],
    isDemo: true,
    createdAt: new Date().toISOString()
  }
];

export function getDemoProjectsForProfile(profile: StudentProfile): ProjectIdea[] {
  // Return tailored demo project ideas matching their interests/difficulty or return all 5 rich blueprints
  return DEMO_PROJECTS;
}

export function getDemoMentorResponse(project: ProjectIdea, question: string): MentorStructuredResponse {
  const qLower = question.toLowerCase();

  if (qLower.includes('mvp') || qLower.includes('finish') || qLower.includes('month')) {
    return {
      recommendation: `For a standard semester timeline on "${project.title}", strip out background services and focus strictly on Phase 1 through Phase 5 of the roadmap.`,
      reason: 'Academic evaluators prioritize a rock-solid, fully functioning core loop with live data over a dozen half-baked, broken secondary tabs.',
      steps: [
        'Complete Phase 1 and 2 to freeze the UI schema before writing any backend code.',
        'Implement the 3 core features marked as MVP tier in your blueprint.',
        'Use local SQLite or mock test fixtures before tackling complex cloud databases.',
        'Run an end-to-end user walk-through 3 weeks prior to submission to iron out edge case crashes.'
      ],
      exampleCode: `// Example: Clean MVP route handling in ${project.recommendedTechnologies.find(t => t.category === 'backend')?.name || 'Express'}\napp.post('/api/evaluate', async (req, res) => {\n  const { inputData } = req.body;\n  if (!inputData) return res.status(400).json({ error: 'Missing input' });\n  const result = await runInference(inputData);\n  return res.json({ status: 'success', data: result });\n});`,
      commonMistakes: [
        'Attempting to deploy microservices in Kubernetes when a simple modular monolithic server is sufficient for college evaluation.',
        'Spending weeks on user authentication and password resets while neglecting the core domain logic.'
      ]
    };
  }

  if (qLower.includes('database') || qLower.includes('db') || qLower.includes('schema')) {
    return {
      recommendation: `Use ${project.recommendedTechnologies.find(t => t.category === 'database')?.name || 'PostgreSQL'} with strict migrations rather than an unindexed document store.`,
      reason: 'Your project features relational dependencies between entities (e.g., users, telemetry runs, audit trails). Relational foreign keys prevent orphan records and make schema explanations during your viva defense much easier.',
      steps: [
        'Review the Entities tab in this blueprint to copy the provided table schemas.',
        'Add indexes on frequently queried foreign keys and timestamp columns.',
        'Use an ORM or typed query builder (like Prisma or Drizzle) to guarantee type-safety between frontend and database.',
        'Create a seed script (seed.sql) with realistic demo data for offline examiner demonstration.'
      ],
      exampleCode: `-- Migration snippet from your blueprint\nCREATE TABLE sessions (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  status VARCHAR(20) NOT NULL\n);\nCREATE INDEX idx_sessions_status ON sessions(status);`,
      commonMistakes: [
        'Storing everything in a single unstructured JSON blob without constraints.',
        'Forgetting to seed the database before the viva, leading to empty awkward demonstration screens.'
      ]
    };
  }

  if (qLower.includes('team') || qLower.includes('divide') || qLower.includes('member')) {
    return {
      recommendation: `Divide the project into 3 distinct workstreams: 1) Frontend & UI/UX, 2) Backend API & Database, and 3) AI/ML & Evaluation Pipeline.`,
      reason: 'Clear boundaries prevent git merge conflicts and allow each team member to independently explain their ownership domain to external examiners during the viva.',
      steps: [
        'Member 1 (Frontend): Monaco/Canvas UI, responsive design system, state management, and export features.',
        'Member 2 (Backend & Infrastructure): Express/FastAPI routes, database migrations, rate limiting, and Docker setup.',
        'Member 3 (AI/ML or Algorithms): Model training, feature extraction, evaluation metrics (ROC-AUC / Precision), and testing.',
        'Weekly Sync: Hold a 30-minute integration check every Sunday to merge feature branches into main.'
      ],
      exampleCode: `// Git workflow recommendation:\ngit checkout -b feature/frontend-canvas\ngit checkout -b feature/ml-pipeline\ngit checkout -b feature/api-routes`,
      commonMistakes: [
        'Having all team members edit the same file simultaneously without branch protection.',
        'Leaving integration to the final 48 hours before project submission.'
      ]
    };
  }

  // Default rich grounded answer
  return {
    recommendation: `Focus on architectural clarity and verifiable metrics for "${project.title}". Leverage the recommended ${project.recommendedTechnologies.slice(0, 2).map(t => t.name).join(' and ')} stack.`,
    reason: `This aligns with your project orientation and provides the highest demonstration impact during technical viva examinations.`,
    steps: [
      `Review Phase 3 and Phase 5 in the Development Roadmap tab for specific task sequences.`,
      `Implement automated integration tests to prove that your core evaluation pipeline behaves predictably.`,
      `Document your architectural trade-offs so you can justify why you chose ${project.architecture.pattern} when asked by the panel.`
    ],
    exampleCode: `// Health check probe for your architecture\nexport async function verifyPipelineHealth() {\n  const status = await checkModelService();\n  console.log('[System Health]:', status ? 'READY' : 'DEGRADED');\n  return status;\n}`,
    commonMistakes: [
      'Focusing exclusively on slides rather than a working interactive software demo.',
      'Not preparing answers for edge case questions like: "What happens if network latency increases?"'
    ]
  };
}

export function getDemoImprovements(project: ProjectIdea): ImprovementItem[] {
  return [
    {
      id: 'imp_1',
      category: 'Innovation',
      title: 'Local Saliency & Attribution Visualizer',
      rationale: 'Elevates the project from a black-box model into an explainable, research-grade system suitable for conference paper submission.',
      implementationDetail: 'Implement a lightweight Grad-CAM or feature importance bar chart showing the exact weights that triggered the decision.',
      impact: 'Breakthrough',
      targetFeatureTier: 'ai'
    },
    {
      id: 'imp_2',
      category: 'Security',
      title: 'Input Rate-Limiting & Cryptographic Telemetry Signing',
      rationale: 'Demonstrates professional security awareness to recruitment panels by preventing telemetry spoofing and DDoS.',
      implementationDetail: 'Add HMAC signature validation on client-to-server payloads and express-rate-limit middleware on inference endpoints.',
      impact: 'High',
      targetFeatureTier: 'intermediate'
    },
    {
      id: 'imp_3',
      category: 'Scalability',
      title: 'Redis In-Memory Caching for Model Inference Results',
      rationale: 'Reduces server load by 80% during repeat queries and provides sub-10ms response times.',
      implementationDetail: 'Hash input query vectors as Redis keys with a 1-hour TTL before triggering the full inference pipeline.',
      impact: 'High',
      targetFeatureTier: 'advanced'
    },
    {
      id: 'imp_4',
      category: 'MVP',
      title: 'Self-Service Synthetic Data Injection Harness',
      rationale: 'Guarantees flawless live demonstration during viva even if physical sensor inputs or live data feeds fail.',
      implementationDetail: 'Add an "Inject Demo Scenarios" dropdown in the navigation header with pre-packaged benign and edge-case anomalies.',
      impact: 'High',
      targetFeatureTier: 'core'
    },
    {
      id: 'imp_5',
      category: 'AI',
      title: 'Quantized Edge Inference (INT8 ONNX)',
      rationale: 'Allows the system to run on consumer hardware without requiring expensive GPU cloud instances.',
      implementationDetail: 'Export PyTorch model weights to ONNX format and apply post-training static INT8 quantization via onnxruntime.',
      impact: 'Breakthrough',
      targetFeatureTier: 'ai'
    },
    {
      id: 'imp_6',
      category: 'Future Scope',
      title: 'Decentralized Federated Learning Node Mesh',
      rationale: 'Provides a compelling future research chapter for your final project thesis.',
      implementationDetail: 'Document how multiple hospital or IoT nodes could train local weights and aggregate gradients via a central coordinator without sharing raw data.',
      impact: 'Medium',
      targetFeatureTier: 'advanced'
    }
  ];
}

export function getDemoComparison(projects: ProjectIdea[]): ProjectComparisonResponse {
  const pA = projects[0];
  const pB = projects[1];
  const pC = projects[2];

  return {
    comparisonTable: [
      {
        criteria: 'Difficulty & Learning Curve',
        projectA: `${pA.difficulty} — Well-structured learning path with accessible libraries`,
        projectB: `${pB.difficulty} — Requires solid grasp of distributed async processing`,
        projectC: pC ? `${pC.difficulty} — Focused on applied computer vision` : undefined,
      },
      {
        criteria: 'Estimated Time to MVP',
        projectA: '3–4 Weeks for working prototype',
        projectB: '4–5 Weeks due to data pipeline setup',
        projectC: pC ? '3 Weeks with pre-trained models' : undefined,
      },
      {
        criteria: 'Innovation Score',
        projectA: `${pA.innovationScore}/100 (High academic novelty)`,
        projectB: `${pB.innovationScore}/100 (Strong enterprise relevance)`,
        projectC: pC ? `${pC.innovationScore}/100` : undefined,
      },
      {
        criteria: 'Placement / Recruiter Impact',
        projectA: `${pA.placementRelevance}/100 (Stands out to HealthTech / ML teams)`,
        projectB: `${pB.placementRelevance}/100 (Extremely attractive to FinTech / Cyber firms)`,
        projectC: pC ? `${pC.placementRelevance}/100` : undefined,
      },
      {
        criteria: 'Cloud & Hardware Cost',
        projectA: '$0 (Runs entirely on free cloud tier and client browser)',
        projectB: '$0 (Local Docker or Supabase free tier)',
        projectC: pC ? '$0 with quantized edge models' : undefined,
      },
      {
        criteria: 'Viva Demonstration Ease',
        projectA: 'High — Immediate visual charts and sensor responses',
        projectB: 'Very High — Live interactive network graphs and fraud alerts',
        projectC: pC ? 'High — Live photo snap and instant bounding box' : undefined,
      }
    ],
    recommendation: {
      recommendedProjectId: pA.id,
      summaryTitle: `Recommended Choice: ${pA.title}`,
      detailedReason: `Based on an optimal balance of feasibility, innovation score (${pA.innovationScore}/100), and zero-cost cloud deployment, "${pA.title}" gives students the highest probability of completing a high-scoring capstone project within a standard semester timeline without getting stuck on complex infrastructure roadblocks.`,
      fitFactors: [
        'Proven architecture pattern with pre-validated open-source datasets',
        'Distinctive combination of web engineering and real-world domain impact',
        'Strong story to tell recruiters in technical placement interviews'
      ]
    }
  };
}
