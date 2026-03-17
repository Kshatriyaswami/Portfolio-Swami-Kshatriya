import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "Deloitte Technology Job Simulation",
    org: "Deloitte Australia – Forage",
    details: [
      "Completed real-world simulation involving software development and data analysis tasks.",
      "Designed business dashboard proposal and data insights.",
    ],
  },
  {
    title: "APAC Solutions Architecture Virtual Experience",
    org: "AWS",
    details: [
      "Planned a scalable cloud hosting architecture using AWS Elastic Beanstalk.",
      "Proposed an optimized solution to improve performance and reduce response time.",
      "Explained the architecture and cost structure in simple terms for client understanding.",
    ],
  },
];

const CertificationsSection = () => (
  <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
    <h2 className="font-mono-display text-[11px] tracking-[0.15em] text-foreground/40 uppercase mb-8">
      Training & Certifications
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {certifications.map((cert, i) => (
        <motion.div
          key={cert.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-xl bg-accent/10 mt-1">
              <Award size={18} className="text-accent-red" />
            </div>
            <div>
              <h3 className="font-bold text-foreground tracking-tight">{cert.title}</h3>
              <span className="font-mono-display text-[10px] tracking-[0.15em] text-accent-red uppercase">
                {cert.org}
              </span>
              <ul className="mt-3 space-y-2">
                {cert.details.map((d, j) => (
                  <li key={j} className="text-sm text-foreground/60 leading-relaxed flex gap-2">
                    <span className="text-accent-red mt-1.5 shrink-0">•</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default CertificationsSection;
