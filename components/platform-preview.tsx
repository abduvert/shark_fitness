"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarCheck, CreditCard, Flame, LineChart, UserRound } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useApp } from "@/components/app-provider";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function PlatformPreview() {
  const { openEarlyAccess } = useApp();
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="platform-heading"
      className="relative overflow-hidden border-y border-line bg-surface/70 py-24 sm:py-28 lg:py-32"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60rem 34rem at 50% 110%, rgb(var(--gold)/0.11), transparent 65%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 grid-lines opacity-40 [mask-image:radial-gradient(65%_60%_at_50%_50%,black,transparent)]"
        aria-hidden
      />

      <div className="container">
        <SectionHeading
          label="What's coming"
          title={<span id="platform-heading">Your fitness journey, in one place.</span>}
          copy="Discovery is the first step. Membership, attendance, bookings and progress are what we're building next."
          align="center"
        />

        {/* Floating UI previews in loose perspective */}
        <div className="relative mt-16">
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PreviewCard
              delay={0}
              drift={-8}
              reduced={!!reduced}
              className="lg:mt-8"
              icon={CreditCard}
              label="Membership"
            >
              <p className="font-display text-lg font-semibold text-fg">Pro</p>
              <p className="mt-0.5 text-xs text-muted">Iron District · Gulberg</p>
              <div className="mt-4 flex h-1.5 overflow-hidden rounded-full bg-line" aria-hidden>
                <div className="w-[68%] bg-gold" />
              </div>
              <p className="mt-2 text-2xs text-faint">Renews in 9 days</p>
            </PreviewCard>

            <PreviewCard
              delay={0.08}
              drift={9}
              reduced={!!reduced}
              icon={Flame}
              label="Attendance"
              highlight
            >
              <p className="font-display text-lg font-semibold tabular-nums text-fg">
                14 <span className="text-sm font-normal text-muted">day streak</span>
              </p>
              <div className="mt-4 flex gap-1" aria-hidden>
                {Array.from({ length: 14 }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-6 flex-1 rounded-[3px]",
                      i < 11 ? "bg-gold/70" : i < 13 ? "bg-gold" : "bg-line"
                    )}
                  />
                ))}
              </div>
              <p className="mt-2 text-2xs text-faint">Best streak this year</p>
            </PreviewCard>

            <PreviewCard
              delay={0.16}
              drift={-6}
              reduced={!!reduced}
              className="lg:mt-8"
              icon={LineChart}
              label="Progress"
            >
              <p className="font-display text-lg font-semibold tabular-nums text-fg">
                +12.5 <span className="text-sm font-normal text-muted">kg squat</span>
              </p>
              <svg
                className="mt-4 h-12 w-full"
                viewBox="0 0 120 40"
                fill="none"
                aria-hidden
                preserveAspectRatio="none"
              >
                <path
                  d="M0 34 L20 30 L40 31 L60 22 L80 18 L100 10 L120 6"
                  stroke="rgb(var(--gold))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M0 34 L20 30 L40 31 L60 22 L80 18 L100 10 L120 6 L120 40 L0 40 Z"
                  fill="rgb(var(--gold))"
                  opacity="0.10"
                />
              </svg>
              <p className="mt-1 text-2xs text-faint">Last 8 weeks</p>
            </PreviewCard>

            <PreviewCard
              delay={0.24}
              drift={7}
              reduced={!!reduced}
              className="sm:col-span-2"
              icon={CalendarCheck}
              label="Bookings"
            >
              <ul className="mt-1 space-y-2.5">
                {[
                  { name: "Grid 40", when: "Today · 8:00 PM", state: "Confirmed" },
                  { name: "Strength 101", when: "Thu · 6:00 PM", state: "Waitlist #2" },
                ].map((b) => (
                  <li
                    key={b.name}
                    className="flex items-center gap-3 rounded-xl border border-line bg-elevated px-3 py-2.5"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-xs font-semibold text-fg">
                        {b.name}
                      </span>
                      <span className="block text-2xs text-faint">{b.when}</span>
                    </span>
                    <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-2xs text-muted">
                      {b.state}
                    </span>
                  </li>
                ))}
              </ul>
            </PreviewCard>

            <PreviewCard
              delay={0.32}
              drift={-9}
              reduced={!!reduced}
              icon={UserRound}
              label="Trainer sessions"
            >
              <p className="font-display text-lg font-semibold tabular-nums text-fg">
                3 <span className="text-sm font-normal text-muted">left this month</span>
              </p>
              <p className="mt-3 text-xs text-muted">With Hamza Khan</p>
              <div className="mt-3 flex gap-1.5" aria-hidden>
                {[1, 1, 1, 0].map((filled, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-8 flex-1 rounded-lg border",
                      filled
                        ? "border-gold/40 bg-gold/15"
                        : "border-dashed border-line-strong"
                    )}
                  />
                ))}
              </div>
            </PreviewCard>
          </div>
        </div>

        <Reveal delay={0.15} className="mt-14 text-center">
          <Button size="lg" onClick={() => openEarlyAccess("Early access")}>
            Get Early Access
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </Button>
          <p className="mt-4 text-xs text-faint">
            These panels are a design preview of the app — not a live account.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PreviewCard({
  children,
  icon: Icon,
  label,
  delay,
  drift,
  reduced,
  className,
  highlight,
}: {
  children: React.ReactNode;
  icon: React.ElementType;
  label: string;
  delay: number;
  drift: number;
  reduced: boolean;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, drift, 0] }}
        transition={{
          duration: 6 + Math.abs(drift) * 0.25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "rounded-3xl border p-5 shadow-lift glass",
          highlight ? "border-gold/35" : "border-line-strong/60"
        )}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={2} aria-hidden />
          <p className="label text-muted">{label}</p>
        </div>
        <div className="mt-4">{children}</div>
      </motion.div>
    </motion.div>
  );
}
