import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

const techLogos: Record<string, string> = {
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "GitHub API": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

const ProjectCard = ({ project, onClick, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="glass-card p-8 cursor-pointer group transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[24px]" />

      <span className="font-mono-display text-[10px] tracking-[0.2em] text-accent-red uppercase relative z-10">
        {project.tag}
      </span>

      <h3 className="text-2xl font-bold mt-2 mb-4 tracking-tight text-foreground relative z-10">
        {project.name}
      </h3>

      <p className="text-foreground/60 leading-relaxed mb-6 relative z-10">
        {project.description}
      </p>

      <div className="flex gap-2 flex-wrap relative z-10">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="tech-badge inline-flex items-center gap-1.5">
            {techLogos[t] && (
              <img src={techLogos[t]} alt={t} className="w-3.5 h-3.5" />
            )}
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="px-2 py-1 text-[10px] font-mono text-foreground/40">
            +{project.tech.length - 4}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
