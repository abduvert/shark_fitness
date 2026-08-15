"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, Timer, ArrowUpRight, Flame } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useApp } from "@/components/app-provider";
import { classes, type Difficulty } from "@/data/classes";
import { cn } from "@/lib/utils";

const difficultyTone: Record<Difficulty, string> = {
  Beginner: "border-emerald-500/30 text-emerald-500 dark:text-emerald-400",
  "All levels": "border-sky-500/30 text-sky-500 dark:text-sky-400",
  Intermediate: "border-gold/40 text-gold",
  Advanced: "border-orange-500/30 text-orange-500 dark:text-orange-400",
};

const days = ["Today", "Tomorrow"] as const;

export function Classes() {
  const [day, setDay] = React.useState<(typeof days)[number]>("Today");
  const { openClass, openSearch } = useApp();
  const reduced = useReducedMotion();

  const list = React.useMemo(
    () =>
      classes
        .filter((c) => c.day === day)
        .sort((a, b) => a.startsAt - b.startsAt),
    [day]
  );

  return (
    <section id="classes" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          label="Timetable"
          title="More ways to move."
          copy="A sample of what's running across the platform. Class times, coaches and remaining spots, all in one place."
          aside={
            <div
              role="tablist"
              aria-label="Choose a day"
              className="inline-flex rounded-full border border-line bg-card p-1"
            >
              {days.map((d) => (
                <button
                  key={d}
                  role="tab"
                  type="button"
                  aria-selected={day === d}
                  onClick={() => setDay(d)}
                  className={cn(
                    "relative rounded-full px-5 py-2.5 font-display text-[0.8125rem] font-semibold transition-colors",
                    day === d ? "text-ink" : "text-muted hover:text-fg"
                  )}
                >
                  {day === d && (
                    <motion.span
                      layoutId="day-pill"
                      className="absolute inset-0 rounded-full bg-gold"
                      transition={
                        reduced ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }
                      }
                      aria-hidden
                    />
                  )}
                  <span className="relative">{d}</span>
                </button>
              ))}
            </div>
          }
        />

        {/* Timeline — a schedule, not a card row */}
        <div className="relative mt-12">
          <div
            className="absolute inset-y-0 left-[4.5rem] hidden w-px bg-line sm:block lg:left-[7rem]"
            aria-hidden
          />

          <AnimatePresence mode="wait">
            <motion.ul
              key={day}
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              {list.map((c, i) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative sm:pl-[4.5rem] lg:pl-[7rem]"
                >
                  {/* Time gutter */}
                  <div className="absolute left-0 top-6 hidden w-[4.5rem] pr-6 text-right sm:block lg:w-[7rem]">
                    <p className="font-display text-sm font-semibold tabular-nums text-fg">
                      {c.time.replace(" ", "")}
                    </p>
                    <p className="mt-0.5 text-2xs text-faint">{c.durationMin} min</p>
                  </div>
                  <span
                    className="absolute left-[4.5rem] top-[1.9rem] hidden h-2 w-2 -translate-x-1/2 rounded-full bg-gold ring-4 ring-base sm:block lg:left-[7rem]"
                    aria-hidden
                  />

                  <article className="group flex items-center gap-4 rounded-3xl border border-line bg-card p-3 transition-all duration-400 hover:border-gold/40 hover:bg-elevated sm:gap-5 sm:p-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-32">
                      <SmartImage
                        src={c.image}
                        alt=""
                        fill
                        sizes="128px"
                        seed={i + 60}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-ink/20" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-base font-semibold tracking-[-0.015em] text-fg sm:text-lg">
                          {c.name}
                        </h3>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-2xs font-semibold uppercase tracking-techy",
                            difficultyTone[c.difficulty]
                          )}
                        >
                          {c.difficulty}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-sm text-muted">
                        {c.trainer} · {c.gym}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-faint">
                        <span className="flex items-center gap-1.5 sm:hidden">
                          <Clock className="h-3 w-3" strokeWidth={2} aria-hidden />
                          {c.time}
                        </span>
                        <span className="flex items-center gap-1.5 sm:hidden">
                          <Timer className="h-3 w-3" strokeWidth={2} aria-hidden />
                          {c.durationMin} min
                        </span>
                        <span className="hidden sm:inline">{c.accent}</span>
                        <span
                          className={cn(
                            "flex items-center gap-1.5",
                            c.spotsLeft <= 3 && "text-gold"
                          )}
                        >
                          {c.spotsLeft <= 3 && (
                            <Flame className="h-3 w-3" strokeWidth={2} aria-hidden />
                          )}
                          Only {c.spotsLeft} of {c.capacity} spots left
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openClass(c.id)}
                      aria-label={`View details for ${c.name} at ${c.gym}`}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-strong/70 text-muted transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                    >
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </button>
                  </article>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-card px-6 py-5">
          <p className="text-sm text-muted">
            <span className="font-display font-semibold text-fg">10,400+</span>{" "}
            classes run every week across the platform.
          </p>
          <Button variant="outline" onClick={() => openSearch("class")}>
            Explore Classes
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
