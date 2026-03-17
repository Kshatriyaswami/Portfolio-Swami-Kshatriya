import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Engineering (Computer Engineering)",
    school: "SNJB's LSKBJ CoE (Savitribai Phule Pune University), Nashik",
    year: "2023 – 2026",
    note: "Currently Pursuing",
  },
  {
    degree: "Diploma in Computer Technology",
    school: "Shri H.H.J.B Polytechnic (MSBTE), Nashik",
    year: "2020 – 2023",
    note: "84.47%",
  },
  {
    degree: "10th SSC Board",
    school: "SNJB's High School (Maharashtra State Board), Nashik",
    year: "2020",
    note: "73.00%",
  },
];

const EducationSection = () => (
  <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
    <h2 className="font-mono-display text-[11px] tracking-[0.15em] text-foreground/40 uppercase mb-8">
      Education
    </h2>
    <div className="space-y-4">
      {education.map((edu, i) => (
        <motion.div
          key={edu.degree}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card p-6 flex items-start gap-4"
        >
          <div className="p-2 rounded-xl bg-accent/10 mt-1 shrink-0">
            <GraduationCap size={18} className="text-accent-red" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="font-bold text-foreground tracking-tight">{edu.degree}</h3>
              <span className="font-mono-display text-[10px] tracking-[0.15em] text-foreground/40 shrink-0">
                {edu.year}
              </span>
            </div>
            <p className="text-sm text-foreground/50 mt-1">{edu.school}</p>
            <span className="inline-block mt-2 tech-badge">{edu.note}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default EducationSection;
