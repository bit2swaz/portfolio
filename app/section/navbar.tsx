"use client";

import { LayoutGroup } from "framer-motion";
import { Suspense } from "react";
import { NavItem } from "../components/nav-item";

const navItems = {
  "/": {
    name: "home",
  },
  "/projects": {
    name: "projects",
  },
};

export const Navbar = () => {
  return (
    <aside className="-ml-[8px] sm:-ml-[8px] mb-6 sm:mb-8 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <LayoutGroup>
          <nav
            className="flex flex-row items-start relative px-0 pb-0 fade overflow-x-auto md:overflow-auto scroll-pr-6 md:relative -mx-2 sm:mx-0"
            id="nav"
          >
            <div className="flex flex-row space-x-0 pr-6 sm:pr-10 pl-2 sm:pl-0">
              <Suspense fallback={null}>
                {Object.entries(navItems).map(([url, { name }]) => {
                  return <NavItem key={url} url={url} name={name} />;
                })}
                <a
                  href="https://bit2-blog.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle text-neutral-500"
                >
                  <span className="relative py-1 px-2">blogs</span>
                </a>
              </Suspense>
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  );
};
