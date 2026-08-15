"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/ui/counter";
import { RevealGroup, revealItem } from "@/components/ui/reveal";
import { platformStats } from "@/lib/site";
import { cn } from "@/lib/utils";

const cities = [
  "Lahore",
  "Islamabad",
  "Karachi",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
];

export function Stats() {
  return (
    <section aria-label="Platform statistics" className="relative border-y border-line bg-surface/60">
      <div className="container">
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4">
          {platformStats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={revealItem}
              className={cn(
                "relative px-1 py-9 sm:px-6 sm:py-12",
                // Hairline grid that doesn't double up at the edges
                i % 2 === 1 && "border-l border-line",
                i >= 2 && "border-t border-line lg:border-t-0",
                i >= 1 && "lg:border-l lg:border-line"
              )}
            >
              <p className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] text-fg">
                <Counter to={s.value} />
                <span className="text-gold">{s.suffix}</span>
              </p>
              <p className="mt-3 font-display text-sm font-semibold text-fg">
                {s.label}
              </p>
              <p className="mt-1 text-xs text-faint">{s.sub}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>

      {/* City marquee — quiet texture, decorative only */}
      <div className="mask-x overflow-hidden border-t border-line py-3.5" aria-hidden>
        <div className="flex w-max animate-marquee items-center gap-8 motion-reduce:animate-none">
          {[...cities, ...cities].map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="flex items-center gap-8 whitespace-nowrap font-display text-xs font-medium uppercase tracking-label text-faint"
            >
              {c}
              <span className="h-1 w-1 rounded-full bg-gold/40" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
