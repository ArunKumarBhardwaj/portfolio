import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const EMAIL = "bhardwajarun38@gmail.com";
const PHONE = "+91 8859099380";
const LINKS = {
  github: "https://github.com/ArunKumarBhardwaj",
  linkedin: "https://www.linkedin.com/in/arun-bhardwaj-b1828b210",
  company: "https://www.linkedin.com/company/itechnolabs-ca/posts/?feedView=all",
  resume: "/ARUN_RESUME.pdf",
};

type Project = {
  name: string;
  summary: string;
  stack: string;
  links?: { label: string; href: string }[];
};

const PROJECTS: Project[] = [
  {
    name: "Mergata",
    summary:
      "Community app for the Albanian diaspora — live border wait times, rideshares, jobs and housing. Geofencing prompts travellers for crowdsourced reports.",
    stack: "Expo · Geofencing · Maps",
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.mergata.ride.app",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/in/app/mergata/id6753675571",
      },
    ],
  },
  {
    name: "Swivics",
    summary:
      "Corporate mobility platform with recurring rides. Background location that survives Android Doze and OEM battery killers on Samsung, Xiaomi and Oppo.",
    stack: "Expo · Background location · Maps",
    links: [
      {
        label: "Customer app",
        href: "https://apps.apple.com/us/app/swivics/id6759370893",
      },
      {
        label: "Driver app",
        href: "https://apps.apple.com/us/app/swivics-driver/id6759370949",
      },
    ],
  },
  {
    name: "WedSuite",
    summary:
      "Wedding planning app with a streaming AI assistant (SSE, RAG over a vector DB), RevenueCat subscriptions, budgets, RSVPs and calendar sync.",
    stack: "React Native · SSE · RevenueCat",
  },
  {
    name: "Mezzo",
    summary:
      "E-scooter rentals with live telemetry from Teltonika IoT devices over WebSockets, geofenced parking and Stripe pay-as-you-go wallets.",
    stack: "Expo · WebSockets · Stripe",
  },
  {
    name: "POV",
    summary:
      "Short-video social app — HLS reels and stories with prefetching for instant playback, FFmpeg compression and background uploads.",
    stack: "React Native · HLS · FFmpeg",
  },
];

const EXPERIENCE = [
  {
    period: "Oct 2024 — Now",
    role: "Software Engineer",
    company: "iTechnolabs",
    href: LINKS.company,
    note: "Own EAS build and release pipelines; 99.9% crash-free across releases.",
  },
  {
    period: "May 2023 — Sep 2024",
    role: "Freelance Next.js Developer",
    company: "Asterism Advisory",
    note: "Marketing site on Next.js + Sanity, rate-limited Resend contact flow.",
  },
  {
    period: "Jan 2023 — Apr 2023",
    role: "Software Development Engineer I",
    company: "Veative Labs",
    note: "1:1 and group video learning sessions with GetStream on React Native.",
  },
  {
    period: "Apr 2021 — Oct 2022",
    role: "React Native Developer",
    company: "SheThink",
    note: "Shipped client apps end-to-end, including both store submissions.",
  },
];

const STACK = [
  {
    group: "Mobile",
    items:
      "React Native, Expo, EAS Build & Submit, custom native modules, config plugins, Xcode, Android Studio",
  },
  {
    group: "Web",
    items: "TypeScript, React, Next.js, Tailwind CSS, Node.js",
  },
  {
    group: "Data & services",
    items: "REST, GraphQL, WebSockets, Firebase, Supabase, Convex, MongoDB, Stripe",
  },
];

/* ------------------------------------------------------------------ */
/* Motion                                                              */
/* ------------------------------------------------------------------ */

const EASE_OUT = [0.16, 1, 0.3, 1] as const; // ease-out-expo

/** A line of display type that rises out of a mask. */
function MaskLine({
  children,
  delay,
}: {
  children: ReactNode;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Fades content up once when scrolled into view. */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A hairline that draws from left to right when it enters view. */
function Rule({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="h-px w-full bg-border origin-left"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE_OUT, delay }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ?? "--:--"} IST
    </span>
  );
}

function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-foreground transition-colors cursor-pointer ${className}`}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "y" : "n"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="inline-flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-signal" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" /> Copy email
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function SectionHead({ title, aside }: { title: string; aside?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 pb-4">
      <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      {aside && (
        <span className="font-mono text-xs text-muted-soft">{aside}</span>
      )}
    </div>
  );
}

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1 hover:text-signal transition-colors ${className}`}
    >
      {children}
      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Portfolio() {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground antialiased selection:bg-[var(--selection-bg)] selection:text-[var(--selection-fg)]">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-10">
        {/* ---------- Top bar ---------- */}
        <motion.header
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center justify-between gap-4 py-5 sm:py-7 font-mono text-[11px] sm:text-xs text-muted"
        >
          <span className="text-foreground">AKB</span>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden sm:inline">Chandigarh, India</span>
            <LocalTime />
            <ThemeToggle />
          </div>
        </motion.header>

        {/* ---------- Hero ---------- */}
        <section className="pt-[12vh] sm:pt-[16vh] pb-16 sm:pb-24">
          <h1 className="font-display font-semibold tracking-[-0.035em] leading-[0.92] text-[clamp(3.25rem,13vw,9.5rem)]">
            <MaskLine delay={0.1}>Arun Kumar</MaskLine>
            <MaskLine delay={0.22}>
              Bhardwaj<span className="text-signal">.</span>
            </MaskLine>
          </h1>

          <div className="mt-10 sm:mt-14 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.55 }}
              className="max-w-[34rem] text-lg sm:text-xl leading-relaxed text-muted"
            >
              I build iOS and Android apps with{" "}
              <span className="text-foreground">React Native and Expo</span>{" "}
              — from the first screen through EAS builds to the store review.
              3 years and 10 months in, currently a software engineer at{" "}
              <a
                href={LINKS.company}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-border-strong underline-offset-4 hover:decoration-signal transition-colors"
              >
                iTechnolabs
              </a>
              .
            </motion.p>

            <motion.dl
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-3 font-mono text-xs sm:text-right"
            >
              <div>
                <dt className="text-muted-soft">Experience</dt>
                <dd className="text-foreground">3 yrs 10 mos</dd>
              </div>
              <div>
                <dt className="text-muted-soft">Ships to</dt>
                <dd className="text-foreground">iOS · Android</dd>
              </div>
            </motion.dl>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-inverse text-inverse-fg px-5 py-2.5 font-medium hover:bg-signal hover:text-white transition-colors duration-300"
            >
              Get in touch
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={LINKS.resume}
              download="ARUN_RESUME.pdf"
              className="text-muted hover:text-foreground underline decoration-border-strong underline-offset-4 hover:decoration-signal transition-colors"
            >
              Download résumé (PDF)
            </a>
          </motion.div>
        </section>

        {/* ---------- Shipped work ---------- */}
        <section id="work" className="py-12 sm:py-16">
          <Reveal>
            <SectionHead
              title="Selected work"
              aside={`${PROJECTS.length} apps`}
            />
          </Reveal>
          <Rule />
          <ol>
            {PROJECTS.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={i * 0.05}>
                  <article className="group grid gap-x-8 gap-y-2 py-6 sm:py-7 sm:grid-cols-[3rem_minmax(0,14rem)_minmax(0,1fr)]">
                    <span className="font-mono text-xs text-muted-soft pt-2 transition-colors duration-300 group-hover:text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                        {p.name}
                      </h3>
                      <p className="mt-1 font-mono text-[11px] text-muted-soft">
                        {p.stack}
                      </p>
                    </div>
                    <div className="sm:pt-2">
                      <p className="text-[15px] leading-relaxed text-muted max-w-[60ch]">
                        {p.summary}
                      </p>
                      {p.links && (
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-foreground">
                          {p.links.map((l) => (
                            <ExternalLink key={l.href} href={l.href}>
                              {l.label}
                            </ExternalLink>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
                <Rule delay={0.1} />
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Experience ---------- */}
        <section id="experience" className="py-12 sm:py-16">
          <Reveal>
            <SectionHead title="Experience" aside="3 yrs 10 mos" />
          </Reveal>
          <Rule />
          <ul>
            {EXPERIENCE.map((e, i) => (
              <li key={e.company}>
                <Reveal delay={i * 0.05}>
                  <div className="grid gap-x-8 gap-y-1 py-5 sm:grid-cols-[11rem_minmax(0,1fr)]">
                    <span className="font-mono text-xs text-muted-soft pt-1 tabular-nums">
                      {e.period}
                    </span>
                    <div>
                      <p className="text-base sm:text-lg">
                        <span className="font-medium">{e.role}</span>
                        <span className="text-muted"> · </span>
                        {e.href ? (
                          <a
                            href={e.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-border-strong underline-offset-4 hover:decoration-signal transition-colors"
                          >
                            {e.company}
                          </a>
                        ) : (
                          e.company
                        )}
                      </p>
                      <p className="mt-1 text-sm text-muted max-w-[60ch]">
                        {e.note}
                      </p>
                    </div>
                  </div>
                </Reveal>
                <Rule delay={0.1} />
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Stack ---------- */}
        <section id="stack" className="py-12 sm:py-16">
          <Reveal>
            <SectionHead title="Tools I reach for" />
          </Reveal>
          <Rule />
          <dl className="grid gap-6 pt-6 sm:grid-cols-3">
            {STACK.map((s, i) => (
              <Reveal key={s.group} delay={i * 0.08}>
                <dt className="font-mono text-xs text-muted-soft">{s.group}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed">{s.items}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="pt-16 sm:pt-24 pb-10">
          <Reveal>
            <p className="text-muted text-lg">
              Building something for iOS and Android?
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-3 inline-block font-display font-semibold tracking-[-0.03em] leading-[1] text-[clamp(1.6rem,6.2vw,4.25rem)] break-all sm:break-normal"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_2px] group-hover:text-signal pb-1">
                {EMAIL}
              </span>
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
              <CopyEmail />
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="font-mono text-xs hover:text-foreground transition-colors"
              >
                {PHONE}
              </a>
            </div>
          </Reveal>

          <div className="mt-16 sm:mt-24">
            <Rule />
            <footer className="flex flex-wrap items-center justify-between gap-4 pt-5 font-mono text-xs text-muted">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <ExternalLink href={LINKS.github}>GitHub</ExternalLink>
                <ExternalLink href={LINKS.linkedin}>LinkedIn</ExternalLink>
                <a
                  href={LINKS.resume}
                  download="ARUN_RESUME.pdf"
                  className="hover:text-signal transition-colors"
                >
                  Résumé
                </a>
              </div>
              <span className="text-muted-soft">
                © {new Date().getFullYear()} Arun Kumar Bhardwaj
              </span>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}
