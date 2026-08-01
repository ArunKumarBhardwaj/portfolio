"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  Sparkles
} from "lucide-react";

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

export default function Home() {
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
    "MongoDB"
  ];

  return (
    <div className="h-screen h-[100dvh] w-full bg-[#050505] text-[#ededed] font-sans antialiased selection:bg-white/20 selection:text-white overflow-hidden flex flex-col justify-between relative p-4 sm:p-8">
      
      {/* Top subtle hairline gradient */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-white/[0.025] blur-3xl pointer-events-none -z-10" />

      {/* HEADER / STATUS */}
      <header className="max-w-xl w-full mx-auto flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for Hire
        </div>
        <div className="text-[11px] font-mono text-zinc-500">
          3.6 Yrs Exp
        </div>
      </header>

      {/* MAIN SINGLE VIEWPORT HERO CONTENT */}
      <main className="max-w-xl w-full mx-auto flex flex-col justify-center gap-4 sm:gap-6 my-auto">
        
        {/* ROLE BADGE & NAME */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-2"
        >
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900/60 w-fit text-[11px] font-mono text-zinc-400">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Full-Stack Expo & React Native Developer
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Arun Kumar <span className="text-zinc-400">Bhardwaj</span>
          </h1>
        </motion.div>

        {/* SUMMARY (EXPO & RN FOCUSED) */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-xs sm:text-base text-zinc-300 font-normal leading-relaxed"
        >
          Full-Stack Mobile & Web Engineer with <strong className="text-white font-semibold">3.6 years of experience</strong>. Specialized in building high-performance cross-platform apps using <strong className="text-white font-semibold">React Native</strong> and modern <strong className="text-white font-semibold">Expo capabilities</strong> (EAS, custom native modules, config plugins), <strong className="text-white font-semibold">Next.js</strong>, along with working backend knowledge of <strong className="text-white font-semibold">Node.js & MongoDB</strong>.
        </motion.p>

        {/* METRICS ROW */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-3 gap-2 border-y border-zinc-800/80 py-3"
        >
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-mono font-semibold text-white">3.6 Yrs</span>
            <span className="text-[10px] sm:text-xs text-zinc-500 font-mono">Experience</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-mono font-semibold text-white">Expo & RN</span>
            <span className="text-[10px] sm:text-xs text-zinc-500 font-mono">Mobile Ecosystem</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-mono font-semibold text-white">Node & Mongo</span>
            <span className="text-[10px] sm:text-xs text-zinc-500 font-mono">Backend Knowledge</span>
          </div>
        </motion.div>

        {/* TECH STACK CHIPS (EXPO & RN TECH ONLY) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap gap-1.5"
        >
          {expoTechStack.map((item, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300"
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
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold">Copied Email!</span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5 text-black" />
                <span>bhardwajarun38@gmail.com</span>
                <Copy className="w-3 h-3 opacity-60 ml-0.5" />
              </>
            )}
          </button>

          <a
            href="tel:+918859099380"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-zinc-400" />
            <span>+91 8859099380</span>
          </a>

          <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800/80 text-xs text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
            <span>Uttarakhand</span>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5 text-zinc-400" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </a>
        </motion.div>

      </main>

      {/* FOOTER */}
      <footer className="max-w-xl w-full mx-auto text-[11px] font-mono text-zinc-600 flex justify-between items-center shrink-0">
        <span>Arun Kumar Bhardwaj</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>

    </div>
  );
}
