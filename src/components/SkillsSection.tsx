import { motion } from "framer-motion";

const skillCategories = [
  { label: "Programming Languages", items: ["Java", "JavaScript", "C", "C++"] },
  { label: "Web Development", items: ["HTML", "CSS", "PHP", "Node.js"] },
  { label: "Database", items: ["MySQL", "MongoDB"] },
  { label: "Tools & Technologies", items: ["Git", "GitHub", "Google Cloud Platform", "CI/CD"] },
  { label: "Core Concepts", items: ["DSA", "OOP", "DBMS", "Operating Systems"] },
  { label: "Soft Skills", items: ["Leadership", "Communication", "Problem Solving", "Team Collaboration"] },
];

const SkillsSection = () => (
  <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
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
          <h3 className="font-mono-display text-[10px] tracking-[0.15em] text-accent-red uppercase mb-4">
            {cat.label}
          </h3>
          <div className="flex flex-wrap gap-2">
            {cat.items.map((item) => (
              <span key={item} className="tech-badge">{item}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default SkillsSection;
