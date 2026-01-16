"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface FeaturedProjectProps {
  name: string;
  url: string;
  description: string;
  highlight?: string;
}

export const FeaturedProjectCard = (props: FeaturedProjectProps) => {
  const ctrls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.3,
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

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="group"
      animate={ctrls}
      variants={cardAnimation}
      initial="hidden"
    >
      <a
        href={props.url}
        className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3 sm:p-4 block transform transition duration-500 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-700 active:scale-[98%] md:hover:scale-[102%] hover:shadow-lg"
      >
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5 sm:mb-2 text-sm sm:text-base">
          {props.name}
        </h3>
        {props.highlight && (
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-emerald-500 dark:text-emerald-400 text-xs">★</span>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              {props.highlight}
            </p>
          </div>
        )}
        <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
          {props.description}
        </p>
      </a>
    </motion.div>
  );
};
