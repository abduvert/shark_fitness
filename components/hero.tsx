"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Search, Star, Users, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/smart-image";
import { useApp, scrollToSection } from "@/components/app-provider";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { openSearch, openEarlyAccess } = useApp();
  const [query, setQuery] = React.useState("");
  const reduced = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    openSearch(query);
  };

  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section
      ref={sectionRef}
      id="discover"
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <motion.div style={{ y: imageY }} className="absolute inset-x-0 -top-[8%] h-[116%]">
          <SmartImage
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.34] dark:opacity-[0.26]"
          />
        </motion.div>
        {/* Warm wash + vignette so type always sits on a calm field */}
        <div className="absolute inset-0 bg-gradient-to-b from-base via-base/78 to-base" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,transparent,rgb(var(--base))_82%)]" />
        <div
          className="absolute inset-0 opacity-[0.55] mix-blend-plus-lighter"
          style={{
            background:
              "radial-gradient(46rem 30rem at 68% 28%, rgb(var(--gold)/0.13), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 grid-lines opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_35%,black,transparent)]" />
      </div>

      <div className="container">
        <motion.div style={{ y: contentY }} className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ── Copy column ─────────────────────────────── */}
          <div className="max-w-2xl">
            <motion.div {...rise(0)}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong/70 bg-fg/[0.03] py-1.5 pl-1.5 pr-4 backdrop-blur">
                <span className="rounded-full bg-gold px-2.5 py-1 font-display text-2xs font-bold uppercase tracking-techy text-ink">
                  New
                </span>
                <span className="text-xs text-muted">
                  Now live in {site.city.split(",")[0]} &amp; 13 more cities
                </span>
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              {...rise(0.08)}
              className="heading-xl mt-7 text-balance"
            >
              Find Your{" "}
              <span className="relative inline-block">
                <span className="gold-text">Next Level</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-px w-full origin-left bg-gradient-to-r from-gold via-gold/60 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, delay: 0.9, ease }}
                  aria-hidden
                />
              </span>
              .
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
            >
              Discover gyms, trainers, classes and fitness experiences built
              around your goals — compared side by side, priced honestly, close
              to home.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => scrollToSection("#gyms")}>
                Explore Gyms
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("#trainers")}
              >
                Explore Trainers
              </Button>
            </motion.div>

            {/* Search */}
            <motion.form
              {...rise(0.32)}
              onSubmit={submit}
              role="search"
              aria-label="Find a gym, trainer or class"
              className="mt-8 rounded-3xl border border-line-strong/70 p-1.5 shadow-lift glass sm:rounded-full"
            >
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-3 rounded-full px-4 py-3">
                  <Search className="h-[18px] w-[18px] shrink-0 text-faint" strokeWidth={1.75} aria-hidden />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => openSearch(query)}
                    placeholder="Find a gym, trainer or class..."
                    aria-label="Search query"
                    className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint"
                  />
                </div>

                <div className="hidden h-7 w-px bg-line sm:block" aria-hidden />

                <div className="flex items-center gap-2.5 rounded-full px-4 py-3 sm:px-3">
                  <MapPin className="h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={1.75} aria-hidden />
                  <span className="whitespace-nowrap text-sm text-muted">
                    {site.city}
                  </span>
                </div>

                <Button type="submit" size="md" className="w-full px-6 sm:w-auto">
                  Search
                </Button>
              </div>
            </motion.form>

            <motion.p {...rise(0.4)} className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 pl-1 text-xs text-faint">
              <span>Try</span>
              {["Boxing", "24/7", "Yoga"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => openSearch(t)}
                  className="rounded-full border border-line px-2.5 py-1 text-muted transition-colors hover:border-gold/40 hover:text-fg"
                >
                  {t}
                </button>
              ))}
            </motion.p>
          </div>

          {/* ── Visual column ───────────────────────────── */}
          <HeroVisual reduced={!!reduced} onOpen={() => openEarlyAccess("Hero preview")} />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const floatCards = [
  {
    id: "rating",
    className: "left-[-6%] top-[14%]",
    delay: 0.55,
    drift: 8,
    node: (
      <>
        <Star className="h-4 w-4 fill-gold text-gold" strokeWidth={1.5} aria-hidden />
        <span className="font-display text-sm font-bold tabular-nums">4.9</span>
        <span className="text-2xs text-muted">842 reviews</span>
      </>
    ),
  },
  {
    id: "hours",
    className: "right-[-4%] top-[8%]",
    delay: 0.7,
    drift: -10,
    node: (
      <>
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="font-display text-xs font-semibold">24/7 Access</span>
      </>
    ),
  },
  {
    id: "distance",
    className: "right-[2%] bottom-[26%]",
    delay: 0.85,
    drift: 9,
    node: (
      <>
        <Navigation className="h-3.5 w-3.5 text-gold" strokeWidth={2} aria-hidden />
        <span className="font-display text-xs font-semibold tabular-nums">1.2 km away</span>
      </>
    ),
  },
  {
    id: "members",
    className: "left-[-8%] bottom-[30%]",
    delay: 1,
    drift: -8,
    node: (
      <>
        <Users className="h-3.5 w-3.5 text-gold" strokeWidth={2} aria-hidden />
        <span className="font-display text-xs font-semibold tabular-nums">120 training now</span>
      </>
    ),
  },
];

function HeroVisual({ reduced, onOpen }: { reduced: boolean; onOpen: () => void }) {
  return (
    <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
      {/* Ambient gold bloom behind the stack */}
      <div
        className="pointer-events-none absolute -inset-10 -z-10 opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 45%, rgb(var(--gold)/0.20), transparent 70%)",
        }}
        aria-hidden
      />

      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease }}
        className="relative"
        style={{ perspective: 1200 }}
      >
        {/* Main card */}
        <div className="relative overflow-hidden rounded-[1.75rem] border border-line-strong/80 bg-card shadow-lift">
          <div className="relative aspect-[4/5] sm:aspect-[5/6]">
            <SmartImage
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=85"
              alt="The strength floor at Iron District, Gulberg"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

            {/* Live chip */}
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-line-strong/60 px-3 py-1.5 glass">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              <span className="font-display text-2xs font-semibold uppercase tracking-techy text-fg">
                Open now
              </span>
            </div>

            {/* Bottom info block */}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-2xs font-semibold uppercase tracking-label text-gold">
                Featured near you
              </p>
              <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-[-0.02em] text-[#F6F1E7]">
                Iron District
              </h2>
              <p className="mt-1 text-sm text-[#F6F1E7]/60">Gulberg, Lahore</p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { k: "From", v: "Rs. 3,500" },
                  { k: "Trainers", v: "14" },
                  { k: "Classes", v: "38/wk" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 backdrop-blur-md"
                  >
                    <p className="text-2xs uppercase tracking-techy text-[#F6F1E7]/50">
                      {s.k}
                    </p>
                    <p className="mt-0.5 font-display text-sm font-semibold tabular-nums text-[#F6F1E7]">
                      {s.v}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={onOpen}
                className="group mt-4 flex w-full items-center justify-between rounded-full border border-white/15 bg-white/[0.08] px-5 py-3 text-left backdrop-blur-md transition-colors hover:border-gold/50 hover:bg-gold/15"
              >
                <span className="font-display text-sm font-semibold text-[#F6F1E7]">
                  See what the app will do
                </span>
                <ArrowRight
                  className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden
                />
              </button>
            </div>
          </div>
        </div>

        {/* Floating glass cards */}
        {floatCards.map((c) => (
          <motion.div
            key={c.id}
            aria-hidden
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: c.delay, ease }}
            className={cn("pointer-events-none absolute hidden sm:block", c.className)}
          >
            <motion.div
              animate={reduced ? undefined : { y: [0, c.drift, 0] }}
              transition={{
                duration: 5.5 + Math.abs(c.drift) * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center gap-2 rounded-2xl border border-line-strong/70 px-3.5 py-2.5 shadow-glow glass"
            >
              {c.node}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Compact stat strip for small screens where floats are hidden */}
      <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
        {[
          { icon: Star, label: "4.9" },
          { icon: Clock, label: "24/7" },
          { icon: Navigation, label: "1.2 km" },
          { icon: Users, label: "120 in" },
        ].map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-1.5 rounded-full border border-line-strong/60 px-3 py-1.5 text-2xs font-semibold text-muted glass"
          >
            <Icon className="h-3 w-3 text-gold" strokeWidth={2} aria-hidden />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
