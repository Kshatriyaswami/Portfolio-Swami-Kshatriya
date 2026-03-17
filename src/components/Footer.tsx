import { Github, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-foreground/10 mt-8">
    <div className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <h3 className="font-bold text-lg tracking-tight text-foreground">Swami Narayan Kshatriya</h3>
          <p className="text-sm text-foreground/40 mt-1">Full-Stack Developer & Computer Engineer</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:swamikshtriya@gmail.com"
            className="p-3 rounded-xl border border-foreground/10 text-foreground/40 hover:text-accent-red hover:border-accent/40 transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://github.com/Kshatriyaswami"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-foreground/10 text-foreground/40 hover:text-accent-red hover:border-accent/40 transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/swami-kshatriya"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-foreground/10 text-foreground/40 hover:text-accent-red hover:border-accent/40 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="tel:+919545288100"
            className="p-3 rounded-xl border border-foreground/10 text-foreground/40 hover:text-accent-red hover:border-accent/40 transition-colors"
            aria-label="Phone"
          >
            <Phone size={18} />
          </a>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-foreground/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-foreground/30 font-mono-display tracking-wider">
          © {new Date().getFullYear()} SWAMI NARAYAN KSHATRIYA
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs text-foreground/30">English • Marathi • Hindi</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
