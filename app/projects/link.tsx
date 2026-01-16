"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ArrowIcon from "../components/arrow-icon";

interface projectProps {
  name: string;
  url: string;
  description: string;
  highlight?: string;
}

export const ProjectLink = (props: projectProps) => {
  const ctrls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const listAnimation = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.li
      ref={ref}
      className="group py-1 sm:py-1.5"
      key={props.url}
      animate={ctrls}
      variants={listAnimation}
      initial="hidden"
    >
      <a
        href={props.url}
        className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 w-full transform transition duration-500 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-700 active:scale-[98%] md:hover:scale-[102%]"
      >
        <div className="flex flex-col flex-1 min-w-0 pr-2">
          <p className="font-medium text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
            {props.name}
          </p>
          {props.highlight && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-emerald-500 dark:text-emerald-400 text-xs leading-none">★</span>
              <p className="text-emerald-600 dark:text-emerald-400 text-xs font-medium leading-none">
                {props.highlight}
              </p>
            </div>
          )}
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 sm:line-clamp-none mt-1">
            {props.description}
          </p>
        </div>
        <div className="text-neutral-700 dark:text-neutral-300 transform transition-transform duration-300 group-hover:-rotate-12 flex-shrink-0">
          <ArrowIcon />
        </div>
      </a>
    </motion.li>
  );
};
