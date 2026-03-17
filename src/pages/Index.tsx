import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, Terminal } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import EducationSection from "@/components/EducationSection";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import profileAvatar from "@/assets/profile-avatar.png";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="px-6 md:px-12 pt-16 pb-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row items-start gap-8"
        >
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="shrink-0"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[24px] overflow-hidden border-2 border-foreground/10 relative group">
              <img
                src={profileAvatar}
                alt="Swami Narayan Kshatriya"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={14} className="text-accent-red" />
              <span className="font-mono-display text-[10px] tracking-[0.2em] text-accent-red uppercase">
                System_Status: Operational
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground leading-[1.1]">
              Swami Narayan Kshatriya
            </h1>
            <p className="mt-4 text-foreground/50 text-lg leading-relaxed max-w-2xl">
              Computer Engineering undergraduate specializing in building scalable applications and REST APIs using Java, JavaScript, and SQL. Experienced in backend development, AI-powered systems, and cloud-based deployment solutions. Passionate about solving real-world problems using DSA and system design.
            </p>
          </div>
        </motion.div>
      </header>

      {/* Projects Section */}
      <section className="px-6 md:px-12 pb-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono-display text-[11px] tracking-[0.15em] text-foreground/40 uppercase">
            Projects ({projects.length})
          </h2>
          <div className="flex items-center gap-1 p-1 rounded-lg border border-foreground/10 bg-secondary/30">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "grid" ? "bg-accent-red text-accent-foreground" : "text-foreground/40 hover:text-foreground/60"
              }`}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "list" ? "bg-accent-red text-accent-foreground" : "text-foreground/40 hover:text-foreground/60"
              }`}
            >
              <List size={14} />
            </button>
          </div>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 gap-8"
              : "flex flex-col gap-4"
          }
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              onClick={() => setSelectedProject(project)}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Skills */}
      <SkillsSection />

      {/* Education */}
      <EducationSection />

      {/* Certifications */}
      <CertificationsSection />

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
