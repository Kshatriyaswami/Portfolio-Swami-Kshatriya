import { motion } from "framer-motion";

const techLogos: Record<string, string> = {
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "C": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "Google Cloud Platform": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
};

const skillCategories = [
  { label: "Programming Languages", items: ["Java", "JavaScript", "C", "C++"] },
  { label: "Web Development", items: ["HTML", "CSS", "PHP", "Node.js"] },
  { label: "Database", items: ["MySQL", "MongoDB"] },
  { label: "Tools & Technologies", items: ["Git", "GitHub", "Google Cloud Platform", "CI/CD"] },
  { label: "Core Concepts", items: ["DSA", "OOP", "DBMS", "Operating Systems"] },
  { label: "Soft Skills", items: ["Leadership", "Communication", "Problem Solving", "Team Collaboration"] },
];

const SkillsSection = () => (
  <section id="skills" className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
    <h2 className="font-mono-display text-[11px] tracking-[0.15em] text-foreground/40 uppercase mb-8">
      Skills & Expertise
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillCategories.map((cat, i) => (
        <motion.div
          key={cat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card p-6"
        >
          <h3 className="font-mono-display text-[11px] tracking-[0.15em] text-foreground font-bold uppercase mb-4">
            {cat.label}
          </h3>
          <div className="flex flex-wrap gap-2">
            {cat.items.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.15em] rounded-md bg-foreground/10 text-foreground/80 border border-foreground/10">
                {techLogos[item] && (
                  <img src={techLogos[item]} alt={item} className="w-3.5 h-3.5" />
                )}
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default SkillsSection;
