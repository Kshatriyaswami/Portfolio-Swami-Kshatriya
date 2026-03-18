import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download, Eye } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/15 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-bold text-foreground tracking-tight text-lg"
        >
          SNK<span className="text-accent-red">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="font-mono-display text-[11px] tracking-[0.15em] uppercase text-foreground/50 hover:text-accent-red transition-colors"
            >
              {link.label}
            </button>
          ))}

          {/* Resume buttons */}
          <div className="flex items-center gap-2 ml-2">
            <a
              href="/Swami_Kshatriya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono-display tracking-[0.15em] uppercase rounded-lg border border-border/20 text-foreground/60 hover:text-accent-red hover:border-accent/40 transition-colors"
            >
              <Eye size={13} />
              View CV
            </a>
            <a
              href="/Swami_Kshatriya_Resume.pdf"
              download
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono-display tracking-[0.15em] uppercase rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              <Download size={13} />
              Resume
            </a>
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground/60"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/15 px-6 pb-6 pt-2"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="block w-full text-left py-3 font-mono-display text-[11px] tracking-[0.15em] uppercase text-foreground/60 hover:text-accent-red transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-2 mt-3">
            <a
              href="/Swami_Kshatriya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-mono-display tracking-[0.15em] uppercase rounded-lg border border-border/20 text-foreground/60"
            >
              <Eye size={13} />
              View CV
            </a>
            <a
              href="/Swami_Kshatriya_Resume.pdf"
              download
              className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-mono-display tracking-[0.15em] uppercase rounded-lg bg-accent text-accent-foreground"
            >
              <Download size={13} />
              Resume
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
