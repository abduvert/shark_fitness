"use client";

import { motion } from "framer-motion";
import { Compass, GitCompareArrows, Dumbbell, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, revealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Compass,
    title: "Discover",
    copy: "Find gyms that actually match your goals — by discipline, distance, opening hours and the equipment you'll genuinely use.",
    stat: "500+ listings",
    span: "lg:col-span-3 lg:row-span-2",
    feature: true,
  },
  {
    icon: GitCompareArrows,
    title: "Compare",
    copy: "Facilities, pricing, classes and trainers, side by side. No phone calls.",
    stat: "Up to 4 at once",
    span: "lg:col-span-3",
  },
  {
    icon: Dumbbell,
    title: "Train",
    copy: "Experienced trainers and specialised classes, with real rates on the profile.",
    stat: "1,200+ coaches",
    span: "lg:col-span-2",
  },
  {
    icon: TrendingUp,
    title: "Progress",
    copy: "Choose an environment that keeps you turning up.",
    stat: "83% still training at 6 months",
    span: "lg:col-span-4",
  },
];

export function WhyPlatform() {
  return (
    <section aria-labelledby="why-heading" className="section">
      <div className="container">
        <SectionHeading
          label="Why Shark"
          title={
            <span id="why-heading">
              Fitness should feel <span className="gold-text">personal</span>.
            </span>
          }
          copy="Most people pick a gym because it was the first one they walked past. There is a better way to decide."
          align="center"
        />

        <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-6">
          {features.map((f) => (
            <motion.article
              key={f.title}
              variants={revealItem}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-card p-6 transition-colors duration-500 hover:border-gold/35 sm:p-7",
                f.span
              )}
            >
              {/* Quiet gold wash that only wakes up on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(24rem 14rem at 20% 0%, rgb(var(--gold)/0.09), transparent 70%)",
                }}
                aria-hidden
              />

              <div className="relative flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line-strong/60 bg-elevated transition-colors duration-500 group-hover:border-gold/40">
                  <f.icon
                    className="h-5 w-5 text-gold transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
                <span className="rounded-full border border-line px-2.5 py-1 text-2xs font-medium tabular-nums text-faint">
                  {f.stat}
                </span>
              </div>

              <h3
                className={cn(
                  "relative mt-6 font-display font-semibold tracking-[-0.02em] text-fg",
                  f.feature ? "text-2xl" : "text-lg"
                )}
              >
                {f.title}
              </h3>
              <p
                className={cn(
                  "relative mt-2.5 text-pretty leading-relaxed text-muted",
                  f.feature ? "text-base max-w-md" : "text-sm"
                )}
              >
                {f.copy}
              </p>

              {f.feature && <DiscoverGlyph />}
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/** Minimal "signal" illustration for the large Discover tile. */
function DiscoverGlyph() {
  return (
    <div className="relative mt-auto pt-10" aria-hidden>
      <div className="relative mx-auto grid h-40 w-40 place-items-center sm:h-48 sm:w-48">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute rounded-full border border-line-strong/60"
            style={{
              inset: `${i * 18}%`,
              opacity: 1 - i * 0.25,
            }}
          />
        ))}
        <span className="absolute inset-[54%] rounded-full bg-gold/15" />
        <span className="relative h-3 w-3 rounded-full bg-gold shadow-[0_0_18px_rgb(var(--gold)/0.9)]" />

        {/* Nearby gyms as dots on the rings */}
        {[
          { top: "16%", left: "62%" },
          { top: "70%", left: "28%" },
          { top: "38%", left: "12%" },
          { top: "78%", left: "68%" },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-fg/40 transition-colors duration-500 group-hover:bg-gold/70"
            style={pos}
          />
        ))}
      </div>
    </div>
  );
}
