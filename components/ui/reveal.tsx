"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  /** Travel distance in px */
  y?: number;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  y = 22,
  once = true,
  ...props
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: reduced ? 0.3 : 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct children on enter. */
export function RevealGroup({
  children,
  stagger = 0.07,
  className,
}: {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const revealItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};
