"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import type { MouseEvent } from "react";

import { ThemeToggle } from "@/components/theme-toggle";

const NAV_ITEMS = [
  { label: "About", href: "#about", external: false },
  { label: "Projects", href: "#projects", external: false },
  {
    label: "Blog",
    href: "https://blog-platform-ten-livid.vercel.app",
    external: true,
  },
  { label: "Contact", href: "#contact", external: false },
] as const;

export function Header() {
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const hydrateSections = () => {
      const nextMap: Record<string, HTMLElement | null> = {};

      NAV_ITEMS.forEach(({ href, external }) => {
        if (external || !href.startsWith("#")) {
          return;
        }

        const id = href.slice(1);
        nextMap[id] = document.getElementById(id);
      });

      sectionsRef.current = nextMap;
    };

    hydrateSections();

    window.addEventListener("resize", hydrateSections);
    window.addEventListener("hashchange", hydrateSections);

    return () => {
      window.removeEventListener("resize", hydrateSections);
      window.removeEventListener("hashchange", hydrateSections);
    };
  }, []);

  const handleNavClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string, external: boolean) => {
      if (external || !href.startsWith("#")) {
        return;
      }

      event.preventDefault();

      const id = href.slice(1);
      const section = sectionsRef.current[id] ?? document.getElementById(id);

      if (section) {
        sectionsRef.current[id] = section;
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", href);
      }
    },
    [],
  );

  return (
    <header className="sticky top-0 z-30 border-b border-border/40 bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3" prefetch={false}>
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-card/60 transition-transform duration-300 group-hover:scale-[1.05]">
              <Image
                src="/bit2swaz-img.jpg"
                alt="bit2swaz avatar"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight text-foreground">
                bit2swaz
              </span>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.42em] text-foreground/50">
                portfolio
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-foreground/70 md:flex">
              {NAV_ITEMS.map(({ label, href, external }) => (
                <Link
                  key={label}
                  href={href}
                  prefetch={false}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  onClick={(event) => handleNavClick(event, href, external)}
                  className="rounded-full border border-transparent px-3 py-2 text-foreground/70 transition hover:border-border/60 hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-2 border-t border-border/30 py-2 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-foreground/60 md:hidden">
          {NAV_ITEMS.map(({ label, href, external }) => (
            <Link
              key={label}
              href={href}
              prefetch={false}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              onClick={(event) => handleNavClick(event, href, external)}
              className="rounded-full border border-transparent px-2.5 py-1.5 transition hover:border-border/60 hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
