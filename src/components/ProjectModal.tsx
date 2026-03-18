import { useState, useCallback, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, RefreshCw, Maximize2, Monitor, Tablet, Smartphone, Github, Zap, ChevronRight, AlertTriangle } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const tabs = ["Overview", "Live Preview", "Tech Stack", "Impact"] as const;
type Tab = typeof tabs[number];

const deviceWidths = { desktop: "100%", tablet: "768px", mobile: "375px" };

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("Live Preview");
  const [device, setDevice] = useState<keyof typeof deviceWidths>("desktop");
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const handleRefresh = useCallback(() => {
    setIframeLoaded(false);
    setIframeError(false);
    setIframeKey((k) => k + 1);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden glass-card"
        style={{ willChange: "backdrop-filter" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                  activeTab === tab ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-red"
                  />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-foreground/40 hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-64px)]">
          <AnimatePresence mode="wait">
            {activeTab === "Overview" && (
              <TabContent key="overview">
                <div className="p-8 space-y-6">
                  <div>
                    <span className="font-mono-display text-[10px] tracking-[0.2em] text-accent-red uppercase">
                      {project.tag}
                    </span>
                    <h2 className="text-3xl font-bold tracking-tighter mt-2 text-foreground">
                      {project.name}
                    </h2>
                  </div>
                  <p className="text-foreground/70 leading-relaxed max-w-2xl text-lg">
                    {project.description}
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-mono-display text-[11px] tracking-[0.15em] text-foreground/50 uppercase">
                      Key Features
                    </h4>
                    {project.features.map((f) => (
                      <div key={f} className="flex items-center gap-3 text-foreground/70">
                        <ChevronRight size={14} className="text-accent-red" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent-red text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-foreground/10 rounded-lg text-sm text-foreground/70 hover:text-foreground hover:border-foreground/20 transition-colors"
                    >
                      <Github size={14} /> Source Code
                    </a>
                  </div>
                </div>
              </TabContent>
            )}

            {activeTab === "Live Preview" && (
              <TabContent key="preview">
                <div className="p-6">
                  <div className="rounded-[16px] border border-foreground/10 overflow-hidden bg-background/50">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/10 bg-secondary/30">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span className="ml-3 text-[11px] font-mono text-foreground/30 truncate max-w-[200px]">
                          {project.liveDemoUrl}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={handleRefresh} className="p-1.5 text-foreground/30 hover:text-foreground/60 transition-colors">
                          <RefreshCw size={14} />
                        </button>
                        <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-foreground/30 hover:text-accent-red transition-colors">
                          <ExternalLink size={14} />
                        </a>
                        <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-foreground/30 hover:text-foreground/60 transition-colors">
                          <Maximize2 size={14} />
                        </a>
                      </div>
                    </div>

                    <div className="relative flex justify-center bg-[#050505]" style={{ minHeight: "400px" }}>
                      {!iframeLoaded && !iframeError && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-full skeleton-pulse rounded-none" />
                          <span className="absolute font-mono-display text-[11px] text-foreground/30 tracking-wider">
                            LOADING PREVIEW...
                          </span>
                        </div>
                      )}
                      {iframeError ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-16">
                          <AlertTriangle size={32} className="text-accent-red" />
                          <p className="text-foreground/50 text-sm text-center max-w-md">
                            Preview unavailable — the site may block embedding.
                          </p>
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-accent-red text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                          >
                            <ExternalLink size={14} /> Open in New Tab
                          </a>
                        </div>
                      ) : (
                        <>
                          <iframe
                            key={iframeKey}
                            src={project.liveDemoUrl}
                            onLoad={() => setIframeLoaded(true)}
                            onError={() => setIframeError(true)}
                            className="border-0 transition-all duration-300"
                            style={{
                              width: deviceWidths[device],
                              height: "400px",
                              maxWidth: "100%",
                            }}
                            title={`${project.name} preview`}
                            sandbox="allow-scripts allow-same-origin allow-popups"
                          />
                          <div className="absolute inset-0 scanline pointer-events-none" />
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="flex items-center gap-1 p-1 rounded-full bg-secondary/50 backdrop-blur-md border border-foreground/10">
                      {([["desktop", Monitor], ["tablet", Tablet], ["mobile", Smartphone]] as const).map(
                        ([key, Icon]) => (
                          <button
                            key={key}
                            onClick={() => setDevice(key)}
                            className={`p-2 rounded-full transition-colors ${
                              device === key
                                ? "bg-accent-red text-accent-foreground"
                                : "text-foreground/40 hover:text-foreground/70"
                            }`}
                          >
                            <Icon size={16} />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                  <p className="text-center text-foreground/30 text-xs font-mono mt-2">
                    Click inside preview to interact · If blocked, open in new tab
                  </p>
                </div>
              </TabContent>
            )}

            {activeTab === "Tech Stack" && (
              <TabContent key="tech">
                <div className="p-8 space-y-6">
                  <h3 className="font-mono-display text-[11px] tracking-[0.15em] text-foreground/50 uppercase">
                    Technologies Used
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.tech.map((t) => (
                      <div
                        key={t}
                        className="glass-card p-4 flex items-center gap-3 hover:border-accent/40 transition-colors cursor-default"
                        style={{ borderRadius: "16px" }}
                      >
                        <div className="w-2 h-2 rounded-full bg-accent-red" />
                        <span className="font-mono-display text-sm text-foreground/80">
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabContent>
            )}

            {activeTab === "Impact" && (
              <TabContent key="impact">
                <div className="p-8 space-y-8">
                  <div className="glass-card p-8 text-center" style={{ borderRadius: "16px" }}>
                    <Zap className="mx-auto mb-4 text-accent-red" size={32} />
                    <p className="font-mono-display text-[11px] tracking-[0.15em] text-foreground/50 uppercase mb-2">
                      Key Metric
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-foreground">
                      {project.impact}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-mono-display text-[11px] tracking-[0.15em] text-foreground/50 uppercase">
                      Capabilities
                    </h4>
                    {project.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-3 p-3 border border-foreground/5 rounded-xl text-foreground/70"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                        <span className="text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabContent>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TabContent = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
);
TabContent.displayName = "TabContent";

export default ProjectModal;
