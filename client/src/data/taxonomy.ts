export const ACADEMIC_BRANCHES = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Artificial Intelligence & Data Science (AI/DS)',
  'Cybersecurity & Forensics',
  'Electronics & Communication Engineering (ECE)',
  'Electrical & Electronics Engineering (EEE)',
  'Mechanical Engineering (Mechatronics/Robotics)',
  'Civil Engineering (Smart Infrastructure/GIS)',
  'Biomedical Engineering & HealthTech',
  'Software Engineering / MCA',
];

export const ACADEMIC_SEMESTERS = [
  'Final Year — 7th Semester',
  'Final Year — 8th Semester',
  'Pre-Final Year — 6th Semester',
  'Postgraduate / Masters (M.Tech/MS)',
];

export const INTEREST_CATEGORIES = [
  { id: 'ai_ml', name: 'AI & Machine Learning', icon: 'Bot' },
  { id: 'web_dev', name: 'Web Development', icon: 'Globe' },
  { id: 'mobile_dev', name: 'Mobile Development', icon: 'Smartphone' },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: 'ShieldAlert' },
  { id: 'iot', name: 'IoT & Embedded Systems', icon: 'Cpu' },
  { id: 'cloud', name: 'Cloud & Distributed Systems', icon: 'Cloud' },
  { id: 'data_science', name: 'Data Science & Big Data', icon: 'BarChart3' },
  { id: 'computer_vision', name: 'Computer Vision', icon: 'Camera' },
  { id: 'nlp', name: 'Natural Language Processing (NLP)', icon: 'MessageSquare' },
  { id: 'blockchain', name: 'Blockchain & Web3', icon: 'Layers' },
  { id: 'fintech', name: 'FinTech & Algorithmic Trading', icon: 'DollarSign' },
  { id: 'healthtech', name: 'HealthTech & Telemedicine', icon: 'HeartPulse' },
  { id: 'edtech', name: 'EdTech & Learning Tools', icon: 'GraduationCap' },
  { id: 'agritech', name: 'Agriculture & Drone Sensing', icon: 'Sprout' },
  { id: 'sustainability', name: 'Sustainability & Clean Energy', icon: 'Leaf' },
  { id: 'smart_cities', name: 'Smart Cities & Urban Transport', icon: 'Building2' },
  { id: 'robotics', name: 'Robotics & Automation', icon: 'Workflow' },
  { id: 'ar_vr', name: 'AR/VR & Spatial Computing', icon: 'Glasses' },
  { id: 'open_innovation', name: 'Open Innovation & Social Good', icon: 'Sparkles' },
];

export const SKILL_TAXONOMY = {
  programming: [
    'Python',
    'JavaScript',
    'TypeScript',
    'Java',
    'C++',
    'C#',
    'Go',
    'Rust',
    'Kotlin',
    'Swift',
  ],
  frameworks: [
    'React',
    'Next.js',
    'Node.js / Express',
    'FastAPI',
    'Django',
    'Spring Boot',
    'Flutter',
    'Vue.js',
    'SvelteKit',
    'Flask',
  ],
  ai: [
    'Machine Learning (Scikit-Learn)',
    'Deep Learning (PyTorch)',
    'TensorFlow / Keras',
    'Computer Vision (OpenCV / YOLO)',
    'NLP & Transformers (Hugging Face)',
    'Generative AI & LLMs (Gemini / OpenAI)',
    'LangChain / LlamaIndex',
    'Vector Embeddings & RAG',
  ],
  databases: [
    'PostgreSQL',
    'MongoDB',
    'MySQL',
    'SQLite',
    'Redis',
    'Firebase Firestore',
    'Supabase',
    'Vector DB (Chroma/Pinecone)',
  ],
  cloud: [
    'Google Cloud Platform (GCP)',
    'Amazon Web Services (AWS)',
    'Microsoft Azure',
    'Docker & Containerization',
    'Kubernetes',
    'Vercel / Netlify',
    'GitHub Actions (CI/CD)',
    'Linux / Bash',
  ],
};

export const DIFFICULTY_OPTIONS = [
  { value: 'Beginner', label: 'Beginner', desc: 'Accessible architectures, well-documented libraries, minimal esoteric setup.' },
  { value: 'Intermediate', label: 'Intermediate', desc: 'Standard production stack, asynchronous pipelines, robust database schemas.' },
  { value: 'Advanced', label: 'Advanced', desc: 'Distributed pipelines, edge AI inference, graph models, or hardware-software mesh.' },
];

export const DURATION_OPTIONS = [
  { value: '1-3 months', label: '1–3 Months (Rapid MVP)', desc: 'Fast turnaround, concentrated scope, rapid delivery.' },
  { value: '3-6 months', label: '3–6 Months (Standard Semester)', desc: 'Full capstone development cycle with thorough testing and viva.' },
  { value: '6+ months', label: '6+ Months (Year-Long Thesis)', desc: 'Deep research paper potential, hardware prototyping, high innovation.' },
];

export const ORIENTATION_OPTIONS = [
  { value: 'placement', label: 'Placement-Oriented', desc: 'Engineered to blow recruiters and interviewers away with modern system design.' },
  { value: 'practical', label: 'Practical / Real-World', desc: 'Solves an immediate grassroots, municipal, or campus problem.' },
  { value: 'innovative', label: 'Innovative / Startup', desc: 'Novel patentable angle or high commercial startup prototype potential.' },
  { value: 'research', label: 'Research / Paper-Oriented', desc: 'Mathematical rigor and benchmark evaluation suitable for IEEE/Springer publishing.' },
];
