export interface Project {
  name: string;
  tag: string;
  description: string;
  impact: string;
  tech: string[];
  liveDemoUrl: string;
  githubUrl: string;
  features: string[];
}

export const projects: Project[] = [
  {
    name: "One-Click Deployment",
    tag: "Automation Tool",
    description: "Deploy web apps directly from GitHub with a single click using automated pipelines.",
    impact: "Reduced deployment effort by 70%",
    tech: ["Node.js", "Express.js", "GitHub API", "Vercel API", "Netlify API"],
    liveDemoUrl: "https://randomdeploytool-swamikshtriya-9528-swamis-projects-c46278af.vercel.app/",
    githubUrl: "https://github.com/Kshatriyaswami/randomdeploytool",
    features: [
      "Real-time logs",
      "Error debugging insights",
      "Deployment history tracking",
    ],
  },
  {
    name: "College Navigator",
    tag: "Smart Navigation System",
    description: "Interactive campus navigation system with voice assistance and real-time directions.",
    impact: "Reduced search time by 50%",
    tech: ["React.js", "TypeScript", "Python", "SQL"],
    liveDemoUrl: "https://college-indoor-navigation.netlify.app/",
    githubUrl: "https://github.com/Kshatriyaswami/College-Indoor-Navigation",
    features: [
      "Voice navigation",
      "50+ location database",
      "Real-time routing",
    ],
  },
];
