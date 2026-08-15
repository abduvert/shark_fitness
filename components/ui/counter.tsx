"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CounterProps {
  to: number;
  duration?: number;
  decimals?: number;
  className?: string;
}

/**
 * Counts up once the element enters the viewport. Renders the final value
 * immediately for reduced-motion users and as the SSR output, so the number is
 * never missing for a crawler or a screen reader.
 */
export function Counter({
  to,
  duration = 1600,
  decimals = 0,
  className,
}: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  // Holds the final value until the count-up actually begins. If rAF never
  // runs (reduced motion, backgrounded tab), the correct number is already
  // on screen rather than a stranded zero.
  const [value, setValue] = React.useState(to);

  React.useEffect(() => {
    if (!inView || reduced) return;

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(to * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduced]);

  const display = decimals
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString("en-US");

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {display}
    </span>
  );
}
