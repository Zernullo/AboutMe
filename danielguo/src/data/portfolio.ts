export type DetailItem = {
  title: string
  meta?: string
  details: string
  image?: string | null
  links?: { label: string; url: string }[]
}

export type ProjectCard = {
  title: string
  status: string
  year: string
  category: 'AI & Security' | 'Web & Mobile' | 'Research' | 'Hackathons'
  summary: string
  details: string
  links?: { label: string; url: string }[]
}

export const projectCards: ProjectCard[] = [
  {
    title: 'ZL-Audio — Real-Time AI Translation',
    status: 'Active Development',
    year: '2026 - Present',
    category: 'AI & Security',
    summary: 'A real-time speech transcription, translation, and caption overlay platform engineered to slash latency from ~700ms to 300ms while maintaining high contextual accuracy across multilingual audio streams.',
    details: `ZL-Audio (Zero Latency Audio) is a high-performance translation platform built on a low-latency streaming pipeline that breaks language barriers across live foreign-language media—including live broadcasts, technical lectures, spoken conversations, and streaming video.

Technical Focus & Key Innovations:
• Low-Latency Streaming Pipeline: Integrates voice activity detection (VAD), automatic speech recognition (ASR with Whisper), and neural machine translation (NMT) to process streaming audio in tight 100–300 ms chunks.
• Performance Benchmark: Engineered to reduce end-to-end translation latency from approximately 700 ms down to 300 ms while preserving sentence structure and contextual accuracy.
• Intelligent AI Model Routing: Dynamically routes audio chunks through optimized models to balance inference latency, compute cost, and translation quality.
• Multimodal Architecture: Supports floating live subtitles, interactive transcription overlays, and spoken translation playback.
• Security & Privacy: Designed with localized and privacy-conscious inference options to safeguard sensitive audio streams from unauthorized cloud retention.

Built with Python, PyTorch, Whisper, and React.`
  },
  {
    title: 'Soteria — AI Workplace Safety Assistant',
    status: 'Industry Project',
    year: '2026',
    category: 'AI & Security',
    summary: 'An enterprise AI workplace safety platform developed with Performance Contractors INC. to analyze historical incident reports, predict hazard patterns, and provide real-time guidance to personnel on-site.',
    details: `Soteria is an LLM-powered occupational safety assistant developed during my engineering work with Performance Contractors INC. to analyze historical incident reports and provide actionable, real-time safety advisories.

Technical Focus & Key Innovations:
• Incident Predictability: Employs predictive analytics on historical safety logs, examining correlations across physical job locations, environmental weather conditions, and shift timing to foresee potential hazards.
• Large Language Model Integration: Allows field workers and safety managers to query historical hazard data in natural language to receive contextual, preventative recommendations before high-risk tasks.
• Full-Stack Architecture: Built with a reactive C# backend for robust enterprise data processing and a clean React frontend for rapid field accessibility.
• Real-World Impact: Bridges the gap between complex enterprise safety archives and proactive, on-site hazard mitigation.`
  },
  {
    title: 'AI-Assisted Robotics Education — LSU RISE Lab',
    status: 'Academic Research',
    year: '2025 - 2026',
    category: 'Research',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/riseatlsu/pAIrStudio' }
    ],
    summary: 'Academic research platform (pAIrStudio) developed at the LSU RISE Lab under Dr. Fronchetti, studying how conversational AI and block-based programming enhance robotics education for diverse learners.',
    details: `Undergraduate research project at the LSU RISE (Robotics, Interactive Systems, and Education) Lab under Dr. Fronchetti, focusing on leveraging artificial intelligence to democratize robotics programming education.

Technical Focus & Key Innovations:
• Gamified Block-Based Environment: Helps novice learners master core robotics logic by controlling warehouse robots in an interactive isometric environment.
• ChatGPT / LLM Guidance Integration: Integrates contextual natural-language assistance that analyzes learner code in real time and provides tailored suggestions without simply giving away solutions.
• Empirical Research & Benchmarking: Evaluates learning curves, engagement metrics, and error recovery across experimental participant cohorts.
• Accessible Workflows: Designed inclusive, cross-platform learning workflows adaptable across different technical proficiencies and age groups.

Built using JavaScript, Phaser.js, and OpenAI API.`
  },
  {
    title: 'GeoData — EXIF Privacy & Security Analyzer',
    status: 'Completed',
    year: '2025 - 2026',
    category: 'AI & Security',
    summary: 'A cybersecurity investigation tool evaluating how image-sharing platforms retain sensitive EXIF metadata, featuring an automated privacy-scoring model, attacker simulations, and AI threat reports.',
    details: `GeoData is a data-driven security analysis tool developed for CSC 4700 (Data-Driven Security) that evaluates how major social media platforms and image-sharing services handle sensitive EXIF metadata.

Technical Focus & Key Innovations:
• EXIF Metadata Extraction: Automatically extracts geolocation coordinates, device serials, camera models, and creation timestamps from uploaded image corpora.
• Privacy-Scoring Model: Quantifies privacy exposure risk through a structured scoring algorithm evaluating metadata leakage severity.
• Attacker Simulations: Simulates OSINT (Open Source Intelligence) adversary techniques to demonstrate real-world physical tracking risks.
• AI-Generated Security Reports: Generates automated threat assessment reports with mitigation guidance for end-users and platform engineers.

Built with React and Python.`
  },
  {
    title: 'Suni The Travel Companion',
    status: 'Capstone Project',
    year: '2026 - Present',
    category: 'Web & Mobile',
    summary: 'An intelligent travel planning platform featuring a preference recommendation engine, conversational AI itinerary modification, and live third-party API travel integrations.',
    details: `Developed as a capstone software system for CSC 4330 (Software Systems Development), Suni is an AI-powered travel assistant that creates dynamic, personalized travel itineraries.

Technical Focus & Key Innovations:
• Dynamic Recommendation Engine: Generates tailored destination, accommodation, and activity proposals derived from user travel preference surveys.
• Conversational AI Itinerary Editing: Employs natural language processing to enable users to effortlessly adjust schedules, swap activities, or refine budgets on the fly.
• External API Orchestration: Integrates mapping, weather forecast, and lodging APIs to synthesize accurate, real-time schedule information.

Built with React on the frontend and Django (Python) on the backend.`
  },
  {
    title: 'Ultron Texas Hold\'em AI Bot',
    status: 'Completed',
    year: 'Fall 2025',
    category: 'AI & Security',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/BearGotGit/Ultron-Texas-Hold-Em' }
    ],
    summary: 'A machine learning poker agent developed for CSC 4444 (Artificial Intelligence) that leverages reinforcement learning and neural networks to execute game-theoretic decision making under incomplete information.',
    details: `Developed in a team of 5 for CSC 4444 (Artificial Intelligence), this autonomous poker bot masters the strategic complexity of Texas Hold'em through advanced machine learning algorithms.

Technical Focus & Key Innovations:
• Incomplete Information Game Theory: Navigates imperfect information and probabilistic state trees using deep reinforcement learning.
• Neural Network Architecture: Evaluates hand equity, opponent tendencies, and pot odds to execute mathematically grounded bluffing and value-betting strategies in real time.
• Tournament Competition: Successfully benchmarked and deployed in live automated tournament play against rival university AI agents.

Built with Python, PyTorch, and NumPy.`
  },
  {
    title: 'Geaux App — LSU Campus Navigator',
    status: 'GDSC Project',
    year: '2025',
    category: 'Web & Mobile',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Google-Developers-Student-Club-LSU/GeauxApp-Frontend' }
    ],
    summary: 'Cross-platform campus utility app developed by Google Developer Student Clubs (GDSC) providing LSU students with live bus shuttle tracking, campus event schedules, and dining menus.',
    details: `As Lead Frontend Developer for the LSU Google Developer Student Club (GDSC), led interface design and development for the Geaux App, serving the broader LSU student community.

Technical Focus & Key Innovations:
• Real-time shuttle bus tracking with Google Maps API integration.
• Dynamic event calendar with personalized notification bookmarks.
• Dining hall schedule and menu feeds.

Built using Flutter and Dart.`
  },
  {
    title: 'Collegiate Hackathon Engineering Series',
    status: 'Completed',
    year: '2023 - 2026',
    category: 'Hackathons',
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Zernullo/Hackathon3' }
    ],
    summary: 'Series of 3-day collegiate hackathon solutions built under intense time constraints, covering geospatial waypoint networking, personal financial analytics, and smart recommendation systems.',
    details: `Active competitor across collegiate hackathons collaborating in multidisciplinary teams to design, prototype, and ship functional software products within 48 to 72 hours.

Highlighted Prototyping Achievements:
• Geolocation Waypoint Network: City-wide waypoint mapping and social networking utilizing Google Maps API and user account management.
• Financial Budgeting & Tax Estimator: Automated personal expense tracking, tax calculation engine, and financial advisory dashboard.
• Smart Travel Matcher: Questionnaire-based destination and lodging recommendation system.

Technologies used: JavaScript, Python, Flutter, Google Maps APIs.`
  }
]

export const certificationCards = [
  {
    title: 'LSU Cybersecurity Clinic Boot Camp',
    year: '2025',
    issuer: 'LSU / SANS Training Prep',
    status: 'Completed',
    details: 'Completed LSU\'s intensive week-long cybersecurity clinic bootcamp, gaining foundational hands-on skills in network defense, threat analysis, and incident response in preparation for SANS certification training.'
  },
  {
    title: 'Security+',
    year: '2026',
    issuer: 'CompTIA',
    status: 'In Progress',
    details: 'CompTIA Security+ is a globally recognized certification validating foundational cybersecurity skills and knowledge. Covers network security, threat management, cryptography, vulnerabilities, and enterprise risk mitigation.'
  },
  {
    title: 'Certified in Cybersecurity (CC)',
    year: '2026',
    issuer: 'ISC2',
    status: 'In Progress',
    details: 'ISC2 Certified in Cybersecurity (CC) validates fundamental cybersecurity knowledge and skills. Covers security principles, business continuity, incident response, access controls, and network security.'
  }
]

export const activityCards = [
  {
    title: 'Google Developer Student Clubs (GDSC)',
    badge: 'Officer',
    role: 'Operational Manager & Lead Frontend',
    dates: '2025 - Present',
    details: 'As Operational Manager for LSU GDSC, coordinate logistics for technical workshops, hackathons, and speaker sessions to foster a developer community on campus. Served as lead frontend developer for the LSU Geaux campus application.'
  },
  {
    title: 'Security Society at LSU (SSL)',
    badge: 'Member',
    role: 'Active Member & CTF Competitor',
    dates: '2025 - Present',
    details: 'Active member participating in weekly technical meetings, hands-on red team/blue team workshops, vulnerability defense labs, and collegiate CTF competitions to sharpen cybersecurity and threat analysis capabilities.'
  },
  {
    title: 'Collegiate Hackathons',
    badge: 'Competitor',
    role: 'Software Prototyper',
    dates: '2023 - 2026',
    details: 'Competed in multiple university hackathons, collaborating in teams to design, architect, and prototype functional technical solutions under strict 48–72 hour deadlines.'
  }
]

export type NewsArticle = {
  title: string
  summary: string
  url: string
  source: string
  date: string
  publishedAt: string
  image: string | null
}

export const fallbackNewsArticles: NewsArticle[] = [
  {
    title: 'CISA Adds Known Exploited Vulnerability in Enterprise Gateways to KEV Catalog',
    summary: 'The U.S. Cybersecurity and Infrastructure Security Agency has issued an emergency directive requiring federal civilian agencies to remediate zero-day vulnerabilities actively targeted by advanced threat actors in perimeter gateway appliances.',
    url: 'https://www.cisa.gov/cybersecurity-advisories/all.xml',
    source: 'CISA Advisories',
    date: new Date(Date.now() - 3600000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    image: null
  },
  {
    title: 'Critical Remote Code Execution Disclosed in Widely Used Open-Source Cryptographic Library',
    summary: 'Security researchers have published a proof-of-concept demonstrating how heap memory corruption during certificate validation allows unauthenticated remote adversaries to execute arbitrary shellcode.',
    url: 'https://thehackernews.com',
    source: 'The Hacker News',
    date: new Date(Date.now() - 7200000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    image: null
  },
  {
    title: 'Ransomware Operation Exploits Zero-Day in Cloud Virtualization Management Hypervisors',
    summary: 'Threat intelligence telemetry shows nation-state affiliated ransomware syndicates compromising high-value corporate hypervisors to encrypt disaster recovery volumes before initiating multi-million dollar extortion demands.',
    url: 'https://bleepingcomputer.com',
    source: 'BleepingComputer',
    date: new Date(Date.now() - 14400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    image: null
  },
  {
    title: 'NIST Releases Finalized Post-Quantum Encryption Standards (FIPS 203, 204, and 205)',
    summary: 'Federal standards officially transition to quantum-resistant algorithms ML-KEM, ML-DSA, and SLH-DSA, establishing migration baselines for government and commercial infrastructure to protect long-term encrypted secrets.',
    url: 'https://thehackernews.com',
    source: 'The Hacker News',
    date: new Date(Date.now() - 28800000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    image: null
  },
  {
    title: 'AI-Generated Phishing Infiltration Bypasses Traditional SPF/DKIM Email Inspection',
    summary: 'Adversaries deploy localized neural language models capable of dynamic context synthesis to craft highly targeted executive spear-phishing campaigns mimicking authentic internal vendor invoicing.',
    url: 'https://bleepingcomputer.com',
    source: 'BleepingComputer',
    date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    image: null
  },
  {
    title: 'Supply Chain Compromise Discovered in PyPI Package Infiltrating Machine Learning Pipelines',
    summary: 'Malicious Python packages targeting PyTorch and GPU inference servers were identified exfiltrating developer credentials, SSH keys, and cloud storage tokens via obfuscated DNS tunneling.',
    url: 'https://thehackernews.com',
    source: 'The Hacker News',
    date: new Date(Date.now() - 172800000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    image: null
  }
]
