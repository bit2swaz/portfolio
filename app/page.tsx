"use client";

import { motion } from "framer-motion";
import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type SVGProps,
} from "react";

type SectionId = "about" | "projects" | "contact";

type Project = {
  name: string;
  badge: string;
  summary: string;
  stack: string[];
  github: string;
  demo: string;
};

type SocialLink = {
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
};

const projects: Project[] = [
  {
    name: "VelocityCache",
    badge: "Infra",
    summary:
      "Remote build caching for polyglot monorepos. Fingerprints every build graph and ships cache artefacts across teams without rewriting the toolchain.",
    stack: ["Go", "Next.js", "S3/R2", "TypeScript", "CLI"],
    github: "https://github.com/bit2swaz/velocity-cache",
    demo: "https://velocity-cache.vercel.app",
  },
  {
    name: "DataForge",
    badge: "Data Engg",
    summary:
      "Python CLI for reproducible CSV cleaning pipelines. Analysts can define, save, and rerun multi-step transformations backed by Pandas, NumPy, and MySQL.",
    stack: ["Python", "Pandas", "NumPy", "MySQL", "CLI"],
    github: "https://github.com/bit2swaz/dataforge-python",
    demo: "#",
  },
];

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/bit2swaz",
    icon: GitHubIcon,
  },
  {
    name: "X",
    href: "https://x.com/bit2swaz",
    icon: XIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aditya-mishra-b82a61362",
    icon: LinkedInIcon,
  },
  {
    name: "Email",
    href: "mailto:bit2swaz@gmail.com",
    icon: MailIcon,
  },
];

interface RevealSectionProps {
  id: SectionId;
  className?: string;
  children: ReactNode;
}

function RevealSection({ id, className, children }: RevealSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "-15% 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const visibilityClass = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative scroll-mt-32 transition-all duration-700 ease-out ${visibilityClass} ${className ?? ""}`}
    >
      {children}
    </section>
  );
}

export default function Home() {
  const handleScrollTo = useCallback((section: SectionId) => {
    const target = document.getElementById(section);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${section}`);
    }
  }, []);

  const handleContactSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, []);

  const ctaClasses =
    "inline-flex items-center justify-center gap-2 rounded-full border border-border/50 px-8 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.34em] transition duration-300 hover:-translate-y-1 hover:border-border/70";

  return (
    <div className="relative isolate">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-12 pt-14 sm:px-6 lg:px-8">
        <RevealSection
          id="about"
          className="flex min-h-[60vh] flex-col items-center justify-center py-14 text-center"
        >
          <div className="flex max-w-3xl flex-col items-center gap-6">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.42em] text-foreground/50">
              Backend & Product Dev
            </span>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Wassup, I&apos;m Aditya. I build tools that make devs faster.
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-foreground/80 sm:text-xl">
              I&apos;m a backend & product developer in love with speed, DX, and performance. I love building infra/devtools that blend technical depth with minimalist but clean designs.
            </p>
            <div className="relative mt-12 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <span className="pointer-events-none absolute inset-x-4 top-1/2 h-32 -translate-y-1/2 rounded-full bg-foreground/10 blur-3xl sm:inset-x-6" aria-hidden />
              <button
                type="button"
                onClick={() => handleScrollTo("projects")}
                className={`${ctaClasses} bg-foreground text-canvas shadow-[0_24px_80px_rgba(0,0,0,0.45)] hover:shadow-[0_32px_120px_rgba(0,0,0,0.55)]`}
              >
                View Projects
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo("contact")}
                className={`${ctaClasses} bg-card/70 text-foreground/80 shadow-soft hover:text-foreground`}
              >
                Contact Me
              </button>
            </div>
          </div>
        </RevealSection>

        <RevealSection
          id="projects"
          className="flex min-h-[55vh] flex-col items-center justify-center gap-8 py-14 text-center"
        >
          <div className="flex max-w-2xl flex-col items-center gap-3">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.42em] text-foreground/50">
              Selected Work
            </span>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Projects
            </h2>
            <p className="text-pretty text-base leading-relaxed text-foreground/75 sm:text-lg">
              Some things I&apos;ve built while FAFOing. Have a look :)
            </p>
          </div>

          <div className="grid w-full max-w-4xl grid-cols-1 gap-6 justify-items-center sm:grid-cols-2">
            {projects.map((project) => (
              <motion.div
                key={project.name}
                className="group flex w-full max-w-xs flex-col rounded-3xl border border-border/40 bg-card/70 p-6 text-left shadow-soft backdrop-blur-2xl transition duration-300 hover:-translate-y-2 hover:border-border/60 hover:bg-card/80 hover:shadow-[0_28px_100px_rgba(0,0,0,0.4)]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {project.name}
                  </h3>
                  <span className="rounded-full border border-border/30 bg-canvas/40 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-foreground/55 transition group-hover:border-border/50 group-hover:text-foreground/80">
                    {project.badge}
                  </span>
                </div>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/75">
                  {project.summary}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border/40 bg-canvas/40 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-foreground/70 transition group-hover:border-border/60 group-hover:text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/40 text-foreground/75 transition hover:border-border/60 hover:text-foreground"
                    aria-label={`${project.name} on GitHub`}
                  >
                    <GitHubIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border/40 text-foreground/75 transition hover:border-border/60 hover:text-foreground"
                    aria-label={`${project.name} live`}
                  >
                    <ExternalLinkIcon className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        <RevealSection
          id="contact"
          className="flex min-h-[55vh] flex-col items-center justify-center gap-8 py-14 text-center"
        >
          <div className="flex max-w-2xl flex-col items-center gap-4">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.42em] text-foreground/50">
              Collaborate
            </span>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s build something crazy together.
            </h2>
            <p className="text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg">
              I&apos;m always open to interesting projects, collaborations, or just a good convo.
            </p>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="w-full max-w-3xl rounded-3xl border border-border/30 bg-card/60 p-8 shadow-soft backdrop-blur-2xl"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-left text-sm font-semibold uppercase tracking-[0.32em] text-foreground/60">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="rounded-2xl border border-border/40 bg-canvas/40 px-4 py-3 text-sm text-foreground/80 placeholder:text-foreground/40 focus:border-border/60 focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-left text-sm font-semibold uppercase tracking-[0.32em] text-foreground/60">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="rounded-2xl border border-border/40 bg-canvas/40 px-4 py-3 text-sm text-foreground/80 placeholder:text-foreground/40 focus:border-border/60 focus:outline-none"
                  required
                />
              </label>
              <label className="md:col-span-2 flex flex-col gap-2 text-left text-sm font-semibold uppercase tracking-[0.32em] text-foreground/60">
                Message
                <textarea
                  name="message"
                  placeholder="Tell me about what you're building."
                  rows={5}
                  className="min-h-[160px] rounded-2xl border border-border/40 bg-canvas/40 px-4 py-3 text-sm text-foreground/80 placeholder:text-foreground/40 focus:border-border/60 focus:outline-none"
                  required
                />
              </label>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/50 bg-foreground px-8 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-canvas shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:shadow-[0_32px_120px_rgba(0,0,0,0.55)]"
              >
                Send Message
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-3 pb-4">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target={name === "Email" ? undefined : "_blank"}
                rel={name === "Email" ? undefined : "noopener noreferrer"}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-border/40 bg-card/70 text-foreground/70 transition hover:border-border/60 hover:text-foreground"
                aria-label={name}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </RevealSection>
      </div>
    </div>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.86-.01-1.68-2.48.54-3-1.19-3-1.19-.45-1.15-1.1-1.46-1.1-1.46-.9-.61.07-.6.07-.6 1 .07 1.53 1.05 1.53 1.05.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-1.98-.23-4.07-.99-4.07-4.39 0-.97.35-1.77.93-2.39-.09-.23-.4-1.15.09-2.39 0 0 .75-.24 2.45.92a8.53 8.53 0 0 1 4.46 0c1.7-1.16 2.45-.92 2.45-.92.49 1.24.18 2.16.09 2.39.58.62.93 1.42.93 2.39 0 3.41-2.1 4.15-4.1 4.37.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0 0 12 2" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M13.45 10.86 19.56 4h-1.45l-5.3 5.94L8 4H3l6.39 9.23L3 20h1.45l5.69-6.37L16 20h5z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-9.65 15H6.69V9.75h2.66zM8 8.54a1.54 1.54 0 1 1 0-3.08 1.54 1.54 0 0 1 0 3.08m10 9.46h-2.65v-3.76c0-.9-.02-2.05-1.25-2.05-1.25 0-1.44.97-1.44 1.98v3.83H9.99V9.75h2.54v1.1h.04a2.79 2.79 0 0 1 2.51-1.38c2.69 0 3.19 1.77 3.19 4.07z" />
    </svg>
  );
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 2v.51l-8 5-8-5V6zm0 12H4V8.32l8 5 8-5z" />
    </svg>
  );
}

function ExternalLinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14z" />
      <path d="M5 5h6V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-2v6H5z" />
    </svg>
  );
}
