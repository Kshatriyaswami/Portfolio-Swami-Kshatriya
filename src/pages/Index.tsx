import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, Terminal } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";

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
        >
          <div className="flex items-center gap-2 mb-6">
            <Terminal size={14} className="text-accent-red" />
            <span className="font-mono-display text-[10px] tracking-[0.2em] text-accent-red uppercase">
              System_Status: Operational
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground leading-[1.1] max-w-3xl">
            I build tools that deploy at the speed of thought.
          </h1>
          <p className="mt-6 text-foreground/50 text-lg leading-relaxed max-w-xl">
            Full-stack engineer crafting high-performance automation tools and intelligent navigation systems.
          </p>
        </motion.div>
      </header>

      {/* Projects Section */}
      <section className="px-6 md:px-12 pb-20 max-w-6xl mx-auto">
        {/* Section Header */}
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

        {/* Grid / List */}
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
