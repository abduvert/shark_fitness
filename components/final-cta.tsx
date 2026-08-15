"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useApp, scrollToSection } from "@/components/app-provider";

export function FinalCTA() {
  const { openEarlyAccess } = useApp();
  const ref = React.useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", reduced ? "-8%" : "8%"]);

  return (
    <section
      ref={ref}
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Cinematic backdrop */}
      <div className="absolute inset-0 -z-10">
        <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] h-[120%]">
          <SmartImage
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=2000&q=85"
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover opacity-[0.30] dark:opacity-[0.22]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-base via-base/72 to-base" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(48rem 26rem at 50% 55%, rgb(var(--gold)/0.14), transparent 68%)",
          }}
        />
      </div>

      <div className="container">
        <div className="mx-auto max-w-3xl py-32 text-center sm:py-40 lg:py-48">
          <Reveal>
            <p className="label flex items-center justify-center gap-2.5">
              <span className="h-px w-6 bg-gold/50" aria-hidden />
              Start today
              <span className="h-px w-6 bg-gold/50" aria-hidden />
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 id="final-cta-heading" className="heading-xl mt-6 text-balance">
              Your next level
              <br />
              <span className="gold-text">starts here.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Find the place. Find the people. Find your pace.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" onClick={() => scrollToSection("#gyms")}>
                Explore Gyms
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Button>
              <Button
                size="lg"
                variant="glass"
                onClick={() => openEarlyAccess("Final call to action")}
              >
                Get Started
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-8 text-xs text-faint">
              Free to browse · 500+ gyms · 14 cities
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
