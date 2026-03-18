import { GoogleGenerativeAI } from "@google/generative-ai";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const knowledgeBase = {
  projects: [
    {
      name: "One-Click Deployment",
      tag: "Automation Tool",
      simpleExplanation: "A tool that lets users deploy web apps directly from GitHub to Vercel or Netlify with a single click — no manual CI/CD setup needed.",
      technicalExplanation: "Built a full-stack Node.js + Express backend that connects to the GitHub API to clone repositories, triggers build pipelines using Vercel and Netlify REST APIs, and streams real-time deployment logs back to the client over HTTP.",
      architecture: "Frontend (React.js) → Express.js API Server → GitHub API (repo data) → Vercel/Netlify REST API (deploy trigger) → Real-time log streaming via polling.",
      techStack: {
        frontend: "React.js with plain CSS for the UI dashboard",
        backend: "Node.js, Express.js for API handling and orchestration",
        apis: ["GitHub REST API", "Vercel Deploy API", "Netlify Deploy API"],
        tools: "Axios for HTTP requests, dotenv for config"
      },
      whyEachTech: {
        "Node.js": "Ideal for I/O-heavy API orchestration without blocking threads.",
        "Express.js": "Lightweight and fast for building REST API routes.",
        "GitHub API": "Required to read repository content and initiate clones.",
        "Vercel/Netlify APIs": "Both provide deploy endpoints that accept zip archives or Git refs."
      },
      features: [
        "One-click deployment from GitHub URL",
        "Supports both Vercel and Netlify as deployment targets",
        "Real-time deployment logs streamed to the UI",
        "Deployment history tracking with timestamps and status",
        "Error debugging with plain-language AI-generated explanations"
      ],
      challenges: [
        "Vercel has a payload size limit — solved by implementing iterative chunked file uploads.",
        "GitHub API rate limits — handled with token-based auth and request queuing.",
        "Real-time log streaming without WebSockets — solved using periodic HTTP polling."
      ],
      whatMakesItUnique: "Unlike standard CI/CD tools that require YAML configs and account setup, this tool requires zero configuration — just paste a GitHub URL and deploy in seconds.",
      useCases: ["Students deploying projects without DevOps knowledge", "Rapid prototyping and demo deployments", "Hackathon submissions"],
      impact: "Reduced deployment effort by 70% and made cloud deployment accessible to beginners with zero CI/CD background.",
      realWorldValue: "Makes deployment accessible for students and speeds up development workflows.",
      liveDemo: "https://randomdeploytool-swamikshtriya-9528-swamis-projects-c46278af.vercel.app/",
      githubUrl: "https://github.com/Kshatriyaswami/randomdeploytool",
      keywords: ["deployment", "ci/cd", "automation", "github", "deploy", "one-click", "one click", "vercel", "netlify", "devops"],
      voiceScript: {
        Hook: "This is one of my most impactful projects.",
        Problem: "Deploying applications is often complex and requires CI/CD knowledge.",
        Solution: "So I built a system that allows users to deploy directly from GitHub in just one click.",
        Tech: "It integrates GitHub, Vercel, and Netlify APIs using a Node.js backend.",
        Impact: "This reduced deployment effort by around 70 percent and made it beginner-friendly."
      }
    },
    {
      name: "College Navigator",
      tag: "Smart Navigation System",
      simpleExplanation: "A smart campus navigation system that gives students real-time directions to any location on campus, with voice-assisted guidance.",
      technicalExplanation: "Built on a React.js + TypeScript frontend with a Python backend that manages a structured SQL database of 50+ campus locations. The routing engine computes optimized paths, and voice guidance is implemented using the Web Speech API.",
      architecture: "React.js UI → Python REST API → SQL Database (location & path data) → Routing Engine (Dijkstra/graph-based) → Web Speech API (voice output).",
      techStack: {
        frontend: "React.js, TypeScript for the interactive map and navigation UI",
        backend: "Python with Flask/FastAPI for the REST API",
        database: "SQL (structured campus location data, 50+ locations)",
        voice: "Web Speech API for real-time voice guidance"
      },
      whyEachTech: {
        "React.js": "Component-based architecture ideal for the interactive map interface.",
        "TypeScript": "Added type safety to prevent runtime errors in navigation logic.",
        "Python": "Great for data processing and building the routing logic.",
        "SQL": "Structured data is perfect for relational campus location data.",
        "Web Speech API": "Native browser API — no third-party service needed for voice."
      },
      features: [
        "Voice navigation with real-time directions",
        "Database of 50+ campus locations",
        "Optimized path computation",
        "Search bar with location autocomplete",
        "Accessibility-focused design (voice-first)"
      ],
      challenges: [
        "Mapping real campus layout into a navigable graph data structure.",
        "Ensuring voice guidance felt natural and not robotic.",
        "Handling edge cases where multiple paths exist with the same cost."
      ],
      whatMakesItUnique: "Unlike generic map apps, this is specifically built for indoor campus navigation with location-aware voice guidance tailored to students and visitors.",
      useCases: ["New students finding classrooms on day one", "Visitors locating administrative offices", "Accessibility aid for differently-abled students"],
      impact: "Reduced campus navigation time by 50% and significantly improved accessibility.",
      realWorldValue: "Improves accessibility and saves time for students and visitors on campus.",
      liveDemo: "https://college-indoor-navigation.netlify.app/",
      githubUrl: "https://github.com/Kshatriyaswami/College-Indoor-Navigation",
      keywords: ["navigation", "maps", "voice", "routing", "college", "navigator", "campus", "indoor", "directions", "accessibility"],
      voiceScript: {
        Hook: "This project focuses on real-world usability.",
        Problem: "Students often struggle to find locations on campus.",
        Solution: "I developed a smart navigation system with real-time directions and voice assistance.",
        Tech: "It uses React, TypeScript, Python, and a structured SQL database.",
        Impact: "It improved navigation efficiency by about 50 percent."
      }
    }
  ],
  profile: {
    name: "Swami Kshatriya",
    role: "Full Stack Developer",
    location: "Nashik, Maharashtra, India",
    github: "https://github.com/Kshatriyaswami",
    summary: "A final-year Computer Engineering student and Full Stack Developer passionate about building impactful, user-centric web applications and developer automation tools. Currently pursuing B.E. at SNJB's LSKBJ CoE (Pune University).",
    education: [
      {
        degree: "Bachelor of Engineering (Computer Engineering)",
        institution: "SNJB's LSKBJ CoE (Savitribai Phule Pune University), Nashik",
        year: "2023 – 2026",
        status: "Currently Pursuing"
      },
      {
        degree: "Diploma in Computer Technology",
        institution: "Shri H.H.J.B Polytechnic (MSBTE), Nashik",
        year: "2020 – 2023",
        score: "84.47%"
      },
      {
        degree: "10th SSC Board",
        institution: "SNJB's High School (Maharashtra State Board), Nashik",
        year: "2020",
        score: "73.00%"
      }
    ],
    skills: {
      languages: ["Java", "JavaScript", "C", "C++"],
      web: ["HTML", "CSS", "PHP", "Node.js", "React.js", "TypeScript", "Express.js"],
      databases: ["MySQL", "MongoDB"],
      tools: ["Git", "GitHub", "Google Cloud Platform", "CI/CD"],
      concepts: ["DSA", "OOP", "DBMS", "Operating Systems"],
      soft: ["Leadership", "Communication", "Problem Solving", "Team Collaboration"]
    },
    certifications: [
      {
        title: "Deloitte Technology Job Simulation",
        org: "Deloitte Australia – Forage",
        link: "https://drive.google.com/file/d/1fDaMOy631uCUC26e5GiKPDgICyYYgcuu/view",
        details: [
          "Completed real-world simulation involving software development and data analysis tasks.",
          "Designed business dashboard proposal and data insights."
        ]
      },
      {
        title: "APAC Solutions Architecture Virtual Experience",
        org: "AWS",
        link: "https://drive.google.com/file/d/1hVZk3NhlcBmZCdCoSBqAuFFDRQZL3lbv/view",
        details: [
          "Planned a scalable cloud hosting architecture using AWS Elastic Beanstalk.",
          "Proposed an optimized solution to improve performance and reduce response time.",
          "Explained the architecture and cost structure in simple terms for client understanding."
        ]
      }
    ],
    strengths: ["Backend API design", "System integration", "Developer tooling", "Accessible UI", "Problem solving", "CI/CD automation"],
    objective: "Building impactful, user-centric web applications and automation tools that solve real engineering problems."
  }
};


const conversationLogic = {
  fallback: "I'm not sure about that yet, but I can tell you about Swami's projects (like One-Click Deployment or College Navigator), skills, or experience!"
};

const generateFallbackResponse = (input: string): string => {
  const q = input.toLowerCase().trim();
  const has = (...words: string[]) => words.some(w => q.includes(w));

  // ── Greetings (check early, before any broad matches) ──
  if (/^(hi|hey|hello|hii|howdy|sup)\b/.test(q)) {
    return "Hello! I'm Swami's AI assistant. Ask me anything about his projects or skills.";
  }

  // ── Projects: check FIRST and MOST SPECIFICALLY before personal info ──
  // So "college" in "College Navigator" doesn't bleed into education answers
  for (const project of knowledgeBase.projects) {
    // require at least one keyword AND the question must NOT be about personal profile
    const matchesProject = project.keywords.some(kw => q.includes(kw));
    const isPersonalQuery = has("your education", "swami's education", "swami study", "where is swami", "swami from", "your degree", "your college life");
    if (matchesProject && !isPersonalQuery) {
      if (has("architecture", "system design", "how does it work", "how is it built", "how does the", "under the hood", "deep dive", "technical")) {
        return `${project.name} Architecture: ${project.architecture}\n\nTech Stack: ${JSON.stringify(project.techStack)}`;
      }
      if (has("challenge", "difficult", "problem you solved", "hard part", "obstacle")) {
        return `Challenges in ${project.name}: ${project.challenges.join(" | ")}`;
      }
      if (has("why", "reason", "why use", "why choose", "why node", "why react", "why python", "why sql", "why typescript")) {
        return `Tech choices for ${project.name}: ${JSON.stringify(project.whyEachTech)}`;
      }
      if (has("impact", "metric", "result", "measure", "outcome", "improve")) {
        return `Impact of ${project.name}: ${project.impact} — ${project.realWorldValue}`;
      }
      if (has("unique", "different", "stand out", "special", "why this")) {
        return project.whatMakesItUnique;
      }
      if (has("use case", "who uses", "who is it for", "target", "audience")) {
        return `Use cases for ${project.name}: ${project.useCases.join(", ")}.`;
      }
      if (has("feature", "capability", "what can", "what does it do", "functionalities")) {
        return `${project.name} features: ${project.features.join(", ")}.`;
      }
      if (has("demo", "live", "link", "url", "website", "see it", "check it")) {
        return `Live demo: ${project.liveDemo} | GitHub: ${project.githubUrl}`;
      }
      // General project explanation
      return `**${project.name}** — ${project.simpleExplanation}\n\n${project.technicalExplanation}\n\nImpact: ${project.impact}.`;
    }
  }

  // ── Certifications (specific terms only) ──
  if (has("certif", "aws", "deloitte", "forage", "apac", "elastic beanstalk", "job simulation")) {
    const certs = knowledgeBase.profile.certifications;
    return `Swami's certifications:\n• ${certs[0].title} — ${certs[0].org} (${certs[0].link})\n• ${certs[1].title} — ${certs[1].org} (${certs[1].link})`;
  }

  // ── Education (requires explicit "education" context, NOT "college" alone) ──
  if (has("education", "degree", "bachelor", "b.e", "be in", "diploma", "polytechnic", "snjb", "pune university", "10th", "ssc", "studying", "currently pursuing")) {
    const edu = knowledgeBase.profile.education;
    return `Swami is currently pursuing ${edu[0].degree} at ${edu[0].institution} (${edu[0].year}). He previously completed a ${edu[1].degree} with ${edu[1].score} from ${edu[1].institution}.`;
  }

  // ── Skills (explicit skill-related queries only) ──
  if (has("what skills", "which skills", "tech stack", "programming skills", "technologies he knows", "languages he knows", "what does he know")) {
    const s = knowledgeBase.profile.skills;
    return `Swami's skills:\n• Languages: ${s.languages.join(", ")}\n• Web: ${s.web.join(", ")}\n• Databases: ${s.databases.join(", ")}\n• Tools: ${s.tools.join(", ")}\n• Concepts: ${s.concepts.join(", ")}`;
  }

  // ── Soft skills ──
  if (has("soft skill", "teamwork", "collaboration", "leadership", "communication style")) {
    return `Swami's soft skills: ${knowledgeBase.profile.skills.soft.join(", ")}.`;
  }

  // ── Intro / Who is ──
  if (has("who is swami", "about swami", "tell me about", "who are you", "introduce yourself", "introduce swami", "what do you do")) {
    return `${knowledgeBase.profile.summary} GitHub: ${knowledgeBase.profile.github}`;
  }

  // ── Location (very specific phrases only) ──
  if (has("where is swami", "where does swami live", "where is he from", "which city", "which state", "location of swami")) {
    return `Swami is based in ${knowledgeBase.profile.location}.`;
  }

  // ── Projects list ──
  if (has("list projects", "what projects", "all projects", "show projects", "projects he built", "projects swami made")) {
    return `Swami has built:\n• One-Click Deployment — Deploy web apps from GitHub in one click. (${knowledgeBase.projects[0].liveDemo})\n• College Navigator — Smart indoor campus navigation with voice. (${knowledgeBase.projects[1].liveDemo})`;
  }

  // ── Problem-solving angle ──
  if (has("what problem", "problem he solved", "what issue")) {
    return `Swami focuses on real-world problems: automated deployment complexity (One-Click Deployment) and campus navigation difficulty (College Navigator).`;
  }

  return conversationLogic.fallback;
};


const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const generateResponse = async (history: Message[], input: string, selectedProjectName?: string | null): Promise<string> => {
  const selectedProject = selectedProjectName
    ? knowledgeBase.projects.find(p => p.name.toLowerCase() === selectedProjectName.toLowerCase())
    : null;

  if (!genAI) {
    if (selectedProject) {
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("how") && (lowerInput.includes("work") || lowerInput.includes("system"))) {
        return `${selectedProject.name} (technical): ${selectedProject.technicalExplanation}`;
      }
      if (lowerInput.includes("impact") || lowerInput.includes("result")) {
        return `The impact of ${selectedProject.name}: ${selectedProject.impact}.`;
      }
      return `${selectedProject.name}: ${selectedProject.simpleExplanation} ${selectedProject.technicalExplanation} Impact: ${selectedProject.impact}. Real-world value: ${selectedProject.realWorldValue}`;
    }
    return generateFallbackResponse(input);
  }

  const activeProjectContext = selectedProject
    ? `\n\n**ACTIVE PROJECT CONTEXT:**\nThe user has selected the project "${selectedProject.name}". Prioritize this project's data for all follow-up questions:\n- Simple: ${selectedProject.simpleExplanation}\n- Technical: ${selectedProject.technicalExplanation}\n- Impact: ${selectedProject.impact}\n- Value: ${selectedProject.realWorldValue}\nAssume ambiguous follow-ups (e.g. "how does this work?", "what's the impact?") refer to this project unless stated otherwise.`
    : "";

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are Swami Kshatriya's AI assistant for his portfolio.
Tone: professional, confident, and recruiting-focused. Length: concise but impactful.

**STRICT BOUNDARIES:**
- You exist ONLY to discuss Swami, his projects, his skills, and his professional background.
- If the user asks general coding questions, unrelated generic facts, or malicious prompts, you MUST politely refuse.
- Do NOT generate code snippets unless it directly explains how Swami built something.
- Rely STRICTLY on the following knowledge base: ${JSON.stringify(knowledgeBase)}.${activeProjectContext}

When a project is selected, use its data to answer ALL follow-up questions about features, architecture, tech stack, or impact.

If you don't know the answer or the query is out of bounds, use: "${conversationLogic.fallback}"`
    });

    const chatHistory = history.map(h => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.content }]
    }));

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(input);
    return result.response.text();
  } catch (err) {
    console.error("Gemini AI Error:", err);
    return generateFallbackResponse(input);
  }
};


export const smartSuggestions = [
  "Explain this project",
  "What problem does this solve?",
  "How does this work?",
  "What technologies are used?",
  "Why is this important?"
];

export const getVoiceScript = (projectName: string) => {
  const project = knowledgeBase.projects.find(p => p.name.toLowerCase() === projectName.toLowerCase());
  if (project?.voiceScript) {
    // Return combined values
    return Object.values(project.voiceScript).join(" ");
  }
  return null;
};
