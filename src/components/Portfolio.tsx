import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Download,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Portfolio() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bhardwajarun38@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const expoTechStack = [
    "React Native",
    "Expo",
    "EAS Build & Deploy",
    "Custom Native Modules",
    "Config Plugins",
    "TypeScript",
    "Next.js",
    "Node.js",
    "MongoDB",
  ];

  return (
    <div className="min-h-[100dvh] h-[100dvh] w-full bg-background text-foreground font-sans antialiased selection:bg-[var(--selection-bg)] selection:text-[var(--selection-fg)] overflow-x-hidden overflow-y-auto sm:overflow-hidden flex flex-col justify-between relative px-4 py-4 sm:p-8">
      {/* Top subtle hairline gradient */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--hairline), transparent)",
        }}
      />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(500px,100vw)] h-[250px] blur-3xl pointer-events-none -z-10"
        style={{ background: "var(--glow)" }}
      />

      {/* HEADER / STATUS */}
      <header className="max-w-xl w-full mx-auto flex items-center justify-between shrink-0 gap-2 sm:gap-3">
        <a
          href="https://www.linkedin.com/company/itechnolabs-ca/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 text-[10px] sm:text-[11px] font-mono text-muted hover:text-foreground transition-colors group"
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
            style={{ background: "var(--status)" }}
          />
          <span className="truncate">
            <span className="sm:hidden">
              Eng @{" "}
              <span className="font-semibold text-foreground underline decoration-border group-hover:decoration-foreground">
                iTechnolabs
              </span>
            </span>
            <span className="hidden sm:inline">
              Software Engineer @{" "}
              <span className="font-semibold text-foreground underline decoration-border group-hover:decoration-foreground">
                iTechnolabs
              </span>
            </span>
          </span>
          <ArrowUpRight className="w-3 h-3 text-muted-soft group-hover:text-foreground transition-colors shrink-0" />
        </a>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden min-[400px]:block text-[10px] sm:text-[11px] font-mono text-muted-soft whitespace-nowrap">
            3.6 Yrs Exp
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* MAIN SINGLE VIEWPORT HERO CONTENT */}
      <main className="max-w-xl w-full mx-auto flex flex-col justify-center gap-3 sm:gap-6 my-auto py-4 sm:py-0 min-h-0">
        {/* ROLE BADGE & NAME */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-2"
        >
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-border bg-badge w-fit max-w-full text-[10px] sm:text-[11px] font-mono text-muted">
            <Sparkles
              className="w-3 h-3 shrink-0"
              style={{ color: "var(--accent-spark)" }}
            />
            <span className="truncate">
              Full-Stack Expo & React Native Developer
            </span>
          </div>

          <h1 className="text-[1.75rem] leading-tight sm:text-5xl font-bold tracking-tight text-foreground sm:leading-tight">
            Arun Kumar <span className="text-muted">Bhardwaj</span>
          </h1>
        </motion.div>

        {/* SUMMARY */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-xs sm:text-base text-muted font-normal leading-relaxed"
        >
          Currently working as a{" "}
          <strong className="text-foreground font-semibold">
            Software Engineer
          </strong>{" "}
          at{" "}
          <a
            href="https://www.linkedin.com/company/itechnolabs-ca/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-semibold underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-0.5 group"
          >
            <span>iTechnolabs</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-soft group-hover:text-foreground transition-colors inline" />
          </a>
          . Full-Stack Mobile & Web Engineer with{" "}
          <strong className="text-foreground font-semibold">
            3.6 years of experience
          </strong>
          . Specialized in building high-performance cross-platform apps using{" "}
          <strong className="text-foreground font-semibold">React Native</strong>{" "}
          and modern{" "}
          <strong className="text-foreground font-semibold">
            Expo capabilities
          </strong>{" "}
          (EAS, custom native modules, config plugins),{" "}
          <strong className="text-foreground font-semibold">Next.js</strong>,
          along with working backend knowledge of{" "}
          <strong className="text-foreground font-semibold">
            Node.js & MongoDB
          </strong>
          .
        </motion.p>

        {/* METRICS ROW */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-3 gap-1.5 sm:gap-2 border-y border-border/80 py-2.5 sm:py-3"
        >
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-xl font-mono font-semibold text-foreground">
              3.6 Yrs
            </span>
            <span className="text-[9px] sm:text-xs text-muted-soft font-mono">
              Experience
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-xl font-mono font-semibold text-foreground">
              Expo & RN
            </span>
            <span className="text-[9px] sm:text-xs text-muted-soft font-mono">
              Mobile
              <span className="hidden sm:inline"> Ecosystem</span>
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-xl font-mono font-semibold text-foreground">
              Node & Mongo
            </span>
            <span className="text-[9px] sm:text-xs text-muted-soft font-mono">
              Backend
              <span className="hidden sm:inline"> Knowledge</span>
            </span>
          </div>
        </motion.div>

        {/* TECH STACK CHIPS */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap gap-1.5"
        >
          {expoTechStack.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 rounded bg-surface border border-border text-[11px] font-mono text-muted"
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* CONTACT & SOCIAL ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-wrap items-center gap-2 pt-1"
        >
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-inverse text-inverse-fg font-medium text-xs hover:opacity-90 transition-opacity cursor-pointer max-w-full"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 shrink-0" />
                <span className="font-semibold">Copied Email!</span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate sm:hidden">Copy Email</span>
                <span className="hidden sm:inline truncate">
                  bhardwajarun38@gmail.com
                </span>
                <Copy className="w-3 h-3 opacity-60 ml-0.5 shrink-0" />
              </>
            )}
          </button>

          <a
            href="tel:+918859099380"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface border border-border text-xs text-muted hover:border-border-strong hover:text-foreground transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-muted-soft" />
            <span>+91 8859099380</span>
          </a>

          <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-muted border border-border/80 text-xs text-muted">
            <MapPin className="w-3.5 h-3.5 text-muted-soft" />
            <span>Uttarakhand</span>
          </div>

          <a
            href="https://github.com/ArunKumarBhardwaj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface border border-border text-xs text-muted hover:border-border-strong hover:text-foreground transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5 text-muted-soft" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-muted-soft" />
          </a>

          <a
            href="/ARUN_RESUME.pdf"
            download="ARUN_RESUME.pdf"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface border border-border text-xs text-muted hover:border-border-strong hover:text-foreground transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-muted-soft" />
            <span>Download Resume</span>
          </a>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="max-w-xl w-full mx-auto text-[10px] sm:text-[11px] font-mono text-muted-soft flex justify-between items-center shrink-0 gap-2">
        <span className="truncate">Arun Kumar Bhardwaj</span>
        <span className="shrink-0">© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
